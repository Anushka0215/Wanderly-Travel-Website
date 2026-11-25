import { AIConfigError, AIProviderError } from './errors.js';

const GEMINI_API_BASE = 'https://generativelanguage.googleapis.com/v1beta/models';
const REQUEST_TIMEOUT_MS = 25000;

/**
 * Google Gemini AI Provider using the official v1beta REST generateContent endpoint.
 * Authenticates exclusively via the x-goog-api-key header on the server.
 */
export function createGeminiProvider({ apiKey, model = 'gemini-4-hydrogen' }) {
  const normalizedKey = (apiKey || '').trim();
  const isConfigured = Boolean(normalizedKey && normalizedKey !== 'your_gemini_api_key_here');

  return {
    name: 'gemini',
    model,

    isConfigured() {
      return isConfigured;
    },

    /**
     * Generates a response from Gemini.
     * @param {Object} params
     * @param {string} [params.systemInstruction]
     * @param {Array<{role: 'user'|'model', text: string}>} params.messages
     * @param {number} [params.temperature=0.6]
     * @param {number} [params.maxOutputTokens=1024]
     * @param {string} [params.responseMimeType='text/plain']
     */
    async generate({
      systemInstruction = '',
      messages = [],
      temperature = 0.6,
      maxOutputTokens = 1024,
      responseMimeType = 'text/plain'
    }) {
      if (!isConfigured) {
        throw new AIConfigError(
          'Gemini AI is not configured. Add a valid GEMINI_API_KEY in your server .env file.'
        );
      }

      if (!Array.isArray(messages) || messages.length === 0) {
        throw new AIProviderError('At least one prompt message is required.', 400);
      }

      const endpoint = `${GEMINI_API_BASE}/${encodeURIComponent(model)}:generateContent`;
      const payload = {
        contents: messages.map((msg) => ({
          role: msg.role === 'model' ? 'model' : 'user',
          parts: [{ text: String(msg.text || '') }]
        })),
        generationConfig: {
          temperature,
          maxOutputTokens,
          responseMimeType
        }
      };

      if (systemInstruction) {
        payload.systemInstruction = {
          parts: [{ text: String(systemInstruction) }]
        };
      }

      let response;
      try {
        response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-goog-api-key': normalizedKey
          },
          body: JSON.stringify(payload),
          signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS)
        });
      } catch (err) {
        const isTimeout = err?.name === 'TimeoutError' || err?.name === 'AbortError';
        throw new AIProviderError(
          isTimeout
            ? 'Gemini AI request timed out. Please try again.'
            : 'Unable to reach Gemini AI service.',
          504
        );
      }

      let data = null;
      try {
        data = await response.json();
      } catch {
        data = null;
      }

      if (!response.ok) {
        const upstreamMessage = data?.error?.message || `Gemini API error (HTTP ${response.status})`;
        const mappedStatus = response.status === 429 ? 429 : response.status >= 500 ? 502 : 400;
        throw new AIProviderError(upstreamMessage, mappedStatus);
      }

      const candidate = data?.candidates?.[0];
      const text = (candidate?.content?.parts || [])
        .map((part) => part.text || '')
        .join('')
        .trim();

      if (!text) {
        const finishReason = candidate?.finishReason || 'EMPTY_RESPONSE';
        throw new AIProviderError(`Gemini returned an empty response (${finishReason}).`, 502);
      }

      return {
        provider: 'gemini',
        model,
        text,
        usage: data?.usageMetadata || null
      };
    }
  };
}

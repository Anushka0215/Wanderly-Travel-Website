import { DESTINATIONS, TIER_CONFIG } from '../../data/destinations.js';
import { AIProviderError } from './errors.js';

const MAX_MESSAGE_LENGTH = 2000;
const MAX_HISTORY_TURNS = 12;

function buildSystemInstruction() {
  const destinationSummary = Object.values(DESTINATIONS)
    .map(
      (d) =>
        `- ${d.name} (${d.region}, ${d.category}): ${d.duration}, starting ₹${d.basePrice.toLocaleString('en-IN')}/guest, best season ${d.season}. Highlights: ${d.highlights.join(', ')}. Typical daily budget benchmarks per guest: Stay ₹${d.dailyBenchmarks.stay}, Food ₹${d.dailyBenchmarks.food}, Local Transport ₹${d.dailyBenchmarks.transport}, Activities ₹${d.dailyBenchmarks.activities}.`
    )
    .join('\n');

  const tierSummary = Object.entries(TIER_CONFIG)
    .map(([key, t]) => `- ${t.label} (${key}): ${t.multiplier}x base rate`)
    .join('\n');

  return [
    'You are Wanderly AI, a warm, knowledgeable boutique travel concierge for Wanderly.',
    'Help travelers plan soulful, realistic trips across India—especially Manali, Goa, Kashmir, and Jaipur, while also offering helpful comparisons, budget tips, packing notes, and tailored day-by-day suggestions.',
    '',
    'Wanderly Signature Destinations:',
    destinationSummary,
    '',
    'Wanderly Experience Tiers:',
    tierSummary,
    '',
    'Guidelines:',
    '- Give practical, structured, concise answers with clear headings or bullet points.',
    '- Use Indian Rupees (₹ or Rs.) when discussing budgets in India.',
    '- When a traveler asks for a custom duration or tight budget (e.g., 3-day Manali or Goa under Rs. 15,000), show realistic trade-offs (off-peak stays, train/bus vs flights, local guesthouses) while noting Wanderly signature package starting rates.',
    '- Never invent fake booking confirmations or claim a trip is already reserved; remind them they can use the Booking section on the page to submit a request.'
  ].join('\n');
}

function normalizeHistory(rawHistory) {
  if (!Array.isArray(rawHistory)) return [];

  return rawHistory
    .filter((entry) => entry && (entry.role === 'user' || entry.role === 'model') && typeof entry.text === 'string')
    .map((entry) => ({
      role: entry.role,
      text: entry.text.trim().slice(0, MAX_MESSAGE_LENGTH)
    }))
    .filter((entry) => entry.text.length > 0)
    .slice(-MAX_HISTORY_TURNS);
}

/**
 * Handles conversational travel queries via the configured AI provider.
 */
export function createTravelAssistant(aiProvider) {
  const systemInstruction = buildSystemInstruction();

  return {
    async chat({ message, history = [] }) {
      const cleanMessage = typeof message === 'string' ? message.trim() : '';
      if (!cleanMessage) {
        throw new AIProviderError('Please enter a travel question before sending.', 400);
      }
      if (cleanMessage.length > MAX_MESSAGE_LENGTH) {
        throw new AIProviderError(
          `Message is too long (maximum ${MAX_MESSAGE_LENGTH} characters).`,
          400
        );
      }

      const normalizedHistory = normalizeHistory(history);
      const messages = [...normalizedHistory, { role: 'user', text: cleanMessage }];

      const result = await aiProvider.generate({
        systemInstruction,
        messages,
        temperature: 0.65,
        maxOutputTokens: 1200,
        responseMimeType: 'text/plain'
      });

      return {
        reply: result.text,
        provider: result.provider,
        model: result.model,
        usage: result.usage
      };
    }
  };
}

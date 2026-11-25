import { AIConfigError } from './errors.js';
import { createGeminiProvider } from './geminiProvider.js';

/**
 * Registry of supported AI providers.
 * New providers (e.g., OpenAI, Anthropic, local Ollama) can be registered here
 * as long as they expose `{ name, model, isConfigured(), generate(options) }`.
 */
const PROVIDER_FACTORIES = {
  gemini: (aiConfig) => createGeminiProvider(aiConfig.gemini)
};

export function registerAIProvider(name, factory) {
  if (!name || typeof factory !== 'function') {
    throw new TypeError('Provider name and factory function are required.');
  }
  PROVIDER_FACTORIES[String(name).toLowerCase()] = factory;
}

export function listAIProviders() {
  return Object.keys(PROVIDER_FACTORIES);
}

export function createAIProvider(aiConfig) {
  const providerKey = (aiConfig?.provider || 'gemini').toLowerCase();
  const factory = PROVIDER_FACTORIES[providerKey];

  if (!factory) {
    throw new AIConfigError(
      `Unsupported AI provider "${providerKey}". Available providers: ${listAIProviders().join(', ')}.`
    );
  }

  return factory(aiConfig);
}

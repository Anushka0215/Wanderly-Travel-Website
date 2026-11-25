import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const ROOT_DIR = path.resolve(__dirname, '..', '..');

/**
 * Parses a local .env file into process.env without overriding
 * variables already provided by the host environment.
 */
export function loadEnvFile(envPath = path.join(ROOT_DIR, '.env')) {
  if (!fs.existsSync(envPath)) return;

  const content = fs.readFileSync(envPath, 'utf8');
  const lines = content.split(/\r?\n/);

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) continue;

    const eqIndex = line.indexOf('=');
    if (eqIndex <= 0) continue;

    const key = line.slice(0, eqIndex).trim();
    let value = line.slice(eqIndex + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    if (!(key in process.env)) {
      process.env[key] = value;
    }
  }
}

/**
 * Returns validated runtime configuration. Secrets remain server-side only.
 */
export function getConfig() {
  loadEnvFile();

  const parsedPort = Number(process.env.PORT || 3000);
  const port = Number.isInteger(parsedPort) && parsedPort > 0 && parsedPort <= 65535 ? parsedPort : 3000;
  const nodeEnv = (process.env.NODE_ENV || 'development').trim();
  const aiProvider = (process.env.AI_PROVIDER || 'gemini').trim().toLowerCase();
  const geminiApiKey = (process.env.GEMINI_API_KEY || '').trim();
  const geminiModel = (process.env.GEMINI_MODEL || 'gemini-4-hydrogen').trim();

  return {
    port,
    nodeEnv,
    ai: {
      provider: aiProvider,
      gemini: {
        apiKey: geminiApiKey,
        model: geminiModel
      }
    }
  };
}

/**
 * Returns non-sensitive configuration metadata safe for health checks.
 */
export function getPublicConfig(config = getConfig()) {
  const isGeminiConfigured = Boolean(
    config.ai.gemini.apiKey &&
    config.ai.gemini.apiKey !== 'your_gemini_api_key_here'
  );

  return {
    nodeEnv: config.nodeEnv,
    ai: {
      provider: config.ai.provider,
      model: config.ai.provider === 'gemini' ? config.ai.gemini.model : null,
      configured: config.ai.provider === 'gemini' ? isGeminiConfigured : false
    }
  };
}

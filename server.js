import http from 'node:http';
import { pathToFileURL } from 'node:url';
import { getConfig, getPublicConfig } from './src/config/env.js';
import { DESTINATIONS, TIER_CONFIG } from './src/data/destinations.js';
import { AIConfigError, AIProviderError } from './src/services/ai/errors.js';
import { createAIProvider, listAIProviders } from './src/services/ai/provider.js';
import { createTravelAssistant } from './src/services/ai/travelAssistant.js';
import { readJsonBody, sendError, sendJson, servePublicAsset } from './src/utils/http.js';

export function createAppServer(customConfig = null, customAiProvider = null) {
  const config = customConfig || getConfig();
  const aiProvider = customAiProvider || createAIProvider(config.ai);
  const travelAssistant = createTravelAssistant(aiProvider);

  return http.createServer(async (req, res) => {
    const method = (req.method || 'GET').toUpperCase();
    const url = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);
    const pathname = url.pathname;

    try {
      // Static frontend assets (strictly allowlisted)
      if (method === 'GET' || method === 'HEAD') {
        const served = await servePublicAsset(pathname, res);
        if (served) return;
      }

      // API: Health & safe AI provider status (never exposes API keys)
      if (method === 'GET' && pathname === '/api/health') {
        const publicConfig = getPublicConfig(config);
        return sendJson(res, 200, {
          ok: true,
          app: 'Wanderly AI',
          status: 'healthy',
          timestamp: new Date().toISOString(),
          ...publicConfig,
          ai: {
            ...publicConfig.ai,
            configured: aiProvider.isConfigured(),
            supportedProviders: listAIProviders()
          }
        });
      }

      // API: Destinations catalog & booking tiers
      if (method === 'GET' && pathname === '/api/destinations') {
        return sendJson(res, 200, {
          ok: true,
          destinations: Object.values(DESTINATIONS),
          tiers: TIER_CONFIG
        });
      }

      // API: Real AI Travel Assistant chat
      if (method === 'POST' && pathname === '/api/ai/chat') {
        const body = await readJsonBody(req);
        const result = await travelAssistant.chat({
          message: body?.message,
          history: body?.history
        });

        return sendJson(res, 200, {
          ok: true,
          reply: result.reply,
          provider: result.provider,
          model: result.model,
          usage: result.usage
        });
      }

      // Unmatched API routes
      if (pathname.startsWith('/api/')) {
        return sendError(res, 404, `Endpoint not found: ${method} ${pathname}`, 'NOT_FOUND');
      }

      return sendError(res, 404, 'Resource not found.', 'NOT_FOUND');
    } catch (err) {
      if (err instanceof AIConfigError) {
        return sendError(res, err.statusCode, err.message, 'AI_NOT_CONFIGURED');
      }
      if (err instanceof AIProviderError) {
        return sendError(res, err.statusCode, err.message, 'AI_PROVIDER_ERROR');
      }

      const status = err?.statusCode || 500;
      const message = status >= 500 ? 'Internal server error.' : err.message;
      if (status >= 500) {
        console.error('[Wanderly Server Error]', err?.message || err);
      }
      return sendError(res, status, message, 'SERVER_ERROR');
    }
  });
}

// Start server when executed directly
const isMainModule =
  Boolean(process.argv[1]) && pathToFileURL(process.argv[1]).href === import.meta.url;

if (isMainModule) {
  const config = getConfig();
  const server = createAppServer(config);
  server.listen(config.port, () => {
    const publicConfig = getPublicConfig(config);
    console.log(`Wanderly AI server listening on http://localhost:${config.port}`);
    console.log(
      `AI Provider: ${publicConfig.ai.provider} (model: ${publicConfig.ai.model}, configured: ${publicConfig.ai.configured})`
    );
  });

  const shutdown = () => {
    server.close(() => process.exit(0));
  };
  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
}

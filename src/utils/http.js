import fs from 'node:fs/promises';
import path from 'node:path';
import { ROOT_DIR } from '../config/env.js';

const MAX_BODY_BYTES = 64 * 1024;

/**
 * Explicit allowlist of frontend files exposed over HTTP.
 * Prevents accidental exposure of .env, server.js, src/, data/, or package.json.
 */
const PUBLIC_FILES = new Map([
  ['/', { file: 'index.html', contentType: 'text/html; charset=utf-8' }],
  ['/index.html', { file: 'index.html', contentType: 'text/html; charset=utf-8' }],
  ['/style.css', { file: 'style.css', contentType: 'text/css; charset=utf-8' }],
  ['/script.js', { file: 'script.js', contentType: 'application/javascript; charset=utf-8' }]
]);

export function sendJson(res, statusCode, payload) {
  const body = JSON.stringify(payload);
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff'
  });
  res.end(body);
}

export function sendError(res, statusCode, message, code = 'REQUEST_ERROR') {
  sendJson(res, statusCode, {
    ok: false,
    error: {
      code,
      message
    }
  });
}

export async function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let totalBytes = 0;
    const chunks = [];

    req.on('data', (chunk) => {
      totalBytes += chunk.length;
      if (totalBytes > MAX_BODY_BYTES) {
        const err = new Error('Request payload too large.');
        err.statusCode = 413;
        reject(err);
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });

    req.on('end', () => {
      if (chunks.length === 0) {
        resolve({});
        return;
      }
      const raw = Buffer.concat(chunks).toString('utf8');
      try {
        resolve(JSON.parse(raw));
      } catch {
        const err = new Error('Invalid JSON payload.');
        err.statusCode = 400;
        reject(err);
      }
    });

    req.on('error', (err) => reject(err));
  });
}

export async function servePublicAsset(reqPath, res) {
  const entry = PUBLIC_FILES.get(reqPath);
  if (!entry) return false;

  const fullPath = path.join(ROOT_DIR, entry.file);
  try {
    const content = await fs.readFile(fullPath);
    res.writeHead(200, {
      'Content-Type': entry.contentType,
      'X-Content-Type-Options': 'nosniff'
    });
    res.end(content);
    return true;
  } catch {
    sendError(res, 500, 'Unable to load requested asset.', 'ASSET_READ_ERROR');
    return true;
  }
}

import fs from 'node:fs/promises';
import path from 'node:path';
import { ROOT_DIR } from '../config/env.js';

const DATA_DIR = path.join(ROOT_DIR, 'data');
const STORE_PATH = path.join(DATA_DIR, 'store.json');

const DEFAULT_STORE = {
  favoritesBySession: {},
  itinerariesBySession: {}
};

let writeQueue = Promise.resolve();

async function ensureStoreFile() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(STORE_PATH);
  } catch {
    await fs.writeFile(STORE_PATH, JSON.stringify(DEFAULT_STORE, null, 2), 'utf8');
  }
}

export async function readStore() {
  await ensureStoreFile();
  try {
    const raw = await fs.readFile(STORE_PATH, 'utf8');
    const parsed = JSON.parse(raw);
    return {
      favoritesBySession: parsed?.favoritesBySession || {},
      itinerariesBySession: parsed?.itinerariesBySession || {}
    };
  } catch {
    return structuredClone(DEFAULT_STORE);
  }
}

export function updateStore(updater) {
  writeQueue = writeQueue.then(async () => {
    const current = await readStore();
    const next = await updater(current);
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(STORE_PATH, JSON.stringify(next, null, 2), 'utf8');
    return next;
  });
  return writeQueue;
}

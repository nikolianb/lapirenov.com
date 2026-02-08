/**
 * Side-effect module: loads environment variables during import.
 * Must be imported BEFORE any module that reads process.env
 * (e.g. PrismaClient which needs DATABASE_URL).
 */
import { writeFileSync } from 'node:fs';
import { loadEnv } from './env.js';

try {
  loadEnv();
  writeFileSync('server-init.json', JSON.stringify({
    step: 'init-env',
    time: new Date().toISOString(),
    DATABASE_URL: process.env.DATABASE_URL ? 'set' : 'missing',
    DB_HOST: process.env.DB_HOST || 'not set',
    PORT: process.env.PORT || 'not set',
  }, null, 2));
} catch (err) {
  writeFileSync('server-init-error.json', JSON.stringify({
    error: err.message,
    stack: err.stack,
  }, null, 2));
}

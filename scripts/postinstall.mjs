/**
 * Postinstall hook — runs after npm install.
 * Only executes the full build in production (when DB_HOST is set
 * as an OS-level env var, e.g. from Hostinger's panel).
 * Locally, DB_HOST is only in .env (not the OS env), so this is skipped.
 */
if (!process.env.DB_HOST) {
  process.exit(0);
}

import { execSync } from 'node:child_process';
import { writeFileSync, unlinkSync } from 'node:fs';
import { loadEnv } from '../server/lib/env.js';

loadEnv();

// Write a .env file so the server can read it at runtime.
// Passenger does not forward Hostinger panel env vars to the Node process.
const envKeys = [
  'DB_CONNECTION', 'DB_HOST', 'DB_PORT', 'DB_DATABASE',
  'DB_USERNAME', 'DB_PASSWORD', 'DATABASE_URL',
  'SESSION_SECRET', 'ADMIN_EMAIL', 'ADMIN_PASSWORD',
  'NODE_ENV', 'PORT',
];
const envLines = envKeys
  .filter((key) => process.env[key])
  .map((key) => `${key}=${process.env[key]}`);
writeFileSync('.env', envLines.join('\n') + '\n');
console.log(`[postinstall] Wrote .env with ${envLines.length} vars`);

const run = (cmd) => execSync(cmd, { stdio: 'inherit', env: process.env });

console.log('[postinstall] Production detected — running build...');
run('prisma migrate deploy');
run('prisma generate');
run('vite build');

// Remove root index.html so Apache does not serve it as a fallback.
// The Express server serves the SPA from dist/index.html instead.
try { unlinkSync('index.html'); } catch {}
console.log('[postinstall] Removed root index.html');
console.log('[postinstall] Build complete.');

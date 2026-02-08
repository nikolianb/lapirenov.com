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
import { unlinkSync } from 'node:fs';
import { loadEnv } from '../server/lib/env.js';

loadEnv();

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

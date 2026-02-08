/**
 * Wrapper that loads env with proper URL-encoding
 * before running a prisma command.
 *
 * Usage: node scripts/prisma-with-env.mjs <command...>
 * Example: node scripts/prisma-with-env.mjs prisma migrate deploy
 */
import { execSync } from 'node:child_process';
import { loadEnv } from '../server/lib/env.js';

loadEnv();

const command = process.argv.slice(2).join(' ');
if (!command) {
  console.error('Usage: node scripts/prisma-with-env.mjs <command>');
  process.exit(1);
}

execSync(command, { stdio: 'inherit', env: process.env });

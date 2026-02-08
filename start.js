/**
 * Entry point wrapper — catches startup errors and writes them
 * to a file that can be accessed via the browser for diagnostics.
 */
import { writeFileSync } from 'node:fs';

try {
  await import('./server.js');
} catch (error) {
  const info = {
    message: error.message,
    stack: error.stack,
    time: new Date().toISOString(),
  };
  console.error('[STARTUP ERROR]', error);
  try {
    writeFileSync('startup-error.json', JSON.stringify(info, null, 2));
  } catch {}
  process.exit(1);
}

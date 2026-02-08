/**
 * Entry point wrapper — catches startup errors and logs them.
 */
import('./server.js').catch((error) => {
  console.error('[STARTUP ERROR]', error);
  process.exit(1);
});

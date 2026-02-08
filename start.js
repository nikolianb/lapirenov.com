/**
 * Entry point wrapper — catches startup errors and logs them.
 */
try {
  await import('./server.js');
} catch (error) {
  console.error('[STARTUP ERROR]', error);
  process.exit(1);
}

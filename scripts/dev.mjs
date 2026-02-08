import { spawn } from 'node:child_process';

const commands = [
  { name: 'web', command: 'npm run dev:web' },
  { name: 'api', command: 'npm run dev:api' },
];

const children = [];
let shuttingDown = false;

function stopAll(exitCode = 0) {
  if (shuttingDown) {
    return;
  }
  shuttingDown = true;
  process.exitCode = exitCode;

  for (const child of children) {
    if (!child.killed) {
      child.kill('SIGTERM');
    }
  }
}

for (const command of commands) {
  const child = spawn(command.command, {
    stdio: 'inherit',
    env: process.env,
    shell: true,
  });

  children.push(child);

  child.on('exit', (code, signal) => {
    if (shuttingDown) {
      return;
    }

    if (code === 0 || signal === 'SIGTERM') {
      stopAll(0);
      return;
    }

    console.error(`[dev] ${command.name} exited with code ${code ?? 'unknown'}${signal ? ` (${signal})` : ''}`);
    stopAll(code ?? 1);
  });
}

process.on('SIGINT', () => stopAll(0));
process.on('SIGTERM', () => stopAll(0));

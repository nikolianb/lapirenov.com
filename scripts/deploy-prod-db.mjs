import { execSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

// Load .env.production
const envPath = resolve(root, '.env.production');
const envContent = readFileSync(envPath, 'utf-8');
const prodEnv = { ...process.env };

for (const line of envContent.split('\n')) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('#')) continue;
  const eqIndex = trimmed.indexOf('=');
  if (eqIndex === -1) continue;
  const key = trimmed.slice(0, eqIndex).trim();
  let value = trimmed.slice(eqIndex + 1).trim();
  // Strip surrounding quotes
  if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
    value = value.slice(1, -1);
  }
  prodEnv[key] = value;
}

function run(label, command) {
  console.log(`\n=> ${label}`);
  console.log(`   $ ${command}\n`);
  try {
    execSync(command, { cwd: root, stdio: 'inherit', env: prodEnv });
    console.log(`\n   [OK] ${label}\n`);
  } catch {
    console.error(`\n   [FAIL] ${label}\n`);
    process.exit(1);
  }
}

console.log('========================================');
console.log(' Production DB Deploy');
console.log(` Database: ${prodEnv.DB_DATABASE}`);
console.log(` Host:     ${prodEnv.DB_HOST}:${prodEnv.DB_PORT}`);
console.log('========================================');

run('Prisma Generate',        'npx prisma generate');
run('Prisma Migrate Deploy',  'npx prisma migrate deploy');
run('Prisma Seed',            'node prisma/seed.js');

console.log('========================================');
console.log(' All done! Production DB is ready.');
console.log('========================================');

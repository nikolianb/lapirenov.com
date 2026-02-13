import dotenv from 'dotenv';

const DEFAULT_DB_CONNECTION = 'mysql';
const DEFAULT_DB_HOST = '127.0.0.1';
const DEFAULT_DB_PORT = '3306';
const DEFAULT_DB_DATABASE = 'lapirenov';
const DEFAULT_DB_USERNAME = 'root';

const encode = (value) => encodeURIComponent(value ?? '');

function buildDatabaseUrlFromParts() {
  const connection = process.env.DB_CONNECTION || DEFAULT_DB_CONNECTION;
  const host = process.env.DB_HOST || DEFAULT_DB_HOST;
  const port = process.env.DB_PORT || DEFAULT_DB_PORT;
  const database = process.env.DB_DATABASE || DEFAULT_DB_DATABASE;
  const username = process.env.DB_USERNAME || DEFAULT_DB_USERNAME;
  const password = process.env.DB_PASSWORD || '';
  const auth = password
    ? `${encode(username)}:${encode(password)}`
    : encode(username);

  return `${connection}://${auth}@${host}:${port}/${database}`;
}

export function loadEnv() {
  dotenv.config();

  // Always build DATABASE_URL from parts when DB vars are present,
  // so the password is always properly URL-encoded.
  if (process.env.DB_HOST || process.env.DB_USERNAME) {
    process.env.DATABASE_URL = buildDatabaseUrlFromParts();
  } else if (!process.env.DATABASE_URL) {
    process.env.DATABASE_URL = buildDatabaseUrlFromParts();
  }

  if (!process.env.SESSION_SECRET) {
    process.env.SESSION_SECRET = 'change-me-in-production';
  }

  if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) {
    throw new Error('ADMIN_EMAIL and ADMIN_PASSWORD must be set in environment');
  }
}


/**
 * Side-effect module: loads environment variables during import.
 * Must be imported BEFORE any module that reads process.env
 * (e.g. PrismaClient which needs DATABASE_URL).
 */
import { loadEnv } from './env.js';

loadEnv();

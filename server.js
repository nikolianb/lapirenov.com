// init-env MUST be the first import — it calls loadEnv() during
// module evaluation, before PrismaClient reads DATABASE_URL.
import './server/lib/init-env.js';
import express from 'express';
import path from 'path';
import session from 'express-session';
import fs from 'fs';
import { fileURLToPath } from 'url';
import publicRoutes from './server/routes/public.js';
import adminRoutes from './server/routes/admin.js';
import { uploadsAbsolutePath } from './server/lib/uploads.js';
import { prisma } from './server/lib/prisma.js';

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distPath = path.join(__dirname, 'dist');

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    name: 'lapirenov_admin_session',
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60 * 12,
    },
  }),
);

app.use('/uploads', express.static(uploadsAbsolutePath));
app.use('/api', publicRoutes);
app.use('/api/admin', adminRoutes);

app.get('/api/health', (req, res) => {
  res.json({ ok: true });
});

// Temporary debug endpoint — remove after fixing
app.get('/api/debug', async (req, res) => {
  try {
    const count = await prisma.project.count();
    const adminCount = await prisma.admin.count();
    res.json({
      db: 'connected',
      projects: count,
      admins: adminCount,
      DATABASE_URL: process.env.DATABASE_URL ? 'set' : 'missing',
      SESSION_SECRET: process.env.SESSION_SECRET ? 'set' : 'missing',
      NODE_ENV: process.env.NODE_ENV || 'not set',
    });
  } catch (err) {
    res.json({ db: 'error', message: err.message });
  }
});

if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));

  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) {
      return next();
    }
    return res.sendFile(path.join(distPath, 'index.html'));
  });
}

app.use((error, req, res, next) => {
  console.error(error);

  if (res.headersSent) {
    return next(error);
  }

  if (error.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({ error: 'Image trop volumineuse. Taille maximale: 5 MB.' });
  }

  if (error.message === 'Seules les images sont autorisees.') {
    return res.status(400).json({ error: error.message });
  }

  return res.status(500).json({ error: 'Erreur interne du serveur.', debug: error.message });
});

const port = Number(process.env.PORT) || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// init-env MUST run first — it calls loadEnv() during
// module evaluation, before PrismaClient reads DATABASE_URL.
import './server/lib/init-env.js';
import express from 'express';
import path from 'path';
import session from 'express-session';
import fs from 'fs';
import { fileURLToPath } from 'url';

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distPath = path.join(__dirname, 'dist');

// Health endpoint is registered BEFORE any other imports so it always works.
let startupError = null;

app.get('/api/health', (req, res) => {
  if (startupError) {
    return res.json({ ok: false, error: startupError });
  }
  return res.json({ ok: true });
});

// Load routes dynamically so a failure doesn't prevent the server from starting.
try {
  const { default: publicRoutes } = await import('./server/routes/public.js');
  const { default: adminRoutes } = await import('./server/routes/admin.js');
  const { uploadsAbsolutePath } = await import('./server/lib/uploads.js');

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

    return res.status(500).json({ error: 'Erreur interne du serveur.' });
  });
} catch (err) {
  startupError = err.message;
  console.error('[SERVER] Failed to load routes:', err);
}

const port = Number(process.env.PORT) || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

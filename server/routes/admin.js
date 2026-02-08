import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { prisma } from '../lib/prisma.js';
import {
  normalizeProjectImages,
  toProjectDto,
  validateProjectPayload,
} from '../lib/projects.js';
import { deleteUploadIfLocal, toPublicUploadPath, upload } from '../lib/uploads.js';

const router = Router();
const projectImageUpload = upload.fields([
  { name: 'imageFile', maxCount: 1 },
  { name: 'imageFiles', maxCount: 12 },
]);

function requireAdmin(req, res, next) {
  if (!req.session?.adminId) {
    return res.status(401).json({ error: 'Authentification requise.' });
  }
  return next();
}

function getUploadedFiles(req) {
  if (Array.isArray(req.files)) {
    return req.files;
  }

  if (req.file) {
    return [req.file];
  }

  if (req.files && typeof req.files === 'object') {
    return Object.values(req.files).flat().filter(Boolean);
  }

  return [];
}

function getUploadedImagePaths(req) {
  return getUploadedFiles(req)
    .map((file) => (typeof file?.filename === 'string' ? toPublicUploadPath(file.filename) : ''))
    .filter(Boolean);
}

function hasBodyField(req, key) {
  return Boolean(req.body && Object.prototype.hasOwnProperty.call(req.body, key));
}

function buildPayloadFromRequest(req, { fallbackImages = [], fallbackImage = '' } = {}) {
  const uploadedImages = getUploadedImagePaths(req);
  const bodyImage = typeof req.body?.image === 'string' ? req.body.image.trim() : '';
  const normalizedFallbackImages = normalizeProjectImages(fallbackImages, fallbackImage);
  let images = normalizedFallbackImages;
  let image = bodyImage || normalizedFallbackImages[0] || '';

  if (uploadedImages.length > 0) {
    images = uploadedImages;
    image = uploadedImages[0];
  } else if (hasBodyField(req, 'images')) {
    images = req.body.images;
    image = bodyImage;
  } else if (hasBodyField(req, 'image')) {
    images = bodyImage;
    image = bodyImage;
  }

  return {
    title: req.body?.title,
    category: req.body?.category,
    image,
    images,
    description: req.body?.description,
    detailedDescription: req.body?.detailedDescription,
    timeline: req.body?.timeline,
    budget: req.body?.budget,
    materials: req.body?.materials,
  };
}

async function removeUploadedFileIfAny(req) {
  const uploadedImagePaths = getUploadedImagePaths(req);
  for (const imagePath of uploadedImagePaths) {
    await deleteUploadIfLocal(imagePath);
  }
}

async function deleteProjectImages(images) {
  const normalizedImages = normalizeProjectImages(images);
  for (const imagePath of normalizedImages) {
    await deleteUploadIfLocal(imagePath);
  }
}

router.post('/login', async (req, res, next) => {
  try {
    const email = typeof req.body?.email === 'string' ? req.body.email.trim().toLowerCase() : '';
    const password = typeof req.body?.password === 'string' ? req.body.password : '';

    if (!email || !password) {
      return res.status(400).json({ error: 'Email et mot de passe requis.' });
    }

    const admin = await prisma.admin.findUnique({ where: { email } });
    if (!admin) {
      return res.status(401).json({ error: 'Identifiants invalides.' });
    }

    const matches = await bcrypt.compare(password, admin.passwordHash);
    if (!matches) {
      return res.status(401).json({ error: 'Identifiants invalides.' });
    }

    req.session.adminId = admin.id;
    req.session.adminEmail = admin.email;

    return res.json({
      admin: {
        id: admin.id,
        email: admin.email,
      },
    });
  } catch (error) {
    return next(error);
  }
});

router.post('/logout', (req, res) => {
  if (!req.session) {
    return res.status(204).end();
  }

  return req.session.destroy(() => {
    res.clearCookie('lapirenov_admin_session');
    res.status(204).end();
  });
});

router.get('/me', requireAdmin, async (req, res, next) => {
  try {
    const admin = await prisma.admin.findUnique({ where: { id: req.session.adminId } });
    if (!admin) {
      req.session.destroy(() => {});
      return res.status(401).json({ error: 'Session invalide.' });
    }

    return res.json({
      admin: {
        id: admin.id,
        email: admin.email,
      },
    });
  } catch (error) {
    return next(error);
  }
});

router.get('/projects', requireAdmin, async (req, res, next) => {
  try {
    const projects = await prisma.project.findMany({ orderBy: { id: 'asc' } });
    return res.json({ projects: projects.map(toProjectDto) });
  } catch (error) {
    return next(error);
  }
});

router.post('/projects', requireAdmin, projectImageUpload, async (req, res, next) => {
  try {
    const payload = buildPayloadFromRequest(req);
    const validation = validateProjectPayload(payload);
    if (!validation.ok) {
      await removeUploadedFileIfAny(req);
      return res.status(400).json({ error: 'Validation impossible.', details: validation.errors });
    }

    const project = await prisma.project.create({ data: validation.data });
    return res.status(201).json({ project: toProjectDto(project) });
  } catch (error) {
    await removeUploadedFileIfAny(req);
    return next(error);
  }
});

router.put('/projects/:id', requireAdmin, projectImageUpload, async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
      await removeUploadedFileIfAny(req);
      return res.status(400).json({ error: 'Identifiant projet invalide.' });
    }

    const currentProject = await prisma.project.findUnique({ where: { id } });
    if (!currentProject) {
      await removeUploadedFileIfAny(req);
      return res.status(404).json({ error: 'Projet introuvable.' });
    }

    const currentImages = normalizeProjectImages(currentProject.images, currentProject.image);
    const payload = buildPayloadFromRequest(req, {
      fallbackImages: currentImages,
      fallbackImage: currentProject.image,
    });
    const validation = validateProjectPayload(payload);
    if (!validation.ok) {
      await removeUploadedFileIfAny(req);
      return res.status(400).json({ error: 'Validation impossible.', details: validation.errors });
    }

    const project = await prisma.project.update({
      where: { id },
      data: validation.data,
    });

    const nextImages = normalizeProjectImages(project.images, project.image);
    const nextImageSet = new Set(nextImages);
    const deletedImages = currentImages.filter((imagePath) => !nextImageSet.has(imagePath));
    if (deletedImages.length > 0) {
      await deleteProjectImages(deletedImages);
    }

    return res.json({ project: toProjectDto(project) });
  } catch (error) {
    await removeUploadedFileIfAny(req);
    return next(error);
  }
});

router.delete('/projects/:id', requireAdmin, async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({ error: 'Identifiant projet invalide.' });
    }

    const project = await prisma.project.delete({ where: { id } });
    await deleteProjectImages(normalizeProjectImages(project.images, project.image));
    return res.status(204).end();
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Projet introuvable.' });
    }
    return next(error);
  }
});

export default router;

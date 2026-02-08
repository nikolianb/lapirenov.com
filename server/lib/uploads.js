import fs from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';
import multer from 'multer';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const uploadDir = path.resolve(__dirname, '../../uploads');
const MAX_FILE_SIZE = 5 * 1024 * 1024;

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

function sanitizeExtension(fileName) {
  const ext = path.extname(fileName || '').toLowerCase();
  return ext && ext.length <= 8 ? ext : '.jpg';
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const fileName = `${Date.now()}-${randomUUID()}${sanitizeExtension(file.originalname)}`;
    cb(null, fileName);
  },
});

function fileFilter(_req, file, cb) {
  if (typeof file.mimetype === 'string' && file.mimetype.startsWith('image/')) {
    cb(null, true);
    return;
  }

  cb(new Error('Seules les images sont autorisees.'));
}

export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: MAX_FILE_SIZE },
});

export const uploadsAbsolutePath = uploadDir;

export function toPublicUploadPath(fileName) {
  return `/uploads/${fileName}`;
}

export async function deleteUploadIfLocal(imagePath) {
  if (typeof imagePath !== 'string' || !imagePath.startsWith('/uploads/')) {
    return;
  }

  const fileName = imagePath.replace('/uploads/', '');
  const absolutePath = path.join(uploadDir, fileName);

  try {
    await fs.promises.unlink(absolutePath);
  } catch (error) {
    if (error.code !== 'ENOENT') {
      console.error('Unable to remove upload file:', absolutePath, error);
    }
  }
}


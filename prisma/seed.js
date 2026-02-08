import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import { projectsData } from '../src/data/projectData.js';
import { loadEnv } from '../server/lib/env.js';
import { normalizeMaterials, PROJECT_CATEGORIES } from '../server/lib/projects.js';

loadEnv();

const prisma = new PrismaClient();
const CATEGORY_SET = new Set(PROJECT_CATEGORIES);

async function seedAdmin() {
  const email = process.env.ADMIN_EMAIL.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;

  const passwordHash = await bcrypt.hash(password, 12);

  await prisma.admin.upsert({
    where: { email },
    update: { passwordHash },
    create: { email, passwordHash },
  });
}

function mapSeedProject(project) {
  const category = CATEGORY_SET.has(project.category) ? project.category : 'Other';
  const images = Array.isArray(project.images)
    ? project.images.filter((image) => typeof image === 'string' && image.trim().length > 0)
    : [];
  const normalizedImages = images.length > 0
    ? images
    : typeof project.image === 'string' && project.image.trim().length > 0
      ? [project.image.trim()]
      : [];

  return {
    id: project.id,
    title: project.title,
    category,
    image: normalizedImages[0] || '',
    images: normalizedImages,
    description: project.description,
    detailedDescription: project.detailedDescription,
    timeline: project.timeline,
    budget: project.budget,
    materials: normalizeMaterials(project.materials),
  };
}

async function seedProjects() {
  await prisma.project.deleteMany();

  for (const project of projectsData) {
    await prisma.project.create({
      data: mapSeedProject(project),
    });
  }
}

async function main() {
  await seedAdmin();
  await seedProjects();
  console.log('Seed completed: admin + projects created.');
}

main()
  .catch((error) => {
    console.error('Seed failed:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

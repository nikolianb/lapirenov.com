import { Router } from 'express';
import { prisma } from '../lib/prisma.js';
import { toProjectDto } from '../lib/projects.js';

const router = Router();

router.get('/projects', async (req, res, next) => {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { id: 'asc' },
    });

    res.json({ projects: projects.map(toProjectDto) });
  } catch (error) {
    next(error);
  }
});

export default router;


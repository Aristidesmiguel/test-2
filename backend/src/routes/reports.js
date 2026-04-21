import { Router } from 'express';
import { z } from 'zod';
import { validateBody } from '../middleware/validate.js';
import { authenticate } from '../middleware/auth.js';
import { create, list } from '../services/mockDb.js';

const router = Router();

const reportSchema = z.object({
  description: z.string().min(5),
  photoUrl: z.string().url().optional(),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  severity: z.enum(['baixa', 'media', 'alta']).default('media')
});

router.post('/', authenticate, validateBody(reportSchema), (req, res) => {
  const report = create('reports', {
    ...req.body,
    userId: req.user.sub,
    status: 'pendente'
  });

  return res.status(201).json(report);
});

router.get('/', authenticate, (req, res) => {
  return res.json(list('reports'));
});

export default router;

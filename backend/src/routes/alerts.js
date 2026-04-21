import { Router } from 'express';
import { z } from 'zod';
import { validateBody } from '../middleware/validate.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';
import { create, list, countRecentReports } from '../services/mockDb.js';
import { getWeatherByCoordinates } from '../services/weatherService.js';
import { evaluateFloodRisk } from '../services/riskService.js';
import { sendSmsMock } from '../services/telecomService.js';

const router = Router();

const alertSchema = z.object({
  title: z.string().min(3),
  message: z.string().min(8),
  latitude: z.number(),
  longitude: z.number(),
  radiusKm: z.number().positive().max(50),
  level: z.enum(['baixo', 'medio', 'alto'])
});

router.get('/', authenticate, (req, res) => {
  return res.json(list('alerts'));
});

router.post('/', authenticate, requireAdmin, validateBody(alertSchema), async (req, res) => {
  const alert = create('alerts', {
    ...req.body,
    status: 'ativo',
    createdBy: req.user.sub,
    source: 'manual'
  });

  await sendSmsMock({
    phoneNumber: '+244900000001',
    message: `[SIMAI] ${alert.title}: ${alert.message}`
  });

  return res.status(201).json(alert);
});

router.post('/auto-generate', authenticate, requireAdmin, async (req, res) => {
  const latitude = Number(req.query.latitude || -8.83);
  const longitude = Number(req.query.longitude || 13.23);

  const weather = await getWeatherByCoordinates({ latitude, longitude });
  const recentReports = countRecentReports(6);
  const risk = evaluateFloodRisk({
    rainfallMm: weather.next6hRainMm,
    recentReports
  });

  if (risk.level === 'baixo') {
    return res.json({ message: 'Sem risco relevante para gerar alerta', risk, weather });
  }

  const alert = create('alerts', {
    title: `Risco ${risk.level.toUpperCase()} de inundação`,
    message: `Atenção para áreas baixas. Motivo: ${risk.reason}`,
    latitude,
    longitude,
    radiusKm: 10,
    level: risk.level,
    status: 'ativo',
    source: 'automatico'
  });

  return res.status(201).json({ alert, risk, weather, recentReports });
});

export default router;

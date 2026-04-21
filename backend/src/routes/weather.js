import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';
import { getWeatherByCoordinates } from '../services/weatherService.js';

const router = Router();

router.get('/', authenticate, async (req, res) => {
  const latitude = Number(req.query.latitude || -8.83);
  const longitude = Number(req.query.longitude || 13.23);
  const weather = await getWeatherByCoordinates({ latitude, longitude });
  return res.json(weather);
});

export default router;

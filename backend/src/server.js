import express from 'express';
import cors from 'cors';
import { env } from './config/env.js';
import { initializeFirebase } from './config/firebase.js';
import reportsRoutes from './routes/reports.js';
import alertsRoutes from './routes/alerts.js';
import weatherRoutes from './routes/weather.js';
import telecomRoutes from './routes/telecom.js';

initializeFirebase();

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'SIMAI API' });
});

app.use('/reports', reportsRoutes);
app.use('/alerts', alertsRoutes);
app.use('/weather', weatherRoutes);
app.use('/telecom', telecomRoutes);

app.use((err, _req, res, _next) => {
  console.error('[SIMAI][ERROR]', err);
  res.status(500).json({ message: 'Erro interno no servidor' });
});

app.listen(env.port, () => {
  console.log(`[SIMAI] API rodando na porta ${env.port}`);
});

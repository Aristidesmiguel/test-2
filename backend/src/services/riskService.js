import { env } from '../config/env.js';

export function evaluateFloodRisk({ rainfallMm, recentReports }) {
  if (rainfallMm > env.rainfallHighThresholdMm && recentReports >= env.minReportsForHighRisk) {
    return {
      level: 'alto',
      color: 'vermelho',
      reason: `Chuva ${rainfallMm.toFixed(1)}mm e ${recentReports} reportes recentes`
    };
  }

  if (rainfallMm > env.rainfallMediumThresholdMm) {
    return {
      level: 'medio',
      color: 'amarelo',
      reason: `Chuva prevista de ${rainfallMm.toFixed(1)}mm`
    };
  }

  return {
    level: 'baixo',
    color: 'verde',
    reason: 'Sem indicadores críticos'
  };
}

import dotenv from 'dotenv';

dotenv.config();

export const env = {
  port: Number(process.env.PORT || 4000),
  jwtSecret: process.env.JWT_SECRET || 'simai-dev-secret',
  weatherBaseUrl: process.env.WEATHER_BASE_URL || 'https://api.open-meteo.com/v1/forecast',
  rainfallMediumThresholdMm: Number(process.env.RAIN_MEDIUM_MM || 20),
  rainfallHighThresholdMm: Number(process.env.RAIN_HIGH_MM || 50),
  minReportsForHighRisk: Number(process.env.MIN_REPORTS_HIGH_RISK || 3)
};

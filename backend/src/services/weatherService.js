import { env } from '../config/env.js';

export async function getWeatherByCoordinates({ latitude, longitude }) {
  const url = new URL(env.weatherBaseUrl);
  url.searchParams.set('latitude', latitude);
  url.searchParams.set('longitude', longitude);
  url.searchParams.set('hourly', 'precipitation');
  url.searchParams.set('forecast_days', '1');

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Falha ao consultar API meteorológica');
  }

  const data = await response.json();
  const precipitations = data?.hourly?.precipitation || [];
  const next6hRainMm = precipitations.slice(0, 6).reduce((sum, value) => sum + Number(value || 0), 0);

  return {
    source: 'Open-Meteo',
    latitude,
    longitude,
    next6hRainMm,
    raw: data
  };
}

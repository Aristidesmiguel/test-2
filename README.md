# SIMAI — Sistema Inteligente de Monitoramento e Alerta de Inundações (Angola)

Plataforma MVP com app mobile, painel web e API para monitoramento de risco de inundações em Angola.

## Arquitetura

- **mobile/**: app React Native (Expo) para cidadãos reportarem inundações e receberem alertas.
- **web/**: dashboard Next.js para administração e monitoramento.
- **backend/**: API Node.js + Express com regras de risco e integração meteorológica.
- **Firebase (planejado)**: Firestore, Auth e FCM (estrutura pronta no backend, com fallback mock local).

## Funcionalidades implementadas (MVP)

### Mobile
- Mapa de risco simplificado por município (verde/amarelo/vermelho).
- Formulário de reporte de inundação (descrição, GPS/foto previstos no fluxo).
- Botão de emergência (fluxo preparado).
- Histórico de alertas.

### Web Admin
- Dashboard com eventos/reportes em tempo real (mock).
- Bloco de dados meteorológicos e risco.
- Ações de moderação e envio manual de alertas (estrutura).

### Backend API
- `POST /reports` → criar relatório de inundação.
- `GET /reports` → listar relatórios.
- `GET /alerts` → listar alertas ativos.
- `POST /alerts` → criar alerta manual (admin).
- `POST /alerts/auto-generate` → gerar alerta automático com base no risco.
- `GET /weather` → consultar chuva via Open-Meteo.
- `POST /telecom/sms` → simular envio de SMS.
- `GET /telecom/ussd` → menu USSD simulado.

## Lógica inteligente de risco (MVP)

- Se chuva prevista nas próximas 6h > `RAIN_MEDIUM_MM` → risco **médio**.
- Se chuva > `RAIN_HIGH_MM` **e** reportes recentes >= `MIN_REPORTS_HIGH_RISK` → risco **alto**.
- Caso contrário → risco **baixo**.

## Como executar

### Backend
```bash
cd backend
npm install
npm run dev
```

Variáveis importantes:

```env
PORT=4000
JWT_SECRET=simai-dev-secret
WEATHER_BASE_URL=https://api.open-meteo.com/v1/forecast
RAIN_MEDIUM_MM=20
RAIN_HIGH_MM=50
MIN_REPORTS_HIGH_RISK=3
FIREBASE_PROJECT_ID=
```

### Mobile
```bash
cd mobile
npm install
npm start
```

### Web
```bash
cd web
npm install
npm run dev
```

## Autenticação

A API usa Bearer token JWT no formato:

```json
{
  "sub": "user-123",
  "role": "admin" // ou "user"
}
```

Assinado com `JWT_SECRET`.

## Próximos passos recomendados

1. Conectar Firestore/Firebase Auth/FCM reais.
2. Integrar mapas reais (Google Maps ou Mapbox) no app e no dashboard.
3. Adicionar upload real de fotos (Firebase Storage).
4. Implementar workers para alertas automáticos periódicos por município.
5. Integrar gateway SMS/USSD real de operadora em Angola.

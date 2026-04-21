export async function sendSmsMock({ phoneNumber, message }) {
  const response = {
    provider: 'MockSMS Angola',
    status: 'queued',
    phoneNumber,
    message,
    sentAt: new Date().toISOString()
  };

  console.log('[SMS-MOCK]', response);
  return response;
}

export function getUssdMenu(session = 'root') {
  const menus = {
    root: {
      text: 'SIMAI\n1. Risco na minha zona\n2. Reportar inundação\n3. Emergência',
      next: ['risk', 'report', 'emergency']
    },
    risk: {
      text: 'Digite o código do município para receber o nível de risco atual.',
      next: []
    },
    report: {
      text: 'Envie SMS para 40040 com: INUNDACAO#MUNICIPIO#DESCRICAO',
      next: []
    },
    emergency: {
      text: 'Ligue 113 (Proteção Civil) e compartilhe sua localização.',
      next: []
    }
  };

  return menus[session] || menus.root;
}

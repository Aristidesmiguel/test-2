const reports = [
  { id: 1, municipality: 'Luanda', severity: 'alta', status: 'pendente' },
  { id: 2, municipality: 'Benguela', severity: 'media', status: 'aprovado' }
];

const weatherData = [
  { municipality: 'Luanda', rainMm: 58, risk: 'alto' },
  { municipality: 'Huambo', rainMm: 21, risk: 'medio' }
];

export function Dashboard() {
  return (
    <main style={{ padding: 24, fontFamily: 'sans-serif', background: '#f8fafc', minHeight: '100vh' }}>
      <h1>SIMAI Admin Dashboard</h1>
      <section>
        <h2>Eventos em tempo real</h2>
        <ul>
          {reports.map((report) => (
            <li key={report.id}>
              {report.municipality} - {report.severity.toUpperCase()} - {report.status}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Clima e risco</h2>
        <ul>
          {weatherData.map((w) => (
            <li key={w.municipality}>
              {w.municipality}: {w.rainMm}mm ({w.risk})
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Operações</h2>
        <button style={{ marginRight: 8 }}>Aprovar reportes</button>
        <button style={{ marginRight: 8 }}>Enviar alerta manual</button>
        <button>Ver estatísticas</button>
      </section>
    </main>
  );
}

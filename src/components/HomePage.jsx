export default function HomePage({ card, setActivePage }) {
  return (
    <div className="page-content">
      <div className="hero-panel">
        <p className="eyebrow">Prototipo vendibile</p>
        <h2>Digital card premium, costruite come mini siti personali.</h2>
        <p>
          Una piattaforma semplice, elegante e scalabile per creare card digitali con identità forte,
          QR code, link pubblico e anteprima smartphone.
        </p>
        <div className="button-row">
          <button className="primary-button" onClick={() => setActivePage('editor')}>Modifica card demo</button>
          <button className="secondary-button" onClick={() => setActivePage('share')}>Vedi QR / Share</button>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card"><span>Card attiva</span><strong>{card.productName}</strong></div>
        <div className="stat-card"><span>Stile</span><strong>Premium dark</strong></div>
        <div className="stat-card"><span>Database</span><strong>Fase 2</strong></div>
      </div>

      <div className="section-card">
        <h3>La logica di partenza</h3>
        <p>
          Questa versione non usa ancora login o Supabase: serve a validare struttura, grafica e valore commerciale
          senza complicazioni tecniche. Dopo l’approvazione, collegheremo utenti, database e salvataggio reale.
        </p>
      </div>
    </div>
  );
}

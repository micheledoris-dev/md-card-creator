export default function ComingSoon({ title, subtitle }) {
  return (
    <div className="coming-soon">
      <span>Coming soon</span>
      <h2>{title}</h2>
      <p>{subtitle}</p>
      <div className="roadmap-card">
        <strong>Fase successiva</strong>
        <p>Questa area sarà attivata dopo la validazione del prototipo e l’integrazione con database, login e salvataggio reale.</p>
      </div>
    </div>
  );
}

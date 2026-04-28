const accents = ['#00E5FF', '#D6B36A', '#6C63FF', '#10B981', '#EF4444', '#111111'];

export default function BrandingPage({ card, onChange }) {
  return (
    <div className="page-content">
      <div className="page-title">
        <p className="eyebrow">Branding</p>
        <h2>Identità visiva</h2>
        <p>La piattaforma resta nero / bianco / grigio premium. Ogni card può avere il proprio colore accento.</p>
      </div>
      <div className="palette-row">
        {accents.map((color) => (
          <button key={color} className={`swatch ${card.accent === color ? 'selected' : ''}`} style={{ background: color }} onClick={() => onChange('accent', color)} aria-label={`Colore ${color}`} />
        ))}
      </div>
      <div className="section-card">
        <h3>Principio guida</h3>
        <p>
          md|studios Card Creator deve sembrare uno strumento premium: sobrio, ordinato, vendibile.
          Le card invece possono adattarsi al brand del cliente.
        </p>
      </div>
    </div>
  );
}

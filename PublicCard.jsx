const fields = [
  ['productName', 'Nome card'],
  ['claim', 'Claim'],
  ['headline', 'Headline'],
  ['description', 'Descrizione'],
  ['website', 'Sito web'],
  ['email', 'Email'],
  ['phone', 'Telefono / WhatsApp'],
];

export default function CardEditor({ card, onChange }) {
  return (
    <div className="page-content">
      <div className="page-title">
        <p className="eyebrow">Editor</p>
        <h2>Modifica la card demo</h2>
        <p>In questa prima versione i dati cambiano a video. Il salvataggio reale arriverà con Supabase.</p>
      </div>
      <div className="form-grid">
        {fields.map(([field, label]) => (
          <label key={field} className="field-label">
            <span>{label}</span>
            {field === 'description' ? (
              <textarea value={card[field]} onChange={(event) => onChange(field, event.target.value)} />
            ) : (
              <input value={card[field]} onChange={(event) => onChange(field, event.target.value)} />
            )}
          </label>
        ))}
        <label className="field-label">
          <span>Colore accento</span>
          <input type="color" value={card.accent} onChange={(event) => onChange('accent', event.target.value)} />
        </label>
      </div>
    </div>
  );
}

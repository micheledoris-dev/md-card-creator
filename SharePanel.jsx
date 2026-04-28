export default function PhonePreview({ card }) {
  return (
    <div className="phone-frame">
      <div className="phone-screen" style={{ background: card.background }}>
        <div className="phone-glow" style={{ background: card.accent }} />
        <div className="phone-logo" style={{ borderColor: card.accent, color: card.accent }}>{card.logoText}</div>
        <span className="phone-badge">{card.badge}</span>
        <p className="phone-claim">{card.claim}</p>
        <h3>{card.headline}</h3>
        <p className="phone-description">{card.description}</p>
        <div className="phone-actions">
          <a href={card.website} target="_blank" rel="noreferrer" style={{ background: card.accent }}>Visita il sito</a>
          <a href={`https://wa.me/${card.whatsapp}`} target="_blank" rel="noreferrer">WhatsApp</a>
        </div>
        <div className="phone-feature-list">
          {card.sections.map((section) => (
            <div key={section.title}>
              <strong>{section.title}</strong>
              <span>{section.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

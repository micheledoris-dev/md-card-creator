export default function PublicCard({ card }) {
  return (
    <div className="public-wrap" style={{ '--accent': card.accent }}>
      <section className="public-hero">
        <div className="public-logo">{card.logoText}</div>
        <span>{card.badge}</span>
        <p>{card.claim}</p>
        <h2>{card.headline}</h2>
        <p className="public-description">{card.description}</p>
        <div className="button-row center">
          <a className="primary-link" href={card.website} target="_blank" rel="noreferrer">Visita il sito</a>
          <a className="secondary-link" href={`https://wa.me/${card.whatsapp}`} target="_blank" rel="noreferrer">WhatsApp</a>
          <a className="secondary-link" href={`mailto:${card.email}`}>Email</a>
        </div>
      </section>

      <section className="public-section">
        <h3>Funzioni principali</h3>
        <div className="public-grid">
          {card.sections.map((section) => (
            <article key={section.title}>
              <strong>{section.title}</strong>
              <p>{section.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="public-section">
        <h3>Utile per</h3>
        <div className="chips">
          {card.audience.map((item) => <span key={item}>{item}</span>)}
        </div>
      </section>

      <section className="public-contact">
        <h3>Contatti rapidi</h3>
        <p>{card.email}</p>
        <p>{card.phone}</p>
        <p>{card.website}</p>
      </section>
    </div>
  );
}

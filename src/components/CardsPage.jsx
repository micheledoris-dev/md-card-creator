export default function CardsPage({ cards, selectedId, setSelectedId, setActivePage }) {
  return (
    <div className="page-content">
      <div className="page-title">
        <p className="eyebrow">Cards</p>
        <h2>Le tue digital card</h2>
      </div>
      <div className="cards-list">
        {cards.map((card) => (
          <button key={card.id} className={`card-row ${selectedId === card.id ? 'selected' : ''}`} onClick={() => setSelectedId(card.id)}>
            <div className="mini-logo" style={{ borderColor: card.accent }}>{card.logoText}</div>
            <div>
              <strong>{card.productName}</strong>
              <span>{card.headline}</span>
            </div>
            <em>{card.badge}</em>
          </button>
        ))}
      </div>
      <button className="primary-button" onClick={() => setActivePage('editor')}>Apri editor</button>
    </div>
  );
}

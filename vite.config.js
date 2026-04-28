import { useMemo, useState } from 'react';
import { initialCards } from './data/cards.js';
import Sidebar from './components/Sidebar.jsx';
import HomePage from './components/HomePage.jsx';
import CardsPage from './components/CardsPage.jsx';
import CardEditor from './components/CardEditor.jsx';
import PhonePreview from './components/PhonePreview.jsx';
import PublicCard from './components/PublicCard.jsx';
import SharePanel from './components/SharePanel.jsx';
import BrandingPage from './components/BrandingPage.jsx';
import ComingSoon from './components/ComingSoon.jsx';

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [cards, setCards] = useState(initialCards);
  const [selectedId, setSelectedId] = useState(initialCards[0].id);

  const selectedCard = useMemo(
    () => cards.find((card) => card.id === selectedId) || cards[0],
    [cards, selectedId]
  );

  function updateSelectedCard(field, value) {
    setCards((current) =>
      current.map((card) => (card.id === selectedId ? { ...card, [field]: value } : card))
    );
  }

  const pages = {
    home: <HomePage card={selectedCard} setActivePage={setActivePage} />,
    cards: <CardsPage cards={cards} selectedId={selectedId} setSelectedId={setSelectedId} setActivePage={setActivePage} />,
    editor: <CardEditor card={selectedCard} onChange={updateSelectedCard} />,
    share: <SharePanel card={selectedCard} />,
    public: <PublicCard card={selectedCard} />,
    branding: <BrandingPage card={selectedCard} onChange={updateSelectedCard} />,
    wallet: <ComingSoon title="Wallet" subtitle="Apple Wallet e Google Wallet saranno collegati in una fase successiva." />,
    analytics: <ComingSoon title="Analytics" subtitle="Visualizzazioni, click, salvataggi e lead saranno tracciati quando aggiungeremo database e login." />,
    contacts: <ComingSoon title="Contacts / Leads" subtitle="Qui arriveranno contatti, richieste e opportunità generate dalle card." />,
    settings: <ComingSoon title="Settings" subtitle="Impostazioni account, lingua, dominio e preferenze piattaforma." />,
  };

  return (
    <div className="app-shell">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      <main className="workspace">
        <div className="topbar">
          <div>
            <p className="eyebrow">MVP 0.1</p>
            <h1>md|studios Card Creator</h1>
          </div>
          <button className="ghost-button" onClick={() => setActivePage('public')}>Apri demo pubblica</button>
        </div>
        <div className="main-grid">
          <section className="page-panel">{pages[activePage]}</section>
          <aside className="preview-panel">
            <div className="preview-header">
              <span>Anteprima smartphone</span>
              <strong>{selectedCard.productName}</strong>
            </div>
            <PhonePreview card={selectedCard} />
          </aside>
        </div>
      </main>
    </div>
  );
}

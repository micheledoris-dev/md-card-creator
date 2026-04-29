import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import './style.css'

const defaultCard = {
  name: 'myVeicolo.net',
  claim: 'Il tuo garage digitale',
  headline: 'Il cuore intelligente del tuo garage.',
  description: 'Tieni sotto controllo costi, scadenze, manutenzioni e consumi dei tuoi veicoli in un unico spazio digitale.',
  url: 'https://myveicolo.net',
  email: 'myveicolonet@gmail.com',
  phone: '+39 328 717 9900',
  accent: '#00E5FF',
  status: 'Pubblica',
  type: 'Prodotto digitale',
  updated: '29 Apr 2026',
  features: [
    ['Costi', 'Spese, manutenzioni, carburante, rate e leasing sempre sotto controllo.'],
    ['Scadenze', 'Assicurazione, bollo, revisione e collaudi in un’unica vista.'],
    ['Consumi', 'Analisi chiara dei consumi anche per benzina, diesel, GPL, metano, ibridi ed elettrici.']
  ],
  audience: ['Famiglie con più veicoli', 'Professionisti', 'Appassionati auto e moto', 'Piccole flotte']
}

const navItems = [
  ['home', 'Home', '⌂'],
  ['cards', 'Cards', '▭'],
  ['editor', 'Editor', '▯'],
  ['share', 'QR / Share', '▦'],
  ['public', 'Public Card', '↗'],
  ['wallet', 'Wallet', '◫'],
  ['analytics', 'Analytics', '▥'],
  ['branding', 'Branding', '◌'],
  ['contacts', 'Contacts', '☷'],
  ['settings', 'Settings', '⚙']
]

const roadmap = {
  wallet: ['Apple Wallet pass', 'Google Wallet pass', 'QR offline', 'Fase 2 dopo database'],
  analytics: ['Visite card', 'Click sui pulsanti', 'Salvataggi contatto', 'Report mensile'],
  branding: ['Colori globali', 'Logo cliente', 'Template premium', 'Brand kit'],
  contacts: ['Lead raccolti', 'Export contatti', 'Tag e note', 'Integrazioni CRM'],
  settings: ['Profilo account', 'Dominio custom', 'Lingua inglese', 'Privacy e termini']
}

function cleanPhone(phone) {
  return phone.replace(/\D/g, '')
}

function App() {
  const [active, setActive] = useState('home')
  const [menuOpen, setMenuOpen] = useState(false)
  const [card, setCard] = useState(defaultCard)

  const isPublic = active === 'public'

  return (
    <div className={`app ${isPublic ? 'public-mode' : ''}`}>
      {!isPublic && (
        <Sidebar
          active={active}
          setActive={setActive}
          open={menuOpen}
          setOpen={setMenuOpen}
          card={card}
        />
      )}

      <main className={isPublic ? 'public-main' : 'main'}>
        {!isPublic && (
          <Topbar setMenuOpen={setMenuOpen} setActive={setActive} />
        )}

        {isPublic ? (
          <PublicCard card={card} setActive={setActive} />
        ) : (
          <div className="workspace">
            <div className="content-area">
              {active === 'home' && <HomePage card={card} setActive={setActive} />}
              {active === 'cards' && <CardsPage card={card} setActive={setActive} />}
              {active === 'editor' && <EditorPage card={card} setCard={setCard} setActive={setActive} />}
              {active === 'share' && <SharePage card={card} setActive={setActive} />}
              {['wallet', 'analytics', 'branding', 'contacts', 'settings'].includes(active) && (
                <ComingSoon page={active} />
              )}
            </div>

            <div className={`preview-column ${['wallet', 'analytics', 'branding', 'contacts', 'settings'].includes(active) ? 'hide-on-mobile' : ''}`}>
              <PhonePreview card={card} />
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

function Topbar({ setMenuOpen, setActive }) {
  return (
    <header className="topbar">
      <button className="menu-button" onClick={() => setMenuOpen(true)} aria-label="Apri menu">☰</button>
      <div className="mobile-title">
        <strong>md|studios</strong>
        <span>Card Creator</span>
      </div>
      <button className="ghost-button" onClick={() => setActive('public')}>Apri demo pubblica</button>
    </header>
  )
}

function Sidebar({ active, setActive, open, setOpen, card }) {
  return (
    <>
      <aside className={`sidebar ${open ? 'is-open' : ''}`}>
        <div className="side-head">
          <div className="brand-mark">md</div>
          <div>
            <strong>md|studios</strong>
            <span>Card Creator</span>
          </div>
          <button className="close-menu" onClick={() => setOpen(false)}>×</button>
        </div>

        <nav className="nav-list">
          {navItems.map(([key, label, icon]) => (
            <button
              key={key}
              className={`nav-item ${active === key ? 'active' : ''}`}
              onClick={() => { setActive(key); setOpen(false) }}
            >
              <span className="nav-icon">{icon}</span>
              <span>{label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-card">
          <small>Prima demo reale</small>
          <strong>{card.name}</strong>
          <span>{card.status} · {card.type}</span>
        </div>
      </aside>
      {open && <button className="scrim" onClick={() => setOpen(false)} aria-label="Chiudi menu" />}
    </>
  )
}

function HomePage({ card, setActive }) {
  return (
    <div className="page-stack">
      <section className="hero-card">
        <div className="hero-copy">
          <span className="eyebrow">MVP 0.3 · Demo presentabile</span>
          <h1>Digital card premium, costruite come mini siti personali.</h1>
          <p>Non solo contatti: una presenza digitale elegante, pronta da condividere con link, QR code, WhatsApp e futura integrazione Wallet.</p>
          <div className="button-row">
            <button onClick={() => setActive('editor')}>Modifica demo</button>
            <button className="light-button" onClick={() => setActive('share')}>QR / Share</button>
          </div>
        </div>
        <div className="hero-summary">
          <span>Card attiva</span>
          <strong>{card.name}</strong>
          <small>{card.headline}</small>
        </div>
      </section>

      <section className="process-grid">
        <article>
          <span>01</span>
          <h3>Crea</h3>
          <p>Parti da una card chiara, già pensata come mini sito.</p>
        </article>
        <article>
          <span>02</span>
          <h3>Personalizza</h3>
          <p>Adatta identità, testi, contatti, stile e colore accento.</p>
        </article>
        <article>
          <span>03</span>
          <h3>Condividi</h3>
          <p>Invia la card con QR, link pubblico, email e WhatsApp.</p>
        </article>
      </section>

      <section className="value-card">
        <span className="eyebrow">Perché ha senso</span>
        <h2>Prima una demo bella da mostrare. Poi database, login e SaaS.</h2>
        <p>Questa versione serve a validare il prodotto senza complicazioni tecniche. Una volta approvata la direzione, colleghiamo Supabase, utenti, salvataggio reale e card multiple.</p>
      </section>
    </div>
  )
}

function CardsPage({ card, setActive }) {
  return (
    <div className="page-panel">
      <div className="section-heading">
        <span className="eyebrow">Cards</span>
        <h1>Le tue digital card</h1>
        <p>Una prima card reale per mostrare subito il valore del prodotto.</p>
      </div>

      <article className="card-manager">
        <div className="card-avatar">MV</div>
        <div className="card-info">
          <strong>{card.name}</strong>
          <span>{card.headline}</span>
        </div>
        <div className="metric"><small>Stato</small><b>{card.status}</b></div>
        <div className="metric"><small>Tipo</small><b>{card.type}</b></div>
        <div className="metric"><small>Update</small><b>{card.updated}</b></div>
      </article>

      <div className="action-grid">
        <button onClick={() => setActive('editor')}>Modifica</button>
        <button className="soft-button" onClick={() => setActive('share')}>QR / Share</button>
        <button className="soft-button" onClick={() => setActive('public')}>Apri demo</button>
      </div>

      <section className="mini-roadmap">
        <h3>Prossima evoluzione</h3>
        <div>
          <span>Card multiple</span>
          <span>Template premium</span>
          <span>Salvataggio Supabase</span>
        </div>
      </section>
    </div>
  )
}

function EditorPage({ card, setCard, setActive }) {
  const update = (field, value) => setCard({ ...card, [field]: value })

  return (
    <div className="page-panel">
      <div className="section-heading split">
        <div>
          <span className="eyebrow">Editor</span>
          <h1>Modifica card demo</h1>
          <p>Dati modificabili a video. Il salvataggio reale arriverà con Supabase.</p>
        </div>
        <div className="compact-actions">
          <button className="soft-button" onClick={() => setActive('public')}>Anteprima</button>
          <button>Pubblica demo</button>
        </div>
      </div>

      <FormSection title="Identità">
        <label>Nome card<input value={card.name} onChange={(e) => update('name', e.target.value)} /></label>
        <label>Claim<input value={card.claim} onChange={(e) => update('claim', e.target.value)} /></label>
      </FormSection>

      <FormSection title="Hero pubblico">
        <label>Headline<input value={card.headline} onChange={(e) => update('headline', e.target.value)} /></label>
        <label>Descrizione<textarea value={card.description} onChange={(e) => update('description', e.target.value)} /></label>
      </FormSection>

      <FormSection title="Contatti e stile">
        <label>Sito web<input value={card.url} onChange={(e) => update('url', e.target.value)} /></label>
        <label>Email<input value={card.email} onChange={(e) => update('email', e.target.value)} /></label>
        <label>Telefono / WhatsApp<input value={card.phone} onChange={(e) => update('phone', e.target.value)} /></label>
        <label>Colore accento<input type="color" value={card.accent} onChange={(e) => update('accent', e.target.value)} /></label>
      </FormSection>
    </div>
  )
}

function FormSection({ title, children }) {
  return (
    <section className="form-section">
      <h2>{title}</h2>
      <div className="form-grid">{children}</div>
    </section>
  )
}

function SharePage({ card, setActive }) {
  const qr = `https://api.qrserver.com/v1/create-qr-code/?size=520x520&data=${encodeURIComponent(card.url)}`
  const mail = `mailto:${card.email}?subject=${encodeURIComponent(card.name)}&body=${encodeURIComponent(card.headline + '\n' + card.url)}`
  const wa = `https://wa.me/${cleanPhone(card.phone)}?text=${encodeURIComponent('Ti condivido ' + card.name + ': ' + card.url)}`

  return (
    <div className="page-panel">
      <div className="section-heading">
        <span className="eyebrow">QR / Share</span>
        <h1>Condividi la card</h1>
        <p>Link pubblico, QR code e pulsanti rapidi per inviare la card.</p>
        <strong className="active-pill">Link pubblico attivo</strong>
      </div>

      <div className="share-grid">
        <div className="qr-box">
          <img src={qr} alt="QR code myVeicolo" />
          <strong>QR pubblico</strong>
          <span>{card.url}</span>
        </div>
        <div className="share-box">
          <label>Link pubblico</label>
          <div className="url-pill">{card.url}</div>
          <button onClick={() => navigator.clipboard?.writeText(card.url)}>Copia link</button>
          <a className="soft-link" href={mail}>Invia email</a>
          <a className="soft-link" href={wa} target="_blank" rel="noreferrer">WhatsApp</a>
          <button className="soft-button" onClick={() => setActive('public')}>Apri card</button>
          <p>Usa questa sezione per mandare la demo ad amici, colleghi e primi contatti.</p>
        </div>
      </div>
    </div>
  )
}

function ComingSoon({ page }) {
  const labels = {
    wallet: 'Wallet',
    analytics: 'Analytics',
    branding: 'Branding',
    contacts: 'Contacts',
    settings: 'Settings'
  }

  return (
    <div className="page-panel coming-panel">
      <span className="eyebrow">Coming soon</span>
      <h1>{labels[page]}</h1>
      <p>Questa area sarà attivata dopo la validazione del prototipo e l’integrazione con database, login e salvataggio reale.</p>
      <div className="roadmap-list">
        {roadmap[page].map((item, index) => (
          <article key={item}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <strong>{item}</strong>
          </article>
        ))}
      </div>
    </div>
  )
}

function PhonePreview({ card }) {
  return (
    <section className="phone-preview">
      <div className="preview-head"><span>Anteprima smartphone</span><strong>{card.name}</strong></div>
      <div className="device">
        <div className="device-screen">
          <div className="phone-top"><div className="mv-badge">MV</div><span>BETA</span></div>
          <p className="phone-claim">{card.claim}</p>
          <h2>{card.headline}</h2>
          <p className="phone-copy">{card.description}</p>
          <div className="phone-buttons">
            <a href={card.url} target="_blank" rel="noreferrer">Visita il sito</a>
            <a className="dark" href={`https://wa.me/${cleanPhone(card.phone)}`} target="_blank" rel="noreferrer">WhatsApp</a>
          </div>
          <div className="phone-features">
            {card.features.map(([title, desc]) => <article key={title}><strong>{title}</strong><p>{desc}</p></article>)}
          </div>
        </div>
      </div>
    </section>
  )
}

function PublicCard({ card, setActive }) {
  return (
    <div className="public-page">
      <button className="back-button" onClick={() => setActive('home')}>← Torna alla dashboard</button>
      <main className="public-card">
        <section className="public-hero">
          <div className="road-light" />
          <div className="phone-top"><div className="mv-badge">MV</div><span>BETA</span></div>
          <p>{card.claim}</p>
          <h1>{card.headline}</h1>
          <p className="public-copy">{card.description}</p>
          <div className="phone-buttons">
            <a href={card.url} target="_blank" rel="noreferrer">Visita il sito</a>
            <a className="dark" href={`https://wa.me/${cleanPhone(card.phone)}`} target="_blank" rel="noreferrer">WhatsApp</a>
          </div>
        </section>

        <section className="public-section">
          <span className="eyebrow">Perché myVeicolo</span>
          <h2>Un garage digitale per non perdere più controllo su costi, scadenze e consumi.</h2>
        </section>

        <section className="public-section feature-public-grid">
          {card.features.map(([title, desc]) => <article key={title}><strong>{title}</strong><p>{desc}</p></article>)}
        </section>

        <section className="public-section">
          <h2>Utile per</h2>
          <div className="tag-list">{card.audience.map(item => <span key={item}>{item}</span>)}</div>
        </section>

        <footer className="public-footer">
          <a href={`mailto:${card.email}`}>{card.email}</a>
          <a href={card.url} target="_blank" rel="noreferrer">{card.url}</a>
        </footer>
      </main>
    </div>
  )
}

createRoot(document.getElementById('root')).render(<App />)

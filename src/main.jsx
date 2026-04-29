import React, { useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './style.css'

const defaultVisibility = {
  claim: true, headline: true, description: true,
  url: true, email: true, phone: false, whatsapp: true,
  company: true, vat: false, address: false, maps: false,
  motto: true, logo: true, linkedin: false, instagram: false
}

const defaultCard = {
  name: 'myVeicolo.net',
  claim: 'Il tuo garage digitale',
  headline: 'Il cuore intelligente del tuo garage.',
  description: 'Tieni sotto controllo costi, scadenze, manutenzioni e consumi dei tuoi veicoli in un unico spazio digitale.',
  motto: 'Controllo, semplicità e memoria digitale per ogni veicolo.',
  url: 'https://myveicolo.net',
  email: 'myveicolonet@gmail.com',
  phone: '+39 328 717 9900',
  whatsapp: '+39 328 717 9900',
  company: 'myVeicolo.net',
  vat: '',
  address: '',
  maps: '',
  linkedin: '',
  instagram: '',
  logoText: 'MV',
  accent: '#00E5FF',
  status: 'Pubblica',
  type: 'Prodotto digitale',
  updated: '29 Apr 2026',
  plan: 'Free demo',
  visibility: defaultVisibility,
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
  ['share', 'Smart Share', '▦'],
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

function cleanPhone(phone = '') {
  return phone.replace(/\D/g, '')
}

function isVisible(card, key) {
  const valueMap = { logo: card.logoText, whatsapp: card.whatsapp, maps: card.maps }
  const value = valueMap[key] ?? card[key]
  return Boolean(card.visibility?.[key] && String(value || '').trim())
}

function buildSmartShare(card) {
  const rows = []
  rows.push(`${card.logoText || '•'} ${card.name}`)
  if (isVisible(card, 'headline')) rows.push(card.headline)
  if (isVisible(card, 'claim')) rows.push(`\n${card.claim}`)
  if (isVisible(card, 'description')) rows.push(card.description)
  if (isVisible(card, 'motto')) rows.push(`\nMotto: ${card.motto}`)
  if (isVisible(card, 'company')) rows.push(`\nAzienda: ${card.company}`)
  if (isVisible(card, 'vat')) rows.push(`P.IVA: ${card.vat}`)
  if (isVisible(card, 'address')) rows.push(`Indirizzo: ${card.address}`)
  if (isVisible(card, 'maps')) rows.push(`Google Maps: ${card.maps}`)
  if (isVisible(card, 'url')) rows.push(`\nSito: ${card.url}`)
  if (isVisible(card, 'email')) rows.push(`Email: ${card.email}`)
  if (isVisible(card, 'phone')) rows.push(`Telefono: ${card.phone}`)
  if (isVisible(card, 'whatsapp')) rows.push(`WhatsApp: ${card.whatsapp}`)
  if (isVisible(card, 'linkedin')) rows.push(`LinkedIn: ${card.linkedin}`)
  if (isVisible(card, 'instagram')) rows.push(`Instagram: ${card.instagram}`)
  rows.push('\nCard digitale: https://md-card-creator.netlify.app')
  return rows.join('\n')
}

function copyText(text) {
  if (navigator.clipboard) return navigator.clipboard.writeText(text)
  const area = document.createElement('textarea')
  area.value = text
  document.body.appendChild(area)
  area.select()
  document.execCommand('copy')
  document.body.removeChild(area)
}

function App() {
  const [active, setActive] = useState('home')
  const [menuOpen, setMenuOpen] = useState(false)
  const [card, setCard] = useState(defaultCard)
  const [notice, setNotice] = useState('')
  const isPublic = active === 'public'
  const flash = (text) => { setNotice(text); setTimeout(() => setNotice(''), 1700) }

  return (
    <div className={`app ${isPublic ? 'public-mode' : ''}`}>
      {notice && <div className="toast">{notice}</div>}
      {!isPublic && <Sidebar active={active} setActive={setActive} open={menuOpen} setOpen={setMenuOpen} card={card} />}
      <main className={isPublic ? 'public-main' : 'main'}>
        {!isPublic && <Topbar setMenuOpen={setMenuOpen} setActive={setActive} />}
        {isPublic ? (
          <PublicCard card={card} setActive={setActive} flash={flash} />
        ) : (
          <div className="workspace">
            <div className="content-area">
              {active === 'home' && <HomePage card={card} setActive={setActive} />}
              {active === 'cards' && <CardsPage card={card} setCard={setCard} setActive={setActive} flash={flash} />}
              {active === 'editor' && <EditorPage card={card} setCard={setCard} setActive={setActive} />}
              {active === 'share' && <SharePage card={card} setActive={setActive} flash={flash} />}
              {['wallet', 'analytics', 'branding', 'contacts', 'settings'].includes(active) && <ComingSoon page={active} />}
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
      <div className="mobile-title"><strong>md|studios</strong><span>Card Creator</span></div>
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
          <div><strong>md|studios</strong><span>Card Creator</span></div>
          <button className="close-menu" onClick={() => setOpen(false)}>×</button>
        </div>
        <nav className="nav-list">
          {navItems.map(([key, label, icon]) => (
            <button key={key} className={`nav-item ${active === key ? 'active' : ''}`} onClick={() => { setActive(key); setOpen(false) }}>
              <span className="nav-icon">{icon}</span><span>{label}</span>
            </button>
          ))}
        </nav>
        <div className="sidebar-card"><small>Prima demo reale</small><strong>{card.name}</strong><span>{card.status} · {card.type}</span></div>
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
          <span className="eyebrow">MVP 0.3.3 · Smart Share</span>
          <h1>Digital card premium, senza campi vuoti e condivisione intelligente.</h1>
          <p>Ogni informazione ha un interruttore: compare solo se è compilata e attiva. Email e WhatsApp generano una scheda completa, non un link povero.</p>
          <div className="button-row"><button onClick={() => setActive('editor')}>Modifica demo</button><button className="light-button" onClick={() => setActive('share')}>Smart Share</button></div>
        </div>
        <div className="hero-summary"><span>Card attiva</span><strong>{card.name}</strong><small>{card.headline}</small></div>
      </section>

      <section className="process-grid">
        <article><span>01</span><h3>Compila</h3><p>Aggiungi contatti, azienda, indirizzo, P.IVA, social e motto.</p></article>
        <article><span>02</span><h3>Attiva</h3><p>Decidi con i flag cosa mostrare nella card e nei messaggi.</p></article>
        <article><span>03</span><h3>Condividi</h3><p>Invia una scheda completa via WhatsApp, email, QR o link.</p></article>
      </section>

      <section className="value-card">
        <span className="eyebrow">Nuovo pilastro</span>
        <h2>Smart Share: non condividi solo un link, ma una scheda digitale pulita.</h2>
        <p>La card pubblica e i messaggi non mostrano mai dati vuoti. Questo rende il prodotto più elegante, più serio e più vendibile anche in ottica Free/Premium.</p>
      </section>
    </div>
  )
}

function CardsPage({ card, setCard, setActive, flash }) {
  const createDemoCard = () => {
    setCard({
      ...defaultCard,
      name: 'Nuova card demo',
      claim: 'Bozza digitale',
      headline: 'La tua nuova presenza digitale.',
      description: 'Questa è una bozza temporanea. Il salvataggio reale arriverà con Supabase.',
      logoText: 'NC',
      status: 'Bozza',
      type: 'Persona / attività',
      updated: 'oggi',
      visibility: { ...defaultVisibility, vat: false, address: false, maps: false, phone: false }
    })
    flash('Nuova card demo creata')
    setActive('editor')
  }

  return (
    <div className="page-panel">
      <div className="section-heading split"><div><span className="eyebrow">Cards</span><h1>Le tue digital card</h1><p>Una prima card reale e il flusso demo per creare nuove card.</p></div><button onClick={createDemoCard}>+ Nuova card demo</button></div>
      <article className="card-manager">
        <div className="card-avatar">{card.logoText || 'MD'}</div><div className="card-info"><strong>{card.name}</strong><span>{card.headline}</span></div>
        <div className="metric"><small>Stato</small><b>{card.status}</b></div><div className="metric"><small>Tipo</small><b>{card.type}</b></div><div className="metric"><small>Piano</small><b>{card.plan}</b></div>
      </article>
      <div className="action-grid"><button onClick={() => setActive('editor')}>Modifica</button><button className="soft-button" onClick={() => setActive('share')}>Smart Share</button><button className="soft-button" onClick={() => setActive('public')}>Apri demo</button></div>
      <section className="mini-roadmap"><h3>Free / Premium</h3><div><span>Base gratis</span><span>Logo e branding premium</span><span>Maps e P.IVA premium</span><span>Analytics premium</span></div></section>
    </div>
  )
}

function EditorPage({ card, setCard, setActive }) {
  const update = (field, value) => setCard({ ...card, [field]: value })
  const toggle = (field) => setCard({ ...card, visibility: { ...card.visibility, [field]: !card.visibility[field] } })

  return (
    <div className="page-panel">
      <div className="section-heading split"><div><span className="eyebrow">Editor</span><h1>Dati + visibilità</h1><p>Un campo appare solo se è compilato e attivato. Zero vuoti, zero placeholder brutti.</p></div><div className="compact-actions"><button className="soft-button" onClick={() => setActive('public')}>Anteprima</button><button onClick={() => setActive('share')}>Smart Share</button></div></div>

      <FormSection title="Identità">
        <Field label="Logo / sigla" value={card.logoText} onChange={(v) => update('logoText', v)} active={card.visibility.logo} onToggle={() => toggle('logo')} premium="Free" />
        <Field label="Nome card" value={card.name} onChange={(v) => update('name', v)} locked />
        <Field label="Claim" value={card.claim} onChange={(v) => update('claim', v)} active={card.visibility.claim} onToggle={() => toggle('claim')} />
        <Field label="Headline" value={card.headline} onChange={(v) => update('headline', v)} active={card.visibility.headline} onToggle={() => toggle('headline')} />
        <Field label="Descrizione" value={card.description} onChange={(v) => update('description', v)} active={card.visibility.description} onToggle={() => toggle('description')} textarea />
        <Field label="Motto aziendale" value={card.motto} onChange={(v) => update('motto', v)} active={card.visibility.motto} onToggle={() => toggle('motto')} premium="Premium" />
      </FormSection>

      <FormSection title="Contatti">
        <Field label="Sito web" value={card.url} onChange={(v) => update('url', v)} active={card.visibility.url} onToggle={() => toggle('url')} />
        <Field label="Email" value={card.email} onChange={(v) => update('email', v)} active={card.visibility.email} onToggle={() => toggle('email')} />
        <Field label="Telefono" value={card.phone} onChange={(v) => update('phone', v)} active={card.visibility.phone} onToggle={() => toggle('phone')} />
        <Field label="WhatsApp" value={card.whatsapp} onChange={(v) => update('whatsapp', v)} active={card.visibility.whatsapp} onToggle={() => toggle('whatsapp')} />
      </FormSection>

      <FormSection title="Azienda e posizione">
        <Field label="Nome azienda" value={card.company} onChange={(v) => update('company', v)} active={card.visibility.company} onToggle={() => toggle('company')} />
        <Field label="Partita IVA" value={card.vat} onChange={(v) => update('vat', v)} active={card.visibility.vat} onToggle={() => toggle('vat')} premium="Premium" />
        <Field label="Indirizzo" value={card.address} onChange={(v) => update('address', v)} active={card.visibility.address} onToggle={() => toggle('address')} premium="Premium" />
        <Field label="Google Maps" value={card.maps} onChange={(v) => update('maps', v)} active={card.visibility.maps} onToggle={() => toggle('maps')} premium="Premium" />
      </FormSection>

      <FormSection title="Social e stile">
        <Field label="LinkedIn" value={card.linkedin} onChange={(v) => update('linkedin', v)} active={card.visibility.linkedin} onToggle={() => toggle('linkedin')} premium="Premium" />
        <Field label="Instagram" value={card.instagram} onChange={(v) => update('instagram', v)} active={card.visibility.instagram} onToggle={() => toggle('instagram')} premium="Premium" />
        <label>Colore accento<input type="color" value={card.accent} onChange={(e) => update('accent', e.target.value)} /></label>
      </FormSection>
    </div>
  )
}

function Field({ label, value, onChange, active, onToggle, textarea, premium, locked }) {
  return (
    <label className="field-with-toggle">
      <span className="field-line"><span>{label}</span>{premium && <em>{premium}</em>}{!locked && <button type="button" className={`toggle ${active ? 'on' : ''}`} onClick={onToggle}>{active ? 'Mostra' : 'Nascondi'}</button>}</span>
      {textarea ? <textarea value={value} onChange={(e) => onChange(e.target.value)} /> : <input value={value} onChange={(e) => onChange(e.target.value)} />}
    </label>
  )
}

function FormSection({ title, children }) {
  return <section className="form-section"><h2>{title}</h2><div className="form-grid">{children}</div></section>
}

function SharePage({ card, setActive, flash }) {
  const message = useMemo(() => buildSmartShare(card), [card])
  const qr = `https://api.qrserver.com/v1/create-qr-code/?size=520x520&data=${encodeURIComponent(card.url)}`
  const mail = `mailto:${card.email}?subject=${encodeURIComponent(card.name + ' - scheda digitale')}&body=${encodeURIComponent(message)}`
  const wa = `https://wa.me/${cleanPhone(card.whatsapp)}?text=${encodeURIComponent(message)}`

  return (
    <div className="page-panel">
      <div className="section-heading"><span className="eyebrow">Smart Share</span><h1>Condividi la scheda completa</h1><p>WhatsApp ed email usano solo i campi attivi e compilati. Nessun dato vuoto viene mostrato.</p><strong className="active-pill">Display Control attivo</strong></div>
      <div className="share-grid smart-share-grid">
        <div className="qr-box"><img src={qr} alt="QR code myVeicolo" /><strong>QR pubblico</strong><span>{card.url}</span></div>
        <div className="share-box">
          <label>Messaggio generato</label>
          <pre className="message-preview">{message}</pre>
          <button onClick={() => { copyText(message); flash('Scheda completa copiata') }}>Copia scheda completa</button>
          <button className="soft-button" onClick={() => { copyText(card.email); flash('Email copiata') }}>Copia email</button>
          <button className="soft-button" onClick={() => { copyText(card.whatsapp); flash('Numero copiato') }}>Copia numero</button>
          <a className="soft-link" href={mail}>Invia email</a>
          <a className="soft-link" href={wa} target="_blank" rel="noreferrer">WhatsApp con testo</a>
          <button className="soft-button" onClick={() => setActive('public')}>Apri card</button>
        </div>
      </div>
    </div>
  )
}

function ComingSoon({ page }) {
  const labels = { wallet: 'Wallet', analytics: 'Analytics', branding: 'Branding', contacts: 'Contacts', settings: 'Settings' }
  return (
    <div className="page-panel coming-panel"><span className="eyebrow">Coming soon</span><h1>{labels[page]}</h1><p>Questa area sarà attivata dopo la validazione del prototipo e l’integrazione con database, login e salvataggio reale.</p><div className="roadmap-list">{roadmap[page].map((item, index) => <article key={item}><span>{String(index + 1).padStart(2, '0')}</span><strong>{item}</strong></article>)}</div></div>
  )
}

function PhonePreview({ card }) {
  return (
    <section className="phone-preview">
      <div className="preview-head"><span>Anteprima smartphone</span><strong>{card.name}</strong></div>
      <div className="device"><div className="device-screen">
        <div className="phone-top">{isVisible(card, 'logo') && <div className="mv-badge">{card.logoText}</div>}<span>BETA</span></div>
        {isVisible(card, 'claim') && <p className="phone-claim">{card.claim}</p>}
        {isVisible(card, 'headline') && <h2>{card.headline}</h2>}
        {isVisible(card, 'description') && <p className="phone-copy">{card.description}</p>}
        <div className="phone-buttons">
          {isVisible(card, 'url') && <a href={card.url} target="_blank" rel="noreferrer">Visita il sito</a>}
          {isVisible(card, 'whatsapp') && <a className="dark" href={`https://wa.me/${cleanPhone(card.whatsapp)}?text=${encodeURIComponent(buildSmartShare(card))}`} target="_blank" rel="noreferrer">WhatsApp</a>}
        </div>
        <VisibleContactList card={card} compact />
        <div className="phone-features">{card.features.map(([title, desc]) => <article key={title}><strong>{title}</strong><p>{desc}</p></article>)}</div>
      </div></div>
    </section>
  )
}

function VisibleContactList({ card, compact = false }) {
  const items = [
    ['company', 'Azienda', card.company], ['vat', 'P.IVA', card.vat], ['address', 'Indirizzo', card.address], ['maps', 'Google Maps', card.maps],
    ['email', 'Email', card.email], ['phone', 'Telefono', card.phone], ['whatsapp', 'WhatsApp', card.whatsapp], ['linkedin', 'LinkedIn', card.linkedin], ['instagram', 'Instagram', card.instagram]
  ].filter(([key]) => isVisible(card, key))
  if (!items.length) return null
  return <div className={compact ? 'visible-list compact' : 'visible-list'}>{items.map(([key, label, value]) => <div key={key}><span>{label}</span><strong>{value}</strong></div>)}</div>
}

function PublicCard({ card, setActive, flash }) {
  const message = buildSmartShare(card)
  return (
    <div className="public-page">
      <button className="back-button" onClick={() => setActive('home')}>← Torna al Card Creator</button>
      <main className="public-card">
        <section className="public-hero">
          <div className="road-light" />
          <div className="phone-top">{isVisible(card, 'logo') && <div className="mv-badge">{card.logoText}</div>}<span>BETA</span></div>
          {isVisible(card, 'claim') && <p>{card.claim}</p>}
          {isVisible(card, 'headline') && <h1>{card.headline}</h1>}
          {isVisible(card, 'description') && <p className="public-copy">{card.description}</p>}
          <div className="phone-buttons">
            {isVisible(card, 'url') && <a href={card.url} target="_blank" rel="noreferrer">Visita il sito</a>}
            {isVisible(card, 'whatsapp') && <a className="dark" href={`https://wa.me/${cleanPhone(card.whatsapp)}?text=${encodeURIComponent(message)}`} target="_blank" rel="noreferrer">WhatsApp</a>}
          </div>
        </section>
        <section className="public-section"><span className="eyebrow">Scheda digitale</span><h2>{isVisible(card, 'motto') ? card.motto : 'Informazioni essenziali, pulite e sempre condivisibili.'}</h2><VisibleContactList card={card} /></section>
        <section className="public-section feature-public-grid">{card.features.map(([title, desc]) => <article key={title}><strong>{title}</strong><p>{desc}</p></article>)}</section>
        <section className="public-section"><h2>Utile per</h2><div className="tag-list">{card.audience.map(item => <span key={item}>{item}</span>)}</div></section>
        <footer className="public-footer">
          <button onClick={() => { copyText(message); flash('Scheda completa copiata') }}>Copia scheda completa</button>
          {isVisible(card, 'email') && <a href={`mailto:${card.email}?subject=${encodeURIComponent(card.name)}&body=${encodeURIComponent(message)}`}>{card.email}</a>}
          {isVisible(card, 'url') && <a href={card.url} target="_blank" rel="noreferrer">{card.url}</a>}
        </footer>
      </main>
    </div>
  )
}

createRoot(document.getElementById('root')).render(<App />)

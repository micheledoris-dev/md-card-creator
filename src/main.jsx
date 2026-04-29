
import React, { useEffect, useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import QRCode from 'qrcode'
import {
  Home, CreditCard, Edit3, QrCode, Share2, Wallet, BarChart3, Palette, Users,
  Settings, Menu, X, Eye, EyeOff, Copy, Mail, MessageCircle, ExternalLink, Plus,
  ArrowLeft, CheckCircle2, CircleOff, Layers, Sparkles
} from 'lucide-react'
import './style.css'

const STORAGE_CARDS = 'md_card_creator_cards_v037'
const STORAGE_ACTIVE = 'md_card_creator_active_card_v037'

const fieldLabels = {
  logoText: 'Logo / sigla',
  name: 'Nome card',
  claim: 'Claim',
  headline: 'Headline',
  description: 'Descrizione',
  motto: 'Motto aziendale',
  website: 'Sito web',
  email: 'Email',
  phone: 'Telefono',
  whatsapp: 'WhatsApp',
  company: 'Nome azienda',
  vat: 'Partita IVA',
  address: 'Indirizzo',
  maps: 'Google Maps',
  linkedin: 'LinkedIn',
  instagram: 'Instagram'
}

const premiumFields = new Set(['vat', 'address', 'maps', 'linkedin', 'instagram', 'motto'])

const defaultVisibility = {
  logoText: true,
  name: true,
  claim: true,
  headline: true,
  description: true,
  motto: true,
  website: true,
  email: true,
  phone: true,
  whatsapp: true,
  company: true,
  vat: false,
  address: false,
  maps: false,
  linkedin: false,
  instagram: false
}

const templates = {
  automotive: {
    name: 'Automotive Dark',
    accent: '#00E5FF',
    category: 'Prodotto digitale',
    tone: 'dark'
  },
  personal: {
    name: 'Personal Premium',
    accent: '#111111',
    category: 'Profilo personale',
    tone: 'light'
  },
  creative: {
    name: 'Creative Portfolio',
    accent: '#8B5CF6',
    category: 'Portfolio creativo',
    tone: 'dark'
  },
  corporate: {
    name: 'Corporate Grey',
    accent: '#64748B',
    category: 'Azienda / studio',
    tone: 'light'
  },
  hospitality: {
    name: 'Hospitality Gold',
    accent: '#C9A227',
    category: 'Hospitality premium',
    tone: 'dark'
  }
}

const demoCards = [
  {
    id: 'myveicolo',
    slug: 'myveicolo',
    template: 'automotive',
    logoText: 'MV',
    name: 'myVeicolo.net',
    claim: 'Il tuo garage digitale',
    headline: 'Il cuore intelligente del tuo garage.',
    description: 'Tieni sotto controllo costi, scadenze, manutenzioni e consumi dei tuoi veicoli in un unico spazio digitale.',
    motto: 'Ricordati che il meglio deve sempre avvenire.',
    website: 'https://myveicolo.net',
    email: 'myveicolonet@gmail.com',
    phone: '+39 328 717 9900',
    whatsapp: '+39 328 717 9900',
    company: 'myVeicolo.net',
    vat: '',
    address: '',
    maps: '',
    linkedin: '',
    instagram: '',
    visibility: { ...defaultVisibility, logoText: false, vat: false, address: false, maps: false, linkedin: false, instagram: false }
  },
  {
    id: 'michele-doris',
    slug: 'michele-doris',
    template: 'personal',
    logoText: 'MD',
    name: 'Michele Doris',
    claim: 'Strategia, processi, progetti digitali',
    headline: 'Trasformo idee concrete in sistemi utili.',
    description: 'Esperienza manageriale, visione operativa e capacità di costruire strumenti semplici per problemi reali.',
    motto: 'Prima chiarezza. Poi esecuzione.',
    website: 'https://md-card-creator.netlify.app',
    email: 'info@mdstudios.it',
    phone: '',
    whatsapp: '',
    company: 'md|studios',
    vat: '',
    address: 'Fontaniva, PD',
    maps: '',
    linkedin: '',
    instagram: '',
    visibility: { ...defaultVisibility, phone: false, whatsapp: false, vat: false, maps: false, linkedin: false, instagram: false }
  },
  {
    id: 'jacopo-doris',
    slug: 'jacopo-doris',
    template: 'creative',
    logoText: 'JD',
    name: 'Jacopo Doris',
    claim: 'Art Direction / Visual Identity',
    headline: 'Creative direction for fashion, editorial and culture.',
    description: 'Portfolio creativo con focus su identità visiva, direzione artistica e linguaggi contemporanei.',
    motto: 'Ideas with visual pulse.',
    website: 'https://jacopodoris.com',
    email: 'hello@jacopodoris.com',
    phone: '',
    whatsapp: '',
    company: 'Jacopo Doris Studio',
    vat: '',
    address: 'Milano',
    maps: '',
    linkedin: '',
    instagram: 'https://instagram.com/',
    visibility: { ...defaultVisibility, phone: false, whatsapp: false, vat: false, maps: false, linkedin: false }
  },
  {
    id: 'studio-rossi',
    slug: 'studio-rossi',
    template: 'corporate',
    logoText: 'SR',
    name: 'Studio Rossi',
    claim: 'Consulenza fiscale e societaria',
    headline: 'Uno studio professionale vicino alle imprese.',
    description: 'Assistenza amministrativa, fiscale e societaria con approccio chiaro, ordinato e orientato alle decisioni.',
    motto: 'Precisione, fiducia, continuità.',
    website: 'https://studiorossi.example',
    email: 'info@studiorossi.example',
    phone: '+39 045 000 0000',
    whatsapp: '+39 045 000 0000',
    company: 'Studio Rossi Srl',
    vat: 'IT00000000000',
    address: 'Via Roma 1, Verona',
    maps: 'https://maps.google.com',
    linkedin: '',
    instagram: '',
    visibility: { ...defaultVisibility, linkedin: false, instagram: false }
  },
  {
    id: 'hotel-aurora',
    slug: 'hotel-aurora',
    template: 'hospitality',
    logoText: 'HA',
    name: 'Hotel Aurora',
    claim: 'Hospitality premium sul lago',
    headline: 'Un soggiorno elegante, semplice da ricordare.',
    description: 'Camere, esperienze e servizi premium raccontati in una card digitale pronta da condividere.',
    motto: 'Stay close to beauty.',
    website: 'https://hotelaurora.example',
    email: 'booking@hotelaurora.example',
    phone: '+39 030 000 0000',
    whatsapp: '+39 030 000 0000',
    company: 'Hotel Aurora',
    vat: '',
    address: 'Lago di Garda',
    maps: 'https://maps.google.com',
    linkedin: '',
    instagram: 'https://instagram.com/',
    visibility: { ...defaultVisibility, vat: false, linkedin: false }
  }
]

function loadStored(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return fallback
    return JSON.parse(raw)
  } catch {
    return fallback
  }
}

function saveStored(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {}
}

function hasValue(value) {
  return String(value || '').trim().length > 0
}

function normalizePhone(phone) {
  return String(phone || '').replace(/[^\d]/g, '')
}

function visibleValue(card, key) {
  return Boolean(card.visibility?.[key] && hasValue(card[key]))
}

function getPublicCardUrl(card) {
  if (typeof window === 'undefined') return `https://md-card-creator.netlify.app/?card=${card.slug}`
  return `${window.location.origin}${window.location.pathname}?card=${card.slug}`
}

function buildSmartShare(card) {
  const lines = []
  if (visibleValue(card, 'name')) lines.push(`🔹 ${card.name}`)
  if (visibleValue(card, 'headline')) lines.push(card.headline)
  if (visibleValue(card, 'description')) {
    lines.push('')
    lines.push(card.description)
  }

  const contact = []
  if (visibleValue(card, 'website')) contact.push(`🌐 Sito: ${card.website}`)
  if (visibleValue(card, 'email')) contact.push(`📧 Email: ${card.email}`)
  if (visibleValue(card, 'phone')) contact.push(`📞 Telefono: ${card.phone}`)
  if (visibleValue(card, 'whatsapp')) contact.push(`💬 WhatsApp: ${card.whatsapp}`)
  if (visibleValue(card, 'address')) contact.push(`📍 Indirizzo: ${card.address}`)
  if (visibleValue(card, 'maps')) contact.push(`🗺️ Google Maps: ${card.maps}`)
  if (contact.length) lines.push('', ...contact)

  const company = []
  if (visibleValue(card, 'company')) company.push(`🏢 Azienda: ${card.company}`)
  if (visibleValue(card, 'vat')) company.push(`P.IVA: ${card.vat}`)
  if (visibleValue(card, 'motto')) company.push(`Motto: ${card.motto}`)
  if (company.length) lines.push('', ...company)

  const social = []
  if (visibleValue(card, 'linkedin')) social.push(`LinkedIn: ${card.linkedin}`)
  if (visibleValue(card, 'instagram')) social.push(`Instagram: ${card.instagram}`)
  if (social.length) lines.push('', ...social)

  lines.push('', '🔗 Card digitale:', getPublicCardUrl(card))
  return lines.filter(Boolean).join('\n')
}

function mailtoLink(card) {
  const subject = encodeURIComponent(`Ti condivido ${card.name || 'la mia digital card'}`)
  const body = encodeURIComponent(buildSmartShare(card))
  return `mailto:${card.email || ''}?subject=${subject}&body=${body}`
}

function whatsappLink(card) {
  const number = normalizePhone(card.whatsapp || card.phone)
  const text = encodeURIComponent(buildSmartShare(card))
  return `https://wa.me/${number}?text=${text}`
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    const area = document.createElement('textarea')
    area.value = text
    document.body.appendChild(area)
    area.select()
    document.execCommand('copy')
    document.body.removeChild(area)
    return true
  }
}

function App() {
  const requestedSlug = new URLSearchParams(window.location.search).get('card')
  const [cards, setCards] = useState(() => loadStored(STORAGE_CARDS, demoCards))
  const [activeId, setActiveId] = useState(() => {
    const stored = loadStored(STORAGE_ACTIVE, demoCards[0].id)
    const bySlug = requestedSlug ? demoCards.find(c => c.slug === requestedSlug)?.id : null
    return bySlug || stored
  })
  const [active, setActive] = useState(() => requestedSlug ? 'public' : 'home')
  const [menuOpen, setMenuOpen] = useState(false)
  const [lastPanel, setLastPanel] = useState('home')
  const [notice, setNotice] = useState('')

  const activeCard = cards.find(c => c.id === activeId) || cards[0]

  useEffect(() => saveStored(STORAGE_CARDS, cards), [cards])
  useEffect(() => saveStored(STORAGE_ACTIVE, activeId), [activeId])

  const stats = useMemo(() => {
    return Object.keys(fieldLabels).reduce((acc, key) => {
      if (!hasValue(activeCard[key])) acc.empty += 1
      else if (activeCard.visibility?.[key]) acc.visible += 1
      else acc.hidden += 1
      return acc
    }, { visible: 0, hidden: 0, empty: 0 })
  }, [activeCard])

  const notify = (text) => {
    setNotice(text)
    setTimeout(() => setNotice(''), 2200)
  }

  const copy = async (text, label) => {
    await copyText(text)
    notify(`${label} copiato`)
  }

  const saveDemo = () => {
    saveStored(STORAGE_CARDS, cards)
    saveStored(STORAGE_ACTIVE, activeId)
    notify('Demo salvata')
  }

  const updateCard = (patch) => {
    setCards(prev => prev.map(card => card.id === activeId ? { ...card, ...patch } : card))
  }

  const updateVisibility = (key, value) => {
    setCards(prev => prev.map(card => {
      if (card.id !== activeId) return card
      return { ...card, visibility: { ...card.visibility, [key]: value } }
    }))
  }

  const updateField = (key, value) => updateCard({ [key]: value })

  const selectCard = (id) => {
    setActiveId(id)
    notify('Card attiva aggiornata')
  }

  const createDemoCard = () => {
    const id = `demo-${Date.now()}`
    const newCard = {
      ...demoCards[1],
      id,
      slug: id,
      name: 'Nuova card demo',
      claim: 'Bozza locale',
      headline: 'La tua nuova digital card.',
      description: 'Modifica i dati nell’editor e scegli quali campi rendere visibili.',
      template: 'personal',
      visibility: { ...defaultVisibility, vat: false, address: false, maps: false, linkedin: false, instagram: false }
    }
    setCards(prev => [newCard, ...prev])
    setActiveId(id)
    setActive('editor')
    notify('Nuova card demo creata')
  }

  const resetDemo = () => {
    setCards(demoCards)
    setActiveId(demoCards[0].id)
    saveStored(STORAGE_CARDS, demoCards)
    saveStored(STORAGE_ACTIVE, demoCards[0].id)
    notify('Demo ripristinata')
  }

  const navigate = (panel) => {
    if (panel === 'public') setLastPanel(active)
    setActive(panel)
    setMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="app-shell">
      <Sidebar active={active} navigate={navigate} open={menuOpen} setOpen={setMenuOpen} />
      <main className="workspace">
        <MobileTopbar setMenuOpen={setMenuOpen} navigate={navigate} />
        {notice && <div className="toast"><CheckCircle2 size={18} />{notice}</div>}

        {active !== 'public' && (
          <div className="desktop-title">
            <div>
              <span className="eyebrow">MVP 0.3.8.1 · Cards fix</span>
              <h1>md|studios Card Creator</h1>
            </div>
            <button className="btn ghost" onClick={() => navigate('public')}>Apri demo pubblica</button>
          </div>
        )}

        {active === 'home' && <HomePage navigate={navigate} card={activeCard} cards={cards} createDemoCard={createDemoCard} />}
        {active === 'cards' && <CardsPage navigate={navigate} cards={cards} activeId={activeId} selectCard={selectCard} createDemoCard={createDemoCard} resetDemo={resetDemo} />}
        {active === 'editor' && <EditorPage card={activeCard} updateField={updateField} updateCard={updateCard} updateVisibility={updateVisibility} stats={stats} navigate={navigate} resetDemo={resetDemo} saveDemo={saveDemo} />}
        {active === 'share' && <SharePage card={activeCard} copy={copy} navigate={navigate} />}
        {active === 'public' && <PublicCard card={activeCard} back={() => navigate(lastPanel || 'home')} />}
        {active === 'wallet' && <ComingSoon title="Wallet" items={['Apple Wallet pass', 'Google Wallet pass', 'QR offline', 'Fase 2 dopo database']} />}
        {active === 'analytics' && <ComingSoon title="Analytics" items={['Visite per card', 'Click sui pulsanti', 'Report azienda', 'Card più performanti']} />}
        {active === 'branding' && <ComingSoon title="Branding" items={['Template aziendali', 'Brand kit', 'Colori globali', 'Rimozione branding']} />}
        {active === 'contacts' && <ComingSoon title="Contacts" items={['Lead raccolti', 'Export contatti', 'Tag e note', 'Integrazioni CRM']} />}
        {active === 'settings' && <ComingSoon title="Settings" items={['Workspace azienda', 'Utenti e ruoli', 'Dominio custom', 'Privacy e termini']} />}
      </main>
    </div>
  )
}

const nav = [
  ['home', Home, 'Home'],
  ['cards', CreditCard, 'Cards'],
  ['editor', Edit3, 'Editor'],
  ['share', QrCode, 'Smart Share'],
  ['public', Share2, 'Public Card'],
  ['wallet', Wallet, 'Wallet'],
  ['analytics', BarChart3, 'Analytics'],
  ['branding', Palette, 'Branding'],
  ['contacts', Users, 'Contacts'],
  ['settings', Settings, 'Settings']
]

function Sidebar({ active, navigate, open, setOpen }) {
  return (
    <>
      <aside className={`sidebar ${open ? 'open' : ''}`}>
        <div className="brand">
          <div className="brand-logo">md</div>
          <div>
            <strong>md|studios</strong>
            <span>Card Creator</span>
          </div>
          <button className="close-menu" onClick={() => setOpen(false)}><X size={22} /></button>
        </div>
        <nav>
          {nav.map(([id, Icon, label]) => (
            <button key={id} className={`nav-item ${active === id ? 'active' : ''}`} onClick={() => navigate(id)}>
              <Icon size={18} />
              <span>{label}</span>
            </button>
          ))}
        </nav>
        <div className="sidebar-note">
          <span>Piattaforma multi-card</span>
          <strong>Template · Card · Workspace</strong>
        </div>
      </aside>
      {open && <button className="overlay" onClick={() => setOpen(false)} />}
    </>
  )
}

function MobileTopbar({ setMenuOpen, navigate }) {
  return (
    <div className="mobile-topbar">
      <button className="menu-btn" onClick={() => setMenuOpen(true)}><Menu size={28} /></button>
      <strong>md|studios</strong>
      <button className="btn small ghost" onClick={() => navigate('public')}>Demo</button>
    </div>
  )
}

function HomePage({ navigate, card, cards, createDemoCard }) {
  return (
    <div className="main-grid">
      <section className="page-panel">
        <div className="hero-card">
          <span className="eyebrow">MVP 0.3.8.1 · prototipo multi-card</span>
          <h2>Crea, gestisci e condividi molte digital card da un’unica piattaforma.</h2>
          <p>Ogni card può avere dati, template, QR, Smart Share e campi visibili diversi. Pensata per professionisti, aziende, team, prodotti ed eventi.</p>
          <div className="hero-actions">
            <button className="btn dark" onClick={() => navigate('cards')}><Layers size={18} /> Gestisci card</button>
            <button className="btn light" onClick={createDemoCard}><Plus size={18} /> Nuova card demo</button>
          </div>
          <div className="active-card">
            <span>Card attiva</span>
            <strong>{card.name}</strong>
            <em>{templates[card.template]?.name}</em>
          </div>
        </div>

        <div className="feature-grid">
          <Feature n="01" title="Template" text="Stili diversi per persone, aziende, prodotti, eventi e hospitality." />
          <Feature n="02" title="Card" text={`Gestisci ${cards.length} card demo, ognuna con dati e QR dedicati.`} />
          <Feature n="03" title="Workspace" text="La struttura futura supporta aziende, reparti, utenti e permessi." />
        </div>

        <section className="logic-panel">
          <span className="eyebrow">Scopo prodotto</span>
          <h2>Per aziende con 50 card. Per admin con 30 template diversi.</h2>
          <p>La direzione commerciale è chiara: creare, duplicare e gestire molte card da un’unica piattaforma, con dati visibili/nascosti e messaggi Smart Share completi.</p>
        </section>

        <section className="supabase-panel">
          <div>
            <span className="eyebrow">Preparazione Supabase</span>
            <h3>La demo è già pensata per database e account.</h3>
            <p>Il prossimo salto sarà salvare tutto su account: workspace, template, card, campi e visibilità.</p>
          </div>
          <div className="data-model">
            <span>Workspace</span>
            <span>Template</span>
            <span>Card</span>
            <span>Fields</span>
            <span>Visibility</span>
          </div>
        </section>
      </section>
      <PreviewPanel card={card} />
    </div>
  )
}

function Feature({ n, title, text }) {
  return <div className="feature"><span>{n}</span><h3>{title}</h3><p>{text}</p></div>
}

function CardsPage({ navigate, cards, activeId, selectCard, createDemoCard, resetDemo }) {
  const openFor = (cardId, panel) => {
    selectCard(cardId)
    navigate(panel)
  }

  return (
    <div className="main-grid">
      <section className="page-panel">
        <div className="page-head">
          <div>
            <span className="eyebrow">Cards</span>
            <h2>Gestione multi-card</h2>
            <p>Scegli la card attiva. Ogni card ha template, QR, Smart Share e Display Control dedicati.</p>
          </div>
          <div className="editor-actions">
            <button className="btn dark" onClick={createDemoCard}><Plus size={18} /> Nuova card demo</button>
            <button className="btn light" onClick={resetDemo}>Ripristina demo</button>
          </div>
        </div>

        <div className="cards-list refined">
          {cards.map(card => {
            const template = templates[card.template] || templates.automotive
            const visibleCount = Object.keys(fieldLabels).filter(k => visibleValue(card, k)).length
            return (
              <div key={card.id} className={`card-row-pro ${card.id === activeId ? 'selected' : ''}`}>
                <button className="card-main-action" onClick={() => selectCard(card.id)}>
                  <div className="mini-logo" style={{ borderColor: template.accent, color: template.accent }}>{card.logoText || 'DC'}</div>
                  <div>
                    <strong>{card.name}</strong>
                    <p>{card.headline}</p>
                    <span>{template.name} · {template.category}</span>
                  </div>
                  <span className={`badge ${card.id === activeId ? 'cyan' : ''}`}>{card.id === activeId ? 'Attiva' : 'Seleziona'}</span>
                </button>
                <div className="card-pro-meta">
                  <div className="metric"><span>Campi visibili</span><strong>{visibleCount}</strong></div>
                  <div className="metric"><span>Slug</span><strong>{card.slug}</strong></div>
                  <div className="metric"><span>Stato</span><strong>Demo locale</strong></div>
                </div>
                <div className="quick-actions">
                  <button className="btn light" onClick={() => openFor(card.id, 'editor')}>Editor</button>
                  <button className="btn light" onClick={() => openFor(card.id, 'share')}>Smart Share</button>
                  <button className="btn dark" onClick={() => openFor(card.id, 'public')}>Public Card</button>
                </div>
              </div>
            )
          })}
        </div>
      </section>
      <PreviewPanel card={cards.find(c => c.id === activeId) || cards[0]} />
    </div>
  )
}

function EditorPage({ card, updateField, updateCard, updateVisibility, stats, navigate, resetDemo, saveDemo }) {
  return (
    <div className="main-grid">
      <section className="page-panel">
        <div className="page-head">
          <div>
            <span className="eyebrow">Editor</span>
            <h2>{card.name}</h2>
            <p>Modifica la card attiva. Le modifiche sono salvate localmente in questo browser.</p>
          </div>
          <div className="editor-actions">
            <button className="btn light" onClick={saveDemo}>Salva demo</button>
            <button className="btn light" onClick={resetDemo}>Ripristina</button>
            <button className="btn dark" onClick={() => navigate('public')}>Pubblica · demo</button>
          </div>
        </div>

        <div className="save-note">Le modifiche vengono salvate automaticamente. Con Supabase saranno salvate nel tuo account e sincronizzate su tutti i dispositivi.</div>

        <div className="visibility-summary">
          <SummaryItem icon={<Eye size={18} />} label="Visibili" value={stats.visible} />
          <SummaryItem icon={<EyeOff size={18} />} label="Nascosti" value={stats.hidden} />
          <SummaryItem icon={<CircleOff size={18} />} label="Non compilati" value={stats.empty} />
        </div>

        <EditorSection title="Template">
          <div className="template-grid">
            {Object.entries(templates).map(([key, template]) => (
              <button key={key} className={`template-card ${card.template === key ? 'selected' : ''}`} onClick={() => updateCard({ template: key })}>
                <span style={{ background: template.accent }} />
                <strong>{template.name}</strong>
                <em>{template.category}</em>
              </button>
            ))}
          </div>
        </EditorSection>

        <EditorSection title="Identità">
          {['logoText', 'name', 'claim', 'motto'].map(k => <ControlField key={k} k={k} card={card} updateField={updateField} updateVisibility={updateVisibility} />)}
        </EditorSection>

        <EditorSection title="Contenuto principale">
          <ControlField k="headline" card={card} updateField={updateField} updateVisibility={updateVisibility} />
          <ControlField k="description" card={card} updateField={updateField} updateVisibility={updateVisibility} textarea />
        </EditorSection>

        <EditorSection title="Contatti">
          {['website', 'email', 'phone', 'whatsapp'].map(k => <ControlField key={k} k={k} card={card} updateField={updateField} updateVisibility={updateVisibility} />)}
        </EditorSection>

        <EditorSection title="Azienda">
          {['company', 'vat', 'address', 'maps'].map(k => <ControlField key={k} k={k} card={card} updateField={updateField} updateVisibility={updateVisibility} />)}
        </EditorSection>

        <EditorSection title="Social / Premium">
          {['linkedin', 'instagram'].map(k => <ControlField key={k} k={k} card={card} updateField={updateField} updateVisibility={updateVisibility} />)}
        </EditorSection>
      </section>
      <PreviewPanel card={card} />
    </div>
  )
}

function SummaryItem({ icon, label, value }) {
  return <div className="summary-item">{icon}<span>{label}</span><strong>{value}</strong></div>
}

function EditorSection({ title, children }) {
  return <section className="editor-section"><h3>{title}</h3><div className="field-grid">{children}</div></section>
}

function ControlField({ k, card, updateField, updateVisibility, textarea }) {
  const filled = hasValue(card[k])
  const isVisible = Boolean(card.visibility?.[k])
  const shown = isVisible && filled
  const hidden = !isVisible && filled

  return (
    <div className={`control-field ${shown ? 'is-visible' : ''} ${hidden ? 'is-hidden' : ''} ${!filled ? 'is-empty' : ''}`}>
      <div className="field-top">
        <div>
          <strong>{fieldLabels[k]}</strong>
          {premiumFields.has(k) ? <span className="premium-chip">Premium</span> : <span className="free-chip">Free</span>}
        </div>
        <div className="status-badge">{!filled ? 'Non compilato' : isVisible ? 'Visibile' : 'Nascosto'}</div>
      </div>

      <div className="segmented">
        <button className={isVisible ? 'selected' : ''} onClick={() => updateVisibility(k, true)} type="button" disabled={!filled}>
          <Eye size={15} /> Visibile
        </button>
        <button className={!isVisible ? 'selected' : ''} onClick={() => updateVisibility(k, false)} type="button" disabled={!filled}>
          <EyeOff size={15} /> Nascosto
        </button>
      </div>

      {textarea ? (
        <textarea value={card[k] || ''} onChange={e => updateField(k, e.target.value)} placeholder={`Inserisci ${fieldLabels[k].toLowerCase()}`} />
      ) : (
        <input value={card[k] || ''} onChange={e => updateField(k, e.target.value)} placeholder={`Inserisci ${fieldLabels[k].toLowerCase()}`} />
      )}
    </div>
  )
}

function SharePage({ card, copy, navigate }) {
  const smartShare = buildSmartShare(card)
  const publicUrl = getPublicCardUrl(card)

  return (
    <div className="main-grid">
      <section className="page-panel">
        <div className="page-head">
          <div>
            <span className="eyebrow">Smart Share</span>
            <h2>{card.name}</h2>
            <p>QR, email e WhatsApp sono collegati alla card attiva.</p>
          </div>
          <span className="badge cyan">Card attiva</span>
        </div>

        <div className="share-layout">
          <div className="qr-card">
            <RealQr value={publicUrl} name={card.name} />
            <strong>QR pubblico</strong>
            <span>{publicUrl}</span>
            <div className="qr-actions">
              <button className="btn light" onClick={() => copy(publicUrl, 'Link card')}>Copia link card</button>
            </div>
          </div>
          <div className="share-box">
            <span>Messaggio generato</span>
            <pre>{smartShare}</pre>
            <div className="share-actions">
              <button className="btn dark" onClick={() => copy(smartShare, 'Scheda completa')}><Copy size={17} /> Copia scheda completa</button>
              {hasValue(card.email) && <button className="btn light" onClick={() => copy(card.email, 'Email')}><Copy size={17} /> Copia email</button>}
              {hasValue(card.phone) && <button className="btn light" onClick={() => copy(card.phone, 'Numero')}><Copy size={17} /> Copia numero</button>}
              {hasValue(card.email) && <a className="btn light" href={mailtoLink(card)}><Mail size={17} /> Invia email</a>}
              {(hasValue(card.whatsapp) || hasValue(card.phone)) && <a className="btn light" href={whatsappLink(card)} target="_blank" rel="noreferrer"><MessageCircle size={17} /> WhatsApp</a>}
              <button className="btn light" onClick={() => navigate('public')}><ExternalLink size={17} /> Apri card</button>
            </div>
          </div>
        </div>
      </section>
      <PreviewPanel card={card} />
    </div>
  )
}

function RealQr({ value, name }) {
  const [qrData, setQrData] = useState('')

  useEffect(() => {
    let active = true
    QRCode.toDataURL(value, { width: 520, margin: 2, color: { dark: '#000000', light: '#ffffff' } })
      .then(url => { if (active) setQrData(url) })
    return () => { active = false }
  }, [value])

  const downloadQr = () => {
    if (!qrData) return
    const a = document.createElement('a')
    a.href = qrData
    a.download = `${(name || 'digital-card').toLowerCase().replace(/[^a-z0-9]+/g, '-')}-qr.png`
    a.click()
  }

  return (
    <div className="real-qr">
      {qrData ? <img src={qrData} alt={`QR code ${name}`} /> : <div className="qr-loading">Genero QR…</div>}
      <button className="btn dark" onClick={downloadQr} disabled={!qrData}>Scarica QR</button>
    </div>
  )
}

function PreviewPanel({ card }) {
  return (
    <aside className="preview-panel">
      <div className="preview-header">
        <span>Anteprima smartphone</span>
        <strong>{card.name}</strong>
      </div>
      <PhoneCard card={card} compact />
    </aside>
  )
}

function PhoneCard({ card, compact = false }) {
  const template = templates[card.template] || templates.automotive
  return (
    <div className={`phone-card ${compact ? 'compact' : ''} tone-${template.tone}`} style={{ '--accent': template.accent }}>
      <div className="phone-top">
        {visibleValue(card, 'logoText') && <div className="phone-logo">{card.logoText}</div>}
        <span className="beta">{template.name}</span>
      </div>
      {visibleValue(card, 'claim') && <p className="phone-claim">{card.claim}</p>}
      {visibleValue(card, 'headline') && <h3>{card.headline}</h3>}
      {visibleValue(card, 'description') && <p className="phone-desc">{card.description}</p>}
      {visibleValue(card, 'motto') && <div className="phone-motto">{card.motto}</div>}
      <div className="phone-actions">
        {visibleValue(card, 'website') && <a href={card.website} target="_blank" rel="noreferrer">Visita il sito</a>}
        {visibleValue(card, 'whatsapp') && <a href={whatsappLink(card)} target="_blank" rel="noreferrer">WhatsApp</a>}
      </div>
      <div className="phone-features">
        <InfoCard title="Dati attivi" text="La card mostra solo i campi compilati e impostati su Visibile." />
        <InfoCard title="Smart Share" text="WhatsApp, email e QR sono collegati a questa card." />
        <InfoCard title="Template" text={template.name} />
      </div>
    </div>
  )
}

function InfoCard({ title, text }) {
  return <div className="info-card"><strong>{title}</strong><p>{text}</p></div>
}

function PublicCard({ card, back }) {
  const smartShare = buildSmartShare(card)
  return (
    <section className="public-wrap">
      <button className="btn light back-btn" onClick={back}><ArrowLeft size={18} /> Torna al Card Creator</button>
      <div className="public-card">
        <PhoneCard card={card} />
        <div className="public-extra">
          <h2>{card.name}</h2>
          <div className="tag-list">
            <span>{templates[card.template]?.category}</span>
            <span>{templates[card.template]?.name}</span>
            <span>QR reale</span>
            <span>Smart Share</span>
          </div>
          <div className="public-links">
            {visibleValue(card, 'email') && <a href={mailtoLink(card)}>{card.email}</a>}
            {visibleValue(card, 'website') && <a href={card.website} target="_blank" rel="noreferrer">{card.website}</a>}
            {visibleValue(card, 'phone') && <a href={`tel:${normalizePhone(card.phone)}`}>{card.phone}</a>}
            {visibleValue(card, 'maps') && <a href={card.maps} target="_blank" rel="noreferrer">Apri posizione Google Maps</a>}
          </div>
          <button className="btn dark" onClick={() => copyText(smartShare)}>Copia scheda completa</button>
        </div>
      </div>
    </section>
  )
}

function ComingSoon({ title, items }) {
  return (
    <div className="main-grid coming-grid">
      <section className="page-panel coming">
        <span className="eyebrow">Coming soon</span>
        <h2>{title}</h2>
        <p>Questa area sarà attivata dopo la validazione del prototipo e l’integrazione con database, login e salvataggio reale.</p>
        <div className="roadmap">
          {items.map((item, index) => (
            <div key={item} className="roadmap-item">
              <span>{String(index + 1).padStart(2, '0')}</span>
              <strong>{item}</strong>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

createRoot(document.getElementById('root')).render(<App />)

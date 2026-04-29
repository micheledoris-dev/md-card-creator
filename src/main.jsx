
import React, { useEffect, useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import {
  Home,
  CreditCard,
  Edit3,
  QrCode,
  Share2,
  Wallet,
  BarChart3,
  Palette,
  Users,
  Settings,
  Menu,
  X,
  Eye,
  EyeOff,
  Copy,
  Mail,
  MessageCircle,
  ExternalLink,
  Plus,
  ArrowLeft,
  CheckCircle2,
  CircleOff
} from 'lucide-react'
import QRCode from 'qrcode'
import './style.css'

const initialCard = {
  logoText: 'MV',
  name: 'myVeicolo.net',
  claim: 'Il tuo garage digitale',
  headline: 'Il cuore intelligente del tuo garage.',
  description: 'Tieni sotto controllo costi, scadenze, manutenzioni e consumi dei tuoi veicoli in un unico spazio digitale.',
  motto: 'Il tuo garage digitale',
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
  accent: '#00E5FF'
}

const initialVisibility = {
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


const STORAGE_CARD = 'md_card_creator_demo_card_v036'
const STORAGE_VISIBILITY = 'md_card_creator_demo_visibility_v036'

function loadStored(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return fallback
    return { ...fallback, ...JSON.parse(raw) }
  } catch {
    return fallback
  }
}

function saveStored(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // localStorage may be blocked in private mode
  }
}

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

function hasValue(value) {
  return String(value || '').trim().length > 0
}

function normalizePhone(phone) {
  return String(phone || '').replace(/[^\d]/g, '')
}

function visibleValue(card, visibility, key) {
  return Boolean(visibility[key] && hasValue(card[key]))
}

function getPublicCardUrl() {
  if (typeof window === 'undefined') return 'https://md-card-creator.netlify.app/?card=myveicolo'
  return `${window.location.origin}${window.location.pathname}?card=myveicolo`
}

function buildSmartShare(card, visibility) {
  const lines = []

  if (visibleValue(card, visibility, 'name')) lines.push(`🚘 ${card.name}`)
  if (visibleValue(card, visibility, 'headline')) lines.push(card.headline)
  if (visibleValue(card, visibility, 'description')) {
    lines.push('')
    lines.push(card.description)
  }

  const contact = []
  if (visibleValue(card, visibility, 'website')) contact.push(`🌐 Sito: ${card.website}`)
  if (visibleValue(card, visibility, 'email')) contact.push(`📧 Email: ${card.email}`)
  if (visibleValue(card, visibility, 'phone')) contact.push(`📞 Telefono: ${card.phone}`)
  if (visibleValue(card, visibility, 'whatsapp')) contact.push(`💬 WhatsApp: ${card.whatsapp}`)
  if (visibleValue(card, visibility, 'address')) contact.push(`📍 Indirizzo: ${card.address}`)
  if (visibleValue(card, visibility, 'maps')) contact.push(`🗺️ Google Maps: ${card.maps}`)

  if (contact.length) {
    lines.push('')
    lines.push(...contact)
  }

  const company = []
  if (visibleValue(card, visibility, 'company')) company.push(`🏢 Azienda: ${card.company}`)
  if (visibleValue(card, visibility, 'vat')) company.push(`P.IVA: ${card.vat}`)
  if (visibleValue(card, visibility, 'motto')) company.push(`Motto: ${card.motto}`)

  if (company.length) {
    lines.push('')
    lines.push(...company)
  }

  const social = []
  if (visibleValue(card, visibility, 'linkedin')) social.push(`LinkedIn: ${card.linkedin}`)
  if (visibleValue(card, visibility, 'instagram')) social.push(`Instagram: ${card.instagram}`)

  if (social.length) {
    lines.push('')
    lines.push(...social)
  }

  lines.push('')
  lines.push('🔗 Card digitale:')
  lines.push(getPublicCardUrl())

  return lines.filter(Boolean).join('\n')
}

function mailtoLink(card, visibility) {
  const subject = encodeURIComponent(`Ti condivido ${card.name || 'la mia digital card'}`)
  const body = encodeURIComponent(buildSmartShare(card, visibility))
  return `mailto:${card.email || ''}?subject=${subject}&body=${body}`
}

function whatsappLink(card, visibility) {
  const number = normalizePhone(card.whatsapp || card.phone)
  const text = encodeURIComponent(buildSmartShare(card, visibility))
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
  const [active, setActive] = useState(() => new URLSearchParams(window.location.search).get('card') === 'myveicolo' ? 'public' : 'home')
  const [menuOpen, setMenuOpen] = useState(false)
  const [lastPanel, setLastPanel] = useState('home')
  const [card, setCard] = useState(() => loadStored(STORAGE_CARD, initialCard))
  const [visibility, setVisibility] = useState(() => loadStored(STORAGE_VISIBILITY, initialVisibility))
  const [notice, setNotice] = useState('')

  const smartShare = useMemo(() => buildSmartShare(card, visibility), [card, visibility])

  const stats = useMemo(() => {
    const keys = Object.keys(fieldLabels)
    return keys.reduce((acc, key) => {
      if (!hasValue(card[key])) acc.empty += 1
      else if (visibility[key]) acc.visible += 1
      else acc.hidden += 1
      return acc
    }, { visible: 0, hidden: 0, empty: 0 })
  }, [card, visibility])

  useEffect(() => {
    saveStored(STORAGE_CARD, card)
  }, [card])

  useEffect(() => {
    saveStored(STORAGE_VISIBILITY, visibility)
  }, [visibility])

  const saveDemo = () => {
    saveStored(STORAGE_CARD, card)
    saveStored(STORAGE_VISIBILITY, visibility)
    notify('Demo salvata in questo browser')
  }

  const resetDemo = () => {
    setCard(initialCard)
    setVisibility(initialVisibility)
    saveStored(STORAGE_CARD, initialCard)
    saveStored(STORAGE_VISIBILITY, initialVisibility)
    notify('Demo ripristinata')
  }

  const navigate = (panel) => {
    if (panel === 'public') setLastPanel(active)
    setActive(panel)
    setMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const updateField = (key, value) => setCard(prev => ({ ...prev, [key]: value }))
  const toggleVisibility = (key, value) => setVisibility(prev => ({ ...prev, [key]: value }))

  const notify = (text) => {
    setNotice(text)
    setTimeout(() => setNotice(''), 2200)
  }

  const copy = async (text, label) => {
    await copyText(text)
    notify(`${label} copiato`)
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
              <span className="eyebrow">MVP 0.3.6 · salvataggio locale</span>
              <h1>md|studios Card Creator</h1>
            </div>
            <button className="btn ghost" onClick={() => navigate('public')}>Apri demo pubblica</button>
          </div>
        )}

        {active === 'home' && <HomePage navigate={navigate} card={card} visibility={visibility} />}
        {active === 'cards' && <CardsPage navigate={navigate} card={card} visibility={visibility} />}
        {active === 'editor' && (
          <EditorPage
            card={card}
            visibility={visibility}
            updateField={updateField}
            toggleVisibility={toggleVisibility}
            stats={stats}
            navigate={navigate}
            saveDemo={saveDemo}
            resetDemo={resetDemo}
          />
        )}
        {active === 'share' && (
          <SharePage
            card={card}
            visibility={visibility}
            smartShare={smartShare}
            copy={copy}
            navigate={navigate}
          />
        )}
        {active === 'public' && (
          <PublicCard
            card={card}
            visibility={visibility}
            back={() => navigate(lastPanel || 'home')}
          />
        )}
        {active === 'wallet' && <ComingSoon title="Wallet" items={['Apple Wallet pass', 'Google Wallet pass', 'QR offline', 'Fase 2 dopo database']} />}
        {active === 'analytics' && <ComingSoon title="Analytics" items={['Visite card', 'Click sui pulsanti', 'Salvataggi contatto', 'Report mensile']} />}
        {active === 'branding' && <ComingSoon title="Branding" items={['Colori globali', 'Logo cliente', 'Template premium', 'Brand kit']} />}
        {active === 'contacts' && <ComingSoon title="Contacts" items={['Lead raccolti', 'Export contatti', 'Tag e note', 'Integrazioni CRM']} />}
        {active === 'settings' && <ComingSoon title="Settings" items={['Profilo account', 'Dominio custom', 'Lingua inglese', 'Privacy e termini']} />}
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
          <span>Prima demo reale</span>
          <strong>myVeicolo.net</strong>
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

function HomePage({ navigate, card, visibility }) {
  return (
    <div className="main-grid">
      <section className="page-panel">
        <div className="hero-card">
          <span className="eyebrow">MVP 0.3.6 · salvataggio locale</span>
          <h2>Digital card premium, costruite come mini siti personali.</h2>
          <p>Smart Share, QR code, link pubblico, anteprima smartphone e controllo preciso dei campi visibili.</p>
          <div className="hero-actions">
            <button className="btn dark" onClick={() => navigate('editor')}>Modifica card demo</button>
            <button className="btn light" onClick={() => navigate('share')}>Vedi Smart Share</button>
          </div>
          <div className="active-card">
            <span>Card attiva</span>
            <strong>{card.name}</strong>
            <em>{card.headline}</em>
          </div>
        </div>
        <div className="feature-grid">
          <Feature n="01" title="Crea" text="Parti da una card demo o crea una nuova bozza." />
          <Feature n="02" title="Controlla" text="Ogni dato può essere visibile, nascosto o non compilato." />
          <Feature n="03" title="Condividi" text="Invia una scheda completa via WhatsApp, email o QR code." />
        </div>
        <section className="logic-panel">
          <span className="eyebrow">La logica di partenza</span>
          <h2>Prima il prodotto visibile. Dopo database e login.</h2>
          <p>Questa versione valida struttura, grafica e valore commerciale. Dopo l’approvazione collegheremo Supabase, utenti, database e salvataggio reale.</p>
        </section>
      </section>
      <PreviewPanel card={card} visibility={visibility} />
    </div>
  )
}

function Feature({ n, title, text }) {
  return (
    <div className="feature">
      <span>{n}</span>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  )
}

function CardsPage({ navigate, card, visibility }) {
  return (
    <div className="main-grid">
      <section className="page-panel">
        <div className="page-head">
          <span className="eyebrow">Cards</span>
          <h2>Le tue digital card</h2>
          <button className="btn dark" onClick={() => alert('Nuova card demo creata a video. Il salvataggio reale arriverà con Supabase.')}><Plus size={18} /> Nuova card demo</button>
        </div>
        <div className="card-row">
          <div className="mini-logo">MV</div>
          <div>
            <strong>{card.name}</strong>
            <p>{card.headline}</p>
          </div>
          <span className="badge cyan">Pubblica</span>
        </div>
        <div className="actions-row">
          <button className="btn dark" onClick={() => navigate('editor')}>Modifica</button>
          <button className="btn light" onClick={() => navigate('share')}>Smart Share</button>
          <button className="btn light" onClick={() => navigate('public')}>Apri card</button>
        </div>
        <div className="metrics-grid">
          <Metric label="Tipo" value="Prodotto digitale" />
          <Metric label="Stato" value="Demo attiva" />
          <Metric label="Versione" value="V0.3.6" />
        </div>
      </section>
      <PreviewPanel card={card} visibility={visibility} />
    </div>
  )
}

function Metric({ label, value }) {
  return <div className="metric"><span>{label}</span><strong>{value}</strong></div>
}

function EditorPage({ card, visibility, updateField, toggleVisibility, stats, navigate, saveDemo, resetDemo }) {
  return (
    <div className="main-grid">
      <section className="page-panel">
        <div className="page-head">
          <div>
            <span className="eyebrow">Editor</span>
            <h2>Display Control</h2>
            <p>Decidi cosa mostrare. I campi vuoti non compaiono mai nella card o nello Smart Share.</p>
          </div>
          <div className="editor-actions">
            <button className="btn light" onClick={saveDemo}>Salva demo</button>
            <button className="btn light" onClick={resetDemo}>Ripristina</button>
            <button className="btn dark" onClick={() => navigate('public')}>Pubblica · demo</button>
          </div>
        </div>
        <div className="save-note">
          Le modifiche vengono salvate automaticamente in questo browser. Con Supabase saranno salvate nel tuo account.
        </div>

        <div className="visibility-summary">
          <SummaryItem icon={<Eye size={18} />} label="Visibili" value={stats.visible} />
          <SummaryItem icon={<EyeOff size={18} />} label="Nascosti" value={stats.hidden} />
          <SummaryItem icon={<CircleOff size={18} />} label="Non compilati" value={stats.empty} />
        </div>

        <EditorSection title="Identità">
          <ControlField k="logoText" card={card} visibility={visibility} updateField={updateField} toggleVisibility={toggleVisibility} />
          <ControlField k="name" card={card} visibility={visibility} updateField={updateField} toggleVisibility={toggleVisibility} />
          <ControlField k="claim" card={card} visibility={visibility} updateField={updateField} toggleVisibility={toggleVisibility} />
          <ControlField k="motto" card={card} visibility={visibility} updateField={updateField} toggleVisibility={toggleVisibility} />
        </EditorSection>

        <EditorSection title="Hero pubblico">
          <ControlField k="headline" card={card} visibility={visibility} updateField={updateField} toggleVisibility={toggleVisibility} />
          <ControlField k="description" card={card} visibility={visibility} updateField={updateField} toggleVisibility={toggleVisibility} textarea />
        </EditorSection>

        <EditorSection title="Contatti">
          <ControlField k="website" card={card} visibility={visibility} updateField={updateField} toggleVisibility={toggleVisibility} />
          <ControlField k="email" card={card} visibility={visibility} updateField={updateField} toggleVisibility={toggleVisibility} />
          <ControlField k="phone" card={card} visibility={visibility} updateField={updateField} toggleVisibility={toggleVisibility} />
          <ControlField k="whatsapp" card={card} visibility={visibility} updateField={updateField} toggleVisibility={toggleVisibility} />
        </EditorSection>

        <EditorSection title="Azienda e Premium">
          <ControlField k="company" card={card} visibility={visibility} updateField={updateField} toggleVisibility={toggleVisibility} />
          <ControlField k="vat" card={card} visibility={visibility} updateField={updateField} toggleVisibility={toggleVisibility} />
          <ControlField k="address" card={card} visibility={visibility} updateField={updateField} toggleVisibility={toggleVisibility} />
          <ControlField k="maps" card={card} visibility={visibility} updateField={updateField} toggleVisibility={toggleVisibility} />
          <ControlField k="linkedin" card={card} visibility={visibility} updateField={updateField} toggleVisibility={toggleVisibility} />
          <ControlField k="instagram" card={card} visibility={visibility} updateField={updateField} toggleVisibility={toggleVisibility} />
        </EditorSection>
      </section>
      <PreviewPanel card={card} visibility={visibility} />
    </div>
  )
}

function SummaryItem({ icon, label, value }) {
  return <div className="summary-item">{icon}<span>{label}</span><strong>{value}</strong></div>
}

function EditorSection({ title, children }) {
  return (
    <section className="editor-section">
      <h3>{title}</h3>
      <div className="field-grid">{children}</div>
    </section>
  )
}

function ControlField({ k, card, visibility, updateField, toggleVisibility, textarea }) {
  const filled = hasValue(card[k])
  const shown = visibility[k] && filled
  const hidden = !visibility[k] && filled

  return (
    <div className={`control-field ${shown ? 'is-visible' : ''} ${hidden ? 'is-hidden' : ''} ${!filled ? 'is-empty' : ''}`}>
      <div className="field-top">
        <div>
          <strong>{fieldLabels[k]}</strong>
          {premiumFields.has(k) && <span className="premium-chip">Premium</span>}
          {!premiumFields.has(k) && <span className="free-chip">Free</span>}
        </div>
        <div className="status-badge">
          {!filled ? 'Non compilato' : visibility[k] ? 'Visibile' : 'Nascosto'}
        </div>
      </div>
      <div className="segmented">
        <button
          className={visibility[k] ? 'selected' : ''}
          onClick={() => toggleVisibility(k, true)}
          type="button"
          disabled={!filled}
        >
          <Eye size={15} /> Visibile
        </button>
        <button
          className={!visibility[k] ? 'selected' : ''}
          onClick={() => toggleVisibility(k, false)}
          type="button"
          disabled={!filled}
        >
          <EyeOff size={15} /> Nascosto
        </button>
      </div>
      {textarea ? (
        <textarea value={card[k]} onChange={e => updateField(k, e.target.value)} placeholder={`Inserisci ${fieldLabels[k].toLowerCase()}`} />
      ) : (
        <input value={card[k]} onChange={e => updateField(k, e.target.value)} placeholder={`Inserisci ${fieldLabels[k].toLowerCase()}`} />
      )}
    </div>
  )
}

function SharePage({ card, visibility, smartShare, copy, navigate }) {
  const publicUrl = getPublicCardUrl()
  return (
    <div className="main-grid">
      <section className="page-panel">
        <div className="page-head">
          <div>
            <span className="eyebrow">Smart Share</span>
            <h2>Condividi la scheda completa</h2>
            <p>WhatsApp, email e copia includono solo i campi visibili e compilati.</p>
          </div>
          <span className="badge cyan">Display Control attivo</span>
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
              <button className="btn light" onClick={() => copy(card.email, 'Email')}><Copy size={17} /> Copia email</button>
              <button className="btn light" onClick={() => copy(card.phone, 'Numero')}><Copy size={17} /> Copia numero</button>
              <a className="btn light" href={mailtoLink(card, visibility)}><Mail size={17} /> Invia email</a>
              <a className="btn light" href={whatsappLink(card, visibility)} target="_blank" rel="noreferrer"><MessageCircle size={17} /> WhatsApp</a>
              <button className="btn light" onClick={() => navigate('public')}><ExternalLink size={17} /> Apri card</button>
            </div>
          </div>
        </div>
      </section>
      <PreviewPanel card={card} visibility={visibility} />
    </div>
  )
}


function RealQr({ value, name }) {
  const [qrData, setQrData] = useState('')

  useEffect(() => {
    let active = true
    QRCode.toDataURL(value, {
      width: 520,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#ffffff'
      }
    }).then((url) => {
      if (active) setQrData(url)
    })
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


function PreviewPanel({ card, visibility }) {
  return (
    <aside className="preview-panel">
      <div className="preview-header">
        <span>Anteprima smartphone</span>
        <strong>{card.name}</strong>
      </div>
      <PhoneCard card={card} visibility={visibility} compact />
    </aside>
  )
}

function PhoneCard({ card, visibility, compact = false }) {
  return (
    <div className={`phone-card ${compact ? 'compact' : ''}`} style={{ '--accent': card.accent }}>
      <div className="phone-glow" />
      <div className="phone-top">
        {visibleValue(card, visibility, 'logoText') && <div className="phone-logo">{card.logoText}</div>}
        <span className="beta">BETA</span>
      </div>
      {visibleValue(card, visibility, 'claim') && <p className="phone-claim">{card.claim}</p>}
      {visibleValue(card, visibility, 'headline') && <h3>{card.headline}</h3>}
      {visibleValue(card, visibility, 'description') && <p className="phone-desc">{card.description}</p>}
      <div className="phone-actions">
        {visibleValue(card, visibility, 'website') && <a href={card.website} target="_blank" rel="noreferrer">Visita il sito</a>}
        {visibleValue(card, visibility, 'whatsapp') && <a href={whatsappLink(card, visibility)} target="_blank" rel="noreferrer">WhatsApp</a>}
      </div>
      <div className="phone-features">
        <InfoCard title="Costi" text="Spese, manutenzioni, carburante, rate e leasing sempre sotto controllo." />
        <InfoCard title="Scadenze" text="Assicurazione, bollo, revisione e collaudi in un’unica vista." />
        <InfoCard title="Consumi" text="Analisi chiara dei consumi anche per benzina, diesel, GPL, metano, ibridi ed elettrici." />
      </div>
    </div>
  )
}

function InfoCard({ title, text }) {
  return <div className="info-card"><strong>{title}</strong><p>{text}</p></div>
}

function PublicCard({ card, visibility, back }) {
  const smartShare = buildSmartShare(card, visibility)
  return (
    <section className="public-wrap">
      <button className="btn light back-btn" onClick={back}><ArrowLeft size={18} /> Torna al Card Creator</button>
      <div className="public-card">
        <PhoneCard card={card} visibility={visibility} />
        <div className="public-extra">
          <h2>Utile per</h2>
          <div className="tag-list">
            <span>Famiglie con più veicoli</span>
            <span>Professionisti</span>
            <span>Appassionati auto e moto</span>
            <span>Piccole flotte</span>
          </div>
          <div className="public-links">
            {visibleValue(card, visibility, 'email') && <a href={mailtoLink(card, visibility)}>{card.email}</a>}
            {visibleValue(card, visibility, 'website') && <a href={card.website} target="_blank" rel="noreferrer">{card.website}</a>}
            {visibleValue(card, visibility, 'phone') && <a href={`tel:${normalizePhone(card.phone)}`}>{card.phone}</a>}
            {visibleValue(card, visibility, 'maps') && <a href={card.maps} target="_blank" rel="noreferrer">Apri posizione Google Maps</a>}
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

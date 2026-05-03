
import React, { useEffect, useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import QRCode from 'qrcode'
import {
  Home, CreditCard, Edit3, QrCode, Share2, Wallet, BarChart3, Palette, Users,
  Settings, Menu, X, Eye, EyeOff, Copy, Mail, MessageCircle, ExternalLink, Plus,
  ArrowLeft, CheckCircle2, CircleOff, Layers, Sparkles
} from 'lucide-react'
import { supabase, isSupabaseConfigured, supabaseConfig, supabaseUrl, supabaseAnonKey } from './supabaseClient.js'
import './style.css'

const STORAGE_CARDS = 'md_card_creator_cards_v037'
const STORAGE_ACTIVE = 'md_card_creator_active_card_v037'

const fieldLabels = {
  logoText: 'Logo / sigla',
  profilePhoto: 'Foto profilo — Premium',
  uploadedLogo: 'Logo caricato — Premium',
  coverImage: 'Cover visual — Premium',
  fullName: 'Nome e cognome',
  roleTitle: 'Ruolo / qualifica',
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

const premiumFields = new Set(['profilePhoto', 'uploadedLogo', 'coverImage', 'vat', 'address', 'maps', 'linkedin', 'instagram', 'motto'])

const defaultVisibility = {
  logoText: true,
  profilePhoto: false,
  uploadedLogo: false,
  coverImage: false,
  fullName: true,
  roleTitle: true,
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


const safeLogoText = (value, fallback = 'md') => {
  const raw = String(value || fallback || '').trim()
  if (!raw) return 'md'

  const cleaned = raw.replace(/[^a-zA-Z0-9]/g, '')
  if (!cleaned) return raw.slice(0, 2)

  if (cleaned.length <= 3) return cleaned

  const words = raw.split(/\s+/).filter(Boolean)
  if (words.length >= 2) {
    return words.slice(0, 3).map(word => word[0]).join('').toUpperCase()
  }

  return cleaned.slice(0, 3).toUpperCase()
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
    roleTitle: 'Gestione intelligente del veicolo',
    fullName: 'myVeicolo.net',
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
    roleTitle: 'Digital Product Builder',
    fullName: 'Michele Doris',
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
    roleTitle: 'Art Director',
    fullName: 'Jacopo Doris',
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
    roleTitle: 'Consulenza fiscale e societaria',
    fullName: 'Studio Rossi',
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
    roleTitle: 'Hospitality premium',
    fullName: 'Hotel Aurora',
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
    visibility: { ...defaultVisibility, fullName: true, roleTitle: true, vat: false, linkedin: false }
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
  if (visibleValue(card, 'fullName') && card.fullName) lines.push(`👤 ${card.fullName}`)
  if (visibleValue(card, 'roleTitle') && card.roleTitle) lines.push(`🎯 ${card.roleTitle}`)
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


function slugify(value) {
  return String(value || 'digital-card')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || `card-${Date.now()}`
}

function cardToDb(card, userId) {
  return {
    user_id: userId,
    slug: slugify(card.slug || card.name),
    template_key: card.template || 'automotive',
    logo_text: card.logoText || '',
    person_name: card.fullName || '',
    role_title: card.roleTitle || '',
    name: card.name || '',
    claim: card.claim || '',
    headline: card.headline || '',
    description: card.description || '',
    motto: card.motto || '',
    website: card.website || '',
    email: card.email || '',
    phone: card.phone || '',
    whatsapp: card.whatsapp || '',
    company: card.company || '',
    vat: card.vat || '',
    address: card.address || '',
    maps: card.maps || '',
    linkedin: card.linkedin || '',
    instagram: card.instagram || '',
    status: 'published'
  }
}

function dbToCard(row, visibilityRows = []) {
  const visibility = { ...defaultVisibility }
  visibilityRows.filter(v => v.card_id === row.id).forEach(v => {
    visibility[v.field_key] = Boolean(v.is_visible)
  })

  return {
    id: row.id,
    dbId: row.id,
    slug: row.slug,
    template: row.template_key || 'automotive',
    logoText: row.logo_text || '',
    fullName: row.person_name || '',
    roleTitle: row.role_title || '',
    name: row.name || '',
    claim: row.claim || '',
    headline: row.headline || '',
    description: row.description || '',
    motto: row.motto || '',
    website: row.website || '',
    email: row.email || '',
    phone: row.phone || '',
    whatsapp: row.whatsapp || '',
    company: row.company || '',
    vat: row.vat || '',
    address: row.address || '',
    maps: row.maps || '',
    linkedin: row.linkedin || '',
    instagram: row.instagram || '',
    visibility
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
  const [session, setSession] = useState(null)
  const [authLoading, setAuthLoading] = useState(true)
  const [cloudLoading, setCloudLoading] = useState(false)
  const [cloudStatus, setCloudStatus] = useState(isSupabaseConfigured ? 'Supabase configurato' : 'Supabase non configurato');

  const activeCard = cards.find(c => c.id === activeId) || cards[0]

  useEffect(() => {
    if (!supabase) {
      setAuthLoading(false)
      return
    }

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setAuthLoading(false)
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession)
    })

    return () => listener?.subscription?.unsubscribe()
  }, [])

  useEffect(() => {
    if (!session?.user || !supabase) return

    async function loadCloudCards() {
      setCloudLoading(true)

      const { data: cardRows, error: cardError } = await supabase
        .from('cards')
        .select('*')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: true })

      if (cardError) {
        setCloudStatus(`Errore caricamento cloud: ${cardError.message}`)
        setCloudLoading(false)
        return
      }

      if (cardRows?.length) {
        const ids = cardRows.map(c => c.id)
        const { data: visRows, error: visError } = await supabase
          .from('card_visibility')
          .select('*')
          .in('card_id', ids)

        if (visError) {
          setCloudStatus(`Errore visibility: ${visError.message}`)
        } else {
          const mapped = cardRows.map(row => dbToCard(row, visRows || []))
          setCards(mapped)
          setActiveId(mapped[0].id)
          setCloudStatus('Card caricate da Supabase')
        }
      } else {
        setCloudStatus('Account collegato. Nessuna card cloud: salva una card demo per iniziare.')
      }

      setCloudLoading(false)
    }

    loadCloudCards()
  }, [session?.user?.id])

  useEffect(() => saveStored(STORAGE_CARDS, cards), [cards])

  useEffect(() => {
    const goEditor = () => setActive('editor')
    window.addEventListener('md-go-editor', goEditor)
    return () => window.removeEventListener('md-go-editor', goEditor)
  }, [])
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

  const saveDemo = async () => {
    saveStored(STORAGE_CARDS, cards)
    saveStored(STORAGE_ACTIVE, activeId)

    if (!session?.user || !supabase) {
      notify('Demo salvata in locale')
      return
    }

    setCloudLoading(true)
    const payload = cardToDb(activeCard, session.user.id)

    let saved
    if (activeCard.dbId) {
      const { data, error } = await supabase
        .from('cards')
        .update(payload)
        .eq('id', activeCard.dbId)
        .eq('user_id', session.user.id)
        .select()
        .single()

      if (error) {
        setCloudStatus(`Errore salvataggio: ${error.message}`)
        notify('Errore salvataggio cloud')
        setCloudLoading(false)
        return
      }
      saved = data
    } else {
      const { data, error } = await supabase
        .from('cards')
        .insert(payload)
        .select()
        .single()

      if (error) {
        setCloudStatus(`Errore salvataggio: ${error.message}`)
        notify('Errore salvataggio cloud')
        setCloudLoading(false)
        return
      }
      saved = data
    }

    const visibilityPayload = Object.entries(activeCard.visibility || {}).map(([field_key, is_visible]) => ({
      card_id: saved.id,
      field_key,
      is_visible: Boolean(is_visible)
    }))

    const { error: visibilityError } = await supabase
      .from('card_visibility')
      .upsert(visibilityPayload, { onConflict: 'card_id,field_key' })

    if (visibilityError) {
      setCloudStatus(`Card salvata, errore visibilità: ${visibilityError.message}`)
      notify('Card salvata, visibility da controllare')
      setCloudLoading(false)
      return
    }

    const updatedCard = { ...activeCard, id: saved.id, dbId: saved.id, slug: saved.slug, template: saved.template_key }
    setCards(prev => prev.map(card => card.id === activeId ? updatedCard : card))
    setActiveId(saved.id)
    saveStored(STORAGE_ACTIVE, saved.id)
    setCloudStatus('Card salvata su Supabase')
    notify('Card salvata su Supabase')
    setCloudLoading(false)
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
      fullName: 'Nuova card demo',
      roleTitle: 'Ruolo / qualifica',
      name: 'Nuova card demo',
      claim: 'Bozza locale',
      headline: 'La tua nuova digital card.',
      description: 'Modifica i dati nell’editor e scegli quali campi rendere visibili.',
      template: 'personal',
      visibility: { ...defaultVisibility, fullName: true, roleTitle: true, vat: false, address: false, maps: false, linkedin: false, instagram: false }
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
              <span className="eyebrow">MVP 0.5.4.3 · Social Visible Fix.1 · Claim + Editor Cleanup</span>
              <h1>md|studios Card Creator</h1>
            </div>
            <button className="btn ghost" onClick={() => navigate('public')}>Apri demo pubblica</button>
          </div>
        )}

        {active === 'home' && <HomePage navigate={navigate} card={activeCard} cards={cards} createDemoCard={createDemoCard} />}
        {active === 'account' && <AccountPage session={session} authLoading={authLoading} cloudLoading={cloudLoading} cloudStatus={cloudStatus} cards={cards} />}
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
  ['account', Users, 'Account'],
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
          <span className="eyebrow">MVP 0.5.4.3 · Social Visible Fix.1 · Claim + Editor Cleanup</span>
          <h2>Una sola piattaforma. Infinite identità da condividere.</h2>
          <p>Crea, gestisci e aggiorna le digital card di persone, team, sedi, eventi e progetti da un unico spazio cloud.</p>
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
          <h2>Per persone, team, sedi, eventi e progetti.</h2>
          <p>La direzione commerciale è chiara: ogni identità digitale può essere creata, aggiornata e condivisa da un unico spazio cloud, senza perdere coerenza.</p>
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





function AccountPage({ session, authLoading, cloudLoading, cloudStatus, cards }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [message, setMessage] = useState('')

  const signUp = async () => {
    if (!supabase) {
      setMessage('Supabase non configurato. Controlla le variabili Netlify.')
      return
    }

    if (!email || !password) {
      setMessage('Inserisci email e password.')
      return
    }

    if (password.length < 6) {
      setMessage('La password deve avere almeno 6 caratteri.')
      return
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: { data: { full_name: fullName.trim() } }
      })

      if (error) {
        setMessage(`Errore creazione account: ${error.message}`)
        return
      }

      if (data.user) {
        await supabase.from('profiles').upsert({
          id: data.user.id,
          email: email.trim(),
          full_name: fullName.trim()
        })
      }

      setMessage('Account creato. Se richiesto, conferma la mail e poi fai login.')
    } catch (error) {
      setMessage(`Errore rete durante creazione account: ${error?.message || 'Failed to fetch'}`)
    }
  }

  const signIn = async () => {
    if (!supabase) {
      setMessage('Supabase non configurato. Controlla le variabili Netlify.')
      return
    }

    if (!email || !password) {
      setMessage('Inserisci email e password.')
      return
    }

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password
      })

      setMessage(error ? `Errore login: ${error.message}` : 'Login effettuato.')
    } catch (error) {
      setMessage(`Errore rete durante login: ${error?.message || 'Failed to fetch'}`)
    }
  }

  const signOut = async () => {
    if (!supabase) return
    await supabase.auth.signOut()
    setMessage('Logout effettuato.')
  }

  const cloudReady = Boolean(supabase && isSupabaseConfigured)
  const activeCloudText = session
    ? 'Cloud attivo: le card possono essere salvate su Supabase.'
    : 'Accedi per salvare le card nel cloud e ritrovarle da altri dispositivi.'

  return (
    <div className="main-grid">
      <section className="page-panel">
        <div className="page-head">
          <div>
            <span className="eyebrow">Account</span>
            <h2>Il tuo spazio cloud</h2>
            <p>{activeCloudText}</p>
          </div>
          <span className={`badge ${session ? 'cyan' : ''}`}>{session ? 'Cloud attivo' : 'Accesso richiesto'}</span>
        </div>

        <section className="account-cloud-panel">
          <div className="cloud-card primary">
            <span>Stato piattaforma</span>
            <strong>{cloudReady ? 'Supabase collegato' : 'Supabase da configurare'}</strong>
            <p>{authLoading ? 'Controllo sessione in corso…' : cloudStatus}</p>
          </div>
          <div className="cloud-card">
            <span>Card disponibili</span>
            <strong>{cards.length}</strong>
            <p>Card caricate nell’app corrente.</p>
          </div>
          <div className="cloud-card">
            <span>Versione</span>
            <strong>V0.4.5</strong>
            <p>Account cloud pulito.</p>
          </div>
        </section>

        {session ? (
          <div className="account-card clean">
            <div>
              <span className="eyebrow">Account collegato</span>
              <h3>{session.user.email}</h3>
              <p>Ora puoi andare in Editor, modificare la card attiva e premere <strong>Salva demo</strong> per salvarla su Supabase.</p>
            </div>
            <div className="account-actions">
              <button type="button" className="btn dark" onClick={() => window.dispatchEvent(new CustomEvent('md-go-editor'))}>
                Vai all’editor
              </button>
              <button type="button" className="btn light" onClick={signOut}>Logout</button>
            </div>
          </div>
        ) : (
          <div className="auth-clean-card">
            <div>
              <span className="eyebrow">Accesso</span>
              <h3>Entra o crea il tuo account</h3>
              <p>Usa email e password. Dopo il login, il salvataggio cloud sarà disponibile.</p>
            </div>

            <div className="auth-grid">
              <label>
                Nome completo
                <input value={fullName} onChange={e => setFullName(e.target.value)} placeholder="Michele Doris" />
              </label>
              <label>
                Email
                <input value={email} onChange={e => setEmail(e.target.value)} placeholder="nome@email.it" />
              </label>
              <label>
                Password
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="almeno 6 caratteri" />
              </label>
              <div className="auth-actions">
                <button type="button" className="btn dark" onClick={signIn}>Login</button>
                <button type="button" className="btn light" onClick={signUp}>Crea account</button>
              </div>
            </div>
          </div>
        )}

        {message && <div className="save-note">{message}</div>}

        <section className="supabase-panel clean">
          <div>
            <span className="eyebrow">Come funziona</span>
            <h3>Locale + Cloud</h3>
            <p>La demo resta utilizzabile anche in locale. Quando sei loggato, il pulsante Salva demo invia la card attiva al database Supabase.</p>
          </div>
          <div className="data-model">
            <span>Account</span>
            <span>Cards</span>
            <span>Fields</span>
            <span>Visibility</span>
          </div>
        </section>
      </section>
      <PreviewPanel card={cards[0] || demoCards[0]} />
    </div>
  )
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

        <div className="save-note">Le modifiche vengono salvate localmente. Se sei loggato, premi Salva demo per salvarle anche su Supabase.</div>

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

        <EditorSection title="Persona">
          {['logoText', 'fullName', 'roleTitle', 'name', 'claim', 'motto'].map(k => <ControlField key={k} k={k} card={card} updateField={updateField} updateVisibility={updateVisibility} />)}
        </EditorSection>

        <EditorSection title="Brand / messaggio">
          <ControlField k="headline" card={card} updateField={updateField} updateVisibility={updateVisibility} />
          <ControlField k="description" card={card} updateField={updateField} updateVisibility={updateVisibility} textarea />
        </EditorSection>

        <EditorSection title="Contatti">
          {['website', 'email', 'phone', 'whatsapp'].map(k => <ControlField key={k} k={k} card={card} updateField={updateField} updateVisibility={updateVisibility} />)}
        </EditorSection>

        <EditorSection title="Azienda / brand">
          {['company', 'vat', 'address', 'maps'].map(k => <ControlField key={k} k={k} card={card} updateField={updateField} updateVisibility={updateVisibility} />)}
        </EditorSection>

        <EditorSection title="Social">
          {['linkedin', 'instagram'].map(k => <ControlField key={k} k={k} card={card} updateField={updateField} updateVisibility={updateVisibility} />)}
        </EditorSection>

        <EditorSection title="Extra / Premium">
          <div className="premium-placeholder">
            <span>Funzioni future</span>
            <h4>Identità visiva Premium</h4>
            <p>Foto profilo, logo caricato e cover visual richiederanno Supabase Storage. Per ora sono segnate come direzione prodotto, non ancora attive.</p>
            <div className="premium-future-grid">
              <strong>Foto profilo</strong>
              <strong>Logo caricato</strong>
              <strong>Cover visual</strong>
            </div>
          </div>
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
        <button className={isVisible ? 'selected' : ''} onClick={() => updateVisibility(k, true)} type="button">
          <Eye size={15} /> Visibile
        </button>
        <button className={!isVisible ? 'selected' : ''} onClick={() => updateVisibility(k, false)} type="button">
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

  const smsHref = `sms:?&body=${encodeURIComponent(smartShare)}`
  const linkedInHref = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(publicUrl)}`

  return (
    <div className="main-grid">
      <section className="page-panel share-ux-page">
        <div className="page-head">
          <div>
            <span className="eyebrow">Smart Share</span>
            <h2>Condividi la card</h2>
            <p>QR, link e messaggio completo sono collegati alla card attiva. I campi nascosti o vuoti non vengono inviati.</p>
          </div>
          <span className="badge cyan">Card attiva</span>
        </div>

        <section className="share-hero-panel">
          <div className="share-qr-stage">
            <div className="share-qr-title">
              <span>QR pubblico</span>
              <strong>{card.name}</strong>
            </div>
            <div className="share-qr-box">
              <RealQr value={publicUrl} name={card.name} />
            </div>
            <p>{publicUrl}</p>
          </div>

          <div className="share-action-stage">
            <span className="eyebrow">Invio rapido</span>
            <h3>Una card, molti canali.</h3>
            <p>Usa il QR dal vivo, copia il link oppure invia la scheda completa con WhatsApp, email, SMS o LinkedIn.</p>

            <div className="share-primary-grid">
              <button type="button" className="btn dark" onClick={() => copy(smartShare, 'Scheda completa')}>Copia scheda completa</button>
              <button type="button" className="btn light" onClick={() => copy(publicUrl, 'Link card')}>Copia link</button>
            </div>

            <div className="share-channel-list">
              <a href={whatsappLink(card)} target="_blank" rel="noreferrer">
                <span>WhatsApp</span>
                <strong>Invia messaggio completo</strong>
              </a>
              <a href={mailtoLink(card)}>
                <span>Email</span>
                <strong>Prepara email con la card</strong>
              </a>
              <a href={smsHref}>
                <span>SMS</span>
                <strong>Invia testo e link</strong>
              </a>
              <a href={linkedInHref} target="_blank" rel="noreferrer">
                <span>LinkedIn</span>
                <strong>Condividi il link pubblico</strong>
              </a>
            </div>
          </div>
        </section>

        <section className="share-message-panel">
          <div>
            <span className="eyebrow">Messaggio generato</span>
            <h3>Anteprima testo</h3>
            <p>Questo è quello che viene copiato o inviato dai canali rapidi.</p>
          </div>
          <pre>{smartShare}</pre>
        </section>

        <section className="share-mini-public">
          <div>
            <span className="eyebrow">Public Card</span>
            <h3>Controllo finale</h3>
            <p>Apri la card pubblica per vedere esattamente cosa riceverà il contatto.</p>
          </div>
          <button type="button" className="btn dark" onClick={() => navigate('public')}>Apri Public Card</button>
        </section>
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
        {visibleValue(card, 'logoText') && <div className="phone-logo">{safeLogoText(card.logoText)}</div>}
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


function normalizeSocialUrl(value, type) {
  const raw = String(value || '').trim()
  if (!raw) return '#'
  if (/^https?:\/\//i.test(raw)) return raw

  const clean = raw.replace(/^@/, '')
  if (type === 'instagram') return `https://www.instagram.com/${clean}`
  if (type === 'linkedin') return raw.includes('linkedin.com') ? `https://${raw}` : `https://www.linkedin.com/in/${clean}`

  return `https://${raw}`
}

function PublicCard({ card, back }) {
  const template = templates[card.template] || templates.automotive
  const smartShare = buildSmartShare(card)

  const contactRows = [
    visibleValue(card, 'email') ? { label: 'Email', value: card.email, href: mailtoLink(card) } : null,
    visibleValue(card, 'website') ? { label: 'Sito web', value: card.website, href: card.website } : null,
    visibleValue(card, 'phone') ? { label: 'Telefono', value: card.phone, href: `tel:${normalizePhone(card.phone)}` } : null,
    visibleValue(card, 'whatsapp') ? { label: 'WhatsApp', value: card.whatsapp, href: whatsappLink(card) } : null,
    visibleValue(card, 'maps') ? { label: 'Mappa', value: 'Apri posizione Google Maps', href: card.maps } : null,
    visibleValue(card, 'address') ? { label: 'Indirizzo', value: card.address, href: null } : null,
    visibleValue(card, 'company') ? { label: 'Azienda', value: card.company, href: null } : null,
    visibleValue(card, 'vat') ? { label: 'P. IVA', value: card.vat, href: null } : null,
    visibleValue(card, 'linkedin') ? { label: 'LinkedIn', value: 'Apri LinkedIn', href: card.linkedin } : null,
    visibleValue(card, 'instagram') ? { label: 'Instagram', value: 'Apri Instagram', href: card.instagram } : null
  ].filter(Boolean)

  return (
    <section className="public-wrap public-real-wrap">
      <button className="btn light back-btn" onClick={back}><ArrowLeft size={18} /> Torna al Card Creator</button>

      <article className={`public-real-card tone-${template.tone}`} style={{ '--accent': template.accent }}>
        <header className="public-real-hero">
          <div className="public-real-top">
            {visibleValue(card, 'logoText') && <div className="public-real-logo">{safeLogoText(card.logoText)}</div>}
            {visibleValue(card, 'company') && <span className="public-real-badge">{card.company}</span>}
          </div>

          {visibleValue(card, 'claim') && <p className="public-real-claim">{card.claim}</p>}
          {visibleValue(card, 'headline') && <h1>{card.headline}</h1>}
          {visibleValue(card, 'description') && <p className="public-real-desc">{card.description}</p>}
          {visibleValue(card, 'motto') && <div className="public-real-motto">{card.motto}</div>}

          <div className="public-real-actions">
            {visibleValue(card, 'website') && <a className="primary" href={card.website} target="_blank" rel="noreferrer">Visita il sito</a>}
            {(visibleValue(card, 'whatsapp') || visibleValue(card, 'phone')) && <a className="secondary" href={whatsappLink(card)} target="_blank" rel="noreferrer">WhatsApp</a>}
          </div>
        </header>

        {(visibleValue(card, 'fullName') || visibleValue(card, 'name')) && (
          <section className="public-real-name">
            {visibleValue(card, 'fullName') && card.fullName ? <h2>{card.fullName}</h2> : <h2>{card.name}</h2>}
            {visibleValue(card, 'roleTitle') && card.roleTitle && <h4>{card.roleTitle}</h4>}
            {visibleValue(card, 'fullName') && card.fullName && visibleValue(card, 'name') && card.name && card.name !== card.fullName && <p>{card.name}</p>}
          </section>
        )}

        {contactRows.length > 0 && (
          <section className="public-real-contacts">
            {contactRows.map((row) => (
              row.href ? (
                <a key={`${row.label}-${row.value}`} href={row.href} target="_blank" rel="noreferrer">
                  <span>{row.label}</span>
                  <strong>{row.value}</strong>
                </a>
              ) : (
                <div key={`${row.label}-${row.value}`}>
                  <span>{row.label}</span>
                  <strong>{row.value}</strong>
                </div>
              )
            ))}
          </section>
        )}

        <button className="public-copy-button" onClick={() => copyText(smartShare)}>Copia scheda completa</button>
      </article>
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
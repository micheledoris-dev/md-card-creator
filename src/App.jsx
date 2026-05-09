import React, { useMemo, useState } from 'react'

const cardsData = [
  { id:1, name:'Michele Doris', role:'Founder & Strategic Designer', company:'md|studios', status:'Pubblicata', views:1248, clicks:317, template:'Executive' },
  { id:2, name:'myVeicolo.net', role:'Garage digitale intelligente', company:'Product Card', status:'Bozza', views:386, clicks:92, template:'Product' },
  { id:3, name:'Studio Cliente', role:'Corporate Identity Card', company:'Cliente Premium', status:'Revisione', views:842, clicks:211, template:'Agency' },
]

const sections = ['Dashboard','Card Studio','Team Admin','Piani','Roadmap']

const MOODS = [
  { id:'lusso',     icon:'✦', label:'Lusso',     sub:'Nero & oro',    heroBg:'linear-gradient(160deg,#0f0f0c,#1a1a14)', accent:'#d8c59a', avatarBorder:'#d8c59a', bodyBg:'#0a0a08', linkBg:'rgba(216,197,154,0.06)', linkBorder:'rgba(216,197,154,0.15)', ctaBg:'#d8c59a', ctaColor:'#000', textMuted:'rgba(240,237,232,0.45)', nameColor:'#f0ede8', roleColor:'#d8c59a', dark:true },
  { id:'authority', icon:'▲', label:'Authority', sub:'Corporate',      heroBg:'linear-gradient(160deg,#0d1520,#162035)', accent:'#4a9eff', avatarBorder:'#4a9eff', bodyBg:'#0d1520', linkBg:'rgba(74,158,255,0.05)', linkBorder:'rgba(74,158,255,0.15)', ctaBg:'#4a9eff', ctaColor:'#000', textMuted:'rgba(220,232,248,0.5)', nameColor:'#dce8f8', roleColor:'#4a9eff', dark:true },
  { id:'minimal',   icon:'○', label:'Minimal',   sub:'Silenzio puro', heroBg:'#f8f7f4', accent:'#1a1a18', avatarBorder:'#d0cdc8', bodyBg:'#f8f7f4', linkBg:'rgba(0,0,0,0.03)', linkBorder:'rgba(0,0,0,0.09)', ctaBg:'#1a1a18', ctaColor:'#f8f7f4', textMuted:'#8a8880', nameColor:'#1a1a18', roleColor:'#6a6866', dark:false },
  { id:'social',    icon:'☀', label:'Social',    sub:'Caldo & umano', heroBg:'linear-gradient(160deg,#ff8c42,#ff6b2b)', accent:'#ff8c42', avatarBorder:'rgba(255,255,255,0.6)', bodyBg:'#fff9f5', linkBg:'rgba(255,140,66,0.06)', linkBorder:'rgba(255,140,66,0.15)', ctaBg:'#ff8c42', ctaColor:'#fff', textMuted:'rgba(255,255,255,0.75)', nameColor:'#fff', roleColor:'rgba(255,255,255,0.85)', dark:false, heroTextDark:true },
  { id:'creative',  icon:'◈', label:'Creative',  sub:'Artistico',     heroBg:'linear-gradient(135deg,#1a0d2e,#0d1a2e)', accent:'#b87de8', avatarBorder:'rgba(184,125,232,0.5)', bodyBg:'#12091e', linkBg:'rgba(184,125,232,0.06)', linkBorder:'rgba(184,125,232,0.15)', ctaBg:'#b87de8', ctaColor:'#fff', textMuted:'rgba(232,216,248,0.5)', nameColor:'#e8d8f8', roleColor:'#b87de8', dark:true },
  { id:'enigma',    icon:'?', label:'Enigma',    sub:'Solo QR',       heroBg:'#c9a84c', isEnigma:true },
]

const MOOD_DESC = {
  lusso:     'Nero profondo, oro, anello pulsante. Per incontri dove il primo impatto è tutto.',
  authority: 'Linee nette, blu elettrico. Per pitch, meeting formali, clienti corporate.',
  minimal:   'Bianco assoluto, silenzio puro. Per chi sa che il lusso vero non urla.',
  social:    'Gradiente arancione caldo. Per aperitivi, eventi, nuove conoscenze.',
  creative:  'Viola, orbs luminose. Per artisti, designer, creativi che vogliono stupire.',
  enigma:    "Un solo colore. Solo QR. Chi riceve non sa cosa c'è — finché non scansiona.",
}

function Sidebar({ section, setSection }) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-mark">md</div>
        <div>
          <p className="brand-title">md|studios</p>
          <p className="brand-subtitle">Card Creator</p>
        </div>
      </div>
      <nav className="nav">
        {sections.map(item => (
          <button key={item} className={section===item?'active':''} onClick={()=>setSection(item)}>{item}</button>
        ))}
      </nav>
      <div className="sidebar-note">
        <strong>Principio guida</strong>
        <p>Prima una card bellissima e pubblicabile. Poi team, AI, CRM e app native.</p>
      </div>
    </aside>
  )
}

function Header({ section }) {
  return (
    <header className="header">
      <div><small>Creative Desk</small><h1>{section}</h1></div>
      <div className="header-actions">
        <button className="btn">Anteprima</button>
        <button className="btn primary">Pubblica</button>
      </div>
    </header>
  )
}

function MobileTabs({ section, setSection }) {
  return (
    <div className="mobile-tabs">
      {sections.map(item => (
        <button key={item} className={section===item?'active':''} onClick={()=>setSection(item)}>{item}</button>
      ))}
    </div>
  )
}

function Dashboard({ setSelectedCard, setSection }) {
  return (
    <div className="grid">
      <section className="grid stats">
        <div className="card"><p className="stat-label">Card attive</p><p className="stat-value">18</p></div>
        <div className="card"><p className="stat-label">Visualizzazioni</p><p className="stat-value">12.4k</p></div>
        <div className="card"><p className="stat-label">Click contatto</p><p className="stat-value">3.1k</p></div>
      </section>
      <section className="card">
        <div className="section-title">
          <div><p className="kicker">Workspace</p><h2>Le tue identità digitali</h2></div>
          <button className="btn primary">+ Nuova card</button>
        </div>
        <div className="grid cards-grid">
          {cardsData.map(card => (
            <button key={card.id} className="project-card" onClick={()=>{setSelectedCard(card);setSection('Card Studio')}}>
              <span className="pill">{card.status}</span>
              <h3>{card.name}</h3>
              <p>{card.role}</p>
              <div className="project-footer"><span>{card.template}</span><span>{card.views} viste</span></div>
            </button>
          ))}
        </div>
      </section>
      <section className="grid" style={{gridTemplateColumns:'minmax(0,2fr) minmax(280px,1fr)'}}>
        <div className="card">
          <h2>Azioni consigliate</h2>
          <div className="field-grid">
            <div className="field"><small>Brand</small><span>Completa il brand kit</span></div>
            <div className="field"><small>Lead</small><span>Aggiungi un modulo contatto</span></div>
            <div className="field"><small>Template</small><span>Crea template aziendale</span></div>
            <div className="field"><small>Report</small><span>Esporta report mensile</span></div>
          </div>
        </div>
        <div className="card">
          <p className="kicker">AI Assistant</p><h2>Design guidato</h2>
          <p style={{color:'#aaa',lineHeight:1.7}}>Mantieni massimo due colori principali, aumenta il contrasto del testo secondario e porta il QR code vicino alla CTA.</p>
        </div>
      </section>
    </div>
  )
}

function MoodCardPreview({ card, mood }) {
  const m = MOODS.find(x=>x.id===mood) || MOODS[0]
  const initials = card.name.split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase()

  if (m.isEnigma) return (
    <div className="phone-card-enigma" style={{background:m.heroBg}}>
      <div className="enigma-vignette"/>
      <div className="enigma-qr">⊞</div>
      <p className="enigma-hint">Scansiona per scoprire</p>
    </div>
  )

  return (
    <div className="phone-card" style={{background:m.bodyBg}}>
      <div className="phone-card-hero" style={{background:m.heroBg}}>
        {m.id==='lusso' && <div className="hero-glow"/>}
        {m.id==='creative' && <div className="creative-orb"/>}
        <div className="hero-avatar-wrap">
          {m.id==='lusso' && <><div className="pulse-ring"/><div className="pulse-ring delay"/></>}
          <div className="hero-avatar" style={{border:`2px solid ${m.avatarBorder}`,color:m.nameColor}}>{initials}</div>
        </div>
        <div className="hero-text" style={{textAlign:m.id==='authority'?'left':'center'}}>
          <div className="hero-name" style={{color:m.nameColor}}>{card.name}</div>
          <div className="hero-role" style={{color:m.roleColor}}>{card.role}</div>
          <div className="hero-company" style={{color:m.textMuted}}>{card.company}</div>
          {m.id==='lusso' && <div className="hero-gold-line"/>}
        </div>
      </div>
      <div className="phone-card-body" style={{background:m.bodyBg,borderTop:`1px solid ${m.linkBorder}`}}>
        <div className="phone-card-cta-row">
          <button className="phone-cta-main" style={{background:m.ctaBg,color:m.ctaColor}}>Contattami</button>
          <button className="phone-cta-sec" style={{border:`1px solid ${m.linkBorder}`,color:m.dark?'rgba(240,237,232,0.6)':'#666'}}>vCard ↓</button>
        </div>
        {['Telefono','Email','Sito web'].map(label=>(
          <div key={label} className="phone-link-row" style={{background:m.linkBg,border:`1px solid ${m.linkBorder}`}}>
            <span className="phone-link-label" style={{color:m.dark?'#f0ede8':'#1a1a18'}}>{label}</span>
            <span style={{color:m.textMuted}}>›</span>
          </div>
        ))}
        <div className="phone-card-foot">
          <span style={{color:m.textMuted,fontSize:10,letterSpacing:'0.1em',textTransform:'uppercase'}}>md|studios</span>
          <div className="phone-qr" style={{border:`1px solid ${m.linkBorder}`}}>⊞</div>
        </div>
      </div>
    </div>
  )
}

function MoodSelector({ mood, setMood }) {
  return (
    <div className="mood-selector card">
      <p className="kicker" style={{marginBottom:12}}>Mood della card</p>
      <div className="mood-grid">
        {MOODS.map(m=>(
          <button key={m.id} className={`mood-btn${mood===m.id?' active':''}`} onClick={()=>setMood(m.id)}>
            <span className="mood-icon">{m.icon}</span>
            <span className="mood-label">{m.label}</span>
            <span className="mood-sub">{m.sub}</span>
          </button>
        ))}
      </div>
      <div className="mood-desc">
        <strong>{MOODS.find(m=>m.id===mood)?.label}</strong>
        <p>{MOOD_DESC[mood]}</p>
      </div>
    </div>
  )
}

function CardStudio({ selectedCard }) {
  const [mood, setMood] = useState('lusso')
  const tools = ['Profilo','Logo','Contatti','Link','PDF','Video','Modulo','QR']
  return (
    <div className="grid editor-grid">
      <section className="card">
        <p className="kicker">Strumenti</p>
        <div className="tool-list">{tools.map(t=><button key={t}>+ {t}</button>)}</div>
      </section>
      <section className="card">
        <div className="section-title">
          <div><p className="kicker">Canvas guidato</p><h2>Scrivania creativa</h2></div>
          <button className="btn primary">Salva</button>
        </div>
        <div className="canvas">
          <div className="business-card">
            <div className="profile-row">
              <div style={{display:'flex',alignItems:'center',gap:20}}>
                <div className="avatar"/>
                <div><h2>{selectedCard.name}</h2><p style={{color:'#aaa'}}>{selectedCard.role}</p><p className="kicker">{selectedCard.company}</p></div>
              </div>
              <div className="qr">QR</div>
            </div>
            <div className="field-grid">
              <div className="field"><small>Telefono</small><span>Campo visibile nella card pubblica</span></div>
              <div className="field"><small>Email</small><span>Campo visibile nella card pubblica</span></div>
              <div className="field"><small>Sito web</small><span>Campo visibile nella card pubblica</span></div>
              <div className="field"><small>Indirizzo</small><span>Campo visibile nella card pubblica</span></div>
            </div>
            <div className="field" style={{marginTop:22}}>
              <small>Area media e documenti</small>
              <span>Brochure, PDF, presentazioni, immagini e video.</span>
            </div>
          </div>
        </div>
      </section>
      <section className="grid" style={{gap:14}}>
        <div className="card" style={{padding:20}}>
          <p className="kicker" style={{marginBottom:10}}>Anteprima live</p>
          <MoodCardPreview card={selectedCard} mood={mood}/>
        </div>
        <MoodSelector mood={mood} setMood={setMood}/>
        <div className="card">
          <p className="kicker">Suggerimenti AI</p>
          <p style={{color:'#aaa',lineHeight:1.7,fontSize:14}}>Allinea il logo con la foto profilo. Riduci i colori a due tonalità principali. Porta la CTA sopra il QR code.</p>
        </div>
      </section>
    </div>
  )
}

function TeamAdmin() {
  const users = [['Marco Rossi','Sales','Attiva'],['Laura Bianchi','HR','Attiva'],['Gianni Verdi','Tecnico','Bozza'],['Cliente Studio','Revisione','In attesa']]
  return (
    <div className="grid">
      <section className="card">
        <div className="section-title">
          <div><p className="kicker">Company Workspace</p><h2>Gestione team e card aziendali</h2></div>
          <button className="btn primary">Importa CSV</button>
        </div>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Nome</th><th>Ruolo</th><th>Card</th><th>Azione</th></tr></thead>
            <tbody>{users.map(([name,role,status])=><tr key={name}><td>{name}</td><td>{role}</td><td><span className="pill">{status}</span></td><td>Modifica</td></tr>)}</tbody>
          </table>
        </div>
      </section>
      <section className="grid cards-grid">
        <div className="card"><h3>Brand Kit</h3><p style={{color:'#aaa'}}>Logo, colori, font e regole visive.</p></div>
        <div className="card"><h3>Template bloccati</h3><p style={{color:'#aaa'}}>L'azienda decide cosa si può modificare.</p></div>
        <div className="card"><h3>Workspace clienti</h3><p style={{color:'#aaa'}}>Per agenzie e studi grafici multi-brand.</p></div>
      </section>
    </div>
  )
}

function Plans() {
  const plans = [
    ['Free','0€',['1 card attiva','Template base','QR code','Link pubblico','Modulo semplice']],
    ['Business','19€',['Fino a 50 card','Team e ruoli','Brand kit','PDF e brochure','Report base']],
    ['Premium','49€',['Workspace avanzati','White label','AI design assistant','Quiz avanzati','CRM e automazioni']],
  ]
  const rows = [['Numero card','1','50','illimitate*'],['Template','Base','Aziendali','Bloccabili e white label'],['Team','—','Ruoli base','Permessi avanzati'],['Media','Foto/logo','PDF, brochure, video','Library multi-cliente'],['Moduli','Semplici','Lead e feedback','Quiz logici avanzati'],['Analytics','Visite','Click e report','Funnel e conversioni'],['Integrazioni','—','Export CSV','CRM, email, calendario, API']]
  return (
    <div className="grid">
      <section className="grid plan-grid">
        {plans.map(([name,price,features])=>(
          <div key={name} className={`card plan ${name==='Business'?'highlighted':''}`}>
            <span className="pill">{name==='Business'?'Consigliato':'Piano'}</span>
            <h2>{name}</h2><p className="price">{price}</p>
            <ul>{features.map(f=><li key={f}>{f}</li>)}</ul>
            <button className="btn primary" style={{width:'100%'}}>Seleziona</button>
          </div>
        ))}
      </section>
      <section className="card">
        <h2>Feature map</h2>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Funzione</th><th>Free</th><th>Business</th><th>Premium</th></tr></thead>
            <tbody>{rows.map(r=><tr key={r[0]}>{r.map(c=><td key={c}>{c}</td>)}</tr>)}</tbody>
          </table>
        </div>
      </section>
    </div>
  )
}

function Roadmap() {
  const items = [['01','MVP vendibile','Card, QR code, link pubblico, template eleganti, cloud e anteprima mobile.'],['02','Business base','Team, template aziendali, brand kit, ruoli, media library e report.'],['03','Scrivania creativa','Editor guidato, canvas modulare, anteprima responsive, blocchi media e moduli.'],['04','Premium e agenzie','Workspace clienti, white label, permessi avanzati, analytics e automazioni.']]
  return (
    <section className="card">
      <p className="kicker">Roadmap evolutiva</p><h2>Costruire senza perdersi</h2>
      <div className="grid roadmap" style={{marginTop:28}}>
        {items.map(([step,title,text])=><div className="roadmap-item" key={step}><small>Step {step}</small><h3>{title}</h3><p>{text}</p></div>)}
      </div>
      <div className="card" style={{marginTop:28,background:'rgba(216,197,154,0.1)',borderColor:'rgba(216,197,154,0.35)'}}>
        <h3>Regola dura</h3>
        <p style={{color:'#ddd',lineHeight:1.7}}>Non si parte dalle app native, dall'AI o dal CRM. Si parte da una card splendida, pubblicabile, condivisibile e aggiornabile. Solo dopo si scala.</p>
      </div>
    </section>
  )
}

export default function App() {
  const [section, setSection] = useState('Dashboard')
  const [selectedCard, setSelectedCard] = useState(cardsData[0])
  const content = useMemo(() => {
    if (section==='Dashboard') return <Dashboard setSelectedCard={setSelectedCard} setSection={setSection}/>
    if (section==='Card Studio') return <CardStudio selectedCard={selectedCard}/>
    if (section==='Team Admin') return <TeamAdmin/>
    if (section==='Piani') return <Plans/>
    if (section==='Roadmap') return <Roadmap/>
    return null
  }, [section, selectedCard])
  return (
    <main className="app-shell">
      <div className="layout">
        <Sidebar section={section} setSection={setSection}/>
        <div className="main">
          <Header section={section}/>
          <MobileTabs section={section} setSection={setSection}/>
          <div className="content">{content}</div>
        </div>
      </div>
    </main>
  )
}

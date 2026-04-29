import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import { Home, CreditCard, Smartphone, QrCode, Share2, Wallet, BarChart3, Palette, ContactRound, Settings, Menu, X } from 'lucide-react'
import './style.css'

const baseCard = {
  name: 'myVeicolo.net',
  claim: 'Il tuo garage digitale',
  headline: 'Il cuore intelligente del tuo garage.',
  description: 'Tieni sotto controllo costi, scadenze, manutenzioni e consumi dei tuoi veicoli in un unico spazio digitale.',
  url: 'https://myveicolo.net',
  email: 'myveicolonet@gmail.com',
  phone: '+39 328 717 9900',
  accent: '#00E5FF',
  type: 'Prodotto digitale',
  status: 'Pubblica',
  updated: '28 Apr 2026',
  features: [
    ['Costi', 'Spese, manutenzioni, carburante, rate e leasing sempre sotto controllo.'],
    ['Scadenze', 'Assicurazione, bollo, revisione e collaudi in un’unica vista.'],
    ['Consumi', 'Analisi chiara dei consumi anche per benzina, diesel, GPL, metano, ibridi ed elettrici.']
  ],
  audience: ['Famiglie con più veicoli', 'Professionisti', 'Appassionati auto e moto', 'Piccole flotte']
}

const nav = [
  ['home','Home',Home], ['cards','Cards',CreditCard], ['editor','Editor',Smartphone], ['share','QR / Share',QrCode],
  ['public','Public Card',Share2], ['wallet','Wallet',Wallet], ['analytics','Analytics',BarChart3],
  ['branding','Branding',Palette], ['contacts','Contacts',ContactRound], ['settings','Settings',Settings]
]

function Sidebar({active,setActive,open,setOpen,card}) {
  return <>
    <aside className={`sidebar ${open?'is-open':''}`}>
      <button className="mobile-close" onClick={()=>setOpen(false)}><X size={20}/></button>
      <div className="brand-row"><div className="brand-mark">md</div><div><strong>md|studios</strong><span>Card Creator</span></div></div>
      <nav className="nav">{nav.map(([key,label,Icon]) => <button key={key} className={`nav-item ${active===key?'active':''}`} onClick={()=>{setActive(key);setOpen(false)}}><Icon size={18}/><span>{label}</span></button>)}</nav>
      <div className="sidebar-card"><small>Prima demo reale</small><strong>{card.name}</strong><span>{card.status} · {card.type}</span></div>
    </aside>
    {open && <button className="overlay" onClick={()=>setOpen(false)} aria-label="Chiudi menu" />}
  </>
}

function PhonePreview({card}) {
  return <section className="phone-panel">
    <div className="phone-label"><span>Anteprima smartphone</span><strong>{card.name}</strong></div>
    <div className="phone-shell"><div className="phone-card">
      <div className="phone-top"><div className="mv-logo">MV</div><span className="beta">BETA</span></div>
      <p className="claim">{card.claim}</p><h2>{card.headline}</h2><p className="phone-desc">{card.description}</p>
      <div className="phone-actions"><a href={card.url} target="_blank" rel="noreferrer" className="cyan-btn">Visita il sito</a><a href={`https://wa.me/${card.phone.replace(/\D/g,'')}`} target="_blank" rel="noreferrer" className="dark-btn">WhatsApp</a></div>
      <div className="feature-stack">{card.features.map(([t,d])=><article key={t}><strong>{t}</strong><p>{d}</p></article>)}</div>
    </div></div>
  </section>
}

function HomePage({setActive,card}) {
  return <div className="page">
    <section className="hero"><div><span className="eyebrow">MVP 0.2 · Prototipo vendibile</span><h1>Digital card premium, costruite come mini siti personali.</h1><p>Una piattaforma semplice, elegante e scalabile per creare card digitali con identità forte, QR code, link pubblico e anteprima smartphone.</p><div className="hero-actions"><button onClick={()=>setActive('editor')}>Modifica card demo</button><button className="secondary" onClick={()=>setActive('share')}>Vedi QR / Share</button></div></div><div className="hero-chip"><small>Card attiva</small><strong>{card.name}</strong><span>{card.headline}</span></div></section>
    <section className="quick-grid"><article><span>01</span><h3>Crea</h3><p>Parti da una card elegante già pronta per essere mostrata.</p></article><article><span>02</span><h3>Personalizza</h3><p>Adatta testi, identità, colore accento, contatti e stile.</p></article><article><span>03</span><h3>Condividi</h3><p>Usa link pubblico, QR code, email, WhatsApp e futura integrazione Wallet.</p></article></section>
    <section className="logic-card"><div><span className="eyebrow">La logica di partenza</span><h2>Prima il prodotto visibile. Dopo database e login.</h2></div><p>Questa versione non usa ancora Supabase: serve a validare struttura, grafica e valore commerciale senza complicazioni tecniche. Dopo l’approvazione, collegheremo utenti, database e salvataggio reale.</p></section>
  </div>
}

function CardsPage({card,setActive}) {
  return <div className="page"><section className="panel"><span className="eyebrow">Cards</span><div className="page-head"><div><h1>Le tue digital card</h1><p>Una prima card reale per validare il prodotto e farlo vedere.</p></div><button onClick={()=>setActive('editor')}>Nuova card · coming soon</button></div>
    <article className="card-row"><div className="mv-logo light">MV</div><div className="card-row-main"><strong>{card.name}</strong><span>{card.headline}</span></div><div className="card-meta"><small>Stato</small><b>{card.status}</b></div><div className="card-meta"><small>Tipo</small><b>{card.type}</b></div><div className="card-meta"><small>Aggiornata</small><b>{card.updated}</b></div></article>
    <div className="action-grid"><button onClick={()=>setActive('editor')}>Modifica</button><button className="secondary" onClick={()=>setActive('share')}>QR / Share</button><button className="secondary" onClick={()=>setActive('public')}>Apri demo</button></div>
  </section></div>
}

function EditorPage({card,setCard,setActive}) {
  const update=(f,v)=>setCard({...card,[f]:v})
  return <div className="page"><section className="panel"><span className="eyebrow">Editor</span><div className="page-head"><div><h1>Modifica la card demo</h1><p>Dati modificabili a video. Il salvataggio reale arriverà con Supabase.</p></div><div className="mini-actions"><button className="secondary" onClick={()=>setActive('public')}>Anteprima</button><button>Pubblica · demo</button></div></div>
    <div className="editor-section"><h3>Identità</h3><div className="form-grid"><label>Nome card<input value={card.name} onChange={e=>update('name',e.target.value)}/></label><label>Claim<input value={card.claim} onChange={e=>update('claim',e.target.value)}/></label></div></div>
    <div className="editor-section"><h3>Hero pubblico</h3><div className="form-grid"><label>Headline<input value={card.headline} onChange={e=>update('headline',e.target.value)}/></label><label>Descrizione<textarea value={card.description} onChange={e=>update('description',e.target.value)}/></label></div></div>
    <div className="editor-section"><h3>Contatti</h3><div className="form-grid"><label>Sito web<input value={card.url} onChange={e=>update('url',e.target.value)}/></label><label>Email<input value={card.email} onChange={e=>update('email',e.target.value)}/></label><label>Telefono / WhatsApp<input value={card.phone} onChange={e=>update('phone',e.target.value)}/></label><label>Colore accento<input type="color" value={card.accent} onChange={e=>update('accent',e.target.value)}/></label></div></div>
  </section></div>
}

function SharePage({card,setActive}) {
  const qr=`https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(card.url)}`
  const whatsapp=`https://wa.me/${card.phone.replace(/\D/g,'')}?text=${encodeURIComponent('Ti condivido myVeicolo.net: '+card.url)}`
  const mail=`mailto:${card.email}?subject=${encodeURIComponent(card.name)}&body=${encodeURIComponent(card.headline+'\n'+card.url)}`
  return <div className="page"><section className="panel share-panel"><span className="eyebrow">QR / Share</span><div className="page-head"><div><h1>Condividi la card</h1><p>Link pubblico, QR code e pulsanti rapidi per inviare la card.</p></div><span className="status-pill">Link pubblico attivo</span></div>
    <div className="share-layout"><div className="qr-card"><img src={qr} alt="QR code myVeicolo"/><strong>QR pubblico</strong><span>{card.url}</span></div><div className="share-info"><label>Link pubblico</label><div className="url-box">{card.url}</div><div className="share-buttons"><button onClick={()=>navigator.clipboard?.writeText(card.url)}>Copia link</button><a className="button secondary" href={mail}>Invia email</a><a className="button secondary" href={whatsapp} target="_blank" rel="noreferrer">WhatsApp</a><button className="secondary" onClick={()=>setActive('public')}>Apri card</button></div><p className="helper">Consiglio: usa questa sezione per mandare la demo ad amici e colleghi.</p></div></div>
  </section></div>
}

function PublicCard({card}) {
  return <div className="public-wrap"><main className="public-card"><header className="public-hero"><div className="phone-top"><div className="mv-logo">MV</div><span className="beta">BETA</span></div><span>{card.claim}</span><h1>{card.headline}</h1><p>{card.description}</p><div className="phone-actions"><a href={card.url} target="_blank" rel="noreferrer" className="cyan-btn">Visita il sito</a><a href={`https://wa.me/${card.phone.replace(/\D/g,'')}`} target="_blank" rel="noreferrer" className="dark-btn">WhatsApp</a></div></header>
    <section className="public-section"><h2>Funzioni principali</h2>{card.features.map(([t,d])=><article key={t}><strong>{t}</strong><p>{d}</p></article>)}</section>
    <section className="public-section"><h2>Utile per</h2><div className="tag-list">{card.audience.map(i=><span key={i}>{i}</span>)}</div></section>
    <footer className="public-footer"><a href={`mailto:${card.email}`}>{card.email}</a><a href={card.url} target="_blank" rel="noreferrer">{card.url}</a></footer></main></div>
}

const roadmap = { wallet:['Apple Wallet pass','Google Wallet pass','QR offline','Fase 2 dopo database'], analytics:['Visite card','Click sui pulsanti','Salvataggi contatto','Report mensile'], branding:['Colori globali','Logo cliente','Template premium','Brand kit'], contacts:['Lead raccolti','Export contatti','Tag e note','Integrazioni CRM'], settings:['Profilo account','Dominio custom','Lingua inglese','Privacy e termini'] }
function ComingSoon({title}) {
  const items=roadmap[title.toLowerCase()]||['Funzione prevista','Roadmap prodotto','Fase successiva']
  return <div className="page"><section className="panel coming"><span className="eyebrow">Coming soon</span><h1>{title}</h1><p>Questa area sarà attivata dopo la validazione del prototipo e l’integrazione con database, login e salvataggio reale.</p><div className="roadmap-grid">{items.map((item,index)=><article key={item}><span>{String(index+1).padStart(2,'0')}</span><strong>{item}</strong></article>)}</div></section></div>
}

function renderPage(active, props) {
  if(active==='home') return <HomePage {...props}/>
  if(active==='cards') return <CardsPage {...props}/>
  if(active==='editor') return <EditorPage {...props}/>
  if(active==='share') return <SharePage {...props}/>
  if(active==='public') return <PublicCard card={props.card}/>
  if(active==='wallet') return <ComingSoon title="Wallet"/>
  if(active==='analytics') return <ComingSoon title="Analytics"/>
  if(active==='branding') return <ComingSoon title="Branding"/>
  if(active==='contacts') return <ComingSoon title="Contacts"/>
  return <ComingSoon title="Settings"/>
}

function App() {
  const [active,setActive]=useState('home')
  const [menuOpen,setMenuOpen]=useState(false)
  const [card,setCard]=useState(baseCard)
  const isPublic=active==='public'
  return <div className={`app ${isPublic?'public-mode':''}`}>
    {!isPublic && <Sidebar active={active} setActive={setActive} open={menuOpen} setOpen={setMenuOpen} card={card}/>}
    <main className="main">
      {!isPublic && <header className="topbar"><button className="menu-button" onClick={()=>setMenuOpen(true)}><Menu size={22}/></button><div><span className="eyebrow">md|studios</span><h2>Card Creator</h2></div><button className="secondary open-public" onClick={()=>setActive('public')}>Apri demo pubblica</button></header>}
      <div className={isPublic?'public-only':'workspace'}><div className="content">{renderPage(active,{card,setCard,setActive})}</div>{!isPublic && <PhonePreview card={card}/>}</div>
    </main>
  </div>
}

createRoot(document.getElementById('root')).render(<App />)

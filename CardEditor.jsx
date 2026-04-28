import { BarChart3, BriefcaseBusiness, Contact, CreditCard, Home, Palette, QrCode, Settings, Share2, Smartphone } from 'lucide-react';

const navItems = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'cards', label: 'Cards', icon: CreditCard },
  { id: 'editor', label: 'Editor', icon: Smartphone },
  { id: 'share', label: 'QR / Share', icon: QrCode },
  { id: 'public', label: 'Public Card', icon: Share2 },
  { id: 'wallet', label: 'Wallet', icon: BriefcaseBusiness },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'branding', label: 'Branding', icon: Palette },
  { id: 'contacts', label: 'Contacts', icon: Contact },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export default function Sidebar({ activePage, setActivePage }) {
  return (
    <aside className="sidebar">
      <div className="brand-block">
        <div className="brand-mark">md</div>
        <div>
          <strong>md|studios</strong>
          <span>Card Creator</span>
        </div>
      </div>

      <nav className="nav-list">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button key={item.id} className={`nav-item ${activePage === item.id ? 'active' : ''}`} onClick={() => setActivePage(item.id)}>
              <Icon size={18} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="sidebar-note">
        <p>Prima demo reale</p>
        <strong>myVeicolo.net</strong>
      </div>
    </aside>
  );
}

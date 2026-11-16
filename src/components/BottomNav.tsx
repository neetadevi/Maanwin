import { Home, Gift, Share2, Wallet, User } from 'lucide-react';

interface BottomNavProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  onOpenAuth: (mode: 'login' | 'signup') => void;
  isLoggedIn: boolean;
}

export function BottomNav({ activeTab, onSelectTab, onOpenAuth, isLoggedIn }: BottomNavProps) {
  const tabs = [
    { key: 'home', label: 'Home', icon: Home },
    { key: 'activity', label: 'Activity', icon: Gift },
    { key: 'promotion', label: 'Promotion', icon: Share2 },
    { key: 'wallet', label: 'Wallet', icon: Wallet },
    { key: 'mine', label: 'Mine', icon: User }
  ];

  const handleTabClick = (key: string) => {
    if ((key === 'wallet' || key === 'mine') && !isLoggedIn) {
      onOpenAuth('login');
      return;
    }
    onSelectTab(key);
  };

  return (
    <nav className="bottom-nav-bar">
      <div className="bottom-nav-inner">
        {tabs.map((tab) => {
          const IconComponent = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              className={`bottom-nav-item ${isActive ? 'active' : ''}`}
              onClick={() => handleTabClick(tab.key)}
            >
              <div className="tab-icon-wrap">
                <IconComponent size={20} />
              </div>
              <span className="tab-label">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

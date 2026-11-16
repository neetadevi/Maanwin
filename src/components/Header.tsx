import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getAssetUrl } from '../utils/assetUrl';
import { Download, Globe, Wallet, User as UserIcon, LogIn, UserPlus } from 'lucide-react';

interface HeaderProps {
  onOpenAuth: (mode: 'login' | 'signup') => void;
  lang: 'en' | 'hi';
  onToggleLang: () => void;
}

export function Header({ onOpenAuth, lang, onToggleLang }: HeaderProps) {
  const { user } = useAuth();
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  return (
    <header className="site-header">
      <div className="header-inner">
        {/* Brand Logo */}
        <div className="logo-container">
          <img
            src={getAssetUrl('images/logo.webp')}
            alt="Maanwin"
            className="brand-logo"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = 'https://maanwin2.com/img/6015/other/083305135-140407-file_20260919083305130.webp';
            }}
          />
        </div>

        {/* Action Controls */}
        <div className="header-actions">
          {/* Language Switch */}
          <button
            type="button"
            className="header-icon-btn lang-btn"
            onClick={onToggleLang}
            title={lang === 'en' ? 'Switch to Hindi' : 'Switch to English'}
          >
            <Globe size={18} />
            <span className="lang-text">{lang === 'en' ? 'EN' : 'हि'}</span>
          </button>

          {/* Download App */}
          <a
            href="https://maanwin2.com"
            target="_blank"
            rel="noopener noreferrer"
            className="header-icon-btn download-btn"
            title="Download App"
          >
            <Download size={18} />
            <span className="btn-label-desktop">App</span>
          </a>

          {/* User state */}
          {user ? (
            <div className="user-logged-box">
              <div className="balance-pill">
                <Wallet size={16} className="wallet-icon" />
                <span className="currency">₹</span>
                <span className="balance-amt">0.00</span>
              </div>

              <div className="user-profile-btn" onClick={() => setShowUserDropdown(!showUserDropdown)}>
                <div className="avatar-circle">
                  <UserIcon size={18} />
                </div>
              </div>

              {/* Deposit Quick Button */}
              <button
                type="button"
                className="btn-deposit-header"
                onClick={() => alert('Deposit gateway: Please contact 24/7 Support or WhatsApp')}
              >
                Deposit
              </button>
            </div>
          ) : (
            <div className="guest-actions">
              <button
                type="button"
                className="btn-header-login"
                onClick={() => onOpenAuth('login')}
              >
                <LogIn size={15} />
                <span>Log In</span>
              </button>
              <button
                type="button"
                className="btn-header-register"
                onClick={() => onOpenAuth('signup')}
              >
                <UserPlus size={15} />
                <span>Register</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

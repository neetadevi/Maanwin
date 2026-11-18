import { useAuth } from '../context/AuthContext';
import { useAdminConfig } from '../context/AdminConfigContext';
import { getAssetUrl } from '../utils/assetUrl';
import { User as UserIcon, RotateCw, Headset } from 'lucide-react';

interface HeaderProps {
  onOpenAuth: (mode: 'login' | 'signup') => void;
  lang: 'en' | 'hi';
  onToggleLang: () => void;
  onNavigateTab?: (tab: string) => void;
  onOpenBell?: () => void;
}

export function Header({ onOpenAuth, lang, onToggleLang, onNavigateTab, onOpenBell }: HeaderProps) {
  const { user } = useAuth();
  const { getUserBalance, config } = useAdminConfig();

  const userKey = user?.id || user?.user_metadata?.phone || user?.email;
  const balance = getUserBalance(userKey) || getUserBalance(user?.email) || getUserBalance(user?.id) || 0;

  return (
    <header className="s11-header">
      {/* Brand Logo */}
      <div
        className="s11-header__logo"
        onClick={() => onNavigateTab && onNavigateTab('home')}
      >
        <img
          src={getAssetUrl('img/6015/other/083305135-140407-file_20260919083305130.webp')}
          alt="Maanwin"
          fetchPriority="high"
          loading="eager"
          decoding="async"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src =
              'https://maanwin2.com/img/6015/other/083305135-140407-file_20260919083305130.webp';
          }}
        />
      </div>

      {/* Header Actions */}
      <div className="s11-header__actions">
        {/* Language switch */}
        <button
          type="button"
          onClick={onToggleLang}
          className="s11-header__lang-btn"
          aria-label="Toggle language"
        >
          {lang === 'en' ? 'EN' : 'हि'}
        </button>

        {/* Bell Notification */}
        <button
          className="s11-header__bell"
          type="button"
          aria-label="Message"
          onClick={() => onOpenBell ? onOpenBell() : alert(lang === 'en' ? 'No new notifications' : 'कोई नई सूचना नहीं है')}
        >
          <img
            className="s11-header__bell-icon"
            src={getAssetUrl('images/s11_icon_bell-BqXm-Mh1.svg')}
            alt=""
            loading="eager"
            decoding="async"
          />
        </button>

        {/* Headset / Customer Support Icon matching screenshot */}
        <a
          href={config.telegramUrl || '#'}
          target="_blank"
          rel="noopener noreferrer"
          className="s11-header__support-icon"
          aria-label="Customer Support"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '0.72rem',
            height: '0.72rem',
            color: '#f59e0b',
            textDecoration: 'none'
          }}
        >
          <Headset size={20} />
        </a>

        {/* Guest vs Logged In Actions */}
        {!user ? (
          <div className="s11-header__auth-btns">
            <button
              type="button"
              className="s11-header__btn-login"
              onClick={() => onOpenAuth('login')}
            >
              Log in
            </button>
            <button
              type="button"
              className="s11-header__btn-register"
              onClick={() => onOpenAuth('signup')}
            >
              Register
            </button>
          </div>
        ) : (
          <div className="s11-header__user-bar">
            {/* Wallet Balance Pill with reload */}
            <div
              className="s11-header__balance-pill"
              onClick={() => onNavigateTab && onNavigateTab('wallet')}
              title="Click to view Wallet"
            >
              <span className="cur-sym">₹</span>
              <span className="balance-txt">
                {balance.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
              <RotateCw size={12} className="balance-reload-icon" />
            </div>

            {/* Quick Deposit Button */}
            <button
              type="button"
              className="s11-header__btn-deposit"
              onClick={() => onNavigateTab && onNavigateTab('deposit')}
            >
              Deposit
            </button>

            {/* Quick Withdraw Button */}
            <button
              type="button"
              className="s11-header__btn-withdraw"
              onClick={() => onNavigateTab && onNavigateTab('withdraw')}
            >
              Withdraw
            </button>

            {/* Profile Avatar Icon */}
            <button
              type="button"
              className="s11-header__avatar-btn"
              onClick={() => onNavigateTab && onNavigateTab('mine')}
              title="Personal Center"
            >
              <UserIcon size={16} />
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

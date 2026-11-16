import { useAuth } from '../context/AuthContext';
import { useAdminConfig } from '../context/AdminConfigContext';
import { getAssetUrl } from '../utils/assetUrl';

interface HeaderProps {
  onOpenAuth: (mode: 'login' | 'signup') => void;
  lang: 'en' | 'hi';
  onToggleLang: () => void;
  onNavigateTab?: (tab: string) => void;
}

export function Header({ onOpenAuth, lang, onToggleLang, onNavigateTab }: HeaderProps) {
  const { user } = useAuth();
  const { getUserBalance } = useAdminConfig();

  const userKey = user?.id || user?.user_metadata?.phone || user?.email;
  const balance = getUserBalance(userKey) || getUserBalance(user?.email) || getUserBalance(user?.id) || 0;

  return (
    <header className="s11-header">
      {/* Brand Logo - exact downloaded live logo */}
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
          style={{
            background: 'rgba(255, 255, 255, 0.08)',
            border: 'none',
            borderRadius: '0.2rem',
            padding: '0.1rem 0.2rem',
            color: '#fff',
            fontSize: '0.28rem',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          {lang === 'en' ? 'EN' : 'हि'}
        </button>

        {/* Bell Notification */}
        <button
          className="s11-header__bell"
          type="button"
          aria-label="Message"
          onClick={() => alert(lang === 'en' ? 'No new notifications' : 'कोई नई सूचना नहीं है')}
        >
          <img
            className="s11-header__bell-icon"
            src={getAssetUrl('images/s11_icon_bell-BqXm-Mh1.svg')}
            alt=""
            loading="eager"
            decoding="async"
          />
        </button>

        {/* Guest or User actions */}
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
          <div
            onClick={() => onNavigateTab && onNavigateTab('mine')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.16rem',
              cursor: 'pointer',
              background: 'rgba(255,255,255,0.06)',
              padding: '0.08rem 0.2rem',
              borderRadius: '0.3rem'
            }}
          >
            <span style={{ fontSize: '0.32rem', fontWeight: 700, color: 'var(--main_color, #F97316)' }}>
              ₹ {balance.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
        )}
      </div>
    </header>
  );
}

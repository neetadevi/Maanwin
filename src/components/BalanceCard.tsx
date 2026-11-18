import { useAuth } from '../context/AuthContext';
import { useAdminConfig } from '../context/AdminConfigContext';
import { getAssetUrl } from '../utils/assetUrl';

interface BalanceCardProps {
  onOpenAuth: (mode: 'login' | 'signup') => void;
  onNavigateTab: (tab: string) => void;
}

export function BalanceCard({ onOpenAuth, onNavigateTab }: BalanceCardProps) {
  const { user } = useAuth();
  const { getUserBalance } = useAdminConfig();

  const userKey = user?.id || user?.user_metadata?.phone || user?.email;
  const balance = getUserBalance(userKey) || getUserBalance(user?.email) || getUserBalance(user?.id) || 0;

  const formatted = balance.toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  const parts = formatted.split('.');
  const mainPart = parts[0];
  const subPart = parts[1] ? `.${parts[1]}` : '.00';

  const memberName = user?.user_metadata?.phone || user?.email?.split('@')[0] || 'Top Member';
  const memberUid = user?.id ? user.id.slice(0, 5) : '60867';

  return (
    <section className="s11-balance side-distance s11-home__balance">
      <div className="s11-balance__info">
        <div className={`s11-balance__avatar ${!user ? 'is-guest' : ''}`}>
          <img
            src={getAssetUrl('images/s11_avatar_guest-BGtBCBp9.svg')}
            alt=""
            loading="eager"
            decoding="async"
          />
        </div>
        <div className="s11-balance__text">
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span className="s11-balance__label" style={{ fontWeight: 700, fontSize: '0.36rem', color: '#fff' }}>
              {user ? memberName : 'Top Member'}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
            <span style={{ fontSize: '0.28rem', color: '#8898aa' }}>UID: {memberUid}</span>
            <span style={{
              background: 'linear-gradient(90deg, #ff8c00, #ff5722)',
              color: '#fff',
              fontSize: '0.22rem',
              fontWeight: 700,
              padding: '1px 6px',
              borderRadius: '999px',
              letterSpacing: '0.5px'
            }}>
              App VIP
            </span>
          </div>
        </div>
      </div>

      <div className="s11-balance__actions">
        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ textAlign: 'right', marginRight: '4px' }}>
              <div style={{ fontSize: '0.24rem', color: '#8898aa' }}>Balance</div>
              <div style={{ fontWeight: 700, color: '#f59e0b', fontSize: '0.34rem' }}>₹{mainPart}{subPart}</div>
            </div>
            <button
              type="button"
              className="s11-balance__btn s11-balance__btn--primary"
              onClick={() => onNavigateTab('deposit')}
              style={{ width: 'auto', padding: '0 0.4rem', height: '0.8rem' }}
            >
              Deposit
            </button>
          </div>
        ) : (
          <button
            type="button"
            className="s11-balance__btn s11-balance__btn--secondary"
            onClick={() => onOpenAuth('login')}
            style={{ minWidth: '2.2rem', height: '0.8rem', background: '#25354e', color: '#fff', border: '1px solid #374b6b' }}
          >
            Login
          </button>
        )}
      </div>
    </section>
  );
}

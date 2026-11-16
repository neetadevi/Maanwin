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
          <p className="s11-balance__label">Your Balance</p>
          <p className="s11-balance__amount">
            {user ? (
              <>
                <span className="s11-balance__amount-main">₹ {mainPart}</span>
                <span className="s11-balance__amount-sub">{subPart}</span>
              </>
            ) : (
              <span className="s11-balance__amount-main">---</span>
            )}
          </p>
        </div>
      </div>

      <div className="s11-balance__actions">
        {user ? (
          <>
            <button
              type="button"
              className="s11-balance__btn s11-balance__btn--primary"
              onClick={() => onNavigateTab('wallet')}
            >
              Deposit
            </button>
            <button
              type="button"
              className="s11-balance__btn s11-balance__btn--secondary"
              onClick={() => onNavigateTab('wallet')}
            >
              Withdraw
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              className="s11-balance__btn s11-balance__btn--primary"
              onClick={() => onOpenAuth('signup')}
            >
              Register
            </button>
            <button
              type="button"
              className="s11-balance__btn s11-balance__btn--secondary"
              onClick={() => onOpenAuth('login')}
            >
              Login
            </button>
          </>
        )}
      </div>
    </section>
  );
}

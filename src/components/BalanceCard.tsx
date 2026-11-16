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

  const handleDeposit = () => {
    if (!user) {
      onOpenAuth('login');
    } else {
      onNavigateTab('wallet');
    }
  };

  const handleWithdraw = () => {
    if (!user) {
      onOpenAuth('login');
    } else {
      onNavigateTab('wallet');
    }
  };

  return (
    <section className="s11-balance">
      <div className="s11-balance__info">
        <div className={`s11-balance__avatar ${!user ? 'is-guest' : ''}`}>
          <img
            src={getAssetUrl('images/s11_avatar_guest-BGtBCBp9.svg')}
            alt="Avatar"
            loading="eager"
          />
        </div>
        <div className="s11-balance__text">
          <p className="s11-balance__label">Total Balance</p>
          <div className="s11-balance__amount">
            <span className="s11-balance__amount-main">₹ {user ? mainPart : '0'}</span>
            <span className="s11-balance__amount-sub">{user ? subPart : '.00'}</span>
          </div>
        </div>
      </div>

      <div className="s11-balance__actions">
        <button
          type="button"
          className="s11-balance__btn s11-balance__btn--primary"
          onClick={handleDeposit}
        >
          Deposit
        </button>
        <button
          type="button"
          className="s11-balance__btn s11-balance__btn--secondary"
          onClick={handleWithdraw}
        >
          Withdraw
        </button>
      </div>
    </section>
  );
}


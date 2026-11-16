import { useAuth } from '../context/AuthContext';
import { 
  Gift, 
  Sparkles, 
  Share2, 
  Copy, 
  Wallet, 
  ArrowDownLeft, 
  ArrowUpRight, 
  User, 
  LogOut, 
  ShieldCheck,
  Send,
  MessageCircle
} from 'lucide-react';

interface TabProps {
  onOpenAuth: (mode: 'login' | 'signup') => void;
}

export function ActivityView({ onOpenAuth }: TabProps) {
  const { user } = useAuth();

  const activities = [
    {
      id: 1,
      title: 'First Deposit 100% Cash Bonus',
      desc: 'Deposit ₹500 or more and get 100% instant matching cash bonus up to ₹10,000!',
      reward: 'Up to ₹10,000',
      tag: 'HOT'
    },
    {
      id: 2,
      title: 'Daily Check-in & Cash Rain',
      desc: 'Claim daily login rewards every day at 12:00 PM and 08:00 PM.',
      reward: 'Free ₹50 - ₹500 Daily',
      tag: 'DAILY'
    },
    {
      id: 3,
      title: 'Loss Relief Compensation',
      desc: 'Get up to 10% daily loss rebate credited directly to your gaming wallet.',
      reward: '10% Rebate',
      tag: 'VIP'
    },
    {
      id: 4,
      title: 'Telegram & WhatsApp Community Gift Codes',
      desc: 'Join our official channels for 3x daily red packets and mystery gift codes.',
      reward: 'Daily Mystery Code',
      tag: 'COMMUNITY'
    }
  ];

  return (
    <div className="tab-view-container">
      <div className="tab-header-banner">
        <Gift className="tab-hero-icon" size={32} />
        <h2>Events & Rewards Center</h2>
        <p>Participate in official Maanwin events to earn daily cash and VIP bonuses.</p>
      </div>

      <div className="activity-cards-list">
        {activities.map((act) => (
          <div key={act.id} className="activity-card">
            <div className="act-badge">{act.tag}</div>
            <div className="act-info">
              <h3>{act.title}</h3>
              <p>{act.desc}</p>
              <div className="act-reward-pill">
                <Sparkles size={14} />
                <span>{act.reward}</span>
              </div>
            </div>
            <button
              type="button"
              className="btn-claim-act"
              onClick={() => {
                if (!user) onOpenAuth('login');
                else alert(`Claimed: ${act.title}!`);
              }}
            >
              {user ? 'Participate' : 'Log In to Claim'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export function PromotionView({ onOpenAuth }: TabProps) {
  const { user } = useAuth();
  const inviteCode = user?.id ? user.id.slice(0, 8).toUpperCase() : 'MAANWIN';
  const inviteLink = `${window.location.origin}${window.location.pathname}?r=${inviteCode}`;

  const copyLink = () => {
    navigator.clipboard.writeText(inviteLink);
    alert('Referral link copied to clipboard!');
  };

  return (
    <div className="tab-view-container">
      <div className="tab-header-banner">
        <Share2 className="tab-hero-icon" size={32} />
        <h2>Agent Referral Program</h2>
        <p>Invite friends and earn up to 85% multi-tier lifetime commission!</p>
      </div>

      <div className="promo-stats-grid">
        <div className="promo-stat-box">
          <span className="stat-label">Total Commission</span>
          <span className="stat-val highlight">₹ 0.00</span>
        </div>
        <div className="promo-stat-box">
          <span className="stat-label">Invited Members</span>
          <span className="stat-val">0</span>
        </div>
        <div className="promo-stat-box">
          <span className="stat-label">Commission Rate</span>
          <span className="stat-val">Up to 85%</span>
        </div>
      </div>

      <div className="invite-box-card">
        <h3>Your Exclusive Invitation Link</h3>
        <div className="invite-input-row">
          <input type="text" readOnly value={inviteLink} className="invite-input" />
          <button type="button" className="btn-copy-link" onClick={copyLink}>
            <Copy size={16} />
            <span>Copy</span>
          </button>
        </div>

        <div className="share-btn-row">
          <a
            href={`https://t.me/share/url?url=${encodeURIComponent(inviteLink)}&text=${encodeURIComponent('Join Maanwin and claim ₹500 welcome bonus!')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-share-social telegram"
          >
            <Send size={16} />
            <span>Share on Telegram</span>
          </a>
          <a
            href={`https://api.whatsapp.com/send?text=${encodeURIComponent('Join Maanwin and claim ₹500 welcome bonus! ' + inviteLink)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-share-social whatsapp"
          >
            <MessageCircle size={16} />
            <span>Share on WhatsApp</span>
          </a>
        </div>
      </div>

      {!user && (
        <div className="login-prompt-banner">
          <p>Please log in to view your detailed affiliate dashboard and referral stats.</p>
          <button type="button" className="btn-primary-inline" onClick={() => onOpenAuth('login')}>
            Sign In Now
          </button>
        </div>
      )}
    </div>
  );
}

export function WalletView({ onOpenAuth }: TabProps) {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="tab-view-container">
        <div className="login-prompt-banner large">
          <Wallet size={48} className="hero-wallet-icon" />
          <h2>My Wallet</h2>
          <p>Log in to view your balance, deposit funds, and make instant withdrawals.</p>
          <button type="button" className="btn-primary-inline" onClick={() => onOpenAuth('login')}>
            Log In to Access Wallet
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="tab-view-container">
      <div className="wallet-card-main">
        <div className="wallet-top-info">
          <span className="balance-heading">Total Wallet Balance</span>
          <h1 className="balance-large">₹ 0.00</h1>
        </div>

        <div className="wallet-quick-actions">
          <button
            type="button"
            className="btn-wallet-action deposit"
            onClick={() => alert('Deposit: UPI / IMPS / Bank Transfer. Contact WhatsApp support for payment gateway.')}
          >
            <ArrowDownLeft size={18} />
            <span>Deposit</span>
          </button>
          <button
            type="button"
            className="btn-wallet-action withdraw"
            onClick={() => alert('Withdrawal: Please bind your Bank Account details in Profile first.')}
          >
            <ArrowUpRight size={18} />
            <span>Withdraw</span>
          </button>
        </div>
      </div>

      <div className="payment-channels-card">
        <h3>Supported Payment Methods (24/7 Instant)</h3>
        <div className="channels-grid">
          <div className="channel-pill">UPI / PhonePe / GPay</div>
          <div className="channel-pill">Paytm Wallet</div>
          <div className="channel-pill">IMPS / NEFT Bank Transfer</div>
          <div className="channel-pill">USDT / Crypto</div>
        </div>
      </div>
    </div>
  );
}

export function MineView({ onOpenAuth }: TabProps) {
  const { user, signOut } = useAuth();

  if (!user) {
    return (
      <div className="tab-view-container">
        <div className="login-prompt-banner large">
          <User size={48} className="hero-wallet-icon" />
          <h2>Personal Center</h2>
          <p>Sign in to view your VIP status, betting history, and security settings.</p>
          <button type="button" className="btn-primary-inline" onClick={() => onOpenAuth('login')}>
            Sign In / Register
          </button>
        </div>
      </div>
    );
  }

  const phoneOrEmail = user.user_metadata?.phone || user.email || 'User';
  const fullName = user.user_metadata?.full_name || phoneOrEmail;

  return (
    <div className="tab-view-container">
      <div className="profile-hero-card">
        <div className="profile-avatar-big">
          <User size={36} />
        </div>
        <div className="profile-hero-info">
          <h2>{fullName}</h2>
          <p className="user-id-txt">ID: {user.id.slice(0, 12)}...</p>
          <span className="vip-badge">VIP Level 1</span>
        </div>
      </div>

      <div className="profile-menu-list">
        <div className="menu-item-row" onClick={() => alert('Betting history: No bets placed yet.')}>
          <span>Betting Record</span>
          <ArrowUpRight size={16} />
        </div>
        <div className="menu-item-row" onClick={() => alert('Transactions: No recent deposit/withdrawals.')}>
          <span>Transaction Records</span>
          <ArrowUpRight size={16} />
        </div>
        <div className="menu-item-row" onClick={() => alert('Security: Connected with Supabase 256-bit encryption.')}>
          <span>Security Center</span>
          <ShieldCheck size={16} />
        </div>
        <div className="menu-item-row" onClick={() => window.open('https://t.me/maan_win', '_blank')}>
          <span>24/7 Customer Service</span>
          <Send size={16} />
        </div>
      </div>

      <button type="button" className="btn-logout-mine" onClick={signOut}>
        <LogOut size={16} />
        <span>Log Out</span>
      </button>
    </div>
  );
}

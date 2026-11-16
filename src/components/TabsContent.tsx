import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useAdminConfig } from '../context/AdminConfigContext';
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
  MessageCircle,
  CheckCircle2
} from 'lucide-react';

interface TabProps {
  onOpenAuth: (mode: 'login' | 'signup') => void;
}

export function ActivityView({ onOpenAuth }: TabProps) {
  const { user } = useAuth();
  const { config } = useAdminConfig();

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
                if (!user) {
                  onOpenAuth('login');
                } else if (act.id === 4) {
                  window.open(config.telegramUrl, '_blank');
                } else {
                  alert(`Claimed: ${act.title}!`);
                }
              }}
            >
              {user ? (act.id === 4 ? 'Join Channel' : 'Participate') : 'Log In to Claim'}
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
  const { config, getUserBalance, addWithdrawalRequest, addDepositRequest } = useAdminConfig();

  const [activeAction, setActiveAction] = useState<'none' | 'deposit' | 'withdraw'>('none');

  // Withdrawal form
  const [wthAmount, setWthAmount] = useState('');
  const [bankName, setBankName] = useState('State Bank of India');
  const [accNo, setAccNo] = useState('');
  const [ifsc, setIfsc] = useState('');
  const [wthMsg, setWthMsg] = useState('');

  // Deposit form
  const [depAmount, setDepAmount] = useState('500');
  const [utrNumber, setUtrNumber] = useState('');
  const [depMsg, setDepMsg] = useState('');

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

  const userKey = user.id || user.user_metadata?.phone || user.email || 'user';
  const balance = getUserBalance(userKey) || getUserBalance(user.email) || getUserBalance(user.id) || 0;
  const phone = user.user_metadata?.phone || user.email || 'User';

  const handleWithdrawSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = parseFloat(wthAmount);
    if (isNaN(amt) || amt < config.minWithdrawal) {
      alert(`Minimum withdrawal is ₹${config.minWithdrawal}`);
      return;
    }
    if (amt > config.maxWithdrawal) {
      alert(`Maximum withdrawal is ₹${config.maxWithdrawal}`);
      return;
    }
    if (amt > balance) {
      alert('Insufficient wallet balance!');
      return;
    }

    addWithdrawalRequest({
      userId: user.id,
      phone,
      amount: amt,
      bankName,
      accountNo: accNo,
      ifsc: ifsc.toUpperCase()
    });

    setWthMsg(`Withdrawal request of ₹${amt.toLocaleString('en-IN')} submitted successfully! Admin will approve shortly.`);
    setWthAmount('');
    setAccNo('');
    setIfsc('');
    setTimeout(() => setWthMsg(''), 5000);
  };

  const handleDepositSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = parseFloat(depAmount);
    if (isNaN(amt) || amt < config.minDeposit) {
      alert(`Minimum deposit is ₹${config.minDeposit}`);
      return;
    }
    if (!utrNumber.trim() || utrNumber.trim().length < 6) {
      alert('Please enter a valid 12-digit UPI UTR number');
      return;
    }

    addDepositRequest({
      userId: user.id,
      phone,
      amount: amt,
      utr: utrNumber.trim()
    });

    setDepMsg(`Deposit request of ₹${amt.toLocaleString('en-IN')} submitted with UTR ${utrNumber}! Admin will credit your wallet upon verification.`);
    setUtrNumber('');
    setTimeout(() => setDepMsg(''), 5000);
  };

  return (
    <div className="tab-view-container">
      <div className="wallet-card-main">
        <div className="wallet-top-info">
          <span className="balance-heading">Total Wallet Balance</span>
          <h1 className="balance-large">
            ₹{balance.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </h1>
        </div>

        <div className="wallet-quick-actions">
          <button
            type="button"
            className={`btn-wallet-action deposit ${activeAction === 'deposit' ? 'selected' : ''}`}
            onClick={() => setActiveAction(activeAction === 'deposit' ? 'none' : 'deposit')}
          >
            <ArrowDownLeft size={18} />
            <span>Deposit</span>
          </button>
          <button
            type="button"
            className={`btn-wallet-action withdraw ${activeAction === 'withdraw' ? 'selected' : ''}`}
            onClick={() => setActiveAction(activeAction === 'withdraw' ? 'none' : 'withdraw')}
          >
            <ArrowUpRight size={18} />
            <span>Withdraw</span>
          </button>
        </div>
      </div>

      {/* Deposit Action Drawer */}
      {activeAction === 'deposit' && (
        <div className="action-form-box">
          <h3>Instant UPI Deposit</h3>
          <p className="sub-instruction">Pay via any UPI App (GPay, PhonePe, Paytm) to the official VPA below and enter the 12-digit UTR:</p>

          <div className="upi-vpa-highlight">
            <span className="vpa-lbl">Official UPI ID:</span>
            <strong className="vpa-code">{config.upiId}</strong>
            <button
              type="button"
              className="btn-copy-vpa"
              onClick={() => {
                navigator.clipboard.writeText(config.upiId);
                alert('UPI ID copied!');
              }}
            >
              Copy
            </button>
          </div>

          {depMsg && (
            <div className="wallet-alert success">
              <CheckCircle2 size={16} />
              <span>{depMsg}</span>
            </div>
          )}

          <form onSubmit={handleDepositSubmit} className="wallet-action-form">
            <div className="form-row">
              <label>Amount (₹)</label>
              <input
                type="number"
                required
                min={config.minDeposit}
                value={depAmount}
                onChange={(e) => setDepAmount(e.target.value)}
              />
            </div>
            <div className="form-row">
              <label>12-Digit UTR / Ref Number</label>
              <input
                type="text"
                required
                placeholder="e.g. 431982716281"
                value={utrNumber}
                onChange={(e) => setUtrNumber(e.target.value)}
              />
            </div>
            <button type="submit" className="btn-submit-wallet-action">
              Submit Deposit for Approval
            </button>
          </form>
        </div>
      )}

      {/* Withdraw Action Drawer */}
      {activeAction === 'withdraw' && (
        <div className="action-form-box">
          <h3>Bank Account Withdrawal</h3>
          <p className="sub-instruction">
            Limits: ₹{config.minWithdrawal} - ₹{config.maxWithdrawal.toLocaleString('en-IN')} (24/7 Fast Payout)
          </p>

          {wthMsg && (
            <div className="wallet-alert success">
              <CheckCircle2 size={16} />
              <span>{wthMsg}</span>
            </div>
          )}

          <form onSubmit={handleWithdrawSubmit} className="wallet-action-form">
            <div className="form-row">
              <label>Withdrawal Amount (₹)</label>
              <input
                type="number"
                required
                min={config.minWithdrawal}
                max={config.maxWithdrawal}
                placeholder={`Min ₹${config.minWithdrawal}`}
                value={wthAmount}
                onChange={(e) => setWthAmount(e.target.value)}
              />
            </div>
            <div className="form-row">
              <label>Bank Name</label>
              <input
                type="text"
                required
                placeholder="e.g. State Bank of India, HDFC"
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
              />
            </div>
            <div className="form-row">
              <label>Account Number</label>
              <input
                type="text"
                required
                placeholder="Enter bank account number"
                value={accNo}
                onChange={(e) => setAccNo(e.target.value)}
              />
            </div>
            <div className="form-row">
              <label>IFSC Code</label>
              <input
                type="text"
                required
                placeholder="e.g. SBIN0001234"
                value={ifsc}
                onChange={(e) => setIfsc(e.target.value.toUpperCase())}
              />
            </div>
            <button type="submit" className="btn-submit-wallet-action">
              Request Bank Withdrawal
            </button>
          </form>
        </div>
      )}

      <div className="payment-channels-card">
        <h3>Supported Payment Channels</h3>
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
  const { config, getUserBalance } = useAdminConfig();

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
  const userKey = user.id || user.user_metadata?.phone || user.email;
  const balance = getUserBalance(userKey) || getUserBalance(user.email) || getUserBalance(user.id) || 0;

  return (
    <div className="tab-view-container">
      <div className="profile-hero-card">
        <div className="profile-avatar-big">
          <User size={36} />
        </div>
        <div className="profile-hero-info">
          <h2>{fullName}</h2>
          <p className="user-id-txt">ID: {user.id.slice(0, 12)}...</p>
          <div className="profile-badge-row">
            <span className="vip-badge">VIP Level 1</span>
            <span className="profile-balance-badge">
              ₹{balance.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
        </div>
      </div>

      <div className="profile-menu-list">
        <div className="menu-item-row" onClick={() => alert('Betting history: All fair RNG recorded.')}>
          <span>Betting Record</span>
          <ArrowUpRight size={16} />
        </div>
        <div className="menu-item-row" onClick={() => alert('Transactions: Up to date.')}>
          <span>Transaction Records</span>
          <ArrowUpRight size={16} />
        </div>
        <div className="menu-item-row" onClick={() => alert('Security: Protected by Supabase 256-bit encryption.')}>
          <span>Security Center</span>
          <ShieldCheck size={16} />
        </div>
        <div className="menu-item-row" onClick={() => window.open(config.telegramUrl, '_blank')}>
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

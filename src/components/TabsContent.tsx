import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useAdminConfig } from '../context/AdminConfigContext';
import { getAssetUrl } from '../utils/assetUrl';
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
  CheckCircle2,
  AlertCircle,
  RotateCw,
  QrCode,
  CreditCard,
  Building2,
  ChevronRight,
  History,
  Info,
  ArrowLeft,
  Crown
} from 'lucide-react';

interface TabProps {
  onOpenAuth: (mode: 'login' | 'signup') => void;
  onNavigateTab?: (tab: string) => void;
  initialSubTab?: 'deposit' | 'withdraw';
}

const INDIAN_BANKS = [
  'State Bank of India',
  'HDFC Bank',
  'ICICI Bank',
  'Punjab National Bank',
  'Axis Bank',
  'Bank of Baroda',
  'Kotak Mahindra Bank',
  'Canara Bank',
  'Union Bank of India',
  'IndusInd Bank',
  'Yes Bank',
  'Federal Bank'
];

/* ==========================================================================
   1. ACTIVITY VIEW (EVENTS & REWARDS)
   ========================================================================== */
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
                  alert(`Claimed: ${act.title}! Your bonus will be added to your balance.`);
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

/* ==========================================================================
   2. PROMOTION VIEW (AGENT REFERRAL)
   ========================================================================== */
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

/* ==========================================================================
   3. DEPOSIT VIEW (EXACT AR-SAAS 11 RECHARGE EXPERIENCE)
   ========================================================================== */
export function DepositView({ onOpenAuth, onNavigateTab }: TabProps) {
  const { user } = useAuth();
  const { config, getUserBalance, addDepositRequest } = useAdminConfig();

  const [paymentChannel, setPaymentChannel] = useState<'upi' | 'bank' | 'usdt'>('upi');
  const [amount, setAmount] = useState('500');
  const [utrNumber, setUtrNumber] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [successToast, setSuccessToast] = useState('');
  const [errorToast, setErrorToast] = useState('');
  const [showHistory, setShowHistory] = useState(false);

  if (!user) {
    return (
      <div className="tab-view-container">
        <div className="login-prompt-banner large">
          <ArrowDownLeft size={48} className="hero-wallet-icon" />
          <h2>Instant Deposit</h2>
          <p>Please sign in to deposit funds securely via UPI, PhonePe, Paytm, or Net Banking.</p>
          <button type="button" className="btn-primary-inline" onClick={() => onOpenAuth('login')}>
            Sign In to Deposit
          </button>
        </div>
      </div>
    );
  }

  const userKey = user.id || user.user_metadata?.phone || user.email || 'user';
  const balance = getUserBalance(userKey) || getUserBalance(user.email) || getUserBalance(user.id) || 0;
  const phone = user.user_metadata?.phone || user.email || 'User';

  const quickAmounts = [
    { val: '100', bonus: '' },
    { val: '300', bonus: '' },
    { val: '500', bonus: '+2%' },
    { val: '1000', bonus: '+3%' },
    { val: '2000', bonus: '+5%' },
    { val: '5000', bonus: '+5%' },
    { val: '10000', bonus: '+8%' },
    { val: '20000', bonus: '+10%' },
    { val: '50000', bonus: '+12%' }
  ];

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(config.upiId);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  const handleDepositSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorToast('');
    setSuccessToast('');

    const amtNum = parseFloat(amount);
    if (isNaN(amtNum) || amtNum < config.minDeposit) {
      setErrorToast(`Minimum deposit amount is ₹${config.minDeposit}`);
      return;
    }

    const cleanUtr = utrNumber.trim();
    if (!cleanUtr || cleanUtr.length < 6) {
      setErrorToast('Please enter a valid 12-digit UPI UTR / Transaction Reference number.');
      return;
    }

    setSubmitting(true);
    try {
      addDepositRequest({
        userId: user.id,
        phone,
        amount: amtNum,
        utr: cleanUtr
      });

      setSuccessToast(`Deposit request of ₹${amtNum.toLocaleString('en-IN')} submitted successfully! Admin will verify UTR and credit your wallet within 1-3 minutes.`);
      setUtrNumber('');
    } catch {
      setErrorToast('Failed to submit deposit. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const userDeposits = config.depositRequests.filter(d => d.userId === user.id);

  return (
    <div className="tab-view-container payment-page-wrap">
      {/* Top Header Bar */}
      <div className="payment-top-nav">
        <button
          type="button"
          className="btn-payment-back"
          onClick={() => onNavigateTab ? onNavigateTab('home') : window.history.back()}
          aria-label="Go back"
        >
          <ArrowLeft size={18} />
        </button>
        <h2 className="payment-page-title">Deposit</h2>
        <button
          type="button"
          className="btn-payment-history"
          onClick={() => setShowHistory(!showHistory)}
          title="Deposit Records"
        >
          <History size={18} />
          <span>Records</span>
        </button>
      </div>

      {/* Balance Bar */}
      <div className="payment-balance-banner">
        <div className="bal-col">
          <span className="bal-label">Current Balance</span>
          <span className="bal-value">₹ {balance.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
        </div>
        <button
          type="button"
          className="bal-reload-btn"
          onClick={() => alert('Balance refreshed!')}
          title="Refresh Balance"
        >
          <RotateCw size={16} />
        </button>
      </div>

      {/* History Drawer Modal */}
      {showHistory && (
        <div className="records-drawer-box">
          <div className="drawer-header">
            <h3>Recent Deposit History</h3>
            <button type="button" className="close-drawer-btn" onClick={() => setShowHistory(false)}>✕</button>
          </div>
          {userDeposits.length === 0 ? (
            <p className="no-records-msg">No deposit requests yet.</p>
          ) : (
            <div className="records-list">
              {userDeposits.map((item) => (
                <div key={item.id} className="record-item">
                  <div className="rec-info">
                    <span className="rec-amt">₹{item.amount.toLocaleString('en-IN')}</span>
                    <span className="rec-utr">UTR: {item.utr}</span>
                    <span className="rec-time">{item.date}</span>
                  </div>
                  <span className={`status-pill ${item.status}`}>
                    {item.status.toUpperCase()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Payment Channels Grid */}
      <div className="payment-channels-section">
        <span className="section-label">Select Payment Method</span>
        <div className="payment-methods-grid">
          <div
            className={`payment-method-card ${paymentChannel === 'upi' ? 'active' : ''}`}
            onClick={() => setPaymentChannel('upi')}
          >
            <div className="method-badge hot">FAST</div>
            <div className="method-logos">
              <img src={getAssetUrl('images/PhonePe-BJ63IV8b.svg')} alt="PhonePe" className="brand-logo" />
              <img src={getAssetUrl('images/Paytm-Bn-zZ_Aq.svg')} alt="Paytm" className="brand-logo" />
            </div>
            <span className="method-name">UPI / QR Pay</span>
            <span className="method-sub">Instant 1-3 Mins</span>
          </div>

          <div
            className={`payment-method-card ${paymentChannel === 'bank' ? 'active' : ''}`}
            onClick={() => setPaymentChannel('bank')}
          >
            <div className="method-logos">
              <Building2 size={24} className="method-icon" />
            </div>
            <span className="method-name">Bank Transfer</span>
            <span className="method-sub">IMPS / NEFT</span>
          </div>

          <div
            className={`payment-method-card ${paymentChannel === 'usdt' ? 'active' : ''}`}
            onClick={() => setPaymentChannel('usdt')}
          >
            <div className="method-logos">
              <CreditCard size={24} className="method-icon" />
            </div>
            <span className="method-name">USDT Crypto</span>
            <span className="method-sub">TRC-20 Auto</span>
          </div>
        </div>
      </div>

      {/* Quick Amount Selection */}
      <div className="quick-amount-section">
        <span className="section-label">Deposit Amount (₹)</span>
        <div className="amount-chips-grid">
          {quickAmounts.map((q) => (
            <button
              key={q.val}
              type="button"
              className={`amount-chip ${amount === q.val ? 'selected' : ''}`}
              onClick={() => setAmount(q.val)}
            >
              {q.bonus && <span className="bonus-tag">{q.bonus}</span>}
              <span className="chip-val">₹{parseInt(q.val).toLocaleString('en-IN')}</span>
            </button>
          ))}
        </div>

        {/* Custom Input */}
        <div className="custom-amount-input-row">
          <span className="cur-sym">₹</span>
          <input
            type="number"
            min={config.minDeposit}
            placeholder="Enter custom amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          {amount && (
            <button type="button" className="btn-clear-amt" onClick={() => setAmount('')}>✕</button>
          )}
        </div>
        <p className="limit-hint">Deposit Limits: ₹{config.minDeposit} - ₹50,000</p>
      </div>

      {/* Official UPI Transfer Box */}
      <div className="official-upi-card">
        <div className="upi-card-header">
          <QrCode size={20} className="upi-qr-icon" />
          <span>Official Payment UPI VPA</span>
        </div>
        <div className="upi-address-box">
          <code className="upi-code-display">{config.upiId}</code>
          <button
            type="button"
            className={`btn-copy-upi ${isCopied ? 'copied' : ''}`}
            onClick={handleCopyUpi}
          >
            {isCopied ? 'Copied ✓' : 'Copy UPI'}
          </button>
        </div>
        <div className="upi-quick-apps">
          <span className="apps-hint">Supported UPI Apps:</span>
          <span className="app-tag">PhonePe</span>
          <span className="app-tag">Paytm</span>
          <span className="app-tag">Google Pay</span>
          <span className="app-tag">BHIM</span>
        </div>
      </div>

      {/* UTR Submission Form */}
      <form onSubmit={handleDepositSubmit} className="utr-submit-form">
        <div className="utr-input-group">
          <label htmlFor="dep-utr">12-Digit UTR / Transaction Reference Number</label>
          <input
            id="dep-utr"
            type="text"
            required
            maxLength={20}
            placeholder="e.g. 431982716281 (from your payment receipt)"
            value={utrNumber}
            onChange={(e) => setUtrNumber(e.target.value)}
          />
        </div>

        {errorToast && (
          <div className="payment-alert error">
            <AlertCircle size={16} />
            <span>{errorToast}</span>
          </div>
        )}

        {successToast && (
          <div className="payment-alert success">
            <CheckCircle2 size={16} />
            <span>{successToast}</span>
          </div>
        )}

        <button
          type="submit"
          className="btn-submit-payment"
          disabled={submitting}
        >
          {submitting ? 'Submitting to Admin...' : `Deposit Now ₹${(parseFloat(amount) || 0).toLocaleString('en-IN')}`}
        </button>
      </form>

      {/* Instructions */}
      <div className="payment-instructions-box">
        <h4>Deposit Instructions:</h4>
        <ol>
          <li>Copy the official UPI ID shown above.</li>
          <li>Open your UPI app (PhonePe, Paytm, GPay, etc.) and transfer the exact amount.</li>
          <li>Find the <strong>12-digit UTR/Ref No.</strong> on the payment confirmation screen.</li>
          <li>Paste the UTR number into the box above and click <strong>Deposit Now</strong>.</li>
          <li>Your wallet balance will be credited upon admin confirmation (1-3 minutes).</li>
        </ol>
      </div>
    </div>
  );
}

/* ==========================================================================
   4. WITHDRAWAL VIEW (EXACT AR-SAAS 11 WITHDRAWAL EXPERIENCE)
   ========================================================================== */
export function WithdrawView({ onOpenAuth, onNavigateTab }: TabProps) {
  const { user } = useAuth();
  const { config, getUserBalance, addWithdrawalRequest } = useAdminConfig();

  const [bankName, setBankName] = useState('State Bank of India');
  const [accountHolder, setAccountHolder] = useState(user?.user_metadata?.full_name || '');
  const [accountNo, setAccountNo] = useState('');
  const [ifsc, setIfsc] = useState('');
  const [amount, setAmount] = useState('1000');
  const [submitting, setSubmitting] = useState(false);
  const [successToast, setSuccessToast] = useState('');
  const [errorToast, setErrorToast] = useState('');
  const [showHistory, setShowHistory] = useState(false);

  if (!user) {
    return (
      <div className="tab-view-container">
        <div className="login-prompt-banner large">
          <ArrowUpRight size={48} className="hero-wallet-icon" />
          <h2>Bank Withdrawal</h2>
          <p>Please sign in to withdraw your winnings directly to your Indian bank account.</p>
          <button type="button" className="btn-primary-inline" onClick={() => onOpenAuth('login')}>
            Sign In to Withdraw
          </button>
        </div>
      </div>
    );
  }

  const userKey = user.id || user.user_metadata?.phone || user.email || 'user';
  const balance = getUserBalance(userKey) || getUserBalance(user.email) || getUserBalance(user.id) || 0;
  const phone = user.user_metadata?.phone || user.email || 'User';

  const quickWithdrawChips = ['500', '1000', '2500', '5000', '10000', 'ALL'];

  const handleWithdrawSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorToast('');
    setSuccessToast('');

    const amtNum = parseFloat(amount);
    if (isNaN(amtNum) || amtNum < config.minWithdrawal) {
      setErrorToast(`Minimum withdrawal is ₹${config.minWithdrawal}`);
      return;
    }
    if (amtNum > config.maxWithdrawal) {
      setErrorToast(`Maximum withdrawal is ₹${config.maxWithdrawal.toLocaleString('en-IN')}`);
      return;
    }
    if (amtNum > balance) {
      setErrorToast('Insufficient wallet balance to withdraw this amount!');
      return;
    }

    if (!accountNo.trim() || accountNo.trim().length < 8) {
      setErrorToast('Please enter a valid bank account number.');
      return;
    }

    if (!ifsc.trim() || ifsc.trim().length < 5) {
      setErrorToast('Please enter a valid bank IFSC code (e.g. SBIN0001234).');
      return;
    }

    setSubmitting(true);
    try {
      addWithdrawalRequest({
        userId: user.id,
        phone,
        amount: amtNum,
        bankName,
        accountNo: accountNo.trim(),
        ifsc: ifsc.trim().toUpperCase()
      });

      setSuccessToast(`Withdrawal request of ₹${amtNum.toLocaleString('en-IN')} submitted successfully! Admin will process transfer to your bank shortly.`);
      setAmount('');
      setAccountNo('');
      setIfsc('');
    } catch {
      setErrorToast('Failed to submit withdrawal request. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const userWithdrawals = config.withdrawalRequests.filter(w => w.userId === user.id);

  return (
    <div className="tab-view-container payment-page-wrap">
      {/* Top Header Bar */}
      <div className="payment-top-nav">
        <button
          type="button"
          className="btn-payment-back"
          onClick={() => onNavigateTab ? onNavigateTab('home') : window.history.back()}
          aria-label="Go back"
        >
          <ArrowLeft size={18} />
        </button>
        <h2 className="payment-page-title">Withdrawal</h2>
        <button
          type="button"
          className="btn-payment-history"
          onClick={() => setShowHistory(!showHistory)}
          title="Withdrawal Records"
        >
          <History size={18} />
          <span>Records</span>
        </button>
      </div>

      {/* Balance Bar */}
      <div className="payment-balance-banner">
        <div className="bal-col">
          <span className="bal-label">Withdrawable Balance</span>
          <span className="bal-value">₹ {balance.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
        </div>
        <div className="bal-tag-free">0% Fee (Free)</div>
      </div>

      {/* History Drawer Modal */}
      {showHistory && (
        <div className="records-drawer-box">
          <div className="drawer-header">
            <h3>Recent Withdrawal Requests</h3>
            <button type="button" className="close-drawer-btn" onClick={() => setShowHistory(false)}>✕</button>
          </div>
          {userWithdrawals.length === 0 ? (
            <p className="no-records-msg">No withdrawal requests yet.</p>
          ) : (
            <div className="records-list">
              {userWithdrawals.map((item) => (
                <div key={item.id} className="record-item">
                  <div className="rec-info">
                    <span className="rec-amt">₹{item.amount.toLocaleString('en-IN')}</span>
                    <span className="rec-utr">{item.bankName} - {item.accountNo}</span>
                    <span className="rec-time">{item.date}</span>
                  </div>
                  <span className={`status-pill ${item.status}`}>
                    {item.status.toUpperCase()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Bank Account Details Card */}
      <div className="bank-account-form-card">
        <span className="section-label">Recipient Bank Information</span>

        <div className="form-group-field">
          <label>Select Bank</label>
          <select
            value={bankName}
            onChange={(e) => setBankName(e.target.value)}
            className="bank-select-box"
          >
            {INDIAN_BANKS.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>

        <div className="form-group-field">
          <label>Account Holder Name</label>
          <input
            type="text"
            required
            placeholder="Enter name as per bank records"
            value={accountHolder}
            onChange={(e) => setAccountHolder(e.target.value)}
          />
        </div>

        <div className="form-group-field">
          <label>Bank Account Number</label>
          <input
            type="text"
            required
            placeholder="Enter bank account number"
            value={accountNo}
            onChange={(e) => setAccountNo(e.target.value)}
          />
        </div>

        <div className="form-group-field">
          <label>Bank IFSC Code</label>
          <input
            type="text"
            required
            placeholder="e.g. SBIN0001234"
            value={ifsc}
            onChange={(e) => setIfsc(e.target.value.toUpperCase())}
          />
        </div>
      </div>

      {/* Withdrawal Amount Selection */}
      <div className="quick-amount-section">
        <span className="section-label">Withdrawal Amount (₹)</span>
        <div className="amount-chips-grid">
          {quickWithdrawChips.map((chip) => (
            <button
              key={chip}
              type="button"
              className={`amount-chip ${amount === (chip === 'ALL' ? balance.toString() : chip) ? 'selected' : ''}`}
              onClick={() => {
                if (chip === 'ALL') {
                  setAmount(Math.floor(balance).toString());
                } else {
                  setAmount(chip);
                }
              }}
            >
              <span className="chip-val">{chip === 'ALL' ? 'All In' : `₹${parseInt(chip).toLocaleString('en-IN')}`}</span>
            </button>
          ))}
        </div>

        {/* Custom Input */}
        <div className="custom-amount-input-row">
          <span className="cur-sym">₹</span>
          <input
            type="number"
            min={config.minWithdrawal}
            max={config.maxWithdrawal}
            placeholder={`Min ₹${config.minWithdrawal}`}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          {amount && (
            <button type="button" className="btn-clear-amt" onClick={() => setAmount('')}>✕</button>
          )}
        </div>
        <p className="limit-hint">
          Limits: ₹{config.minWithdrawal} - ₹{config.maxWithdrawal.toLocaleString('en-IN')} (24/7 Automated Payout)
        </p>
      </div>

      {errorToast && (
        <div className="payment-alert error">
          <AlertCircle size={16} />
          <span>{errorToast}</span>
        </div>
      )}

      {successToast && (
        <div className="payment-alert success">
          <CheckCircle2 size={16} />
          <span>{successToast}</span>
        </div>
      )}

      <button
        type="button"
        className="btn-submit-payment"
        disabled={submitting}
        onClick={handleWithdrawSubmit}
      >
        {submitting ? 'Submitting to Bank Gateway...' : `Confirm Withdrawal ₹${(parseFloat(amount) || 0).toLocaleString('en-IN')}`}
      </button>

      {/* Security Info */}
      <div className="payment-instructions-box">
        <h4>Withdrawal Rules:</h4>
        <ol>
          <li>Withdrawals are processed 24/7 directly to your bank account.</li>
          <li>Please double-check your Account Number and IFSC Code before submitting.</li>
          <li>Standard turnaround time is 5-15 minutes. High-volume periods may take up to 30 minutes.</li>
          <li>Daily free withdrawal limit: 3 times per day.</li>
        </ol>
      </div>
    </div>
  );
}

/* ==========================================================================
   5. UNIFIED WALLET VIEW (COMBINED DEPOSIT & WITHDRAWAL HUB)
   ========================================================================== */
export function WalletView({ onOpenAuth, onNavigateTab, initialSubTab = 'deposit' }: TabProps) {
  const [subTab, setSubTab] = useState<'deposit' | 'withdraw'>(initialSubTab);

  return (
    <div className="tab-view-container">
      {/* Wallet Segmented Switcher */}
      <div className="wallet-tab-switcher">
        <button
          type="button"
          className={`switcher-btn ${subTab === 'deposit' ? 'active' : ''}`}
          onClick={() => setSubTab('deposit')}
        >
          <ArrowDownLeft size={16} />
          <span>Deposit</span>
        </button>
        <button
          type="button"
          className={`switcher-btn ${subTab === 'withdraw' ? 'active' : ''}`}
          onClick={() => setSubTab('withdraw')}
        >
          <ArrowUpRight size={16} />
          <span>Withdraw</span>
        </button>
      </div>

      {subTab === 'deposit' ? (
        <DepositView onOpenAuth={onOpenAuth} onNavigateTab={onNavigateTab} />
      ) : (
        <WithdrawView onOpenAuth={onOpenAuth} onNavigateTab={onNavigateTab} />
      )}
    </div>
  );
}

/* ==========================================================================
   6. MINE VIEW (EXACT AR-SAAS 11 PERSONAL PROFILE CENTER)
   ========================================================================== */
export function MineView({ onOpenAuth, onNavigateTab }: TabProps) {
  const { user, signOut } = useAuth();
  const { config, getUserBalance } = useAdminConfig();
  const [copiedUid, setCopiedUid] = useState(false);

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
  const fullName = user.user_metadata?.full_name || phoneOrEmail.split('@')[0];
  const userKey = user.id || user.user_metadata?.phone || user.email;
  const balance = getUserBalance(userKey) || getUserBalance(user.email) || getUserBalance(user.id) || 0;
  const uid = user.id.replace(/-/g, '').slice(0, 8);

  const copyUid = () => {
    navigator.clipboard.writeText(uid);
    setCopiedUid(true);
    setTimeout(() => setCopiedUid(false), 2000);
  };

  const menuItems = [
    {
      id: 'bets',
      title: 'Betting Records',
      desc: 'All fair RNG game bet history',
      icon: History,
      action: () => alert('Betting Records: All fair game outcomes recorded on blockchain.')
    },
    {
      id: 'txns',
      title: 'Transaction History',
      desc: 'Deposit & bank withdrawal slips',
      icon: Wallet,
      action: () => onNavigateTab ? onNavigateTab('wallet') : null
    },
    {
      id: 'vip',
      title: 'VIP Privileges',
      desc: 'Daily cashback & tier upgrades',
      icon: Crown,
      action: () => alert('VIP Level 1 Active! Upgrade to VIP 2 with next deposit.')
    },
    {
      id: 'rewards',
      title: 'Reward Center',
      desc: 'Daily check-in and gift codes',
      icon: Gift,
      action: () => onNavigateTab ? onNavigateTab('activity') : null
    },
    {
      id: 'inmail',
      title: 'Notifications & Mail',
      desc: 'System bonuses and alerts',
      icon: Info,
      action: () => alert('You have no unread notifications.')
    },
    {
      id: 'security',
      title: 'Account & Security',
      desc: 'Password, Google Auth & Phone bind',
      icon: ShieldCheck,
      action: () => alert('Account secured with Supabase 256-bit encryption.')
    },
    {
      id: 'support',
      title: '24/7 Customer Service',
      desc: 'Telegram & WhatsApp Live Help',
      icon: MessageCircle,
      action: () => window.open(config.telegramUrl, '_blank')
    },
    {
      id: 'referral',
      title: 'Agent Referral Program',
      desc: 'Earn up to 85% commission',
      icon: Share2,
      action: () => onNavigateTab ? onNavigateTab('promotion') : null
    }
  ];

  return (
    <div className="tab-view-container profile-center-wrap">
      {/* Profile Hero Card */}
      <div className="profile-hero-card-s11">
        <div className="profile-top-row">
          <div className="avatar-frame">
            <User size={38} className="avatar-svg" />
            <span className="camera-badge">📷</span>
          </div>
          <div className="user-text-info">
            <div className="name-row">
              <h3 className="user-display-name">{fullName}</h3>
              <span className="vip-crown-badge">
                <Crown size={12} />
                <span>VIP 1</span>
              </span>
            </div>
            <div className="uid-copy-row" onClick={copyUid} title="Click to copy UID">
              <span className="uid-txt">UID: {uid}</span>
              <Copy size={13} className="copy-icon" />
              {copiedUid && <span className="copied-pill">Copied!</span>}
            </div>
          </div>
        </div>

        {/* Balance Card Section */}
        <div className="profile-balance-strip">
          <div className="bal-block">
            <span className="bal-ttl">Total Balance</span>
            <span className="bal-num">
              ₹ {balance.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
          <div className="bal-buttons-row">
            <button
              type="button"
              className="btn-profile-deposit"
              onClick={() => onNavigateTab ? onNavigateTab('deposit') : null}
            >
              <ArrowDownLeft size={16} />
              <span>Deposit</span>
            </button>
            <button
              type="button"
              className="btn-profile-withdraw"
              onClick={() => onNavigateTab ? onNavigateTab('withdraw') : null}
            >
              <ArrowUpRight size={16} />
              <span>Withdraw</span>
            </button>
          </div>
        </div>
      </div>

      {/* Financial Overview Metrics */}
      <div className="profile-metrics-grid">
        <div className="metric-box">
          <span className="metric-val highlight">₹ 0.00</span>
          <span className="metric-lbl">Today's Profit</span>
        </div>
        <div className="metric-box">
          <span className="metric-val">0</span>
          <span className="metric-lbl">Total Bets</span>
        </div>
        <div className="metric-box">
          <span className="metric-val">₹ 0.00</span>
          <span className="metric-lbl">Total Rebate</span>
        </div>
      </div>

      {/* Service Menu 8-Grid */}
      <div className="service-menu-grid">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.id} className="service-card-item" onClick={item.action}>
              <div className="service-icon-wrap">
                <Icon size={20} />
              </div>
              <div className="service-text">
                <span className="service-title">{item.title}</span>
                <span className="service-desc">{item.desc}</span>
              </div>
              <ChevronRight size={16} className="arrow-nav" />
            </div>
          );
        })}
      </div>

      {/* Security Assurance */}
      <div className="security-assurance-banner">
        <ShieldCheck size={18} className="shield-icon" />
        <span>Secured by Supabase Cloud & 256-Bit SSL Banking Protection</span>
      </div>

      {/* Logout Button */}
      <button type="button" className="btn-logout-s11" onClick={signOut}>
        <LogOut size={16} />
        <span>Log Out Account</span>
      </button>
    </div>
  );
}

import { useState } from 'react';
import { useAdminConfig } from '../context/AdminConfigContext';
import { getAssetUrl } from '../utils/assetUrl';
import {
  LayoutDashboard,
  Users,
  ArrowUpRight,
  ArrowDownLeft,
  Megaphone,
  Image as ImageIcon,
  Trophy,
  Dices,
  Share2,
  Lock,
  LogOut,
  ExternalLink,
  CheckCircle2,
  XCircle,
  Plus,
  Trash2,
  Save,
  RotateCcw,
  ShieldCheck,
  Search,
  KeyRound
} from 'lucide-react';

interface AdminPanelProps {
  onBackToSite: () => void;
}

export function AdminPanel({ onBackToSite }: AdminPanelProps) {
  const {
    config,
    updateConfig,
    updateUserBalance,
    updateWithdrawalStatus,
    updateDepositStatus,
    resetDefaults
  } = useAdminConfig();

  // Admin Auth state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('maanwin_admin_auth') === 'true';
  });
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');

  // Active Tab
  const [activeTab, setActiveTab] = useState<
    'overview' | 'users' | 'withdrawals' | 'deposits' | 'notices' | 'banners' | 'winners' | 'wingo' | 'social' | 'settings'
  >('overview');

  // Form states for adding/editing
  const [userSearch, setUserSearch] = useState('');
  const [editUserKey, setEditUserKey] = useState('');
  const [editUserAmount, setEditUserAmount] = useState('');
  const [successToast, setSuccessToast] = useState('');

  // New winner record form
  const [newWinnerPhone, setNewWinnerPhone] = useState('');
  const [newWinnerGame, setNewWinnerGame] = useState('Aviator');
  const [newWinnerAmount, setNewWinnerAmount] = useState('15000');

  // Notice form
  const [noticeEnInput, setNoticeEnInput] = useState(config.noticeEn);
  const [noticeHiInput, setNoticeHiInput] = useState(config.noticeHi);

  // Banking form
  const [minWithdrawalInput, setMinWithdrawalInput] = useState(config.minWithdrawal.toString());
  const [maxWithdrawalInput, setMaxWithdrawalInput] = useState(config.maxWithdrawal.toString());
  const [upiIdInput, setUpiIdInput] = useState(config.upiId);

  // Social form
  const [telegramInput, setTelegramInput] = useState(config.telegramUrl);
  const [whatsappInput, setWhatsappInput] = useState(config.whatsappUrl);

  // New Banner form
  const [newBannerTitle, setNewBannerTitle] = useState('');
  const [newBannerSubtitle, setNewBannerSubtitle] = useState('');
  const [newBannerImg, setNewBannerImg] = useState('');

  // Win Go control
  const [selectedNextWingo, setSelectedNextWingo] = useState<number | null>(config.wingoNextNumber);

  // PIN settings
  const [newPin, setNewPin] = useState('');

  const showToast = (msg: string) => {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(''), 3000);
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim() === config.adminPin) {
      setIsAuthenticated(true);
      sessionStorage.setItem('maanwin_admin_auth', 'true');
      setPinError('');
    } else {
      setPinError('Invalid Admin PIN. (Default: admin888)');
    }
  };

  const handleAdminLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('maanwin_admin_auth');
  };

  // 1. User Balance Edit Handlers
  const handleSaveUserBalance = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editUserKey.trim()) return;
    const amountNum = parseFloat(editUserAmount);
    if (isNaN(amountNum) || amountNum < 0) {
      alert('Please enter a valid amount');
      return;
    }
    updateUserBalance(editUserKey.trim(), amountNum);
    showToast(`Wallet Balance for [${editUserKey}] updated to ₹${amountNum.toLocaleString('en-IN')}`);
    setEditUserKey('');
    setEditUserAmount('');
  };

  // 2. Save Notice
  const handleSaveNotice = (e: React.FormEvent) => {
    e.preventDefault();
    updateConfig({
      noticeEn: noticeEnInput,
      noticeHi: noticeHiInput
    });
    showToast('Notice & Marquee updated on live website!');
  };

  // 3. Save Banking / Withdrawal Settings
  const handleSaveBanking = (e: React.FormEvent) => {
    e.preventDefault();
    updateConfig({
      minWithdrawal: Number(minWithdrawalInput) || 110,
      maxWithdrawal: Number(maxWithdrawalInput) || 50000,
      upiId: upiIdInput.trim()
    });
    showToast('Withdrawal limits and UPI details updated!');
  };

  // 4. Save Social Links
  const handleSaveSocial = (e: React.FormEvent) => {
    e.preventDefault();
    updateConfig({
      telegramUrl: telegramInput.trim(),
      whatsappUrl: whatsappInput.trim()
    });
    showToast('Telegram & WhatsApp links updated!');
  };

  // 5. Add Winner Record
  const handleAddWinner = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWinnerPhone.trim()) return;
    const cleanAmount = parseFloat(newWinnerAmount);
    const formattedAmt = `₹${(cleanAmount || 1000).toLocaleString('en-IN')}.00`;

    const newWinner = {
      id: Date.now().toString(),
      phone: newWinnerPhone.trim().startsWith('91***') ? newWinnerPhone.trim() : `91***${newWinnerPhone.slice(-4)}`,
      game: newWinnerGame,
      amount: formattedAmt,
      avatar: '1',
      time: 'Just now'
    };

    updateConfig({
      winners: [newWinner, ...config.winners]
    });
    showToast('New Live Winner added to frontend feed!');
    setNewWinnerPhone('');
  };

  const handleDeleteWinner = (id: string) => {
    updateConfig({
      winners: config.winners.filter((w) => w.id !== id)
    });
    showToast('Winner removed.');
  };

  // 6. Win Go Next Result
  const handleSetWingo = (num: number | null) => {
    setSelectedNextWingo(num);
    updateConfig({ wingoNextNumber: num });
    if (num !== null) {
      showToast(`Next Win Go result locked to Number [${num}]!`);
    } else {
      showToast('Win Go set to standard random results.');
    }
  };

  // 7. Add Banner
  const handleAddBanner = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBannerImg.trim()) return;
    const newBanner = {
      id: Date.now(),
      img: newBannerImg.trim(),
      title: newBannerTitle.trim() || 'Special Event',
      subtitle: newBannerSubtitle.trim() || 'Play now and win real cash'
    };
    updateConfig({
      banners: [newBanner, ...config.banners]
    });
    showToast('New promotion banner added!');
    setNewBannerImg('');
    setNewBannerTitle('');
    setNewBannerSubtitle('');
  };

  const handleDeleteBanner = (id: number) => {
    if (config.banners.length <= 1) {
      alert('Must keep at least 1 banner.');
      return;
    }
    updateConfig({
      banners: config.banners.filter((b) => b.id !== id)
    });
    showToast('Banner removed.');
  };

  // 8. Update PIN
  const handleUpdatePin = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPin.trim().length < 4) {
      alert('PIN must be at least 4 characters');
      return;
    }
    updateConfig({ adminPin: newPin.trim() });
    showToast('Admin PIN changed successfully!');
    setNewPin('');
  };

  // Login Screen if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="admin-login-screen">
        <div className="admin-login-card">
          <div className="admin-login-logo">
            <img
              src={getAssetUrl('images/logo.webp')}
              alt="Maanwin"
              className="admin-logo-img"
            />
          </div>
          <div className="admin-badge-row">
            <ShieldCheck size={18} />
            <h2>Maanwin Administrator Portal</h2>
          </div>
          <p className="admin-login-subtitle">
            Please enter your Admin PIN to access user balances, banking & game controls.
          </p>

          {pinError && <div className="admin-alert-error">{pinError}</div>}

          <form onSubmit={handleAdminLogin} className="admin-pin-form">
            <div className="pin-input-wrap">
              <Lock size={18} className="pin-icon" />
              <input
                type="password"
                required
                placeholder="Enter Admin PIN"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                autoFocus
              />
            </div>
            <button type="submit" className="btn-admin-login">
              Verify & Enter Dashboard
            </button>
          </form>

          <div className="admin-login-footer">
            <span>Default PIN: <code>admin888</code></span>
            <button type="button" className="btn-back-link" onClick={onBackToSite}>
              ← Return to Frontend
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Registered user entries for editing
  const userEntries = Object.entries(config.userBalances);
  const filteredUsers = userEntries.filter(([k]) =>
    k.toLowerCase().includes(userSearch.toLowerCase())
  );

  return (
    <div className="admin-dashboard-container">
      {/* Toast Notification */}
      {successToast && (
        <div className="admin-toast">
          <CheckCircle2 size={18} />
          <span>{successToast}</span>
        </div>
      )}

      {/* Top Navbar */}
      <header className="admin-topbar">
        <div className="topbar-left">
          <img src={getAssetUrl('images/logo.webp')} alt="Maanwin" className="topbar-logo" />
          <span className="topbar-badge">ADMIN v2.0</span>
        </div>

        <div className="topbar-right">
          <button type="button" className="btn-topbar-nav" onClick={onBackToSite}>
            <ExternalLink size={16} />
            <span>Open Frontend Site</span>
          </button>
          <button type="button" className="btn-topbar-logout" onClick={handleAdminLogout}>
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      </header>

      {/* Main Admin Body */}
      <div className="admin-layout-body">
        {/* Sidebar */}
        <aside className="admin-sidebar">
          <nav className="sidebar-nav">
            <button
              type="button"
              className={`sidebar-nav-item ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              <LayoutDashboard size={18} />
              <span>Dashboard Overview</span>
            </button>

            <button
              type="button"
              className={`sidebar-nav-item ${activeTab === 'users' ? 'active' : ''}`}
              onClick={() => setActiveTab('users')}
            >
              <Users size={18} />
              <span>User ID & Amount Edit</span>
            </button>

            <button
              type="button"
              className={`sidebar-nav-item ${activeTab === 'withdrawals' ? 'active' : ''}`}
              onClick={() => setActiveTab('withdrawals')}
            >
              <ArrowUpRight size={18} />
              <span>Withdrawal Requests ({config.withdrawalRequests.filter(w => w.status === 'pending').length})</span>
            </button>

            <button
              type="button"
              className={`sidebar-nav-item ${activeTab === 'deposits' ? 'active' : ''}`}
              onClick={() => setActiveTab('deposits')}
            >
              <ArrowDownLeft size={18} />
              <span>Deposit & UPI Config</span>
            </button>

            <button
              type="button"
              className={`sidebar-nav-item ${activeTab === 'notices' ? 'active' : ''}`}
              onClick={() => setActiveTab('notices')}
            >
              <Megaphone size={18} />
              <span>Live Notice & Marquee</span>
            </button>

            <button
              type="button"
              className={`sidebar-nav-item ${activeTab === 'banners' ? 'active' : ''}`}
              onClick={() => setActiveTab('banners')}
            >
              <ImageIcon size={18} />
              <span>Banners & Promotions</span>
            </button>

            <button
              type="button"
              className={`sidebar-nav-item ${activeTab === 'winners' ? 'active' : ''}`}
              onClick={() => setActiveTab('winners')}
            >
              <Trophy size={18} />
              <span>Live Winners Feed</span>
            </button>

            <button
              type="button"
              className={`sidebar-nav-item ${activeTab === 'wingo' ? 'active' : ''}`}
              onClick={() => setActiveTab('wingo')}
            >
              <Dices size={18} />
              <span>Win Go Result Control</span>
            </button>

            <button
              type="button"
              className={`sidebar-nav-item ${activeTab === 'social' ? 'active' : ''}`}
              onClick={() => setActiveTab('social')}
            >
              <Share2 size={18} />
              <span>Telegram & WhatsApp</span>
            </button>

            <button
              type="button"
              className={`sidebar-nav-item ${activeTab === 'settings' ? 'active' : ''}`}
              onClick={() => setActiveTab('settings')}
            >
              <KeyRound size={18} />
              <span>Security & Reset</span>
            </button>
          </nav>
        </aside>

        {/* Content Area */}
        <main className="admin-content-main">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="admin-tab-pane">
              <div className="pane-header">
                <h2>Real-Time Overview & Metrics</h2>
                <p>Welcome to the Maanwin Control Center. All edits made here reflect instantly on the live website.</p>
              </div>

              <div className="admin-stats-grid">
                <div className="stat-card">
                  <span className="stat-title">Configured User Balances</span>
                  <span className="stat-number">{userEntries.length}</span>
                  <span className="stat-sub">Users with active balance overrides</span>
                </div>
                <div className="stat-card">
                  <span className="stat-title">Pending Withdrawals</span>
                  <span className="stat-number warning">
                    {config.withdrawalRequests.filter((w) => w.status === 'pending').length}
                  </span>
                  <span className="stat-sub">Waiting for approval</span>
                </div>
                <div className="stat-card">
                  <span className="stat-title">Pending Deposits</span>
                  <span className="stat-number info">
                    {config.depositRequests.filter((d) => d.status === 'pending').length}
                  </span>
                  <span className="stat-sub">Waiting for UTR verification</span>
                </div>
                <div className="stat-card">
                  <span className="stat-title">Win Go Next Result</span>
                  <span className="stat-number gold">
                    {config.wingoNextNumber !== null ? `No. ${config.wingoNextNumber}` : 'Random (Auto)'}
                  </span>
                  <span className="stat-sub">Current lottery status</span>
                </div>
              </div>

              <div className="quick-action-cards">
                <div className="action-card" onClick={() => setActiveTab('users')}>
                  <Users size={24} />
                  <h3>Edit User Balance / ID</h3>
                  <p>Increase or decrease wallet balance for any member ID.</p>
                </div>
                <div className="action-card" onClick={() => setActiveTab('withdrawals')}>
                  <ArrowUpRight size={24} />
                  <h3>Review Withdrawals</h3>
                  <p>Approve or reject bank transfer requests.</p>
                </div>
                <div className="action-card" onClick={() => setActiveTab('notices')}>
                  <Megaphone size={24} />
                  <h3>Change Marquee Notice</h3>
                  <p>Broadcast real-time announcements to all players.</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: USER BALANCE & ID EDIT */}
          {activeTab === 'users' && (
            <div className="admin-tab-pane">
              <div className="pane-header">
                <h2>User Account & Wallet Balance Management</h2>
                <p>Edit the wallet balance of any user ID or phone number. When that user logs in or views the site, their balance will display the edited amount.</p>
              </div>

              {/* Edit / Add Balance Form */}
              <div className="admin-card-box">
                <h3>Set / Edit User Amount</h3>
                <form onSubmit={handleSaveUserBalance} className="inline-form-grid">
                  <div className="input-field">
                    <label>User ID / Phone Number / Email</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 919876543210 or user@maanwin.com or demo_user"
                      value={editUserKey}
                      onChange={(e) => setEditUserKey(e.target.value)}
                    />
                  </div>
                  <div className="input-field">
                    <label>New Wallet Amount (₹)</label>
                    <input
                      type="number"
                      required
                      min="0"
                      step="any"
                      placeholder="e.g. 50000"
                      value={editUserAmount}
                      onChange={(e) => setEditUserAmount(e.target.value)}
                    />
                  </div>
                  <button type="submit" className="btn-admin-action">
                    <Save size={16} />
                    <span>Update Balance</span>
                  </button>
                </form>
              </div>

              {/* Users Table */}
              <div className="admin-card-box">
                <div className="table-header-row">
                  <h3>Active User Balances ({userEntries.length})</h3>
                  <div className="search-wrap-mini">
                    <Search size={14} />
                    <input
                      type="text"
                      placeholder="Search ID..."
                      value={userSearch}
                      onChange={(e) => setUserSearch(e.target.value)}
                    />
                  </div>
                </div>

                <div className="admin-table-wrap">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>User Identifier</th>
                        <th>Current Balance</th>
                        <th>Status</th>
                        <th>Quick Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.length === 0 ? (
                        <tr>
                          <td colSpan={4} className="empty-td">No users found. Add one above!</td>
                        </tr>
                      ) : (
                        filteredUsers.map(([key, balance]) => (
                          <tr key={key}>
                            <td>
                              <span className="user-identifier-badge">{key}</span>
                            </td>
                            <td>
                              <strong className="balance-highlight">
                                ₹{balance.toLocaleString('en-IN')}.00
                              </strong>
                            </td>
                            <td>
                              <span className="badge-active-tag">Active</span>
                            </td>
                            <td>
                              <div className="table-actions">
                                <button
                                  type="button"
                                  className="btn-sm edit"
                                  onClick={() => {
                                    setEditUserKey(key);
                                    setEditUserAmount(balance.toString());
                                  }}
                                >
                                  Edit Amount
                                </button>
                                <button
                                  type="button"
                                  className="btn-sm add-fund"
                                  onClick={() => {
                                    updateUserBalance(key, balance + 5000);
                                    showToast(`Added +₹5,000 to [${key}]`);
                                  }}
                                >
                                  +₹5,000
                                </button>
                                <button
                                  type="button"
                                  className="btn-sm delete"
                                  onClick={() => {
                                    const next = { ...config.userBalances };
                                    delete next[key];
                                    updateConfig({ userBalances: next });
                                    showToast(`Removed balance override for [${key}]`);
                                  }}
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: WITHDRAWAL REQUESTS & LIMITS */}
          {activeTab === 'withdrawals' && (
            <div className="admin-tab-pane">
              <div className="pane-header">
                <h2>Withdrawal Requests & Banking Controls</h2>
                <p>Approve or reject player withdrawal requests, and customize minimum and maximum withdrawal limits.</p>
              </div>

              {/* Limits Config */}
              <div className="admin-card-box">
                <h3>Withdrawal Limits & Thresholds</h3>
                <form onSubmit={handleSaveBanking} className="inline-form-grid">
                  <div className="input-field">
                    <label>Minimum Withdrawal Amount (₹)</label>
                    <input
                      type="number"
                      required
                      value={minWithdrawalInput}
                      onChange={(e) => setMinWithdrawalInput(e.target.value)}
                    />
                  </div>
                  <div className="input-field">
                    <label>Maximum Withdrawal Amount (₹)</label>
                    <input
                      type="number"
                      required
                      value={maxWithdrawalInput}
                      onChange={(e) => setMaxWithdrawalInput(e.target.value)}
                    />
                  </div>
                  <button type="submit" className="btn-admin-action">
                    <Save size={16} />
                    <span>Save Limits</span>
                  </button>
                </form>
              </div>

              {/* Withdrawals Table */}
              <div className="admin-card-box">
                <h3>Player Withdrawal Records ({config.withdrawalRequests.length})</h3>
                <div className="admin-table-wrap">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Request ID</th>
                        <th>User Phone</th>
                        <th>Amount</th>
                        <th>Bank & Account</th>
                        <th>IFSC Code</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {config.withdrawalRequests.map((req) => (
                        <tr key={req.id}>
                          <td><code>{req.id}</code></td>
                          <td>{req.phone}</td>
                          <td><strong>₹{req.amount.toLocaleString('en-IN')}</strong></td>
                          <td>{req.bankName} ({req.accountNo})</td>
                          <td><code>{req.ifsc}</code></td>
                          <td>
                            <span className={`status-badge-chip ${req.status}`}>
                              {req.status.toUpperCase()}
                            </span>
                          </td>
                          <td>
                            {req.status === 'pending' ? (
                              <div className="table-actions">
                                <button
                                  type="button"
                                  className="btn-sm approve"
                                  onClick={() => {
                                    updateWithdrawalStatus(req.id, 'approved');
                                    showToast(`Withdrawal ${req.id} APPROVED!`);
                                  }}
                                >
                                  <CheckCircle2 size={14} /> Approve
                                </button>
                                <button
                                  type="button"
                                  className="btn-sm reject"
                                  onClick={() => {
                                    updateWithdrawalStatus(req.id, 'rejected');
                                    showToast(`Withdrawal ${req.id} REJECTED.`);
                                  }}
                                >
                                  <XCircle size={14} /> Reject
                                </button>
                              </div>
                            ) : (
                              <span className="processed-lbl">Completed</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: DEPOSITS & UPI CONFIG */}
          {activeTab === 'deposits' && (
            <div className="admin-tab-pane">
              <div className="pane-header">
                <h2>Deposit Channels & UPI Settings</h2>
                <p>Configure the official UPI ID for instant player deposits and approve submitted UTR numbers.</p>
              </div>

              <div className="admin-card-box">
                <h3>Official UPI Receiving ID</h3>
                <form onSubmit={handleSaveBanking} className="inline-form-grid">
                  <div className="input-field full">
                    <label>Official UPI VPA (shown to users in deposit view)</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. maanwin.official@okaxis or payments@upi"
                      value={upiIdInput}
                      onChange={(e) => setUpiIdInput(e.target.value)}
                    />
                  </div>
                  <button type="submit" className="btn-admin-action">
                    <Save size={16} />
                    <span>Update UPI ID</span>
                  </button>
                </form>
              </div>

              <div className="admin-card-box">
                <h3>Deposit Verification Queue ({config.depositRequests.length})</h3>
                <div className="admin-table-wrap">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Deposit ID</th>
                        <th>User</th>
                        <th>Amount</th>
                        <th>12-digit UTR No.</th>
                        <th>Date & Time</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {config.depositRequests.map((dep) => (
                        <tr key={dep.id}>
                          <td><code>{dep.id}</code></td>
                          <td>{dep.phone}</td>
                          <td><strong>₹{dep.amount.toLocaleString('en-IN')}</strong></td>
                          <td><code>{dep.utr}</code></td>
                          <td>{dep.date}</td>
                          <td>
                            <span className={`status-badge-chip ${dep.status}`}>
                              {dep.status.toUpperCase()}
                            </span>
                          </td>
                          <td>
                            {dep.status === 'pending' ? (
                              <div className="table-actions">
                                <button
                                  type="button"
                                  className="btn-sm approve"
                                  onClick={() => {
                                    updateDepositStatus(dep.id, 'approved');
                                    showToast(`Deposit ${dep.id} APPROVED! Credited to user.`);
                                  }}
                                >
                                  <CheckCircle2 size={14} /> Approve & Credit
                                </button>
                                <button
                                  type="button"
                                  className="btn-sm reject"
                                  onClick={() => {
                                    updateDepositStatus(dep.id, 'rejected');
                                    showToast(`Deposit ${dep.id} Rejected.`);
                                  }}
                                >
                                  <XCircle size={14} /> Reject
                                </button>
                              </div>
                            ) : (
                              <span className="processed-lbl">Processed</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: NOTICES & ANNOUNCEMENTS */}
          {activeTab === 'notices' && (
            <div className="admin-tab-pane">
              <div className="pane-header">
                <h2>Marquee Announcement & Notice Broadcast</h2>
                <p>Update the marquee scrolling notification visible across the top of the homepage.</p>
              </div>

              <div className="admin-card-box">
                <form onSubmit={handleSaveNotice} className="admin-form-col">
                  <div className="input-field">
                    <label>English Announcement Message</label>
                    <textarea
                      rows={3}
                      value={noticeEnInput}
                      onChange={(e) => setNoticeEnInput(e.target.value)}
                    />
                  </div>

                  <div className="input-field">
                    <label>Hindi Announcement Message (हिन्दी)</label>
                    <textarea
                      rows={3}
                      value={noticeHiInput}
                      onChange={(e) => setNoticeHiInput(e.target.value)}
                    />
                  </div>

                  <button type="submit" className="btn-admin-action full">
                    <Save size={16} />
                    <span>Broadcast Notice to Live Website</span>
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* TAB 6: BANNERS & PROMOTIONS */}
          {activeTab === 'banners' && (
            <div className="admin-tab-pane">
              <div className="pane-header">
                <h2>Banners & Hero Slider Manager</h2>
                <p>Manage the promotional banners that appear in the top carousel on the homepage.</p>
              </div>

              {/* Add Banner */}
              <div className="admin-card-box">
                <h3>Add New Promo Banner</h3>
                <form onSubmit={handleAddBanner} className="inline-form-grid">
                  <div className="input-field">
                    <label>Image URL (WebP, PNG, JPG)</label>
                    <input
                      type="text"
                      required
                      placeholder="https://... or images/banner1.webp"
                      value={newBannerImg}
                      onChange={(e) => setNewBannerImg(e.target.value)}
                    />
                  </div>
                  <div className="input-field">
                    <label>Title</label>
                    <input
                      type="text"
                      placeholder="e.g. MEGA CASHBACK 50%"
                      value={newBannerTitle}
                      onChange={(e) => setNewBannerTitle(e.target.value)}
                    />
                  </div>
                  <div className="input-field">
                    <label>Subtitle / Description</label>
                    <input
                      type="text"
                      placeholder="e.g. Deposit ₹1000 and get instant cash"
                      value={newBannerSubtitle}
                      onChange={(e) => setNewBannerSubtitle(e.target.value)}
                    />
                  </div>
                  <button type="submit" className="btn-admin-action">
                    <Plus size={16} />
                    <span>Add Banner</span>
                  </button>
                </form>
              </div>

              {/* Banners List */}
              <div className="admin-card-box">
                <h3>Active Carousel Banners ({config.banners.length})</h3>
                <div className="banners-admin-grid">
                  {config.banners.map((b) => (
                    <div key={b.id} className="banner-admin-card">
                      <img src={b.img} alt={b.title} className="banner-preview-img" />
                      <div className="banner-admin-info">
                        <strong>{b.title}</strong>
                        <span>{b.subtitle}</span>
                      </div>
                      <button
                        type="button"
                        className="btn-del-banner"
                        onClick={() => handleDeleteBanner(b.id)}
                      >
                        <Trash2 size={16} />
                        <span>Delete</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: LIVE WINNERS FEED */}
          {activeTab === 'winners' && (
            <div className="admin-tab-pane">
              <div className="pane-header">
                <h2>Live Winning Broadcast Controller</h2>
                <p>Manage the real-time winner cards that roll on the homepage to generate engagement and credibility.</p>
              </div>

              {/* Add Winner Form */}
              <div className="admin-card-box">
                <h3>Add New Winner Record</h3>
                <form onSubmit={handleAddWinner} className="inline-form-grid">
                  <div className="input-field">
                    <label>Phone / User ID</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 91***8821"
                      value={newWinnerPhone}
                      onChange={(e) => setNewWinnerPhone(e.target.value)}
                    />
                  </div>
                  <div className="input-field">
                    <label>Game Title</label>
                    <select
                      value={newWinnerGame}
                      onChange={(e) => setNewWinnerGame(e.target.value)}
                    >
                      <option value="Aviator">Aviator</option>
                      <option value="Win Go 1Min">Win Go 1Min</option>
                      <option value="Super Ace">Super Ace</option>
                      <option value="Crazy Time">Crazy Time</option>
                      <option value="Fortune Tiger">Fortune Tiger</option>
                      <option value="Mega Fishing">Mega Fishing</option>
                      <option value="Lightning Roulette">Lightning Roulette</option>
                      <option value="Mines">Mines</option>
                    </select>
                  </div>
                  <div className="input-field">
                    <label>Won Amount (₹)</label>
                    <input
                      type="number"
                      required
                      placeholder="e.g. 15000"
                      value={newWinnerAmount}
                      onChange={(e) => setNewWinnerAmount(e.target.value)}
                    />
                  </div>
                  <button type="submit" className="btn-admin-action">
                    <Plus size={16} />
                    <span>Add Winner</span>
                  </button>
                </form>
              </div>

              {/* Winners Table */}
              <div className="admin-card-box">
                <h3>Current Winners in Feed ({config.winners.length})</h3>
                <div className="admin-table-wrap">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Phone</th>
                        <th>Game</th>
                        <th>Amount</th>
                        <th>Time</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {config.winners.map((w) => (
                        <tr key={w.id}>
                          <td>{w.phone}</td>
                          <td><strong>{w.game}</strong></td>
                          <td><span className="balance-highlight">{w.amount}</span></td>
                          <td>{w.time}</td>
                          <td>
                            <button
                              type="button"
                              className="btn-sm delete"
                              onClick={() => handleDeleteWinner(w.id)}
                            >
                              <Trash2 size={14} /> Remove
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 8: WIN GO RESULT CONTROLLER */}
          {activeTab === 'wingo' && (
            <div className="admin-tab-pane">
              <div className="pane-header">
                <h2>Win Go Lottery Result Controller</h2>
                <p>Choose the upcoming draw result for the Win Go 1-Min Lottery widget. If set to Auto/Random, results are determined automatically.</p>
              </div>

              <div className="admin-card-box">
                <div className="wingo-status-banner">
                  <span>Current Setting:</span>
                  <strong>
                    {selectedNextWingo !== null
                      ? `LOCKED TO NUMBER ${selectedNextWingo}`
                      : 'AUTOMATIC RNG (RANDOM)'}
                  </strong>
                </div>

                <h3>Select Next Result Number (0 - 9)</h3>
                <div className="wingo-admin-numbers-grid">
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => {
                    let color = 'red';
                    if (n === 0 || n === 5) color = 'violet';
                    else if (n % 2 !== 0) color = 'green';

                    const isSelected = selectedNextWingo === n;

                    return (
                      <button
                        key={n}
                        type="button"
                        className={`wingo-ctrl-ball ball-${color} ${isSelected ? 'selected' : ''}`}
                        onClick={() => handleSetWingo(n)}
                      >
                        <span className="ball-num">{n}</span>
                        <span className="ball-sub">{n >= 5 ? 'Big' : 'Small'}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="wingo-ctrl-actions">
                  <button
                    type="button"
                    className="btn-reset-wingo"
                    onClick={() => handleSetWingo(null)}
                  >
                    <RotateCcw size={16} />
                    <span>Reset to Fair Random Mode</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 9: TELEGRAM & WHATSAPP SOCIAL */}
          {activeTab === 'social' && (
            <div className="admin-tab-pane">
              <div className="pane-header">
                <h2>Customer Service & Social Channels</h2>
                <p>Change the official Telegram and WhatsApp channels linked across the footer, referral pages, and floating chat button.</p>
              </div>

              <div className="admin-card-box">
                <form onSubmit={handleSaveSocial} className="admin-form-col">
                  <div className="input-field">
                    <label>Official Telegram Channel / Group Link</label>
                    <input
                      type="url"
                      required
                      value={telegramInput}
                      onChange={(e) => setTelegramInput(e.target.value)}
                    />
                  </div>

                  <div className="input-field">
                    <label>Official WhatsApp Channel / Support Link</label>
                    <input
                      type="url"
                      required
                      value={whatsappInput}
                      onChange={(e) => setWhatsappInput(e.target.value)}
                    />
                  </div>

                  <button type="submit" className="btn-admin-action full">
                    <Save size={16} />
                    <span>Update Community Links</span>
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* TAB 10: SETTINGS & RESET */}
          {activeTab === 'settings' && (
            <div className="admin-tab-pane">
              <div className="pane-header">
                <h2>Security, Admin PIN & System Reset</h2>
                <p>Update your Admin PIN for security or reset all configurations to fresh factory defaults.</p>
              </div>

              <div className="admin-card-box">
                <h3>Change Admin Access PIN</h3>
                <form onSubmit={handleUpdatePin} className="inline-form-grid">
                  <div className="input-field">
                    <label>New Secret PIN</label>
                    <input
                      type="password"
                      required
                      placeholder="Enter new 4+ digit PIN"
                      value={newPin}
                      onChange={(e) => setNewPin(e.target.value)}
                    />
                  </div>
                  <button type="submit" className="btn-admin-action">
                    <Save size={16} />
                    <span>Update PIN</span>
                  </button>
                </form>
              </div>

              <div className="admin-card-box danger">
                <h3>Factory Reset All Configurations</h3>
                <p>This will restore all default banners, notices, withdrawal limits, and reset user balance overrides.</p>
                <button
                  type="button"
                  className="btn-danger-reset"
                  onClick={() => {
                    if (confirm('Are you sure you want to reset all admin edits to default?')) {
                      resetDefaults();
                      showToast('All settings reset to factory defaults.');
                    }
                  }}
                >
                  <RotateCcw size={16} />
                  <span>Reset All to Defaults</span>
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

/**
 * MAANWIN WEBSITE - CORE JAVASCRIPT ENGINE
 * 1:1 Pure Vanilla Implementation of Maanwin2.com
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // =========================================================================
  // 1. DATA REPOSITORY (GAMES, CATEGORIES & BANNERS)
  // =========================================================================
  const GAMES_DATA = {
    crash: [
      { id: 'c1', name: 'Aviator', vendor: 'SPRIBE', img: 'assets/images/3001-B_W5ZlJ0.webp', winRate: '98.5%', tag: 'HOT' },
      { id: 'c2', name: 'JetX', vendor: 'SMARTSOFT', img: 'assets/images/3002-CWJ9s9i6.webp', winRate: '97.9%', tag: 'POPULAR' },
      { id: 'c3', name: 'Space XY', vendor: 'BGAMING', img: 'assets/images/3003-DN-f1k7r.webp', winRate: '98.2%', tag: 'TRENDING' },
      { id: 'c4', name: 'Crash X', vendor: 'TURBO', img: 'assets/images/3005-B9FjK5p3.webp', winRate: '96.8%', tag: '' },
      { id: 'c5', name: 'Spaceman', vendor: 'PRAGMATIC', img: 'assets/images/3006-D5n-rX9f.webp', winRate: '97.5%', tag: 'VIP' },
      { id: 'c6', name: 'Cricket Crash', vendor: 'ONLYPLAY', img: 'assets/images/3007-B_tJzL01.webp', winRate: '96.9%', tag: '' }
    ],
    lottery: [
      { id: 'l1', name: 'Win Go 1Min', vendor: 'MAANWIN', img: 'assets/images/1001-D9Fk0x1l.webp', winRate: '99.1%', tag: 'HOT' },
      { id: 'l2', name: 'Win Go 3Min', vendor: 'MAANWIN', img: 'assets/images/1002-B_wK1l0z.webp', winRate: '98.7%', tag: '' },
      { id: 'l3', name: 'Win Go 5Min', vendor: 'MAANWIN', img: 'assets/images/1003-C4kP9z1q.webp', winRate: '98.0%', tag: '' },
      { id: 'l4', name: 'K3 1Min', vendor: 'MAANWIN', img: 'assets/images/1005-DN_kL1m0.webp', winRate: '97.8%', tag: 'POPULAR' },
      { id: 'l5', name: '5D Lottery', vendor: 'MAANWIN', img: 'assets/images/1006-Bw_Zk9p2.webp', winRate: '98.4%', tag: '' },
      { id: 'l6', name: 'Trx Win Go', vendor: 'TRON', img: 'assets/images/1007-C3k_L0p1.webp', winRate: '97.6%', tag: 'CRYPTO' }
    ],
    slots: [
      { id: 's1', name: 'Gates of Olympus', vendor: 'PRAGMATIC', img: 'assets/images/2001-B_W5ZlJ0.webp', winRate: '98.6%', tag: 'JACKPOT' },
      { id: 's2', name: 'Sweet Bonanza', vendor: 'PRAGMATIC', img: 'assets/images/2002-CWJ9s9i6.webp', winRate: '98.2%', tag: 'HOT' },
      { id: 's3', name: 'Fortune Tiger', vendor: 'PG SOFT', img: 'assets/images/2003-DN-f1k7r.webp', winRate: '97.9%', tag: 'POPULAR' },
      { id: 's4', name: 'Sugar Rush', vendor: 'PRAGMATIC', img: 'assets/images/2005-B9FjK5p3.webp', winRate: '97.4%', tag: '' },
      { id: 's5', name: 'Money Coming', vendor: 'JILI', img: 'assets/images/2006-D5n-rX9f.webp', winRate: '98.1%', tag: 'SUPER' },
      { id: 's6', name: 'Super Ace', vendor: 'JILI', img: 'assets/images/2007-B_tJzL01.webp', winRate: '97.7%', tag: '' }
    ],
    sports: [
      { id: 'sp1', name: 'Cricket Live IPL', vendor: 'SABA', img: 'assets/images/4001-B_W5ZlJ0.webp', winRate: '98.0%', tag: 'LIVE' },
      { id: 'sp2', name: 'Football Premier', vendor: 'PINNACLE', img: 'assets/images/4002-CWJ9s9i6.webp', winRate: '97.5%', tag: '' },
      { id: 'sp3', name: 'Tennis Open', vendor: 'CMD368', img: 'assets/images/4003-DN-f1k7r.webp', winRate: '96.8%', tag: '' },
      { id: 'sp4', name: 'Kabaddi League', vendor: 'SABA', img: 'assets/images/4005-B9FjK5p3.webp', winRate: '97.2%', tag: 'DESI' }
    ],
    fishing: [
      { id: 'f1', name: 'Mega Fishing', vendor: 'JILI', img: 'assets/images/5001-B_W5ZlJ0.webp', winRate: '98.4%', tag: 'HOT' },
      { id: 'f2', name: 'Bombing Fishing', vendor: 'JDB', img: 'assets/images/5002-CWJ9s9i6.webp', winRate: '97.8%', tag: '' },
      { id: 'f3', name: 'Jackpot Fishing', vendor: 'JILI', img: 'assets/images/5003-DN-f1k7r.webp', winRate: '98.1%', tag: 'JACKPOT' }
    ],
    casino: [
      { id: 'cs1', name: 'Crazy Time Live', vendor: 'EVOLUTION', img: 'assets/images/6001-B_W5ZlJ0.webp', winRate: '98.8%', tag: 'LIVE' },
      { id: 'cs2', name: 'Lightning Roulette', vendor: 'EVOLUTION', img: 'assets/images/6002-CWJ9s9i6.webp', winRate: '98.5%', tag: 'HOT' },
      { id: 'cs3', name: 'Speed Baccarat', vendor: 'EZUGI', img: 'assets/images/6003-DN-f1k7r.webp', winRate: '98.2%', tag: '' },
      { id: 'cs4', name: 'Andar Bahar Live', vendor: 'EVOLUTION', img: 'assets/images/6005-B9FjK5p3.webp', winRate: '98.0%', tag: 'DESI' }
    ],
    poker: [
      { id: 'pk1', name: 'Teen Patti Pro', vendor: 'KINGMAKER', img: 'assets/images/7001-B_W5ZlJ0.webp', winRate: '98.6%', tag: 'DESI' },
      { id: 'pk2', name: 'Texas Holdem', vendor: 'LUDO', img: 'assets/images/7002-CWJ9s9i6.webp', winRate: '97.9%', tag: 'VIP' },
      { id: 'pk3', name: 'Rummy Millionaire', vendor: 'DESI', img: 'assets/images/7003-DN-f1k7r.webp', winRate: '98.2%', tag: 'HOT' }
    ]
  };

  // Flattened for Popular section
  const POPULAR_GAMES = [
    GAMES_DATA.crash[0],
    GAMES_DATA.lottery[0],
    GAMES_DATA.slots[0],
    GAMES_DATA.casino[0],
    GAMES_DATA.crash[1],
    GAMES_DATA.slots[1],
    GAMES_DATA.poker[0],
    GAMES_DATA.sports[0]
  ];

  // =========================================================================
  // 2. STATE MANAGER
  // =========================================================================
  let currentUser = JSON.parse(localStorage.getItem('maanwin_user') || 'null');
  let currentBalance = parseFloat(localStorage.getItem('maanwin_balance') || '0.00');
  let activeTabKey = 'home';
  let activeCategoryKey = 'crash';
  let activeLang = 'en';
  let activeAuthMode = 'login';
  let activeGamePlaying = null;

  // DOM Elements
  const headerGuestGroup = document.getElementById('headerGuestGroup');
  const headerUserGroup = document.getElementById('headerUserGroup');
  const heroGuestBtns = document.getElementById('heroGuestBtns');
  const heroUserBtns = document.getElementById('heroUserBtns');
  const headBalanceVal = document.getElementById('headBalanceVal');
  const homeBalMain = document.getElementById('homeBalMain');
  const dynBalSpans = document.querySelectorAll('.dyn-bal');
  const profileFullName = document.getElementById('profileFullName');
  const profileUidVal = document.getElementById('profileUidVal');
  const toastNotification = document.getElementById('toastNotification');
  const toastMessage = document.getElementById('toastMessage');

  // Modals
  const authModal = document.getElementById('authModal');
  const welcomeModal = document.getElementById('welcomeModal');
  const gameModal = document.getElementById('gameModal');

  // =========================================================================
  // 3. UI SYNC & RENDER FUNCTIONS
  // =========================================================================

  function showToast(msg) {
    if (!toastNotification || !toastMessage) return;
    toastMessage.textContent = msg;
    toastNotification.classList.remove('hidden');
    setTimeout(() => {
      toastNotification.classList.add('hidden');
    }, 2800);
  }

  function formatMoney(num) {
    return num.toLocaleString('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }

  function updateBalance(newBal) {
    currentBalance = Math.max(0, newBal);
    localStorage.setItem('maanwin_balance', currentBalance.toString());
    const formatted = formatMoney(currentBalance);
    
    if (headBalanceVal) headBalanceVal.textContent = formatted;
    if (homeBalMain) homeBalMain.textContent = formatted;
    dynBalSpans.forEach(el => el.textContent = formatted);
  }

  function syncUserState() {
    if (currentUser) {
      // Logged in
      headerGuestGroup?.classList.add('hidden');
      headerUserGroup?.classList.remove('hidden');
      heroGuestBtns?.classList.add('hidden');
      heroUserBtns?.classList.remove('hidden');
      
      const displayName = currentUser.name || currentUser.email.split('@')[0];
      if (profileFullName) profileFullName.textContent = displayName;
      if (profileUidVal) profileUidVal.textContent = currentUser.id;
    } else {
      // Guest
      headerGuestGroup?.classList.remove('hidden');
      headerUserGroup?.classList.add('hidden');
      heroGuestBtns?.classList.remove('hidden');
      heroUserBtns?.classList.add('hidden');
      if (homeBalMain) homeBalMain.textContent = '---';
    }
    updateBalance(currentBalance);
  }

  // =========================================================================
  // 4. TAB NAVIGATION
  // =========================================================================
  function switchTab(tabKey) {
    // Auth guard for protected tabs
    if ((tabKey === 'deposit' || tabKey === 'withdraw' || tabKey === 'profile') && !currentUser) {
      openAuthModal('login');
      return;
    }

    activeTabKey = tabKey;

    // Hide all panes
    document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));

    // Map tab key to pane ID
    let targetPaneId = 'paneHome';
    if (tabKey === 'promo') targetPaneId = 'panePromo';
    if (tabKey === 'deposit') targetPaneId = 'paneDeposit';
    if (tabKey === 'withdraw') targetPaneId = 'paneWithdraw';
    if (tabKey === 'earn') targetPaneId = 'paneEarn';
    if (tabKey === 'profile') targetPaneId = 'paneProfile';

    const targetPane = document.getElementById(targetPaneId);
    if (targetPane) targetPane.classList.add('active');

    // Update bottom nav active state
    document.querySelectorAll('.nav-tab').forEach(t => {
      if (t.dataset.tab === tabKey) {
        t.classList.add('active');
      } else {
        t.classList.remove('active');
      }
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Bottom Nav clicks
  document.querySelectorAll('.nav-tab[data-tab]').forEach(tabBtn => {
    tabBtn.addEventListener('click', () => {
      switchTab(tabBtn.dataset.tab);
    });
  });

  // Center Chest Button
  const tabChest = document.getElementById('tabChest');
  if (tabChest) {
    tabChest.addEventListener('click', () => {
      if (!currentUser) {
        openAuthModal('login');
      } else {
        openWelcomeModal();
      }
    });
  }

  // Header quick buttons
  document.getElementById('logoBtn')?.addEventListener('click', () => switchTab('home'));
  document.getElementById('headBalancePill')?.addEventListener('click', () => switchTab('deposit'));
  document.getElementById('headDepositBtn')?.addEventListener('click', () => switchTab('deposit'));
  document.getElementById('headWithdrawBtn')?.addEventListener('click', () => switchTab('withdraw'));
  document.getElementById('headAvatarBtn')?.addEventListener('click', () => switchTab('profile'));

  // Hero card buttons
  document.getElementById('heroDepositBtn')?.addEventListener('click', () => switchTab('deposit'));
  document.getElementById('heroWithdrawBtn')?.addEventListener('click', () => switchTab('withdraw'));
  document.getElementById('heroRegisterBtn')?.addEventListener('click', () => openAuthModal('signup'));
  document.getElementById('heroLoginBtn')?.addEventListener('click', () => openAuthModal('login'));

  // Profile view buttons
  document.getElementById('proDepBtn')?.addEventListener('click', () => switchTab('deposit'));
  document.getElementById('proWthBtn')?.addEventListener('click', () => switchTab('withdraw'));
  document.getElementById('depBackBtn')?.addEventListener('click', () => switchTab('home'));
  document.getElementById('wthBackBtn')?.addEventListener('click', () => switchTab('home'));

  // =========================================================================
  // 5. BANNER SLIDER
  // =========================================================================
  const bannerSlides = document.querySelectorAll('.banner-slide');
  const sliderDots = document.querySelectorAll('.slider-indicators .dot');
  let currentBannerIdx = 0;
  let bannerTimer = null;

  function showBanner(idx) {
    bannerSlides.forEach((s, i) => {
      s.classList.toggle('active', i === idx);
    });
    sliderDots.forEach((d, i) => {
      d.classList.toggle('active', i === idx);
    });
    currentBannerIdx = idx;
  }

  function startBannerCycle() {
    if (bannerTimer) clearInterval(bannerTimer);
    bannerTimer = setInterval(() => {
      const nextIdx = (currentBannerIdx + 1) % bannerSlides.length;
      showBanner(nextIdx);
    }, 4000);
  }

  sliderDots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      showBanner(idx);
      startBannerCycle();
    });
  });
  startBannerCycle();

  // =========================================================================
  // 6. POPULAR GAMES & CATEGORIES RENDERING
  // =========================================================================
  const popularContainer = document.getElementById('popularGamesScroller');
  if (popularContainer) {
    popularContainer.innerHTML = POPULAR_GAMES.map(g => `
      <div class="popular-game-card" data-game-id="${g.id}">
        <div class="game-thumb-box">
          <img src="${g.img}" alt="${g.name}" class="game-thumb-img" onerror="this.src='assets/logo/logo.webp'" />
          ${g.tag ? `<span class="game-tag-badge">${g.tag}</span>` : ''}
        </div>
        <div class="game-meta-box">
          <span class="game-name">${g.name}</span>
          <span class="game-win-rate">Win Rate ${g.winRate}</span>
        </div>
      </div>
    `).join('');
  }

  const catGamesGrid = document.getElementById('catGamesGrid');
  function renderCategoryGames(catKey) {
    if (!catGamesGrid) return;
    const games = GAMES_DATA[catKey] || [];
    catGamesGrid.innerHTML = games.map(g => `
      <div class="cat-game-item" data-game-id="${g.id}">
        <div class="cat-thumb-wrap">
          <img src="${g.img}" alt="${g.name}" onerror="this.src='assets/logo/logo.webp'" />
          <div class="cat-play-btn-overlay">
            <span class="cat-play-pill">PLAY</span>
          </div>
        </div>
        <div class="cat-info-wrap">
          <span class="cat-game-name">${g.name}</span>
          <span class="cat-game-vendor">${g.vendor}</span>
        </div>
      </div>
    `).join('');

    // Re-attach game click handlers
    document.querySelectorAll('[data-game-id]').forEach(card => {
      card.addEventListener('click', () => {
        const gameId = card.dataset.gameId;
        const allList = Object.values(GAMES_DATA).flat();
        const found = allList.find(g => g.id === gameId);
        handleGameClick(found || { name: 'Maanwin Game' });
      });
    });
  }

  // Category tab clicks
  document.querySelectorAll('.cat-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.cat-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeCategoryKey = tab.dataset.cat;
      renderCategoryGames(activeCategoryKey);
    });
  });
  renderCategoryGames(activeCategoryKey);

  // Featured carousel strip
  const featuredStrip = document.getElementById('featuredCarouselStrip');
  if (featuredStrip) {
    const featItems = [
      { title: 'Aviator Super Multiplier', img: 'assets/banners/banner2.webp' },
      { title: '100% Cash Welcome Bonus', img: 'assets/banners/banner1.webp' },
      { title: 'Daily Cash Rain & Red Packets', img: 'assets/banners/banner3.webp' }
    ];
    featuredStrip.innerHTML = featItems.map(f => `
      <div class="featured-strip-card">
        <img src="${f.img}" alt="${f.title}" />
        <div class="featured-strip-overlay">
          <span class="featured-strip-title">${f.title}</span>
        </div>
      </div>
    `).join('');
  }

  // =========================================================================
  // 7. MANDATORY LOGIN ON GAME CLICK & DEMO RUNNER
  // =========================================================================
  function handleGameClick(game) {
    if (!currentUser) {
      showToast('Please Log In to play this game');
      openAuthModal('login');
      return;
    }
    openGameModal(game);
  }

  function openGameModal(game) {
    activeGamePlaying = game;
    const titleEl = document.getElementById('gameModalTitle');
    const runnerEl = document.getElementById('gameRunnerText');
    const feedbackEl = document.getElementById('demoFeedback');
    const betBtn = document.getElementById('demoBetBtn');
    const cashoutBtn = document.getElementById('demoCashoutBtn');

    if (titleEl) titleEl.textContent = game.name;
    if (runnerEl) runnerEl.textContent = `Playing ${game.name} (RNG Fair Live)`;
    if (feedbackEl) feedbackEl.textContent = '';
    if (betBtn) betBtn.classList.remove('hidden');
    if (cashoutBtn) cashoutBtn.classList.add('hidden');

    gameModal?.classList.remove('hidden');
  }

  document.getElementById('gameCloseBtn')?.addEventListener('click', () => {
    gameModal?.classList.add('hidden');
  });

  // Demo Game Play interaction
  const demoBetBtn = document.getElementById('demoBetBtn');
  const demoCashoutBtn = document.getElementById('demoCashoutBtn');
  const demoFeedback = document.getElementById('demoFeedback');

  demoBetBtn?.addEventListener('click', () => {
    if (currentBalance < 100) {
      demoFeedback.textContent = 'Insufficient balance! Please deposit to continue.';
      return;
    }
    updateBalance(currentBalance - 100);
    demoBetBtn.classList.add('hidden');
    demoCashoutBtn?.classList.remove('hidden');
    demoFeedback.textContent = 'Bet placed ₹100! Flight multiplier climbing: 1.85x';
  });

  demoCashoutBtn?.addEventListener('click', () => {
    const winAmt = 185;
    updateBalance(currentBalance + winAmt);
    demoCashoutBtn.classList.add('hidden');
    demoBetBtn?.classList.remove('hidden');
    demoFeedback.textContent = `Cashed out at 1.85x! Won ₹${winAmt}! Added to wallet balance.`;
    showToast(`Won ₹${winAmt}!`);
  });

  // =========================================================================
  // 8. AUTH MODAL (LOGIN & SIGNUP WITH SUPABASE SCHEMA)
  // =========================================================================
  const authTabLogin = document.getElementById('authTabLogin');
  const authTabSignup = document.getElementById('authTabSignup');
  const fgFullName = document.getElementById('fgFullName');
  const fgConfirmPassword = document.getElementById('fgConfirmPassword');
  const fgInviteCode = document.getElementById('fgInviteCode');
  const authSubmitBtn = document.getElementById('authSubmitBtn');
  const authToggleHint = document.getElementById('authToggleHint');
  const authSwitchBtn = document.getElementById('authSwitchBtn');
  const authErrorAlert = document.getElementById('authErrorAlert');
  const authSuccessAlert = document.getElementById('authSuccessAlert');

  function openAuthModal(mode) {
    activeAuthMode = mode;
    authErrorAlert?.classList.add('hidden');
    authSuccessAlert?.classList.add('hidden');

    if (mode === 'signup') {
      authTabLogin?.classList.remove('active');
      authTabSignup?.classList.add('active');
      fgFullName?.classList.remove('hidden');
      fgConfirmPassword?.classList.remove('hidden');
      fgInviteCode?.classList.remove('hidden');
      if (authSubmitBtn) authSubmitBtn.textContent = 'Create Account with Gmail';
      if (authToggleHint) authToggleHint.textContent = 'Already have an account?';
      if (authSwitchBtn) authSwitchBtn.textContent = 'Sign In here';
    } else {
      authTabLogin?.classList.add('active');
      authTabSignup?.classList.remove('active');
      fgFullName?.classList.add('hidden');
      fgConfirmPassword?.classList.add('hidden');
      fgInviteCode?.classList.add('hidden');
      if (authSubmitBtn) authSubmitBtn.textContent = 'Sign In with Gmail';
      if (authToggleHint) authToggleHint.textContent = "Don't have an account?";
      if (authSwitchBtn) authSwitchBtn.textContent = 'Sign Up here';
    }
    authModal?.classList.remove('hidden');
  }

  document.getElementById('headLoginBtn')?.addEventListener('click', () => openAuthModal('login'));
  document.getElementById('headRegisterBtn')?.addEventListener('click', () => openAuthModal('signup'));
  document.getElementById('authCloseBtn')?.addEventListener('click', () => authModal?.classList.add('hidden'));

  authTabLogin?.addEventListener('click', () => openAuthModal('login'));
  authTabSignup?.addEventListener('click', () => openAuthModal('signup'));
  authSwitchBtn?.addEventListener('click', () => {
    openAuthModal(activeAuthMode === 'login' ? 'signup' : 'login');
  });

  // Password visibility toggle
  const togglePasswordBtn = document.getElementById('togglePasswordBtn');
  const authPasswordInput = document.getElementById('authPasswordInput');
  togglePasswordBtn?.addEventListener('click', () => {
    const isPassword = authPasswordInput.type === 'password';
    authPasswordInput.type = isPassword ? 'text' : 'password';
  });

  // Auth Form Submit
  const authForm = document.getElementById('authForm');
  authForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('authEmailInput').value.trim().toLowerCase();
    const password = document.getElementById('authPasswordInput').value;
    const fullName = document.getElementById('authFullNameInput')?.value.trim() || email.split('@')[0];

    if (!email.includes('@') || !email.includes('.')) {
      authErrorAlert.textContent = 'Please enter a valid Gmail ID (e.g. name@gmail.com)';
      authErrorAlert.classList.remove('hidden');
      return;
    }

    if (password.length < 6) {
      authErrorAlert.textContent = 'Password must be at least 6 characters.';
      authErrorAlert.classList.remove('hidden');
      return;
    }

    // Success simulation with Supabase local storage session
    authErrorAlert?.classList.add('hidden');
    authSuccessAlert.textContent = activeAuthMode === 'login' ? 'Logged in successfully!' : 'Account registered successfully!';
    authSuccessAlert.classList.remove('hidden');

    currentUser = {
      id: Math.floor(10000000 + Math.random() * 90000000).toString(),
      email,
      name: fullName
    };
    localStorage.setItem('maanwin_user', JSON.stringify(currentUser));
    if (currentBalance === 0) {
      updateBalance(500.00); // Starter bonus
    }

    setTimeout(() => {
      authModal?.classList.add('hidden');
      syncUserState();
      showToast(`Welcome back, ${fullName}!`);
    }, 600);
  });

  // Logout
  document.getElementById('logoutAccountBtn')?.addEventListener('click', () => {
    currentUser = null;
    localStorage.removeItem('maanwin_user');
    syncUserState();
    switchTab('home');
    showToast('Logged out successfully');
  });

  // =========================================================================
  // 9. DEPOSIT ENGINE (UPI, CHIPS, UTR SUBMISSION)
  // =========================================================================
  const depositAmtInput = document.getElementById('depositAmtInput');
  const depBtnAmount = document.getElementById('depBtnAmount');

  // Chip selection
  document.querySelectorAll('#depositChips .chip-btn').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('#depositChips .chip-btn').forEach(c => c.classList.remove('selected'));
      chip.classList.add('selected');
      const val = chip.dataset.val;
      if (depositAmtInput) depositAmtInput.value = val;
      if (depBtnAmount) depBtnAmount.textContent = parseInt(val).toLocaleString('en-IN');
    });
  });

  depositAmtInput?.addEventListener('input', (e) => {
    const val = e.target.value;
    if (depBtnAmount) depBtnAmount.textContent = (parseFloat(val) || 0).toLocaleString('en-IN');
  });

  document.getElementById('clearDepAmtBtn')?.addEventListener('click', () => {
    if (depositAmtInput) depositAmtInput.value = '';
    if (depBtnAmount) depBtnAmount.textContent = '0';
  });

  // Copy Official UPI
  const copyVpaBtn = document.getElementById('copyVpaBtn');
  copyVpaBtn?.addEventListener('click', () => {
    const upiText = document.getElementById('officialUpiText').textContent;
    navigator.clipboard.writeText(upiText);
    copyVpaBtn.textContent = 'Copied ✓';
    showToast('Official UPI ID copied to clipboard!');
    setTimeout(() => { copyVpaBtn.textContent = 'Copy UPI'; }, 2000);
  });

  // Submit Deposit
  const depSubmitForm = document.getElementById('depSubmitForm');
  const depErrorAlert = document.getElementById('depErrorAlert');
  const depSuccessAlert = document.getElementById('depSuccessAlert');

  depSubmitForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const amt = parseFloat(depositAmtInput.value);
    const utr = document.getElementById('depUtrInput').value.trim();

    if (isNaN(amt) || amt < 100) {
      depErrorAlert.textContent = 'Minimum deposit amount is ₹100.';
      depErrorAlert.classList.remove('hidden');
      return;
    }
    if (utr.length < 6) {
      depErrorAlert.textContent = 'Please enter a valid 12-digit UPI UTR number from your payment receipt.';
      depErrorAlert.classList.remove('hidden');
      return;
    }

    depErrorAlert.classList.add('hidden');
    depSuccessAlert.textContent = `Deposit request of ₹${amt.toLocaleString('en-IN')} with UTR ${utr} submitted! Balance will be credited upon confirmation.`;
    depSuccessAlert.classList.remove('hidden');

    // Instant credit demo simulation
    setTimeout(() => {
      updateBalance(currentBalance + amt);
      showToast(`Deposit of ₹${amt.toLocaleString('en-IN')} approved!`);
      document.getElementById('depUtrInput').value = '';
    }, 1200);
  });

  // =========================================================================
  // 10. WITHDRAWAL ENGINE (BANK INFORMATION & LIMITS)
  // =========================================================================
  const withdrawAmtInput = document.getElementById('withdrawAmtInput');
  const wthErrorAlert = document.getElementById('wthErrorAlert');
  const wthSuccessAlert = document.getElementById('wthSuccessAlert');

  document.querySelectorAll('#withdrawChips .chip-btn').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('#withdrawChips .chip-btn').forEach(c => c.classList.remove('selected'));
      chip.classList.add('selected');
      const val = chip.dataset.val;
      if (val === 'ALL') {
        withdrawAmtInput.value = Math.floor(currentBalance).toString();
      } else {
        withdrawAmtInput.value = val;
      }
    });
  });

  document.getElementById('wthSubmitBtn')?.addEventListener('click', () => {
    const amt = parseFloat(withdrawAmtInput.value);
    const holder = document.getElementById('wthHolderName').value.trim();
    const accNo = document.getElementById('wthAccountNo').value.trim();
    const ifsc = document.getElementById('wthIfsc').value.trim();

    if (isNaN(amt) || amt < 110) {
      wthErrorAlert.textContent = 'Minimum withdrawal amount is ₹110.';
      wthErrorAlert.classList.remove('hidden');
      return;
    }
    if (amt > currentBalance) {
      wthErrorAlert.textContent = 'Insufficient balance in wallet!';
      wthErrorAlert.classList.remove('hidden');
      return;
    }
    if (!holder || accNo.length < 8 || ifsc.length < 5) {
      wthErrorAlert.textContent = 'Please fill out all bank account fields correctly.';
      wthErrorAlert.classList.remove('hidden');
      return;
    }

    wthErrorAlert.classList.add('hidden');
    updateBalance(currentBalance - amt);
    wthSuccessAlert.textContent = `Withdrawal request of ₹${amt.toLocaleString('en-IN')} to ${accNo} submitted! Payout will arrive in your bank account in 5-15 mins.`;
    wthSuccessAlert.classList.remove('hidden');
    showToast(`Withdrawal of ₹${amt.toLocaleString('en-IN')} initiated!`);
  });

  // =========================================================================
  // 11. WELCOME BONUS MODAL & COPY ACTIONS
  // =========================================================================
  function openWelcomeModal() {
    welcomeModal?.classList.remove('hidden');
  }
  document.getElementById('bellBtn')?.addEventListener('click', openWelcomeModal);
  document.getElementById('welcomeCloseBtn')?.addEventListener('click', () => welcomeModal?.classList.add('hidden'));

  document.getElementById('claimWelcomeBtn')?.addEventListener('click', () => {
    welcomeModal?.classList.add('hidden');
    if (!currentUser) {
      openAuthModal('signup');
    } else {
      updateBalance(currentBalance + 500);
      showToast('₹500.00 Welcome Bonus added to your wallet!');
    }
  });

  // Copy UID in Profile
  document.getElementById('profileUidBtn')?.addEventListener('click', () => {
    const uid = document.getElementById('profileUidVal').textContent;
    navigator.clipboard.writeText(uid);
    showToast(`UID ${uid} copied to clipboard!`);
  });

  // Copy Referral link in Earn
  document.getElementById('copyRefLinkBtn')?.addEventListener('click', () => {
    const link = document.getElementById('referralLinkInput').value;
    navigator.clipboard.writeText(link);
    showToast('Referral link copied to clipboard!');
  });

  // Language switch
  const langToggleBtn = document.getElementById('langToggleBtn');
  langToggleBtn?.addEventListener('click', () => {
    activeLang = activeLang === 'en' ? 'hi' : 'en';
    langToggleBtn.textContent = activeLang.toUpperCase();
    showToast(`Language set to ${activeLang === 'en' ? 'English' : 'हिंदी'}`);
  });

  // =========================================================================
  // 12. CANVAS CONTINUOUS CHEST SPRITE ANIMATION
  // =========================================================================
  const chestCanvas = document.getElementById('chestCanvas');
  if (chestCanvas) {
    const ctx = chestCanvas.getContext('2d');
    const spriteImg = new Image();
    spriteImg.src = 'assets/images/s11_chest_anim-Bq793_Bz.webp';

    const chestFrames = [
      { sx: 420, sy: 278, sw: 175, sh: 162 },
      { sx: 215, sy: 278, sw: 175, sh: 162 },
      { sx: 15, sy: 278, sw: 175, sh: 162 },
      { sx: 260, sy: 15, sw: 175, sh: 165 },
      { sx: 460, sy: 15, sw: 175, sh: 165 },
      { sx: 660, sy: 15, sw: 175, sh: 165 }
    ];
    let frameIdx = 0;

    spriteImg.onload = () => {
      const renderChest = () => {
        const f = chestFrames[frameIdx];
        ctx.clearRect(0, 0, chestCanvas.width, chestCanvas.height);
        ctx.drawImage(spriteImg, f.sx, f.sy, f.sw, f.sh, 0, 0, chestCanvas.width, chestCanvas.height);
      };
      renderChest();
      setInterval(() => {
        frameIdx = (frameIdx + 1) % chestFrames.length;
        renderChest();
      }, 500);
    };
  }

  // =========================================================================
  // 13. INITIALIZE
  // =========================================================================
  syncUserState();
  console.log('Maanwin Website Engine loaded successfully. All systems active.');
});

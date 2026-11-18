// ==========================================================================
// MAANWIN - SUPABASE AUTHENTICATION JAVASCRIPT
// Handles Login, Signup, Forgot Password, and Dashboard state using Supabase
// ==========================================================================

const SUPABASE_URL = 'https://serszarrdzwfaiojaops.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNlcnN6YXJyZHp3ZmFpb2phb3BzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTQ3OTY4NzgsImV4cCI6MjExMDM3Mjg3OH0.Ju1lywLF35g2qgrF-8OEt9zeZq0p38hCBViudKbuqRY';

// Initialize Supabase Client
const supabase = window.supabase ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;

// DOM Elements
const loadingScreen = document.getElementById('loadingScreen');
const authWrapper = document.getElementById('authWrapper');
const dashboardContainer = document.getElementById('dashboardContainer');

// Tabs & Header
const tabContainer = document.getElementById('tabContainer');
const tabLoginBtn = document.getElementById('tabLoginBtn');
const tabSignupBtn = document.getElementById('tabSignupBtn');
const authSubtitle = document.getElementById('authSubtitle');

// Alerts
const alertError = document.getElementById('alertError');
const alertErrorText = document.getElementById('alertErrorText');
const alertSuccess = document.getElementById('alertSuccess');
const alertSuccessText = document.getElementById('alertSuccessText');

// Form & Inputs
const authForm = document.getElementById('authForm');
const nameGroup = document.getElementById('nameGroup');
const fullNameInput = document.getElementById('fullName');
const emailInput = document.getElementById('email');
const passGroup = document.getElementById('passGroup');
const passwordInput = document.getElementById('password');
const confirmPassGroup = document.getElementById('confirmPassGroup');
const confirmPasswordInput = document.getElementById('confirmPassword');
const togglePassBtn = document.getElementById('togglePassBtn');
const forgotPassBtn = document.getElementById('forgotPassBtn');
const backToLoginBtn = document.getElementById('backToLoginBtn');

// Submit button & Footer
const submitBtn = document.getElementById('submitBtn');
const btnContent = document.getElementById('btnContent');
const btnText = document.getElementById('btnText');
const btnSpinner = document.getElementById('btnSpinner');
const authFooter = document.getElementById('authFooter');
const footerText = document.getElementById('footerText');
const footerSwitchBtn = document.getElementById('footerSwitchBtn');

// Dashboard Elements
const dashUserEmail = document.getElementById('dashUserEmail');
const dashWelcomeTitle = document.getElementById('dashWelcomeTitle');
const dashFullName = document.getElementById('dashFullName');
const dashEmail = document.getElementById('dashEmail');
const dashUserId = document.getElementById('dashUserId');
const dashRole = document.getElementById('dashRole');
const logoutBtn = document.getElementById('logoutBtn');

// Current Mode: 'login' | 'signup' | 'forgot'
let currentMode = 'login';
let showPassword = false;

// Helpers
function hideAlerts() {
  alertError.classList.add('hidden');
  alertSuccess.classList.add('hidden');
}

function showError(msg) {
  hideAlerts();
  alertErrorText.textContent = msg;
  alertError.classList.remove('hidden');
}

function showSuccess(msg) {
  hideAlerts();
  alertSuccessText.textContent = msg;
  alertSuccess.classList.remove('hidden');
}

function setBtnLoading(isLoading) {
  submitBtn.disabled = isLoading;
  if (isLoading) {
    btnContent.classList.add('hidden');
    btnSpinner.classList.remove('hidden');
  } else {
    btnContent.classList.remove('hidden');
    btnSpinner.classList.add('hidden');
  }
}

// Mode Switcher
function switchMode(mode) {
  currentMode = mode;
  hideAlerts();

  if (mode === 'login') {
    authSubtitle.textContent = 'Sign in to access your account';
    tabContainer.classList.remove('hidden');
    tabLoginBtn.classList.add('active');
    tabSignupBtn.classList.remove('active');
    nameGroup.classList.add('hidden');
    passGroup.classList.remove('hidden');
    confirmPassGroup.classList.add('hidden');
    backToLoginBtn.classList.add('hidden');
    btnText.textContent = 'Sign In';
    authFooter.classList.remove('hidden');
    footerText.innerHTML = `Don't have an account yet? <button type="button" class="link-bold" id="footerSwitchBtn">Sign up</button>`;
    document.getElementById('footerSwitchBtn').addEventListener('click', () => switchMode('signup'));
  } else if (mode === 'signup') {
    authSubtitle.textContent = 'Create a new account to get started';
    tabContainer.classList.remove('hidden');
    tabLoginBtn.classList.remove('active');
    tabSignupBtn.classList.add('active');
    nameGroup.classList.remove('hidden');
    passGroup.classList.remove('hidden');
    confirmPassGroup.classList.remove('hidden');
    backToLoginBtn.classList.add('hidden');
    btnText.textContent = 'Create Account';
    authFooter.classList.remove('hidden');
    footerText.innerHTML = `Already have an account? <button type="button" class="link-bold" id="footerSwitchBtn">Sign in</button>`;
    document.getElementById('footerSwitchBtn').addEventListener('click', () => switchMode('login'));
  } else if (mode === 'forgot') {
    authSubtitle.textContent = 'Reset your password via email';
    tabContainer.classList.add('hidden');
    nameGroup.classList.add('hidden');
    passGroup.classList.add('hidden');
    confirmPassGroup.classList.add('hidden');
    backToLoginBtn.classList.remove('hidden');
    btnText.textContent = 'Send Reset Link';
    authFooter.classList.add('hidden');
  }
}

// Render Dashboard when logged in
function showDashboard(user) {
  loadingScreen.classList.add('hidden');
  authWrapper.classList.add('hidden');
  dashboardContainer.classList.remove('hidden');

  const name = user.user_metadata?.full_name || user.user_metadata?.display_name || 'Member';
  dashUserEmail.textContent = user.email || 'N/A';
  dashWelcomeTitle.textContent = `Welcome back, ${name}! 👋`;
  dashFullName.textContent = name;
  dashEmail.textContent = user.email || 'N/A';
  dashUserId.textContent = user.id || 'N/A';
  dashRole.textContent = user.role || 'authenticated';
}

// Render Auth Form when logged out
function showAuth() {
  loadingScreen.classList.add('hidden');
  dashboardContainer.classList.add('hidden');
  authWrapper.classList.remove('hidden');
  switchMode('login');
}

// Check initial session
async function initAuth() {
  if (!supabase) {
    showError('Supabase client failed to initialize. Please check network connection.');
    loadingScreen.classList.add('hidden');
    authWrapper.classList.remove('hidden');
    return;
  }

  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (session && session.user) {
      showDashboard(session.user);
    } else {
      showAuth();
    }
  } catch (err) {
    console.error('Session error:', err);
    showAuth();
  }

  // Subscribe to auth changes
  supabase.auth.onAuthStateChange((_event, session) => {
    if (session && session.user) {
      showDashboard(session.user);
    } else {
      showAuth();
    }
  });
}

// Event Listeners
tabLoginBtn.addEventListener('click', () => switchMode('login'));
tabSignupBtn.addEventListener('click', () => switchMode('signup'));
footerSwitchBtn.addEventListener('click', () => switchMode('signup'));
forgotPassBtn.addEventListener('click', () => switchMode('forgot'));
backToLoginBtn.addEventListener('click', () => switchMode('login'));

// Password toggle
togglePassBtn.addEventListener('click', () => {
  showPassword = !showPassword;
  passwordInput.type = showPassword ? 'text' : 'password';
  if (confirmPasswordInput) confirmPasswordInput.type = showPassword ? 'text' : 'password';
});

// Logout
logoutBtn.addEventListener('click', async () => {
  try {
    await supabase.auth.signOut();
    showAuth();
  } catch (err) {
    console.error('Logout error:', err);
  }
});

// Submit Form Handler
authForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  hideAlerts();

  const email = emailInput.value.trim();
  const password = passwordInput.value;

  if (currentMode === 'login') {
    setBtnLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        showError(error.message);
      } else if (data.user) {
        showDashboard(data.user);
      }
    } catch (err) {
      showError(err.message || 'Login failed. Please try again.');
    } finally {
      setBtnLoading(false);
    }
  } else if (currentMode === 'signup') {
    const fullName = fullNameInput.value.trim();
    const confirmPassword = confirmPasswordInput.value;

    if (password.length < 6) {
      showError('Password must be at least 6 characters long.');
      return;
    }
    if (password !== confirmPassword) {
      showError('Passwords do not match.');
      return;
    }

    setBtnLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            display_name: fullName || email.split('@')[0]
          }
        }
      });

      if (error) {
        showError(error.message);
      } else if (data.user) {
        if (data.session) {
          showSuccess('Account created and signed in successfully!');
          showDashboard(data.user);
        } else {
          showSuccess('Account created! Please check your email inbox to confirm your email before signing in.');
        }
      }
    } catch (err) {
      showError(err.message || 'Signup failed. Please try again.');
    } finally {
      setBtnLoading(false);
    }
  } else if (currentMode === 'forgot') {
    setBtnLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin
      });
      if (error) {
        showError(error.message);
      } else {
        showSuccess('Password reset link has been sent to your email.');
      }
    } catch (err) {
      showError(err.message || 'Failed to send reset link.');
    } finally {
      setBtnLoading(false);
    }
  }
});

// Start initialization
initAuth();

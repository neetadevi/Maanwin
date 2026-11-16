import { useState, type FormEvent } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { getAssetUrl } from '../utils/assetUrl';
import { 
  X, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  User,
  Gift,
  ShieldCheck,
  KeyRound
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  initialMode: 'login' | 'signup';
  onClose: () => void;
}

export function AuthModal({ isOpen, initialMode, onClose }: AuthModalProps) {
  const { refreshSession } = useAuth();
  const [mode, setMode] = useState<'login' | 'signup' | 'forgot'>(initialMode);
  
  // Clean Gmail / Email & Password fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [inviteCode, setInviteCode] = useState('MAANWIN');

  // UI state
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const resetMessages = () => {
    setErrorMsg(null);
    setSuccessMsg(null);
  };

  const switchMode = (m: 'login' | 'signup' | 'forgot') => {
    resetMessages();
    setMode(m);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    resetMessages();
    setLoading(true);

    const cleanEmail = email.trim().toLowerCase();

    // Validate email format
    if (!cleanEmail || !cleanEmail.includes('@') || !cleanEmail.includes('.')) {
      setErrorMsg('Please enter a valid Gmail / Email address (e.g. name@gmail.com)');
      setLoading(false);
      return;
    }

    try {
      if (mode === 'login') {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password: password,
        });

        if (error) {
          if (error.message.toLowerCase().includes('invalid login credentials')) {
            setErrorMsg('Incorrect Gmail ID or Password. Please try again.');
          } else {
            setErrorMsg(error.message);
          }
        } else if (data.session) {
          setSuccessMsg('Logged in successfully! Welcome back.');
          await refreshSession();
          setTimeout(() => {
            onClose();
          }, 600);
        }
      } else if (mode === 'signup') {
        if (password.length < 6) {
          setErrorMsg('Password must be at least 6 characters long.');
          setLoading(false);
          return;
        }

        if (password !== confirmPassword) {
          setErrorMsg('Passwords do not match. Please re-enter.');
          setLoading(false);
          return;
        }

        const displayName = fullName.trim() || cleanEmail.split('@')[0];

        const { data, error } = await supabase.auth.signUp({
          email: cleanEmail,
          password: password,
          options: {
            data: {
              full_name: displayName,
              display_name: displayName,
              invite_code: inviteCode.trim() || 'MAANWIN',
            },
          },
        });

        if (error) {
          if (error.message.toLowerCase().includes('user already registered')) {
            setErrorMsg('This Gmail ID is already registered! Please switch to Sign In.');
          } else {
            setErrorMsg(error.message);
          }
        } else if (data.user) {
          if (data.session) {
            setSuccessMsg('Account created successfully! Logging you in...');
            await refreshSession();
            setTimeout(() => {
              onClose();
            }, 800);
          } else {
            setSuccessMsg('Account created successfully! You can now log in.');
            setMode('login');
          }
        }
      } else if (mode === 'forgot') {
        const { error } = await supabase.auth.resetPasswordForEmail(cleanEmail, {
          redirectTo: window.location.origin + window.location.pathname,
        });

        if (error) {
          setErrorMsg(error.message);
        } else {
          setSuccessMsg('Password reset instructions sent to your Gmail ID!');
        }
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMsg(err.message);
      } else {
        setErrorMsg('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-dialog-box" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button type="button" className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        {/* Modal Brand Logo */}
        <div className="modal-header-logo">
          <img
            src={getAssetUrl('images/login-logo.webp')}
            alt="Maanwin"
            className="modal-logo-img"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = getAssetUrl('images/logo.webp');
            }}
          />
        </div>

        {/* Tabs: Sign In / Register */}
        {mode !== 'forgot' && (
          <div className="modal-tab-row">
            <button
              type="button"
              className={`modal-tab ${mode === 'login' ? 'active' : ''}`}
              onClick={() => switchMode('login')}
            >
              Sign In
            </button>
            <button
              type="button"
              className={`modal-tab ${mode === 'signup' ? 'active' : ''}`}
              onClick={() => switchMode('signup')}
            >
              Sign Up
            </button>
          </div>
        )}

        {/* Alerts */}
        {errorMsg && (
          <div className="modal-alert alert-error">
            <AlertCircle size={16} />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="modal-alert alert-success">
            <CheckCircle2 size={16} />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="modal-auth-form">
          {mode === 'signup' && (
            <div className="form-group-standard">
              <label htmlFor="auth-fullname">Full Name</label>
              <div className="standard-input-row">
                <User size={16} className="field-icon" />
                <input
                  id="auth-fullname"
                  type="text"
                  placeholder="Enter your name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  autoComplete="name"
                />
              </div>
            </div>
          )}

          <div className="form-group-standard">
            <label htmlFor="auth-email">Gmail / Email ID</label>
            <div className="standard-input-row">
              <Mail size={16} className="field-icon" />
              <input
                id="auth-email"
                type="email"
                required
                placeholder="yourname@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                autoFocus
              />
            </div>
          </div>

          {mode !== 'forgot' && (
            <div className="form-group-standard">
              <div className="label-row-between">
                <label htmlFor="auth-password">Password</label>
                {mode === 'login' && (
                  <button
                    type="button"
                    className="forgot-password-link"
                    onClick={() => switchMode('forgot')}
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="standard-input-row">
                <Lock size={16} className="field-icon" />
                <input
                  id="auth-password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                />
                <button
                  type="button"
                  className="eye-toggle-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
          )}

          {mode === 'signup' && (
            <>
              <div className="form-group-standard">
                <label htmlFor="auth-confirm-password">Confirm Password</label>
                <div className="standard-input-row">
                  <KeyRound size={16} className="field-icon" />
                  <input
                    id="auth-confirm-password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    autoComplete="new-password"
                  />
                </div>
              </div>

              <div className="form-group-standard">
                <label htmlFor="auth-invite-code">Invitation Code (Optional)</label>
                <div className="standard-input-row">
                  <Gift size={16} className="field-icon" />
                  <input
                    id="auth-invite-code"
                    type="text"
                    placeholder="MAANWIN"
                    value={inviteCode}
                    onChange={(e) => setInviteCode(e.target.value)}
                  />
                </div>
              </div>

              <div className="privacy-check-row">
                <ShieldCheck size={16} className="check-icon" />
                <span>By signing up, you agree to 18+ Responsible Gaming and Privacy Terms.</span>
              </div>
            </>
          )}

          <button
            type="submit"
            className="btn-modal-submit"
            disabled={loading}
          >
            {loading ? (
              <span className="submit-loading-text">Connecting to Supabase...</span>
            ) : (
              <span className="submit-content">
                <span>
                  {mode === 'login' && 'Sign In with Gmail'}
                  {mode === 'signup' && 'Create Account with Gmail'}
                  {mode === 'forgot' && 'Send Reset Link to Gmail'}
                </span>
                <ArrowRight size={16} />
              </span>
            )}
          </button>

          {mode === 'forgot' && (
            <button
              type="button"
              className="btn-modal-back"
              onClick={() => switchMode('login')}
            >
              Back to Sign In
            </button>
          )}
        </form>

        <div className="modal-footer-hint">
          {mode === 'login' ? (
            <p>
              Don't have an account?{' '}
              <button
                type="button"
                className="link-switch"
                onClick={() => switchMode('signup')}
              >
                Sign Up here
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <button
                type="button"
                className="link-switch"
                onClick={() => switchMode('login')}
              >
                Sign In here
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

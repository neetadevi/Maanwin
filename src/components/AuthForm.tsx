import { useState, type FormEvent } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { 
  Mail, 
  Lock, 
  User as UserIcon, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle,
  KeyRound,
  ShieldCheck,
  Sparkles
} from 'lucide-react';

type Mode = 'login' | 'signup' | 'forgot_password';

export function AuthForm() {
  const { refreshSession } = useAuth();
  const [mode, setMode] = useState<Mode>('login');
  
  // Fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // UI states
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const resetForm = () => {
    setErrorMsg(null);
    setSuccessMsg(null);
  };

  const handleModeSwitch = (newMode: Mode) => {
    resetForm();
    setMode(newMode);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    resetForm();
    setLoading(true);

    try {
      if (mode === 'login') {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });

        if (error) {
          setErrorMsg(error.message);
        } else if (data.session) {
          await refreshSession();
        }
      } else if (mode === 'signup') {
        if (password.length < 6) {
          setErrorMsg('Password must be at least 6 characters long.');
          setLoading(false);
          return;
        }

        if (password !== confirmPassword) {
          setErrorMsg('Passwords do not match.');
          setLoading(false);
          return;
        }

        const { data, error } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: {
            data: {
              full_name: fullName.trim(),
              display_name: fullName.trim() || email.split('@')[0],
            },
          },
        });

        if (error) {
          setErrorMsg(error.message);
        } else if (data.user) {
          if (data.session) {
            setSuccessMsg('Account created and signed in successfully!');
            await refreshSession();
          } else {
            setSuccessMsg(
              'Account created! Please check your email inbox to confirm your email address before logging in.'
            );
          }
        }
      } else if (mode === 'forgot_password') {
        const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
          redirectTo: window.location.origin,
        });

        if (error) {
          setErrorMsg(error.message);
        } else {
          setSuccessMsg('Password reset instructions have been sent to your email.');
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
    <div className="auth-wrapper">
      <div className="auth-card">
        {/* Brand Header */}
        <div className="auth-header">
          <div className="auth-logo-badge">
            <Sparkles className="badge-icon" />
          </div>
          <h1 className="auth-title">Maanwin</h1>
          <p className="auth-subtitle">
            {mode === 'login' && 'Sign in to access your account'}
            {mode === 'signup' && 'Create a new account to get started'}
            {mode === 'forgot_password' && 'Reset your password via email'}
          </p>
        </div>

      {/* Switcher Tabs */}
      {mode !== 'forgot_password' && (
        <div className="tab-pill-container">
          <button
            type="button"
            className={`tab-pill ${mode === 'login' ? 'active' : ''}`}
            onClick={() => handleModeSwitch('login')}
          >
            Sign In
          </button>
          <button
            type="button"
            className={`tab-pill ${mode === 'signup' ? 'active' : ''}`}
            onClick={() => handleModeSwitch('signup')}
          >
            Create Account
          </button>
        </div>
      )}

      {/* Feedback Messages */}
      {errorMsg && (
        <div className="alert alert-error">
          <AlertCircle className="alert-icon" />
          <span>{errorMsg}</span>
        </div>
      )}

      {successMsg && (
        <div className="alert alert-success">
          <CheckCircle2 className="alert-icon" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="auth-form">
        {mode === 'signup' && (
          <div className="input-group">
            <label htmlFor="fullname">Full Name</label>
            <div className="input-wrapper">
              <UserIcon className="input-icon" size={18} />
              <input
                id="fullname"
                type="text"
                required
                placeholder="Neeta Devi"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                autoComplete="name"
              />
            </div>
          </div>
        )}

        <div className="input-group">
          <label htmlFor="email">Email Address</label>
          <div className="input-wrapper">
            <Mail className="input-icon" size={18} />
            <input
              id="email"
              type="email"
              required
              placeholder="you@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>
        </div>

        {mode !== 'forgot_password' && (
          <div className="input-group">
            <div className="label-row">
              <label htmlFor="password">Password</label>
              {mode === 'login' && (
                <button
                  type="button"
                  className="link-subtle"
                  onClick={() => handleModeSwitch('forgot_password')}
                >
                  Forgot password?
                </button>
              )}
            </div>
            <div className="input-wrapper">
              <Lock className="input-icon" size={18} />
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
              />
              <button
                type="button"
                className="icon-button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
        )}

        {mode === 'signup' && (
          <div className="input-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="input-wrapper">
              <KeyRound className="input-icon" size={18} />
              <input
                id="confirmPassword"
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="new-password"
              />
            </div>
            {password && confirmPassword && password !== confirmPassword && (
              <span className="helper-hint error">Passwords do not match</span>
            )}
          </div>
        )}

        {mode === 'signup' && (
          <div className="password-requirements">
            <div className="requirement-item">
              <ShieldCheck size={14} className={password.length >= 6 ? 'req-met' : 'req-unmet'} />
              <span>At least 6 characters</span>
            </div>
          </div>
        )}

        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? (
            <span className="spinner-wrap">
              <span className="spinner" />
              <span>Processing...</span>
            </span>
          ) : (
            <span className="btn-content">
              <span>
                {mode === 'login' && 'Sign In'}
                {mode === 'signup' && 'Create Free Account'}
                {mode === 'forgot_password' && 'Send Reset Link'}
              </span>
              <ArrowRight size={18} />
            </span>
          )}
        </button>

        {mode === 'forgot_password' && (
          <button
            type="button"
            className="btn-secondary"
            onClick={() => handleModeSwitch('login')}
          >
            Back to Sign In
          </button>
        )}
      </form>

      {/* Footer Switcher */}
      <div className="auth-footer">
        {mode === 'login' && (
          <p>
            Don't have an account yet?{' '}
            <button
              type="button"
              className="link-bold"
              onClick={() => handleModeSwitch('signup')}
            >
              Sign up
            </button>
          </p>
        )}
        {mode === 'signup' && (
          <p>
            Already have an account?{' '}
            <button
              type="button"
              className="link-bold"
              onClick={() => handleModeSwitch('login')}
            >
              Sign in
            </button>
          </p>
        )}
      </div>

      <div className="backend-badge">
        <span className="status-dot"></span>
        <span>Connected with Supabase</span>
      </div>
    </div>
  </div>
  );
}

import { useState, type FormEvent } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { getAssetUrl } from '../utils/assetUrl';
import { 
  X, 
  Phone, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  Gift,
  ShieldCheck,
  Mail
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  initialMode: 'login' | 'signup';
  onClose: () => void;
}

export function AuthModal({ isOpen, initialMode, onClose }: AuthModalProps) {
  const { refreshSession } = useAuth();
  const [mode, setMode] = useState<'login' | 'signup' | 'forgot'>(initialMode);
  
  // Login type: 'mobile' or 'email'
  const [loginMethod, setLoginMethod] = useState<'mobile' | 'email'>('mobile');
  
  // Fields
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [inviteCode, setInviteCode] = useState('MAANWIN');
  const [fullName, setFullName] = useState('');

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

    try {
      // Form effective email: if user entered mobile number, format as mobile@maanwin.com for Supabase Auth
      let authEmail = email.trim();
      if (loginMethod === 'mobile') {
        const cleanPhone = mobileNumber.replace(/\D/g, '');
        if (cleanPhone.length < 10) {
          setErrorMsg('Please enter a valid 10-digit mobile number');
          setLoading(false);
          return;
        }
        authEmail = `${cleanPhone}@maanwin.com`;
      }

      if (mode === 'login') {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: authEmail,
          password: password
        });

        if (error) {
          setErrorMsg(error.message);
        } else if (data.session) {
          await refreshSession();
          onClose();
        }
      } else if (mode === 'signup') {
        if (password.length < 6) {
          setErrorMsg('Password must be at least 6 characters long');
          setLoading(false);
          return;
        }

        if (password !== confirmPassword) {
          setErrorMsg('Passwords do not match');
          setLoading(false);
          return;
        }

        const { data, error } = await supabase.auth.signUp({
          email: authEmail,
          password: password,
          options: {
            data: {
              phone: mobileNumber.trim(),
              full_name: fullName.trim() || `User_${mobileNumber.slice(-4)}`,
              invite_code: inviteCode.trim()
            }
          }
        });

        if (error) {
          setErrorMsg(error.message);
        } else if (data.user) {
          if (data.session) {
            setSuccessMsg('Account registered successfully! Logging you in...');
            await refreshSession();
            setTimeout(() => onClose(), 800);
          } else {
            setSuccessMsg('Account created successfully! Please log in.');
            setMode('login');
          }
        }
      } else if (mode === 'forgot') {
        const { error } = await supabase.auth.resetPasswordForEmail(authEmail);
        if (error) {
          setErrorMsg(error.message);
        } else {
          setSuccessMsg('Password reset instructions sent!');
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
        <button type="button" className="modal-close-btn" onClick={onClose}>
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
              Register
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

        {/* Method Toggle: Mobile or Email */}
        {mode !== 'forgot' && (
          <div className="login-method-row">
            <button
              type="button"
              className={`method-toggle ${loginMethod === 'mobile' ? 'active' : ''}`}
              onClick={() => setLoginMethod('mobile')}
            >
              <Phone size={14} />
              <span>Mobile Phone</span>
            </button>
            <button
              type="button"
              className={`method-toggle ${loginMethod === 'email' ? 'active' : ''}`}
              onClick={() => setLoginMethod('email')}
            >
              <Mail size={14} />
              <span>Email</span>
            </button>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="modal-auth-form">
          {loginMethod === 'mobile' ? (
            <div className="form-group-phone">
              <label>Phone Number</label>
              <div className="phone-input-row">
                <span className="country-code-pill">+91</span>
                <input
                  type="tel"
                  required
                  placeholder="Enter 10-digit number"
                  maxLength={10}
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
                />
              </div>
            </div>
          ) : (
            <div className="form-group-standard">
              <label>Email Address</label>
              <div className="standard-input-row">
                <Mail size={16} className="field-icon" />
                <input
                  type="email"
                  required
                  placeholder="Enter email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
          )}

          {mode === 'signup' && (
            <div className="form-group-standard">
              <label>Full Name</label>
              <div className="standard-input-row">
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
            </div>
          )}

          {mode !== 'forgot' && (
            <div className="form-group-standard">
              <div className="label-row-between">
                <label>Password</label>
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
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="eye-toggle-btn"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
          )}

          {mode === 'signup' && (
            <>
              <div className="form-group-standard">
                <label>Confirm Password</label>
                <div className="standard-input-row">
                  <Lock size={16} className="field-icon" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group-standard">
                <label>Invite Code</label>
                <div className="standard-input-row">
                  <Gift size={16} className="field-icon" />
                  <input
                    type="text"
                    placeholder="Enter referral code"
                    value={inviteCode}
                    onChange={(e) => setInviteCode(e.target.value)}
                  />
                </div>
              </div>

              <div className="privacy-check-row">
                <ShieldCheck size={16} className="check-icon" />
                <span>I have read and agree to the User Agreement and Privacy Policy</span>
              </div>
            </>
          )}

          <button
            type="submit"
            className="btn-modal-submit"
            disabled={loading}
          >
            {loading ? (
              <span className="submit-loading-text">Processing...</span>
            ) : (
              <span className="submit-content">
                <span>
                  {mode === 'login' && 'Log In'}
                  {mode === 'signup' && 'Register Now'}
                  {mode === 'forgot' && 'Send Reset Link'}
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
      </div>
    </div>
  );
}

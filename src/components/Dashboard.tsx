import { useAuth } from '../context/AuthContext';
import { 
  LogOut, 
  User, 
  Mail, 
  Shield, 
  Calendar, 
  Database, 
  CheckCircle, 
  Sparkles,
  KeyRound
} from 'lucide-react';

export function Dashboard() {
  const { user, signOut, loading } = useAuth();

  const fullName = user?.user_metadata?.full_name || user?.user_metadata?.display_name || 'Member';
  const email = user?.email || 'N/A';
  const userId = user?.id || 'N/A';
  const createdAt = user?.created_at ? new Date(user.created_at).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }) : 'N/A';
  const lastSignIn = user?.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleString() : 'Just now';

  return (
    <div className="dashboard-container">
      {/* Top Navbar */}
      <header className="dash-nav">
        <div className="dash-brand">
          <div className="dash-logo">
            <Sparkles size={20} />
          </div>
          <span className="brand-name">Maanwin</span>
        </div>

        <div className="nav-user-actions">
          <div className="user-badge-mini">
            <User size={16} />
            <span>{email}</span>
          </div>
          <button
            type="button"
            className="btn-logout"
            onClick={signOut}
            disabled={loading}
          >
            <LogOut size={16} />
            <span>Log Out</span>
          </button>
        </div>
      </header>

      {/* Main Dashboard Content */}
      <main className="dash-main">
        <div className="welcome-banner">
          <div className="welcome-text">
            <h2>Welcome back, {fullName}! 👋</h2>
            <p>You have successfully logged in via Supabase Authentication.</p>
          </div>
          <div className="status-badge">
            <CheckCircle size={16} />
            <span>Supabase Connected</span>
          </div>
        </div>

        {/* Info Grid */}
        <div className="info-grid">
          {/* User Details Card */}
          <div className="info-card">
            <div className="card-header">
              <User className="card-icon" />
              <h3>User Profile</h3>
            </div>
            <div className="card-body">
              <div className="detail-row">
                <span className="detail-label">Full Name:</span>
                <span className="detail-value">{fullName}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label"><Mail size={14} className="inline-icon" /> Email:</span>
                <span className="detail-value">{email}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label"><KeyRound size={14} className="inline-icon" /> User ID:</span>
                <span className="detail-value mono-text">{userId}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label"><Calendar size={14} className="inline-icon" /> Joined:</span>
                <span className="detail-value">{createdAt}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Last Sign In:</span>
                <span className="detail-value">{lastSignIn}</span>
              </div>
            </div>
          </div>

          {/* Supabase Integration Details */}
          <div className="info-card">
            <div className="card-header">
              <Database className="card-icon" />
              <h3>Supabase Backend Status</h3>
            </div>
            <div className="card-body">
              <div className="detail-row">
                <span className="detail-label">Project ID:</span>
                <span className="detail-value mono-text">serszarrdzwfaiojaops</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Auth Provider:</span>
                <span className="detail-value">Email / Password</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Session Status:</span>
                <span className="badge-active">Active (JWT Valid)</span>
              </div>
              <div className="detail-row">
                <span className="detail-label"><Shield size={14} className="inline-icon" /> Role:</span>
                <span className="detail-value">{user?.role || 'authenticated'}</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

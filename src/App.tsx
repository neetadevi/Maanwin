import { useAuth } from './context/AuthContext';
import { AuthForm } from './components/AuthForm';
import { Dashboard } from './components/Dashboard';

function AppContent() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="loader-screen">
        <div className="spinner-large" />
        <p>Connecting to Supabase...</p>
      </div>
    );
  }

  if (user) {
    return <Dashboard />;
  }

  return (
    <div className="auth-page-container">
      <div className="ambient-background" />
      <AuthForm />
    </div>
  );
}

export function App() {
  return <AppContent />;
}

export default App;

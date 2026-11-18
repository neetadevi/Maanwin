import { useState, useEffect } from 'react';
import { useAuth } from './context/AuthContext';
import { AuthForm } from './components/AuthForm';
import { Dashboard } from './components/Dashboard';
import { AdminPanel } from './components/AdminPanel';

export default function App() {
  const { user, loading } = useAuth();
  const [isAdminRoute, setIsAdminRoute] = useState<boolean>(() => {
    return window.location.hash.toLowerCase().includes('admin');
  });

  useEffect(() => {
    const handleHashChange = () => {
      setIsAdminRoute(window.location.hash.toLowerCase().includes('admin'));
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner-large" />
        <p>Connecting to Supabase...</p>
      </div>
    );
  }

  if (isAdminRoute) {
    return (
      <AdminPanel
        onBackToSite={() => {
          window.location.hash = '';
          setIsAdminRoute(false);
        }}
      />
    );
  }

  return (
    <div className="app-root">
      {user ? <Dashboard /> : <AuthForm />}
    </div>
  );
}

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AuthProvider } from './context/AuthContext';
import { AdminConfigProvider } from './context/AdminConfigContext';
import App from './App';
import './index.css';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Root element not found');

createRoot(rootElement).render(
  <StrictMode>
    <AuthProvider>
      <AdminConfigProvider>
        <App />
      </AdminConfigProvider>
    </AuthProvider>
  </StrictMode>
);

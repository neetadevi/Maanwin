import { getAssetUrl } from '../utils/assetUrl';
import { useAdminConfig } from '../context/AdminConfigContext';
import { Send, MessageCircle, ShieldAlert, Lock, CheckCircle2 } from 'lucide-react';

export function Footer() {
  const { config } = useAdminConfig();

  return (
    <footer className="site-footer">
      {/* Official Community Channels */}
      <div className="community-banner">
        <div className="community-text">
          <h3>Join Official Maanwin Community</h3>
          <p>Get daily gift codes, predictions, and 24/7 priority customer support!</p>
        </div>
        <div className="community-buttons">
          <a
            href={config.telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-community telegram"
          >
            <Send size={18} />
            <span>Join Telegram</span>
          </a>
          <a
            href={config.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-community whatsapp"
          >
            <MessageCircle size={18} />
            <span>WhatsApp Channel</span>
          </a>
        </div>
      </div>

      {/* Trust & Certifications */}
      <div className="footer-trust-grid">
        <div className="trust-item">
          <ShieldAlert size={20} className="trust-icon" />
          <div className="trust-text">
            <strong>18+ Only</strong>
            <span>Gambling can be addictive. Play responsibly.</span>
          </div>
        </div>
        <div className="trust-item">
          <Lock size={20} className="trust-icon" />
          <div className="trust-text">
            <strong>256-Bit SSL</strong>
            <span>All transactions are encrypted and secure.</span>
          </div>
        </div>
        <div className="trust-item">
          <CheckCircle2 size={20} className="trust-icon" />
          <div className="trust-text">
            <strong>Instant Payouts</strong>
            <span>Fast 24/7 withdrawal directly to bank.</span>
          </div>
        </div>
      </div>

      {/* Brand & Copyright */}
      <div className="footer-bottom">
        <div className="footer-logo-row">
          <img
            src={getAssetUrl('images/logo2.webp')}
            alt="Maanwin"
            className="footer-logo"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = getAssetUrl('images/logo.webp');
            }}
          />
        </div>
        <p className="copyright-txt">
          © 2026 Maanwin. All Rights Reserved. YOUR GAMING, OUR PRIORITY!
        </p>

        {/* Subtle Admin Link */}
        <div className="footer-admin-link">
          <a href="#/admin" className="admin-portal-shortcut">
            Admin Portal
          </a>
        </div>
      </div>
    </footer>
  );
}

import { useState, useEffect } from 'react';
import { getAssetUrl } from '../utils/assetUrl';

interface WelcomeBonusModalProps {
  onClaim: () => void;
}

export function WelcomeBonusModal({ onClaim }: WelcomeBonusModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show automatically after 1.2s on page load if not closed in this session
    const shown = sessionStorage.getItem('mw_welcome_shown');
    if (!shown) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem('mw_welcome_shown', 'true');
  };

  const handleClaim = () => {
    handleClose();
    onClaim();
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2500,
        background: 'rgba(0, 0, 0, 0.72)',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0.4rem'
      }}
      onClick={handleClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '8.8rem',
          background: 'linear-gradient(180deg, #1E283C 0%, #151D2D 100%)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '0.4rem',
          padding: '0.48rem 0.4rem',
          boxShadow: '0 0.2rem 0.6rem rgba(0, 0, 0, 0.6)',
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={handleClose}
          style={{
            position: 'absolute',
            top: '0.3rem',
            right: '0.36rem',
            background: 'transparent',
            border: 'none',
            color: 'var(--main_color, #F97316)',
            fontSize: '0.52rem',
            fontWeight: 700,
            cursor: 'pointer',
            lineHeight: 1
          }}
          aria-label="Close"
        >
          ✕
        </button>

        {/* Top Info Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', marginBottom: '0.48rem' }}>
          <div
            style={{
              width: '1.4rem',
              height: '1.4rem',
              borderRadius: '0.32rem',
              background: 'linear-gradient(135deg, #1A2234 0%, #0F1421 100%)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              padding: '0.1rem'
            }}
          >
            <img
              src={getAssetUrl('img/6015/other/083305135-140407-file_20260919083305130.webp')}
              alt="Maanwin"
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          </div>

          <div style={{ flex: 1, paddingRight: '0.4rem' }}>
            <h3
              style={{
                margin: 0,
                fontSize: '0.4rem',
                fontWeight: 700,
                color: '#FFFFFF',
                fontFamily: 'Poppins, sans-serif',
                lineHeight: 1.25
              }}
            >
              Get free spins &amp; bonus alerts!
            </h3>
            <p
              style={{
                margin: '0.12rem 0 0',
                fontSize: '0.32rem',
                color: 'var(--text_secondary, #9CA3AF)',
                fontFamily: 'Poppins, sans-serif',
                lineHeight: 1.3
              }}
            >
              Tap below and press{' '}
              <strong style={{ color: 'var(--main_color, #F97316)', fontWeight: 700 }}>
                Allow
              </strong>{' '}
              to unlock now
            </p>
          </div>
        </div>

        {/* Claim My Bonus Button */}
        <button
          type="button"
          onClick={handleClaim}
          style={{
            width: '100%',
            height: '1.04rem',
            background: 'var(--main_gradient_color, linear-gradient(180deg, #FFAF2D 0%, #F97316 100%))',
            border: 'none',
            borderRadius: '0.52rem',
            color: '#FFFFFF',
            fontFamily: 'Poppins, sans-serif',
            fontSize: '0.38rem',
            fontWeight: 700,
            cursor: 'pointer',
            boxShadow: '0 0.08rem 0.24rem rgba(249, 115, 22, 0.4)'
          }}
        >
          Claim My Bonus
        </button>
      </div>
    </div>
  );
}

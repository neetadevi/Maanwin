import { useState } from 'react';

export function PwaBanner() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '2.18rem',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'calc(100% - 0.8rem)',
        maxWidth: '460px',
        zIndex: 95,
        background: 'rgba(28, 38, 58, 0.96)',
        border: '1px solid rgba(249, 115, 22, 0.5)',
        borderRadius: '0.4rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0.14rem 0.32rem',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        boxShadow: '0 0.1rem 0.3rem rgba(0, 0, 0, 0.5)'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
        <div
          style={{
            width: '0.72rem',
            height: '0.72rem',
            borderRadius: '50%',
            background: 'rgba(249, 115, 22, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 4V14M12 14L8 10M12 14L16 10"
              stroke="#F97316"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6 18H18"
              stroke="#F97316"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <span
          style={{
            color: '#FFFFFF',
            fontFamily: 'Poppins, sans-serif',
            fontSize: '0.28rem',
            fontWeight: 600
          }}
        >
          Download APP for a Better Experience
        </span>
      </div>

      <button
        type="button"
        onClick={() => setVisible(false)}
        style={{
          background: 'transparent',
          border: 'none',
          color: '#9CA3AF',
          fontSize: '0.36rem',
          cursor: 'pointer',
          padding: '0.08rem',
          lineHeight: 1
        }}
        aria-label="Close"
      >
        ✕
      </button>
    </div>
  );
}


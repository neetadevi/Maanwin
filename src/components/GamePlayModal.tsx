import { useState, useEffect } from 'react';
import type { GameItem } from '../data/gamesData';
import { X, Maximize2, Minimize2, Sparkles, AlertCircle } from 'lucide-react';

interface GamePlayModalProps {
  game: GameItem | null;
  onClose: () => void;
  isLoggedIn: boolean;
  onPromptLogin: () => void;
}

export function GamePlayModal({ game, onClose, isLoggedIn, onPromptLogin }: GamePlayModalProps) {
  const [loading, setLoading] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);

  useEffect(() => {
    if (game) {
      setLoading(true);
      const timer = setTimeout(() => {
        setLoading(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [game]);

  if (!game) return null;

  return (
    <div className={`gameplay-modal-backdrop ${fullscreen ? 'fullscreen-mode' : ''}`}>
      <div className="gameplay-modal-box">
        {/* Top Control Bar */}
        <div className="gameplay-header">
          <div className="game-title-info">
            <span className="vendor-badge">{game.vendorCode}</span>
            <h3 className="playing-game-name">{game.name}</h3>
          </div>

          <div className="gameplay-actions">
            <button
              type="button"
              className="ctrl-btn"
              onClick={() => setFullscreen(!fullscreen)}
              title={fullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            >
              {fullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
            </button>
            <button
              type="button"
              className="ctrl-btn close-game-btn"
              onClick={onClose}
              title="Close Game"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Game Stage Area */}
        <div className="gameplay-screen">
          {loading ? (
            <div className="game-loader-screen">
              <img src={game.img} alt={game.name} className="loader-game-icon" />
              <div className="loader-spinner-bar">
                <div className="loader-fill-track" />
              </div>
              <p className="loading-text">Connecting to {game.vendorCode} game server...</p>
            </div>
          ) : (
            <div className="active-game-canvas">
              {!isLoggedIn && (
                <div className="guest-play-notice">
                  <AlertCircle size={16} />
                  <span>You are playing in Guest / Demo Mode.</span>
                  <button type="button" className="btn-login-demo" onClick={onPromptLogin}>
                    Login for Real Cash
                  </button>
                </div>
              )}

              <div className="game-stage-graphic">
                <img src={game.img} alt={game.name} className="game-stage-hero-img" />
                <div className="game-running-overlay">
                  <div className="game-hud">
                    <div className="hud-badge">
                      <Sparkles size={14} />
                      <span>RNG Certified</span>
                    </div>
                    <div className="hud-balance">
                      <span>Demo Credits:</span>
                      <strong>₹ 50,000.00</strong>
                    </div>
                  </div>
                  <div className="game-play-controls">
                    <button
                      type="button"
                      className="btn-spin-action"
                      onClick={() => alert(`Spinning ${game.name}! Good luck!`)}
                    >
                      SPIN / BET
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import { useAdminConfig } from '../context/AdminConfigContext';
import { Trophy, ArrowUpRight } from 'lucide-react';

export function WinningSection() {
  const { config } = useAdminConfig();
  const winners = config.winners;

  return (
    <section className="winning-section">
      <div className="section-header-row">
        <div className="section-title-wrap">
          <Trophy size={18} className="trophy-icon" />
          <h2 className="section-title">Winning Information</h2>
        </div>
        <span className="live-indicator">
          <span className="live-pulse" /> Live Feed
        </span>
      </div>

      <div className="winning-list">
        {winners.slice(0, 8).map((winner) => (
          <div key={winner.id} className="winning-card">
            <div className="winner-avatar">
              <span className="avatar-initial">{winner.phone.slice(-2)}</span>
            </div>
            <div className="winner-details">
              <div className="winner-top-line">
                <span className="winner-phone">{winner.phone}</span>
                <span className="winner-game">{winner.game}</span>
              </div>
              <div className="winner-bottom-line">
                <span className="won-label">Received</span>
                <span className="won-amount">{winner.amount}</span>
              </div>
            </div>
            <ArrowUpRight size={16} className="winning-arrow" />
          </div>
        ))}
      </div>
    </section>
  );
}

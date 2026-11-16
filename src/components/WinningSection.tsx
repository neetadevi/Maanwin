import { useState, useEffect } from 'react';
import { INITIAL_WINNERS, type WinnerRecord } from '../data/gamesData';
import { Trophy, ArrowUpRight } from 'lucide-react';

export function WinningSection() {
  const [winners, setWinners] = useState<WinnerRecord[]>(INITIAL_WINNERS);

  useEffect(() => {
    const timer = setInterval(() => {
      // Simulate real-time new winners rolling in
      const randomPhone = `91***${Math.floor(1000 + Math.random() * 9000)}`;
      const gameOptions = ['Aviator', 'Win Go 1Min', 'Crazy Time', 'Super Ace', 'Mines', 'Fortune Tiger'];
      const randomGame = gameOptions[Math.floor(Math.random() * gameOptions.length)];
      const randomAmount = `₹${(Math.floor(1000 + Math.random() * 45000)).toLocaleString('en-IN')}.00`;

      const newWinner: WinnerRecord = {
        id: Date.now().toString(),
        phone: randomPhone,
        game: randomGame,
        amount: randomAmount,
        avatar: Math.floor(1 + Math.random() * 8).toString(),
        time: 'Just now'
      };

      setWinners((prev) => [newWinner, ...prev.slice(0, 7)]);
    }, 3500);

    return () => clearInterval(timer);
  }, []);

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
        {winners.map((winner) => (
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

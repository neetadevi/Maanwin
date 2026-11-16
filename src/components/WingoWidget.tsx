import { useState, useEffect } from 'react';
import { Clock, Trophy, Flame } from 'lucide-react';

interface WingoWidgetProps {
  onPlay: (gameName: string) => void;
}

export function WingoWidget({ onPlay }: WingoWidgetProps) {
  const [secondsLeft, setSecondsLeft] = useState(42);
  const [activeTab, setActiveTab] = useState<'1min' | '3min' | '5min'>('1min');
  const [history] = useState([
    { period: '202611160412', num: 7, color: 'green', size: 'Big' },
    { period: '202611160411', num: 2, color: 'red', size: 'Small' },
    { period: '202611160410', num: 0, color: 'violet', size: 'Small' },
    { period: '202611160409', num: 9, color: 'green', size: 'Big' },
    { period: '202611160408', num: 4, color: 'red', size: 'Small' }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) return 60;
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="wingo-widget-card">
      <div className="wingo-header">
        <div className="wingo-title-wrap">
          <Flame size={20} className="flame-icon" />
          <span className="wingo-title">Win Go Lottery</span>
          <span className="live-badge">LIVE</span>
        </div>

        <div className="wingo-tabs">
          <button
            type="button"
            className={`wingo-tab-btn ${activeTab === '1min' ? 'active' : ''}`}
            onClick={() => setActiveTab('1min')}
          >
            1 Min
          </button>
          <button
            type="button"
            className={`wingo-tab-btn ${activeTab === '3min' ? 'active' : ''}`}
            onClick={() => setActiveTab('3min')}
          >
            3 Min
          </button>
          <button
            type="button"
            className={`wingo-tab-btn ${activeTab === '5min' ? 'active' : ''}`}
            onClick={() => setActiveTab('5min')}
          >
            5 Min
          </button>
        </div>
      </div>

      <div className="wingo-body">
        {/* Timer Banner */}
        <div className="wingo-timer-banner">
          <div className="period-info">
            <span className="period-lbl">Period</span>
            <span className="period-num">202611160413</span>
          </div>

          <div className="countdown-box">
            <Clock size={16} />
            <span className="countdown-clock">{formatTime(secondsLeft)}</span>
          </div>
        </div>

        {/* Quick Bet Buttons */}
        <div className="quick-color-row">
          <button
            type="button"
            className="btn-color-bet green"
            onClick={() => onPlay('Win Go - Green')}
          >
            Green (2x)
          </button>
          <button
            type="button"
            className="btn-color-bet violet"
            onClick={() => onPlay('Win Go - Violet')}
          >
            Violet (4.5x)
          </button>
          <button
            type="button"
            className="btn-color-bet red"
            onClick={() => onPlay('Win Go - Red')}
          >
            Red (2x)
          </button>
        </div>

        {/* Numbers 0-9 */}
        <div className="numbers-grid">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => {
            let colorCls = 'red';
            if (n === 0 || n === 5) colorCls = 'violet';
            else if (n % 2 !== 0) colorCls = 'green';

            return (
              <button
                key={n}
                type="button"
                className={`num-ball-btn ball-${colorCls}`}
                onClick={() => onPlay(`Win Go - Number ${n}`)}
              >
                {n}
              </button>
            );
          })}
        </div>

        {/* Big / Small */}
        <div className="big-small-row">
          <button
            type="button"
            className="btn-big-small btn-big"
            onClick={() => onPlay('Win Go - Big')}
          >
            Big (5-9)
          </button>
          <button
            type="button"
            className="btn-big-small btn-small"
            onClick={() => onPlay('Win Go - Small')}
          >
            Small (0-4)
          </button>
        </div>

        {/* Recent History Table */}
        <div className="wingo-recent-history">
          <div className="history-head">
            <Trophy size={14} />
            <span>Recent Results</span>
          </div>
          <div className="history-list">
            {history.map((h, i) => (
              <div key={i} className="history-item">
                <span className="hist-period">{h.period.slice(-4)}</span>
                <span className={`hist-ball ball-${h.color}`}>{h.num}</span>
                <span className={`hist-size ${h.size === 'Big' ? 'size-big' : 'size-small'}`}>
                  {h.size}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

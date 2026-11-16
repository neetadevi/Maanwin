import { useState } from 'react';
import type { GameItem } from '../data/gamesData';
import { Play, Search, Flame } from 'lucide-react';

interface GamesGridProps {
  games: GameItem[];
  categoryTitle: string;
  onPlayGame: (game: GameItem) => void;
}

export function GamesGrid({ games, categoryTitle, onPlayGame }: GamesGridProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredGames = games.filter((g) =>
    g.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    g.vendorCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="games-section">
      <div className="section-header-row">
        <div className="section-title-wrap">
          <span className="title-accent-bar" />
          <h2 className="section-title">{categoryTitle} Games</h2>
          <span className="games-count">({filteredGames.length})</span>
        </div>

        <div className="search-box-wrap">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            placeholder="Search game..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="game-search-input"
          />
        </div>
      </div>

      <div className="games-grid">
        {filteredGames.map((game) => (
          <div
            key={game.gameId}
            className="game-card"
            onClick={() => onPlayGame(game)}
          >
            <div className="game-thumb-wrapper">
              <img
                src={game.img}
                alt={game.name}
                className="game-thumb-img"
                loading="lazy"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = 'https://maanwin2.com/img/0/gamelogo/SPRIBE/aviator.png';
                }}
              />

              {/* Badges */}
              {game.hot && (
                <div className="badge-hot">
                  <Flame size={12} />
                  <span>HOT</span>
                </div>
              )}

              {/* Hover Play Button */}
              <div className="game-overlay">
                <button type="button" className="btn-play-circle" aria-label={`Play ${game.name}`}>
                  <Play size={20} fill="#fff" />
                </button>
              </div>
            </div>

            <div className="game-info">
              <span className="game-name" title={game.name}>{game.name}</span>
              <span className="game-vendor">{game.vendorCode}</span>
            </div>
          </div>
        ))}
      </div>

      {filteredGames.length === 0 && (
        <div className="no-games-found">
          <p>No games found matching "{searchTerm}"</p>
        </div>
      )}
    </section>
  );
}

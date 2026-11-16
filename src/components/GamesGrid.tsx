import { useState } from 'react';
import type { GameItem } from '../data/gamesData';
import { getAssetUrl } from '../utils/assetUrl';

interface GamesGridProps {
  games: GameItem[];
  categoryTitle: string;
  onPlayGame: (game: GameItem) => void;
}

export function GamesGrid({ games, categoryTitle, onPlayGame }: GamesGridProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredGames = games.filter(
    (g) =>
      g.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      g.vendorCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="s11-home__sections">
      <section className="s11-section">
        <header className="s11-section__head">
          <div className="s11-section__title">
            <span style={{ fontSize: '0.42rem' }}>🎲</span>
            <h3 className="s11-section__title-text">{categoryTitle}</h3>
            <span style={{ fontSize: '0.28rem', color: 'var(--text_secondary, #9CA3AF)', marginLeft: '0.1rem' }}>
              ({filteredGames.length})
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                height: '0.64rem',
                padding: '0 0.2rem',
                borderRadius: '0.16rem',
                border: '1px solid var(--Dividing_line_color, #253248)',
                background: 'var(--bg_color_L2, #12192A)',
                color: '#fff',
                fontSize: '0.28rem',
                outline: 'none',
                width: '2.5rem'
              }}
            />
          </div>
        </header>

        <div className="s11-section__grid">
          {filteredGames.map((game) => (
            <article
              key={game.gameId}
              className="s11-section__card"
              onClick={() => onPlayGame(game)}
            >
              <div className="s11-section__cover">
                <img
                  src={getAssetUrl(game.img)}
                  alt={game.name}
                  loading="lazy"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      'https://maanwin2.com/img/0/gamelogo/SPRIBE/aviator.png';
                  }}
                />
                {game.hot && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '0.08rem',
                      left: '0.08rem',
                      background: 'var(--norm_red_color, #FB5B5B)',
                      color: '#fff',
                      fontSize: '0.22rem',
                      fontWeight: 700,
                      padding: '0.02rem 0.12rem',
                      borderRadius: '0.08rem'
                    }}
                  >
                    HOT
                  </span>
                )}
              </div>
              <p className="s11-section__card-name" title={game.name}>
                {game.name}
              </p>
            </article>
          ))}
        </div>

        {filteredGames.length === 0 && (
          <div style={{ textAlign: 'center', padding: '1rem', color: '#9CA3AF', fontSize: '0.32rem' }}>
            No games found matching "{searchTerm}"
          </div>
        )}
      </section>
    </div>
  );
}

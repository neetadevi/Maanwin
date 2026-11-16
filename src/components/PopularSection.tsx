import type { GameItem } from '../data/gamesData';
import { getAssetUrl } from '../utils/assetUrl';

interface PopularSectionProps {
  games: GameItem[];
  onPlayGame: (game: GameItem) => void;
  onSeeMore?: () => void;
}

export function PopularSection({ games, onPlayGame, onSeeMore }: PopularSectionProps) {
  // Take top 8 popular games
  const popularGames = games.slice(0, 8);

  const getWinRate = (idx: number) => {
    const rates = [98.4, 97.8, 96.9, 98.2, 97.5, 96.2, 98.7, 97.1];
    return rates[idx % rates.length];
  };

  return (
    <div className="s11-home__popular">
      <section className="s11-popular">
        <header className="s11-popular__head">
          <div className="s11-popular__title">
            <span style={{ fontSize: '0.45rem' }}>🔥</span>
            <h3 className="s11-popular__title-text">Popular Games</h3>
          </div>
          <button type="button" className="s11-popular__more" onClick={onSeeMore}>
            More &gt;
          </button>
        </header>

        <div className="s11-popular__scroller">
          {popularGames.map((game, index) => {
            const winRate = getWinRate(index);
            return (
              <article
                key={game.gameId || index}
                className="s11-popular__card"
                onClick={() => onPlayGame(game)}
              >
                <div className="s11-popular__cover">
                  <img
                    className="s11-popular__cover-img"
                    src={getAssetUrl(game.img)}
                    alt={game.name}
                    loading="lazy"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        'https://maanwin2.com/img/0/gamelogo/SPRIBE/aviator.png';
                    }}
                  />
                </div>

                <p className="s11-popular__name" title={game.name}>
                  {game.name}
                </p>

                <div className="s11-popular__rate">
                  <div className="s11-popular__rate-head">
                    <span className="s11-popular__rate-label">Win Rate</span>
                    <span className="s11-popular__rate-value">{winRate}%</span>
                  </div>
                  <div className="s11-popular__bar">
                    <span
                      className="s11-popular__bar-fill"
                      style={{ width: `${winRate}%` }}
                    />
                  </div>
                </div>

                <button
                  type="button"
                  className="s11-popular__play"
                  onClick={(e) => {
                    e.stopPropagation();
                    onPlayGame(game);
                  }}
                >
                  Play
                </button>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}


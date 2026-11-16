import { getAssetUrl } from '../utils/assetUrl';
import livePopularGames from '../data/livePopularGames.json';
import type { GameItem } from '../data/gamesData';

interface PopularSectionProps {
  games: GameItem[];
  onPlayGame: (game: GameItem) => void;
  onSeeMore?: () => void;
}

export function PopularSection({ games, onPlayGame, onSeeMore }: PopularSectionProps) {
  const displayGames = livePopularGames.map((g, idx) => {
    // Try to find matching game from games list or fallback
    const match = games.find((item) => item.name.toLowerCase() === g.name.toLowerCase());
    return {
      gameId: match?.gameId || `pop-${idx}`,
      gameCode: match?.gameCode || `pop-${idx}`,
      name: g.name,
      vendorCode: match?.vendorCode || 'POPULAR',
      img: g.img,
      rate: g.rate
    };
  });

  return (
    <section className="s11-popular side-distance s11-home__popular">
      <header className="s11-popular__head">
        <div className="s11-popular__title">
          <img
            className="s11-popular__title-icon"
            src={getAssetUrl('assets/ar_saas11/home/s11_icon_fire-ab2eeb91.webp')}
            alt=""
            loading="lazy"
            decoding="async"
          />
          <h2 className="s11-popular__title-text">Popular games</h2>
        </div>
        <button type="button" className="s11-popular__more" onClick={onSeeMore}>
          View All
        </button>
      </header>

      <div className="s11-popular__scroller">
        {displayGames.map((game, index) => (
          <article
            key={game.gameId || index}
            className="s11-popular__card"
            onClick={() => onPlayGame(game as any)}
          >
            <div className="s11-popular__cover">
              <img
                className="s11-popular__cover-img"
                src={getAssetUrl(game.img)}
                alt={game.name}
                loading="lazy"
                decoding="async"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = 'https://maanwin2.com' + game.img;
                }}
              />
            </div>

            <h3 className="s11-popular__name" title={game.name}>
              {game.name}
            </h3>

            <div className="s11-popular__rate">
              <div className="s11-popular__rate-head">
                <span className="s11-popular__rate-label">Win Rate</span>
                <span className="s11-popular__rate-value">{game.rate}</span>
              </div>
              <div className="s11-popular__bar">
                <i
                  className="s11-popular__bar-fill"
                  style={{ width: game.rate }}
                />
              </div>
            </div>

            <button
              type="button"
              className="s11-popular__play"
              onClick={(e) => {
                e.stopPropagation();
                onPlayGame(game as any);
              }}
            >
              Play Now
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}

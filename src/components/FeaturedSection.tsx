import { getAssetUrl } from '../utils/assetUrl';
import liveFeaturedGames from '../data/liveFeaturedGames.json';
import type { GameItem } from '../data/gamesData';

interface FeaturedSectionProps {
  onPlayGame: (game: GameItem) => void;
}

export function FeaturedSection({ onPlayGame }: FeaturedSectionProps) {
  return (
    <section className="s11-featured side-distance s11-home__featured">
      <header className="s11-featured__head">
        <i className="s11-featured__rule s11-featured__rule--left" aria-hidden="true" />
        <div className="s11-featured__scroll">
          <img
            className="s11-featured__scroll-end s11-featured__scroll-end--left"
            src={getAssetUrl('images/s11_scroll_end-DY_mVXsR.svg')}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
          />
          <div className="s11-featured__banner">
            <span className="s11-featured__banner-text">Featured Games</span>
          </div>
          <img
            className="s11-featured__scroll-end s11-featured__scroll-end--right"
            src={getAssetUrl('images/s11_scroll_end-DY_mVXsR.svg')}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
          />
        </div>
        <i className="s11-featured__rule s11-featured__rule--right" aria-hidden="true" />
      </header>

      <div className="s11-featured__strip">
        <div
          style={{
            display: 'flex',
            gap: '0.26667rem',
            overflowX: 'auto',
            paddingBottom: '0.1rem',
            scrollbarWidth: 'none',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {liveFeaturedGames.map((game, idx) => (
            <div
              key={idx}
              style={{
                flex: 'none',
                width: '2.185rem'
              }}
            >
              <button
                className="s11-featured__item"
                type="button"
                aria-label={game.name}
                onClick={() =>
                  onPlayGame({
                    gameId: `feat-${idx}`,
                    gameCode: `feat-${idx}`,
                    name: game.name,
                    vendorCode: 'FEATURED',
                    img: game.img
                  })
                }
              >
                <img
                  className="s11-featured__cover"
                  alt={game.name}
                  src={getAssetUrl(game.img)}
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      'https://maanwin2.com' + game.img;
                  }}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      <i className="s11-featured__rule s11-featured__rule--bottom" aria-hidden="true" />
    </section>
  );
}

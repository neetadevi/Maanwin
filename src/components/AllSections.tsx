import { useState } from 'react';
import type { GameItem, GameCategory } from '../data/gamesData';
import { getAssetUrl } from '../utils/assetUrl';

interface AllSectionsProps {
  categories: GameCategory[];
  onPlayGame: (game: GameItem) => void;
  lang: 'en' | 'hi';
}

export function AllSections({ categories, onPlayGame, lang }: AllSectionsProps) {
  // Pager state per category: page index 0, 1, 2...
  const [pageMap, setPageMap] = useState<Record<string, number>>({});
  const [expandedMap, setExpandedMap] = useState<Record<string, boolean>>({});

  const handleNext = (code: string, total: number) => {
    const currentPage = pageMap[code] || 0;
    const maxPage = Math.max(0, Math.ceil(total / 6) - 1);
    setPageMap((prev) => ({
      ...prev,
      [code]: currentPage >= maxPage ? 0 : currentPage + 1
    }));
  };

  const handlePrev = (code: string, total: number) => {
    const currentPage = pageMap[code] || 0;
    const maxPage = Math.max(0, Math.ceil(total / 6) - 1);
    setPageMap((prev) => ({
      ...prev,
      [code]: currentPage <= 0 ? maxPage : currentPage - 1
    }));
  };

  const toggleExpand = (code: string) => {
    setExpandedMap((prev) => ({
      ...prev,
      [code]: !prev[code]
    }));
  };

  // Map category code to specific section icon
  const getCatIcon = (code: string) => {
    switch (code) {
      case 'Crash':
        return getAssetUrl('assets/ar_saas11/home/s11_icon_fire-ab2eeb91.webp');
      case 'Lottery':
        return getAssetUrl('images/s11_icon_bell-BqXm-Mh1.svg');
      default:
        return getAssetUrl('assets/ar_saas11/home/s11_icon_gamepad-75bbf978.webp');
    }
  };

  return (
    <div className="s11-sections side-distance s11-home__sections">
      {categories.map((cat) => {
        const catCode = cat.categoryCode;
        const allGames = cat.games || [];
        const isExpanded = !!expandedMap[catCode];
        const page = pageMap[catCode] || 0;
        
        // Show 6 games per page, or all if expanded
        const displayGames = isExpanded
          ? allGames
          : allGames.slice(page * 6, (page + 1) * 6);

        return (
          <section
            key={catCode}
            id={`sec-${catCode.toLowerCase()}`}
            className="s11-section"
            style={{ marginBottom: '0.64rem' }}
          >
            <header className="s11-section__head">
              <div className="s11-section__title">
                <img
                  className="s11-section__title-icon"
                  src={getCatIcon(catCode)}
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
                <h3 className="s11-section__title-text">
                  {lang === 'hi' ? cat.name.hi : cat.name.en}
                </h3>
              </div>

              <div className="s11-section__tools">
                <button
                  type="button"
                  className="s11-section__more"
                  onClick={() => toggleExpand(catCode)}
                >
                  {isExpanded
                    ? lang === 'hi'
                      ? 'कम देखें'
                      : 'Show Less'
                    : lang === 'hi'
                    ? 'सभी देखें'
                    : 'See All'}
                </button>

                {!isExpanded && allGames.length > 6 && (
                  <div className="s11-section__pager">
                    <button
                      type="button"
                      className="s11-section__arrow s11-section__arrow--prev"
                      onClick={() => handlePrev(catCode, allGames.length)}
                      aria-label="Previous"
                    >
                      <svg
                        className="s11-section__arrow-icon"
                        viewBox="0 0 16 28"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14 2L2 14L14 26"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                    <button
                      type="button"
                      className="s11-section__arrow s11-section__arrow--next"
                      onClick={() => handleNext(catCode, allGames.length)}
                      aria-label="Next"
                      style={{ transform: 'rotate(180deg)' }}
                    >
                      <svg
                        className="s11-section__arrow-icon"
                        viewBox="0 0 16 28"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14 2L2 14L14 26"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            </header>

            <div className="s11-section__grid">
              {displayGames.map((game, idx) => (
                <article
                  key={game.gameId || idx}
                  className="s11-section__card"
                  onClick={() => onPlayGame(game)}
                >
                  <div className="s11-section__cover">
                    <img
                      src={getAssetUrl(game.img)}
                      alt={game.name}
                      loading="lazy"
                      decoding="async"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src =
                          'https://maanwin2.com' + game.img;
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
                          borderRadius: '0.08rem',
                          zIndex: 2
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
          </section>
        );
      })}
    </div>
  );
}

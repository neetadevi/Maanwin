import { CATEGORIES } from '../data/gamesData';
import { getAssetUrl } from '../utils/assetUrl';

interface CategoryNavProps {
  activeCategory: string;
  onSelectCategory: (categoryCode: string) => void;
  lang: 'en' | 'hi';
}

export function CategoryNav({ activeCategory, onSelectCategory, lang }: CategoryNavProps) {
  // Map category code to downloaded s11_cat_* art
  const getCategoryArt = (code: string) => {
    switch (code) {
      case 'Crash':
      case 'C202505220412050187':
        return 'images/s11_cat_popular-DCnpEzAz.webp';
      case 'Lottery':
      case 'C202505220412050186':
        return 'images/s11_cat_lottery-eo0iQ_s7.webp';
      case 'Slots':
      case 'C202505220412050188':
        return 'images/s11_cat_slots-BPiCOS03.webp';
      case 'Sports':
      case 'C202505220412050189':
        return 'images/s11_cat_sports-BmIeKBk9.webp';
      case 'Fishing':
      case 'C202505220412050190':
        return 'images/s11_cat_fishing-Bu97jMrl.webp';
      case 'Casino':
      case 'C202505220412050191':
        return 'images/s11_cat_casino-lUMlA4zD.webp';
      case 'Poker':
      case 'C202505220412050192':
        return 'images/s11_cat_pvc-B4T-N15m.webp';
      default:
        return 'images/s11_cat_mini-CrFbhV3H.webp';
    }
  };

  const getBadgeText = (index: number) => {
    if (index === 0) return 'HOT';
    if (index === 1) return 'WIN';
    if (index === 2) return 'TOP';
    return `${30 + index * 12}+`;
  };

  return (
    <div className="s11-home__hub">
      <section className="s11-hub">
        <header className="s11-hub__head">
          <span style={{ fontSize: '0.45rem' }}>🎮</span>
          <h2 className="s11-hub__head-text">Game Lobby</h2>
        </header>

        <div className="s11-hub__grid">
          {CATEGORIES.map((cat, index) => {
            const isWide = index < 2; // first 2 categories span 3 columns
            const isHighlight = activeCategory === cat.categoryCode || index === 0;
            const artUrl = getCategoryArt(cat.categoryCode);

            return (
              <button
                key={cat.categoryCode}
                type="button"
                className={`s11-hub__card ${isWide ? 'is-wide' : ''} ${isHighlight ? 'is-highlight' : ''}`}
                onClick={() => onSelectCategory(cat.categoryCode)}
              >
                <span className="s11-hub__badge">
                  <span className="s11-hub__badge-num">{getBadgeText(index)}</span>
                </span>

                <span className="s11-hub__title">
                  {lang === 'hi' ? cat.name.hi : cat.name.en}
                </span>

                <img
                  className="s11-hub__art"
                  src={getAssetUrl(artUrl)}
                  alt={cat.name.en}
                  loading="lazy"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = getAssetUrl('images/cat-crash.webp');
                  }}
                />
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
}

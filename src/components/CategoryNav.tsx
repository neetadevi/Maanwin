import { getAssetUrl } from '../utils/assetUrl';

interface CategoryNavProps {
  activeCategory: string;
  onSelectCategory: (categoryCode: string) => void;
  lang: 'en' | 'hi';
}

const CATEGORIES_DATA = [
  {
    code: 'Crash',
    name: { en: 'Crash', hi: 'क्रैश' },
    count: '49',
    img: 'images/user_assets/your_games_crash.png',
    isWide: true
  },
  {
    code: 'Lottery',
    name: { en: 'Lottery', hi: 'लॉटरी' },
    count: '13',
    img: 'images/user_assets/your_games_lottery.png',
    isWide: true
  },
  {
    code: 'Slots',
    name: { en: 'Slots', hi: 'स्लॉट्स' },
    count: '2106',
    img: 'images/user_assets/your_games_slots.png',
    isWide: false
  },
  {
    code: 'Sports',
    name: { en: 'Sports', hi: 'स्पोर्ट्स' },
    count: '5',
    img: 'images/user_assets/your_games_sports.png',
    isWide: false
  },
  {
    code: 'Fishing',
    name: { en: 'Fishing', hi: 'फिशिंग' },
    count: '44',
    img: 'images/user_assets/your_games_fishing.png',
    isWide: false
  },
  {
    code: 'Casino',
    name: { en: 'Casino', hi: 'कैसीनो' },
    count: '641',
    img: 'images/user_assets/your_games_casino.png',
    isWide: false
  },
  {
    code: 'Poker',
    name: { en: 'Poker', hi: 'पोकर' },
    count: '75',
    img: 'images/user_assets/your_games_poker.png',
    isWide: false
  }
];

export function CategoryNav({ activeCategory, onSelectCategory, lang }: CategoryNavProps) {
  const handleClick = (code: string) => {
    onSelectCategory(code);
    const target = document.getElementById(`sec-${code.toLowerCase()}`);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="s11-hub side-distance s11-home__hub">
      <header className="s11-hub__head">
        <img
          className="s11-hub__head-icon"
          src={getAssetUrl('assets/ar_saas11/home/s11_icon_gamepad-75bbf978.webp')}
          alt=""
          loading="lazy"
          decoding="async"
        />
        <h2 className="s11-hub__head-text">Your Games hub</h2>
      </header>

      <div className="s11-hub__grid">
        {CATEGORIES_DATA.map((cat, index) => {
          const isSelected =
            activeCategory.toLowerCase().includes(cat.code.toLowerCase()) ||
            (index === 0 && (!activeCategory || activeCategory === 'Crash'));

          return (
            <button
              key={cat.code}
              type="button"
              className={`s11-hub__card ${cat.isWide ? 'is-wide' : ''} ${
                isSelected ? 'is-highlight' : ''
              }`}
              onClick={() => handleClick(cat.code)}
            >
              <span className="s11-hub__badge">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 17 16.694"
                  className="s11-hub__badge-icon"
                >
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4.212 4.162a1.1 1.1 0 0 0 .188.606c.193.281.517.466.884.466h6.431a1.07 1.07 0 0 0 1.072-1.072V1.437a.3.3 0 0 0-.017-.1.304.304 0 0 0-.422-.171l-1.705.852L8.714.088a.304.304 0 0 0-.43 0l-1.928 1.93-1.705-.852a.304.304 0 0 0-.439.271zm-1.444.616a1.56 1.56 0 0 0-1.294.981C1.051 6.86.68 8.342.415 9.73c-.262 1.38-.427 2.724-.414 3.549.015.93.157 1.794.62 2.43.495.683 1.265.986 2.241.986a.6.6 0 0 0 .272-.064c.734-.368 1.357-1.073 1.878-1.718q.235-.293.448-.567c.303-.388.58-.741.856-1.034h4.358c.25.281.501.62.779.996q.212.286.447.597c.497.648 1.102 1.366 1.82 1.726a.6.6 0 0 0 .273.064c.974 0 1.766-.3 2.297-.963.507-.633.694-1.498.71-2.453.012-.818-.15-2.149-.41-3.517-.259-1.375-.626-2.846-1.044-3.95a1.63 1.63 0 0 0-1.316-1.027 2.59 2.59 0 0 1-2.515 1.968H5.284a2.59 2.59 0 0 1-2.516-1.974m4.042 5.554a1.587 1.587 0 1 1-3.173 0 1.587 1.587 0 0 1 3.173 0m4.967 1.587a1.587 1.587 0 1 0 0-3.174 1.587 1.587 0 0 0 0 3.174"
                  />
                </svg>
                <span className="s11-hub__badge-num">{cat.count}</span>
              </span>

              <span className="s11-hub__title">
                {lang === 'hi' ? cat.name.hi : cat.name.en}
              </span>

              <img
                className="s11-hub__art"
                src={getAssetUrl(cat.img)}
                alt={cat.name.en}
                loading="lazy"
                decoding="async"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    'https://maanwin2.com/' + cat.img;
                }}
              />
            </button>
          );
        })}
      </div>
    </section>
  );
}

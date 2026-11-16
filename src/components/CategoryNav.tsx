import { CATEGORIES } from '../data/gamesData';

interface CategoryNavProps {
  activeCategory: string;
  onSelectCategory: (categoryCode: string) => void;
  lang: 'en' | 'hi';
}

export function CategoryNav({ activeCategory, onSelectCategory, lang }: CategoryNavProps) {
  return (
    <div className="category-nav-wrapper">
      <div className="category-nav-scroll">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.categoryCode;
          return (
            <button
              key={cat.categoryCode}
              type="button"
              className={`category-item-btn ${isActive ? 'active' : ''}`}
              onClick={() => onSelectCategory(cat.categoryCode)}
            >
              <div className="cat-icon-container">
                <img
                  src={cat.icon}
                  alt={cat.name.en}
                  className="cat-icon-img"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
              <span className="cat-name">
                {lang === 'hi' ? cat.name.hi : cat.name.en}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

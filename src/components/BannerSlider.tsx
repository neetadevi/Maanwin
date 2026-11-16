import { useState, useEffect } from 'react';
import { BANNERS } from '../data/gamesData';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function BannerSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % BANNERS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + BANNERS.length) % BANNERS.length);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % BANNERS.length);
  };

  return (
    <div className="banner-slider">
      <div
        className="banner-track"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {BANNERS.map((banner, index) => (
          <div key={banner.id} className="banner-slide">
            <img
              src={banner.img}
              alt={banner.title}
              className="banner-image"
              loading={index === 0 ? 'eager' : 'lazy'}
              onError={(e) => {
                // Fallback to online image
                (e.currentTarget as HTMLImageElement).src = 'https://maanwin2.com/img/6015/banner/093136251-139478-file_20260918093136209.webp';
              }}
            />
          </div>
        ))}
      </div>

      {/* Nav Controls */}
      <button type="button" className="banner-nav-btn prev" onClick={prevSlide} aria-label="Previous Banner">
        <ChevronLeft size={20} />
      </button>
      <button type="button" className="banner-nav-btn next" onClick={nextSlide} aria-label="Next Banner">
        <ChevronRight size={20} />
      </button>

      {/* Dots Indicator */}
      <div className="banner-dots">
        {BANNERS.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { useAdminConfig } from '../context/AdminConfigContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function BannerSlider() {
  const { config } = useAdminConfig();
  const banners = config.banners;
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (banners.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [banners.length]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % banners.length);
  };

  if (!banners || banners.length === 0) return null;

  return (
    <div className="banner-slider">
      <div
        className="banner-track"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {banners.map((banner, index) => (
          <div key={banner.id} className="banner-slide">
            <img
              src={banner.img}
              alt={banner.title}
              className="banner-image"
              loading={index === 0 ? 'eager' : 'lazy'}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = 'https://maanwin2.com/img/6015/banner/093136251-139478-file_20260918093136209.webp';
              }}
            />
          </div>
        ))}
      </div>

      {banners.length > 1 && (
        <>
          <button type="button" className="banner-nav-btn prev" onClick={prevSlide} aria-label="Previous Banner">
            <ChevronLeft size={20} />
          </button>
          <button type="button" className="banner-nav-btn next" onClick={nextSlide} aria-label="Next Banner">
            <ChevronRight size={20} />
          </button>

          <div className="banner-dots">
            {banners.map((_, index) => (
              <button
                key={index}
                type="button"
                className={`dot ${index === currentIndex ? 'active' : ''}`}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

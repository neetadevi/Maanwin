import { useState, useEffect } from 'react';
import { useAdminConfig } from '../context/AdminConfigContext';
import { getAssetUrl } from '../utils/assetUrl';

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

  if (!banners || banners.length === 0) return null;

  return (
    <section className="s11-hero side-distance s11-home__banner">
      <div className="s11-hero__swipe" style={{ position: 'relative', overflow: 'hidden', borderRadius: '0.26667rem' }}>
        <div
          className="s11-hero__wrapper"
          style={{
            display: 'flex',
            transition: 'transform 0.5s ease-out',
            transform: `translateX(-${currentIndex * 100}%)`,
            width: '100%'
          }}
        >
          {banners.map((banner, index) => (
            <div key={banner.id || index} className="s11-hero__item" style={{ minWidth: '100%', flex: '0 0 100%' }}>
              <img
                src={getAssetUrl(banner.img)}
                alt={banner.title || ''}
                className="s11-hero__image is-loaded"
                loading={index === 0 ? 'eager' : 'lazy'}
                decoding="async"
                style={{
                  width: '100%',
                  display: 'block',
                  aspectRatio: '1.9714286',
                  objectFit: 'cover',
                  borderRadius: '0.26667rem'
                }}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    'https://maanwin2.com/img/6015/banner/123245682-142073-file_20260920123245625.webp';
                }}
              />
            </div>
          ))}
        </div>

        {/* Dots Indicator */}
        {banners.length > 1 && (
          <div
            className="s11-hero__dots"
            style={{
              position: 'absolute',
              bottom: '0.2rem',
              left: 0,
              right: 0,
              display: 'flex',
              justifyContent: 'center',
              gap: '0.12rem',
              zIndex: 2
            }}
          >
            {banners.map((_, index) => (
              <span
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`s11-hero__dot ${index === currentIndex ? 'is-active' : ''}`}
                style={{
                  width: index === currentIndex ? '0.4rem' : '0.16rem',
                  height: '0.16rem',
                  borderRadius: '0.08rem',
                  backgroundColor: index === currentIndex ? 'var(--main_color, #F97316)' : 'rgba(255,255,255,0.4)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

import { useEffect, useRef } from 'react';
import { getAssetUrl } from '../utils/assetUrl';

interface BottomNavProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  onOpenAuth: (mode: 'login' | 'signup') => void;
  isLoggedIn: boolean;
}

export function BottomNav({ activeTab, onSelectTab, onOpenAuth, isLoggedIn }: BottomNavProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Sprite frames for the gold treasure chest opening & sparkling
    const frames = [
      { sx: 420, sy: 278, sw: 175, sh: 162 }, // Closed chest
      { sx: 215, sy: 278, sw: 175, sh: 162 }, // Starting to open
      { sx: 15, sy: 278, sw: 175, sh: 162 },  // Half open
      { sx: 260, sy: 15, sw: 175, sh: 165 },  // Fully open with glowing gems
      { sx: 460, sy: 15, sw: 175, sh: 165 },  // Sparkling
      { sx: 660, sy: 15, sw: 175, sh: 165 }   // Radiant gold treasure
    ];

    let currentFrame = 0;
    let isMounted = true;
    let timer: ReturnType<typeof setInterval> | null = null;

    const img = new Image();
    img.src = getAssetUrl('images/s11_chest_anim-Bq793_Bz.webp');

    const render = () => {
      if (!ctx || !canvas) return;
      const f = frames[currentFrame];
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, f.sx, f.sy, f.sw, f.sh, 0, 0, canvas.width, canvas.height);
    };

    img.onload = () => {
      render();
      timer = setInterval(() => {
        if (!isMounted) return;
        currentFrame = (currentFrame + 1) % frames.length;
        render();
      }, 500);
    };

    return () => {
      isMounted = false;
      if (timer) clearInterval(timer);
    };
  }, []);

  const handleTabClick = (key: string) => {
    if ((key === 'wallet' || key === 'mine') && !isLoggedIn) {
      onOpenAuth('login');
      return;
    }
    onSelectTab(key);
  };

  return (
    <div className="s11-tabbar-container">
      <div className="s11-tabbar">
        {/* Dock background & Glow */}
        <i className="s11-tabbar__dock" aria-hidden="true" />
        <i className="s11-tabbar__glow" aria-hidden="true" />
        <img
          className="s11-tabbar__bg"
          src={getAssetUrl('images/s11_tab_bg-Vd4rQYLh.svg')}
          alt=""
          aria-hidden="true"
          loading="eager"
          decoding="async"
        />

        <div className="s11-tabbar__items">
          {/* Left Side: Home & Promo */}
          <div className="s11-tabbar__side">
            <button
              type="button"
              className={`s11-tabbar__item ${activeTab === 'home' ? 'is-active' : ''}`}
              onClick={() => handleTabClick('home')}
            >
              <img
                className="s11-tabbar__icon"
                src={getAssetUrl(
                  activeTab === 'home'
                    ? 'images/s11_tab_home_sel-DZhrwbpl.svg'
                    : 'images/s11_tab_home_nor-PFLWSLys.svg'
                )}
                alt=""
                aria-hidden="true"
                loading="eager"
                decoding="async"
              />
              <span className="s11-tabbar__text">Home</span>
            </button>

            <button
              type="button"
              className={`s11-tabbar__item ${activeTab === 'activity' ? 'is-active' : ''}`}
              onClick={() => handleTabClick('activity')}
            >
              <img
                className="s11-tabbar__icon"
                src={getAssetUrl(
                  activeTab === 'activity'
                    ? 'images/s11_tab_activity_sel-DgPThJy4.svg'
                    : 'images/s11_tab_activity_nor-BtRJSqsp.svg'
                )}
                alt=""
                aria-hidden="true"
                loading="eager"
                decoding="async"
              />
              <span className="s11-tabbar__text">Promo</span>
            </button>
          </div>

          {/* Right Side: Earn & Profile */}
          <div className="s11-tabbar__side">
            <button
              type="button"
              className={`s11-tabbar__item ${activeTab === 'wallet' ? 'is-active' : ''}`}
              onClick={() => handleTabClick('wallet')}
            >
              <img
                className="s11-tabbar__icon"
                src={getAssetUrl(
                  activeTab === 'wallet'
                    ? 'images/s11_tab_wallet_sel-DsPeGhwb.svg'
                    : 'images/s11_tab_wallet_nor-DbYvdA44.svg'
                )}
                alt=""
                aria-hidden="true"
                loading="eager"
                decoding="async"
              />
              <span className="s11-tabbar__text">Earn</span>
            </button>

            <button
              type="button"
              className={`s11-tabbar__item ${activeTab === 'mine' ? 'is-active' : ''}`}
              onClick={() => handleTabClick('mine')}
            >
              <img
                className="s11-tabbar__icon"
                src={getAssetUrl(
                  activeTab === 'mine'
                    ? 'images/s11_tab_profile_sel-BoCwkzfF.svg'
                    : 'images/s11_tab_profile_nor-BL0XsIKW.svg'
                )}
                alt=""
                aria-hidden="true"
                loading="eager"
                decoding="async"
              />
              <span className="s11-tabbar__text">Profile</span>
            </button>
          </div>
        </div>

        {/* Center Floating Chest Button with Live Animation */}
        <button
          type="button"
          className="s11-tabbar__chest s11-chest-animated"
          aria-label="Share & Bonus"
          onClick={() => {
            if (!isLoggedIn) {
              onOpenAuth('login');
            } else {
              onSelectTab('activity');
            }
          }}
        >
          <canvas
            ref={canvasRef}
            className="chest-anim s11-tabbar__chest-anim"
            width={149}
            height={149}
            style={{ width: '1.49rem', height: '1.49rem', display: 'block' }}
          />
        </button>
      </div>
    </div>
  );
}

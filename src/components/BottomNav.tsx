import { useEffect, useRef } from 'react';
import { getAssetUrl } from '../utils/assetUrl';
import chestLayersData from '../data/chestLayers.json';

interface BottomNavProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  onOpenAuth: (mode: 'login' | 'signup') => void;
  isLoggedIn: boolean;
}

interface LayerItem {
  box: number[];
  src: number[];
  t: number[];
  o: number[];
  rs: number[];
}

const chestLayers = chestLayersData as LayerItem[];
const S = 3000;
const X = 3.6;
const J = 100;

function interpolateProp(t: number[], n: number, s: number, c: number[]) {
  const a = t.length / n;
  let i = 0;
  for (; i < a - 2 && t[(i + 1) * n] <= s; ) i++;
  const r = i * n,
    g = Math.min(i + 1, a - 1) * n,
    _ = t[g] - t[r],
    v = _ > 0 ? Math.min(Math.max((s - t[r]) / _, 0), 1) : 0;
  for (let o = 1; o < n; o++) c[o - 1] = t[r + o] + (t[g + o] - t[r + o]) * v;
}

export function BottomNav({ activeTab, onSelectTab, onOpenAuth, isLoggedIn }: BottomNavProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let isMounted = true;
    let animId = 0;
    let l = 0;
    let p = 0;
    let imgLoaded = false;

    const x = [0, 0];
    const y = [0];
    const w = [0, 0, 0];

    const img = new Image();
    img.src = getAssetUrl('images/s11_chest_anim-Bq793_Bz.webp');

    const render = (timeElapsed: number) => {
      if (!ctx || !canvas || !imgLoaded || !canvas.width) return;
      const s = (timeElapsed % S) / S;
      const c = canvas.width / X;
      ctx.imageSmoothingQuality = 'high';
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let k = 0; k < chestLayers.length; k++) {
        const a = chestLayers[k];
        interpolateProp(a.o, 2, s, y);
        if (y[0] <= 0.001) continue;
        interpolateProp(a.t, 3, s, x);
        interpolateProp(a.rs, 4, s, w);
        const [i, r, g, _, v, o] = a.box;
        const [H, N, q, D] = a.src;
        ctx.globalAlpha = Math.min(y[0], 1);
        ctx.setTransform(c, 0, 0, c, 0, 0);
        ctx.translate(x[0] + i + v, x[1] + r + o);
        ctx.rotate((w[0] * Math.PI) / 180);
        ctx.scale(w[1], w[2]);
        ctx.drawImage(img, H, N, q, D, -v, -o, g, _);
      }
    };

    const loop = (timestamp: number) => {
      if (!isMounted) return;
      if (p) l += Math.min(timestamp - p, J);
      p = timestamp;
      render(l);
      animId = requestAnimationFrame(loop);
    };

    const resize = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 3);
      if (rect.width > 0 && rect.height > 0) {
        canvas.width = Math.round(rect.width * dpr);
        canvas.height = Math.round(rect.height * dpr);
      }
      render(l);
    };

    img.onload = () => {
      imgLoaded = true;
      resize();
      animId = requestAnimationFrame(loop);
    };

    window.addEventListener('resize', resize);

    return () => {
      isMounted = false;
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
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

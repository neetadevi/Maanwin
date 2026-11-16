import { getAssetUrl } from '../utils/assetUrl';

interface BottomNavProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  onOpenAuth: (mode: 'login' | 'signup') => void;
  isLoggedIn: boolean;
}

export function BottomNav({ activeTab, onSelectTab, onOpenAuth, isLoggedIn }: BottomNavProps) {
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
        {/* Glow & Dock */}
        <i className="s11-tabbar__dock" aria-hidden="true" />
        <i className="s11-tabbar__glow" aria-hidden="true" />
        <img
          className="s11-tabbar__bg"
          src={getAssetUrl('images/s11_tab_bg-Vd4rQYLh.svg')}
          alt=""
        />

        <div className="s11-tabbar__items">
          {/* Left Side: Home & Activity */}
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
                alt="Home"
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
                alt="Activity"
              />
              <span className="s11-tabbar__text">Activity</span>
            </button>
          </div>

          {/* Center Floating Chest Button */}
          <button
            type="button"
            className="s11-tabbar__chest"
            aria-label="Lucky Bonus"
            onClick={() => {
              if (!isLoggedIn) {
                onOpenAuth('login');
              } else {
                onSelectTab('activity');
              }
            }}
          >
            <img
              className="s11-tabbar__chest-anim"
              src={getAssetUrl('images/s11_chest_anim-Bq793_Bz.webp')}
              alt="Bonus Chest"
            />
          </button>

          {/* Right Side: Promotion & Mine */}
          <div className="s11-tabbar__side">
            <button
              type="button"
              className={`s11-tabbar__item ${activeTab === 'promotion' ? 'is-active' : ''}`}
              onClick={() => handleTabClick('promotion')}
            >
              <img
                className="s11-tabbar__icon"
                src={getAssetUrl(
                  activeTab === 'promotion'
                    ? 'images/s11_tab_wallet_sel-DsPeGhwb.svg'
                    : 'images/s11_tab_wallet_nor-DbYvdA44.svg'
                )}
                alt="Promotion"
              />
              <span className="s11-tabbar__text">Promotion</span>
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
                alt="Mine"
              />
              <span className="s11-tabbar__text">Mine</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

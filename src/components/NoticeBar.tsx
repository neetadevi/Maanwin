import { useAdminConfig } from '../context/AdminConfigContext';
import { getAssetUrl } from '../utils/assetUrl';

interface NoticeBarProps {
  lang: 'en' | 'hi';
}

export function NoticeBar({ lang }: NoticeBarProps) {
  const { config } = useAdminConfig();
  const noticeText = lang === 'en' ? config.noticeEn : config.noticeHi;

  return (
    <div className="s11-notice side-distance s11-home__notice">
      <img
        className="s11-notice__deco"
        src={getAssetUrl('assets/ar_saas11/home/s11_notice_skull-9712d031.webp')}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
      />
      <div className="s11-notice__main">
        <img
          className="s11-notice__horn"
          src={getAssetUrl('images/s11_notice_horn-C-8hsXzs.svg')}
          alt=""
          loading="lazy"
          decoding="async"
        />
        <div className="s11-notice__body">
          <p className="s11-notice__text s11-notice-slide-enter-from">
            {noticeText}
          </p>
        </div>
        <button
          type="button"
          className="s11-notice__btn"
          onClick={() => alert(noticeText)}
        >
          Details
        </button>
      </div>
    </div>
  );
}

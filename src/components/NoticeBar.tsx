import { useAdminConfig } from '../context/AdminConfigContext';
import { getAssetUrl } from '../utils/assetUrl';

interface NoticeBarProps {
  lang: 'en' | 'hi';
}

export function NoticeBar({ lang }: NoticeBarProps) {
  const { config } = useAdminConfig();
  const noticeText = lang === 'en' ? config.noticeEn : config.noticeHi;

  return (
    <div className="s11-home__notice">
      <div className="s11-notice">
        <div className="s11-notice__horn">
          <img
            src={getAssetUrl('images/s11_notice_horn-C-8hsXzs.svg')}
            alt="Notice"
            loading="lazy"
          />
        </div>
        <div className="s11-notice__body">
          <div className="s11-notice__text-marquee">
            <span>{noticeText}</span>
          </div>
        </div>
        <button
          type="button"
          className="s11-notice__btn"
          onClick={() => alert(noticeText)}
        >
          Detail &gt;
        </button>
      </div>
    </div>
  );
}

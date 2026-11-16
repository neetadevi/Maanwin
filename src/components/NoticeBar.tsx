import { Volume2, ChevronRight } from 'lucide-react';
import { useAdminConfig } from '../context/AdminConfigContext';

interface NoticeBarProps {
  lang: 'en' | 'hi';
}

export function NoticeBar({ lang }: NoticeBarProps) {
  const { config } = useAdminConfig();

  const noticeText = lang === 'en' ? config.noticeEn : config.noticeHi;

  return (
    <div className="notice-bar">
      <div className="notice-icon-box">
        <Volume2 size={18} className="speaker-icon" />
      </div>
      <div className="notice-content">
        <div className="notice-text-marquee">
          <span>{noticeText}</span>
        </div>
      </div>
      <button
        type="button"
        className="notice-btn"
        onClick={() => alert(noticeText)}
      >
        <span>Detail</span>
        <ChevronRight size={14} />
      </button>
    </div>
  );
}

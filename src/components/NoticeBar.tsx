import { Volume2, ChevronRight } from 'lucide-react';

interface NoticeBarProps {
  lang: 'en' | 'hi';
}

export function NoticeBar({ lang }: NoticeBarProps) {
  const noticeEn = '🔔 Welcome to Maanwin! YOUR GAMING, OUR PRIORITY! 24/7 SUPPORT · FAST SERVICE · EXCITING GAMES! Download our official app for exclusive VIP bonuses and instant withdrawal!';
  const noticeHi = '🔔 मान्विन में आपका स्वागत है! आपका गेमिंग, हमारी प्राथमिकता! 24/7 सहायता · तेज सर्विस · रोमांचक गेम्स! विशेष वीआईपी बोनस और तत्काल निकासी के लिए हमारा आधिकारिक ऐप डाउनलोड करें!';

  return (
    <div className="notice-bar">
      <div className="notice-icon-box">
        <Volume2 size={18} className="speaker-icon" />
      </div>
      <div className="notice-content">
        <div className="notice-text-marquee">
          <span>{lang === 'en' ? noticeEn : noticeHi}</span>
        </div>
      </div>
      <button
        type="button"
        className="notice-btn"
        onClick={() => alert(lang === 'en' ? noticeEn : noticeHi)}
      >
        <span>Detail</span>
        <ChevronRight size={14} />
      </button>
    </div>
  );
}

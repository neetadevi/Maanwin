import allGamesJson from './allGames.json';
import vendorsJson from './vendors.json';
import { getAssetUrl } from '../utils/assetUrl';

export interface GameItem {
  gameId: number | string;
  gameCode: string;
  name: string;
  vendorCode: string;
  img: string;
  type?: number;
  badge?: number;
  hot?: boolean;
}

export interface GameCategory {
  categoryCode: string;
  name: { en: string; hi: string };
  icon: string;
  games: GameItem[];
}

export interface VendorItem {
  vendorCode: string;
  vendorName: string;
  vendorLogo: string;
}

export interface BannerItem {
  id: number;
  img: string;
  title: string;
  subtitle: string;
}

// Banners matching live maanwin2.com
export const BANNERS: BannerItem[] = [
  {
    id: 1,
    img: getAssetUrl('images/user_assets/deposit_bonus_banner.png'),
    title: 'FIRST DEPOSIT BONUS 10%',
    subtitle: 'Deposit now and get up to ₹10,000 extra bonus!'
  },
  {
    id: 2,
    img: getAssetUrl('img/6015/banner/034552926-203051-file_20261023154552846.webp'),
    title: 'FIRST DEPOSIT BONUS 100%',
    subtitle: 'Deposit now and get up to ₹10,000 extra cash!'
  },
  {
    id: 3,
    img: getAssetUrl('img/6015/banner/123245682-142073-file_20260920123245625.webp'),
    title: 'YOUR GAMING, OUR PRIORITY!',
    subtitle: '24/7 SUPPORT · FAST SERVICE · EXCITING GAMES!'
  },
  {
    id: 3,
    img: getAssetUrl('img/6015/banner/110415258-141961-file_20260920110415198.webp'),
    title: 'VIP REWARDS & CASHBACK',
    subtitle: 'Daily rebate and instant VIP level upgrades!'
  },
  {
    id: 4,
    img: getAssetUrl('img/6015/banner/110119748-141955-file_20260920110119701.webp'),
    title: 'MEGA JACKPOT TOURNAMENT',
    subtitle: 'Play selected slots & win pool of 1 Crore!'
  },
  {
    id: 5,
    img: getAssetUrl('img/6015/banner/021640702-189919-file_20261018141640624.webp'),
    title: 'DAILY LUCKY WHEEL',
    subtitle: 'Spin daily & win instant cash prizes!'
  }
];

const categoryIconMap: Record<string, string> = {
  Crash: getAssetUrl('images/cat-crash.webp'),
  Lottery: getAssetUrl('images/cat-lottery.webp'),
  Slots: getAssetUrl('images/cat-slots.webp'),
  Sports: getAssetUrl('images/cat-sports.webp'),
  Fishing: getAssetUrl('images/cat-fishing.webp'),
  Casino: getAssetUrl('images/cat-casino.webp'),
  Poker: getAssetUrl('images/cat-poker.webp')
};

// Process categories and games from allGames.json
export const CATEGORIES: GameCategory[] = ((allGamesJson as any).data?.games || []).map((cat: any) => {
  const enName = cat.categoryNameDic?.en || 'Games';
  const hiName = cat.categoryNameDic?.hi || enName;
  const icon = categoryIconMap[enName] || getAssetUrl('images/cat-slots.webp');

  const games: GameItem[] = (cat.gameList || []).map((g: any, index: number) => {
    let localImg = '';
    if (g.img && (g.img.startsWith('images/user_assets/') || g.img.startsWith('user_assets/'))) {
      localImg = getAssetUrl(g.img.startsWith('/') ? g.img.slice(1) : g.img);
    } else {
      const filename = g.img ? g.img.split('/').pop() : '';
      localImg = filename ? getAssetUrl(`images/games/${filename}`) : '';
    }
    const fallbackImg = g.img ? (g.img.startsWith('images/') ? getAssetUrl(g.img) : `https://maanwin2.com${g.img}`) : '';

    return {
      gameId: g.gameId || index,
      gameCode: g.gameCode || `game-${index}`,
      name: g.name || 'Game',
      vendorCode: g.vendorCode || 'MAANWIN',
      img: localImg || fallbackImg,
      type: g.type,
      badge: g.badge,
      hot: index < 4 // Top 4 games marked as HOT
    };
  });

  return {
    categoryCode: cat.categoryCode || enName,
    name: { en: enName, hi: hiName },
    icon,
    games
  };
});

// Process vendors from vendors.json
export const VENDORS: VendorItem[] = ((vendorsJson as any).data || []).map((v: any) => {
  const filename = v.vendorLogo ? v.vendorLogo.split('/').pop() : '';
  const localLogo = filename ? getAssetUrl(`images/vendors/${filename}`) : '';
  const fallbackLogo = v.vendorLogo ? `https://maanwin2.com${v.vendorLogo}` : '';

  return {
    vendorCode: v.vendorCode,
    vendorName: v.vendorName || v.vendorCode,
    vendorLogo: localLogo || fallbackLogo
  };
});

// Simulated Live Winning Information
export interface WinnerRecord {
  id: string;
  phone: string;
  game: string;
  amount: string;
  avatar: string;
  time: string;
}

export const INITIAL_WINNERS: WinnerRecord[] = [
  { id: '1', phone: '91***3491', game: 'Aviator', amount: '₹14,500.00', avatar: '1', time: '1s ago' },
  { id: '2', phone: '91***8820', game: 'Win Go 1Min', amount: '₹3,920.00', avatar: '2', time: '3s ago' },
  { id: '3', phone: '91***5109', game: 'Super Ace', amount: '₹28,400.00', avatar: '3', time: '5s ago' },
  { id: '4', phone: '91***9042', game: 'Crazy Time', amount: '₹55,000.00', avatar: '4', time: '7s ago' },
  { id: '5', phone: '91***1734', game: 'Mines', amount: '₹8,250.00', avatar: '5', time: '9s ago' },
  { id: '6', phone: '91***6281', game: 'Fortune Tiger', amount: '₹19,800.00', avatar: '6', time: '12s ago' },
  { id: '7', phone: '91***4490', game: 'Mega Fishing', amount: '₹6,400.00', avatar: '7', time: '14s ago' },
  { id: '8', phone: '91***7318', game: 'Lightning Roulette', amount: '₹42,100.00', avatar: '8', time: '16s ago' }
];

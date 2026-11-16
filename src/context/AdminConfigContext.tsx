import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { BANNERS, INITIAL_WINNERS, type BannerItem, type WinnerRecord } from '../data/gamesData';

export interface WithdrawalRequest {
  id: string;
  userId: string;
  phone: string;
  amount: number;
  bankName: string;
  accountNo: string;
  ifsc: string;
  status: 'pending' | 'approved' | 'rejected';
  date: string;
}

export interface DepositRequest {
  id: string;
  userId: string;
  phone: string;
  amount: number;
  utr: string;
  status: 'pending' | 'approved' | 'rejected';
  date: string;
}

export interface AdminConfig {
  siteName: string;
  currencySymbol: string;
  minWithdrawal: number;
  maxWithdrawal: number;
  minDeposit: number;
  upiId: string;
  upiQrUrl: string;
  telegramUrl: string;
  whatsappUrl: string;
  noticeEn: string;
  noticeHi: string;
  banners: BannerItem[];
  winners: WinnerRecord[];
  userBalances: Record<string, number>; // key = userId or phone, value = balance amount
  userVipLevels: Record<string, number>;
  withdrawalRequests: WithdrawalRequest[];
  depositRequests: DepositRequest[];
  wingoNextNumber: number | null; // Admin controlled number 0-9
  adminPin: string;
}

const DEFAULT_CONFIG: AdminConfig = {
  siteName: 'Maanwin',
  currencySymbol: '₹',
  minWithdrawal: 110,
  maxWithdrawal: 50000,
  minDeposit: 100,
  upiId: 'maanwin.pay@upi',
  upiQrUrl: '',
  telegramUrl: 'https://t.me/maan_win',
  whatsappUrl: 'https://whatsapp.com/channel/0029Vb8IHU0AojYq6RyVDG3s',
  noticeEn: '✨ START YOUR MAAN.WIN JOURNEY ✨',
  noticeHi: '✨ मान्विन के साथ अपनी शानदार यात्रा शुरू करें ✨',
  banners: BANNERS,
  winners: INITIAL_WINNERS,
  userBalances: {
    'demo_user': 5000,
  },
  userVipLevels: {},
  withdrawalRequests: [
    {
      id: 'WTH-101',
      userId: 'usr_98124',
      phone: '91***4821',
      amount: 2500,
      bankName: 'State Bank of India',
      accountNo: 'XXXXXX4819',
      ifsc: 'SBIN0001234',
      status: 'pending',
      date: 'Today, 11:45 AM'
    },
    {
      id: 'WTH-102',
      userId: 'usr_76210',
      phone: '91***9032',
      amount: 14000,
      bankName: 'HDFC Bank',
      accountNo: 'XXXXXX9821',
      ifsc: 'HDFC0000521',
      status: 'approved',
      date: 'Today, 10:12 AM'
    }
  ],
  depositRequests: [
    {
      id: 'DEP-501',
      userId: 'usr_33109',
      phone: '91***2219',
      amount: 1000,
      utr: '431892819281',
      status: 'pending',
      date: 'Today, 12:05 PM'
    }
  ],
  wingoNextNumber: null,
  adminPin: 'admin888'
};

const STORAGE_KEY = 'maanwin_admin_config_v1';

interface AdminConfigContextType {
  config: AdminConfig;
  updateConfig: (partial: Partial<AdminConfig>) => void;
  updateUserBalance: (userKey: string, newBalance: number) => void;
  getUserBalance: (userKey?: string | null) => number;
  addWithdrawalRequest: (req: Omit<WithdrawalRequest, 'id' | 'status' | 'date'>) => void;
  updateWithdrawalStatus: (id: string, status: 'approved' | 'rejected' | 'pending') => void;
  addDepositRequest: (req: Omit<DepositRequest, 'id' | 'status' | 'date'>) => void;
  updateDepositStatus: (id: string, status: 'approved' | 'rejected' | 'pending') => void;
  resetDefaults: () => void;
}

const AdminConfigContext = createContext<AdminConfigContextType | undefined>(undefined);

export function AdminConfigProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<AdminConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        const banners = (parsed.banners && parsed.banners.length > 0 ? parsed.banners : BANNERS).map((b: BannerItem, i: number) => ({
          ...b,
          img: b.img || BANNERS[i % BANNERS.length].img
        }));
        return { ...DEFAULT_CONFIG, ...parsed, banners };
      }
    } catch (e) {
      console.error('Error loading admin config:', e);
    }
    return DEFAULT_CONFIG;
  });

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    } catch (e) {
      console.error('Failed to save admin config:', e);
    }
  }, [config]);

  // Listen to cross-tab storage changes so admin edits sync to frontend tab in real-time!
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          setConfig(JSON.parse(e.newValue));
        } catch (err) {
          console.error(err);
        }
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const updateConfig = (partial: Partial<AdminConfig>) => {
    setConfig((prev) => ({ ...prev, ...partial }));
  };

  const updateUserBalance = (userKey: string, newBalance: number) => {
    setConfig((prev) => ({
      ...prev,
      userBalances: {
        ...prev.userBalances,
        [userKey]: Math.max(0, newBalance)
      }
    }));
  };

  const getUserBalance = (userKey?: string | null): number => {
    if (!userKey) return 0;
    // Check direct key, or default to 0
    return config.userBalances[userKey] !== undefined ? config.userBalances[userKey] : 0;
  };

  const addWithdrawalRequest = (req: Omit<WithdrawalRequest, 'id' | 'status' | 'date'>) => {
    const newReq: WithdrawalRequest = {
      ...req,
      id: `WTH-${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'pending',
      date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ', Today'
    };
    setConfig((prev) => ({
      ...prev,
      withdrawalRequests: [newReq, ...prev.withdrawalRequests]
    }));
  };

  const updateWithdrawalStatus = (id: string, status: 'approved' | 'rejected' | 'pending') => {
    setConfig((prev) => ({
      ...prev,
      withdrawalRequests: prev.withdrawalRequests.map((r) =>
        r.id === id ? { ...r, status } : r
      )
    }));
  };

  const addDepositRequest = (req: Omit<DepositRequest, 'id' | 'status' | 'date'>) => {
    const newReq: DepositRequest = {
      ...req,
      id: `DEP-${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'pending',
      date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ', Today'
    };
    setConfig((prev) => ({
      ...prev,
      depositRequests: [newReq, ...prev.depositRequests]
    }));
  };

  const updateDepositStatus = (id: string, status: 'approved' | 'rejected' | 'pending') => {
    setConfig((prev) => {
      const target = prev.depositRequests.find((d) => d.id === id);
      const nextUserBalances = { ...prev.userBalances };

      // If approved, automatically credit the user's wallet!
      if (status === 'approved' && target && target.status !== 'approved') {
        const currentBal = nextUserBalances[target.userId] || 0;
        nextUserBalances[target.userId] = currentBal + target.amount;
      }

      return {
        ...prev,
        userBalances: nextUserBalances,
        depositRequests: prev.depositRequests.map((d) =>
          d.id === id ? { ...d, status } : d
        )
      };
    });
  };

  const resetDefaults = () => {
    setConfig(DEFAULT_CONFIG);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <AdminConfigContext.Provider
      value={{
        config,
        updateConfig,
        updateUserBalance,
        getUserBalance,
        addWithdrawalRequest,
        updateWithdrawalStatus,
        addDepositRequest,
        updateDepositStatus,
        resetDefaults
      }}
    >
      {children}
    </AdminConfigContext.Provider>
  );
}

export function useAdminConfig() {
  const context = useContext(AdminConfigContext);
  if (!context) {
    throw new Error('useAdminConfig must be used within AdminConfigProvider');
  }
  return context;
}

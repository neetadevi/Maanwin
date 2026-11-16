import { useState, useEffect } from 'react';
import { useAuth } from './context/AuthContext';
import { useAdminConfig } from './context/AdminConfigContext';
import { Header } from './components/Header';
import { BalanceCard } from './components/BalanceCard';
import { BannerSlider } from './components/BannerSlider';
import { NoticeBar } from './components/NoticeBar';
import { EntriesSection } from './components/EntriesSection';
import { PopularSection } from './components/PopularSection';
import { CategoryNav } from './components/CategoryNav';
import { FeaturedSection } from './components/FeaturedSection';
import { WingoWidget } from './components/WingoWidget';
import { GamesGrid } from './components/GamesGrid';
import { WinningSection } from './components/WinningSection';
import { VendorsSection } from './components/VendorsSection';
import { Footer } from './components/Footer';
import { BottomNav } from './components/BottomNav';
import { AuthModal } from './components/AuthModal';
import { GamePlayModal } from './components/GamePlayModal';
import { AdminPanel } from './components/AdminPanel';
import { ActivityView, PromotionView, WalletView, MineView } from './components/TabsContent';
import { CATEGORIES, type GameItem } from './data/gamesData';

export default function App() {
  const { user } = useAuth();
  const { config } = useAdminConfig();

  // Route state: check if URL is /admin or #/admin
  const [isAdminRoute, setIsAdminRoute] = useState<boolean>(() => {
    const hash = window.location.hash.toLowerCase();
    const path = window.location.pathname.toLowerCase();
    const search = window.location.search.toLowerCase();
    return hash.includes('admin') || path.endsWith('/admin') || path.endsWith('/admin/') || search.includes('admin');
  });

  useEffect(() => {
    const handleUrlChange = () => {
      const hash = window.location.hash.toLowerCase();
      const path = window.location.pathname.toLowerCase();
      const search = window.location.search.toLowerCase();
      setIsAdminRoute(hash.includes('admin') || path.endsWith('/admin') || path.endsWith('/admin/') || search.includes('admin'));
    };

    window.addEventListener('hashchange', handleUrlChange);
    window.addEventListener('popstate', handleUrlChange);
    return () => {
      window.removeEventListener('hashchange', handleUrlChange);
      window.removeEventListener('popstate', handleUrlChange);
    };
  }, []);

  // Navigation & Category states
  const [activeTab, setActiveTab] = useState<string>('home');
  const [activeCategoryCode, setActiveCategoryCode] = useState<string>(
    CATEGORIES[0]?.categoryCode || 'Crash'
  );
  const [lang, setLang] = useState<'en' | 'hi'>('en');

  // Modals state
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [activeGame, setActiveGame] = useState<GameItem | null>(null);

  const openAuth = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  const handlePlayGame = (game: GameItem) => {
    setActiveGame(game);
  };

  const currentCategory = CATEGORIES.find(
    (c) => c.categoryCode === activeCategoryCode
  ) || CATEGORIES[0];

  // All games flattened for popular section
  const allGames = CATEGORIES.flatMap((c) => c.games);

  // If in Admin Mode, render the Admin Control Center
  if (isAdminRoute) {
    return (
      <AdminPanel
        onBackToSite={() => {
          window.location.hash = '';
          setIsAdminRoute(false);
        }}
      />
    );
  }

  return (
    <div className="app-shell">
      {/* Top Header */}
      <Header
        onOpenAuth={openAuth}
        lang={lang}
        onToggleLang={() => setLang(lang === 'en' ? 'hi' : 'en')}
        onNavigateTab={(tab) => setActiveTab(tab)}
      />

      {/* Main Tab Content */}
      <main className="main-viewport">
        {activeTab === 'home' && (
          <div className="home-view-scroll">
            {/* Balance Card */}
            <BalanceCard
              onOpenAuth={openAuth}
              onNavigateTab={(tab) => setActiveTab(tab)}
            />

            {/* Banner Slider */}
            <BannerSlider />

            {/* Scrolling Marquee Notice (Real-time synced with Admin) */}
            <NoticeBar lang={lang} />

            {/* Entries: Daily Check-in & Lucky Wheel */}
            <EntriesSection
              onOpenCheckin={() => (!user ? openAuth('login') : setActiveTab('activity'))}
              onOpenWheel={() => (!user ? openAuth('login') : setActiveTab('activity'))}
            />

            {/* Popular Games Scroller with Win-Rate Bar */}
            <PopularSection
              games={allGames}
              onPlayGame={handlePlayGame}
              onSeeMore={() => {
                const el = document.getElementById('lobby-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            {/* Category Navigation Lobby Grid */}
            <div id="lobby-section">
              <CategoryNav
                activeCategory={activeCategoryCode}
                onSelectCategory={setActiveCategoryCode}
                lang={lang}
              />
            </div>

            {/* Featured Games Carousel Strip */}
            <FeaturedSection onPlayGame={handlePlayGame} />

            {/* If Lottery is active, show the interactive Win Go widget! */}
            {(activeCategoryCode.includes('Lottery') || activeCategoryCode === 'C202505220412050186') && (
              <WingoWidget onPlay={() => openAuth('login')} />
            )}

            {/* Games Grid for current category */}
            <GamesGrid
              games={currentCategory?.games || []}
              categoryTitle={lang === 'hi' ? currentCategory?.name.hi : currentCategory?.name.en}
              onPlayGame={handlePlayGame}
            />

            {/* Live Winning Information (Synced with Admin) */}
            <WinningSection />

            {/* Platform Partners / Vendors */}
            <VendorsSection />

            {/* Trust Badges & Footer */}
            <Footer />
          </div>
        )}

        {activeTab === 'activity' && <ActivityView onOpenAuth={openAuth} />}
        {activeTab === 'promotion' && <PromotionView onOpenAuth={openAuth} />}
        {activeTab === 'wallet' && <WalletView onOpenAuth={openAuth} />}
        {activeTab === 'mine' && <MineView onOpenAuth={openAuth} />}
      </main>

      {/* Floating Customer Support Button */}
      <a
        href={config.telegramUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="floating-telegram-btn"
        title="24/7 Telegram Support"
      >
        <span className="online-dot" />
        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
        </svg>
      </a>

      {/* Floating Bottom Dock Navigation */}
      <BottomNav
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onOpenAuth={openAuth}
        isLoggedIn={!!user}
      />

      {/* Supabase Gmail ID + Password Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        initialMode={authMode}
        onClose={() => setAuthModalOpen(false)}
      />

      {/* Simulated Game Play Modal */}
      {activeGame && (
        <GamePlayModal
          game={activeGame}
          onClose={() => setActiveGame(null)}
          isLoggedIn={!!user}
          onPromptLogin={() => openAuth('login')}
        />
      )}
    </div>
  );
}

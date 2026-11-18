/**
 * MAANWIN2-CLONE: Movie Hub & Streaming Interactive Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  // Sample Movies Catalog
  const MOVIES_DATABASE = [
    {
      id: 'm1',
      title: 'The Quantum Realm',
      genre: 'Sci-Fi',
      rating: '9.3',
      year: '2026',
      poster: './assets/posters/m1.svg',
      desc: 'When quantum researchers accidentally pierce through the multiverse boundary, they trigger an irreversible rift across parallel dimensions that only a fractured crew can seal.',
      popularity: 95
    },
    {
      id: 'm2',
      title: 'Apex Predator',
      genre: 'Action',
      rating: '8.8',
      year: '2026',
      poster: './assets/posters/m2.svg',
      desc: 'An elite ex-special forces operative is stranded in an uncharted biome where bioengineered prehistoric predators rule the jungle canopy.',
      popularity: 88
    },
    {
      id: 'm3',
      title: 'Midnight Whispers',
      genre: 'Thriller',
      rating: '8.6',
      year: '2025',
      poster: './assets/posters/m3.svg',
      desc: 'A radio host in a remote Alaskan town starts receiving cryptic emergency signals on an unassigned frequency that accurately predicts incoming catastrophes.',
      popularity: 82
    },
    {
      id: 'm4',
      title: 'Neon Horizon',
      genre: 'Sci-Fi',
      rating: '9.0',
      year: '2026',
      poster: './assets/posters/m4.svg',
      desc: 'In a rain-drenched megacity running on sentient network nodes, an underground cyber-courier discovers an encrypted consciousness that could dismantle corporate tyranny.',
      popularity: 91
    },
    {
      id: 'm5',
      title: 'Laughing Gas',
      genre: 'Comedy',
      rating: '8.2',
      year: '2025',
      poster: './assets/posters/m5.svg',
      desc: 'Two incompetent rival detectives get trapped inside an eccentric billionaire’s automated mansion and must solve their own staged murder to escape.',
      popularity: 78
    },
    {
      id: 'm6',
      title: 'The Silent Hour',
      genre: 'Drama',
      rating: '8.9',
      year: '2026',
      poster: './assets/posters/m6.svg',
      desc: 'A gripping court drama tracking an enigmatic defense attorney defending a silent whistleblower accused of revealing global financial conspiracies.',
      popularity: 86
    },
    {
      id: 'm7',
      title: 'Haunted Echoes',
      genre: 'Horror',
      rating: '8.4',
      year: '2025',
      poster: './assets/posters/m7.svg',
      desc: 'A sound design team recording ambient foley inside an abandoned Victorian sanatorium unleashes auditory entities that manipulate victims through acoustic terror.',
      popularity: 80
    },
    {
      id: 'm8',
      title: 'Dragon Chronicles',
      genre: 'Animation',
      rating: '9.1',
      year: '2026',
      poster: './assets/posters/m8.svg',
      desc: 'A young blacksmith discovers the forgotten language of ancient elemental dragons and embarks on a skyward quest across floating continents.',
      popularity: 92
    },
    {
      id: 'm9',
      title: 'Galactic Bounty',
      genre: 'Sci-Fi',
      rating: '8.7',
      year: '2026',
      poster: './assets/posters/m9.svg',
      desc: 'Outlaws, bounty hunters, and imperial marshals collide in the asteroid belt over a sentient stellar artifact of immense cosmic power.',
      popularity: 85
    },
    {
      id: 'm10',
      title: 'Steel & Fire',
      genre: 'Action',
      rating: '8.5',
      year: '2025',
      poster: './assets/posters/m10.svg',
      desc: 'High-octane heist thriller featuring an armored convoy crossing hostile territory with rival syndicates chasing from all directions.',
      popularity: 84
    },
    {
      id: 'm11',
      title: 'Secrets of Atlantis',
      genre: 'Action',
      rating: '9.0',
      year: '2026',
      poster: './assets/posters/m11.svg',
      desc: 'Deep oceanic explorers uncover submerged megalithic structures harboring technological marvels that rewrite human history.',
      popularity: 89
    },
    {
      id: 'm12',
      title: 'The Last Stand',
      genre: 'Action',
      rating: '8.9',
      year: '2026',
      poster: './assets/posters/m12.svg',
      desc: 'A small frontier garrison defends against overwhelming forces to protect a secret refuge in a relentless, pulse-pounding siege.',
      popularity: 87
    }
  ];

  // DOM Elements
  const movieGrid = document.getElementById('movie-grid');
  const movieCount = document.getElementById('movie-count');
  const currentCategoryTitle = document.getElementById('current-category-title');
  const trendingScroller = document.getElementById('trending-scroller');
  const categoryPills = document.querySelectorAll('.cat-pill');
  const searchInput = document.getElementById('movie-search-input');
  const searchBarWrap = document.getElementById('search-bar-wrap');
  const btnSearch = document.getElementById('btn-search');
  const btnClearSearch = document.getElementById('btn-clear-search');
  
  // Modals
  const movieModal = document.getElementById('movie-modal');
  const btnCloseModal = document.getElementById('btn-close-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalRating = document.getElementById('modal-rating');
  const modalGenre = document.getElementById('modal-genre');
  const modalYear = document.getElementById('modal-year');
  const modalDesc = document.getElementById('modal-desc');
  const modalPosterImg = document.getElementById('modal-poster-img');
  const btnModalWatch = document.getElementById('btn-modal-watch');
  const btnModalWatchlist = document.getElementById('btn-modal-watchlist');
  const btnPlayTrailer = document.getElementById('btn-play-trailer');
  
  const vipModal = document.getElementById('vip-modal');
  const btnVipPass = document.getElementById('btn-vip-pass');
  const btnCloseVip = document.getElementById('btn-close-vip');
  const btnClaimVip = document.getElementById('btn-claim-vip');
  const btnGoldChest = document.getElementById('btn-gold-chest');
  const btnDailyPass = document.getElementById('btn-daily-pass');
  const btnTrendingWheel = document.getElementById('btn-trending-wheel');

  // Slider Elements
  const sliderTrack = document.getElementById('slider-track');
  const sliderDots = document.querySelectorAll('.slider-dots .dot');
  let currentSlide = 0;
  let slideInterval;

  // 1. Initialize Banners Slider
  function setSlide(index) {
    currentSlide = index;
    sliderTrack.style.transform = `translateX(-${currentSlide * 33.3333}%)`;
    sliderDots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === currentSlide);
    });
  }

  function startSlider() {
    slideInterval = setInterval(() => {
      currentSlide = (currentSlide + 1) % 3;
      setSlide(currentSlide);
    }, 4000);
  }

  sliderDots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      clearInterval(slideInterval);
      setSlide(parseInt(e.target.dataset.index, 10));
      startSlider();
    });
  });

  startSlider();

  // 2. Render Popular / Trending Scroller
  function renderTrending() {
    trendingScroller.innerHTML = '';
    const sorted = [...MOVIES_DATABASE].sort((a, b) => b.popularity - a.popularity).slice(0, 6);
    sorted.forEach(m => {
      const card = document.createElement('div');
      card.className = 'trending-card';
      card.innerHTML = `
        <img src="${m.poster}" alt="${m.title}" loading="lazy" />
        <div class="trending-card-info">
          <div class="trending-card-title">${m.title}</div>
          <div class="trending-card-sub">
            <span>${m.genre}</span>
            <span class="score-star">★ ${m.rating}</span>
          </div>
          <div class="popularity-bar">
            <div class="popularity-fill" style="width: ${m.popularity}%"></div>
          </div>
        </div>
      `;
      card.addEventListener('click', () => openMovieModal(m));
      trendingScroller.appendChild(card);
    });
  }

  // 3. Render Main Movies Grid
  function renderMovies(filteredList) {
    movieGrid.innerHTML = '';
    movieCount.textContent = `${filteredList.length} Titles`;

    if (filteredList.length === 0) {
      movieGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 2.5rem 1rem; color: #9CA3AF;">
          <p style="font-size: 1.5rem; margin-bottom: 0.5rem;">🔍</p>
          <p style="font-weight: 600;">No movies found</p>
          <p style="font-size: 0.75rem; margin-top: 0.25rem;">Try another keyword or genre filter.</p>
        </div>
      `;
      return;
    }

    filteredList.forEach(m => {
      const card = document.createElement('div');
      card.className = 'movie-card';
      card.innerHTML = `
        <div class="poster-wrapper">
          <img src="${m.poster}" alt="${m.title}" loading="lazy" />
        </div>
        <div class="card-info">
          <div class="card-title">${m.title}</div>
          <div class="card-genre">${m.genre} • ${m.year}</div>
        </div>
      `;
      card.addEventListener('click', () => openMovieModal(m));
      movieGrid.appendChild(card);
    });
  }

  // 4. Category Filtering
  let activeCategory = 'all';

  categoryPills.forEach(pill => {
    pill.addEventListener('click', () => {
      categoryPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeCategory = pill.dataset.cat;
      
      currentCategoryTitle.textContent = activeCategory === 'all' ? 'Featured Releases' : `${activeCategory} Blockbusters`;

      filterAndDisplay();
    });
  });

  // 5. Search Bar Handling
  btnSearch.addEventListener('click', () => {
    searchBarWrap.classList.toggle('show');
    if (searchBarWrap.classList.contains('show')) {
      searchInput.focus();
    }
  });

  btnClearSearch.addEventListener('click', () => {
    searchInput.value = '';
    filterAndDisplay();
  });

  searchInput.addEventListener('input', () => {
    filterAndDisplay();
  });

  function filterAndDisplay() {
    const q = searchInput.value.trim().toLowerCase();
    const result = MOVIES_DATABASE.filter(m => {
      const matchCat = activeCategory === 'all' || m.genre.toLowerCase() === activeCategory.toLowerCase();
      const matchQuery = !q || m.title.toLowerCase().includes(q) || m.genre.toLowerCase().includes(q) || m.year.includes(q);
      return matchCat && matchQuery;
    });
    renderMovies(result);
  }

  // 6. Movie Details Modal
  let activeMovie = null;

  function openMovieModal(movie) {
    activeMovie = movie;
    modalTitle.textContent = movie.title;
    modalRating.textContent = `★ ${movie.rating}`;
    modalGenre.textContent = movie.genre;
    modalYear.textContent = movie.year;
    modalDesc.textContent = movie.desc;
    modalPosterImg.src = movie.poster;
    movieModal.classList.add('show');
  }

  btnCloseModal.addEventListener('click', () => {
    movieModal.classList.remove('show');
  });

  btnPlayTrailer.addEventListener('click', () => {
    if (!activeMovie) return;
    alert(`🎬 Now playing official 4K HDR teaser trailer for: ${activeMovie.title}`);
  });

  btnModalWatch.addEventListener('click', () => {
    if (!activeMovie) return;
    alert(`▶ Streaming "${activeMovie.title}" in 4K Ultra HD Dolby Vision!`);
  });

  btnModalWatchlist.addEventListener('click', () => {
    if (!activeMovie) return;
    alert(`✓ "${activeMovie.title}" added to your personal Watchlist.`);
    movieModal.classList.remove('show');
  });

  // Close modals on backdrop click
  window.addEventListener('click', (e) => {
    if (e.target === movieModal) movieModal.classList.remove('show');
    if (e.target === vipModal) vipModal.classList.remove('show');
  });

  // 7. VIP Modal & Chest
  const openVip = () => vipModal.classList.add('show');
  btnVipPass.addEventListener('click', openVip);
  btnGoldChest.addEventListener('click', openVip);
  btnDailyPass.addEventListener('click', openVip);
  btnCloseVip.addEventListener('click', () => vipModal.classList.remove('show'));

  btnClaimVip.addEventListener('click', () => {
    alert('🎉 Congratulations! 7-Day Free VIP Pass has been activated for your device.');
    vipModal.classList.remove('show');
  });

  btnTrendingWheel.addEventListener('click', () => {
    alert('🎡 Wheel Spin Result: You unlocked 1x Free Concession Box + HD Movie Voucher!');
  });

  // 8. Bottom Dock Item Switching
  const dockItems = document.querySelectorAll('.dock-item');
  dockItems.forEach(item => {
    item.addEventListener('click', () => {
      dockItems.forEach(i => i.classList.remove('is-active'));
      item.classList.add('is-active');
      const tab = item.dataset.tab;
      if (tab === 'trending') {
        const el = document.getElementById('trending-scroller');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } else if (tab === 'watchlist') {
        alert('📂 Your Watchlist: 3 Movies saved for offline viewing.');
      } else if (tab === 'profile') {
        openVip();
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  });

  // Initial Render
  renderTrending();
  renderMovies(MOVIES_DATABASE);
});

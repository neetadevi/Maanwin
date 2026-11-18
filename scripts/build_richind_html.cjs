const fs = require('fs');
const path = require('path');

const richindHtml = `<!doctype html>
<html class="no-js" lang="en">
<head>
  <meta charset="utf-8">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <title>RichInd - Online Courses & Education</title>
  <meta name="description" content="RichInd - Online Courses & Education platform. Learn high-income skills, trading, digital marketing and freelance opportunities.">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="shortcut icon" type="image/x-icon" href="https://richind.org/frontend/assets/images/favicon.png">
  
  <!-- CSS Stylesheets -->
  <link rel="stylesheet" href="https://richind.org/frontend/assets/css/bootstrap.min.css" />
  <link rel="stylesheet" href="https://richind.org/frontend/assets/css/animate.min.css" />
  <link rel="stylesheet" href="https://richind.org/frontend/assets/css/custom-animate.css" />
  <link rel="stylesheet" href="https://richind.org/frontend/assets/css/font-awesome-all.css" />
  <link rel="stylesheet" href="https://richind.org/frontend/assets/css/jquery.magnific-popup.css" />
  <link rel="stylesheet" href="https://richind.org/frontend/assets/css/owl.carousel.min.css" />
  <link rel="stylesheet" href="https://richind.org/frontend/assets/css/owl.theme.default.min.css" />
  <link rel="stylesheet" href="https://richind.org/frontend/assets/css/select2.min.css" />
  <link rel="stylesheet" href="https://richind.org/frontend/assets/webfonts/gordita.css" />
  <link rel="stylesheet" href="https://richind.org/frontend/assets/css/style.css" />
  <link rel="stylesheet" href="https://richind.org/frontend/assets/css/responsive.css" />
  <link rel="stylesheet" href="https://richind.org/backend/css/bootstrap-4.min.css">
  <link rel="stylesheet" href="https://richind.org/frontend/assets/css/diwali-theme.css?v=1793953284" />

  <!-- Supabase CDN Client -->
  <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>

  <style>
    /* Custom Smooth Overrides */
    .accrodion-content {
      display: none;
    }
    .accrodion.active .accrodion-content {
      display: block;
    }
    .accrodion-title {
      cursor: pointer;
      user-select: none;
    }
    .mobile-nav__wrapper {
      transition: opacity 0.3s ease, visibility 0.3s ease;
    }
    .mobile-nav__wrapper.expanded {
      opacity: 1;
      visibility: visible;
    }
    .dw-intro-skip {
      cursor: pointer;
      z-index: 10000;
    }

    /* Embedded Supabase Auth Modal */
    .sb-modal-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(10, 15, 29, 0.85);
      backdrop-filter: blur(8px);
      z-index: 999999;
      display: none;
      align-items: center;
      justify-content: center;
      padding: 1rem;
      opacity: 0;
      transition: opacity 0.25s ease;
    }
    .sb-modal-backdrop.show {
      display: flex;
      opacity: 1;
    }
    .sb-modal-box {
      background: #111827;
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 16px;
      max-width: 440px;
      width: 100%;
      padding: 2rem;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7);
      color: #fff;
      position: relative;
      animation: sbModalPop 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }
    @keyframes sbModalPop {
      from { transform: scale(0.92) translateY(12px); opacity: 0; }
      to { transform: scale(1) translateY(0); opacity: 1; }
    }
    .sb-modal-close {
      position: absolute;
      top: 1rem;
      right: 1rem;
      background: rgba(255, 255, 255, 0.08);
      border: none;
      color: #9ca3af;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font-size: 1.1rem;
      transition: all 0.2s;
    }
    .sb-modal-close:hover {
      background: rgba(255, 255, 255, 0.2);
      color: #fff;
    }
    .sb-tabs {
      display: flex;
      background: #1f2937;
      border-radius: 8px;
      padding: 4px;
      margin: 1.25rem 0;
    }
    .sb-tab-btn {
      flex: 1;
      padding: 8px 12px;
      border: none;
      background: transparent;
      color: #9ca3af;
      font-weight: 600;
      font-size: 0.9rem;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.2s;
    }
    .sb-tab-btn.active {
      background: #f59e0b;
      color: #000;
    }
    .sb-input-group {
      margin-bottom: 1rem;
      text-align: left;
    }
    .sb-input-group label {
      display: block;
      font-size: 0.85rem;
      color: #d1d5db;
      margin-bottom: 0.35rem;
      font-weight: 500;
    }
    .sb-input-group input {
      width: 100%;
      background: #1f2937;
      border: 1px solid #374151;
      border-radius: 8px;
      padding: 10px 14px;
      color: #fff;
      font-size: 0.95rem;
      outline: none;
      transition: border-color 0.2s;
    }
    .sb-input-group input:focus {
      border-color: #f59e0b;
    }
    .sb-submit-btn {
      width: 100%;
      background: linear-gradient(135deg, #f59e0b 0%, #ea580c 100%);
      color: #fff;
      border: none;
      padding: 12px;
      border-radius: 8px;
      font-weight: 700;
      font-size: 1rem;
      cursor: pointer;
      margin-top: 0.5rem;
      transition: transform 0.15s, opacity 0.2s;
    }
    .sb-submit-btn:hover {
      opacity: 0.95;
      transform: translateY(-1px);
    }
    .sb-msg-box {
      margin-top: 0.75rem;
      padding: 8px 12px;
      border-radius: 6px;
      font-size: 0.85rem;
      display: none;
    }
    .sb-msg-box.error {
      background: rgba(239, 68, 68, 0.15);
      border: 1px solid #ef4444;
      color: #fca5a5;
      display: block;
    }
    .sb-msg-box.success {
      background: rgba(16, 185, 129, 0.15);
      border: 1px solid #10b981;
      color: #6ee7b7;
      display: block;
    }
  </style>
</head>

<body class="custom-cursor">
  <div class="custom-cursor__cursor"></div>
  <div class="custom-cursor__cursor-two"></div>

  <!-- Diwali Intro Animation -->
  <div class="dw-intro" id="dwIntro" role="dialog" aria-label="Shubh Deepavali from Rich India">
    <div class="dw-i-glow"></div>
    <div class="dw-i-petals" aria-hidden="true">
      <span style="left:0%;animation-delay:-0s;animation-duration:8s;--r:-40deg;--w:-30px"></span>
      <span style="left:6%;animation-delay:-0s;animation-duration:9.6s;--r:47deg;--w:52px"></span>
      <span style="left:12%;animation-delay:-1s;animation-duration:11.2s;--r:-54deg;--w:-74px"></span>
      <span style="left:14%;animation-delay:-2s;animation-duration:12.8s;--r:61deg;--w:96px"></span>
      <span style="left:20%;animation-delay:-3s;animation-duration:14.4s;--r:-68deg;--w:-30px"></span>
      <span style="left:26%;animation-delay:-4s;animation-duration:8s;--r:75deg;--w:52px"></span>
      <span style="left:28%;animation-delay:-5s;animation-duration:9.6s;--r:-82deg;--w:-74px"></span>
      <span style="left:34%;animation-delay:-6s;animation-duration:11.2s;--r:89deg;--w:96px"></span>
      <span style="left:40%;animation-delay:-7s;animation-duration:12.8s;--r:-96deg;--w:-30px"></span>
      <span style="left:42%;animation-delay:-8s;animation-duration:14.4s;--r:103deg;--w:52px"></span>
      <span style="left:48%;animation-delay:-9s;animation-duration:8s;--r:-110deg;--w:-74px"></span>
      <span style="left:54%;animation-delay:-9s;animation-duration:9.6s;--r:117deg;--w:96px"></span>
      <span style="left:56%;animation-delay:-10s;animation-duration:11.2s;--r:-124deg;--w:-30px"></span>
      <span style="left:62%;animation-delay:-0s;animation-duration:12.8s;--r:131deg;--w:52px"></span>
      <span style="left:68%;animation-delay:-1s;animation-duration:14.4s;--r:-138deg;--w:-74px"></span>
      <span style="left:70%;animation-delay:-2s;animation-duration:8s;--r:145deg;--w:96px"></span>
      <span style="left:76%;animation-delay:-3s;animation-duration:9.6s;--r:-152deg;--w:-30px"></span>
      <span style="left:82%;animation-delay:-4s;animation-duration:11.2s;--r:159deg;--w:52px"></span>
      <span style="left:84%;animation-delay:-5s;animation-duration:12.8s;--r:-166deg;--w:-74px"></span>
      <span style="left:90%;animation-delay:-6s;animation-duration:14.4s;--r:173deg;--w:96px"></span>
      <span style="left:96%;animation-delay:-7s;animation-duration:8s;--r:-180deg;--w:-30px"></span>
      <span style="left:98%;animation-delay:-7s;animation-duration:9.6s;--r:187deg;--w:52px"></span>
    </div>

    <svg class="dw-i-toran" viewBox="0 0 1000 70" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0 4 Q250 96 500 4 Q750 96 1000 4" fill="none" stroke="#3d7a2a" stroke-width="2"/>
      <circle class="dw-i-flower" cx="0" cy="8" r="7.5" fill="#ff9f1c" style="animation-delay:0s"/>
      <circle cx="0" cy="8" r="2.6" fill="#b34700"/>
      <circle class="dw-i-flower" cx="25" cy="16.7" r="7.5" fill="#ffcf33" style="animation-delay:0.05s"/>
      <circle cx="25" cy="16.7" r="2.6" fill="#b34700"/>
      <circle class="dw-i-flower" cx="50" cy="24.6" r="7.5" fill="#ff6b00" style="animation-delay:0.1s"/>
      <circle cx="50" cy="24.6" r="2.6" fill="#b34700"/>
      <circle class="dw-i-flower" cx="75" cy="31.5" r="7.5" fill="#ffb703" style="animation-delay:0.15s"/>
      <circle cx="75" cy="31.5" r="2.6" fill="#b34700"/>
      <circle class="dw-i-flower" cx="100" cy="37.4" r="7.5" fill="#ff9f1c" style="animation-delay:0.2s"/>
      <circle cx="100" cy="37.4" r="2.6" fill="#b34700"/>
      <circle class="dw-i-flower" cx="125" cy="42.5" r="7.5" fill="#ffcf33" style="animation-delay:0.25s"/>
      <circle cx="125" cy="42.5" r="2.6" fill="#b34700"/>
      <circle class="dw-i-flower" cx="150" cy="46.6" r="7.5" fill="#ff6b00" style="animation-delay:0.3s"/>
      <circle cx="150" cy="46.6" r="2.6" fill="#b34700"/>
      <circle class="dw-i-flower" cx="175" cy="49.9" r="7.5" fill="#ffb703" style="animation-delay:0.35s"/>
      <circle cx="175" cy="49.9" r="2.6" fill="#b34700"/>
      <circle class="dw-i-flower" cx="200" cy="52.2" r="7.5" fill="#ff9f1c" style="animation-delay:0.4s"/>
      <circle cx="200" cy="52.2" r="2.6" fill="#b34700"/>
      <circle class="dw-i-flower" cx="225" cy="53.5" r="7.5" fill="#ffcf33" style="animation-delay:0.45s"/>
      <circle cx="225" cy="53.5" r="2.6" fill="#b34700"/>
      <circle class="dw-i-flower" cx="250" cy="54" r="7.5" fill="#ff6b00" style="animation-delay:0.5s"/>
      <circle cx="250" cy="54" r="2.6" fill="#b34700"/>
      <circle class="dw-i-flower" cx="275" cy="53.5" r="7.5" fill="#ffb703" style="animation-delay:0.55s"/>
      <circle cx="275" cy="53.5" r="2.6" fill="#b34700"/>
      <circle class="dw-i-flower" cx="300" cy="52.2" r="7.5" fill="#ff9f1c" style="animation-delay:0.6s"/>
      <circle cx="300" cy="52.2" r="2.6" fill="#b34700"/>
      <circle class="dw-i-flower" cx="325" cy="49.9" r="7.5" fill="#ffcf33" style="animation-delay:0.65s"/>
      <circle cx="325" cy="49.9" r="2.6" fill="#b34700"/>
      <circle class="dw-i-flower" cx="350" cy="46.6" r="7.5" fill="#ff6b00" style="animation-delay:0.7s"/>
      <circle cx="350" cy="46.6" r="2.6" fill="#b34700"/>
      <circle class="dw-i-flower" cx="375" cy="42.5" r="7.5" fill="#ffb703" style="animation-delay:0.75s"/>
      <circle cx="375" cy="42.5" r="2.6" fill="#b34700"/>
      <circle class="dw-i-flower" cx="400" cy="37.4" r="7.5" fill="#ff9f1c" style="animation-delay:0.8s"/>
      <circle cx="400" cy="37.4" r="2.6" fill="#b34700"/>
      <circle class="dw-i-flower" cx="425" cy="31.5" r="7.5" fill="#ffcf33" style="animation-delay:0.85s"/>
      <circle cx="425" cy="31.5" r="2.6" fill="#b34700"/>
      <circle class="dw-i-flower" cx="450" cy="24.6" r="7.5" fill="#ff6b00" style="animation-delay:0.9s"/>
      <circle cx="450" cy="24.6" r="2.6" fill="#b34700"/>
      <circle class="dw-i-flower" cx="475" cy="16.7" r="7.5" fill="#ffb703" style="animation-delay:0.95s"/>
      <circle cx="475" cy="16.7" r="2.6" fill="#b34700"/>
      <circle class="dw-i-flower" cx="500" cy="8" r="7.5" fill="#ff9f1c" style="animation-delay:1s"/>
      <circle cx="500" cy="8" r="2.6" fill="#b34700"/>
      <circle class="dw-i-flower" cx="525" cy="16.7" r="7.5" fill="#ffcf33" style="animation-delay:0.05s"/>
      <circle cx="525" cy="16.7" r="2.6" fill="#b34700"/>
      <circle class="dw-i-flower" cx="550" cy="24.6" r="7.5" fill="#ff6b00" style="animation-delay:0.1s"/>
      <circle cx="550" cy="24.6" r="2.6" fill="#b34700"/>
      <circle class="dw-i-flower" cx="575" cy="31.5" r="7.5" fill="#ffb703" style="animation-delay:0.15s"/>
      <circle cx="575" cy="31.5" r="2.6" fill="#b34700"/>
      <circle class="dw-i-flower" cx="600" cy="37.4" r="7.5" fill="#ff9f1c" style="animation-delay:0.2s"/>
      <circle cx="600" cy="37.4" r="2.6" fill="#b34700"/>
      <circle class="dw-i-flower" cx="625" cy="42.5" r="7.5" fill="#ffcf33" style="animation-delay:0.25s"/>
      <circle cx="625" cy="42.5" r="2.6" fill="#b34700"/>
      <circle class="dw-i-flower" cx="650" cy="46.6" r="7.5" fill="#ff6b00" style="animation-delay:0.3s"/>
      <circle cx="650" cy="46.6" r="2.6" fill="#b34700"/>
      <circle class="dw-i-flower" cx="675" cy="49.9" r="7.5" fill="#ffb703" style="animation-delay:0.35s"/>
      <circle cx="675" cy="49.9" r="2.6" fill="#b34700"/>
      <circle class="dw-i-flower" cx="700" cy="52.2" r="7.5" fill="#ff9f1c" style="animation-delay:0.4s"/>
      <circle cx="700" cy="52.2" r="2.6" fill="#b34700"/>
      <circle class="dw-i-flower" cx="725" cy="53.5" r="7.5" fill="#ffcf33" style="animation-delay:0.45s"/>
      <circle cx="725" cy="53.5" r="2.6" fill="#b34700"/>
      <circle class="dw-i-flower" cx="750" cy="54" r="7.5" fill="#ff6b00" style="animation-delay:0.5s"/>
      <circle cx="750" cy="54" r="2.6" fill="#b34700"/>
      <circle class="dw-i-flower" cx="775" cy="53.5" r="7.5" fill="#ffb703" style="animation-delay:0.55s"/>
      <circle cx="775" cy="53.5" r="2.6" fill="#b34700"/>
      <circle class="dw-i-flower" cx="800" cy="52.2" r="7.5" fill="#ff9f1c" style="animation-delay:0.6s"/>
      <circle cx="800" cy="52.2" r="2.6" fill="#b34700"/>
      <circle class="dw-i-flower" cx="825" cy="49.9" r="7.5" fill="#ffcf33" style="animation-delay:0.65s"/>
      <circle cx="825" cy="49.9" r="2.6" fill="#b34700"/>
      <circle class="dw-i-flower" cx="850" cy="46.6" r="7.5" fill="#ff6b00" style="animation-delay:0.7s"/>
      <circle cx="850" cy="46.6" r="2.6" fill="#b34700"/>
      <circle class="dw-i-flower" cx="875" cy="42.5" r="7.5" fill="#ffb703" style="animation-delay:0.75s"/>
      <circle cx="875" cy="42.5" r="2.6" fill="#b34700"/>
      <circle class="dw-i-flower" cx="900" cy="37.4" r="7.5" fill="#ff9f1c" style="animation-delay:0.8s"/>
      <circle cx="900" cy="37.4" r="2.6" fill="#b34700"/>
      <circle class="dw-i-flower" cx="925" cy="31.5" r="7.5" fill="#ffcf33" style="animation-delay:0.85s"/>
      <circle cx="925" cy="31.5" r="2.6" fill="#b34700"/>
      <circle class="dw-i-flower" cx="950" cy="24.6" r="7.5" fill="#ff6b00" style="animation-delay:0.9s"/>
      <circle cx="950" cy="24.6" r="2.6" fill="#b34700"/>
      <circle class="dw-i-flower" cx="975" cy="16.7" r="7.5" fill="#ffb703" style="animation-delay:0.95s"/>
      <circle cx="975" cy="16.7" r="2.6" fill="#b34700"/>
      <circle class="dw-i-flower" cx="1000" cy="8" r="7.5" fill="#ff9f1c" style="animation-delay:1s"/>
      <circle cx="1000" cy="8" r="2.6" fill="#b34700"/>
    </svg>

    <div class="dw-i-kandil" style="left:9%;--c:#ff3d81;--h:84px;animation-delay:0s" aria-hidden="true">
      <i></i>
      <svg viewBox="0 0 60 60"><polygon points="30,2 36,20 54,12 44,28 58,38 40,40 40,58 30,46 20,58 20,40 2,38 16,28 6,12 24,20" fill="var(--c)"/><circle cx="30" cy="30" r="8" fill="#fff6d6"/></svg>
    </div>
    <div class="dw-i-kandil" style="left:21%;--c:#ffb703;--h:52px;animation-delay:-1.4s" aria-hidden="true">
      <i></i>
      <svg viewBox="0 0 60 60"><polygon points="30,2 36,20 54,12 44,28 58,38 40,40 40,58 30,46 20,58 20,40 2,38 16,28 6,12 24,20" fill="var(--c)"/><circle cx="30" cy="30" r="8" fill="#fff6d6"/></svg>
    </div>
    <div class="dw-i-kandil" style="right:9%;--c:#2dd4bf;--h:84px;animation-delay:-0.7s" aria-hidden="true">
      <i></i>
      <svg viewBox="0 0 60 60"><polygon points="30,2 36,20 54,12 44,28 58,38 40,40 40,58 30,46 20,58 20,40 2,38 16,28 6,12 24,20" fill="var(--c)"/><circle cx="30" cy="30" r="8" fill="#fff6d6"/></svg>
    </div>
    <div class="dw-i-kandil" style="right:21%;--c:#a855f7;--h:52px;animation-delay:-2.1s" aria-hidden="true">
      <i></i>
      <svg viewBox="0 0 60 60"><polygon points="30,2 36,20 54,12 44,28 58,38 40,40 40,58 30,46 20,58 20,40 2,38 16,28 6,12 24,20" fill="var(--c)"/><circle cx="30" cy="30" r="8" fill="#fff6d6"/></svg>
    </div>

    <div class="dw-intro-copy">
      <p class="dw-i-hindi">शुभ दीपावली</p>
      <h2 class="dw-i-en">Happy Diwali</h2>
      <div class="dw-i-logo"><img src="https://richind.org/frontend/assets/images/logo.png" alt="Rich India"></div>
      <p class="dw-i-tag">May every diya light up a new opportunity for you</p>
      <div class="dw-i-prog" aria-hidden="true">
        <b style="--i:0"></b><b style="--i:1"></b><b style="--i:2"></b><b style="--i:3"></b><b style="--i:4"></b><b style="--i:5"></b><b style="--i:6"></b>
      </div>
    </div>
    <div class="dw-i-floor" aria-hidden="true"></div>
    <button type="button" class="dw-intro-skip" id="dwIntroSkip">Skip ›</button>
  </div>

  <!-- Preloader -->
  <div class="loader js-preloader">
    <div class="loader__inner">
      <span class="loader__ring"></span>
      <img src="https://richind.org/frontend/assets/images/favicon.png" alt="RichInd-Logo" class="loader__favicon">
    </div>
  </div>

  <div class="page-wrapper">
    <!-- Header -->
    <header class="main-header main-header-three">
      <nav class="main-menu">
        <div class="main-menu__wrapper">
          <div class="container">
            <div class="main-menu__wrapper-inner">
              <div class="main-menu__left">
                <div class="main-menu__logo">
                  <a href="#">
                    <img src="https://richind.org/frontend/assets/images/logo.png" alt="RichInd-Logo" loading="lazy">
                  </a>
                </div>
              </div>

              <div class="main-menu__main-menu-box">
                <div class="d-flex">
                  <div class="mobile-login-btn d-block d-sm-none">
                    <a href="javascript:void(0)" onclick="openAuthModal('signin')">
                      <img src="https://richind.org/user_panel/assets/images/user.svg" alt="" class="injectable">
                    </a>
                  </div>
                  <a href="javascript:void(0)" class="mobile-nav__toggler" id="mobileNavToggler"><i class="fa fa-bars"></i></a>
                </div>
                <ul class="main-menu__list">
                  <li class="current"><a href="#">Home</a></li>
                  <li><a href="#about">About</a></li>
                  <li class="dropdown">
                    <a href="#plans">Plan</a>
                    <ul class="shadow-box">
                      <li><a href="#plans">Intermediate Package</a></li>
                      <li><a href="#plans">Expert Package</a></li>
                      <li><a href="#plans">Master Package</a></li>
                      <li><a href="#plans">Brahmastra Package</a></li>
                      <li><a href="#plans">Premium Pro</a></li>
                      <li><a href="#plans">Universal Prime</a></li>
                    </ul>
                  </li>
                  <li><a href="#courses">Course</a></li>
                  <li><a href="#testimonials">Testimonials</a></li>
                  <li><a href="#team">Team</a></li>
                  <li><a href="#faq">FAQ</a></li>
                  <li><a href="#footer">Contact</a></li>
                </ul>
              </div>

              <div class="main-menu__right">
                <div class="main-menu__btn-boxes">
                  <div class="main-menu__btn-box-2">
                    <a href="javascript:void(0)" onclick="openAuthModal('signin')" class="thm-btn"><i class="far fa-user"></i> Start Learning</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>

    <!-- Mobile Nav Wrapper -->
    <div class="mobile-nav__wrapper" id="mobileNavWrapper">
      <div class="mobile-nav__overlay mobile-nav__toggler" onclick="closeMobileNav()"></div>
      <div class="mobile-nav__content">
        <span class="mobile-nav__close mobile-nav__toggler" onclick="closeMobileNav()"><i class="fa fa-times"></i></span>
        <div class="logo-box">
          <a href="#" aria-label="logo image">
            <img src="https://richind.org/frontend/assets/images/logo.png" width="105" alt="RichInd-Logo" loading="lazy" />
          </a>
        </div>
        <div class="mobile-nav__container">
          <ul class="main-menu__list">
            <li><a href="#" onclick="closeMobileNav()">Home</a></li>
            <li><a href="#about" onclick="closeMobileNav()">About</a></li>
            <li><a href="#plans" onclick="closeMobileNav()">Plans</a></li>
            <li><a href="#courses" onclick="closeMobileNav()">Courses</a></li>
            <li><a href="#testimonials" onclick="closeMobileNav()">Testimonials</a></li>
            <li><a href="#team" onclick="closeMobileNav()">Team</a></li>
            <li><a href="#faq" onclick="closeMobileNav()">FAQ</a></li>
            <li><a href="#footer" onclick="closeMobileNav()">Contact</a></li>
          </ul>
        </div>
        <ul class="mobile-nav__contact list-unstyled">
          <li><i class="fa fa-envelope"></i> <a href="mailto:info@richind.org">info@richind.org</a></li>
          <li><i class="fas fa-phone"></i> <a href="tel:7037104928">+91-7037104928</a></li>
        </ul>
        <div class="mobile-nav__top">
          <div class="mobile-nav__social">
            <a href="https://www.instagram.com/richind_content?igsh=c294eW15eHMxOXNy" target="_blank" class="fab fa-instagram"></a>
            <a href="https://youtube.com/@richind.in_?si=fpj9ITDRtXfNOvov" target="_blank" class="fab fa-youtube"></a>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Slider -->
    <section class="main-slider">
      <div class="main-slider__carousel owl-carousel owl-theme" id="mainSliderCarousel">
        <div class="item">
          <div class="main-slider__bg" style="background-image: url(https://richind.org/backend/img/websitesetting/sliders/9026955261767339946.png); min-height: 480px; background-size: cover; background-position: center;"></div>
        </div>
      </div>
    </section>

    <!-- About Us Section -->
    <section class="about-one" id="about">
      <div class="container">
        <div class="row">
          <div class="col-xl-6">
            <div class="about-one__right">
              <div class="section-title text-left sec-title-animation animation-style2">
                <div class="section-title__tagline-box">
                  <div class="section-title__tagline-shape"></div>
                  <span class="section-title__tagline">About Us</span>
                </div>
                <h2 class="section-title__title">Discover Our Journey of <span>Growth</span></h2>
              </div>
              <p class="about-one__text">
                At RichInd, we are passionate about making education accessible and engaging for all. Our platform leverages technology to deliver high-quality learning experiences, empowering both students and educators to achieve their goals in a rapidly changing world.
              </p>
              <ul class="about-one__mission-and-vision list-unstyled">
                <li>
                  <div class="about-one__icon-and-title">
                    <div class="about-one__icon">
                      <img src="https://richind.org/frontend/assets/images/icon/mission-icon.png" alt="RichInd" loading="lazy">
                    </div>
                    <h3>Our Mission:</h3>
                  </div>
                  <p class="about-one__mission-and-vision-text">
                    To inspire and enable lifelong learning by providing innovative, flexible, and inclusive digital education solutions for everyone.
                  </p>
                </li>
                <li>
                  <div class="about-one__icon-and-title">
                    <div class="about-one__icon">
                      <img src="https://richind.org/frontend/assets/images/icon/vision-icon.png" alt="RichInd" loading="lazy">
                    </div>
                    <h3>Our Vision</h3>
                  </div>
                  <p class="about-one__mission-and-vision-text">
                    To be a leader in digital education, fostering a global community of learners and educators who thrive through collaboration and innovation.
                  </p>
                </li>
              </ul>
              <div class="about-one__btn-and-live-class">
                <div class="about-one__btn-box mb-3">
                  <a href="javascript:void(0)" onclick="openAuthModal('signin')" class="about-one__btn thm-btn"><i class="far fa-chevron-double-right"></i>Know More</a>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-6 wow slideInRight" data-wow-delay="100ms" data-wow-duration="2500ms">
            <div class="about-one__left">
              <div class="about-one__left-shape-1 rotate-me"></div>
              <div class="row">
                <div class="col-xl-6 col-lg-6 col-md-6">
                  <div class="about-one__img-box">
                    <div class="about-one__img">
                      <img src="https://richind.org/frontend/assets/images/resources/abou-one-img-1.jpg" alt="RichInd" loading="lazy">
                    </div>
                  </div>
                  <div class="about-one__awards-box">
                    <div class="about-one__awards-count-box">
                      <h3 class="odometer" data-count="45">45</h3>
                      <span>+</span>
                    </div>
                    <p>Awards Winning</p>
                  </div>
                </div>
                <div class="col-xl-6 col-lg-6 col-md-6">
                  <div class="about-one__experience-box">
                    <div class="about-one__experience-box-inner">
                      <div class="about-one__experience-icon">
                        <img src="https://richind.org/frontend/assets/images/icon/about-one-experience-icon.png" alt="RichInd" loading="lazy">
                      </div>
                      <div class="about-one__experience-count-box">
                        <div class="about-one__experience-count">
                          <h3 class="odometer" data-count="25">25</h3>
                          <span>+</span>
                          <p>Years</p>
                        </div>
                        <p>of experience</p>
                      </div>
                    </div>
                    <div class="about-one__experience-box-shape"></div>
                  </div>
                  <div class="about-one__img-box-2">
                    <div class="about-one__img-2">
                      <img src="https://richind.org/frontend/assets/images/resources/abou-one-img-2.jpg" alt="RichInd" loading="lazy">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Course Packages Section -->
    <section class="courses-one" id="plans">
      <div class="container">
        <div class="section-title text-center sec-title-animation animation-style1">
          <div class="section-title__tagline-box">
            <div class="section-title__tagline-shape"></div>
            <span class="section-title__tagline">Courses Packages</span>
          </div>
          <h2 class="section-title__title">Choose the Perfect <span>Course Package</span> for You</h2>
        </div>
        <div class="row">
          <!-- Package 1 -->
          <div class="col-md-4 mb-4">
            <div class="courses-one__single">
              <div class="courses-one__img-box">
                <div class="courses-one__img">
                  <img src="https://richind.org/backend/img/plan/18998850091789934163.png" onerror="this.onerror=null;this.src='https://richind.org/frontend/assets/images/default-image.jpg'" alt="Intermediate Package-Image" loading="lazy">
                </div>
              </div>
              <div class="courses-one__content">
                <h3 class="courses-one__title"><a href="javascript:void(0)" onclick="openAuthModal('signup')">Intermediate Package</a></h3>
                <ul class="plans-two__meta list-unstyled d-flex justify-content-between">
                  <li>
                    <ul class="courses-one__ratting list-unstyled">
                      <li><span class="fas fa-star"></span></li>
                      <li><span class="fas fa-star"></span></li>
                      <li><span class="fas fa-star"></span></li>
                      <li><span class="fas fa-star"></span></li>
                      <li><span class="fas fa-star-half-alt"></span></li>
                    </ul>
                  </li>
                  <li><div class="icon"><i class="far fa-book"></i></div><p>4 Courses</p></li>
                </ul>
                <div class="courses-one__btn-and-doller-box">
                  <div class="courses-one__btn-box">
                    <a href="javascript:void(0)" onclick="openAuthModal('signup')" class="courses-one__btn thm-btn"><i class="far fa-chevron-double-right"></i>Buy Now</a>
                  </div>
                  <span>₹560 <del>999</del></span>
                </div>
              </div>
            </div>
          </div>

          <!-- Package 2 -->
          <div class="col-md-4 mb-4">
            <div class="courses-one__single">
              <div class="courses-one__img-box">
                <div class="courses-one__img">
                  <img src="https://richind.org/backend/img/plan/13869612131789934181.png" onerror="this.onerror=null;this.src='https://richind.org/frontend/assets/images/default-image.jpg'" alt="Expert Package-Image" loading="lazy">
                </div>
              </div>
              <div class="courses-one__content">
                <h3 class="courses-one__title"><a href="javascript:void(0)" onclick="openAuthModal('signup')">Expert Package</a></h3>
                <ul class="plans-two__meta list-unstyled d-flex justify-content-between">
                  <li>
                    <ul class="courses-one__ratting list-unstyled">
                      <li><span class="fas fa-star"></span></li>
                      <li><span class="fas fa-star"></span></li>
                      <li><span class="fas fa-star"></span></li>
                      <li><span class="fas fa-star"></span></li>
                      <li><span class="fas fa-star-half-alt"></span></li>
                    </ul>
                  </li>
                  <li><div class="icon"><i class="far fa-book"></i></div><p>7 Courses</p></li>
                </ul>
                <div class="courses-one__btn-and-doller-box">
                  <div class="courses-one__btn-box">
                    <a href="javascript:void(0)" onclick="openAuthModal('signup')" class="courses-one__btn thm-btn"><i class="far fa-chevron-double-right"></i>Buy Now</a>
                  </div>
                  <span>₹1149 <del>2999</del></span>
                </div>
              </div>
            </div>
          </div>

          <!-- Package 3 -->
          <div class="col-md-4 mb-4">
            <div class="courses-one__single">
              <div class="courses-one__img-box">
                <div class="courses-one__img">
                  <img src="https://richind.org/backend/img/plan/7620444391789934194.png" onerror="this.onerror=null;this.src='https://richind.org/frontend/assets/images/default-image.jpg'" alt="Master Package-Image" loading="lazy">
                </div>
              </div>
              <div class="courses-one__content">
                <h3 class="courses-one__title"><a href="javascript:void(0)" onclick="openAuthModal('signup')">Master Package</a></h3>
                <ul class="plans-two__meta list-unstyled d-flex justify-content-between">
                  <li>
                    <ul class="courses-one__ratting list-unstyled">
                      <li><span class="fas fa-star"></span></li>
                      <li><span class="fas fa-star"></span></li>
                      <li><span class="fas fa-star"></span></li>
                      <li><span class="fas fa-star"></span></li>
                      <li><span class="fas fa-star"></span></li>
                    </ul>
                  </li>
                  <li><div class="icon"><i class="far fa-book"></i></div><p>15 Courses</p></li>
                </ul>
                <div class="courses-one__btn-and-doller-box">
                  <div class="courses-one__btn-box">
                    <a href="javascript:void(0)" onclick="openAuthModal('signup')" class="courses-one__btn thm-btn"><i class="far fa-chevron-double-right"></i>Buy Now</a>
                  </div>
                  <span>₹2499 <del>5999</del></span>
                </div>
              </div>
            </div>
          </div>

          <!-- Package 4 -->
          <div class="col-md-4 mb-4">
            <div class="courses-one__single">
              <div class="courses-one__img-box">
                <div class="courses-one__img">
                  <img src="https://richind.org/backend/img/plan/14940778881789934212.png" onerror="this.onerror=null;this.src='https://richind.org/frontend/assets/images/default-image.jpg'" alt="Brahmastra Package-Image" loading="lazy">
                </div>
              </div>
              <div class="courses-one__content">
                <h3 class="courses-one__title"><a href="javascript:void(0)" onclick="openAuthModal('signup')">Brahmastra Package</a></h3>
                <ul class="plans-two__meta list-unstyled d-flex justify-content-between">
                  <li>
                    <ul class="courses-one__ratting list-unstyled">
                      <li><span class="fas fa-star"></span></li>
                      <li><span class="fas fa-star"></span></li>
                      <li><span class="fas fa-star"></span></li>
                      <li><span class="fas fa-star"></span></li>
                      <li><span class="fas fa-star"></span></li>
                    </ul>
                  </li>
                  <li><div class="icon"><i class="far fa-book"></i></div><p>19 Courses</p></li>
                </ul>
                <div class="courses-one__btn-and-doller-box">
                  <div class="courses-one__btn-box">
                    <a href="javascript:void(0)" onclick="openAuthModal('signup')" class="courses-one__btn thm-btn"><i class="far fa-chevron-double-right"></i>Buy Now</a>
                  </div>
                  <span>₹5499 <del>10999</del></span>
                </div>
              </div>
            </div>
          </div>

          <!-- Package 5 -->
          <div class="col-md-4 mb-4">
            <div class="courses-one__single">
              <div class="courses-one__img-box">
                <div class="courses-one__img">
                  <img src="https://richind.org/backend/img/plan/7686034311789934126.png" onerror="this.onerror=null;this.src='https://richind.org/frontend/assets/images/default-image.jpg'" alt="Premium Pro-Image" loading="lazy">
                </div>
              </div>
              <div class="courses-one__content">
                <h3 class="courses-one__title"><a href="javascript:void(0)" onclick="openAuthModal('signup')">Premium Pro</a></h3>
                <ul class="plans-two__meta list-unstyled d-flex justify-content-between">
                  <li>
                    <ul class="courses-one__ratting list-unstyled">
                      <li><span class="fas fa-star"></span></li>
                      <li><span class="fas fa-star"></span></li>
                      <li><span class="fas fa-star"></span></li>
                      <li><span class="fas fa-star"></span></li>
                      <li><span class="fas fa-star-half-alt"></span></li>
                    </ul>
                  </li>
                  <li><div class="icon"><i class="far fa-book"></i></div><p>23 Courses</p></li>
                </ul>
                <div class="courses-one__btn-and-doller-box">
                  <div class="courses-one__btn-box">
                    <a href="javascript:void(0)" onclick="openAuthModal('signup')" class="courses-one__btn thm-btn"><i class="far fa-chevron-double-right"></i>Buy Now</a>
                  </div>
                  <span>₹10997 <del>20998</del></span>
                </div>
              </div>
            </div>
          </div>

          <!-- Package 6 -->
          <div class="col-md-4 mb-4">
            <div class="courses-one__single">
              <div class="courses-one__img-box">
                <div class="courses-one__img">
                  <img src="https://richind.org/backend/img/plan/20960842411789852105.png" onerror="this.onerror=null;this.src='https://richind.org/frontend/assets/images/default-image.jpg'" alt="Universal Prime-Image" loading="lazy">
                </div>
              </div>
              <div class="courses-one__content">
                <h3 class="courses-one__title"><a href="javascript:void(0)" onclick="openAuthModal('signup')">Universal Prime</a></h3>
                <ul class="plans-two__meta list-unstyled d-flex justify-content-between">
                  <li>
                    <ul class="courses-one__ratting list-unstyled">
                      <li><span class="fas fa-star"></span></li>
                      <li><span class="fas fa-star"></span></li>
                      <li><span class="fas fa-star"></span></li>
                      <li><span class="fas fa-star"></span></li>
                      <li><span class="fas fa-star"></span></li>
                    </ul>
                  </li>
                  <li><div class="icon"><i class="far fa-book"></i></div><p>27 Courses</p></li>
                </ul>
                <div class="courses-one__btn-and-doller-box">
                  <div class="courses-one__btn-box">
                    <a href="javascript:void(0)" onclick="openAuthModal('signup')" class="courses-one__btn thm-btn"><i class="far fa-chevron-double-right"></i>Buy Now</a>
                  </div>
                  <span>₹14999 <del>34999</del></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Freelance CTA -->
    <section class="freelance-cta">
      <div class="freelance-cta__inner">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-xl-7 col-lg-7">
              <div class="freelance-cta__content wow fadeInUp" data-wow-delay="100ms">
                <span class="freelance-cta__tagline">Freelance With Us</span>
                <h2 class="freelance-cta__title">Turn Your Skills Into <span>Freelance Income</span></h2>
                <p class="freelance-cta__text">
                  Join RichInd as a freelancer and get matched with real opportunities. Share your skills and experience with us, and start earning on your own schedule.
                </p>
                <ul class="freelance-cta__points list-unstyled">
                  <li><i class="fas fa-check-circle"></i> Work on flexible, remote-friendly opportunities</li>
                  <li><i class="fas fa-check-circle"></i> Get matched based on your skills and experience</li>
                  <li><i class="fas fa-check-circle"></i> Simple application, no hidden fees</li>
                </ul>
                <a href="javascript:void(0)" onclick="openAuthModal('signup')" class="thm-btn"><i class="far fa-chevron-double-right"></i> Join as a Freelancer</a>
              </div>
            </div>
            <div class="col-xl-5 col-lg-5">
              <div class="freelance-cta__icon-grid wow fadeInUp" data-wow-delay="200ms">
                <div class="freelance-cta__icon-card">
                  <i class="fas fa-laptop-code"></i>
                  <h5>Any Skill</h5>
                  <p>Design, development, writing & more</p>
                </div>
                <div class="freelance-cta__icon-card">
                  <i class="fas fa-clock"></i>
                  <h5>Flexible Hours</h5>
                  <p>Work on your own schedule</p>
                </div>
                <div class="freelance-cta__icon-card">
                  <i class="fas fa-hand-holding-usd"></i>
                  <h5>Get Paid</h5>
                  <p>Timely payouts, zero hassle</p>
                </div>
                <div class="freelance-cta__icon-card">
                  <i class="fas fa-user-check"></i>
                  <h5>Quick Apply</h5>
                  <p>Fill one simple form</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Top Courses Slider -->
    <section class="courses-one" id="courses">
      <div class="container">
        <div class="section-title text-center sec-title-animation animation-style1">
          <div class="section-title__tagline-box">
            <div class="section-title__tagline-shape"></div>
            <span class="section-title__tagline">Top Courses</span>
          </div>
          <h2 class="section-title__title">Explore Our World's <span>Best Courses</span></h2>
        </div>
        <div class="courses-one__carousel owl-theme owl-carousel" id="coursesCarousel">
          <!-- Course 1 -->
          <div class="item">
            <div class="courses-one__single">
              <div class="courses-one__img-box">
                <div class="courses-one__img">
                  <img src="https://richind.org/backend/img/course/611762821782848718.png" onerror="this.onerror=null;this.src='https://richind.org/frontend/assets/images/default-image.jpg'" alt="Lead Generation" loading="lazy">
                </div>
              </div>
              <div class="courses-one__content">
                <h3 class="courses-one__titles"><a href="javascript:void(0)" onclick="openAuthModal('signin')">Lead Generation</a></h3>
                <div class="courses-one__btn-and-doller-box">
                  <div class="courses-one__btn-box w-100">
                    <a href="javascript:void(0)" onclick="openAuthModal('signin')" class="w-100 thm-btn p-2"><i class="far fa-chevron-double-right"></i>View Details</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Course 2 -->
          <div class="item">
            <div class="courses-one__single">
              <div class="courses-one__img-box">
                <div class="courses-one__img">
                  <img src="https://richind.org/backend/img/course/13425834171782848697.png" onerror="this.onerror=null;this.src='https://richind.org/frontend/assets/images/default-image.jpg'" alt="Instagram Mastery" loading="lazy">
                </div>
              </div>
              <div class="courses-one__content">
                <h3 class="courses-one__titles"><a href="javascript:void(0)" onclick="openAuthModal('signin')">Instagram Mastery</a></h3>
                <div class="courses-one__btn-and-doller-box">
                  <div class="courses-one__btn-box w-100">
                    <a href="javascript:void(0)" onclick="openAuthModal('signin')" class="w-100 thm-btn p-2"><i class="far fa-chevron-double-right"></i>View Details</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Course 3 -->
          <div class="item">
            <div class="courses-one__single">
              <div class="courses-one__img-box">
                <div class="courses-one__img">
                  <img src="https://richind.org/backend/img/course/17184485821785862370.png" onerror="this.onerror=null;this.src='https://richind.org/frontend/assets/images/default-image.jpg'" alt="Canva with A.I" loading="lazy">
                </div>
              </div>
              <div class="courses-one__content">
                <h3 class="courses-one__titles"><a href="javascript:void(0)" onclick="openAuthModal('signin')">Canva with A.I</a></h3>
                <div class="courses-one__btn-and-doller-box">
                  <div class="courses-one__btn-box w-100">
                    <a href="javascript:void(0)" onclick="openAuthModal('signin')" class="w-100 thm-btn p-2"><i class="far fa-chevron-double-right"></i>View Details</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Course 4 -->
          <div class="item">
            <div class="courses-one__single">
              <div class="courses-one__img-box">
                <div class="courses-one__img">
                  <img src="https://richind.org/backend/img/course/20294406281782848519.png" onerror="this.onerror=null;this.src='https://richind.org/frontend/assets/images/default-image.jpg'" alt="Capcut Video Editing" loading="lazy">
                </div>
              </div>
              <div class="courses-one__content">
                <h3 class="courses-one__titles"><a href="javascript:void(0)" onclick="openAuthModal('signin')">Capcut Video Editing</a></h3>
                <div class="courses-one__btn-and-doller-box">
                  <div class="courses-one__btn-box w-100">
                    <a href="javascript:void(0)" onclick="openAuthModal('signin')" class="w-100 thm-btn p-2"><i class="far fa-chevron-double-right"></i>View Details</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Course 5 -->
          <div class="item">
            <div class="courses-one__single">
              <div class="courses-one__img-box">
                <div class="courses-one__img">
                  <img src="https://richind.org/backend/img/course/15682019081782848889.png" onerror="this.onerror=null;this.src='https://richind.org/frontend/assets/images/default-image.jpg'" alt="Youtube Success" loading="lazy">
                </div>
              </div>
              <div class="courses-one__content">
                <h3 class="courses-one__titles"><a href="javascript:void(0)" onclick="openAuthModal('signin')">Youtube Success</a></h3>
                <div class="courses-one__btn-and-doller-box">
                  <div class="courses-one__btn-box w-100">
                    <a href="javascript:void(0)" onclick="openAuthModal('signin')" class="w-100 thm-btn p-2"><i class="far fa-chevron-double-right"></i>View Details</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Course 6 -->
          <div class="item">
            <div class="courses-one__single">
              <div class="courses-one__img-box">
                <div class="courses-one__img">
                  <img src="https://richind.org/backend/img/course/4112260861782848675.png" onerror="this.onerror=null;this.src='https://richind.org/frontend/assets/images/default-image.jpg'" alt="Google Adsense" loading="lazy">
                </div>
              </div>
              <div class="courses-one__content">
                <h3 class="courses-one__titles"><a href="javascript:void(0)" onclick="openAuthModal('signin')">Google Adsense</a></h3>
                <div class="courses-one__btn-and-doller-box">
                  <div class="courses-one__btn-box w-100">
                    <a href="javascript:void(0)" onclick="openAuthModal('signin')" class="w-100 thm-btn p-2"><i class="far fa-chevron-double-right"></i>View Details</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Why Choose Us Section -->
    <section class="why-choose-two">
      <div class="container">
        <div class="row">
          <div class="col-xl-6">
            <div class="why-choose-two__left">
              <div class="section-title-two text-left sec-title-animation animation-style2">
                <div class="section-title-two__tagline-box">
                  <span class="section-title-two__tagline">Our Achievements</span>
                </div>
                <h2 class="section-title-two__title title-animation">Discover Why Our Learners <br> and Partners <span>Choose Us</span></h2>
              </div>
              <div class="why-choose-two__left-content-box">
                <div class="row">
                  <div class="col-xl-6 col-lg-6 col-md-6">
                    <div class="why-choose-two__single wow fadeInUp" data-wow-delay="100ms">
                      <div class="why-choose-two__icon">
                        <img src="https://richind.org/frontend/assets/images/icon/why-choose-two-icon-1.png" alt="RichInd" loading="lazy">
                      </div>
                      <h3 class="why-choose-two__title">Structured Learning Paths for Every Goal</h3>
                      <p>Step-by-step curriculum designed by industry mentors so you always know what to learn next.</p>
                    </div>
                    <div class="why-choose-two__single wow fadeInUp" data-wow-delay="200ms">
                      <div class="why-choose-two__icon">
                        <img src="https://richind.org/frontend/assets/images/icon/why-choose-two-icon-2.png" alt="RichInd" loading="lazy">
                      </div>
                      <h3 class="why-choose-two__title">A Supportive Learner Community Awaits</h3>
                      <p>Live doubt-solving sessions, peer discussions, helping you stay motivated.</p>
                    </div>
                  </div>
                  <div class="col-xl-6 col-lg-6 col-md-6">
                    <div class="why-choose-two__single wow fadeInUp" data-wow-delay="300ms">
                      <div class="why-choose-two__icon">
                        <img src="https://richind.org/frontend/assets/images/icon/why-choose-two-icon-3.png" alt="RichInd" loading="lazy">
                      </div>
                      <h3 class="why-choose-two__title">Real-Time Progress Tracking & Reports</h3>
                      <p>Detailed performance insights for every learner so you can track growth continuously.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-6">
            <div class="why-choose-two__right">
              <div class="row">
                <div class="col-md-6">
                  <div class="why-choose-two__student-trained">
                    <div class="why-choose-two__student-trained-count-box">
                      <p class="count-text" style="font-size: 2.5rem; font-weight: 800; color: #ff9f1c;">100+</p>
                      <p class="why-choose-two__student-trained-text">Students Trained</p>
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="why-choose-two__right-content-two-user-details-top">
                    <img src="https://richind.org/frontend/assets/images/founder.png" alt="Yash Kulshrestha" loading="lazy" style="width: 140px; height: 140px; object-fit: cover; border-radius: 50%; border: 4px solid #ff9f1c;">
                    <h5 style="margin-top: 10px; font-weight: 700;">Yash Kulshrestha</h5>
                    <p style="color: #ff9f1c;">Founder & CEO</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Impact in Numbers -->
    <section class="counter-one">
      <div class="container">
        <div class="section-title text-center sec-title-animation animation-style1">
          <h2 class="section-title__title text-white">Our Impact in <span>Numbers</span></h2>
        </div>
        <div class="row">
          <div class="col-xl-12">
            <div class="counter-one__left">
              <ul class="counter-one__list list-unstyled d-flex justify-content-around flex-wrap">
                <li>
                  <div class="counter-one__count count-box">
                    <h3 class="count-text" style="color: #ff9f1c; font-size: 2.8rem; font-weight: 800;">20+</h3>
                  </div>
                  <p>Expert Trainers</p>
                </li>
                <li>
                  <div class="counter-one__count count-box">
                    <h3 class="count-text" style="color: #ff9f1c; font-size: 2.8rem; font-weight: 800;">300K</h3>
                  </div>
                  <p>Active Students</p>
                </li>
                <li>
                  <div class="counter-one__count count-box">
                    <h3 class="count-text" style="color: #ff9f1c; font-size: 2.8rem; font-weight: 800;">500+</h3>
                  </div>
                  <p>Live Sessions</p>
                </li>
                <li>
                  <div class="counter-one__count count-box">
                    <h3 class="count-text" style="color: #ff9f1c; font-size: 2.8rem; font-weight: 800;">₹200M</h3>
                  </div>
                  <p>Community Earning</p>
                </li>
              </ul>
            </div>
            <div class="impact-row d-flex justify-content-center gap-4 mt-4 flex-wrap">
              <div class="impact-box trophy p-3 rounded" style="background: rgba(255,255,255,0.1); color: #fff;">
                <span class="icon-emoji">🏆</span> #1 E-Learning Platform
              </div>
              <div class="impact-box star p-3 rounded" style="background: rgba(255,255,255,0.1); color: #fff;">
                <span class="icon-emoji">⭐</span> 4.9/5 Rating
              </div>
              <div class="impact-box rocket p-3 rounded" style="background: rgba(255,255,255,0.1); color: #fff;">
                <span class="icon-emoji">🚀</span> 98% Success Rate
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Team Details / Founder Spotlight -->
    <section class="team-details" id="team">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-xl-6 d-flex flex-column justify-content-center">
            <div class="team-details__right text-left">
              <div class="team-details__name-and-ratting-box">
                <div class="team-details__name-box">
                  <p class="team-details__sub-title" style="color: #ff9f1c; font-weight: 600;">Mr. Yash Kulshrestha</p>
                  <h3 class="team-details__name" style="font-weight: 800;">CEO & Founder of RichInd</h3>
                </div>
              </div>
              <p class="team-details__text-1" style="font-size: 1.1rem; line-height: 1.8;">
                Yash Kulshrestha is one of the Youngest Entrepreneurs and YouTubers from India. He started his journey in 2018. He has 5+ years experience in Sales, Digital Marketing, and Personal Branding. He loves to empower youth with high-paying modern digital skills.
              </p>
              <p style="font-size: 1.05rem; line-height: 1.8;">
                He has helped more than 20,000+ students in mastering new skills and is guiding thousands of aspiring digital creators and freelancers.
              </p>
            </div>
          </div>
          <div class="col-xl-6 text-center">
            <div class="user-profile-card p-4 rounded shadow-lg" style="background: #fff;">
              <img src="https://richind.org/frontend/assets/images/founder.png" alt="Yash Kulshrestha" style="width: 200px; height: 200px; border-radius: 50%; object-fit: cover; border: 5px solid #ff9f1c;" />
              <h3 style="margin-top: 15px; font-weight: 800;">Yash Kulshrestha</h3>
              <p style="color: #ff9f1c; font-weight: 600;">Founder & CEO</p>
              <div class="d-flex justify-content-center gap-3 mt-3">
                <a href="https://instagram.com" target="_blank" class="profile-social-icon btn btn-light rounded-circle"><i class="fab fa-instagram"></i></a>
                <a href="https://youtube.com" target="_blank" class="profile-social-icon btn btn-light rounded-circle"><i class="fab fa-youtube"></i></a>
                <a href="https://wa.me/917037104928" target="_blank" class="profile-social-icon btn btn-light rounded-circle"><i class="fab fa-whatsapp"></i></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Team Carousel -->
    <section class="team-one">
      <div class="container">
        <div class="section-title text-left sec-title-animation animation-style2">
          <div class="section-title__tagline-box">
            <span class="section-title__tagline">Our Team</span>
          </div>
          <h2 class="section-title__title">Meet Our Dedicated Team of <span>Experts</span></h2>
        </div>
        <div class="team-one__carousel owl-theme owl-carousel" id="teamCarousel">
          <!-- Member 1 -->
          <div class="item">
            <div class="team-one__single">
              <div class="team-one__img-box">
                <div class="team-one__img">
                  <img src="https://richind.org/backend/img/instructors/18244966011786024718.png" alt="Tahir Khan" loading="lazy">
                </div>
                <div class="team-one__content text-center p-3">
                  <h4 class="team-one__title">Tahir Khan</h4>
                  <p class="team-one__sub-title" style="color: #ff9f1c;">Sales Expert</p>
                </div>
              </div>
            </div>
          </div>
          <!-- Member 2 -->
          <div class="item">
            <div class="team-one__single">
              <div class="team-one__img-box">
                <div class="team-one__img">
                  <img src="https://richind.org/backend/img/instructors/2753103721767086029.png" alt="Deepak safi" loading="lazy">
                </div>
                <div class="team-one__content text-center p-3">
                  <h4 class="team-one__title">Deepak Safi</h4>
                  <p class="team-one__sub-title" style="color: #ff9f1c;">Ads Expert</p>
                </div>
              </div>
            </div>
          </div>
          <!-- Member 3 -->
          <div class="item">
            <div class="team-one__single">
              <div class="team-one__img-box">
                <div class="team-one__img">
                  <img src="https://richind.org/backend/img/instructors/11241496171767085878.png" alt="Ansh Bidlan" loading="lazy">
                </div>
                <div class="team-one__content text-center p-3">
                  <h4 class="team-one__title">Ansh Bidlan</h4>
                  <p class="team-one__sub-title" style="color: #ff9f1c;">Trainer</p>
                </div>
              </div>
            </div>
          </div>
          <!-- Member 4 -->
          <div class="item">
            <div class="team-one__single">
              <div class="team-one__img-box">
                <div class="team-one__img">
                  <img src="https://richind.org/backend/img/instructors/9426156321781324531.png" alt="Harsh Kulshrestha" loading="lazy">
                </div>
                <div class="team-one__content text-center p-3">
                  <h4 class="team-one__title">Harsh Kulshrestha</h4>
                  <p class="team-one__sub-title" style="color: #ff9f1c;">CEO</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Video Testimonials -->
    <section class="blog-one" id="video-reviews">
      <div class="container">
        <div class="section-title text-center sec-title-animation animation-style1">
          <div class="section-title__tagline-box">
            <span class="section-title__tagline">Video Testimonials</span>
          </div>
          <h2 class="section-title__title">Hear Directly from Our <br><span>Students & Clients</span></h2>
        </div>
        <div class="blog-one__carousel owl-theme owl-carousel" id="videoCarousel">
          <div class="item">
            <div class="blog-one__single">
              <div class="blog-one__img">
                <iframe width="100%" height="320" src="https://play.gumlet.io/embed/6a2cd6c736223b22764e2a76" frameborder="0" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
              </div>
            </div>
          </div>
          <div class="item">
            <div class="blog-one__single">
              <div class="blog-one__img">
                <iframe width="100%" height="320" src="https://play.gumlet.io/embed/6a2cd6c7a0e544789cca0456" frameborder="0" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
              </div>
            </div>
          </div>
          <div class="item">
            <div class="blog-one__single">
              <div class="blog-one__img">
                <iframe width="100%" height="320" src="https://play.gumlet.io/embed/6a2cd6c793651fdca93765e1" frameborder="0" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
              </div>
            </div>
          </div>
          <div class="item">
            <div class="blog-one__single">
              <div class="blog-one__img">
                <iframe width="100%" height="320" src="https://play.gumlet.io/embed/6a2cd6c793651fdca93765e9" frameborder="0" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Student Testimonials -->
    <section class="testimonial-one" id="testimonials">
      <div class="container">
        <div class="section-title text-left sec-title-animation animation-style2">
          <div class="section-title__tagline-box">
            <span class="section-title__tagline">Testimonial</span>
          </div>
          <h2 class="section-title__title">Explore Genuine Feedback from <span>Happy Clients</span></h2>
        </div>
        <div class="testimonial-one__inner">
          <div class="testimonial-one__carousel owl-theme owl-carousel" id="testimonialCarousel">
            <div class="item">
              <div class="testimonial-one__single p-4 rounded shadow-sm" style="background: #fff;">
                <div class="testimonial-one__img-inner d-flex align-items-center mb-3">
                  <img src="https://richind.org/backend/img/reviews/16439457711776264410.jpg" alt="Vikas Yadav" style="width: 60px; height: 60px; border-radius: 50%; object-fit: cover; margin-right: 15px;">
                  <div>
                    <h5 class="mb-0 font-weight-bold">Vikas Yadav <img src="https://richind.org/frontend/assets/images/verified.png" alt="verified" width="16"></h5>
                    <div class="text-warning">⭐⭐⭐⭐⭐</div>
                  </div>
                </div>
                <p>"This is not just a course, it’s a complete earning system. I learned sales and affiliate marketing, and now I’m able to generate a stable side income every month."</p>
              </div>
            </div>

            <div class="item">
              <div class="testimonial-one__single p-4 rounded shadow-sm" style="background: #fff;">
                <div class="testimonial-one__img-inner d-flex align-items-center mb-3">
                  <img src="https://richind.org/backend/img/reviews/19876185051776264372.avif" alt="Pooja Gupta" style="width: 60px; height: 60px; border-radius: 50%; object-fit: cover; margin-right: 15px;">
                  <div>
                    <h5 class="mb-0 font-weight-bold">Pooja Gupta <img src="https://richind.org/frontend/assets/images/verified.png" alt="verified" width="16"></h5>
                    <div class="text-warning">⭐⭐⭐⭐⭐</div>
                  </div>
                </div>
                <p>"RichInd helped me learn high-income skills and also provided an earning opportunity. The support system and guidance are amazing. It’s perfect for anyone who wants to grow digitally."</p>
              </div>
            </div>

            <div class="item">
              <div class="testimonial-one__single p-4 rounded shadow-sm" style="background: #fff;">
                <div class="testimonial-one__img-inner d-flex align-items-center mb-3">
                  <img src="https://richind.org/backend/img/reviews/16734122271776264352.jpg" alt="Rohit Singh" style="width: 60px; height: 60px; border-radius: 50%; object-fit: cover; margin-right: 15px;">
                  <div>
                    <h5 class="mb-0 font-weight-bold">Rohit Singh <img src="https://richind.org/frontend/assets/images/verified.png" alt="verified" width="16"></h5>
                    <div class="text-warning">⭐⭐⭐⭐⭐</div>
                  </div>
                </div>
                <p>"I was struggling to find the right direction, but RichInd gave me clarity and a proven system. Today, I have multiple income sources and more confidence than ever before."</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Accordion -->
    <section class="faq-page" id="faq">
      <div class="container">
        <div class="section-title text-center sec-title-animation animation-style1">
          <div class="section-title__tagline-box">
            <span class="section-title__tagline">FAQ</span>
          </div>
          <h2 class="section-title__title">Frequently Asked <br><span>Questions</span></h2>
        </div>
        <div class="row">
          <div class="col-xl-8 col-lg-8 m-auto">
            <div class="faq-page__left">
              <div class="accrodion-grp faq-one-accrodion">
                <div class="accrodion active">
                  <div class="accrodion-title" onclick="toggleFaq(this)">
                    <h4>Can I access Richind courses on mobile devices?</h4>
                  </div>
                  <div class="accrodion-content">
                    <div class="inner p-3">
                      <p>Yes, RichInd is 100% responsive and accessible on mobile devices, tablets, and desktops, allowing you to learn conveniently on the go.</p>
                    </div>
                  </div>
                </div>

                <div class="accrodion">
                  <div class="accrodion-title" onclick="toggleFaq(this)">
                    <h4>What types of courses are available on Richind?</h4>
                  </div>
                  <div class="accrodion-content">
                    <div class="inner p-3">
                      <p>RichInd offers a diverse catalog covering high-income skills including Lead Generation, Instagram Growth, Canva AI, Video Editing, Meta Ads, Public Speaking, Stock Market, Web Design, and E-commerce.</p>
                    </div>
                  </div>
                </div>

                <div class="accrodion">
                  <div class="accrodion-title" onclick="toggleFaq(this)">
                    <h4>How do I sign up for Richind?</h4>
                  </div>
                  <div class="accrodion-content">
                    <div class="inner p-3">
                      <p>Simply click on the "Start Learning" or "Sign In" button in the top menu, create your account, choose your preferred package, and begin learning immediately.</p>
                    </div>
                  </div>
                </div>

                <div class="accrodion">
                  <div class="accrodion-title" onclick="toggleFaq(this)">
                    <h4>What is Richind?</h4>
                  </div>
                  <div class="accrodion-content">
                    <div class="inner p-3">
                      <p>RichInd is an innovative e-learning and skills platform empowering students and youth with high-demand digital skills and personal branding opportunities.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="site-footer" id="footer">
      <div class="site-footer__logo-and-contact-box">
        <div class="container">
          <div class="site-footer__logo-and-contact-box-inner d-flex justify-content-between align-items-center flex-wrap">
            <div class="site-footer__logo-box">
              <div class="site-footer__logo">
                <a href="#"><img src="https://richind.org/frontend/assets/images/logo.png" alt="RichInd-Logo" loading="lazy"></a>
              </div>
              <p class="site-footer__text mt-2">
                RichInd is an E-learning platform.<br> Helping individuals build their personal brand and create sustainable income.
              </p>
            </div>
            <div class="site-footer__contact-box">
              <a href="mailto:info@richind.org" class="thm-btn">Contact Us</a>
            </div>
          </div>
        </div>
      </div>
      <div class="site-footer__top">
        <div class="container">
          <div class="row">
            <div class="col-md-6">
              <ul class="list-unstyled site-footer__contact-info-list">
                <li><i class="far fa-envelope"></i> Email: <a href="mailto:info@richind.org">info@richind.org</a></li>
                <li><i class="far fa-phone"></i> Phone: <a href="tel:+917037104928">+91-7037104928</a></li>
                <li><i class="far fa-location"></i> Location: Firozabad, Uttar Pradesh, India</li>
              </ul>
            </div>
            <div class="col-md-6 text-md-right">
              <h4 class="site-footer__title">Follow Us</h4>
              <div class="d-flex justify-content-md-end gap-3 mt-2">
                <a href="https://www.instagram.com/richind_content?igsh=c294eW15eHMxOXNy" target="_blank" class="text-white"><i class="fab fa-instagram fa-lg"></i></a>
                <a href="https://youtube.com/@richind.in_?si=fpj9ITDRtXfNOvov" target="_blank" class="text-white"><i class="fab fa-youtube fa-lg"></i></a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="site-footer__bottom">
        <div class="container text-center py-3">
          <p class="site-footer__copyright-text mb-0">
            © 2020-2026 RichInd. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>

    <!-- Scroll To Top -->
    <a href="#" class="scroll-to-target scroll-to-top" id="scrollTopBtn">
      <span class="scroll-to-top__wrapper"><span class="scroll-to-top__inner"></span></span>
      <span class="scroll-to-top__text"> Go Back Top</span>
    </a>
  </div>

  <!-- Embedded Supabase Auth Modal -->
  <div class="sb-modal-backdrop" id="sbModalBackdrop" onclick="handleBackdropClick(event)">
    <div class="sb-modal-box">
      <button type="button" class="sb-modal-close" onclick="closeAuthModal()">✕</button>
      <div class="text-center">
        <img src="https://richind.org/frontend/assets/images/logo.png" alt="RichInd" height="40" style="margin-bottom: 0.5rem;" />
        <h3 id="sbModalTitle" style="font-weight: 700; font-size: 1.35rem; margin-bottom: 0.25rem;">Sign In to RichInd</h3>
        <p style="color: #9ca3af; font-size: 0.85rem;" id="sbModalSubtitle">Enter your details to access courses</p>
      </div>

      <div class="sb-tabs">
        <button type="button" class="sb-tab-btn active" id="sbTabSignin" onclick="switchAuthTab('signin')">Sign In</button>
        <button type="button" class="sb-tab-btn" id="sbTabSignup" onclick="switchAuthTab('signup')">Create Account</button>
      </div>

      <div class="sb-msg-box" id="sbMsgBox"></div>

      <form id="sbAuthForm" onsubmit="handleAuthSubmit(event)">
        <div class="sb-input-group" id="sbNameGroup" style="display: none;">
          <label for="sbNameInput">Full Name</label>
          <input type="text" id="sbNameInput" placeholder="Neeta Devi" autocomplete="name" />
        </div>

        <div class="sb-input-group">
          <label for="sbEmailInput">Email Address</label>
          <input type="email" id="sbEmailInput" required placeholder="you@domain.com" autocomplete="email" />
        </div>

        <div class="sb-input-group">
          <label for="sbPasswordInput">Password</label>
          <input type="password" id="sbPasswordInput" required placeholder="••••••••" autocomplete="current-password" />
        </div>

        <button type="submit" class="sb-submit-btn" id="sbSubmitBtn">Continue</button>
      </form>
    </div>
  </div>

  <!-- Core Scripts -->
  <script src="https://richind.org/frontend/assets/js/jquery-3.6.0.min.js"></script>
  <script src="https://richind.org/frontend/assets/js/bootstrap.bundle.min.js"></script>
  <script src="https://richind.org/frontend/assets/js/owl.carousel.min.js"></script>
  <script src="https://richind.org/frontend/assets/js/wow.js"></script>

  <script>
    // Initialize Supabase Client
    const SUPABASE_URL = 'https://serszarrdzwfaiojaops.supabase.co';
    const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNlcnN6YXJyZHp3ZmFpb2phb3BzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTQ3OTY4NzgsImV4cCI6MjExMDM3Mjg3OH0.Ju1lywLF35g2qgrF-8OEt9zeZq0p38hCBViudKbuqRY';
    const supabaseClient = window.supabase ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;

    let currentAuthMode = 'signin';

    function openAuthModal(mode) {
      currentAuthMode = mode || 'signin';
      switchAuthTab(currentAuthMode);
      const modal = document.getElementById('sbModalBackdrop');
      if (modal) modal.classList.add('show');
    }

    function closeAuthModal() {
      const modal = document.getElementById('sbModalBackdrop');
      if (modal) modal.classList.remove('show');
    }

    function handleBackdropClick(e) {
      if (e.target.id === 'sbModalBackdrop') closeAuthModal();
    }

    function switchAuthTab(mode) {
      currentAuthMode = mode;
      const tabIn = document.getElementById('sbTabSignin');
      const tabUp = document.getElementById('sbTabSignup');
      const nameGroup = document.getElementById('sbNameGroup');
      const modalTitle = document.getElementById('sbModalTitle');
      const submitBtn = document.getElementById('sbSubmitBtn');
      const msgBox = document.getElementById('sbMsgBox');
      if (msgBox) { msgBox.className = 'sb-msg-box'; msgBox.style.display = 'none'; }

      if (mode === 'signup') {
        tabIn.classList.remove('active');
        tabUp.classList.add('active');
        nameGroup.style.display = 'block';
        modalTitle.innerText = 'Create RichInd Account';
        submitBtn.innerText = 'Register & Start Learning';
      } else {
        tabUp.classList.remove('active');
        tabIn.classList.add('active');
        nameGroup.style.display = 'none';
        modalTitle.innerText = 'Sign In to RichInd';
        submitBtn.innerText = 'Sign In';
      }
    }

    async function handleAuthSubmit(e) {
      e.preventDefault();
      const email = document.getElementById('sbEmailInput').value.trim();
      const password = document.getElementById('sbPasswordInput').value;
      const fullName = document.getElementById('sbNameInput').value.trim();
      const submitBtn = document.getElementById('sbSubmitBtn');
      const msgBox = document.getElementById('sbMsgBox');

      if (!supabaseClient) {
        msgBox.className = 'sb-msg-box error';
        msgBox.innerText = 'Supabase client could not be loaded.';
        return;
      }

      submitBtn.disabled = true;
      submitBtn.innerText = 'Connecting...';
      msgBox.style.display = 'none';

      try {
        if (currentAuthMode === 'signup') {
          const { data, error } = await supabaseClient.auth.signUp({
            email,
            password,
            options: { data: { full_name: fullName } }
          });
          if (error) throw error;
          msgBox.className = 'sb-msg-box success';
          msgBox.innerText = 'Account created successfully! Welcome to RichInd.';
          setTimeout(() => closeAuthModal(), 1800);
        } else {
          const { data, error } = await supabaseClient.auth.signInWithPassword({
            email,
            password
          });
          if (error) throw error;
          msgBox.className = 'sb-msg-box success';
          msgBox.innerText = 'Signed in successfully! Loading dashboard...';
          setTimeout(() => closeAuthModal(), 1500);
        }
      } catch (err) {
        msgBox.className = 'sb-msg-box error';
        msgBox.innerText = err.message || 'Authentication error';
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerText = currentAuthMode === 'signup' ? 'Register & Start Learning' : 'Sign In';
      }
    }

    // Diwali Skip & Auto-Dismiss
    function dismissDiwali() {
      const intro = document.getElementById('dwIntro');
      if (intro) {
        intro.style.transition = 'opacity 0.6s ease';
        intro.style.opacity = '0';
        setTimeout(() => intro.remove(), 600);
        try { sessionStorage.setItem('diwali_show_played_2026', '1'); } catch(e){}
      }
    }

    document.getElementById('dwIntroSkip')?.addEventListener('click', dismissDiwali);
    setTimeout(dismissDiwali, 6000);

    // Preloader Dismiss
    window.addEventListener('load', () => {
      $('.js-preloader').fadeOut(400);
    });
    setTimeout(() => $('.js-preloader').fadeOut(400), 1200);

    // Mobile Navigation Handlers
    function toggleMobileNav() {
      const wrap = document.getElementById('mobileNavWrapper');
      if (wrap) wrap.classList.toggle('expanded');
    }
    function closeMobileNav() {
      const wrap = document.getElementById('mobileNavWrapper');
      if (wrap) wrap.classList.remove('expanded');
    }
    document.getElementById('mobileNavToggler')?.addEventListener('click', toggleMobileNav);

    // FAQ Accordion Toggle
    function toggleFaq(el) {
      const parent = el.closest('.accrodion');
      const all = document.querySelectorAll('.accrodion');
      all.forEach(item => {
        if (item !== parent) item.classList.remove('active');
      });
      parent.classList.toggle('active');
    }

    // Initialize Carousels on Ready
    $(document).ready(function() {
      if (typeof WOW !== 'undefined') new WOW().init();

      if ($('#coursesCarousel').length) {
        $('#coursesCarousel').owlCarousel({
          loop: true,
          margin: 20,
          nav: false,
          dots: true,
          autoplay: true,
          autoplayTimeout: 3500,
          smartSpeed: 700,
          responsive: {
            0: { items: 1 },
            600: { items: 2 },
            992: { items: 3 },
            1200: { items: 4 }
          }
        });
      }

      if ($('#teamCarousel').length) {
        $('#teamCarousel').owlCarousel({
          loop: true,
          margin: 20,
          nav: false,
          dots: true,
          autoplay: true,
          autoplayTimeout: 4000,
          responsive: {
            0: { items: 1 },
            600: { items: 2 },
            1000: { items: 4 }
          }
        });
      }

      if ($('#videoCarousel').length) {
        $('#videoCarousel').owlCarousel({
          loop: true,
          margin: 20,
          nav: false,
          dots: true,
          responsive: {
            0: { items: 1 },
            768: { items: 2 },
            1200: { items: 3 }
          }
        });
      }

      if ($('#testimonialCarousel').length) {
        $('#testimonialCarousel').owlCarousel({
          loop: true,
          margin: 20,
          nav: false,
          dots: true,
          autoplay: true,
          autoplayTimeout: 4500,
          responsive: {
            0: { items: 1 },
            768: { items: 2 },
            1200: { items: 3 }
          }
        });
      }

      // Smooth Scroll To Top
      $('#scrollTopBtn').on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: 0 }, 600);
      });
    });
  </script>
</body>
</html>`;

// Write to richind.html
fs.writeFileSync(path.resolve(__dirname, '../richind.html'), richindHtml, 'utf-8');

// Write to richind/index.html
const richindDir = path.resolve(__dirname, '../richind');
if (!fs.existsSync(richindDir)) fs.mkdirSync(richindDir, { recursive: true });
fs.writeFileSync(path.resolve(richindDir, 'index.html'), richindHtml, 'utf-8');

console.log('Successfully wrote richind.html and richind/index.html');

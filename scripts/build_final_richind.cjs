const fs = require('fs');
const path = require('path');

let html = fs.readFileSync(path.resolve(__dirname, 'clean_richind.html'), 'utf-8');

// 1. Fix markdown link artifacts
html = html.replace(/href="\[#\]\(https:\/\/richind\.org\/#\)"/g, 'href="#"');
html = html.replace(/\[#\]\(https:\/\/richind\.org\/#\)/g, '#');

// 2. Fix broken style in FAQ
html = html.replace(
  /style="float: left; width: 926px; margin-bottom: 15px;" gordita="" regular",="" sans-serif;"=""/g,
  'style="float: left; width: 100%; margin-bottom: 15px; font-family: \'Gordita\', sans-serif;"'
);

// 3. Ensure Supabase JS client and modal CSS are added in head
const headInjections = `
  <!-- Supabase JS Client CDN -->
  <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>

  <style>
    /* Sparkle Burst Canvas */
    #dw-fx-canvas {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      pointer-events: none;
      z-index: 999999;
    }

    /* Custom Cursor Enhancements */
    body.custom-cursor {
      cursor: default;
    }
    .custom-cursor__cursor {
      pointer-events: none;
    }
    .custom-cursor__cursor-two {
      pointer-events: none;
    }

    /* Accordion Fix */
    .accrodion .accrodion-content {
      display: none;
    }
    .accrodion.active .accrodion-content {
      display: block;
    }
    .accrodion-title {
      cursor: pointer;
    }

    /* Mobile Nav Drawer */
    .mobile-nav__wrapper {
      transition: opacity 0.3s ease, visibility 0.3s ease;
    }
    .mobile-nav__wrapper.expanded {
      opacity: 1;
      visibility: visible;
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
      z-index: 9999999;
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
</head>`;

html = html.replace('</head>', headInjections);

// 4. Modal HTML Markup to append before </body>
const modalAndFxMarkup = `
  <!-- Supabase Auth Modal -->
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

  <!-- Sparkle & Burst Engine Script -->
  <script>
    (function() {
      // 1. Canvas Sparkles & Click Burst
      var canvas = document.createElement('canvas');
      canvas.id = 'dw-fx-canvas';
      document.body.appendChild(canvas);
      var ctx = canvas.getContext('2d');
      var width, height;
      function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
      }
      resize();
      window.addEventListener('resize', resize);

      var SPARKLE_COLORS = ['#FFD36B', '#FFB400', '#FF8A00', '#FF4F8B', '#FFF3C4', '#E8175D', '#A855F7', '#2DD4BF'];
      var particles = [];
      var running = false;
      var lastFrame = 0;

      function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

      function sparkle(x, y, o) {
        o = o || {};
        var a = Math.random() * Math.PI * 2;
        var sp = (o.speed || 1.8) * (0.6 + Math.random() * 0.8);
        particles.push({
          kind: Math.random() > 0.4 ? 'star' : 'sparkle',
          x: x, y: y, px: x, py: y,
          vx: Math.cos(a) * sp + (o.vx || 0),
          vy: Math.sin(a) * sp + (o.vy || 0),
          life: 1,
          decay: o.decay || (0.016 + Math.random() * 0.022),
          size: o.size || (3 + Math.random() * 4),
          rotation: Math.random() * Math.PI,
          rotSpeed: (Math.random() - 0.5) * 0.1,
          color: pick(o.colors || SPARKLE_COLORS)
        });
      }

      function drawStar(p, alpha) {
        var r = p.size;
        ctx.save();
        ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
        ctx.fillStyle = p.color;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.beginPath();
        ctx.moveTo(0, -r);
        ctx.quadraticCurveTo(0, 0, r, 0);
        ctx.quadraticCurveTo(0, 0, 0, r);
        ctx.quadraticCurveTo(0, 0, -r, 0);
        ctx.quadraticCurveTo(0, 0, 0, -r);
        ctx.fill();
        ctx.restore();
      }

      function frame(now) {
        var step = Math.min((now - lastFrame) / 16.67, 3);
        lastFrame = now;
        ctx.clearRect(0, 0, width, height);

        for (var i = particles.length - 1; i >= 0; i--) {
          var p = particles[i];
          p.px = p.x;
          p.py = p.y;
          p.x += p.vx * step;
          p.y += p.vy * step;
          p.vx *= Math.pow(0.97, step);
          p.vy = p.vy * Math.pow(0.97, step) + 0.04 * step; // gravity
          p.life -= p.decay * step;
          p.rotation += p.rotSpeed * step;

          if (p.life <= 0) {
            particles.splice(i, 1);
          } else {
            drawStar(p, p.life * 1.5);
          }
        }

        if (particles.length > 0) {
          requestAnimationFrame(frame);
        } else {
          running = false;
        }
      }

      function startLoop() {
        if (!running) {
          running = true;
          lastFrame = performance.now();
          requestAnimationFrame(frame);
        }
      }

      // CLICK / TAP BURST ANIMATION
      window.addEventListener('pointerdown', function(e) {
        // Emit 25 sparkling stars in a burst
        for (var i = 0; i < 25; i++) {
          sparkle(e.clientX, e.clientY, {
            speed: 4.8,
            size: 3 + Math.random() * 5,
            decay: 0.015 + Math.random() * 0.02
          });
        }
        startLoop();
      }, { passive: true });

      // CURSOR TRAIL SPARKLES
      var lx = 0, ly = 0;
      window.addEventListener('pointermove', function(e) {
        var dx = e.clientX - lx, dy = e.clientY - ly;
        if (dx * dx + dy * dy < 120) return; // a sparkle every ~11px
        lx = e.clientX;
        ly = e.clientY;
        sparkle(e.clientX, e.clientY, { speed: 1.2, size: 2.5 + Math.random() * 3 });
        if (Math.random() < 0.4) {
          sparkle(e.clientX, e.clientY, { speed: 1.8, size: 2 + Math.random() * 2.5 });
        }
        startLoop();
      }, { passive: true });

      // 2. Custom Dual Cursor follow
      var cursor = document.querySelector('.custom-cursor__cursor');
      var cursorinner = document.querySelector('.custom-cursor__cursor-two');
      if (cursor && cursorinner) {
        document.addEventListener('mousemove', function(e) {
          cursor.style.transform = 'translate3d(calc(' + e.clientX + 'px - 50%), calc(' + e.clientY + 'px - 50%), 0)';
          cursorinner.style.left = e.clientX + 'px';
          cursorinner.style.top = e.clientY + 'px';
        });
        document.addEventListener('mousedown', function() {
          cursor.classList.add('click');
          cursorinner.classList.add('custom-cursor__innerhover');
        });
        document.addEventListener('mouseup', function() {
          cursor.classList.remove('click');
          cursorinner.classList.remove('custom-cursor__innerhover');
        });
        document.querySelectorAll('a, button, input, .thm-btn').forEach(function(el) {
          el.addEventListener('mouseover', function() { cursor.classList.add('custom-cursor__hover'); });
          el.addEventListener('mouseleave', function() { cursor.classList.remove('custom-cursor__hover'); });
        });
      }

      // 3. Preloader & Diwali Skip Handlers
      window.addEventListener('load', function() {
        $('.js-preloader').fadeOut(500);
      });
      setTimeout(function() { $('.js-preloader').fadeOut(500); }, 1500);

      var skipBtn = document.querySelector('.dw-intro-skip');
      function dismissDiwali() {
        var dw = document.getElementById('dwIntro');
        if (dw) {
          dw.style.transition = 'opacity 0.6s ease';
          dw.style.opacity = '0';
          setTimeout(function() { dw.remove(); }, 600);
          try { sessionStorage.setItem('diwali_show_played_2026', '1'); } catch(e){}
        }
      }
      if (skipBtn) skipBtn.addEventListener('click', dismissDiwali);
      setTimeout(dismissDiwali, 6500);

      // 4. Mobile Nav Toggle
      $('.mobile-nav__toggler').on('click', function(e) {
        e.preventDefault();
        $('.mobile-nav__wrapper').toggleClass('expanded');
      });

      // 5. FAQ Accordion Toggle
      $('.accrodion-title').on('click', function() {
        var parent = $(this).closest('.accrodion');
        parent.toggleClass('active').siblings('.accrodion').removeClass('active');
      });

      // 6. Owl Carousels Initializers
      $(document).ready(function() {
        if ($('.courses-one__carousel').length) {
          $('.courses-one__carousel').owlCarousel({
            loop: true,
            margin: 20,
            nav: false,
            dots: true,
            autoplay: true,
            autoplayTimeout: 3500,
            responsive: { 0: { items: 1 }, 600: { items: 2 }, 992: { items: 3 }, 1200: { items: 4 } }
          });
        }
        if ($('.team-one__carousel').length) {
          $('.team-one__carousel').owlCarousel({
            loop: true,
            margin: 20,
            nav: false,
            dots: true,
            autoplay: true,
            autoplayTimeout: 4000,
            responsive: { 0: { items: 1 }, 600: { items: 2 }, 1000: { items: 4 } }
          });
        }
        if ($('.blog-one__carousel').length) {
          $('.blog-one__carousel').owlCarousel({
            loop: true,
            margin: 20,
            nav: false,
            dots: true,
            responsive: { 0: { items: 1 }, 768: { items: 2 }, 1200: { items: 3 } }
          });
        }
        if ($('.testimonial-one__carousel').length) {
          $('.testimonial-one__carousel').owlCarousel({
            loop: true,
            margin: 20,
            nav: false,
            dots: true,
            autoplay: true,
            autoplayTimeout: 4500,
            responsive: { 0: { items: 1 }, 768: { items: 2 }, 1200: { items: 3 } }
          });
        }

        // Scroll to Top
        $('.scroll-to-target').on('click', function(e) {
          e.preventDefault();
          $('html, body').animate({ scrollTop: 0 }, 600);
        });

        // Wire up Start Learning and Buy Now buttons to Supabase Modal
        $('a[href*="signin"], a[href*="checkout"], .mobile-login-btn a').on('click', function(e) {
          e.preventDefault();
          openAuthModal($(this).attr('href').includes('checkout') ? 'signup' : 'signin');
        });
      });
    })();

    // Supabase Auth Handling
    const SUPABASE_URL = 'https://serszarrdzwfaiojaops.supabase.co';
    const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNlcnN6YXJyZHp3ZmFpb2phb3BzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTQ3OTY4NzgsImV4cCI6MjExMDM3Mjg3OH0.Ju1lywLF35g2qgrF-8OEt9zeZq0p38hCBViudKbuqRY';
    const supabaseClient = window.supabase ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;
    let currentAuthMode = 'signin';

    function openAuthModal(mode) {
      currentAuthMode = mode || 'signin';
      switchAuthTab(currentAuthMode);
      var modal = document.getElementById('sbModalBackdrop');
      if (modal) modal.classList.add('show');
    }

    function closeAuthModal() {
      var modal = document.getElementById('sbModalBackdrop');
      if (modal) modal.classList.remove('show');
    }

    function handleBackdropClick(e) {
      if (e.target.id === 'sbModalBackdrop') closeAuthModal();
    }

    function switchAuthTab(mode) {
      currentAuthMode = mode;
      var tabIn = document.getElementById('sbTabSignin');
      var tabUp = document.getElementById('sbTabSignup');
      var nameGroup = document.getElementById('sbNameGroup');
      var modalTitle = document.getElementById('sbModalTitle');
      var submitBtn = document.getElementById('sbSubmitBtn');
      var msgBox = document.getElementById('sbMsgBox');
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
      var email = document.getElementById('sbEmailInput').value.trim();
      var password = document.getElementById('sbPasswordInput').value;
      var fullName = document.getElementById('sbNameInput').value.trim();
      var submitBtn = document.getElementById('sbSubmitBtn');
      var msgBox = document.getElementById('sbMsgBox');

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
          var { data, error } = await supabaseClient.auth.signUp({
            email: email,
            password: password,
            options: { data: { full_name: fullName } }
          });
          if (error) throw error;
          msgBox.className = 'sb-msg-box success';
          msgBox.innerText = 'Account created successfully! Welcome to RichInd.';
          setTimeout(closeAuthModal, 1800);
        } else {
          var { data, error } = await supabaseClient.auth.signInWithPassword({
            email: email,
            password: password
          });
          if (error) throw error;
          msgBox.className = 'sb-msg-box success';
          msgBox.innerText = 'Signed in successfully! Loading...';
          setTimeout(closeAuthModal, 1500);
        }
      } catch (err) {
        msgBox.className = 'sb-msg-box error';
        msgBox.innerText = err.message || 'Authentication error';
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerText = currentAuthMode === 'signup' ? 'Register & Start Learning' : 'Sign In';
      }
    }
  </script>
`;

html = html.replace('</body>', modalAndFxMarkup + '\n</body>');

// Write out to all target locations
fs.writeFileSync(path.resolve(__dirname, '../index.html'), html, 'utf-8');
fs.writeFileSync(path.resolve(__dirname, '../richind.html'), html, 'utf-8');

const richindDir = path.resolve(__dirname, '../richind');
if (!fs.existsSync(richindDir)) fs.mkdirSync(richindDir, { recursive: true });
fs.writeFileSync(path.resolve(richindDir, 'index.html'), html, 'utf-8');

const pubRichindDir = path.resolve(__dirname, '../public/richind');
if (!fs.existsSync(pubRichindDir)) fs.mkdirSync(pubRichindDir, { recursive: true });
fs.writeFileSync(path.resolve(__dirname, '../public/richind.html'), html, 'utf-8');
fs.writeFileSync(path.resolve(pubRichindDir, 'index.html'), html, 'utf-8');

console.log('Successfully built and updated all RichInd HTML files!');

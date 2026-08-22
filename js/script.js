// ==== NexVerse Site JS ====
document.addEventListener('DOMContentLoaded', () => {
  // Year
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // Mobile Nav Toggle
  const toggle = document.getElementById('navToggle');
  const nav = document.getElementById('mainNav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      toggle.classList.toggle('active');
      toggle.setAttribute('aria-expanded', isOpen); // keep screen readers in sync
    });
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
    }));
  }

  // Header shadow on scroll
  const header = document.querySelector('.site-header');
  const onScroll = () => {
    if (!header) return;
    if (window.scrollY > 20) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Reveal on scroll — but show everything instantly if user prefers reduced motion
  const revealSelector = '.section, .stat, .pillar-card, .track-card, .past-card, .prize-card, .tl-item, .num-card, .member-card, .featured-info, .featured-visual, .about-visual, .about-text, .gallery-item';
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll(revealSelector).forEach(el => el.classList.add('in-view'));
  } else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in-view');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll(revealSelector).forEach(el => io.observe(el));
  }
});

/* ============================================================
   FEATURE 1: LIVE COUNTDOWN — NexHack 2.0 (Sep 25, 2026, IST)
   ============================================================ */
(function () {
  const cdDays = document.getElementById('cdDays');
  if (!cdDays) return; // countdown isn't on this page — bail out silently

  const TARGET = new Date('2026-09-25T09:00:00+05:30').getTime(); // Day 1 start (IST)
  const END = TARGET + 36 * 60 * 60 * 1000; // +36 hours of hacking
  const els = {
    d: cdDays,
    h: document.getElementById('cdHours'),
    m: document.getElementById('cdMins'),
    s: document.getElementById('cdSecs'),
  };
  const statusEl = document.getElementById('cdStatus');
  const pad = (n) => String(n).padStart(2, '0');

  function tick() {
    const now = Date.now();
    const diff = TARGET - now;

    if (diff > 0) {
      els.d.textContent = pad(Math.floor(diff / 86400000));
      els.h.textContent = pad(Math.floor((diff % 86400000) / 3600000));
      els.m.textContent = pad(Math.floor((diff % 3600000) / 60000));
      els.s.textContent = pad(Math.floor((diff % 60000) / 1000));
    } else if (now < END) {
      // Event is happening right now
      if (statusEl) statusEl.textContent = '🔴 LIVE — HACKING IN PROGRESS';
      Object.values(els).forEach((node) => (node.textContent = '00'));
    } else {
      // Event is over — stop the timer for good
      if (statusEl) statusEl.textContent = '✅ EVENT COMPLETED — SEE YOU AT NEXHACK 3.0';
      Object.values(els).forEach((node) => (node.textContent = '00'));
      clearInterval(timer);
    }
  }

  const timer = setInterval(tick, 1000);
  tick(); // run immediately — no 1-second blank
})();

/* ============================================================
   FEATURE 2: COUNT-UP ANIMATION for stats (data-count attributes)
   Usage: <span data-count="500" data-suffix="+" data-prefix="₹">
   ============================================================ */
(function () {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const DURATION = 1400; // ms

  function setFinal(el) {
    el.textContent = (el.dataset.prefix || '') + Number(el.dataset.count) + (el.dataset.suffix || '');
  }

  function animate(el) {
    if (reducedMotion) { setFinal(el); return; }
    const target = Number(el.dataset.count);
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    const start = performance.now();

    function frame(now) {
      const p = Math.min((now - start) / DURATION, 1);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic on purpose — feels snappy
      el.textContent = prefix + Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { animate(e.target); io.unobserve(e.target); } // run once per counter
    });
  }, { threshold: 0.5 });

  counters.forEach((c) => {
    // reset to zero so the count-up is visible (no-JS users keep the final value)
    c.textContent = (c.dataset.prefix || '') + '0' + (c.dataset.suffix || '');
    io.observe(c);
  });
})();

/* ============================================================
   FEATURE 3: GALLERY LIGHTBOX — click a photo to view it big
   ============================================================ */
(function () {
  const grids = document.querySelectorAll('.gallery-grid');
  if (!grids.length) return;

  const imgs = [...document.querySelectorAll('.gallery-grid img')];
  const overlay = document.createElement('div');
  overlay.className = 'lightbox';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-label', 'Photo viewer');
  overlay.innerHTML = `
    <button class="lb-btn lb-close" aria-label="Close photo viewer">✕</button>
    <button class="lb-btn lb-prev" aria-label="Previous photo">◀</button>
    <img class="lb-img" alt="" />
    <div class="lb-counter"></div>
    <button class="lb-btn lb-next" aria-label="Next photo">▶</button>`;
  document.body.appendChild(overlay);

  const lbImg = overlay.querySelector('.lb-img');
  const lbCounter = overlay.querySelector('.lb-counter');
  let index = 0;

  function open(i) {
    index = (i + imgs.length) % imgs.length; // wraps around both ways
    lbImg.src = imgs[index].src;
    lbImg.alt = imgs[index].alt;
    lbCounter.textContent = (index + 1) + ' / ' + imgs.length;
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden'; // lock page scroll behind lightbox
  }

  function close() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  imgs.forEach((img, i) => {
    const card = img.parentElement;
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', 'Open photo ' + (i + 1) + ' of ' + imgs.length);
    card.addEventListener('click', () => open(i));
    card.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(i); } });
  });

  overlay.querySelector('.lb-close').addEventListener('click', close);
  overlay.querySelector('.lb-prev').addEventListener('click', (e) => { e.stopPropagation(); open(index - 1); });
  overlay.querySelector('.lb-next').addEventListener('click', (e) => { e.stopPropagation(); open(index + 1); });
  overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); }); // click dark area to close

  document.addEventListener('keydown', (e) => {
    if (!overlay.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') open(index - 1);
    if (e.key === 'ArrowRight') open(index + 1);
  });
})();

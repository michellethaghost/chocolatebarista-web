/* ============================================================
   THE CHOCOLATE BARISTA — main.js
   Navigation · Carousel · Animations · Form · Date
   ============================================================ */

'use strict';

/* ============================================================
   UTILITIES
   ============================================================ */

/**
 * Throttle — limit how often a function fires
 */
function throttle(fn, delay) {
  let last = 0;
  return function(...args) {
    const now = Date.now();
    if (now - last >= delay) {
      last = now;
      fn.apply(this, args);
    }
  };
}

/**
 * Format today's date in TCB style
 */
function setTodayDate() {
  const el = document.getElementById('today-date');
  if (!el) return;
  const opts = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  el.textContent = new Date().toLocaleDateString('en-US', opts);
}


/* ============================================================
   MOBILE NAVIGATION
   ============================================================ */

function initNav() {
  const toggle  = document.getElementById('nav-toggle');
  const nav     = document.getElementById('main-nav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', function () {
    const isOpen = nav.classList.toggle('open');
    toggle.classList.toggle('open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close on outside click
  document.addEventListener('click', function (e) {
    if (!toggle.contains(e.target) && !nav.contains(e.target)) {
      nav.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });

  // Close on Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav.classList.contains('open')) {
      nav.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      toggle.focus();
    }
  });
}


/* ============================================================
   SCROLL-TRIGGERED FADE-IN ANIMATIONS
   ============================================================ */

function initScrollAnimations() {
  const targets = document.querySelectorAll('.fade-in, .fade-in-children');
  if (!targets.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.08,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  targets.forEach((el) => observer.observe(el));
}


/* ============================================================
   PRESS CAROUSEL
   Auto-scrolls via CSS animation; JS adds pause-on-hover
   and keyboard navigation for accessibility.
   ============================================================ */

function initCarousel() {
  const track = document.getElementById('press-track');
  if (!track) return;

  // CSS handles the animation; we just expose pause control
  // Pause on focus (keyboard users tabbing through logos)
  track.addEventListener('focusin', () => {
    track.style.animationPlayState = 'paused';
  });

  track.addEventListener('focusout', () => {
    track.style.animationPlayState = '';
  });

  // Keyboard: arrow keys nudge the carousel
  track.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
      const links = [...track.querySelectorAll('a[href]')];
      const current = document.activeElement;
      const idx = links.indexOf(current);
      if (idx < links.length - 1) links[idx + 1].focus();
    }
    if (e.key === 'ArrowLeft') {
      const links = [...track.querySelectorAll('a[href]')];
      const current = document.activeElement;
      const idx = links.indexOf(current);
      if (idx > 0) links[idx - 1].focus();
    }
  });
}


/* ============================================================
   JOURNAL CATEGORY FILTER
   ============================================================ */

function initJournalFilters() {
  const filters = document.querySelectorAll('.journal-filter');
  const grid    = document.getElementById('journal-grid');
  if (!filters.length || !grid) return;

  filters.forEach((btn) => {
    btn.addEventListener('click', function () {
      // Update active state
      filters.forEach((f) => {
        f.classList.remove('active');
        f.setAttribute('aria-selected', 'false');
      });
      this.classList.add('active');
      this.setAttribute('aria-selected', 'true');

      const filter = this.dataset.filter;
      const articles = grid.querySelectorAll('article[data-category]');

      articles.forEach((article) => {
        const match = filter === 'all' || article.dataset.category === filter;
        article.style.display = match ? '' : 'none';
      });

      // Also hide/show adjacent col-dividers
      const dividers = grid.querySelectorAll('.col-divider');
      dividers.forEach((d) => {
        d.style.display = filter === 'all' ? '' : 'none';
      });
    });
  });
}


/* ============================================================
   NEWSLETTER & CONTACT FORMS
   Kit (ConvertKit) handles all email subscriptions natively.
   No custom JS needed here — Kit's ck.5.js script manages
   the sticky bar and inline form submissions.
   ============================================================ */


/* ============================================================
   SMOOTH INTERNAL LINK SCROLL
   ============================================================ */

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}


/* ============================================================
   ACTIVE NAV LINK
   Auto-marks the current page's nav link as active
   ============================================================ */

function setActiveNav() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  const links = document.querySelectorAll('.masthead__nav a');
  links.forEach((link) => {
    const href = link.getAttribute('href');
    if (href === path) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}


/* ============================================================
   STICKY HEADER
   Fixes masthead to top once dateline strip scrolls away.
   Uses position:fixed + body padding to avoid layout jump.
   ============================================================ */

function initStickyHeader() {
  const masthead = document.querySelector('.masthead');
  const dateline = document.querySelector('.dateline-strip');
  if (!masthead) return;

  let isFixed = false;

  function update() {
    const threshold = dateline ? dateline.getBoundingClientRect().bottom : 0;
    const shouldFix = threshold <= 0;
    if (shouldFix === isFixed) return;
    isFixed = shouldFix;

    if (shouldFix) {
      const h = masthead.offsetHeight;
      masthead.classList.add('masthead--fixed');
      document.body.style.paddingTop = h + 'px';
    } else {
      masthead.classList.remove('masthead--fixed');
      document.body.style.paddingTop = '';
    }
  }

  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update, { passive: true });
  update();
}


/* ============================================================
   INIT
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {
  setTodayDate();
  initNav();
  initScrollAnimations();
  initCarousel();
  initJournalFilters();
  initSmoothScroll();
  setActiveNav();
  initStickyHeader();
});

/* EmotionBot site behaviour
 * ------------------------------------------------------------------
 * Shared by every page. Each feature is a small self-contained
 * initialiser, and every one of them degrades gracefully: if a page
 * does not contain the relevant element, the initialiser simply
 * does nothing.
 *
 * Depends on js/theme.js (loaded in <head>), which has already put
 * data-theme on <html> and added the `js` class.
 */
(function () {
  'use strict';

  var THEME_KEY = 'emotionbot-theme';
  var DESKTOP_NAV_QUERY = '(min-width: 1181px)';

  /* ---------------------------------------------------------------- *
   * Theme toggle
   * ---------------------------------------------------------------- */
  function initThemeToggle() {
    var toggle = document.querySelector('[data-theme-toggle]');
    if (!toggle) return;

    var icon = toggle.querySelector('use');

    function applyTheme(theme) {
      var isDark = theme === 'dark';
      document.documentElement.setAttribute('data-theme', theme);
      toggle.setAttribute('aria-pressed', String(isDark));
      toggle.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
      toggle.setAttribute('title', isDark ? 'Switch to light theme' : 'Switch to dark theme');
      if (icon) {
        var ref = isDark ? '#i-sun' : '#i-moon';
        icon.setAttribute('href', ref);
        icon.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', ref);
      }
    }

    applyTheme(document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light');

    toggle.addEventListener('click', function () {
      var next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      try {
        window.localStorage.setItem(THEME_KEY, next);
      } catch (error) {
        /* Private browsing or storage disabled — the theme still applies for this page. */
      }
    });
  }

  /* ---------------------------------------------------------------- *
   * Mobile navigation
   * ---------------------------------------------------------------- */
  function initNav() {
    var toggle = document.querySelector('[data-nav-toggle]');
    var nav = document.querySelector('[data-nav]');
    if (!toggle || !nav) return;

    var icon = toggle.querySelector('use');
    var desktopQuery = window.matchMedia(DESKTOP_NAV_QUERY);

    function setIcon(isOpen) {
      if (!icon) return;
      var ref = isOpen ? '#i-close' : '#i-menu';
      icon.setAttribute('href', ref);
      icon.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', ref);
    }

    function closeMenu(returnFocus) {
      if (!nav.classList.contains('open')) return;
      nav.classList.remove('open');
      document.body.classList.remove('menu-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open navigation menu');
      setIcon(false);
      if (returnFocus) toggle.focus();
    }

    function openMenu() {
      nav.classList.add('open');
      document.body.classList.add('menu-open');
      toggle.setAttribute('aria-expanded', 'true');
      toggle.setAttribute('aria-label', 'Close navigation menu');
      setIcon(true);
    }

    toggle.addEventListener('click', function () {
      if (nav.classList.contains('open')) closeMenu(false);
      else openMenu();
    });

    nav.addEventListener('click', function (event) {
      if (event.target.closest('a')) closeMenu(false);
    });

    document.addEventListener('click', function (event) {
      if (nav.classList.contains('open') && !nav.contains(event.target) && !toggle.contains(event.target)) {
        closeMenu(false);
      }
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') closeMenu(true);
    });

    var onBreakpointChange = function (event) {
      if (event.matches) closeMenu(false);
    };
    if (typeof desktopQuery.addEventListener === 'function') {
      desktopQuery.addEventListener('change', onBreakpointChange);
    } else if (typeof desktopQuery.addListener === 'function') {
      desktopQuery.addListener(onBreakpointChange);
    }
  }

  /* ---------------------------------------------------------------- *
   * Reading progress bar + back-to-top button
   * ---------------------------------------------------------------- */
  function initScrollUi() {
    var topButton = document.getElementById('topBtn');
    var progress = document.createElement('div');
    progress.className = 'scroll-progress';
    progress.setAttribute('aria-hidden', 'true');
    document.body.appendChild(progress);

    var queued = false;

    function update() {
      queued = false;
      var doc = document.documentElement;
      var scrollable = doc.scrollHeight - window.innerHeight;
      var ratio = scrollable > 0 ? window.scrollY / scrollable : 0;
      progress.style.width = Math.min(100, Math.max(0, ratio * 100)) + '%';
      if (topButton) topButton.classList.toggle('visible', window.scrollY > 420);
    }

    window.addEventListener('scroll', function () {
      if (queued) return;
      queued = true;
      window.requestAnimationFrame(update);
    }, { passive: true });

    window.addEventListener('resize', update, { passive: true });
    update();

    if (topButton) {
      topButton.addEventListener('click', function () {
        var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
        var skipLink = document.querySelector('.skip-link');
        var heading = document.querySelector('main h1');
        if (heading) heading.setAttribute('tabindex', '-1');
        if (heading) heading.focus({ preventScroll: true });
        if (skipLink) skipLink.blur();
      });
    }
  }

  /* ---------------------------------------------------------------- *
   * Reveal sections as they scroll into view
   * ---------------------------------------------------------------- */
  function initReveal() {
    var items = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
    if (!items.length) return;

    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function showAll() {
      items.forEach(function (item) { item.classList.add('is-visible'); });
    }

    if (reduceMotion || !('IntersectionObserver' in window)) {
      showAll();
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    items.forEach(function (item) {
      var box = item.getBoundingClientRect();
      if (box.top < window.innerHeight && box.bottom > 0) {
        item.classList.add('is-visible');
      } else {
        observer.observe(item);
      }
    });
  }

  /* ---------------------------------------------------------------- *
   * Current year in the footer
   * ---------------------------------------------------------------- */
  function initYear() {
    var slots = document.querySelectorAll('[data-year]');
    if (!slots.length) return;
    var year = String(new Date().getFullYear());
    Array.prototype.forEach.call(slots, function (slot) { slot.textContent = year; });
  }

  /* ---------------------------------------------------------------- */
  function ready(callback) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', callback);
    else callback();
  }

  ready(function () {
    initThemeToggle();
    initNav();
    initScrollUi();
    initReveal();
    initYear();
  });
})();

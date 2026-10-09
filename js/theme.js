/* EmotionBot theme bootstrap
 * ------------------------------------------------------------------
 * Loaded synchronously in <head> (before the stylesheet) so the correct
 * colour theme is on <html> before the first paint — no flash of the
 * wrong theme. Also swaps the `no-js` marker for `js`, which is what
 * opts the scroll-reveal animations in.
 *
 * Preference order: saved choice -> operating-system setting -> light.
 */
(function () {
  'use strict';

  var STORAGE_KEY = 'emotionbot-theme';
  var root = document.documentElement;

  function readStoredTheme() {
    try {
      return window.localStorage.getItem(STORAGE_KEY);
    } catch (error) {
      return null;
    }
  }

  function systemPrefersDark() {
    return !!(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
  }

  var stored = readStoredTheme();
  var theme = stored === 'dark' || stored === 'light'
    ? stored
    : (systemPrefersDark() ? 'dark' : 'light');

  root.setAttribute('data-theme', theme);
  root.classList.remove('no-js');
  root.classList.add('js');
})();

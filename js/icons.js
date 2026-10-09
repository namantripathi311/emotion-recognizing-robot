/* EmotionBot icon sprite
 * ------------------------------------------------------------------
 * Loaded as the first script inside <body> so the sprite exists before
 * the page paints. Every icon in the site is then drawn with:
 *     <svg class="icon" aria-hidden="true"><use href="#i-name"></use></svg>
 * Inline <use> references resolve on file:// as well as on a static host,
 * and the icons inherit colour via currentColor.
 */
(function () {
  'use strict';

  var STROKE = 'fill="none" stroke="currentColor" stroke-width="1.7" ' +
               'stroke-linecap="round" stroke-linejoin="round"';

  var SPRITE =
    '<svg id="eb-icon-sprite" xmlns="http://www.w3.org/2000/svg" ' + STROKE +
    ' aria-hidden="true" focusable="false">' +

    /* ---------- interface chrome ---------- */
    '<symbol id="i-menu" viewBox="0 0 24 24"><path d="M4 7.5h16M4 12h16M4 16.5h16"/></symbol>' +
    '<symbol id="i-close" viewBox="0 0 24 24"><path d="M6.5 6.5l11 11M17.5 6.5l-11 11"/></symbol>' +
    '<symbol id="i-sun" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4.2"/>' +
      '<path d="M12 2.6v2.1M12 19.3v2.1M2.6 12h2.1M19.3 12h2.1M5.3 5.3l1.5 1.5M17.2 17.2l1.5 1.5M18.7 5.3l-1.5 1.5M6.8 17.2l-1.5 1.5"/></symbol>' +
    '<symbol id="i-moon" viewBox="0 0 24 24"><path d="M20.4 15.1A8.7 8.7 0 1 1 8.9 3.6a7 7 0 0 0 11.5 11.5Z"/></symbol>' +
    '<symbol id="i-arrow-right" viewBox="0 0 24 24"><path d="M4 12h15M13.4 6.4 19 12l-5.6 5.6"/></symbol>' +
    '<symbol id="i-arrow-up" viewBox="0 0 24 24"><path d="M12 19.4V4.6M6.4 10.2 12 4.6l5.6 5.6"/></symbol>' +
    '<symbol id="i-check" viewBox="0 0 24 24"><path d="M5 12.8 9.6 17.4 19.2 6.8"/></symbol>' +
    '<symbol id="i-lock" viewBox="0 0 24 24"><rect x="4.8" y="10.4" width="14.4" height="9.6" rx="2.6"/>' +
      '<path d="M8.4 10.4V8.2a3.6 3.6 0 0 1 7.2 0v2.2M12 14.2v2.3"/></symbol>' +
    '<symbol id="i-shield" viewBox="0 0 24 24"><path d="M12 3.4 5 6.2v5.4c0 4.1 2.8 7.6 7 8.9 4.2-1.3 7-4.8 7-8.9V6.2Z"/>' +
      '<path d="M9 12.2 11.2 14.4 15.2 10.1"/></symbol>' +
    '<symbol id="i-heart" viewBox="0 0 24 24"><path d="M12 19.4s-7-4.3-7-8.7a4 4 0 0 1 7-2.6 4 4 0 0 1 7 2.6c0 4.4-7 8.7-7 8.7Z"/></symbol>' +

    /* ---------- the four process stages ---------- */
    '<symbol id="i-camera" viewBox="0 0 24 24"><path d="M8.6 6.6 10 4.2h4l1.4 2.4"/>' +
      '<rect x="3" y="6.6" width="18" height="13" rx="3"/><circle cx="12" cy="13" r="3.6"/></symbol>' +
    '<symbol id="i-scan" viewBox="0 0 24 24"><path d="M3 8.6V6.2a3.2 3.2 0 0 1 3.2-3.2h2.4M15.4 3h2.4A3.2 3.2 0 0 1 21 6.2v2.4' +
      'M21 15.4v2.4a3.2 3.2 0 0 1-3.2 3.2h-2.4M8.6 21H6.2A3.2 3.2 0 0 1 3 17.8v-2.4"/>' +
      '<path d="M9.4 10.2v2.9M14.6 10.2v2.9M9.4 13.9h5.2"/><circle cx="12" cy="12" r="7.4"/></symbol>' +
    '<symbol id="i-brain" viewBox="0 0 24 24"><path d="M12 5.4a3.1 3.1 0 0 0-5.9 1.2c-1.6.6-2.3 2-2.1 3.4.2 1.6 1.4 2.3 1.6 3.4.2 1.3-.5 2.7.7 3.8 1.2 1.2 3 1 4-.1"/>' +
      '<path d="M12 5.4a3.1 3.1 0 0 1 5.9 1.2c1.6.6 2.3 2 2.1 3.4-.2 1.6-1.4 2.3-1.6 3.4-.2 1.3.5 2.7-.7 3.8-1.2 1.2-3 1-4-.1"/>' +
      '<path d="M12 5.4v14.2"/></symbol>' +
    '<symbol id="i-robot" viewBox="0 0 24 24"><path d="M12 8.2V5.8"/><circle cx="12" cy="4.2" r="1.5"/>' +
      '<rect x="4.4" y="8.2" width="15.2" height="11" rx="3.6"/>' +
      '<circle cx="9.4" cy="13.1" r="1.5"/><circle cx="14.6" cy="13.1" r="1.5"/><path d="M9.6 16.3h4.8"/></symbol>' +

    /* ---------- expression faces ---------- */
    '<symbol id="i-face-happy" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.6"/>' +
      '<circle cx="9.3" cy="10" r="1.1" fill="currentColor" stroke="none"/><circle cx="14.7" cy="10" r="1.1" fill="currentColor" stroke="none"/>' +
      '<path d="M8.1 14.2a4.5 4.5 0 0 0 7.8 0"/></symbol>' +
    '<symbol id="i-face-sad" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.6"/>' +
      '<circle cx="9.3" cy="10" r="1.1" fill="currentColor" stroke="none"/><circle cx="14.7" cy="10" r="1.1" fill="currentColor" stroke="none"/>' +
      '<path d="M8.1 16.6a4.5 4.5 0 0 1 7.8 0"/></symbol>' +
    '<symbol id="i-face-angry" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.6"/>' +
      '<path d="M7.6 8.4 10.7 9.9M16.4 8.4 13.3 9.9"/>' +
      '<circle cx="9.6" cy="12.3" r="1.05" fill="currentColor" stroke="none"/><circle cx="14.4" cy="12.3" r="1.05" fill="currentColor" stroke="none"/>' +
      '<path d="M8.3 17a4.5 4.5 0 0 1 7.4 0"/></symbol>' +
    '<symbol id="i-face-fear" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.6"/>' +
      '<circle cx="9.3" cy="9.9" r="1.1" fill="currentColor" stroke="none"/><circle cx="14.7" cy="9.9" r="1.1" fill="currentColor" stroke="none"/>' +
      '<ellipse cx="12" cy="15.7" rx="1.8" ry="2.4"/></symbol>' +
    '<symbol id="i-face-surprise" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.6"/>' +
      '<circle cx="9.3" cy="9.7" r="1.15" fill="currentColor" stroke="none"/><circle cx="14.7" cy="9.7" r="1.15" fill="currentColor" stroke="none"/>' +
      '<circle cx="12" cy="15.5" r="2.3"/></symbol>' +
    '<symbol id="i-face-neutral" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.6"/>' +
      '<circle cx="9.3" cy="10" r="1.1" fill="currentColor" stroke="none"/><circle cx="14.7" cy="10" r="1.1" fill="currentColor" stroke="none"/>' +
      '<path d="M9 15.6h6"/></symbol>' +

    /* ---------- hardware ---------- */
    '<symbol id="i-cpu" viewBox="0 0 24 24"><rect x="6.8" y="6.8" width="10.4" height="10.4" rx="2.6"/>' +
      '<rect x="10.4" y="10.4" width="3.2" height="3.2" rx="1"/>' +
      '<path d="M10 3.6v3.2M14 3.6v3.2M10 17.2v3.2M14 17.2v3.2M3.6 10h3.2M3.6 14h3.2M17.2 10h3.2M17.2 14h3.2"/></symbol>' +
    '<symbol id="i-motor" viewBox="0 0 24 24"><rect x="3.4" y="8.6" width="17.2" height="6.8" rx="2.4"/>' +
      '<path d="M7.6 8.6V5.9M16.4 8.6V5.9M12 15.4v2.7"/><circle cx="7.6" cy="12" r=".95" fill="currentColor" stroke="none"/>' +
      '<circle cx="12" cy="12" r=".95" fill="currentColor" stroke="none"/><circle cx="16.4" cy="12" r=".95" fill="currentColor" stroke="none"/></symbol>' +
    '<symbol id="i-speaker" viewBox="0 0 24 24"><path d="M4 9.6h3.3L12 5.2v13.6L7.3 14.4H4Z"/>' +
      '<path d="M15.4 9.2a4 4 0 0 1 0 5.6M18 6.8a7.4 7.4 0 0 1 0 10.4"/></symbol>' +
    '<symbol id="i-display" viewBox="0 0 24 24"><rect x="3" y="4.6" width="18" height="12.6" rx="2.6"/>' +
      '<path d="M9 20.4h6M12 17.2v3.2"/></symbol>' +
    '<symbol id="i-battery" viewBox="0 0 24 24"><rect x="2.6" y="7.4" width="15.4" height="9.2" rx="2.4"/>' +
      '<path d="M20.4 10.6v2.8M6 10.5v3M9.2 10.5v3M12.4 10.5v3"/></symbol>' +

    /* ---------- applications ---------- */
    '<symbol id="i-graduation" viewBox="0 0 24 24"><path d="M12 4.4 2.8 8.6 12 12.8l9.2-4.2Z"/>' +
      '<path d="M6.4 10.6v4.6c0 1.8 2.5 3.2 5.6 3.2s5.6-1.4 5.6-3.2v-4.6M21.2 8.6v5.6"/></symbol>' +
    '<symbol id="i-users" viewBox="0 0 24 24"><circle cx="9.4" cy="8.6" r="3.4"/>' +
      '<path d="M3.4 19.4a6 6 0 0 1 12 0"/><path d="M16.2 5.7a3.4 3.4 0 0 1 0 6.5M17.4 14.3a6 6 0 0 1 3.2 5.1"/></symbol>' +
    '<symbol id="i-handshake" viewBox="0 0 24 24"><path d="M3.6 8.4 6.8 5.2l5.2 5.2"/>' +
      '<path d="M20.4 8.4l-3.2-3.2-3.2 3.2"/>' +
      '<path d="M3.6 8.4l3.2 3.2 2.4 2.4 1.8-1.8 1.8 1.8 2.4-2.4 3.2-3.2"/>' +
      '<path d="M9.2 14 7.6 15.6M11.6 15.4 10.2 16.8"/></symbol>' +
    '<symbol id="i-chat" viewBox="0 0 24 24"><path d="M20.6 12.2c0 3.8-3.8 6.9-8.6 6.9-1 0-2-.1-2.9-.4l-4.9 1.5 1.4-3.6a6.5 6.5 0 0 1-2.2-4.4c0-3.8 3.8-6.9 8.6-6.9s8.6 3.1 8.6 6.9Z"/>' +
      '<path d="M9 12h.01M12 12h.01M15 12h.01"/></symbol>' +
    '<symbol id="i-school" viewBox="0 0 24 24"><path d="M12 3.4 21 7.6v1.8H3V7.6Z"/>' +
      '<path d="M5.6 9.4v8.2M18.4 9.4v8.2M9.8 9.4v8.2M14.2 9.4v8.2"/><path d="M3 20.6h18"/></symbol>' +
    '<symbol id="i-gamepad" viewBox="0 0 24 24"><path d="M8.4 7.4h7.2a5.4 5.4 0 0 1 5.2 6.8l-.6 2.2a2.2 2.2 0 0 1-3.7.9l-1.5-1.6h-6l-1.5 1.6a2.2 2.2 0 0 1-3.7-.9l-.6-2.2a5.4 5.4 0 0 1 5.2-6.8Z"/>' +
      '<path d="M8 10.9v2.3M6.9 12h2.3"/>' +
      '<circle cx="15" cy="11.5" r=".95" fill="currentColor" stroke="none"/><circle cx="16.9" cy="13.3" r=".95" fill="currentColor" stroke="none"/></symbol>' +

    /* ---------- future directions ---------- */
    '<symbol id="i-mic" viewBox="0 0 24 24"><rect x="9.2" y="2.8" width="5.6" height="10.6" rx="2.8"/>' +
      '<path d="M5.6 11.4a6.4 6.4 0 0 0 12.8 0M12 17.8v3.2M8.6 21h6.8"/></symbol>' +
    '<symbol id="i-hand" viewBox="0 0 24 24"><path d="M8 12.3V6.7a1.7 1.7 0 0 1 3.4 0v5.1"/>' +
      '<path d="M11.4 11.8V5.5a1.7 1.7 0 0 1 3.4 0v6.2"/>' +
      '<path d="M14.8 12V7.6a1.7 1.7 0 0 1 3.4 0v7.1a6.3 6.3 0 0 1-6.3 6.3h-1.1a5 5 0 0 1-5-5v-3.5a1.7 1.7 0 0 1 3.4 0"/></symbol>' +
    '<symbol id="i-eye" viewBox="0 0 24 24"><path d="M2.8 12S6.4 5.9 12 5.9 21.2 12 21.2 12 17.6 18.1 12 18.1 2.8 12 2.8 12Z"/>' +
      '<circle cx="12" cy="12" r="3"/></symbol>' +
    '<symbol id="i-sparkle" viewBox="0 0 24 24"><path d="M10.4 3.4 12 8.2l4.8 1.6L12 11.4l-1.6 4.8-1.6-4.8L4 9.8l4.8-1.6Z"/>' +
      '<path d="M17.8 15.4l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8Z"/></symbol>' +
    '<symbol id="i-globe" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.6"/>' +
      '<path d="M3.4 12h17.2"/>' +
      '<path d="M12 3.4c2.2 2.4 3.3 5.4 3.3 8.6s-1.1 6.2-3.3 8.6c-2.2-2.4-3.3-5.4-3.3-8.6S9.8 5.8 12 3.4Z"/></symbol>' +

    '</svg>';


  function mount() {
    if (document.getElementById('eb-icon-sprite')) return;
    var host = document.createElement('div');
    host.id = 'eb-icons';
    /* Inline styles, because this runs before the stylesheet is parsed —
       without them an unsized <svg> would flash as a 300x150 box. */
    host.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden;pointer-events:none';
    host.innerHTML = SPRITE;
    document.body.insertAdjacentHTML('afterbegin', host.outerHTML);
  }

  if (document.body) mount();
  else document.addEventListener('DOMContentLoaded', mount);
})();

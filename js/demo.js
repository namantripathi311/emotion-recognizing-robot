/* EmotionBot demo controller
 * ------------------------------------------------------------------
 * Drives the simulated expression demo on demo.html.
 *
 * Nothing here is real emotion detection. Each button carries a
 * pre-written estimate, and this script only animates the interface
 * that presents it: the face drawing, the readout, the confidence bar
 * and the robot's suggested reply.
 *
 * The `d` attributes below belong to the SVG in demo.html
 * (viewBox 0 0 200 240).
 */
(function () {
  'use strict';

  var EXPRESSIONS = {
    happy: {
      name: 'Happy',
      confidence: 94,
      mood: '#b98a1f',
      icon: '#i-face-happy',
      eyes: 9,
      leftBrow: 'M54 80q18 -9 38 -4',
      rightBrow: 'M108 76q20 -5 38 4',
      mouth: 'M63 150q37 34 74 0',
      reply: 'Good to see you. Is there anything I can help you with?'
    },
    sad: {
      name: 'Sad',
      confidence: 78,
      mood: '#4b7a6e',
      icon: '#i-face-sad',
      eyes: 8.5,
      leftBrow: 'M54 74q18 9 38 7',
      rightBrow: 'M108 81q20 -2 38 -7',
      mouth: 'M66 172q34 -22 68 0',
      reply: 'You seem quiet today. I am here if you would like to talk.'
    },
    angry: {
      name: 'Angry',
      confidence: 71,
      mood: '#a34a33',
      icon: '#i-face-angry',
      eyes: 8.5,
      leftBrow: 'M54 72L92 87',
      rightBrow: 'M108 87L146 72',
      mouth: 'M68 172q32 -14 64 0',
      reply: 'You look frustrated. I will give you some space.'
    },
    fear: {
      name: 'Fear',
      confidence: 64,
      mood: '#7d6a52',
      icon: '#i-face-fear',
      eyes: 11,
      leftBrow: 'M54 68q18 -7 38 -3',
      rightBrow: 'M108 65q20 -4 38 3',
      mouth: 'M76 164q24 20 48 0',
      reply: 'You look uneasy. Nothing here is dangerous — take your time.'
    },
    surprise: {
      name: 'Surprise',
      confidence: 83,
      mood: '#c2704b',
      icon: '#i-face-surprise',
      eyes: 12,
      leftBrow: 'M54 64q18 -8 38 -4',
      rightBrow: 'M108 60q20 -4 38 4',
      mouth: 'M88 166a12 12 0 1 0 24 0a12 12 0 1 0 -24 0',
      reply: 'That was unexpected! Shall I explain it again?'
    },
    neutral: {
      name: 'Neutral',
      confidence: 58,
      mood: '#6b7268',
      icon: '#i-face-neutral',
      eyes: 9,
      leftBrow: 'M54 80h38',
      rightBrow: 'M108 80h38',
      mouth: 'M74 164h52',
      reply: 'Hello. How are you feeling today?'
    }
  };

  var buttons = Array.prototype.slice.call(document.querySelectorAll('[data-expression]'));
  if (!buttons.length) return;

  var layout = document.getElementById('demoLayout');
  var stage = document.getElementById('demoStage');
  var readoutIcon = document.getElementById('readoutIcon');
  var readoutName = document.getElementById('readoutName');
  var confidenceValue = document.getElementById('confidenceValue');
  var confidenceBar = document.getElementById('confidenceBar');
  var responseText = document.getElementById('responseText');
  var liveRegion = document.getElementById('demoStatus');
  var leftBrow = document.getElementById('demoBrowLeft');
  var rightBrow = document.getElementById('demoBrowRight');
  var mouth = document.getElementById('demoMouth');
  var eyes = document.querySelectorAll('.face-svg .eye');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function setIcon(useElement, ref) {
    if (!useElement) return;
    useElement.setAttribute('href', ref);
    useElement.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', ref);
  }

  function drawFace(face) {
    if (leftBrow) leftBrow.setAttribute('d', face.leftBrow);
    if (rightBrow) rightBrow.setAttribute('d', face.rightBrow);
    if (mouth) mouth.setAttribute('d', face.mouth);
    Array.prototype.forEach.call(eyes, function (eye) {
      eye.setAttribute('r', String(face.eyes));
    });
  }

  function showReadout(face) {
    if (readoutName) readoutName.textContent = face.name;
    if (confidenceValue) confidenceValue.textContent = face.confidence + '%';
    if (confidenceBar) confidenceBar.style.width = face.confidence + '%';
    if (readoutIcon) setIcon(readoutIcon, face.icon);
  }

  function showReply(text) {
    if (!responseText) return;
    if (reduceMotion) {
      responseText.textContent = text;
      return;
    }
    responseText.textContent = text;
    if (typeof responseText.animate === 'function') {
      responseText.animate(
        [{ opacity: 0, transform: 'translateY(6px)' }, { opacity: 1, transform: 'translateY(0)' }],
        { duration: 320, easing: 'cubic-bezier(.22,.61,.36,1)' }
      );
    }
  }

  /* One custom property on the layout is enough: the face drawing, the
     readout tile, the confidence bar and the reply accent all inherit it. */
  function paintMood(colour) {
    var target = layout || stage;
    if (target) target.style.setProperty('--mood', colour);
    else if (confidenceBar) confidenceBar.style.setProperty('--mood', colour);
  }

  function select(key, button) {
    var face = EXPRESSIONS[key];
    if (!face) return;

    buttons.forEach(function (other) {
      other.setAttribute('aria-pressed', String(other === button));
    });

    paintMood(face.mood);
    drawFace(face);
    showReadout(face);
    showReply(face.reply);

    if (liveRegion) {
      liveRegion.textContent = 'Estimated expression: ' + face.name + ', ' + face.confidence + ' percent confidence.';
    }
  }

  buttons.forEach(function (button) {
    button.addEventListener('click', function () {
      select(button.getAttribute('data-expression'), button);
    });
  });

  /* Sync the interface with whichever button the markup marked as pressed. */
  var initial = buttons.filter(function (button) {
    return button.getAttribute('aria-pressed') === 'true';
  })[0] || buttons[0];

  select(initial.getAttribute('data-expression'), initial);
})();

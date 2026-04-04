// === Custom Audio Player Logic ===
document.addEventListener('DOMContentLoaded', function() {
  const audioElem = document.getElementById('audioElem');
  const playPauseBtn = document.getElementById('playPauseBtn');
  const playIcon = document.getElementById('playIcon');
  const pauseIcon = document.getElementById('pauseIcon');
  const audioSeek = document.getElementById('audioSeek');
  const audioTime = document.getElementById('audioTime');
  if (!audioElem) return;

  function formatTime(sec) {
    sec = Math.floor(sec);
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  }

  function updateSeek() {
    audioSeek.value = audioElem.currentTime;
    audioTime.textContent = `${formatTime(audioElem.currentTime)} / ${formatTime(audioElem.duration)}`;
  }

  playPauseBtn.addEventListener('click', function() {
    if (audioElem.paused) {
      audioElem.play();
    } else {
      audioElem.pause();
    }
  });

  audioElem.addEventListener('play', function() {
    playIcon.style.display = 'none';
    pauseIcon.style.display = '';
  });
  audioElem.addEventListener('pause', function() {
    playIcon.style.display = '';
    pauseIcon.style.display = 'none';
  });

  audioElem.addEventListener('loadedmetadata', function() {
    audioSeek.max = Math.floor(audioElem.duration);
    updateSeek();
  });
  audioElem.addEventListener('timeupdate', updateSeek);

  audioSeek.addEventListener('input', function() {
    audioElem.currentTime = audioSeek.value;
    updateSeek();
  });

  audioElem.addEventListener('ended', function() {
    playIcon.style.display = '';
    pauseIcon.style.display = 'none';
    audioElem.currentTime = 0;
    updateSeek();
  });
});
/* ================================================
   DHINA J PORTFOLIO — script.js
   No custom cursor | Static avatar | Laptop parallax
   ================================================ */

/* ── NAVBAR SCROLL ──────────────────────────────── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 70);
  highlightNav();
}, { passive: true });

/* ── ACTIVE NAV HIGHLIGHT ───────────────────────── */
function highlightNav() {
  const sections = document.querySelectorAll('section[id], div[id]');
  const links    = document.querySelectorAll('.nav-link');
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 130) current = s.id;
  });
  links.forEach(l => {
    l.classList.remove('active');
    if (l.getAttribute('href') === '#' + current) l.classList.add('active');
  });
}

/* ── MOBILE DRAWER ──────────────────────────────── */
const hamburger  = document.getElementById('hamburger');
const mobDrawer  = document.getElementById('mobDrawer');
const mobOverlay = document.getElementById('mobOverlay');

function openDrawer()  { mobDrawer.classList.add('open'); mobOverlay.classList.add('show'); hamburger.classList.add('open'); }
function closeDrawer() { mobDrawer.classList.remove('open'); mobOverlay.classList.remove('show'); hamburger.classList.remove('open'); }

hamburger.addEventListener('click', () => {
  mobDrawer.classList.contains('open') ? closeDrawer() : openDrawer();
});
mobOverlay.addEventListener('click', closeDrawer);
document.querySelectorAll('.mob-link').forEach(l => l.addEventListener('click', closeDrawer));

/* ── SMOOTH SCROLL ──────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ── TYPING ANIMATION ───────────────────────────── */
const phrases = [
  'Frontend Developer 💻',
  'UI/UX Designer 🎨',
  'React Enthusiast ⚛️',
  'Python Developer 🐍',
  'Creative Thinker ✨',
];
let pi = 0, ci = 0, deleting = false;
const typedEl = document.getElementById('typedText');

function typeLoop() {
  const phrase = phrases[pi];
  if (!deleting) {
    typedEl.textContent = phrase.slice(0, ci + 1);
    ci++;
    if (ci === phrase.length) { deleting = true; setTimeout(typeLoop, 1900); return; }
    setTimeout(typeLoop, 85);
  } else {
    typedEl.textContent = phrase.slice(0, ci - 1);
    ci--;
    if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; }
    setTimeout(typeLoop, 48);
  }
}
typeLoop();

/* ── COUNTER ANIMATION ──────────────────────────── */
function countUp(el, target) {
  let n = 0;
  const step = Math.ceil(target / 35);
  const t = setInterval(() => {
    n = Math.min(n + step, target);
    const suf = el.dataset.target > 1 ? '+' : '';
    el.textContent = n + suf;
    if (n >= target) clearInterval(t);
  }, 45);
}
const statsObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.hs-num').forEach(el => {
        countUp(el, parseInt(el.dataset.target));
      });
      statsObs.unobserve(entry.target);
    }
  });
}, { threshold: .5 });
const statsRow = document.querySelector('.hero-stats');
if (statsRow) statsObs.observe(statsRow);

/* ── SCROLL REVEAL ──────────────────────────────── */
const revObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: .1 });
document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(el => revObs.observe(el));

/* Stagger children in grids */
document.querySelectorAll('.proj-grid, .certs-grid, .skills-chips, .info-grid').forEach(grid => {
  Array.from(grid.children).forEach((child, i) => {
    child.style.transitionDelay = `${i * 0.07}s`;
  });
  const o = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        Array.from(e.target.children).forEach(c => c.classList.add('visible'));
        o.unobserve(e.target);
      }
    });
  }, { threshold: .08 });
  o.observe(grid);
});

/* ── CERT BAR ANIMATION ─────────────────────────── */
const certObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); certObs.unobserve(e.target); }
  });
}, { threshold: .25 });
document.querySelectorAll('.ccard').forEach(c => certObs.observe(c));

/* ── PROJECT CARD GLOW ──────────────────────────── */
document.querySelectorAll('.pcard, .ccard').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width  * 100).toFixed(1);
    const y = ((e.clientY - r.top)  / r.height * 100).toFixed(1);
    card.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(255,107,53,0.07) 0%, var(--card) 55%)`;
  });
  card.addEventListener('mouseleave', () => { card.style.background = ''; });
});

/* ── LAPTOP KEYBOARD BUILDER ────────────────────── */
function buildKbd() {
  const rows = [
    'QWERTYUIOP'.split(''),
    'ASDFGHJKL'.split(''),
    'ZXCVBNM'.split(''),
  ];
  rows.forEach((row, i) => {
    const rowEl = document.querySelectorAll('.lp-kbd')[0];
    if (!rowEl) return;
    const div = document.createElement('div');
    div.style.cssText = 'display:flex;gap:3px;justify-content:center;margin-bottom:3px;';
    row.forEach(k => {
      const key = document.createElement('span');
      key.textContent = k;
      key.style.cssText = `
        display:inline-flex; align-items:center; justify-content:center;
        width:26px; height:20px; background:rgba(255,255,255,0.04);
        border:1px solid rgba(255,255,255,0.06); border-radius:3px;
        font-size:0.45rem; color:rgba(255,255,255,0.22);
        font-family:'Fira Code',monospace; transition:all 0.1s;
      `;
      div.appendChild(key);
    });
    rowEl.appendChild(div);
  });
  // Spacebar
  const sp = document.createElement('div');
  sp.style.cssText = 'width:40%;height:12px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.06);border-radius:3px;margin:2px auto 0;';
  document.querySelectorAll('.lp-kbd')[0]?.appendChild(sp);

  // Random key glow every 130ms
  setInterval(() => {
    const allKeys = document.querySelectorAll('.lp-kbd span');
    if (!allKeys.length) return;
    const k = allKeys[Math.floor(Math.random() * allKeys.length)];
    k.style.background    = 'rgba(255,107,53,0.28)';
    k.style.borderColor   = 'rgba(255,107,53,0.45)';
    k.style.color         = 'rgba(255,107,53,0.9)';
    setTimeout(() => {
      k.style.background  = 'rgba(255,255,255,0.04)';
      k.style.borderColor = 'rgba(255,255,255,0.06)';
      k.style.color       = 'rgba(255,255,255,0.22)';
    }, 180);
  }, 130);
}
buildKbd();

/* ── LAPTOP PARALLAX (MAIN EFFECT) ─────────────────
   As user scrolls INTO the section:
   - Laptop rises up  (translateY: 80px → 0px)
   - Lid angle tilts  (rotateX: 30deg → 0deg → subtle -3deg)
   - Glow intensifies
   - Tech chips fade in
   ─────────────────────────────────────────────────── */
const lpSection = document.getElementById('lpSection');
const lpLaptop  = document.getElementById('lpLaptop');

let lpCurrent = 0;   // current interpolated progress (0–1)
let lpTarget  = 0;   // target progress from scroll

function getLpProgress() {
  if (!lpSection) return 0;
  const rect   = lpSection.getBoundingClientRect();
  const viewH  = window.innerHeight;
  // 0 when section bottom is at viewport bottom, 1 when section top is above centre
  const raw = 1 - (rect.top + rect.height * .5) / (viewH + rect.height * .5);
  return Math.max(0, Math.min(1, raw));
}

function applyLaptopTransform(progress) {
  if (!lpLaptop) return;

  // Tilt: starts at 30deg, drops to 0, then barely tips back to -2deg
  const tiltX = progress < 0.7
    ? 30 - (progress / 0.7) * 32          // 30 → -2 during first 70%
    : -2 + ((progress - 0.7) / 0.3) * 2;  // -2 → 0 during last 30%

  // Rise: drops from 80px → 0
  const transY = Math.max(0, 80 - progress * 110);

  // Scale: slight grow from 0.92 → 1.02
  const scale = 0.92 + progress * 0.12;

  lpLaptop.style.transform =
    `perspective(900px) rotateX(${tiltX.toFixed(2)}deg) translateY(${transY.toFixed(1)}px) scale(${scale.toFixed(3)})`;

  // Glow intensity
  const glowAlpha = 0.05 + progress * 0.35;
  const glowSize  = 30  + progress * 80;
  lpLaptop.style.filter = `drop-shadow(0 0 ${glowSize.toFixed(0)}px rgba(123,47,255,${glowAlpha.toFixed(2)}))`;

  // Tech chips appear progressively
  document.querySelectorAll('.lp-chip').forEach((chip, i) => {
    const threshold = 0.2 + i * 0.1;
    chip.classList.toggle('vis', progress > threshold);
  });
}

function laptopRAF() {
  // Get scroll-driven target
  lpTarget = getLpProgress();

  // Smooth interpolation
  lpCurrent += (lpTarget - lpCurrent) * 0.06;

  applyLaptopTransform(lpCurrent);
  requestAnimationFrame(laptopRAF);
}
laptopRAF();

/* Additional: tilt laptop based on horizontal mouse position while in section */
document.addEventListener('mousemove', e => {
  if (!lpSection || !lpLaptop) return;
  const rect = lpSection.getBoundingClientRect();
  if (rect.top < window.innerHeight && rect.bottom > 0) {
    // Already handled by main RAFloop for vertical;
    // Add a tiny horizontal wobble:
    const hFactor = ((e.clientX / window.innerWidth) - 0.5) * 8; // -4 to +4 deg
    const current = lpLaptop.style.transform || '';
    // We inject rotateY into existing transform via dataset
    lpLaptop.dataset.ry = hFactor.toFixed(2);
  }
});

// Override RAF to also include rotateY
(function overrideRAF() {
  function tick() {
    lpTarget  = getLpProgress();
    lpCurrent += (lpTarget - lpCurrent) * 0.06;

    if (!lpLaptop) { requestAnimationFrame(tick); return; }

    const progress = lpCurrent;
    const tiltX = progress < 0.7
      ? 30 - (progress / 0.7) * 32
      : -2 + ((progress - 0.7) / 0.3) * 2;
    const transY = Math.max(0, 80 - progress * 110);
    const scale  = 0.92 + progress * 0.12;
    const rotY   = parseFloat(lpLaptop.dataset.ry || 0);

    lpLaptop.style.transform =
      `perspective(900px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${(rotY * .5).toFixed(2)}deg) translateY(${transY.toFixed(1)}px) scale(${scale.toFixed(3)})`;

    const glowAlpha = 0.05 + progress * 0.35;
    const glowSize  = 30  + progress * 80;
    lpLaptop.style.filter = `drop-shadow(0 0 ${glowSize.toFixed(0)}px rgba(123,47,255,${glowAlpha.toFixed(2)}))`;

    document.querySelectorAll('.lp-chip').forEach((chip, i) => {
      chip.classList.toggle('vis', progress > 0.2 + i * 0.1);
    });

    requestAnimationFrame(tick);
  }
  tick();
})();

/* ── HERO HEADING ENTRANCE ──────────────────────── */
document.querySelectorAll('.hero-h1 .hl').forEach((line, i) => {
  line.style.cssText = `opacity:0; transform:translateY(28px);
    transition:opacity .7s ${0.1 + i * 0.12}s ease, transform .7s ${0.1 + i * 0.12}s ease;`;
  setTimeout(() => {
    line.style.opacity   = '1';
    line.style.transform = 'none';
  }, 80);
});

/* ── CONTACT FORM ───────────────────────────────── */
const cForm = document.getElementById('contactForm');
if (cForm) {
  cForm.addEventListener('submit', e => {
    e.preventDefault();
    const btn = cForm.querySelector('button[type="submit"]');
    const orig = btn.textContent;
    btn.disabled = true;
    btn.textContent = 'Sending...';

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(new FormData(cForm)).toString(),
    })
      .then(response => {
        if (response.ok) {
          btn.textContent = '✅ Message Sent!';
          btn.style.background = 'linear-gradient(135deg,#00c851,#007e33)';
          cForm.reset();
        } else {
          btn.textContent = '❌ Submission Failed';
          btn.style.background = 'linear-gradient(135deg,#d32f2f,#b71c1c)';
        }
      })
      .catch(() => {
        btn.textContent = '❌ Submission Error';
        btn.style.background = 'linear-gradient(135deg,#d32f2f,#b71c1c)';
      })
      .finally(() => {
        setTimeout(() => {
          btn.textContent = orig;
          btn.style.background = '';
          btn.disabled = false;
        }, 3000);
      });
  });
}

console.log('%c✨ Dhina J — Portfolio Loaded', 'color:#ff6b35;font-size:1.1rem;font-weight:bold;');

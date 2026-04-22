/* =============================================
   PORTFOLIO SCRIPT.JS
   - Custom cursor
   - Scroll-reveal
   - Typed text effect
   - Active nav link on scroll
   - Mobile nav toggle
   - Header scroll effect
   - Smooth animations
============================================= */

document.addEventListener('DOMContentLoaded', () => {

  // ─── CUSTOM CURSOR ─────────────────────────
  const cursor = document.createElement('div');
  cursor.classList.add('cursor');
  document.body.appendChild(cursor);

  const cursorLarge = document.createElement('div');
  cursorLarge.classList.add('cursor', 'cursor--large');
  document.body.appendChild(cursorLarge);

  let mouseX = 0, mouseY = 0;
  let largeX = 0, largeY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top  = mouseY + 'px';
  });

  // Lag the large cursor
  function animateLargeCursor() {
    largeX += (mouseX - largeX) * 0.1;
    largeY += (mouseY - largeY) * 0.1;
    cursorLarge.style.left = largeX + 'px';
    cursorLarge.style.top  = largeY + 'px';
    requestAnimationFrame(animateLargeCursor);
  }
  animateLargeCursor();

  // Grow cursor on hoverable elements
  const hoverEls = document.querySelectorAll('a, button, .skill__pill, .project__card, .cert__card');
  hoverEls.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'translate(-50%,-50%) scale(2)';
      cursorLarge.style.transform = 'translate(-50%,-50%) scale(1.4)';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = 'translate(-50%,-50%) scale(1)';
      cursorLarge.style.transform = 'translate(-50%,-50%) scale(1)';
    });
  });

  // ─── MOBILE NAV TOGGLE ─────────────────────
  const navToggle = document.getElementById('navToggle');
  const navList   = document.getElementById('navList');

  if (navToggle && navList) {
    navToggle.addEventListener('click', () => {
      const isOpen = navList.classList.toggle('open');
      navToggle.innerHTML = isOpen
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';
    });

    // Close nav on link click
    navList.querySelectorAll('.nav__link').forEach(link => {
      link.addEventListener('click', () => {
        navList.classList.remove('open');
        navToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
      });
    });
  }

  // ─── HEADER SCROLL EFFECT ──────────────────
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
    updateActiveNav();
  });

  // ─── ACTIVE NAV ON SCROLL ──────────────────
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav__link');

  function updateActiveNav() {
    const scrollPos = window.scrollY + 100;
    sections.forEach(section => {
      const top    = section.offsetTop;
      const height = section.offsetHeight;
      const id     = section.getAttribute('id');
      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(l => l.classList.remove('active'));
        document.querySelector(`.nav__link[href="#${id}"]`)?.classList.add('active');
      }
    });
  }

  // ─── SCROLL REVEAL ─────────────────────────
  const reveals = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger children with delay
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, 80);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  reveals.forEach((el, i) => {
    el.style.transitionDelay = (i % 4) * 0.08 + 's';
    revealObserver.observe(el);
  });

  // ─── TYPED TEXT EFFECT ─────────────────────
  const typedEl   = document.querySelector('.typed-text');
  const cursorEl  = document.querySelector('.home__title .cursor');
  const phrases   = [
    'Frontend Developer',
    'UI/UX Designer',
  ];
  let phraseIdx   = 0;
  let charIdx     = 0;
  let isDeleting  = false;
  let typingDelay = 120;

  if (cursorEl) cursorEl.classList.add('cursor-blink');

  function type() {
    if (!typedEl) return;
    const current = phrases[phraseIdx];

    if (!isDeleting) {
      typedEl.textContent = current.substring(0, charIdx + 1);
      charIdx++;
      typingDelay = 100;
      if (charIdx === current.length) {
        isDeleting = true;
        typingDelay = 1800; // pause at full word
      }
    } else {
      typedEl.textContent = current.substring(0, charIdx - 1);
      charIdx--;
      typingDelay = 55;
      if (charIdx === 0) {
        isDeleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        typingDelay = 400;
      }
    }
    setTimeout(type, typingDelay);
  }
  setTimeout(type, 800);

  // ─── SKILL PILL STAGGER ────────────────────
  const pills = document.querySelectorAll('.skill__pill');
  pills.forEach((pill, i) => {
    pill.style.transitionDelay = i * 0.05 + 's';
  });

  // ─── BACK TO TOP SMOOTH ────────────────────
  document.querySelectorAll('[href="#home"]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  // ─── PROJECT CARD MOUSE GLOW ───────────────
  const projectCards = document.querySelectorAll('.project__card');
  projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect  = card.getBoundingClientRect();
      const glow  = card.querySelector('.project__card-glow');
      if (!glow) return;
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      glow.style.left = x - 100 + 'px';
      glow.style.top  = y - 100 + 'px';
    });
  });

  // ─── PARTICLE BACKGROUND (home section) ────
  const homeSection = document.querySelector('.home');
  if (homeSection) {
    for (let i = 0; i < 18; i++) {
      const dot = document.createElement('div');
      dot.style.cssText = `
        position:absolute;
        width:${Math.random() * 6 + 3}px;
        height:${Math.random() * 6 + 3}px;
        border-radius:50%;
        background:${Math.random() > 0.5 ? 'rgba(134,210,226,0.35)' : 'rgba(255,180,192,0.35)'};
        left:${Math.random() * 100}%;
        top:${Math.random() * 100}%;
        animation:floatDot ${Math.random() * 6 + 5}s ease-in-out ${Math.random() * 4}s infinite;
        pointer-events:none;
        z-index:0;
      `;
      homeSection.appendChild(dot);
    }

    // Add keyframe dynamically
    const style = document.createElement('style');
    style.textContent = `
      @keyframes floatDot {
        0%,100% { transform:translateY(0) translateX(0); opacity:0.6; }
        33%      { transform:translateY(-18px) translateX(10px); opacity:1; }
        66%      { transform:translateY(8px) translateX(-8px); opacity:0.4; }
      }
    `;
    document.head.appendChild(style);
  }

  // ─── SECTION COUNTERS / numbers animation ──
  // (Add later if needed for stats section)

  console.log('%c✨ Portfolio loaded successfully!', 'color:#86D2E2;font-size:14px;font-weight:bold;');
});

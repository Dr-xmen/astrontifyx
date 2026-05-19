// AtrontifyX — landing page

// ── NAV scroll effect ──────────────────────────────────────────────
const header = document.getElementById('site-header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// ── Mobile menu ────────────────────────────────────────────────────
const mobToggle = document.getElementById('mobToggle');
const mobDrawer = document.getElementById('mobDrawer');
mobToggle.addEventListener('click', () => {
  const open = mobDrawer.style.display === 'block';
  mobDrawer.style.display = open ? 'none' : 'block';
  mobToggle.classList.toggle('open', !open);
});
mobDrawer.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    mobDrawer.style.display = 'none';
    mobToggle.classList.remove('open');
  });
});

// ── Scroll reveal ──────────────────────────────────────────────────
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const delay = parseInt(el.dataset.delay || 0);
    setTimeout(() => el.classList.add('revealed'), delay);
    revealObs.unobserve(el);
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('[data-reveal]').forEach(el => revealObs.observe(el));

// ── Stat counters ──────────────────────────────────────────────────
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const duration = 1800;
  const start = performance.now();
  function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 4);
    el.textContent = Math.floor(ease * target).toLocaleString();
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target.toLocaleString();
  }
  requestAnimationFrame(step);
}

const counterObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const delay = parseInt(el.closest('[data-delay]')?.dataset.delay || 0);
    setTimeout(() => animateCounter(el), delay);
    counterObs.unobserve(el);
  });
}, { threshold: 0.5 });

document.querySelectorAll('.counter').forEach(el => counterObs.observe(el));

// ── Reviews slider ─────────────────────────────────────────────────
const revWrap = document.querySelector('.reviews-track-wrap');
const revTrack = document.querySelector('.reviews-track');
if (revWrap && revTrack) {
  let isDragging = false, startX = 0, startScroll = 0;

  // Auto-scroll via rAF — infinite loop using the duplicated card set
  (function autoScroll() {
    if (!isDragging) {
      revWrap.scrollLeft += 0.6;
      if (revWrap.scrollLeft >= revTrack.scrollWidth / 2) revWrap.scrollLeft = 0;
    }
    requestAnimationFrame(autoScroll);
  })();

  // Mouse drag
  revWrap.addEventListener('mousedown', e => {
    isDragging = true;
    revWrap.classList.add('is-grabbing');
    startX = e.pageX;
    startScroll = revWrap.scrollLeft;
    e.preventDefault();
  });
  window.addEventListener('mouseup', () => {
    isDragging = false;
    revWrap.classList.remove('is-grabbing');
  });
  window.addEventListener('mousemove', e => {
    if (!isDragging) return;
    revWrap.scrollLeft = startScroll - (e.pageX - startX);
  });

  // Touch drag
  revWrap.addEventListener('touchstart', e => {
    startX = e.touches[0].pageX;
    startScroll = revWrap.scrollLeft;
    isDragging = true;
  }, { passive: true });
  revWrap.addEventListener('touchmove', e => {
    if (!isDragging) return;
    revWrap.scrollLeft = startScroll - (e.touches[0].pageX - startX);
  }, { passive: true });
  revWrap.addEventListener('touchend', () => { isDragging = false; });
}

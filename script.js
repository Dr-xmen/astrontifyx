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

// ── Market tabs ────────────────────────────────────────────────────
document.getElementById('mktTabs').addEventListener('click', e => {
  const btn = e.target.closest('.mkt-tab');
  if (!btn) return;
  const panel = btn.dataset.panel;
  document.querySelectorAll('.mkt-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.mkt-panel').forEach(p => p.classList.remove('active'));
  btn.classList.add('active');
  const el = document.getElementById('panel-' + panel);
  if (el) el.classList.add('active');
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

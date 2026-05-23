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

function toggleMobAcc(btn) {
  const sub = btn.nextElementSibling;
  const isOpen = sub.classList.contains('open');
  document.querySelectorAll('.mob-acc-sub.open').forEach(s => s.classList.remove('open'));
  document.querySelectorAll('.mob-acc-btn.open').forEach(b => b.classList.remove('open'));
  if (!isOpen) {
    sub.classList.add('open');
    btn.classList.add('open');
  }
}

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

// ── Live ticker (TradingView scanner) ─────────────────────────────
const TICKER_SYMS = [
  {tv:'FX_IDC:EURUSD',   label:'EUR/USD',  dp:5},
  {tv:'FX_IDC:GBPUSD',   label:'GBP/USD',  dp:5},
  {tv:'OANDA:XAUUSD',    label:'XAU/USD',  dp:2},
  {tv:'BITSTAMP:BTCUSD', label:'BTC/USD',  dp:2},
  {tv:'FX_IDC:USDJPY',   label:'USD/JPY',  dp:3},
  {tv:'BITSTAMP:ETHUSD', label:'ETH/USD',  dp:2},
  {tv:'FOREXCOM:SPXUSD', label:'S&P 500',  dp:2},
  {tv:'FOREXCOM:NSXUSD', label:'NASDAQ',   dp:2},
  {tv:'TVC:USOIL',       label:'WTI Oil',  dp:2},
  {tv:'FX_IDC:AUDUSD',   label:'AUD/USD',  dp:5},
  {tv:'NASDAQ:NVDA',     label:'NVDA',     dp:2},
  {tv:'OANDA:XAGUSD',    label:'XAG/USD',  dp:3},
];

async function buildTicker() {
  try {
    const res = await fetch('https://scanner.tradingview.com/global/scan', {
      method:'POST',
      headers:{'Content-Type':'text/plain'},
      body:JSON.stringify({
        symbols:{tickers:TICKER_SYMS.map(s=>s.tv)},
        columns:['close','change_percent','open']
      })
    });
    if (!res.ok) return;
    const {data=[]} = await res.json();
    const items = data.map((item, i) => {
      const sym = TICKER_SYMS[i];
      if (!item.d || item.d[0]==null) return '';
      const price = item.d[0];
      let chg = item.d[1];
      const open = item.d[2];
      if (chg == null && open != null && open !== 0) chg = ((price - open) / open) * 100;
      chg = chg ?? 0;
      const up = chg >= 0;
      const priceStr = price >= 1000
        ? price.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2})
        : price.toFixed(sym.dp);
      const chgStr = (up?'+':'') + chg.toFixed(2)+'%';
      return `<div class="tk-item"><span class="tk-name">${sym.label}</span><span class="tk-price">${priceStr}</span><span class="tk-chg ${up?'up':'dn'}">${chgStr}</span></div>`;
    }).join('');
    const track = document.getElementById('tickerTrack');
    if (!track || !items) return;
    track.innerHTML = items + items;
    track.classList.add('running');
  } catch(_) {}
}
buildTicker();
setInterval(buildTicker, 60000);

// ── Hero card live prices (TradingView scanner) ────────────────────
const HERO_PAIRS = [
  { id: 'hp-0', tv: 'FX_IDC:EURUSD',   label: 'EUR/USD', dp: 5 },
  { id: 'hp-1', tv: 'OANDA:XAUUSD',    label: 'XAU/USD', dp: 2 },
  { id: 'hp-2', tv: 'FX_IDC:USDJPY',   label: 'USD/JPY', dp: 3 },
  { id: 'hp-3', tv: 'BITSTAMP:BTCUSD', label: 'BTC/USD', dp: 2 }
];

async function fetchHeroPrices() {
  try {
    const res = await fetch('https://scanner.tradingview.com/global/scan', {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify({
        symbols: { tickers: HERO_PAIRS.map(p => p.tv) },
        columns: ['close', 'change_percent', 'open']
      })
    });
    if (!res.ok) return;
    const json = await res.json();
    const results = json?.data || [];

    results.forEach((item, i) => {
      const cfg = HERO_PAIRS[i];
      const card = document.getElementById(cfg.id);
      if (!card || !item.d) return;

      const price = item.d[0];
      let chg     = item.d[1];
      const open  = item.d[2];
      if (price == null) return;
      if (chg == null && open != null && open !== 0) chg = ((price - open) / open) * 100;
      chg = chg ?? 0;
      const up = chg >= 0;
      const priceStr = price >= 1000
        ? price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
        : price.toFixed(cfg.dp);
      const chgStr = (up ? '+' : '') + chg.toFixed(2) + '%';

      card.querySelector('b').textContent = priceStr;
      const em = card.querySelector('em');
      em.textContent = chgStr;
      em.style.color = up ? 'var(--green)' : 'var(--red)';
      card.className = 'hpc-pair ' + (up ? 'up' : 'dn');

      if (i === 0) {
        const mainPrice = document.getElementById('hpc-main-price');
        const mainChg   = document.getElementById('hpc-main-chg');
        if (mainPrice) mainPrice.firstChild.textContent = priceStr + ' ';
        if (mainChg) {
          mainChg.textContent = chgStr;
          mainChg.className = up ? 'hpc-up' : 'hpc-dn';
        }
      }
    });
  } catch (_) {}
}

fetchHeroPrices();
setInterval(fetchHeroPrices, 30000);

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

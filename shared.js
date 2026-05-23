// AtrontifyX — shared utilities used by all dashboard pages

// ── DATA ─────────────────────────────────────────────────────────────
const COINS = [
  {sym:'BTC',name:'Bitcoin',price:67234.50,chg:2.14,icon:'₿',col:'#f7931a'},
  {sym:'ETH',name:'Ethereum',price:3421.80,chg:1.87,icon:'Ξ',col:'#627eea'},
  {sym:'USDT',name:'Tether',price:1.0001,chg:0.01,icon:'₮',col:'#26a17b'},
  {sym:'BNB',name:'BNB',price:412.30,chg:-0.85,icon:'B',col:'#f3ba2f'},
  {sym:'SOL',name:'Solana',price:184.72,chg:4.21,icon:'◎',col:'#9945ff'},
  {sym:'XRP',name:'Ripple',price:0.5821,chg:-1.12,icon:'✕',col:'#0085c0'},
  {sym:'DOGE',name:'Dogecoin',price:0.1432,chg:3.45,icon:'Ð',col:'#c2a633'},
  {sym:'TRX',name:'TRON',price:0.1248,chg:0.92,icon:'T',col:'#ef0027'},
  {sym:'LTC',name:'Litecoin',price:82.50,chg:-0.34,icon:'Ł',col:'#bfbbbb'},
  {sym:'TON',name:'Toncoin',price:7.21,chg:2.88,icon:'◇',col:'#0098ea'},
];
const FOREX = [
  {pair:'EUR/USD',bid:'1.0834',ask:'1.0836',spread:'1.8',chg:-0.21,vol:'2.4B'},
  {pair:'GBP/USD',bid:'1.2701',ask:'1.2703',spread:'1.8',chg:0.09,vol:'1.8B'},
  {pair:'USD/JPY',bid:'149.82',ask:'149.84',spread:'2.0',chg:0.31,vol:'3.1B'},
  {pair:'USD/CHF',bid:'0.9012',ask:'0.9014',spread:'1.8',chg:-0.14,vol:'0.9B'},
  {pair:'AUD/USD',bid:'0.6542',ask:'0.6544',spread:'2.1',chg:0.28,vol:'0.7B'},
  {pair:'USD/CAD',bid:'1.3685',ask:'1.3687',spread:'2.2',chg:-0.08,vol:'0.8B'},
  {pair:'NZD/USD',bid:'0.6031',ask:'0.6033',spread:'2.4',chg:0.17,vol:'0.3B'},
  {pair:'EUR/GBP',bid:'0.8527',ask:'0.8529',spread:'2.4',chg:-0.31,vol:'0.6B'},
];
const STOCKS = [
  {sym:'AAPL',name:'Apple Inc.',price:184.32,chg:-0.68,vol:'54.2M'},
  {sym:'MSFT',name:'Microsoft',price:378.90,chg:1.24,vol:'22.1M'},
  {sym:'NVDA',name:'NVIDIA',price:875.40,chg:3.17,vol:'42.8M'},
  {sym:'TSLA',name:'Tesla',price:248.50,chg:-1.82,vol:'89.4M'},
  {sym:'AMZN',name:'Amazon',price:182.70,chg:0.95,vol:'31.5M'},
  {sym:'META',name:'Meta',price:504.80,chg:2.14,vol:'18.3M'},
];

// ── SVG CONSTANTS ─────────────────────────────────────────────────────
const svgTrend = `<svg viewBox="0 0 24 24"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>`;
const svgFire  = `<svg viewBox="0 0 24 24"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>`;
const svgDl    = `<svg viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`;
const svgCopy  = `<svg viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`;
const svgWarn  = `<svg viewBox="0 0 24 24"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`;
const svgCheck = `<svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>`;
const svgBolt  = `<svg viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`;

// ── HELPERS ───────────────────────────────────────────────────────────
function badge(label, cls) { return `<span class="badge ${cls}">${label}</span>`; }
function statIcon(svg, bg, color) { return `<div class="stat-icon" style="background:${bg};color:${color}">${svg}</div>`; }
function toast(msg) { console.log('[Toast]', msg); }

function setAvatar(el, avatarUrl, initials) {
  if (!el) return;
  if (avatarUrl) {
    el.innerHTML = `<img src="${avatarUrl}" style="width:100%;height:100%;object-fit:cover;border-radius:50%" onerror="this.textContent='${initials}';this.style.display='none';this.parentElement.textContent='${initials}'">`;
  } else {
    el.textContent = initials;
  }
}

function generateQR() {
  let c = '';
  for (let y = 0; y < 10; y++) for (let x = 0; x < 10; x++) if (Math.random() > .42) c += `<rect x="${x*10}" y="${y*10}" width="9" height="9" fill="#000"/>`;
  return c + `<rect x="0" y="0" width="29" height="29" fill="#000"/><rect x="4" y="4" width="21" height="21" fill="#fff"/><rect x="9" y="9" width="11" height="11" fill="#000"/><rect x="71" y="0" width="29" height="29" fill="#000"/><rect x="75" y="4" width="21" height="21" fill="#fff"/><rect x="80" y="9" width="11" height="11" fill="#000"/><rect x="0" y="71" width="29" height="29" fill="#000"/><rect x="4" y="75" width="21" height="21" fill="#fff"/><rect x="9" y="80" width="11" height="11" fill="#000"/>`;
}
function copyAddr() {
  const el = document.getElementById('walletAddr');
  if (el) navigator.clipboard.writeText(el.value).catch(() => {});
  toast('Address copied to clipboard');
}

// ── THEME ──────────────────────────────────────────────────────────────
(function(){ if(localStorage.getItem('atx_theme')==='Light') document.body.classList.add('light'); })();

function toggleTheme() {
  document.body.classList.toggle('light');
  localStorage.setItem('atx_theme', document.body.classList.contains('light') ? 'Light' : 'Dark');
}

// ── SIDEBAR ────────────────────────────────────────────────────────────
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  if (window.innerWidth <= 860) {
    sidebar.classList.toggle('mobile-open');
    document.body.classList.toggle('sidebar-overlay-active');
  } else {
    sidebar.classList.toggle('collapsed');
  }
}

// ── Maintenance check ─────────────────────────────────────────
(function() {
  const file = window.location.pathname.split('/').pop() || '';
  if (file === 'maintenance.html' || file.includes('login') || file.includes('signup')) return;
  // Check localStorage first (admin sets this when toggling)
  if (localStorage.getItem('atx_maintenance') === 'true') {
    window.location.href = 'maintenance.html';
  }
})();

// ── GLOBAL NOTIFICATIONS (popup + bell link, all pages) ──────────────
window.addEventListener('load', function() {
  const file = (window.location.pathname.split('/').pop() || '');
  if (['login.html','signup.html','maintenance.html','notifications.html'].includes(file)) {
    // On notifications page just link the bell
    document.querySelectorAll('.notif-wrap').forEach(function(b) {
      b.style.cursor = 'pointer';
      b.onclick = function() { location.href = 'notifications.html'; };
    });
    return;
  }

  // Link bell icon to notifications page
  document.querySelectorAll('.notif-wrap').forEach(function(b) {
    b.style.cursor = 'pointer';
    b.onclick = function() { location.href = 'notifications.html'; };
  });

  // Inject popup HTML if not already in the page
  if (!document.getElementById('notifOverlay')) {
    var el = document.createElement('div');
    el.innerHTML = '<div id="notifOverlay" style="display:none;position:fixed;inset:0;background:rgba(0,0,0,.6);backdrop-filter:blur(5px);z-index:9500;align-items:center;justify-content:center"><div id="notifModal" style="background:var(--bg3,#1a1d27);border:1px solid var(--border,rgba(255,255,255,.06));border-radius:20px;width:min(440px,92vw);padding:28px 26px;box-shadow:0 32px 80px rgba(0,0,0,.55);transform:scale(0.08) translateY(80px);opacity:0;transition:transform .4s cubic-bezier(.34,1.56,.64,1),opacity .25s"><div style="display:flex;align-items:flex-start;gap:14px;margin-bottom:16px"><div style="width:44px;height:44px;border-radius:50%;background:rgba(79,110,247,.15);display:flex;align-items:center;justify-content:center;flex-shrink:0"><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="var(--accent,#4f6ef7)" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg></div><div style="flex:1"><div id="notifTitle" style="font-size:16px;font-weight:700;margin-bottom:3px;color:var(--text1,#f0f2ff)"></div><div style="font-size:11px;color:var(--text3,#5a6380);text-transform:uppercase;font-weight:600;letter-spacing:.06em">AtrontifyX — Admin Message</div></div></div><div id="notifMessage" style="font-size:14px;color:var(--text2,#9ea8c8);line-height:1.7;margin-bottom:22px;white-space:pre-wrap"></div><button onclick="window.dismissNotif()" style="width:100%;height:44px;background:var(--accent,#4f6ef7);color:#fff;border:none;border-radius:12px;font-size:14px;font-weight:600;cursor:pointer;transition:opacity .15s" onmouseover="this.style.opacity=\'.88\'" onmouseout="this.style.opacity=\'1\'">Got it</button></div></div>';
    document.body.appendChild(el.firstChild);
  }

  window.dismissNotif = function() {
    var overlay = document.getElementById('notifOverlay');
    var modal   = document.getElementById('notifModal');
    if (modal) { modal.style.transform = 'scale(0.08) translateY(80px)'; modal.style.opacity = '0'; }
    setTimeout(function() { if (overlay) overlay.style.display = 'none'; }, 300);
  };

  function showNotifPopup(n) {
    var overlay = document.getElementById('notifOverlay');
    var modal   = document.getElementById('notifModal');
    var titleEl = document.getElementById('notifTitle');
    var msgEl   = document.getElementById('notifMessage');
    if (!overlay || !titleEl || !msgEl) return;
    titleEl.textContent = n.title || 'Platform Announcement';
    msgEl.textContent   = n.message || '';
    overlay.style.display = 'flex';
    requestAnimationFrame(function() { requestAnimationFrame(function() {
      if (modal) { modal.style.transform = 'scale(1) translateY(0)'; modal.style.opacity = '1'; }
    }); });
  }

  async function loadSharedNotification() {
    var db = window.ATRONTIFY_DB;
    if (!db) return;
    var sessionRes = await db.auth.getSession();
    var session = sessionRes.data && sessionRes.data.session;
    if (!session) return;
    var res = await db.from('notifications')
      .select('id,title,message,type,enabled')
      .eq('user_id', session.user.id)
      .eq('enabled', true)
      .order('created_at', { ascending: false })
      .limit(1);
    if (!res.data || !res.data.length) return;
    document.querySelectorAll('.notif-dot').forEach(function(d) { d.style.opacity = '1'; });
    showNotifPopup(res.data[0]);
  }

  loadSharedNotification();
});

// Auto-set active nav item based on current filename
(function() {
  const pageMap = {
    'dashboard.html':       'dashboard',
    'markets.html':         'markets',
    'trade-terminal.html':  'terminal',
    'deposit.html':         'deposit',
    'withdrawal.html':      'withdraw',
    'history.html':         'history',
    'notifications.html':   'notifications',
    'account-upgrade.html': 'upgrade',
    'settings.html':        'settings',
  };
  const file = window.location.pathname.split('/').pop() || 'dashboard.html';
  const active = pageMap[file] || 'dashboard';
  document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.nav-item[data-page]').forEach(function(el) {
      el.classList.toggle('active', el.getAttribute('data-page') === active);
    });
    // Close sidebar on mobile when nav item clicked
    document.querySelectorAll('.nav-item[data-page], .nav-item[data-navaction]').forEach(function(item) {
      item.addEventListener('click', function() {
        if (window.innerWidth <= 860) {
          document.getElementById('sidebar').classList.remove('mobile-open');
          document.body.classList.remove('sidebar-overlay-active');
        }
      });
    });
  });
})();

// Close sidebar when clicking outside on mobile
document.addEventListener('click', function(e) {
  const sidebar = document.getElementById('sidebar');
  if (!sidebar) return;
  const menuBtn = e.target.closest('.tb-btn');
  if (
    window.innerWidth <= 860 &&
    sidebar.classList.contains('mobile-open') &&
    !sidebar.contains(e.target) &&
    !menuBtn
  ) {
    sidebar.classList.remove('mobile-open');
    document.body.classList.remove('sidebar-overlay-active');
  }
});

// ── TRADINGVIEW ────────────────────────────────────────────────────────
let _tvSymbol = 'BINANCE:BTCUSDT';
let _tvInterval = '15';

function loadTradingView(symbol, interval) {
  if (symbol !== null && symbol !== undefined) _tvSymbol = symbol;
  if (interval !== null && interval !== undefined) _tvInterval = interval;
  const chart = document.getElementById('tvchart');
  if (chart && window.TradingView) {
    chart.innerHTML = '';
    new TradingView.widget({
      autosize: true,
      symbol: _tvSymbol,
      interval: _tvInterval,
      timezone: 'Etc/UTC',
      theme: document.body.classList.contains('light') ? 'light' : 'dark',
      style: '1',
      locale: 'en',
      toolbar_bg: 'transparent',
      enable_publishing: false,
      hide_top_toolbar: false,
      allow_symbol_change: false,
      container_id: 'tvchart'
    });
  }
}

function loadPortfolioChart(range) {
  const wrap = document.getElementById('portfolioChartWrap');
  if (!wrap) return;
  wrap.innerHTML = '';
  const rangeMap = { '1D': '1D', '1W': '1W', '1M': '1M', '1Y': '12M' };
  const tvRange = rangeMap[range] || '1D';
  const container = document.createElement('div');
  container.className = 'tradingview-widget-container';
  container.style.cssText = 'height:100%;width:100%';
  const inner = document.createElement('div');
  inner.className = 'tradingview-widget-container__widget';
  inner.style.cssText = 'height:100%;width:100%';
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js';
  script.async = true;
  script.textContent = JSON.stringify({
    symbols: [['FOREXCOM:SPXUSD|' + tvRange]],
    chartOnly: true,
    width: '100%',
    height: 175,
    locale: 'en',
    colorTheme: 'dark',
    showVolume: false,
    hideDateRanges: true,
    hideMarketStatus: true,
    hideSymbolLogo: true,
    scalePosition: 'no',
    scaleMode: 'Normal',
    fontFamily: 'Space Grotesk, sans-serif',
    fontSize: '10',
    noTimeScale: false,
    valuesTracking: '0',
    changeMode: 'price-and-percent',
    chartType: 'area',
    lineWidth: 2,
    lineType: 0,
    isTransparent: true,
    color: 'rgba(79, 110, 247, 1)',
    lineColor: 'rgba(79, 110, 247, 1)',
    topColor: 'rgba(79, 110, 247, 0.3)',
    bottomColor: 'rgba(79, 110, 247, 0)'
  });
  container.appendChild(inner);
  container.appendChild(script);
  wrap.appendChild(container);
}

function loadMktOverview(containerId, symbols, height) {
  const wrap = document.getElementById(containerId);
  if (!wrap) return;
  const h = height || 490;
  wrap.innerHTML = '';
  const container = document.createElement('div');
  container.className = 'tradingview-widget-container';
  container.style.cssText = 'height:100%;width:100%';
  const inner = document.createElement('div');
  inner.className = 'tradingview-widget-container__widget';
  inner.style.cssText = 'height:100%;width:100%';
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js';
  script.async = true;
  script.textContent = JSON.stringify({
    colorTheme: 'dark',
    dateRange: '1D',
    showChart: false,
    locale: 'en',
    isTransparent: true,
    showSymbolLogo: true,
    showFloatingTooltip: false,
    width: '100%',
    height: h,
    plotLineColorGrowing: 'rgba(41, 98, 255, 1)',
    plotLineColorFalling: 'rgba(41, 98, 255, 1)',
    gridLineColor: 'rgba(42, 46, 57, 0)',
    scaleFontColor: 'rgba(120, 123, 134, 1)',
    belowLineFillColorGrowing: 'rgba(41, 98, 255, 0.12)',
    belowLineFillColorFalling: 'rgba(41, 98, 255, 0.02)',
    symbolActiveColor: 'rgba(41, 98, 255, 0.12)',
    tabs: [{
      title: 'Assets',
      symbols: symbols,
      originalTitle: 'Assets'
    }]
  });
  container.appendChild(inner);
  container.appendChild(script);
  wrap.appendChild(container);
}

function loadMarketWidget() {
  const market = document.getElementById('tradingview_market');
  if (market) {
    const theme = document.body.classList.contains('light') ? 'light' : 'dark';
    market.innerHTML = `<iframe src="https://s.tradingview.com/widgetembed/?frameElementId=tradingview_market&symbol=BINANCE:BTCUSDT&interval=60&hidesidetoolbar=1&symboledit=1&saveimage=0&toolbarbg=transparent&studies=[]&theme=${theme}" width="100%" height="100%" frameborder="0" allowtransparency="true" scrolling="no" style="height:100%;min-height:140px;border:none;border-radius:12px"></iframe>`;
  }
}

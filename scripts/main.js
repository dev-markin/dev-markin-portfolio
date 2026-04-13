/* ═══════════════════════════════════════════════════════
   MARKIN.DEV — Main JavaScript
   Gamified Portfolio Interactive System
═══════════════════════════════════════════════════════ */

// ──────────────────────────────────────────
//  BOOT SEQUENCE
// ──────────────────────────────────────────
const bootMessages = [
  '> Inicializando MARKIN.OS v2.4.0...',
  '> Verificando integridade do sistema...',
  '> Carregando módulos backend [Flask, Django]...',
  '> Carregando módulos database [PostgreSQL, MySQL]...',
  '> Carregando módulos frontend [JS, HTML5, CSS3]...',
  '> Carregando análise de dados [Pandas, Dashboards]...',
  '> Carregando IA engine [Claude API]...',
  '> Conectando com repositórios...',
  '> Compilando portfólio...',
  '> Sistema pronto. Bem-vindo, Marcos.dev ✓',
];

let bootDone = false;

function runBootSequence() {
  const linesEl = document.getElementById('boot-lines');
  const progressEl = document.getElementById('boot-progress');
  const pctEl = document.getElementById('boot-pct');
  const enterBtn = document.getElementById('enter-btn');
  const total = bootMessages.length;

  initBootParticles();

  bootMessages.forEach((msg, i) => {
    const delay = 300 + i * 350;
    setTimeout(() => {
      const line = document.createElement('div');
      line.className = 'boot-line';
      line.textContent = msg;
      if (msg.includes('✓')) line.style.color = '#00ff88';
      linesEl.appendChild(line);
      linesEl.scrollTop = linesEl.scrollHeight;

      const pct = Math.round(((i + 1) / total) * 100);
      progressEl.style.width = pct + '%';
      pctEl.textContent = pct + '%';

      if (i === total - 1) {
        setTimeout(() => {
          enterBtn.style.display = 'block';
          bootDone = true;
        }, 400);
      }
    }, delay);
  });
}

function enterSystem() {
  const bootScreen = document.getElementById('boot-screen');
  bootScreen.classList.add('fade-out');
  setTimeout(() => {
    bootScreen.style.display = 'none';
    document.getElementById('app').style.display = 'block';
    initApp();
  }, 600);
}

// ──────────────────────────────────────────
//  BOOT PARTICLES
// ──────────────────────────────────────────
function initBootParticles() {
  const canvas = document.getElementById('boot-particles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = Array.from({ length: 80 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2 + .5,
    vx: (Math.random() - .5) * .4,
    vy: (Math.random() - .5) * .4,
    a: Math.random(),
  }));

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      p.a += .005;
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0,212,255,${.3 + .3 * Math.sin(p.a)})`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }
  draw();
}

// ──────────────────────────────────────────
//  ANIMATED GRID BACKGROUND
// ──────────────────────────────────────────
function initGrid() {
  const canvas = document.getElementById('grid-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = document.body.scrollHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const CELL = 60;
  let offset = 0;

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = 'rgba(0,212,255,0.07)';
    ctx.lineWidth = 1;

    // Vertical lines
    for (let x = 0; x <= canvas.width; x += CELL) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    // Horizontal lines with scroll offset
    for (let y = (offset % CELL) - CELL; y <= canvas.height; y += CELL) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

    offset = (offset + .3) % CELL;
    requestAnimationFrame(draw);
  }
  draw();
}

// ──────────────────────────────────────────
//  TYPEWRITER ROLE
// ──────────────────────────────────────────
const roles = [
  'Desenvolvedor Backend',
  'Full Stack Developer',
  'Analista de Dados',
  'Integrador de IA',
  'Arquiteto de APIs',
];

function initTypewriter() {
  const el = document.getElementById('typewriter-role');
  if (!el) return;
  let ri = 0, ci = 0, deleting = false;

  function tick() {
    const current = roles[ri];
    if (!deleting) {
      el.textContent = current.slice(0, ++ci);
      if (ci === current.length) { deleting = true; setTimeout(tick, 2000); return; }
    } else {
      el.textContent = current.slice(0, --ci);
      if (ci === 0) { deleting = false; ri = (ri + 1) % roles.length; }
    }
    setTimeout(tick, deleting ? 50 : 80);
  }
  tick();
}

// ──────────────────────────────────────────
//  COUNTER ANIMATION
// ──────────────────────────────────────────
function animateCounters(root) {
  const counters = (root || document).querySelectorAll('.counter');
  counters.forEach(el => {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1500;
    const start = performance.now();

    function step(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(ease * target) + (target >= 100 ? '+' : (el.closest('.stat-item') ? '+' : ''));
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target + (el.closest('.stat-item') || el.closest('.dash-card') ? '+' : '');
    }
    requestAnimationFrame(step);
  });
}

// ──────────────────────────────────────────
//  SKILL BARS ANIMATION
// ──────────────────────────────────────────
function animateSkillBars(container) {
  const fills = (container || document).querySelectorAll('.skill-fill');
  fills.forEach((fill, i) => {
    const level = parseInt(fill.closest('.skill-item')?.dataset.level || '80', 10);
    if (level >= 88) {
      fill.style.background = 'linear-gradient(90deg, #00d4ff, #00ff88)';
      fill.style.boxShadow = '0 0 10px rgba(0,255,136,.5)';
    } else if (level >= 78) {
      fill.style.background = 'linear-gradient(90deg, #00d4ff, #bf00ff)';
    } else {
      fill.style.background = 'linear-gradient(90deg, #bf00ff, #ff0080)';
      fill.style.boxShadow = '0 0 10px rgba(191,0,255,.45)';
    }
    setTimeout(() => fill.classList.add('animated'), i * 80);
  });
}

// ──────────────────────────────────────────
//  DASHBOARD BAR ANIMATION
// ──────────────────────────────────────────
function animateDashBars(container) {
  const bars = (container || document).querySelectorAll('.dash-fill');
  bars.forEach((bar, i) => {
    setTimeout(() => {
      bar.style.width = bar.dataset.target;
    }, i * 150);
  });
}

// ──────────────────────────────────────────
//  RADAR CHART
// ──────────────────────────────────────────
function drawRadar() {
  const canvas = document.getElementById('radar-chart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  const cx = W / 2, cy = H / 2;
  const R = Math.min(W, H) * .38;

  const labels   = ['Backend', 'Frontend', 'Database', 'Data/IA', 'APIs', 'Java'];
  const values   = [0.90, 0.85, 0.85, 0.80, 0.90, 0.75];
  const N = labels.length;
  let progress = 0;

  function angleFn(i) { return (Math.PI * 2 * i) / N - Math.PI / 2; }

  function drawFrame(prog) {
    ctx.clearRect(0, 0, W, H);

    // Grid circles
    for (let level = 1; level <= 5; level++) {
      const r = R * (level / 5);
      ctx.beginPath();
      for (let i = 0; i < N; i++) {
        const a = angleFn(i);
        const x = cx + r * Math.cos(a), y = cy + r * Math.sin(a);
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.strokeStyle = 'rgba(0,212,255,0.12)';
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // Axes
    labels.forEach((_, i) => {
      const a = angleFn(i);
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + R * Math.cos(a), cy + R * Math.sin(a));
      ctx.strokeStyle = 'rgba(0,212,255,0.15)';
      ctx.lineWidth = 1;
      ctx.stroke();
    });

    // Filled polygon
    ctx.beginPath();
    values.forEach((v, i) => {
      const r = R * v * prog;
      const a = angleFn(i);
      const x = cx + r * Math.cos(a), y = cy + r * Math.sin(a);
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    });
    ctx.closePath();
    ctx.fillStyle = 'rgba(0,212,255,0.12)';
    ctx.fill();
    ctx.strokeStyle = '#00d4ff';
    ctx.lineWidth = 2;
    ctx.shadowBlur = 12;
    ctx.shadowColor = '#00d4ff';
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Dots
    values.forEach((v, i) => {
      const r = R * v * prog;
      const a = angleFn(i);
      const x = cx + r * Math.cos(a), y = cy + r * Math.sin(a);
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, Math.PI * 2);
      ctx.fillStyle = '#00d4ff';
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#00d4ff';
      ctx.fill();
      ctx.shadowBlur = 0;
    });

    // Labels
    ctx.font = `bold 13px 'Rajdhani', sans-serif`;
    ctx.fillStyle = '#e2e8f0';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    labels.forEach((lbl, i) => {
      const a = angleFn(i);
      const offset = 28;
      const x = cx + (R + offset) * Math.cos(a);
      const y = cy + (R + offset) * Math.sin(a);
      ctx.fillText(lbl, x, y);
    });
  }

  const startTime = performance.now();
  function animate(now) {
    progress = Math.min((now - startTime) / 1200, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    drawFrame(ease);
    if (progress < 1) requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
}

// ──────────────────────────────────────────
//  INTERSECTION OBSERVER (section reveal)
// ──────────────────────────────────────────
function initScrollObserver() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const section = entry.target;
        section.classList.add('visible');

        const id = section.getAttribute('id');
        highlightNav(id);

        if (id === 'skills') animateSkillBars(section);
        if (id === 'sobre' || id === 'dashboard') {
          animateCounters(section);
          if (id === 'dashboard') { animateDashBars(section); drawRadar(); }
        }
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.section').forEach(s => observer.observe(s));
}

function highlightNav(sectionId) {
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.toggle('active', link.dataset.section === sectionId);
  });
}

// ──────────────────────────────────────────
//  NAVIGATION
// ──────────────────────────────────────────
function initNavigation() {
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const targetId = link.dataset.section;
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        closeMenuMobile();
      }
    });
  });

  // Mobile menu
  const menuBtn = document.getElementById('mobile-menu-btn');
  const nav = document.getElementById('hud-nav');
  const backdrop = document.getElementById('nav-backdrop');
  if (menuBtn && nav) {
    menuBtn.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      menuBtn.classList.toggle('open', isOpen);
      menuBtn.setAttribute('aria-expanded', String(isOpen));
      if (backdrop) backdrop.classList.toggle('active', isOpen);
    });
  }
  if (backdrop) {
    backdrop.addEventListener('click', closeMenuMobile);
  }
}

function closeMenuMobile() {
  const nav = document.getElementById('hud-nav');
  const menuBtn = document.getElementById('mobile-menu-btn');
  const backdrop = document.getElementById('nav-backdrop');
  if (nav) nav.classList.remove('open');
  if (menuBtn) {
    menuBtn.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
  }
  if (backdrop) backdrop.classList.remove('active');
}

// ──────────────────────────────────────────
//  TERMINAL
// ──────────────────────────────────────────
const terminalCommands = {
  help: () => [
    '<span class="t-info">Comandos disponíveis:</span>',
    '<span class="t-cmd">  about</span>       → Informações sobre Marcos',
    '<span class="t-cmd">  skills</span>      → Lista de skills',
    '<span class="t-cmd">  projects</span>    → Projetos recentes',
    '<span class="t-cmd">  contact</span>     → Informações de contato',
    '<span class="t-cmd">  stack</span>       → Stack completa',
    '<span class="t-cmd">  easter</span>      → 🥚 Você chegou até aqui...',
    '<span class="t-cmd">  clear</span>       → Limpar terminal',
    '<span class="t-cmd">  exit</span>        → Fechar terminal',
  ],
  about: () => [
    '<span class="t-info">╔══════════════════════════════════╗</span>',
    '<span class="t-info">║  MARCOS ROGÉRIO TUDES LOPES      ║</span>',
    '<span class="t-info">║  Desenvolvedor de Software        ║</span>',
    '<span class="t-info">╚══════════════════════════════════╝</span>',
    '',
    '> +3 anos de experiência em backend, full stack e dados',
    '> Desenvolvendo sistema PDV completo (VixTec)',
    '> Combinando Python + Java + IA para soluções robustas',
  ],
  skills: () => [
    '<span class="t-info">Stack principal:</span>',
    '  Python     ██████████  90%',
    '  Flask      ██████████  90%',
    '  Django     █████████   85%',
    '  Java       ████████    75%',
    '  JS         █████████   85%',
    '  PostgreSQL █████████   85%',
    '  Pandas     ████████    80%',
    '  APIs REST  ██████████  90%',
    '  IA/Claude  ████████    75%',
  ],
  projects: () => [
    '<span class="t-info">Projetos recentes:</span>',
    '  🔥 Sistema PDV       → Flask/Django + PostgreSQL',
    '  📊 Dashboard Analytics → Pandas + Python',
    '  🤖 IA Automation     → Claude API + Flask',
    '  🚌 SEMOB Web System  → Python + JavaScript',
  ],
  contact: () => [
    '<span class="t-info">Contatos:</span>',
    '  GitHub:   github.com/markin-dev',
    '  LinkedIn: linkedin.com/in/markin-dev',
    '  Email:    marcos@markin.dev',
  ],
  stack: () => [
    '<span class="t-info">╔══════════════════════════════════════╗</span>',
    '<span class="t-info">║  FULL STACK + DATA + IA              ║</span>',
    '<span class="t-info">╚══════════════════════════════════════╝</span>',
    '',
    '<span class="t-warn">Backend:</span>  Python (Flask, Django) | Java | APIs REST',
    '<span class="t-warn">Frontend:</span> JavaScript | HTML5 | CSS3',
    '<span class="t-warn">Database:</span> PostgreSQL | MySQL | SQLite',
    '<span class="t-warn">Data:</span>     Pandas | Dashboards | Relatórios',
    '<span class="t-warn">IA:</span>       Claude API | Automação Inteligente',
  ],
  easter: () => [
    '<span style="color:#bf00ff">╔═══════════════════════════════════╗</span>',
    '<span style="color:#bf00ff">║     🥚 EASTER EGG DESBLOQUEADO!   ║</span>',
    '<span style="color:#bf00ff">╚═══════════════════════════════════╝</span>',
    '',
    '<span style="color:#fbbf24">Você encontrou o terminal escondido!</span>',
    '<span style="color:#fbbf24">Isso mostra que você presta atenção.</span>',
    '<span style="color:#fbbf24">Exatamente o tipo de pessoa que eu</span>',
    '<span style="color:#fbbf24">gostaria de ter na equipe. 😉</span>',
    '',
    '> Habilidade desbloqueada: CURIOSIDADE ✓',
    '> Habilidade desbloqueada: ATENÇÃO AOS DETALHES ✓',
  ],
  clear: () => { document.getElementById('terminal-output').innerHTML = ''; return []; },
  exit:  () => { closeTerminal(); return []; },
};

function terminalWrite(lines) {
  const out = document.getElementById('terminal-output');
  if (!out) return;
  lines.forEach(line => {
    const div = document.createElement('div');
    div.innerHTML = line === '' ? '&nbsp;' : line;
    out.appendChild(div);
  });
  out.scrollTop = out.scrollHeight;
}

function initTerminal() {
  const toggle = document.getElementById('terminal-toggle');
  const input = document.getElementById('terminal-input');
  if (!toggle || !input) return;

  toggle.addEventListener('click', openTerminal);

  document.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.key === '`') {
      e.preventDefault();
      document.getElementById('terminal-overlay').classList.contains('hidden') ? openTerminal() : closeTerminal();
    }
  });

  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      const cmd = input.value.trim().toLowerCase();
      if (!cmd) return;
      terminalWrite([`<span class="t-cmd">marcos@markin.dev:~$ ${cmd}</span>`]);
      const fn = terminalCommands[cmd];
      if (fn) {
        const result = fn();
        if (result && result.length) terminalWrite(result);
      } else {
        terminalWrite([`<span class="t-err">Comando não encontrado: ${cmd}. Digite 'help' para listar os comandos.</span>`]);
      }
      input.value = '';
    }
  });
}

function openTerminal() {
  const overlay = document.getElementById('terminal-overlay');
  overlay.classList.remove('hidden');
  const out = document.getElementById('terminal-output');
  if (!out.hasChildNodes()) {
    terminalWrite([
      '<span class="t-info">MARKIN.OS Terminal v2.4.0</span>',
      '<span class="t-info">Digite \'help\' para ver os comandos disponíveis.</span>',
      '',
    ]);
  }
  setTimeout(() => document.getElementById('terminal-input')?.focus(), 50);
}

function closeTerminal() {
  document.getElementById('terminal-overlay')?.classList.add('hidden');
}

// ──────────────────────────────────────────
//  PDV DEMO
// ──────────────────────────────────────────
let cart = {};

function addToCart(name, price) {
  if (cart[name]) {
    cart[name].qty++;
  } else {
    cart[name] = { price, qty: 1 };
  }
  renderCart();
}

function renderCart() {
  const container = document.getElementById('pdv-cart-items');
  const totalEl = document.getElementById('pdv-total');
  if (!container || !totalEl) return;

  container.innerHTML = '';
  let total = 0;

  Object.entries(cart).forEach(([name, item]) => {
    total += item.price * item.qty;
    const div = document.createElement('div');
    div.className = 'pdv-cart-item';
    div.innerHTML = `
      <span class="pdv-cart-item-name">${name}</span>
      <span class="pdv-cart-item-qty">x${item.qty}</span>
      <span class="pdv-cart-item-price">R$ ${(item.price * item.qty).toFixed(2).replace('.', ',')}</span>
    `;
    container.appendChild(div);
  });

  totalEl.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
}

function clearCart() {
  cart = {};
  renderCart();
}

function finalizeSale() {
  if (Object.keys(cart).length === 0) {
    showNotification('⚠ Adicione itens ao carrinho!');
    return;
  }
  const totalEl = document.getElementById('pdv-total');
  const total = totalEl ? totalEl.textContent : '??';
  clearCart();
  showNotification(`✓ Venda finalizada! Total: ${total}`);
}

function openPDVDemo() {
  document.getElementById('pdv-modal').classList.remove('hidden');
}

function closePDVDemo() {
  document.getElementById('pdv-modal').classList.add('hidden');
  clearCart();
}

// ──────────────────────────────────────────
//  CONTACT FORM
// ──────────────────────────────────────────
function submitForm(e) {
  e.preventDefault();
  const btn = e.target.querySelector('[type=submit]');
  btn.textContent = '✓ MENSAGEM TRANSMITIDA!';
  btn.style.background = 'linear-gradient(135deg, #00ff88, #00d4ff)';
  showNotification('✓ Mensagem enviada com sucesso!');
  setTimeout(() => {
    btn.innerHTML = '<span class="send-icon">⚡</span> TRANSMITIR MENSAGEM';
    btn.style.background = '';
    e.target.reset();
  }, 3000);
}

// ──────────────────────────────────────────
//  SCROLL PROGRESS
// ──────────────────────────────────────────
function initScrollProgress() {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (docHeight > 0 ? (scrollTop / docHeight) * 100 : 0) + '%';
  }, { passive: true });
}

// ──────────────────────────────────────────
//  BACK TO TOP
// ──────────────────────────────────────────
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ──────────────────────────────────────────
//  NOTIFICATIONS
// ──────────────────────────────────────────
function showNotification(msg) {
  const existing = document.querySelectorAll('.notification');
  existing.forEach(n => n.remove());

  const note = document.createElement('div');
  note.className = 'notification';
  note.textContent = msg;
  document.body.appendChild(note);
  setTimeout(() => note.remove(), 3100);
}

// ──────────────────────────────────────────
//  MODAL CLOSE ON BACKDROP
// ──────────────────────────────────────────
function initModals() {
  document.getElementById('pdv-modal')?.addEventListener('click', e => {
    if (e.target === document.getElementById('pdv-modal')) closePDVDemo();
  });
}

// ──────────────────────────────────────────
//  HOVER GLITCH EFFECT ON SECTION TITLES
// ──────────────────────────────────────────
function initGlitchHover() {
  const chars = '!@#$%^&*ABCDEFabcdef0123456789';
  document.querySelectorAll('.section-title').forEach(el => {
    let originalText = el.innerHTML;
    let timeout;

    el.addEventListener('mouseenter', () => {
      let iterations = 0;
      clearInterval(timeout);
      timeout = setInterval(() => {
        el.querySelectorAll('.accent').forEach(acc => {
          acc.textContent = acc.textContent
            .split('')
            .map((ch, i) => i < iterations ? acc.dataset.original?.[i] || ch : chars[Math.floor(Math.random() * chars.length)])
            .join('');
        });
        if (iterations >= 6) {
          clearInterval(timeout);
          el.querySelectorAll('.accent').forEach(acc => {
            if (acc.dataset.original) acc.textContent = acc.dataset.original;
          });
        }
        iterations += .5;
      }, 60);
    });
  });

  // Store originals
  document.querySelectorAll('.section-title .accent').forEach(acc => {
    acc.dataset.original = acc.textContent;
  });
}

// ──────────────────────────────────────────
//  CURSOR GLOW TRAIL
// ──────────────────────────────────────────
function initCursorGlow() {
  if (window.matchMedia('(pointer: coarse)').matches) return;
  const glow = document.createElement('div');
  Object.assign(glow.style, {
    position: 'fixed', pointerEvents: 'none',
    width: '20px', height: '20px',
    background: 'radial-gradient(circle, rgba(0,212,255,.35), transparent)',
    borderRadius: '50%',
    transform: 'translate(-50%,-50%)',
    zIndex: '9000',
    transition: 'transform .1s ease',
  });
  document.body.appendChild(glow);
  document.addEventListener('mousemove', e => {
    glow.style.left = e.clientX + 'px';
    glow.style.top  = e.clientY + 'px';
  });
}

// ──────────────────────────────────────────
//  FLOATING PARTICLES
// ──────────────────────────────────────────
function initParticles() {
  const canvas = document.createElement('canvas');
  canvas.id = 'particles-canvas';
  Object.assign(canvas.style, {
    position: 'fixed',
    top: '0', left: '0',
    width: '100%', height: '100%',
    pointerEvents: 'none',
    zIndex: '1',
  });
  const app = document.getElementById('app');
  if (!app) return;
  app.prepend(canvas);

  const ctx = canvas.getContext('2d');
  function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
  resize();
  window.addEventListener('resize', resize);

  const palette = [
    [0, 212, 255],    // neon blue
    [191,  0, 255],   // neon purple
    [0, 255, 136],    // neon green
    [255,   0, 128],  // neon pink
  ];

  function spawn(randomY) {
    const col = palette[Math.floor(Math.random() * palette.length)];
    return {
      x:     Math.random() * canvas.width,
      y:     randomY ? Math.random() * canvas.height : canvas.height + 10,
      size:  Math.random() * 2.2 + .5,
      vy:    Math.random() * .38 + .08,
      vx:    (Math.random() - .5) * .22,
      alpha: Math.random() * .18 + .04,
      color: col,
      diamond: Math.random() > .55,
    };
  }

  const pts = Array.from({ length: 45 }, () => spawn(true));

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pts.forEach((p, i) => {
      p.y -= p.vy;
      p.x += p.vx;
      if (p.y < -10 || p.x < -20 || p.x > canvas.width + 20) {
        pts[i] = spawn(false);
        return;
      }
      const [r, g, b] = p.color;
      ctx.globalAlpha = p.alpha;
      if (p.diamond) {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(Math.PI / 4);
        ctx.fillStyle = `rgb(${r},${g},${b})`;
        ctx.fillRect(-p.size, -p.size, p.size * 2, p.size * 2);
        ctx.restore();
      } else {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgb(${r},${g},${b})`;
        ctx.fill();
      }
    });
    ctx.globalAlpha = 1;
    requestAnimationFrame(draw);
  }
  draw();
}

// ──────────────────────────────────────────
//  INIT APP
// ──────────────────────────────────────────
function initApp() {
  initGrid();
  initTypewriter();
  initScrollObserver();
  initNavigation();
  initTerminal();
  initModals();
  initGlitchHover();
  initCursorGlow();
  initScrollProgress();
  initBackToTop();
  initParticles();

  // Trigger about section animations immediately
  setTimeout(() => {
    const sobre = document.getElementById('sobre');
    if (sobre) {
      sobre.classList.add('visible');
      animateCounters(sobre);
    }
  }, 300);
}

// ──────────────────────────────────────────
//  KEYBOARD SHORTCUT HINT
// ──────────────────────────────────────────
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeTerminal();
    closePDVDemo();
  }
});

// ──────────────────────────────────────────
//  START
// ──────────────────────────────────────────
document.addEventListener('DOMContentLoaded', runBootSequence);

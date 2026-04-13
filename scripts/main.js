/* ═══════════════════════════════════════════════════════
   MARKIN.DEV — Main JavaScript
   Gamified Portfolio Interactive System
═══════════════════════════════════════════════════════ */

// ──────────────────────────────────────────
//  SFX ENGINE (Web Audio API — sem arquivos)
// ──────────────────────────────────────────
const SFX = {
  _ctx: null,
  enabled: true,

  ctx() {
    if (!this._ctx) this._ctx = new (window.AudioContext || window.webkitAudioContext)();
    if (this._ctx.state === 'suspended') this._ctx.resume();
    return this._ctx;
  },

  _play(fn) {
    if (!this.enabled) return;
    try { fn(this.ctx()); } catch (e) {}
  },

  // Clique UI curto
  click() {
    this._play(ctx => {
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.connect(g); g.connect(ctx.destination);
      o.type = 'square';
      o.frequency.setValueAtTime(900, ctx.currentTime);
      o.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + .06);
      g.gain.setValueAtTime(.06, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(.001, ctx.currentTime + .06);
      o.start(); o.stop(ctx.currentTime + .07);
    });
  },

  // Hover sutil
  hover() {
    this._play(ctx => {
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.connect(g); g.connect(ctx.destination);
      o.type = 'sine';
      o.frequency.setValueAtTime(1200, ctx.currentTime);
      g.gain.setValueAtTime(.02, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(.001, ctx.currentTime + .03);
      o.start(); o.stop(ctx.currentTime + .035);
    });
  },

  // Power-up ao entrar no sistema
  powerUp() {
    this._play(ctx => {
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.connect(g); g.connect(ctx.destination);
      o.type = 'sawtooth';
      o.frequency.setValueAtTime(100, ctx.currentTime);
      o.frequency.exponentialRampToValueAtTime(1800, ctx.currentTime + .65);
      g.gain.setValueAtTime(.07, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(.001, ctx.currentTime + .7);
      o.start(); o.stop(ctx.currentTime + .72);
    });
  },

  // Tick da máquina de escrever (ruído filtrado)
  typeTick() {
    this._play(ctx => {
      const len = Math.floor(ctx.sampleRate * .018);
      const buf = ctx.createBuffer(1, len, ctx.sampleRate);
      const d   = buf.getChannelData(0);
      for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / len);
      const src = ctx.createBufferSource();
      const f   = ctx.createBiquadFilter();
      const g   = ctx.createGain();
      f.type = 'bandpass'; f.frequency.value = 3200; f.Q.value = 1.2;
      src.buffer = buf;
      src.connect(f); f.connect(g); g.connect(ctx.destination);
      g.gain.setValueAtTime(.038, ctx.currentTime);
      src.start();
    });
  },

  // Sweep ao animar barras de skill
  skillSweep() {
    this._play(ctx => {
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.connect(g); g.connect(ctx.destination);
      o.type = 'sine';
      o.frequency.setValueAtTime(200, ctx.currentTime);
      o.frequency.exponentialRampToValueAtTime(900, ctx.currentTime + .45);
      g.gain.setValueAtTime(.04, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(.001, ctx.currentTime + .5);
      o.start(); o.stop(ctx.currentTime + .52);
    });
  },

  // Chime de sucesso (notificações)
  chime() {
    this._play(ctx => {
      [[0, 783.99], [.13, 1046.5]].forEach(([dt, freq]) => {
        const o = ctx.createOscillator(), g = ctx.createGain();
        o.connect(g); g.connect(ctx.destination);
        o.type = 'sine'; o.frequency.value = freq;
        const t = ctx.currentTime + dt;
        g.gain.setValueAtTime(.07, t);
        g.gain.exponentialRampToValueAtTime(.001, t + .5);
        o.start(t); o.stop(t + .55);
      });
    });
  },

  // Tecla mecânica do terminal
  termKey() {
    this._play(ctx => {
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.connect(g); g.connect(ctx.destination);
      o.type = 'square';
      o.frequency.setValueAtTime(500 + Math.random() * 250, ctx.currentTime);
      g.gain.setValueAtTime(.028, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(.001, ctx.currentTime + .04);
      o.start(); o.stop(ctx.currentTime + .045);
    });
  },

  // Whoosh ao revelar seção
  whoosh() {
    this._play(ctx => {
      const len = Math.floor(ctx.sampleRate * .32);
      const buf = ctx.createBuffer(1, len, ctx.sampleRate);
      const d   = buf.getChannelData(0);
      for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
      const src = ctx.createBufferSource();
      const f   = ctx.createBiquadFilter();
      const g   = ctx.createGain();
      f.type = 'bandpass';
      f.frequency.setValueAtTime(150, ctx.currentTime);
      f.frequency.exponentialRampToValueAtTime(3500, ctx.currentTime + .32);
      f.Q.value = .7;
      src.buffer = buf;
      src.connect(f); f.connect(g); g.connect(ctx.destination);
      g.gain.setValueAtTime(.065, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(.001, ctx.currentTime + .35);
      src.start();
    });
  },
};

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
  SFX.powerUp();
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
      SFX.typeTick();
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
  SFX.skillSweep();
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
        if (section.id !== 'sobre') SFX.whoosh();

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
    link.addEventListener('mouseenter', () => SFX.hover());
    link.addEventListener('click', e => {
      e.preventDefault();
      SFX.click();
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
      SFX.click();
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
//  TERMINAL HELPERS (algoritmos em JS)
// ──────────────────────────────────────────
function _fib(n) {
  n = Math.min(Math.max(parseInt(n) || 8, 1), 20);
  const s = [0, 1];
  for (let i = 2; i <= n; i++) s.push(s[i - 1] + s[i - 2]);
  return s.slice(0, n + 1);
}
function _fact(n) {
  n = Math.min(Math.max(parseInt(n) || 5, 0), 15);
  let r = 1;
  for (let i = 2; i <= n; i++) r *= i;
  return [n, r];
}
function _sieve(n) {
  n = Math.min(Math.max(parseInt(n) || 30, 2), 100);
  const s = Array(n + 1).fill(true);
  s[0] = s[1] = false;
  for (let i = 2; i * i <= n; i++) if (s[i]) for (let j = i * i; j <= n; j += i) s[j] = false;
  return s.reduce((a, v, i) => (v ? [...a, i] : a), []);
}
function _bubbleSort(arr) {
  const a = [...arr], steps = [];
  for (let i = 0; i < a.length - 1; i++)
    for (let j = 0; j < a.length - i - 1; j++) {
      if (a[j] > a[j + 1]) [a[j], a[j + 1]] = [a[j + 1], a[j]];
      steps.push([...a]);
    }
  return { sorted: a, steps };
}

// ──────────────────────────────────────────
//  TERMINAL COMMANDS
// ──────────────────────────────────────────
const terminalCommands = {

  // ── PORTFÓLIO ──
  help: () => [
    '<span class="t-info">╔══════════════════════════════════════════════╗</span>',
    '<span class="t-info">║   MARKIN.OS — Comandos disponíveis           ║</span>',
    '<span class="t-info">╚══════════════════════════════════════════════╝</span>',
    '',
    '<span class="t-warn">── PORTFÓLIO ──</span>',
    '<span class="t-cmd">  about</span>               → Sobre o dev',
    '<span class="t-cmd">  skills</span>              → Stack de habilidades',
    '<span class="t-cmd">  projects</span>            → Projetos recentes',
    '<span class="t-cmd">  contact</span>             → Contatos',
    '<span class="t-cmd">  stack</span>               → Stack completa',
    '<span class="t-cmd">  easter</span>              → 🥚 Easter egg',
    '',
    '<span class="t-warn">── PYTHON REPL ──</span>',
    '<span class="t-cmd">  python</span>              → Abrir REPL simulado',
    '<span class="t-cmd">  python print("oi")</span>  → Saída de texto',
    '<span class="t-cmd">  python fib(10)</span>      → Fibonacci',
    '<span class="t-cmd">  python fact(7)</span>      → Fatorial',
    '<span class="t-cmd">  python primes(30)</span>   → Primos',
    '<span class="t-cmd">  python 2 ** 10</span>      → Expressão matemática',
    '<span class="t-cmd">  python range(8)</span>     → range()',
    '<span class="t-cmd">  python sum([1,2,3])</span> → sum()',
    '<span class="t-cmd">  python reverse("x")</span> → reverse string',
    '',
    '<span class="t-warn">── JAVA ──</span>',
    '<span class="t-cmd">  java</span>                → Ver classes disponíveis',
    '<span class="t-cmd">  java HelloWorld</span>     → Hello World',
    '<span class="t-cmd">  java Fibonacci</span>      → Fibonacci em Java',
    '<span class="t-cmd">  java BubbleSort</span>     → Algoritmo de ordenação',
    '<span class="t-cmd">  java StringOps</span>      → Operações com String',
    '<span class="t-cmd">  java Recursion</span>      → Recursão / Fatorial',
    '',
    '<span class="t-warn">── ALGORITMOS ──</span>',
    '<span class="t-cmd">  fib &lt;n&gt;</span>            → Sequência de Fibonacci',
    '<span class="t-cmd">  fact &lt;n&gt;</span>           → Fatorial de n',
    '<span class="t-cmd">  primes &lt;n&gt;</span>         → Crivo de Eratóstenes',
    '<span class="t-cmd">  sort &lt;n1 n2 ...&gt;</span>   → Bubble Sort passo a passo',
    '<span class="t-cmd">  bsearch &lt;t&gt; &lt;arr&gt;</span>  → Busca Binária',
    '<span class="t-cmd">  palindrome &lt;str&gt;</span>   → Verificar palíndromo',
    '<span class="t-cmd">  anagram &lt;w1&gt; &lt;w2&gt;</span>  → Verificar anagrama',
    '<span class="t-cmd">  reverse &lt;str&gt;</span>      → Reverter string',
    '<span class="t-cmd">  matrix</span>              → Multiplicação de matrizes',
    '',
    '<span class="t-warn">── SISTEMA ──</span>',
    '<span class="t-cmd">  clear</span>               → Limpar terminal',
    '<span class="t-cmd">  exit</span>                → Fechar terminal',
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
    '  🔥 Sistema PDV         → Flask + PostgreSQL',
    '  📊 Dashboard Analytics → Pandas + Python',
    '  🤖 IA Automation       → Claude API + Flask',
    '  🚌 SEMOB Web System    → Python + JavaScript',
  ],

  contact: () => [
    '<span class="t-info">Contatos:</span>',
    '  GitHub:   github.com/dev-markin',
    '  LinkedIn: linkedin.com/in/marcos-lopes-b99a47201',
    '  Email:    marcosr10oficial@hotmail.com',
  ],

  stack: () => [
    '<span class="t-info">╔══════════════════════════════════════╗</span>',
    '<span class="t-info">║  FULL STACK + DATA + IA              ║</span>',
    '<span class="t-info">╚══════════════════════════════════════╝</span>',
    '',
    '<span class="t-warn">Backend:</span>  Python (Flask) | Java | APIs REST',
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

  // ── PYTHON REPL ──
  python: (args) => {
    if (!args.length) return [
      '<span style="color:#fbbf24">Python 3.12.0 (markin-env) — Simulador interativo</span>',
      '<span class="t-info">Exemplos que você pode rodar:</span>',
      '',
      '<span class="t-cmd">  python print("Hello, MARKIN!")</span>',
      '<span class="t-cmd">  python fib(10)</span>',
      '<span class="t-cmd">  python fact(7)</span>',
      '<span class="t-cmd">  python primes(30)</span>',
      '<span class="t-cmd">  python range(8)</span>',
      '<span class="t-cmd">  python 2 ** 10</span>',
      '<span class="t-cmd">  python sum([1,2,3,4,5])</span>',
      '<span class="t-cmd">  python reverse("markin")</span>',
    ];
    const expr = args.join(' ');

    // print("...")
    const printM = expr.match(/^print\(["'](.*?)["']\)$/i);
    if (printM) return [`<span class="t-info">>>> ${expr}</span>`, printM[1]];

    // fib(n)
    const fibM = expr.match(/^fib\((\d+)\)$/i);
    if (fibM) {
      const s = _fib(parseInt(fibM[1]));
      return [`<span class="t-info">>>> fib(${fibM[1]})</span>`, `<span class="t-warn">[${s.join(', ')}]</span>`];
    }

    // fact(n) / factorial(n)
    const factM = expr.match(/^fact(?:orial)?\((\d+)\)$/i);
    if (factM) {
      const [n, r] = _fact(parseInt(factM[1]));
      return [`<span class="t-info">>>> fact(${n})</span>`, `<span class="t-warn">${r}</span>`];
    }

    // primes(n)
    const primesM = expr.match(/^primes\((\d+)\)$/i);
    if (primesM) {
      const p = _sieve(parseInt(primesM[1]));
      return [`<span class="t-info">>>> primes(${primesM[1]})</span>`, `<span class="t-warn">[${p.join(', ')}]</span>`];
    }

    // range(n)
    const rangeM = expr.match(/^range\((\d+)\)$/i);
    if (rangeM) {
      const n = Math.min(parseInt(rangeM[1]), 30);
      return [`<span class="t-info">>>> range(${rangeM[1]})</span>`, `<span class="t-warn">[${Array.from({length:n},(_,i)=>i).join(', ')}]</span>`];
    }

    // 2 ** 10
    const powM = expr.match(/^(\d+)\s*\*\*\s*(\d+)$/);
    if (powM) return [`<span class="t-info">>>> ${expr}</span>`, `<span class="t-warn">${Math.pow(parseInt(powM[1]), parseInt(powM[2]))}</span>`];

    // reverse("str")
    const revM = expr.match(/^reverse\(["'](.*?)["']\)$/i);
    if (revM) return [`<span class="t-info">>>> reverse("${revM[1]}")</span>`, `<span class="t-warn">'${revM[1].split('').reverse().join('')}'</span>`];

    // sum([...])
    const sumM = expr.match(/^sum\(\[([^\]]+)\]\)$/i);
    if (sumM) {
      const nums = sumM[1].split(',').map(n => parseFloat(n.trim())).filter(n => !isNaN(n));
      return [`<span class="t-info">>>> sum([${nums.join(', ')}])</span>`, `<span class="t-warn">${nums.reduce((a, b) => a + b, 0)}</span>`];
    }

    // expressão matemática pura (apenas dígitos e operadores)
    if (/^[\d\s\+\-\*\/\(\)\.%]+$/.test(expr)) {
      try {
        const r = Function('"use strict"; return (' + expr + ')')();
        return [`<span class="t-info">>>> ${expr}</span>`, `<span class="t-warn">${r}</span>`];
      } catch (e) {}
    }

    return [
      `<span class="t-info">>>> ${expr}</span>`,
      `<span class="t-err">NameError: '${args[0]}' não reconhecido.</span>`,
      `<span class="t-info">Dica: digite 'python' para ver os exemplos.</span>`,
    ];
  },

  // ── JAVA ──
  java: (args) => {
    const cls = (args[0] || '').toLowerCase();
    if (!cls) return [
      '<span style="color:#f97316">☕  Java 21 LTS (OpenJDK) — markin-jvm</span>',
      '<span class="t-info">Classes disponíveis para executar:</span>',
      '',
      '<span class="t-cmd">  java HelloWorld</span>    → Hello World clássico',
      '<span class="t-cmd">  java Fibonacci</span>     → Sequência de Fibonacci',
      '<span class="t-cmd">  java BubbleSort</span>    → Algoritmo de ordenação',
      '<span class="t-cmd">  java StringOps</span>     → Operações com String',
      '<span class="t-cmd">  java Recursion</span>     → Recursão / Fatorial',
    ];

    if (cls === 'helloworld') return [
      '<span class="t-info">$ javac HelloWorld.java</span>',
      '<span style="color:#00ff88">✓  HelloWorld.class gerado</span>',
      '<span class="t-info">$ java HelloWorld</span>',
      '',
      '<span style="color:#94a3b8">public class HelloWorld {</span>',
      '<span style="color:#94a3b8">  public static void main(String[] args) {</span>',
      '<span style="color:#fbbf24">    System.out.println("Hello, World! — MARKIN.dev");</span>',
      '<span style="color:#94a3b8">  }</span>',
      '<span style="color:#94a3b8">}</span>',
      '',
      '<span style="color:#00ff88">OUTPUT → Hello, World! — MARKIN.dev</span>',
    ];

    if (cls === 'fibonacci') {
      const seq = _fib(10);
      return [
        '<span class="t-info">$ javac Fibonacci.java  →  ✓</span>',
        '<span class="t-info">$ java Fibonacci</span>',
        '',
        '<span style="color:#94a3b8">int[] f = new int[11];</span>',
        '<span style="color:#94a3b8">f[0]=0; f[1]=1;</span>',
        '<span style="color:#fbbf24">for (int i=2; i&lt;=10; i++)</span>',
        '<span style="color:#fbbf24">  f[i] = f[i-1] + f[i-2];</span>',
        '<span style="color:#fbbf24">System.out.println(Arrays.toString(f));</span>',
        '',
        `<span style="color:#00ff88">OUTPUT → [${seq.join(', ')}]</span>`,
      ];
    }

    if (cls === 'bubblesort') {
      const input = [64, 34, 25, 12, 22, 11, 90];
      const { sorted, steps } = _bubbleSort(input);
      return [
        '<span class="t-info">$ javac BubbleSort.java  →  ✓</span>',
        '<span class="t-info">$ java BubbleSort</span>',
        '',
        `<span style="color:#94a3b8">int[] arr = {${input.join(', ')}};</span>`,
        '<span style="color:#fbbf24">for (int i=0; i&lt;n-1; i++)</span>',
        '<span style="color:#fbbf24">  for (int j=0; j&lt;n-i-1; j++)</span>',
        '<span style="color:#fbbf24">    if (arr[j] &gt; arr[j+1]) swap(arr, j, j+1);</span>',
        '',
        `<span class="t-info">Entrada:  [${input.join(', ')}]</span>`,
        `<span style="color:#00ff88">OUTPUT  → [${sorted.join(', ')}]</span>`,
        `<span class="t-info">Comparações: ${steps.length} | O(n²)</span>`,
      ];
    }

    if (cls === 'stringops') return [
      '<span class="t-info">$ javac StringOps.java  →  ✓</span>',
      '<span class="t-info">$ java StringOps</span>',
      '',
      '<span style="color:#94a3b8">String s = "MARKIN.DEV";</span>',
      '<span style="color:#fbbf24">s.length()          → 10</span>',
      '<span style="color:#fbbf24">s.toLowerCase()     → "markin.dev"</span>',
      '<span style="color:#fbbf24">s.substring(0, 6)   → "MARKIN"</span>',
      '<span style="color:#fbbf24">s.contains("DEV")   → true</span>',
      '<span style="color:#fbbf24">s.replace(".", "-") → "MARKIN-DEV"</span>',
      '<span style="color:#fbbf24">s.charAt(0)         → \'M\'</span>',
      '',
      '<span style="color:#00ff88">✓  Executado com sucesso</span>',
    ];

    if (cls === 'recursion') {
      const [n, r] = _fact(6);
      return [
        '<span class="t-info">$ javac Recursion.java  →  ✓</span>',
        '<span class="t-info">$ java Recursion</span>',
        '',
        '<span style="color:#94a3b8">static int factorial(int n) {</span>',
        '<span style="color:#fbbf24">  if (n &lt;= 1) return 1;</span>',
        '<span style="color:#fbbf24">  return n * factorial(n - 1);</span>',
        '<span style="color:#94a3b8">}</span>',
        '',
        '<span class="t-info">Trace: factorial(6)</span>',
        '<span class="t-info">  factorial(6) → 6 × factorial(5)</span>',
        '<span class="t-info">    factorial(5) → 5 × factorial(4)</span>',
        '<span class="t-info">      factorial(4) → 4 × factorial(3)</span>',
        '<span class="t-info">        factorial(3) → 3 × factorial(2)</span>',
        '<span class="t-info">          factorial(2) → 2 × factorial(1)</span>',
        '<span class="t-info">            factorial(1) → 1  [base case]</span>',
        '',
        `<span style="color:#bf00ff">Retorno: 6×5×4×3×2×1 = ${r}</span>`,
        `<span style="color:#00ff88">OUTPUT → ${r}</span>`,
      ];
    }

    return [
      `<span class="t-err">Classe '${args[0]}' não encontrada.</span>`,
      `<span class="t-info">Disponíveis: HelloWorld · Fibonacci · BubbleSort · StringOps · Recursion</span>`,
    ];
  },

  // ── ALGORITMOS ──
  fib: (args) => {
    const n = Math.min(Math.max(parseInt(args[0]) || 10, 1), 20);
    const seq = _fib(n);
    return [
      `<span class="t-info">Sequência de Fibonacci — n = ${n}</span>`,
      `<span class="t-warn">[${seq.join(', ')}]</span>`,
      '',
      `<span class="t-info">Último valor: ${seq[seq.length - 1]}</span>`,
      `<span class="t-info">Complexidade: O(n) | Espaço: O(n)</span>`,
    ];
  },

  fact: (args) => {
    const [n, r] = _fact(parseInt(args[0]) || 5);
    const formula = n <= 1 ? '1' : Array.from({length: n}, (_, i) => i + 1).join(' × ');
    return [
      `<span class="t-info">Fatorial — n = ${n}</span>`,
      `<span class="t-warn">${n}! = ${formula} = ${r}</span>`,
      '',
      `<span class="t-info">Complexidade: O(n)</span>`,
    ];
  },

  primes: (args) => {
    const n = Math.min(Math.max(parseInt(args[0]) || 30, 2), 100);
    const p = _sieve(n);
    return [
      `<span class="t-info">Crivo de Eratóstenes — até ${n}</span>`,
      `<span class="t-warn">[${p.join(', ')}]</span>`,
      '',
      `<span class="t-info">Total: ${p.length} primos | Complexidade: O(n log log n)</span>`,
    ];
  },

  sort: (args) => {
    let nums = args.map(n => parseInt(n)).filter(n => !isNaN(n));
    if (!nums.length) nums = [64, 34, 25, 12, 22, 11, 90];
    const { sorted, steps } = _bubbleSort(nums);
    const stride = Math.max(1, Math.ceil(steps.length / 5));
    const show = steps.filter((_, i) => i % stride === 0).slice(0, 5);
    return [
      `<span class="t-info">Bubble Sort</span>`,
      `<span class="t-info">Entrada:  [${nums.join(', ')}]</span>`,
      '',
      ...show.map((s, i) => `<span class="t-info">  Passo ${i + 1}: [${s.join(', ')}]</span>`),
      '',
      `<span class="t-warn">Saída:    [${sorted.join(', ')}]</span>`,
      `<span class="t-info">Comparações: ${steps.length} | Complexidade: O(n²)</span>`,
    ];
  },

  bsearch: (args) => {
    const target = parseInt(args[0]);
    const arr = args.slice(1).map(n => parseInt(n)).filter(n => !isNaN(n)).sort((a, b) => a - b);
    if (isNaN(target) || !arr.length) return [
      '<span class="t-info">Uso: bsearch &lt;alvo&gt; &lt;n1 n2 n3...&gt;</span>',
      '<span class="t-info">Ex:  bsearch 7 1 3 5 7 9 11 13</span>',
    ];
    let lo = 0, hi = arr.length - 1, steps = 0, found = -1;
    const log = [];
    while (lo <= hi) {
      const mid = Math.floor((lo + hi) / 2);
      steps++;
      const dir = arr[mid] === target ? '== ✓' : arr[mid] < target ? '&lt; → direita' : '&gt; → esquerda';
      log.push(`<span class="t-info">  Passo ${steps}: arr[${mid}]=${arr[mid]} ${dir}</span>`);
      if (arr[mid] === target) { found = mid; break; }
      else if (arr[mid] < target) lo = mid + 1;
      else hi = mid - 1;
    }
    return [
      `<span class="t-info">Binary Search — alvo: ${target}</span>`,
      `<span class="t-info">Array: [${arr.join(', ')}]</span>`,
      '',
      ...log,
      '',
      found >= 0
        ? `<span style="color:#00ff88">✓ Encontrado no índice ${found} em ${steps} passo(s)!</span>`
        : `<span class="t-err">✗ ${target} não encontrado após ${steps} passo(s).</span>`,
      `<span class="t-info">Complexidade: O(log n)</span>`,
    ];
  },

  palindrome: (args) => {
    const word = args.join('').toLowerCase();
    if (!word) return [
      '<span class="t-info">Uso: palindrome &lt;palavra&gt;</span>',
      '<span class="t-info">Ex:  palindrome racecar</span>',
    ];
    const rev = word.split('').reverse().join('');
    return [
      `<span class="t-info">Original: "${word}"</span>`,
      `<span class="t-info">Reverso:  "${rev}"</span>`,
      '',
      word === rev
        ? `<span style="color:#00ff88">✓ "${word}" É um palíndromo! 🏆</span>`
        : `<span class="t-err">✗ "${word}" NÃO é um palíndromo.</span>`,
    ];
  },

  reverse: (args) => {
    const text = args.join(' ');
    if (!text) return ['<span class="t-info">Uso: reverse &lt;texto&gt;</span>'];
    return [
      `<span class="t-info">Original: "${text}"</span>`,
      `<span class="t-warn">Reverso:  "${text.split('').reverse().join('')}"</span>`,
    ];
  },

  anagram: (args) => {
    const [w1, w2] = [args[0] || '', args[1] || ''];
    if (!w1 || !w2) return [
      '<span class="t-info">Uso: anagram &lt;palavra1&gt; &lt;palavra2&gt;</span>',
      '<span class="t-info">Ex:  anagram listen silent</span>',
    ];
    const norm = s => s.toLowerCase().split('').sort().join('');
    return [
      `<span class="t-info">Palavra 1: "${w1}" → sorted: "${norm(w1)}"</span>`,
      `<span class="t-info">Palavra 2: "${w2}" → sorted: "${norm(w2)}"</span>`,
      '',
      norm(w1) === norm(w2)
        ? `<span style="color:#00ff88">✓ São anagramas! 🏆</span>`
        : `<span class="t-err">✗ NÃO são anagramas.</span>`,
    ];
  },

  matrix: () => [
    '<span class="t-info">Multiplicação de Matrizes (2×2)</span>',
    '',
    '<span style="color:#94a3b8">A = [[1, 2],    B = [[5, 6],</span>',
    '<span style="color:#94a3b8">     [3, 4]]         [7, 8]]</span>',
    '',
    '<span class="t-info">Calculando A × B...</span>',
    '<span style="color:#fbbf24">C[0][0] = 1×5 + 2×7 = 5 + 14 = 19</span>',
    '<span style="color:#fbbf24">C[0][1] = 1×6 + 2×8 = 6 + 16 = 22</span>',
    '<span style="color:#fbbf24">C[1][0] = 3×5 + 4×7 = 15 + 28 = 43</span>',
    '<span style="color:#fbbf24">C[1][1] = 3×6 + 4×8 = 18 + 32 = 50</span>',
    '',
    '<span style="color:#00ff88">C = [[19, 22],</span>',
    '<span style="color:#00ff88">     [43, 50]]</span>',
    '',
    '<span class="t-info">Complexidade: O(n³)</span>',
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
    SFX.termKey();
    if (e.key === 'Enter') {
      const raw = input.value.trim();
      if (!raw) return;
      const parts = raw.split(/\s+/);
      const base  = parts[0].toLowerCase();
      const args  = parts.slice(1);
      terminalWrite([`<span class="t-cmd">marcos@markin.dev:~$ ${raw}</span>`]);
      const fn = terminalCommands[base];
      if (fn) {
        const result = fn(args, raw);
        if (result && result.length) terminalWrite(result);
      } else {
        terminalWrite([`<span class="t-err">Comando não encontrado: "${base}". Digite 'help' para ver os comandos.</span>`]);
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
      '<span class="t-info">Digite \'help\' para listar os comandos.</span>',
      '<span class="t-info">Experimente: python fib(10)  ·  java Fibonacci  ·  sort 5 3 1 4 2</span>',
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
  SFX.click();
  document.getElementById('pdv-modal').classList.remove('hidden');
}

function closePDVDemo() {
  SFX.click();
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
//  SOUND TOGGLE
// ──────────────────────────────────────────
function initSoundToggle() {
  const btn = document.getElementById('sound-toggle');
  if (!btn) return;
  btn.addEventListener('click', () => {
    SFX.enabled = !SFX.enabled;
    btn.textContent = SFX.enabled ? '🔊' : '🔇';
    btn.classList.toggle('muted', !SFX.enabled);
    btn.title = SFX.enabled ? 'Mutar Sons [M]' : 'Ativar Sons [M]';
    if (SFX.enabled) SFX.chime();
  });
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
  SFX.chime();
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
  initSoundToggle();

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
  if ((e.key === 'm' || e.key === 'M') &&
      document.activeElement.tagName !== 'INPUT' &&
      document.activeElement.tagName !== 'TEXTAREA') {
    document.getElementById('sound-toggle')?.click();
  }
});

// ──────────────────────────────────────────
//  START
// ──────────────────────────────────────────
document.addEventListener('DOMContentLoaded', runBootSequence);

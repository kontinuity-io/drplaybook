// app.js — SPA router for drplaybook.com

// ── Mermaid init ──────────────────────────────────────────────────────────
mermaid.initialize({
  startOnLoad: false,
  theme: 'dark',
  themeVariables: {
    primaryColor: '#f59e0b',
    primaryTextColor: '#e8e8e8',
    primaryBorderColor: '#d97706',
    lineColor: '#555',
    secondaryColor: '#1e1e1e',
    tertiaryColor: '#171717',
    background: '#101010',
    mainBkg: '#171717',
    nodeBorder: '#333',
    clusterBkg: '#1e1e1e',
    titleColor: '#e8e8e8',
    edgeLabelBackground: '#1e1e1e',
  },
  fontFamily: 'system-ui, -apple-system, sans-serif',
  fontSize: 13,
});

// ── Marked config ─────────────────────────────────────────────────────────
const renderer = new marked.Renderer();

renderer.code = function (code, lang) {
  if (lang === 'mermaid') {
    return `<div class="mermaid-wrap"><div class="mermaid">${escapeHtml(code)}</div></div>`;
  }
  const validLang = lang && hljs.getLanguage(lang) ? lang : 'plaintext';
  const highlighted = hljs.highlight(code, { language: validLang, ignoreIllegals: true }).value;
  const langLabel = lang || 'text';
  return `<div class="code-block">
    <div class="code-block-header">
      <span class="code-lang">${langLabel}</span>
      <button class="copy-btn" onclick="copyCode(this, event)">Copy</button>
    </div>
    <pre><code class="hljs language-${validLang}">${highlighted}</code></pre>
  </div>`;
};

renderer.table = function (header, body) {
  return `<div style="overflow-x:auto"><table>${header}${body}</table></div>`;
};

marked.use({ renderer, breaks: false, gfm: true });

// ── Utilities ─────────────────────────────────────────────────────────────
function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

const STATUS_LABELS = { complete: 'Available', progress: 'In Progress', planned: 'Planned' };

function statusLabel(status) {
  return STATUS_LABELS[status] || status;
}

function statusDot(status) {
  return `<span class="status-dot ${status}"></span>`;
}

function statusPill(status) {
  const label = statusLabel(status);
  const icon = status === 'complete' ? '✓' : status === 'progress' ? '◉' : '○';
  return `<span class="status-pill ${status}">${icon} ${label}</span>`;
}

window.copyCode = function (btn, e) {
  if (e) e.stopPropagation();
  const pre = btn.closest('.code-block').querySelector('code');
  navigator.clipboard.writeText(pre.textContent).then(() => {
    btn.textContent = 'Copied!';
    btn.classList.add('copied');
    setTimeout(() => { btn.textContent = 'Copy'; btn.classList.remove('copied'); }, 2000);
  });
};

async function runMermaid() {
  const nodes = document.querySelectorAll('.mermaid:not([data-processed])');
  if (!nodes.length) return;
  try {
    await mermaid.run({ nodes });
  } catch (e) {
    console.warn('Mermaid render error:', e);
  }
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'instant' });
}

// ── Router ─────────────────────────────────────────────────────────────────
function parseHash() {
  const hash = decodeURIComponent(window.location.hash.slice(1));
  if (!hash || hash === 'chapters') return { view: 'home' };

  // #patterns or #patterns/slug
  const pm = hash.match(/^patterns(?:\/([a-z0-9-]+))?$/);
  if (pm) return { view: pm[1] ? 'pattern' : 'patterns-home', patternSlug: pm[1] };

  // #chapter/02 or #chapter/02/05
  const m = hash.match(/^chapter\/(\d+)(?:\/(\d+))?$/);
  if (m) {
    return { view: m[2] ? 'lesson' : 'chapter', chapterId: m[1], lessonId: m[2] };
  }
  return { view: 'home' };
}

function route() {
  const { view, chapterId, lessonId, patternSlug } = parseHash();
  const app = document.getElementById('app');

  if (!window.CURRICULUM) {
    app.innerHTML = `<div class="loading">Run <code>node site/build.js</code> to generate curriculum data, then serve with <code>npx serve .</code></div>`;
    return;
  }

  scrollToTop();

  if (view === 'lesson') {
    renderLesson(chapterId, lessonId);
  } else if (view === 'chapter') {
    renderChapter(chapterId);
  } else if (view === 'patterns-home') {
    renderPatternsCatalog();
  } else if (view === 'pattern') {
    renderPattern(patternSlug);
  } else {
    renderHome();
  }
}

// ── Home page ─────────────────────────────────────────────────────────────
function renderHome() {
  const { stats, chapters } = window.CURRICULUM;
  const app = document.getElementById('app');

  const totalHours = chapters.reduce((s, c) => {
    const h = parseFloat(c.time.replace(/[^0-9.]/g, ''));
    return s + (isNaN(h) ? 0 : h);
  }, 0);

  app.innerHTML = `
    <section class="hero">
      <div class="hero-badge">Open Source · Apache 2.0 · by Kontinuity Labs</div>
      <h1>The <em>practitioner's</em> DR field manual</h1>
      <p class="hero-sub">Eight chapters from RPO fundamentals to active incident response. Every lesson produces a downloadable runbook, checklist, or policy template you can use immediately.</p>
      <div class="stats-bar">
        <div class="stat">
          <div class="stat-value">${stats.totalChapters}</div>
          <div class="stat-label">Chapters</div>
        </div>
        <div class="stat">
          <div class="stat-value">${stats.totalLessons}</div>
          <div class="stat-label">Lessons</div>
        </div>
        <div class="stat">
          <div class="stat-value">~${Math.round(totalHours)}h</div>
          <div class="stat-label">Est. Time</div>
        </div>
        <div class="stat">
          <div class="stat-value">${stats.completeLessons}</div>
          <div class="stat-label">Published</div>
        </div>
      </div>
    </section>

    <section class="phases-section" id="chapters">
      <div class="section-header">
        <span class="section-title">All Chapters</span>
        <div class="legend">
          <div class="legend-item"><div class="legend-dot complete"></div> Available</div>
          <div class="legend-item"><div class="legend-dot progress"></div> In Progress</div>
          <div class="legend-item"><div class="legend-dot planned"></div> Planned</div>
        </div>
      </div>
      <div class="phase-grid">
        ${chapters.map(chapterCard).join('')}
      </div>
    </section>
  `;
}

function chapterCard(chapter) {
  const done = chapter.lessons.filter(l => l.status === 'complete').length;
  const total = chapter.lessons.length;
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;
  const clickable = chapter.status !== 'planned' || chapter.slug;
  const href = clickable ? `#chapter/${chapter.id}` : 'javascript:void(0)';

  return `
    <div class="phase-card-wrap">
      <a class="phase-card ${chapter.status}" href="${href}" style="display:block; text-decoration:none;">
        <div class="phase-card-num">${chapter.id}</div>
        <div class="phase-card-status">
          <span class="status-dot ${chapter.status}"></span>
          <span class="status-label ${chapter.status}">${statusLabel(chapter.status)}</span>
        </div>
        <div class="phase-card-title">${chapter.title}</div>
        <div class="phase-card-desc">${chapter.description}</div>
        <div class="phase-progress">
          <div class="phase-progress-bar">
            <div class="phase-progress-fill" style="width:${pct}%"></div>
          </div>
          <div class="phase-progress-text">${done} / ${total} lessons · ${chapter.time}</div>
        </div>
      </a>
    </div>
  `;
}

// ── Chapter page ──────────────────────────────────────────────────────────
function renderChapter(chapterId) {
  const chapter = window.CURRICULUM.chapters.find(c => c.id === chapterId.padStart(2, '0'));
  if (!chapter) { renderNotFound(); return; }

  const app = document.getElementById('app');
  const done = chapter.lessons.filter(l => l.status === 'complete').length;

  app.innerHTML = `
    <div class="phase-page">
      <div class="breadcrumb">
        <a href="#">Home</a>
        <span class="breadcrumb-sep">/</span>
        <span>Chapter ${chapter.id}</span>
      </div>

      <div class="phase-header">
        <div class="phase-num-badge">Chapter ${chapter.id}</div>
        <h1>${chapter.title}</h1>
        <div class="phase-header-meta">
          ${statusPill(chapter.status)}
          <span class="tag">${done}/${chapter.lessons.length} lessons</span>
          <span class="tag">${chapter.time}</span>
        </div>
        <p class="phase-desc">${chapter.description}</p>
      </div>

      <table class="lesson-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Lesson</th>
            <th>Status</th>
            <th style="text-align:right">Time</th>
          </tr>
        </thead>
        <tbody>
          ${chapter.lessons.map(lesson => lessonRow(chapter, lesson)).join('')}
        </tbody>
      </table>
    </div>
  `;
}

function lessonRow(chapter, lesson) {
  const canOpen = lesson.status !== 'planned' && lesson.slug;
  const rowClass = canOpen ? 'clickable' : 'planned';
  const onclick = canOpen
    ? `onclick="window.location.hash='chapter/${chapter.id}/${lesson.id}'"`
    : '';
  return `
    <tr class="${lesson.status} ${rowClass}" ${onclick}>
      <td class="lesson-num">${lesson.id}</td>
      <td class="lesson-title-cell">${lesson.title}</td>
      <td>${statusPill(lesson.status)}</td>
      <td class="lesson-time">${lesson.time}</td>
    </tr>
  `;
}

// ── Lesson page ────────────────────────────────────────────────────────────
async function renderLesson(chapterId, lessonId) {
  const chapter = window.CURRICULUM.chapters.find(c => c.id === chapterId.padStart(2, '0'));
  if (!chapter) { renderNotFound(); return; }

  const lessonIdx = chapter.lessons.findIndex(l => l.id === lessonId.padStart(2, '0'));
  const lesson = chapter.lessons[lessonIdx];
  if (!lesson) { renderNotFound(); return; }

  if (!lesson.slug) {
    renderNotBuilt(chapter, lesson);
    return;
  }

  const app = document.getElementById('app');
  app.innerHTML = `
    <div class="sidebar-overlay" onclick="closeSidebar()"></div>
    <div class="lesson-layout">
      <aside class="lesson-sidebar">
        <div class="sidebar-phase-title">Chapter ${chapter.id}: ${chapter.title}</div>
        ${chapter.lessons.map(l => sidebarItem(chapter, lesson, l)).join('')}
      </aside>
      <div class="lesson-content">
        <div class="lesson-content-inner">
          <button class="mobile-toc-btn" onclick="openSidebar()" aria-label="Lessons">☰ Lessons</button>
          <div class="breadcrumb">
            <a href="#">Home</a>
            <span class="breadcrumb-sep">/</span>
            <a href="#chapter/${chapter.id}">Chapter ${chapter.id}</a>
            <span class="breadcrumb-sep">/</span>
            <span>${lesson.title}</span>
          </div>
          <div id="lesson-body" class="md-body"><div class="loading">Loading lesson…</div></div>
          ${lessonNavButtons(chapter, lessonIdx)}
        </div>
      </div>
    </div>
  `;

  await loadLessonContent(chapter, lesson);
}

function sidebarItem(chapter, currentLesson, lesson) {
  const active = lesson.id === currentLesson.id ? 'active' : '';
  const planned = lesson.status === 'planned' ? 'planned' : '';
  const onclick = lesson.slug && lesson.status !== 'planned'
    ? `onclick="closeSidebar(); window.location.hash='chapter/${chapter.id}/${lesson.id}'"`
    : '';
  const statusIcon = lesson.status === 'complete' ? '✓' : lesson.status === 'progress' ? '◉' : '○';
  return `
    <div class="sidebar-lesson ${active} ${planned}" ${onclick}>
      <span class="sidebar-lesson-num">${lesson.id}</span>
      <span style="flex:1">${lesson.title}</span>
      <span class="sidebar-status" style="font-size:11px; color:${lesson.status === 'complete' ? 'var(--green)' : 'var(--text-faint)'}">${statusIcon}</span>
    </div>
  `;
}

function lessonNavButtons(chapter, idx) {
  const prev = chapter.lessons[idx - 1];
  const next = chapter.lessons[idx + 1];
  const prevBtn = prev
    ? `<div class="lesson-nav-btn prev" onclick="window.location.hash='chapter/${chapter.id}/${prev.id}'">
        <span class="lesson-nav-dir">← Previous</span>
        <span class="lesson-nav-title">${prev.title}</span>
      </div>`
    : `<div></div>`;
  const nextBtn = next && next.status !== 'planned'
    ? `<div class="lesson-nav-btn next" onclick="window.location.hash='chapter/${chapter.id}/${next.id}'">
        <span class="lesson-nav-dir">Next →</span>
        <span class="lesson-nav-title">${next.title}</span>
      </div>`
    : `<div></div>`;
  return `<div class="lesson-nav">${prevBtn}${nextBtn}</div>`;
}

async function loadLessonContent(chapter, lesson) {
  const dir = `chapters/${chapter.slug}/${lesson.slug}/docs`;
  const mdPath = `${dir}/en.md`;
  const body = document.getElementById('lesson-body');

  try {
    const res = await fetch(mdPath);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const md = await res.text();
    body.innerHTML = renderMarkdown(md);
    await runMermaid();
    hljs.highlightAll();
  } catch (e) {
    body.innerHTML = `
      <div class="not-built" style="text-align:left; padding:0">
        <p style="color:var(--text-muted)">Could not load lesson content from <code>${mdPath}</code>.</p>
        <p style="color:var(--text-muted); font-size:13px; margin-top:8px">If running locally, use a static server: <code>npx serve .</code></p>
      </div>
    `;
  }
}

function renderMarkdown(md) {
  const metaMatch = md.match(/^(\*\*(?:Type|Tools?|Prerequisites?|Time|Chapter):\*\*[^\n]*\n?)+/m);
  let metaHtml = '';
  let cleanMd = md;

  if (metaMatch) {
    const metaBlock = metaMatch[0];
    cleanMd = md.replace(metaBlock, '').trimStart();
    const lines = metaBlock.trim().split('\n').filter(Boolean);
    const tags = lines.map(line => {
      const m = line.match(/\*\*(.+?):\*\*\s*(.*)/);
      if (!m) return '';
      return `<span class="meta-tag"><strong>${m[1]}:</strong> ${m[2]}</span>`;
    }).join('');
    if (tags) metaHtml = `<div class="lesson-meta-bar">${tags}</div>`;
  }

  const html = marked.parse(cleanMd);
  return metaHtml + `<div>${html}</div>`;
}

// ── Not built / 404 ────────────────────────────────────────────────────────
function renderNotBuilt(chapter, lesson) {
  const app = document.getElementById('app');
  app.innerHTML = `
    <div class="not-built">
      <div class="not-built-icon">📐</div>
      <h2>Not written yet</h2>
      <p><strong>${lesson.title}</strong> is on the roadmap but hasn't been authored yet. Star the repo to get notified when it drops.</p>
      <div style="display:flex; gap:12px; justify-content:center; flex-wrap:wrap">
        <a class="btn" href="#chapter/${chapter.id}">← Back to Chapter ${chapter.id}</a>
        <a class="btn" href="https://github.com/kontinuity-io/drplaybook"
           target="_blank" rel="noopener">Star on GitHub ↗</a>
      </div>
    </div>
  `;
}

function renderNotFound() {
  const app = document.getElementById('app');
  app.innerHTML = `
    <div class="not-built">
      <div class="not-built-icon">🔍</div>
      <h2>Page not found</h2>
      <p>That chapter or lesson doesn't exist.</p>
      <a class="btn" href="#">← Back to home</a>
    </div>
  `;
}

// ── Patterns catalog ──────────────────────────────────────────────────────

const CATEGORY_LABELS = { workload: 'By Workload', vertical: 'By Industry', topology: 'By Topology' };
const COMPLEXITY_COLORS = { low: 'var(--green)', medium: 'var(--amber)', high: '#ef4444' };

function renderPatternsCatalog(filter) {
  const patterns = (window.CURRICULUM.patterns || []);
  const app = document.getElementById('app');

  const active = filter || 'all';
  const filtered = active === 'all' ? patterns : patterns.filter(p => p.category === active);

  const categories = ['workload', 'vertical', 'topology'];
  const groups = {};
  for (const p of filtered) {
    if (!groups[p.category]) groups[p.category] = [];
    groups[p.category].push(p);
  }

  const filterBtns = ['all', ...categories].map(c => {
    const label = c === 'all' ? 'All' : CATEGORY_LABELS[c] || c;
    return `<button class="pattern-filter-btn ${active === c ? 'active' : ''}" onclick="filterPatterns('${c}')">${label}</button>`;
  }).join('');

  const sections = Object.entries(groups).map(([cat, items]) => `
    <div class="patterns-group">
      <div class="patterns-group-label">${CATEGORY_LABELS[cat] || cat}</div>
      <div class="patterns-grid">
        ${items.map(patternCard).join('')}
      </div>
    </div>
  `).join('');

  app.innerHTML = `
    <section class="hero" style="padding-bottom:32px">
      <div class="hero-badge">Reference Catalog · ${patterns.length} Patterns</div>
      <h1>DR <em>Pattern</em> Library</h1>
      <p class="hero-sub">Named, reusable DR configurations for specific workloads, industry verticals, and topology combinations. Each pattern shows the full setup as a diagram.</p>
    </section>
    <section class="phases-section">
      <div class="patterns-filter">${filterBtns}</div>
      ${sections || '<p style="color:var(--text-muted);padding:40px 0">No patterns in this category yet.</p>'}
    </section>
  `;
}

window.filterPatterns = function(cat) { renderPatternsCatalog(cat); };

function patternCard(p) {
  const color = COMPLEXITY_COLORS[p.complexity] || 'var(--text-muted)';
  return `
    <a class="pattern-card" href="#patterns/${p.slug}">
      <div class="pattern-card-top">
        <div class="pattern-card-title">${p.title}</div>
        <div class="pattern-complexity" style="color:${color}">${p.complexity}</div>
      </div>
      <div class="pattern-card-desc">${p.description}</div>
      <div class="pattern-card-meta">
        ${p.rpo_typical ? `<span>RPO ${p.rpo_typical}</span>` : ''}
        ${p.rto_typical ? `<span>RTO ${p.rto_typical}</span>` : ''}
        ${p.compliance && p.compliance.length ? `<span>${p.compliance.join(', ')}</span>` : ''}
      </div>
    </a>
  `;
}

async function renderPattern(slug) {
  const pattern = (window.CURRICULUM.patterns || []).find(p => p.slug === slug);
  if (!pattern) { renderNotFound(); return; }

  const app = document.getElementById('app');
  const color = COMPLEXITY_COLORS[pattern.complexity] || 'var(--text-muted)';

  app.innerHTML = `
    <div class="phase-page">
      <div class="breadcrumb">
        <a href="#">Home</a>
        <span class="breadcrumb-sep">/</span>
        <a href="#patterns">Patterns</a>
        <span class="breadcrumb-sep">/</span>
        <span>${pattern.title}</span>
      </div>
      <div class="phase-header">
        <div class="phase-num-badge">${(CATEGORY_LABELS[pattern.category] || pattern.category).toUpperCase()}</div>
        <h1>${pattern.title}</h1>
        <div class="phase-header-meta">
          <span class="tag" style="color:${color};border-color:${color}20">${pattern.complexity} complexity</span>
          ${pattern.rpo_typical ? `<span class="tag">RPO ${pattern.rpo_typical}</span>` : ''}
          ${pattern.rto_typical ? `<span class="tag">RTO ${pattern.rto_typical}</span>` : ''}
          ${pattern.replication_tech ? `<span class="tag">${pattern.replication_tech}</span>` : ''}
          ${pattern.compliance && pattern.compliance.length ? `<span class="tag">${pattern.compliance.join(', ')}</span>` : ''}
        </div>
        <p class="phase-desc">${pattern.description}</p>
      </div>
      <div id="pattern-body" class="md-body"><div class="loading">Loading pattern…</div></div>
    </div>
  `;

  await loadPatternContent(slug);
}

async function loadPatternContent(slug) {
  const mdPath = `patterns/${slug}/docs/en.md`;
  const body = document.getElementById('pattern-body');
  try {
    const res = await fetch(mdPath);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const md = await res.text();
    body.innerHTML = renderMarkdown(md);
    await runMermaid();
    hljs.highlightAll();
  } catch (e) {
    body.innerHTML = `<p style="color:var(--text-muted)">Could not load pattern from <code>${mdPath}</code>.</p>`;
  }
}

// ── Theme toggle ──────────────────────────────────────────────────────────
window.toggleTheme = function () {
  const root = document.documentElement;
  const current = root.getAttribute('data-theme') || 'dark';
  const next = current === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);

  const dark = document.getElementById('hljs-dark');
  const light = document.getElementById('hljs-light');
  if (dark && light) {
    dark.disabled = next === 'light';
    light.disabled = next === 'dark';
  }

  const icon = document.querySelector('#theme-toggle .theme-icon');
  if (icon) icon.textContent = next === 'dark' ? '☀' : '◑';
};

function initTheme() {
  const theme = document.documentElement.getAttribute('data-theme') || 'dark';
  const icon = document.querySelector('#theme-toggle .theme-icon');
  if (icon) icon.textContent = theme === 'dark' ? '☀' : '◑';
}

// ── Mobile sidebar ────────────────────────────────────────────────────────
window.openSidebar = function () {
  document.querySelector('.lesson-sidebar')?.classList.add('open');
  document.querySelector('.sidebar-overlay')?.classList.add('open');
  document.body.style.overflow = 'hidden';
};

window.closeSidebar = function () {
  document.querySelector('.lesson-sidebar')?.classList.remove('open');
  document.querySelector('.sidebar-overlay')?.classList.remove('open');
  document.body.style.overflow = '';
};

// ── Boot ──────────────────────────────────────────────────────────────────
window.addEventListener('hashchange', route);
window.addEventListener('load', () => {
  initTheme();
  if (window.CURRICULUM) {
    route();
  } else {
    document.getElementById('app').innerHTML =
      `<div class="loading">Run <code>node site/build.js</code> to generate curriculum data, then serve with <code>npx serve .</code></div>`;
  }
});

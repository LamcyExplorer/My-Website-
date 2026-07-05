/* =========================================================
   SHARED ACROSS ALL PAGES
   ========================================================= */
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initSearch();
  initReveal();
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});

function initNav() {
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav?.classList.toggle('is-scrolled', window.scrollY > 8);
  }, { passive: true });

  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  navToggle?.addEventListener('click', () => {
    navLinks.classList.toggle('is-open');
  });
}

function initReveal() {
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    revealEls.forEach(el => io.observe(el));
    window._observeReveal = (els) => els.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
    window._observeReveal = (els) => els.forEach(el => el.classList.add('is-visible'));
  }
}

/* ---------------------------------------------------------
   SEARCH OVERLAY — instant client-side search over articles.json
   --------------------------------------------------------- */
let _searchArticles = null;

function initSearch() {
  const openBtn = document.getElementById('searchOpen');
  const overlay = document.getElementById('searchOverlay');
  const closeBtn = document.getElementById('searchClose');
  const input = document.getElementById('searchInput');
  const results = document.getElementById('searchResults');
  if (!overlay || !input) return;

  const open = async () => {
    overlay.classList.add('is-open');
    input.value = '';
    results.innerHTML = '';
    input.focus();
    if (!_searchArticles) {
      try {
        const res = await fetch(rel('data/articles.json'));
        _searchArticles = await res.json();
      } catch (err) {
        _searchArticles = [];
        console.error('Failed to load articles.json for search', err);
      }
    }
  };
  const close = () => overlay.classList.remove('is-open');

  openBtn?.addEventListener('click', open);
  closeBtn?.addEventListener('click', close);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
    if ((e.metaKey || e.ctrlKey) && e.key === '/') { e.preventDefault(); open(); }
  });

  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    if (!q) { results.innerHTML = ''; return; }
    const matches = (_searchArticles || []).filter(a =>
      a.title.toLowerCase().includes(q) ||
      a.category.toLowerCase().includes(q) ||
      a.excerpt.toLowerCase().includes(q) ||
      (a.tags || []).some(t => t.toLowerCase().includes(q))
    ).slice(0, 8);

    if (!matches.length) {
      results.innerHTML = `<div class="search-empty">No articles match "${escapeHtml(input.value)}".</div>`;
      return;
    }
    results.innerHTML = matches.map(a => `
      <a href="${rel('article.html')}?slug=${encodeURIComponent(a.slug)}" class="search-result">
        <span class="sr-cat">${escapeHtml(a.category)}</span>
        <h4>${escapeHtml(a.title)}</h4>
        <p>${escapeHtml(a.excerpt)}</p>
      </a>
    `).join('');
  });
}

/* ---------------------------------------------------------
   HELPERS (shared)
   --------------------------------------------------------- */
function escapeHtml(str = '') {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function formatDate(iso) {
  try { return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }); }
  catch { return iso; }
}

function categorySlug(name) {
  return name.toLowerCase().replace(/\s+/g, '-');
}

// Resolves a root-relative path correctly whether the current page
// lives at the site root (index.html) or is itself a root-level page
// (article.html, category.html, portfolio.html) — all pages sit at
// the same folder depth in this site, so this simply returns the path.
function rel(path) { return path; }

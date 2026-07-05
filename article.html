document.addEventListener('DOMContentLoaded', loadCategory);

async function loadCategory() {
  const params = new URLSearchParams(window.location.search);
  const catSlug = params.get('cat') || '';
  const catName = catSlug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

  document.getElementById('catEyebrow').textContent = 'Category';
  document.getElementById('catTitle').textContent = catName || 'Category';
  document.title = `${catName} — The Writer's Portfolio`;

  let articles = [];
  try {
    const res = await fetch('data/articles.json');
    articles = await res.json();
  } catch (err) {
    document.getElementById('catGrid').innerHTML = `<p class="empty-state">Articles couldn't be loaded right now.</p>`;
    console.error('Failed to load articles.json', err);
    return;
  }

  articles.sort((a, b) => new Date(b.date) - new Date(a.date));
  const items = articles.filter(a => categorySlug(a.category) === catSlug);

  document.getElementById('catCount').textContent = items.length
    ? `${items.length} article${items.length === 1 ? '' : 's'}`
    : 'No articles yet in this category.';

  const grid = document.getElementById('catGrid');
  if (!items.length) {
    grid.innerHTML = `<p class="empty-state">Nothing published here yet — check back soon.</p>`;
    return;
  }

  grid.innerHTML = items.map(a => `
    <article class="article-card reveal">
      <a href="article.html?slug=${encodeURIComponent(a.slug)}">
        <div class="card-thumb ${a.image}"><span class="card-cat-tag">${escapeHtml(a.category)}</span></div>
      </a>
      <h3><a href="article.html?slug=${encodeURIComponent(a.slug)}">${escapeHtml(a.title)}</a></h3>
      <p class="excerpt">${escapeHtml(a.excerpt)}</p>
      <div class="article-meta"><span>${escapeHtml(a.readTime)}</span><span class="dot"></span><span>${formatDate(a.date)}</span></div>
      <a href="article.html?slug=${encodeURIComponent(a.slug)}" class="read-more">Read More
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
      </a>
    </article>
  `).join('');
  window._observeReveal(grid.querySelectorAll('.reveal'));
}

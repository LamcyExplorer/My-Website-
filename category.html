const CATEGORIES = ['Lifestyle', 'Tech', 'News', 'Career', 'Health', 'Kids Sports'];

document.addEventListener('DOMContentLoaded', loadHome);

async function loadHome() {
  let articles = [];
  try {
    const res = await fetch('data/articles.json');
    articles = await res.json();
  } catch (err) {
    console.error('Failed to load articles.json', err);
    document.getElementById('featuredArticle').innerHTML = `<p class="empty-state">Articles couldn't be loaded right now.</p>`;
    return;
  }

  articles.sort((a, b) => new Date(b.date) - new Date(a.date));

  const featured = articles.find(a => a.featured) || articles[0];
  renderFeatured(featured);

  const latest = articles.filter(a => a.slug !== featured.slug).slice(0, 6);
  renderGrid('latestGrid', latest);

  const catSectionsEl = document.getElementById('categorySections');
  catSectionsEl.innerHTML = CATEGORIES.map(cat => `
    <div class="section category-block reveal">
      <div class="container">
        <div class="section-head">
          <div>
            <span class="eyebrow">${escapeHtml(cat)}</span>
            <h2>${escapeHtml(cat)}</h2>
          </div>
          <a href="category.html?cat=${encodeURIComponent(categorySlug(cat))}" class="view-all">View All →</a>
        </div>
        <div class="article-grid" id="grid-${categorySlug(cat)}"></div>
      </div>
    </div>
  `).join('');
  window._observeReveal(catSectionsEl.querySelectorAll('.reveal'));

  CATEGORIES.forEach(cat => {
    const items = articles.filter(a => a.category === cat).slice(0, 3);
    renderGrid(`grid-${categorySlug(cat)}`, items);
  });
}

function renderFeatured(a) {
  const el = document.getElementById('featuredArticle');
  if (!a) { el.innerHTML = `<p class="empty-state">No featured article yet.</p>`; return; }
  el.innerHTML = `
    <div class="card-thumb ${a.image}">
      <span class="card-cat-tag">${escapeHtml(a.category)}</span>
    </div>
    <div class="featured-content">
      <h3><a href="article.html?slug=${encodeURIComponent(a.slug)}">${escapeHtml(a.title)}</a></h3>
      <p class="excerpt">${escapeHtml(a.excerpt)}</p>
      <div class="article-meta" style="margin-bottom:20px;">
        <span>${escapeHtml(a.readTime)}</span><span class="dot"></span><span>${formatDate(a.date)}</span>
      </div>
      <a href="article.html?slug=${encodeURIComponent(a.slug)}" class="btn btn-gold btn-sm">Read More</a>
    </div>
  `;
}

function renderGrid(elId, items) {
  const el = document.getElementById(elId);
  if (!el) return;
  if (!items.length) { el.innerHTML = `<p class="empty-state">More articles coming soon.</p>`; return; }
  el.innerHTML = items.map(a => `
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
  window._observeReveal(el.querySelectorAll('.reveal'));
}

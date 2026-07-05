document.addEventListener('DOMContentLoaded', loadArticle);

async function loadArticle() {
  const params = new URLSearchParams(window.location.search);
  const slug = params.get('slug');
  const root = document.getElementById('articleRoot');

  let articles = [];
  try {
    const res = await fetch('data/articles.json');
    articles = await res.json();
  } catch (err) {
    root.innerHTML = `<div class="container"><p class="empty-state">Articles couldn't be loaded right now.</p></div>`;
    console.error('Failed to load articles.json', err);
    return;
  }

  articles.sort((a, b) => new Date(b.date) - new Date(a.date));
  const idx = articles.findIndex(a => a.slug === slug);
  const article = idx > -1 ? articles[idx] : articles[0];

  if (!article) {
    root.innerHTML = `<div class="container"><p class="empty-state">Article not found.</p></div>`;
    return;
  }

  document.title = `${article.title} — The Writer's Portfolio`;

  const prev = articles[idx + 1] || null;
  const next = idx > 0 ? articles[idx - 1] : null;
  const related = articles.filter(a => a.category === article.category && a.slug !== article.slug).slice(0, 3);

  root.innerHTML = `
    <div class="article-header">
      <div class="container-narrow">
        <a href="category.html?cat=${encodeURIComponent(categorySlug(article.category))}" class="back-link">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          ${escapeHtml(article.category)}
        </a>
        <span class="eyebrow">${escapeHtml(article.category)}</span>
        <h1>${escapeHtml(article.title)}</h1>
        <div class="article-byline">
          <span>By <strong>${escapeHtml(article.author)}</strong></span>
          <span class="dot" style="width:3px;height:3px;border-radius:50%;background:var(--line-strong);"></span>
          <span>${formatDate(article.date)}</span>
          <span class="dot" style="width:3px;height:3px;border-radius:50%;background:var(--line-strong);"></span>
          <span>${escapeHtml(article.readTime)}</span>
        </div>
        <div class="share-row" aria-label="Share this article">
          <a href="https://twitter.com/intent/tweet?url=${encodeURIComponent(location.href)}&text=${encodeURIComponent(article.title)}" target="_blank" rel="noopener" aria-label="Share on X"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4l16 16M20 4L4 20"/></svg></a>
          <a href="https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(location.href)}" target="_blank" rel="noopener" aria-label="Share on LinkedIn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/><path d="M10 9v12M10 13a4 4 0 018 0v8"/></svg></a>
          <a href="mailto:?subject=${encodeURIComponent(article.title)}&body=${encodeURIComponent(location.href)}" aria-label="Share by email"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 6 10-6"/></svg></a>
        </div>
      </div>
    </div>

    <div class="container-narrow">
      <div class="article-hero-image card-thumb ${article.image}"></div>

      <div class="article-body">
        ${article.body.map(p => `<p>${escapeHtml(p)}</p>`).join('')}
      </div>

      <div class="article-tags">
        ${(article.tags || []).map(t => `<span>${escapeHtml(t)}</span>`).join('')}
      </div>

      <div class="prev-next">
        ${prev ? `
          <a href="article.html?slug=${encodeURIComponent(prev.slug)}" class="pn-card prev">
            <span class="pn-label">← Previous</span>
            <span class="pn-title">${escapeHtml(prev.title)}</span>
          </a>` : '<span></span>'}
        ${next ? `
          <a href="article.html?slug=${encodeURIComponent(next.slug)}" class="pn-card next">
            <span class="pn-label">Next →</span>
            <span class="pn-title">${escapeHtml(next.title)}</span>
          </a>` : '<span></span>'}
      </div>

      <div class="newsletter-box">
        <div>
          <h3>Enjoyed this piece?</h3>
          <p>Get new articles in your inbox, roughly once a week. No spam.</p>
          <div class="newsletter-success" id="newsletterSuccess">You're on the list — thanks for signing up.</div>
        </div>
        <form class="newsletter-form" id="newsletterForm">
          <input type="email" placeholder="you@email.com" required aria-label="Email address">
          <button type="submit" class="btn btn-gold btn-sm">Subscribe</button>
        </form>
      </div>

      <div class="comments-note">
        Comments are turned off on this demo site. Connect a service like Disqus or Giscus here when you're ready to enable them.
      </div>

      ${related.length ? `
        <div class="section related-grid">
          <div class="section-head"><h2>More in ${escapeHtml(article.category)}</h2></div>
          <div class="article-grid" id="relatedGrid"></div>
        </div>
      ` : ''}
    </div>
  `;

  if (related.length) renderRelated(related);

  const form = document.getElementById('newsletterForm');
  const success = document.getElementById('newsletterSuccess');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    success.classList.add('is-visible');
    form.reset();
  });
}

function renderRelated(items) {
  const el = document.getElementById('relatedGrid');
  el.innerHTML = items.map(a => `
    <article class="article-card">
      <a href="article.html?slug=${encodeURIComponent(a.slug)}">
        <div class="card-thumb ${a.image}"><span class="card-cat-tag">${escapeHtml(a.category)}</span></div>
      </a>
      <h3><a href="article.html?slug=${encodeURIComponent(a.slug)}">${escapeHtml(a.title)}</a></h3>
      <p class="excerpt">${escapeHtml(a.excerpt)}</p>
      <div class="article-meta"><span>${escapeHtml(a.readTime)}</span><span class="dot"></span><span>${formatDate(a.date)}</span></div>
    </article>
  `).join('');
}

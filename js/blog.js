document.addEventListener('DOMContentLoaded', loadFullBlogList);

async function loadFullBlogList() {
  const list = document.getElementById('fullBlogList');
  if (!list) return;
  try {
    const res = await fetch('data/blog-posts.json');
    const posts = await res.json();
    posts.sort((a, b) => new Date(b.date) - new Date(a.date));
    list.innerHTML = posts.map(p => `
      <a href="${p.slug}" class="blog-item reveal is-visible">
        <span class="blog-meta">${escapeHtml(p.tag)} · ${formatDate(p.date)}</span>
        <h3>${escapeHtml(p.title)}</h3>
        <p>${escapeHtml(p.excerpt)}</p>
        <span class="read-time">${escapeHtml(p.readTime)}</span>
      </a>
    `).join('');
  } catch (err) {
    list.innerHTML = `<p style="color:var(--ink-soft); padding:24px 0;">Posts couldn't be loaded right now.</p>`;
    console.error('Failed to load blog-posts.json', err);
  }
}

function escapeHtml(str = '') {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  } catch { return iso; }
}

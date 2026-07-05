document.addEventListener('DOMContentLoaded', loadPortfolio);

async function loadPortfolio() {
  let projects = [];
  try {
    const res = await fetch('data/portfolio.json');
    projects = await res.json();
  } catch (err) {
    document.getElementById('portfolioGrid').innerHTML = `<p class="empty-state">Projects couldn't be loaded right now.</p>`;
    console.error('Failed to load portfolio.json', err);
    return;
  }

  const niches = ['All', ...new Set(projects.map(p => p.niche))];
  const filterRow = document.getElementById('filterRow');
  filterRow.innerHTML = niches.map((n, i) => `
    <button class="filter-chip${i === 0 ? ' is-active' : ''}" data-niche="${escapeHtml(n)}">${escapeHtml(n)}</button>
  `).join('');

  renderPortfolio(projects);

  filterRow.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-chip');
    if (!btn) return;
    filterRow.querySelectorAll('.filter-chip').forEach(b => b.classList.remove('is-active'));
    btn.classList.add('is-active');
    const niche = btn.dataset.niche;
    renderPortfolio(niche === 'All' ? projects : projects.filter(p => p.niche === niche));
  });
}

function renderPortfolio(items) {
  const grid = document.getElementById('portfolioGrid');
  if (!items.length) { grid.innerHTML = `<p class="empty-state">No projects in this niche yet.</p>`; return; }
  grid.innerHTML = items.map(p => `
    <div class="portfolio-card reveal is-visible">
      <span class="niche">${escapeHtml(p.niche)}</span>
      <h3>${escapeHtml(p.title)}</h3>
      <p class="summary">${escapeHtml(p.summary)}</p>
      <p class="role">Role: <strong>${escapeHtml(p.role)}</strong></p>
      <div class="pf-skills">${p.skills.map(s => `<span>${escapeHtml(s)}</span>`).join('')}</div>
      <a href="${p.link}" class="read-more">View Project
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
      </a>
    </div>
  `).join('');
}

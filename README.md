/* =========================================================
   THEME TOGGLE (persisted via localStorage)
   ========================================================= */
(function initTheme() {
  const stored = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = stored || (prefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', theme);
})();

document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('themeToggle');
  themeToggle?.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });

  /* =======================================================
     NAV: scroll shadow + mobile toggle
     ======================================================= */
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav?.classList.toggle('is-scrolled', window.scrollY > 8);
  }, { passive: true });

  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  navToggle?.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
  navLinks?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('is-open');
      navToggle?.setAttribute('aria-expanded', 'false');
    });
  });

  /* =======================================================
     SCROLL REVEAL
     ======================================================= */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  /* =======================================================
     ICONS
     ======================================================= */
  if (window.lucide) lucide.createIcons();

  /* =======================================================
     FOOTER YEAR
     ======================================================= */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* =======================================================
     CONTACT FORM (front-end demo only)
     ======================================================= */
  const form = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    success?.classList.add('is-visible');
    form.reset();
  });

  /* =======================================================
     DATA-DRIVEN SECTIONS
     ======================================================= */
  loadWork();
  renderServices();
  renderIndustries();
  renderSkills();
  loadTestimonials();
  loadBlogPreview();
});

/* ---------------------------------------------------------
   FEATURED WORK — from data/projects.json
   --------------------------------------------------------- */
async function loadWork() {
  const grid = document.getElementById('workGrid');
  if (!grid) return;
  try {
    const res = await fetch('data/projects.json');
    const projects = await res.json();
    grid.innerHTML = projects.map((p, i) => `
      <article class="work-card reveal${i === 0 ? ' is-featured' : ''}">
        <div class="work-cover ${p.gradient}">
          <span class="work-type">${escapeHtml(p.type)}</span>
        </div>
        <div class="work-body">
          <h3>${escapeHtml(p.title)}</h3>
          <p>${escapeHtml(p.description)}</p>
          <div class="tag-row">
            <span class="tag tag-industry">${escapeHtml(p.industry)}</span>
            ${p.skills.map(s => `<span class="tag">${escapeHtml(s)}</span>`).join('')}
          </div>
          <a href="${p.link}" class="work-link">Read Article
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
          </a>
        </div>
      </article>
    `).join('');
    observeNew(grid.querySelectorAll('.reveal'));
  } catch (err) {
    grid.innerHTML = `<p style="color:var(--ink-soft)">Work couldn't be loaded right now.</p>`;
    console.error('Failed to load projects.json', err);
  }
}

/* ---------------------------------------------------------
   SERVICES — static list, rendered for consistency
   --------------------------------------------------------- */
function renderServices() {
  const grid = document.getElementById('servicesGrid');
  if (!grid) return;
  const services = [
    { title: 'Technical Writing', desc: 'Clear, accurate writing on complex products for technical and non-technical readers alike.', icon: 'file-text' },
    { title: 'Ghostwriting', desc: "Posts, essays, and threads that sound like you, at your most articulate.", icon: 'feather' },
    { title: 'Blog Writing', desc: 'SEO-aware articles that bring in the right readers and keep them there.', icon: 'edit-3' },
    { title: 'Content Strategy', desc: "A plan for what to write, for whom, and why — not just more content.", icon: 'compass' },
    { title: 'SEO Content', desc: 'Writing built to rank and convert, without reading like it was built to rank.', icon: 'search' },
    { title: 'Startup Storytelling', desc: 'Origin stories, positioning, and narrative for teams raising or launching.', icon: 'rocket' },
    { title: 'Newsletter Writing', desc: 'Consistent, readable newsletters that people actually open.', icon: 'mail' },
    { title: 'Documentation', desc: 'Developer docs and technical guides that reduce support load.', icon: 'book-open' },
    { title: 'Website Copy', desc: 'Homepage, product, and landing page copy that says what you do, plainly.', icon: 'layout' },
  ];
  grid.innerHTML = services.map(s => `
    <div class="service-card">
      <div class="icon-wrap"><i data-lucide="${s.icon}"></i></div>
      <h3>${s.title}</h3>
      <p>${s.desc}</p>
    </div>
  `).join('');
  if (window.lucide) lucide.createIcons();
}

/* ---------------------------------------------------------
   INDUSTRIES
   --------------------------------------------------------- */
function renderIndustries() {
  const row = document.getElementById('industryRow');
  if (!row) return;
  const industries = [
    { name: 'Artificial Intelligence', icon: 'brain-circuit' },
    { name: 'Web3', icon: 'link-2' },
    { name: 'Blockchain', icon: 'boxes' },
    { name: 'SaaS', icon: 'layers' },
    { name: 'Fintech', icon: 'landmark' },
    { name: 'Venture Capital', icon: 'trending-up' },
    { name: 'Startups', icon: 'rocket' },
    { name: 'Business', icon: 'briefcase' },
    { name: 'Emerging Technology', icon: 'sparkles' },
  ];
  row.innerHTML = industries.map(i => `
    <span class="industry-chip"><i data-lucide="${i.icon}"></i>${i.name}</span>
  `).join('');
  if (window.lucide) lucide.createIcons();
}

/* ---------------------------------------------------------
   SKILLS
   --------------------------------------------------------- */
function renderSkills() {
  const row = document.getElementById('skillRow');
  if (!row) return;
  const skills = [
    'Technical Writing', 'SEO', 'Research', 'Storytelling', 'Content Strategy',
    'Editing', 'Copywriting', 'Markdown', 'GitHub', 'Notion',
    'Google Docs', 'WordPress', 'Figma', 'ChatGPT'
  ];
  row.innerHTML = skills.map(s => `<span class="skill-badge">${s}</span>`).join('');
}

/* ---------------------------------------------------------
   TESTIMONIALS — from data/testimonials.json
   --------------------------------------------------------- */
async function loadTestimonials() {
  const grid = document.getElementById('testimonialGrid');
  if (!grid) return;
  try {
    const res = await fetch('data/testimonials.json');
    const items = await res.json();
    grid.innerHTML = items.map(t => `
      <div class="testimonial-card reveal">
        <div class="quote-mark">&ldquo;</div>
        <p class="quote">${escapeHtml(t.quote)}</p>
        <div class="testimonial-person">
          <div class="avatar">${escapeHtml(t.initials)}</div>
          <div>
            <div class="name">${escapeHtml(t.name)}</div>
            <div class="context">${escapeHtml(t.context)}</div>
          </div>
        </div>
      </div>
    `).join('');
    observeNew(grid.querySelectorAll('.reveal'));
  } catch (err) {
    grid.innerHTML = `<p style="color:var(--ink-soft)">Testimonials couldn't be loaded right now.</p>`;
    console.error('Failed to load testimonials.json', err);
  }
}

/* ---------------------------------------------------------
   BLOG PREVIEW (homepage) — from data/blog-posts.json
   --------------------------------------------------------- */
async function loadBlogPreview() {
  const list = document.getElementById('blogList');
  if (!list) return;
  try {
    const res = await fetch('data/blog-posts.json');
    const posts = await res.json();
    const preview = posts.slice(0, 4);
    list.innerHTML = preview.map(p => `
      <a href="blog.html" class="blog-item reveal">
        <span class="blog-meta">${escapeHtml(p.tag)} · ${formatDate(p.date)}</span>
        <h3>${escapeHtml(p.title)}</h3>
        <p>${escapeHtml(p.excerpt)}</p>
        <span class="read-time">${escapeHtml(p.readTime)}</span>
      </a>
    `).join('');
    observeNew(list.querySelectorAll('.reveal'));
  } catch (err) {
    list.innerHTML = `<p style="color:var(--ink-soft)">Posts couldn't be loaded right now.</p>`;
    console.error('Failed to load blog-posts.json', err);
  }
}

/* ---------------------------------------------------------
   HELPERS
   --------------------------------------------------------- */
function escapeHtml(str = '') {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  } catch { return iso; }
}

// Re-observe elements injected after the initial DOMContentLoaded reveal setup
function observeNew(elements) {
  if (!('IntersectionObserver' in window)) {
    elements.forEach(el => el.classList.add('is-visible'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  elements.forEach(el => io.observe(el));
}

# Jordan Ellery — Portfolio Website 

A fast, responsive portfolio site for a Technical Content Writer & Content
Strategist. Plain HTML/CSS/JS — no build step, no framework — so it deploys
straight to GitHub Pages.

## Folder structure

```
├── index.html          Main one-page site (hero → about → work → services →
│                        industries → skills → testimonials → blog → contact)
├── blog.html            Full blog listing page
├── css/
│   └── styles.css       All styles, design tokens, dark mode
├── js/
│   ├── main.js           Nav, theme toggle, animations, renders data-driven
│   │                      sections on index.html
│   └── blog.js           Renders the full post list on blog.html
├── data/
│   ├── projects.json     Featured Work cards — edit this to add/change work
│   ├── testimonials.json Testimonial cards
│   └── blog-posts.json   Blog post index (title, excerpt, date, link to file)
├── posts/                Markdown files for individual blog posts
└── assets/
    └── resume.pdf         ← add your real resume here (see below)
```

## Customizing content

**You do not need to touch the HTML for routine updates.** Edit the JSON
files in `/data`:

- `data/projects.json` — add a new object to the array to add a new
  portfolio piece. `gradient` accepts `grad-1` through `grad-6` (defined in
  `styles.css`) or add your own class for the cover treatment.
- `data/testimonials.json` — add/remove testimonial cards.
- `data/blog-posts.json` — add a new object here, plus a matching Markdown
  file in `/posts`, to publish a new article. `slug` should point at the
  file path (e.g. `posts/my-new-post.md`).

Services, industries, and skills are defined directly in `js/main.js`
(`renderServices`, `renderIndustries`, `renderSkills`) since they change
rarely — edit the arrays near the top of each function.

## Adding your resume

Drop your real resume PDF at `assets/resume.pdf` (replace the placeholder).
The "Download Resume" button in the hero already points there.

## Wiring up the contact form

The form on the Contact section is front-end only — it shows a success
message but doesn't send anything anywhere yet. To make it functional
without a backend, the fastest options are:

- **Formspree** (formspree.io) — free tier, add `action="https://formspree.io/f/YOUR_ID"` and `method="POST"` to the `<form id="contactForm">` tag in `index.html`, and remove/adjust the `preventDefault()` call in `js/main.js`.
- **Netlify Forms** — if you deploy on Netlify instead of GitHub Pages, just add `data-netlify="true"` to the form tag and Netlify handles the rest automatically.

## Deploying to GitHub Pages

1. Push this folder to a GitHub repository (e.g. `your-username/portfolio`).
2. In the repo, go to **Settings → Pages**.
3. Under "Build and deployment", set **Source** to `Deploy from a branch`,
   branch `main`, folder `/ (root)`.
4. Save. Your site will be live at `https://your-username.github.io/portfolio/`
   within a minute or two.
5. Optional: add a custom domain under the same Pages settings.

## Notes

- Dark mode preference is saved in the visitor's browser (`localStorage`) and
  also respects their OS-level preference on first visit.
- Featured Work cover images are CSS gradients rather than photos, so there's
  nothing to source, license, or optimize — swap in real screenshots later by
  editing `.work-cover` in `styles.css` and adding an `<img>` per card if
  preferred.
- Icons are from [Lucide](https://lucide.dev), loaded via CDN.
- Fonts are Inter, Space Grotesk, and JetBrains Mono, loaded via Google
  Fonts.

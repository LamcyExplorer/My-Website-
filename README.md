# The Writer's Portfolio

A digital publication and writing portfolio — plain HTML/CSS/JS, no build
step, ready to deploy straight to GitHub Pages.

## Folder structure

```
├── index.html          Homepage: hero, featured article, latest articles,
│                        one section per category
├── article.html         Article template — reads ?slug= from the URL and
│                        renders the matching article from data/articles.json
├── category.html        Category archive template — reads ?cat= from the
│                        URL (e.g. category.html?cat=tech) and lists every
│                        article in that category
├── portfolio.html       Portfolio page with niche filtering
├── css/styles.css       All styles, design tokens
├── js/
│   ├── site.js            Shared: nav, search overlay, scroll reveal — loaded on every page
│   ├── home.js             Renders index.html sections
│   ├── article.js          Renders article.html
│   ├── category.js         Renders category.html
│   └── portfolio.js        Renders portfolio.html
├── data/
│   ├── articles.json      Every article on the site — add new ones here
│   └── portfolio.json     Portfolio projects
└── assets/               Add real images, a resume, etc. here
```

## How the "pages" actually work

Rather than creating a separate HTML file for every article and every
category (which gets messy fast), this site uses two **templates**:

- `article.html?slug=my-article-slug` — renders whichever article in
  `data/articles.json` has that `slug`
- `category.html?cat=tech` — renders every article whose category matches

This means publishing a new article is just adding one object to
`data/articles.json` — no new HTML file needed. Same for categories.

## Adding a new article

Open `data/articles.json` and add a new object to the array, following the
same shape as the existing ones:

```json
{
  "slug": "your-article-slug",
  "title": "Your Article Title",
  "category": "Tech",
  "excerpt": "One or two sentences that summarize the piece.",
  "author": "Your Name",
  "date": "2026-07-05",
  "readTime": "5 min read",
  "image": "grad-tech-1",
  "featured": false,
  "tags": ["ai", "startups"],
  "body": [
    "First paragraph.",
    "Second paragraph.",
    "Add as many paragraph strings as you need."
  ]
}
```

- `category` must exactly match one of: `Lifestyle`, `Tech`, `News`,
  `Career`, `Health`, `Kids Sports` — this is what maps the article into
  the right homepage section and category archive.
- `image` picks a cover treatment — see the `grad-*` classes near the top
  of `css/styles.css` for the available options, or add your own.
- Set `"featured": true` on one article at a time to control which one
  shows in the "Editor's Pick" spot on the homepage.
- Once real photos are ready, replace the `image` gradient approach with an
  `<img>` tag inside `.card-thumb` in the relevant JS render functions.

## Adding a portfolio project

Same idea — add an object to `data/portfolio.json`. The `niche` field
drives the filter buttons on the Portfolio page automatically; add a new
niche just by using a new value.

## Search

The search icon in the nav opens an overlay that filters `articles.json`
instantly as you type, matching against title, category, excerpt, and tags.
No backend required — it's all client-side.

## Newsletter signup & comments

The newsletter form on each article page is front-end only right now — it
shows a success message but doesn't send anywhere. To make it functional,
the fastest option is [Mailchimp's embedded form](https://mailchimp.com) or
[ConvertKit](https://convertkit.com) — swap the `<form>` in `js/article.js`
for their embed code.

Comments are intentionally left off for now (a placeholder note explains
this on each article). To add them later, services like
[Giscus](https://giscus.app) (GitHub-based, free) or
[Disqus](https://disqus.com) can be dropped into the `.comments-note` div
in `js/article.js`.

## Deploying to GitHub Pages

1. Push this folder's contents to your GitHub repository.
2. In the repo, go to **Settings → Pages**.
3. Under "Build and deployment," set **Source** to `Deploy from a branch`,
   branch `main`, folder `/ (root)`.
4. Save — your site will be live at
   `https://your-username.github.io/your-repo-name/` shortly after.

## Notes

- All article/project content is currently placeholder text, clearly
  marked as such in the article bodies — replace it with your real writing.
- Fonts: Manrope (headings), Inter (body), Poppins (labels/buttons/nav),
  all loaded via Google Fonts.
- No external image dependencies — cover art uses CSS gradients so there's
  nothing to source or license before going live.

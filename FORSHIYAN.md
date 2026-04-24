# shiyankoh.github.io — For Shiyan

## What it does

Your personal blog at shiyankoh.com. Posts cover investing, parenting, community building, AI, and anything else you're thinking about. The blog is called "The Culdesac." It's a static site — no server, no database, no backend. Just files that get built into HTML.

## Architecture

```
Content (Markdown files)
       ↓
Hugo (static site generator, runs locally)
       ↓
public/ (generated HTML/CSS/JS)
       ↓
gh-pages branch (deployed via git push)
       ↓
GitHub Pages → www.shiyankoh.com
```

Hugo is a tool that reads your Markdown posts and a theme, then generates a folder full of HTML pages. You push the built output (the `public/` folder) to a special `gh-pages` branch, and GitHub serves it automatically.

**Important:** There's no CI/CD. You build locally and push manually. Always `git pull` before editing to avoid conflicts.

## Codebase structure

```
shiyankoh.github.io/
├── hugo.toml               — site config (title, theme, author, menus)
├── content/
│   ├── about.md            — About page
│   └── blog/
│       ├── _index.md       — blog listing page config
│       └── *.md            — ~32 individual blog posts
├── themes/
│   └── paper/              — the Hugo theme
├── layouts/                — custom template overrides
│   ├── _default/
│   └── partials/
├── static/
│   ├── CNAME               — "www.shiyankoh.com" — tells GitHub Pages the custom domain
│   └── images/             — images referenced in blog posts
├── assets/                 — SCSS/CSS overrides
└── public/                 — generated site (don't edit directly — Hugo overwrites this)
```

## Technologies

**Hugo.** The static site generator. Written in Go, extremely fast. You run `hugo` in the project folder and it builds the whole site in under a second. No Node.js, no Python, no dependencies beyond the Hugo binary. Posts are Markdown files — you write in plain text, Hugo turns them into HTML.

**Paper theme.** A minimal Hugo theme. Clean typography, light/linen color scheme. Configured with `disableThemeToggle = true` (no dark/light toggle) and `color = "linen"`. Lives in `themes/paper/`.

**GitHub Pages.** Free static hosting from GitHub. The `gh-pages` branch is what gets served. The `CNAME` file in `static/` tells GitHub Pages which domain to use — so when you push, it serves at `www.shiyankoh.com` instead of `shiyankoh.github.io`.

**Markdown.** Every post is a `.md` file in `content/blog/`. The front matter (the `---` block at the top) defines title, date, and slug. The rest is plain text with Markdown formatting. Dead simple to write.

## How posts work

A typical post file looks like this:

```markdown
---
title: "Chef's knife? Or Kiwi peeler?"
date: 2025-04-29
slug: "chefs-knife-or-kiwi-peeler"
---

Post content here...
```

The `slug` becomes the URL path: `/blog/chefs-knife-or-kiwi-peeler/`. Images go in `static/images/` and are referenced as `/images/filename.png` in the post.

## How deployment works

1. Write or edit a post in `content/blog/`
2. Run `hugo` — this regenerates everything in `public/`
3. `cd public && git add . && git commit -m "update" && git push origin gh-pages`
4. GitHub Pages picks up the new files and serves them within ~60 seconds

The main branch has your source (Markdown, config, theme). The `gh-pages` branch has the built output only. They're separate histories.

**The "always git pull first" rule** exists because `public/` is tracked in git. If you build locally without pulling first, you'll create a merge conflict between your new build and whatever was last pushed.

## Config highlights (`hugo.toml`)

- `baseURL = "https://www.shiyankoh.com/"` — critical for correct absolute URLs in the built output
- `theme = "paper"` — points to `themes/paper/`
- `unsafe = true` in goldmark renderer — allows raw HTML inside Markdown (useful for embedding images, iframes)
- Menu items: Blog and About links in the nav

## Key technical decisions

**Static site over WordPress or Substack.** No hosting costs, no database to maintain, no plugins to update. Full control over the HTML. Tradeoff: no comments, no email capture, no analytics built in (you'd have to add those manually).

**Paper theme, barely customized.** Minimal by design. The theme does 95% of the work. Custom `layouts/` and `assets/` let you override specific templates or styles without modifying the theme source itself — so theme updates don't overwrite your changes.

**Manual deploy, no CI.** No GitHub Actions workflow. You run `hugo` and `git push` yourself. This sounds like friction but it's appropriate here — blog posts don't have automated tests, and manual control means you can preview locally before anything goes live.

**`public/` committed to gh-pages, not main.** Keeps the source repo clean. Someone looking at the main branch sees Markdown and config. The built HTML lives separately.

## Lessons learned

**Static sites are very forgiving.** Nothing to break, nothing to configure, no server to go down. For a personal blog, this is the right call. You can ignore this project for a year and come back and it still works.

**The CNAME file is easy to forget and breaks your domain if you miss it.** It lives in `static/` so Hugo copies it to `public/` on every build. If it's not there, GitHub Pages stops routing the custom domain. Add it once, forget about it.

**`git pull` before building is not optional.** Hugo regenerates all of `public/` every time you run it. If you built locally, pushed, then someone else made a change (or you pushed from a different machine), your local `public/` is behind. Build on a stale base and you'll overwrite the newer content. The rule is: pull the `gh-pages` branch contents OR just always use the same machine.

**Markdown front matter is your metadata.** Title, date, slug — all in the `---` block. If you forget the date, Hugo can't sort posts chronologically. If you forget the slug, Hugo generates one from the filename (which is usually fine but sometimes ugly). Habit: always set all three when creating a new post.

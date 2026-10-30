# Copilot Instructions

## Commands

Each site is its own Next.js app with its own `package.json` and lockfile (no npm workspaces). From the repo root:

```bash
npm run setup            # npm install in the root and both apps
npm run dev:portfolio    # apps/portfolio on :3000 (siddharthabbineni.in)
npm run dev:blog         # apps/blog on :3001 (blog.siddharthabbineni.in)
npm run build:portfolio
npm run build:blog       # static export to apps/blog/out
npm run lint             # Biome over the whole repo
npm run format           # Biome: apply formatting and safe fixes
npm run typecheck        # TypeScript 7 strict check in both apps
```

The portfolio reads the blog's latest posts from `<blog>/posts.json` (`NEXT_PUBLIC_BLOG_URL`, set to the local blog in `apps/portfolio/.env.development`). Each app deploys to its own Azure Static Web App from its own workflow in `.github/workflows/`.

The rest of this file describes the portfolio (`apps/portfolio`); paths below are relative to it.

No test suite exists in this project.

## Architecture

A personal portfolio styled as a gamer "player profile", built with Next.js 16 (App Router, Cache Components) and React 19. Styling is **CSS modules plus design tokens in `styles/globals.css`**. There is no UI library and no Tailwind.

Next.js ships its docs in `node_modules/next/dist/docs/`. Read them before using an API, because this version differs from older training data.

### Layout

On desktop, the home page fits a single screen with no vertical scrolling. The target viewports are 1920×970/1080, 1536×730, 1366×650 and 1280×600 (a 1280×768 laptop's browser window). Below 1180px wide or 540px tall, it falls back to a stacked, scrolling layout, where the career timeline becomes a single row of logos.

- **Tall screens (≥1700×940):** Character build fills the left column, with six uniform cards. Side quests and the PR ticker get their own row spanning the two other columns.
- **Shorter desktops:** the left column switches between Character build and Side quests with tabs and shows the first four cards only.
- **Unlock rows:** the trophy cabinet uses container queries to show only as many unlock rows as fit.

The breakpoints are listed at the top of `app/(profile)/layout.module.css`, and each component module repeats the ones it needs. Any change must keep the one-screen fit at those viewports.

- **Views:** `app/(profile)/layout.tsx` keeps the profile strip fixed. Each section renders one `<main>` view. `/blog` (Press) is a short feed of the blog's newest posts; the posts themselves live on the blog, and `/blog/<slug>` and `/blog/feed.xml` redirect there (`next.config.ts`).
- **Size cap:** the page stops growing at 1920×1080 (`--max-width`, `--max-height` in `styles/globals.css`) and sits top-centre on a dot-grid backdrop. Use `var(--vw)` instead of `vw` so sizes stop growing too.
- **Type scale:** every font size is in `rem`. The root size in `styles/globals.css` is the one knob: 100% (1.25× the original design) by default, stepping down on laptop-sized and short windows.

### Content-in-Config Pattern

All site content lives in TypeScript config files under `config/`:

- `profile.ts`: name, bio, classes and subclasses, links
- `experience.ts`: jobs, oldest first, with `YYYY-MM` dates. Logos are in `public/work_images/`, and an optional `logo.dark` variant can be set.
- `build.ts`: the character build cards. They are squares, only about 110px inside on a small laptop, so keep each line and its chips short. Their pixel-art icons are in `pixelIcons.ts`.
- `quests.ts`: side projects
- `certifications.ts`: Azure certifications. Only entries marked `featured` show.
- Blog posts are in the blog app: `apps/blog/posts/*.md(x)`, with YAML front matter (`title`, `description`, `date`, `tags`, `draft?`, `archive?`; see `apps/blog/lib/posts.ts`); the file name is the slug. Images go in `apps/blog/public/images/<slug>/`.
- `skins.ts`: skin ids, the `SKIN_PICKER` flag and the theme init script. The colours themselves live in `styles/globals.css`.

To update content, edit the config file, not the component code.

### Theming

`<html>` carries `data-skin` (`midnight` | `electric` | `plum` | `arcade` | `hotline`) and `data-mode` (`dark` | `light`). An inline script in `app/layout.tsx` sets both from localStorage before first paint.

Midnight Lime is the default and, for now, the only skin visitors see: `SKIN_PICKER` in `config/skins.ts` is off, which hides the swatches and makes the init script ignore a stored skin. Only the dark/light toggle shows. The other skins stay defined, so turning the flag on brings the picker back. Links use their own `--link` token, which matches `--acc` except in Refined Electric (violet).

Tokens (`--bg`, `--panel`, `--acc`, …) are defined per skin × mode in `styles/globals.css`. Any element with its own `data-skin` previews that skin; the swatches rely on this. `components/ThemeControls` switches skin and mode with `document.startViewTransition`.

### Data fetching (Cache Components)

`cacheComponents` is on, so route segment configs (`revalidate`, `dynamic`) are not allowed. Each data function in `lib/` uses `'use cache'` and `cacheLife`:

| Function | Source | Lifetime | Env vars |
|----------|--------|----------|----------|
| `getUpstreamPullRequests` | GitHub search | `hours` | `GITHUB_TOKEN` (optional), `GITHUB_USER` |
| `getSteamAchievements` | Steam Web API | `gaming` (6h, set in next.config.ts) | `STEAM_API_KEY`, `STEAM_USER_ID` |
| `getXboxAchievements` | OpenXBL (`api.xbl.io/v2`, responses wrapped in `content`) | `gaming` | `XBOX_API_KEY` (the key's own account; no XUID) |
| `getBlogFeed` | the blog's `/posts.json` | `hours` | `NEXT_PUBLIC_BLOG_URL` |
| `getCampaign` | `config/experience.ts` | `days` | none |

`new Date()` without arguments must stay inside a cached function such as `getCampaign`, or the prerender fails. The trophy cabinet's live unlocks render in a `<Suspense>` boundary.

The `/api/steam` and `/api/xbox` routes wrap the same lib functions. The RSS feed is the blog's own `/feed.xml`.

### Components

- Server components by default: `ProfileStrip`, `TrophyCabinet` (+ `Unlocks`), `CharacterBuild`, `SideQuests`, `PrTicker`
- Client components: `Campaign` (timeline tabs with arrow-key navigation), `SidePanel` (tabs only; the server-rendered panes come in as props), `ThemeControls`, `Devlog/PostList` (the reader, `Devlog/Reader`, is a server component), `ProfileStrip/ResumeButton` (the PDF in a `<dialog>`; small screens just open the PDF), `ProfileStrip/ViewSwitch`
- Shared primitives are global classes in `styles/globals.css`: `.panel`, `.phead`, `.label`, `.pill`, `.chip`, `.btn`, `.icon-btn` and `.logo-tile`

### Deployment

Deployed to Azure Static Web Apps (hybrid Next.js) by GitHub Actions (`.github/workflows/deploy.yml`):
- A push to `master` deploys production (`www.siddharthabbineni.in`).
- A push to `staging` deploys the staging environment, which is where changes are verified first.
- The build uses Node 22 and `output: 'standalone'` in next.config.
- Google Analytics is injected only in production.

### Releases

The version is managed by release-please (`.github/workflows/release.yml`):
- Use Conventional Commit titles for PRs (`feat:`, `fix:`, `feat!:`).
- release-please keeps a release PR open that bumps `package.json` and `CHANGELOG.md`. Merging that PR tags the release.

## Conventions

- TypeScript strict mode, with `noUnusedLocals`, `noUnusedParameters`, `noUncheckedIndexedAccess` and `noFallthroughCasesInSwitch`. Shared types live in `types/`.
- Imports use the `tsconfig` path aliases (`components/…`, `config/…`, `lib/…`, `types/…`).
- `biome.json` sets the formatting: tabs, single quotes, no semicolons, ES5 trailing commas. Lint rules are Biome's recommended set plus the Next and React domains.
- Interactive elements need visible `:focus-visible` styles and a working keyboard path.

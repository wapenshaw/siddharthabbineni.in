# Copilot Instructions

## Commands

```bash
npm run dev        # Start dev server (Turbopack)
npm run build      # Production build
npm run lint       # ESLint (next/core-web-vitals + custom rules)
npm run typecheck  # TypeScript strict check (tsc --noEmit)
```

No test suite exists in this project.

## Architecture

This is a **personal portfolio website** built with Next.js 16 (App Router) and **Chakra UI v3** — not Tailwind CSS, despite what the scoped `.github/instructions/nextjs-tailwind.instructions.md` suggests. That file is generic and does not reflect this project's actual styling approach.

### Content-in-Config Pattern

All site content lives in TypeScript config files under `config/`, not a CMS or markdown:

- `about.ts` — Bio text and section labels
- `experience.tsx` — Work history (uses JSX for rich role descriptions)
- `certifications.ts` — Azure certifications with verify URLs and expiry dates
- `skills.ts` — Skill categories with icon mappings and a `splitSkills()` grid utility
- `sidebar.ts` — Social media links with react-icons
- `animations.ts` — Motion animation presets (fadeInUp, stagger, etc.) and duration constants
- `theme.ts` — Chakra UI system with semantic color tokens for light/dark mode

To update site content, edit the relevant config file — not component code.

### Data Fetching — Two-Tier Strategy

**Server-side (ISR):** `app/page.tsx` and `app/blog/page.tsx` fetch dev.to articles and StackOverflow stats at build time with `{ next: { revalidate: 3600 } }` (1-hour revalidation).

**Client-side (SWR):** Gaming widgets in `components/Sidebar/GamingWidget.tsx` fetch `/api/steam` and `/api/xbox` with SWR, using 6-hour refresh intervals and `revalidateOnFocus: false`.

### API Routes

Four routes under `app/api/`, all using 6-hour ISR (`revalidate: 21600`):

| Route | External API | Key Env Vars |
|-------|-------------|--------------|
| `/api/articles` | dev.to | `DEVTO_USERNAME` |
| `/api/stackoverflow` | Stack Exchange | `SO_USER_ID` |
| `/api/steam` | Steam Web API | `STEAM_API_KEY`, `STEAM_USER_ID` |
| `/api/xbox` | Xbox Live (xbl.io) | `XBOX_API_KEY`, `XBOX_XUID` |

### Component Structure

- **Server Components** (default): `app/page.tsx`, `app/blog/page.tsx`
- **Client Components** (`'use client'`): `Portfolio.tsx`, `Menu/`, `Sidebar/`, `Avatar/` — anything with hooks, animations, or interactivity
- Heavy client components (`DevToArticles`, `GetInTouch`) are loaded with `next/dynamic` for code splitting
- `components/ui/provider.tsx` wraps the app with ChakraProvider + ThemeProvider (next-themes, default: dark)

### Styling System

- **Chakra UI v3** with `createSystem()` — semantic tokens define all theme colors
- Accent: #26417f blue (light) / orange (dark). Background: #D5D3D2 (light) / #121212 (dark)
- Font: "Sora" (Google Fonts)
- Animations via `motion` library (Framer Motion successor) — use presets from `config/animations.ts`
- Scoped CSS modules exist for Sidebar (`styles.module.css`)
- Global CSS in `styles/globals.css` handles scrollbar, scroll-snap, and responsive grid fallbacks

### Deployment

Azure Static Web Apps via GitHub Actions (`.github/workflows/deploy.yml`):
- Push to `master` → production (`www.siddharthabbineni.in`)
- Push to `staging` → staging environment
- Node 22, `output: 'standalone'` in next.config
- Google Analytics (GA-4) injected only in production

## Conventions

### TypeScript

Strict mode with `noUnusedLocals`, `noUnusedParameters`, `noUncheckedIndexedAccess`, and `noFallthroughCasesInSwitch` enabled. All types live in `types/`.

### Formatting

- **Tabs** for indentation (not spaces)
- Single quotes for strings
- No semicolons (inferred from codebase style)

### ESLint Rules

Beyond `next/core-web-vitals`: `arrow-body-style: as-needed`, `curly: all` (always use braces), `prefer-template`, `no-trailing-spaces`, `array-callback-return`.

### Environment

Requires `.env` with: `DEVTO_USERNAME`, `SO_USER_ID`, `STEAM_API_KEY`, `STEAM_USER_ID`, `XBOX_API_KEY`, `XBOX_XUID`, `NEXT_PUBLIC_SITE_URL`. The `robots.ts` and analytics logic check hostname to differentiate production from staging.

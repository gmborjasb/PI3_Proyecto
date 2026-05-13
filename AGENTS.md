# AGENTS.md — Pathfinder (Scholarship Finder)

## Commands

| Command           | Action                   |
| ----------------- | ------------------------ |
| `npm run dev`     | Start Vite dev server    |
| `npm run build`   | Production build         |
| `npm run preview` | Preview production build |

No test, lint, typecheck, or format scripts are configured.

## Architecture

- **Entrypoint:** `src/main.tsx` → `src/app/App.tsx` → `src/app/routes.tsx`
- **Router (react-router v7):** `createBrowserRouter` with 4 routes:
  - `/` — Dashboard
  - `/buscar` — Explore
  - `/metas` — Goals
  - `/guardadas` — Saved
- **Import alias:** `@` → `src/` (configured in `vite.config.ts`)
- **CSS-in-JS + Tailwind:** Emotion (`@emotion/react/styled`) available alongside Tailwind v4 (via `@tailwindcss/vite` plugin). `postcss.config.mjs` is intentionally empty — Tailwind v4 does not need it.
- **UI components:** `src/app/components/ui/` — Radix-based, shadcn/ui-style. Uses `cva` (class-variance-authority) for variants.
- **Utility:** `cn()` in `src/lib/utils.ts` (clsx + tailwind-merge)

## Conventions

- **Dark mode:** Toggled via `document.documentElement.classList.toggle("dark")`. CSS vars in `src/styles/theme.css` use `@custom-variant dark (&:is(.dark *))`.
- **All data is mocked** in `src/app/data/mock.ts` — no real API, no backend.
- **Font:** Plus Jakarta Sans (Google Fonts, loaded in `src/styles/fonts.css`)
- **UI language:** Spanish (route paths, labels, page content)
- **State management:** Local `useState` only — no global state library.

## Guidelines

`guidelines/Guidelines.md` is a template for AI system instructions (currently empty/stub). Populate it if you want the agent to follow design system rules.

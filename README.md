# Harasy SSO (frontend)

Identity UI for Harasy SaaS: auth, profile, subscription, tenants, and invitations — backed by **mock services** (swap `src/services/*` for real APIs later).

## Scripts (Bun)

Install: `bun install`

- `bun run dev` — Vite dev server
- `bun run build` — `tsr generate` + TypeScript + production bundle
- `bun run routes:gen` — regenerate `[src/routeTree.gen.ts](src/routeTree.gen.ts)`
- `bun run lint` / `bun run preview` — same as usual

## Stack

React 19 · Vite · TanStack Router · TanStack Query · Tailwind CSS v4 · shadcn-style UI (Radix) · React Hook Form · Zod · Zustand · **next-themes** (light / dark / system) · **i18next** + **react-i18next** (en / vi)

## Structure

- `[src/mocks/](src/mocks/)` — mock **data only**
- `[src/services/](src/services/)` — async API façade (imports mocks + `delay`)
- `[src/features/*/hooks](src/features/)` — TanStack Query hooks
- `[src/routes/](src/routes/)` — file-based routes (`_auth` / `_app` groups)
- `[src/locales/](src/locales/)` — `en` / `vi` JSON (`common`, `auth`, `app`)
- `[src/i18n/config.ts](src/i18n/config.ts)` — i18n init + `document.documentElement.lang`
- `[src/providers/AppProviders.tsx](src/providers/AppProviders.tsx)` — Theme + i18n + Query
- `[src/index.css](src/index.css)` — brand tokens (`:root` / `.dark`) mapped into `@theme`

## Theme and language

- Theme preference is stored as **`harasy-theme`** in `localStorage` (blocking script in `[index.html](index.html)` reduces flash).
- Language uses **`i18nextLng`** in `localStorage`, then the browser language.

## Mock notes

- Forgot password OTP: **`123456`**
- OAuth buttons are disabled placeholders
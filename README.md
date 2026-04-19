# Harasy SSO (frontend)

Identity UI for Harasy SaaS: auth, profile, subscription, tenants, and invitations.

**Auth** is handled by **[Clerk](https://clerk.com)** (`@clerk/react` v6 + `@clerk/localizations`): prebuilt `<SignIn />` / `<SignUp />` (path-routed) on `/login` and `/register`, plus `<SignIn />` on `/forgot-password` for password recovery; `AuthLayout` keeps the Harasy background shell. Clerk `appearance` follows the app theme (light/dark); locale follows i18next (`en` / `vi`). The shared Axios client attaches the Clerk **session JWT** as `Authorization: Bearer …` when calling `harasy-microservice-api` (set `VITE_API_BASE_URL`). Other domains still use **mock services** until wired to real APIs.

## Scripts (Bun)

Install: `bun install`

- `bun run dev` — Vite dev server
- `bun run build` — `tsr generate` + TypeScript + production bundle
- `bun run routes:gen` — regenerate `[src/routeTree.gen.ts](src/routeTree.gen.ts)`
- `bun run lint` / `bun run preview` — same as usual

## Stack

React 19 · Vite · TanStack Router · TanStack Query · **Clerk** (`@clerk/react`) · Tailwind CSS v4 · shadcn-style UI (Radix) · React Hook Form · Zod · **next-themes** (light / dark / system) · **i18next** + **react-i18next** (en / vi)

## Environment

Copy `.env.example` to `.env.local` (or `.env`) and set:

- `VITE_CLERK_PUBLISHABLE_KEY` — from Clerk Dashboard (required for auth UI).
- `VITE_API_BASE_URL` — e.g. `http://localhost:8080` for the Go microservice API.

## Structure

- `[src/mocks/](src/mocks/)` — mock **data only**
- `[src/services/](src/services/)` — async API façade (imports mocks + `delay`)
- `[src/features/*/hooks](src/features/)` — TanStack Query hooks
- `[src/routes/](src/routes/)` — file-based routes (`_auth` / `_app` groups)
- `[src/locales/](src/locales/)` — `en` / `vi` JSON (`common`, `auth`, `app`)
- `[src/i18n/config.ts](src/i18n/config.ts)` — i18n init + `document.documentElement.lang`
- `[src/providers/AppProviders.tsx](src/providers/AppProviders.tsx)` — Theme + i18n + **ClerkProvider** (appearance + localization) + Query + Axios bridge
- `[src/index.css](src/index.css)` — brand tokens (`:root` / `.dark`) mapped into `@theme`

## Theme and language

- Theme preference is stored as **`harasy-theme`** in `localStorage` (blocking script in `[index.html](index.html)` reduces flash).
- Language uses **`i18nextLng`** in `localStorage`, then the browser language.

## Mock notes

- Non-auth API calls may still use mocks under `src/mocks/` until services are replaced.
- Password reset is a custom Clerk flow on `/forgot-password` (email code + new password).
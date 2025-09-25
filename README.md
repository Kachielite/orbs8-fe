# Subscription Tracker — Frontend (React + Vite + TypeScript)

This frontend provides the UI for subscription discovery and management. It integrates with the backend API (NestJS + Postgres) to authenticate users, connect Gmail, and visualize subscription insights — while keeping privacy and transparency front‑and‑center.

Status: MVP in progress. Additional modules and pages will be added as the project evolves.


## Goals and UX at a glance

Primary UX goal: Help users quickly understand their subscriptions (active/paused/cancelled), spending, and suggestions (e.g., duplicate services) via clear, privacy‑aware UI.

MVP user flows:
- Auth: register, login, Google login, refresh tokens.
- Password reset: request link, verify token, and set new password.
- Gmail connection (UI): initiate OAuth from UI, show sync status, and allow manual sync.
- Subscriptions dashboard: view summaries and details (planned/expanding).

The UI surfaces transparency data provided by the backend (e.g., number of emails scanned, last sync time, extraction confidence) and never stores raw email content.


## Tech stack

- React 18 + TypeScript
- Vite (dev/build tooling)
- React Router (routing)
- Zustand (app state)
- React Hook Form + Zod (forms + validation)
- Axios (HTTP)
- tsyringe (dependency injection for clean layering)
- Tailwind CSS (styling) + utility helpers


## High‑level frontend architecture

This app follows a feature‑first clean architecture style with three layers per feature:
- presentation: React components, pages, hooks, and local view state
- domain: use‑cases, repositories interfaces, and entities (framework‑agnostic)
- data: concrete data sources (network) and models

Cross‑cutting modules live under src/core (routing, UI primitives, errors/helpers, DI configuration, etc.).

Textual flow for a typical action (e.g., login):
UI (Form) -> Presentation Hook -> Domain Use‑Case -> Repository -> Data Source (Axios -> Backend API)
        <- Success/Failure returned up the chain -> Store (Zustand) -> UI renders

Dependency injection: DI container (tsyringe) wires implementations to interfaces at app bootstrap (see src/core/init-dependencies).

State management: Lightweight central store via Zustand with slices per feature. Components use hooks to trigger effects/use‑cases and to select state.

Routing: Public‑only and protected routes via loaders and layout boundaries.


## Folder structure (selected)

- src/
  - App.tsx — App root, router provider
  - main.tsx — bootstrap, DI setup
  - index.css — global styles
  - core/
    - assets/ — images and static assets
    - common/
      - presentation/
        - components/
          - forms/ — shared form inputs
          - layouts/ — page layouts (Auth, Dashboard)
          - ui/ — UI primitives (button, input, label, card)
        - pages/ — shared pages (error, not found)
      - presentation/state/store/ — Zustand root store
    - constants/ — env and images constants
    - errors/ — Failure and ServerException types
    - helpers/ — error extraction helpers for layers
    - init-dependencies/ — wiring DI and use‑cases
    - route/ — router and auth loaders (public/protected)
    - use-case/ — base UseCase contracts
  - features/
    - authentication/
      - data/
        - datasource/ — AuthNetwork (axios) and datasource facade
        - model/ — DTO<->entity mapping
        - repository/ — repository implementation
      - domain/
        - entity/ — domain entities (AuthEntity, etc.)
        - repository/ — repository interface
        - use-case/ — login, register, refresh token, Google, reset password, etc.
      - presentation/
        - components/ — forms and layout wrappers
        - pages/ — login, register, forget/reset password pages
        - state/
          - hooks/ — hooks to run effects/use‑cases
          - store/ — slice, actions, effects, selectors
    - dashboard/ (skeleton) — protected landing page
  - types/ — global type declarations for assets

Note: this is a curated view. New modules will be added as development continues.


## Environment variables

The frontend expects the backend URL at build/runtime:
- VITE_BACKEND_URL — base URL of the backend API (e.g., http://localhost:3000)

Example .env (Vite):
VITE_BACKEND_URL=http://localhost:3000

The value is consumed via import.meta.env in src/core/constants/env.constants.ts.


## Backend API integration

Auth endpoints used by the frontend (aligned with backend README):
- POST /auth/register — create user
- POST /auth/login — obtain access/refresh tokens
- POST /auth/google — login with Google (send { idToken })
- POST /auth/refresh-token — rotate access token
- GET  /auth/request-reset-password — send reset link to user email (?email=...)
- POST /auth/verify-token — verify password reset token
- POST /auth/reset-password — set a new password ({ newPassword, token })

Email/Gmail connector (planned UI integration):
- GET  /email/get-auth — obtain Google OAuth URL
- POST /email/get-token — exchange OAuth code for tokens
- GET  /email/sync-status — current sync status
- POST /email/manual-sync — trigger sync job

Subscriptions (planned UI expansion):
- REST endpoints to list/manage extracted subscriptions


## Local development

Prerequisites: Node.js LTS and npm.

Install dependencies:
- npm install

Run in dev mode:
- npm run dev

Build for production:
- npm run build

Preview production build locally:
- npm run preview

Lint and format:
- npm run lint
- npm run format
- npm run format:check


## Routing and access control

- Public‑only routes: /login, /register, /forget-password, /reset-password
  - If the user is already authenticated, loaders redirect to the dashboard.
- Protected area: /
  - Dashboard layout and child routes require a valid session; otherwise loaders redirect to /login.


## Error handling & UX

- Each layer provides narrow, typed errors (Failure, ServerException) with mapping helpers to show user‑friendly messages.
- Presentation hooks catch failures and surface toast/messages as needed.


## Styling

- Tailwind CSS utility classes and small UI primitives (button, input, label, card).
- Layout components enforce consistent page structure.


## Contributing & project conventions

- Feature‑first structure with clean architecture boundaries (presentation/domain/data).
- DI via tsyringe: implementations are registered during bootstrap (see src/core/init-dependencies).
- Prefer explicit use‑cases invoked from presentation hooks/effects.
- Keep repository interfaces framework‑agnostic and free of React concerns.
- Favor small, focused components and co‑locate tests when added.


## Notes

- This repository focuses on the frontend UI. See the backend README for server behavior, data privacy guarantees, and API details.
- Type safety: Zod schemas validate forms; DTO mapping isolates API contracts from UI components.
- Future work: Gmail connection UI, subscription list/detail UI, privacy dashboard, notifications.

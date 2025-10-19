# Bank Notification Reader Frontend

A privacy-focused bank email notification reader UI built with React, TypeScript, and Vite. Integrates with a NestJS + Postgres backend for authentication, Gmail connection, and bank notification insights.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Folder Structure](#folder-structure)
- [Setup & Development](#setup--development)
- [Environment Variables](#environment-variables)
- [API Integration](#api-integration)
- [Routing & Access Control](#routing--access-control)
- [Error Handling](#error-handling)
- [Styling](#styling)
- [Contributing](#contributing)
- [Architectural Design](#architectural-design)
- [Diagrams](#diagrams)

---

## Features

- **Authentication:** Register, login, Google login, refresh tokens
- **Password Reset:** Request link, verify token, set new password
- **Gmail Connection:** Initiate OAuth, show sync status, manual sync (UI planned)
- **Dashboard:** View bank notification summaries and details (planned/expanding)
- **Privacy:** No raw email content stored; transparency on data scanned and sync status

---

## Tech Stack

- React 18 + TypeScript
- Vite (dev/build tooling)
- React Router (routing)
- Zustand (state management)
- React Hook Form + Zod (forms + validation)
- Axios (HTTP)
- tsyringe (dependency injection)
- Tailwind CSS (styling)

---

## Architecture

- **Feature-first, Clean Architecture:**
  - Presentation: Components, pages, hooks, local state
  - Domain: Use-cases, repository interfaces, entities (UI-agnostic)
  - Data: Concrete data sources (network), models
- **Dependency Injection:** DI container (tsyringe) wires implementations at bootstrap
- **State Management:** Zustand slices per feature
- **Routing:** Public/protected routes with loaders and layout boundaries

---

## Folder Structure

```
src/
├─ App.tsx           # App root, router provider
├─ main.tsx          # Bootstrap, DI setup
├─ index.css         # Global styles
├─ core/
│  ├─ assets/        # Images, static assets
│  ├─ common/
│  │  └─ presentation/
│  │     ├─ components/
│  │     │  ├─ forms/
│  │     │  ├─ layouts/
│  │     │  └─ ui/
│  │     └─ pages/
│  ├─ constants/     # Env, image constants
│  ├─ errors/        # Failure, ServerException
│  ├─ helpers/       # Error extraction helpers
│  ├─ init-dependencies/ # DI wiring
│  ├─ route/         # Router, auth loaders
│  └─ use-case/      # Base UseCase contracts
├─ features/
│  ├─ authentication/
│  │  ├─ data/
│  │  ├─ domain/
│  │  ├─ presentation/
│  │  └─ validation/
│  └─ dashboard/
└─ types/
```

---

## Setup & Development

**Prerequisites:** Node.js LTS, npm

```sh
npm install           # Install dependencies
npm run dev           # Start dev server
npm run build         # Build for production
npm run preview       # Preview production build
npm run lint          # Lint code
npm run format        # Format code
npm run format:check  # Check formatting
```

---

## Environment Variables

- `VITE_BACKEND_URL` — Base URL of the backend API (e.g., http://localhost:3000)
- Set in `.env` and consumed via `import.meta.env` in `src/core/constants/env.constants.ts`

---

## API Integration

**Auth Endpoints:**

- `POST /auth/register` — Create user
- `POST /auth/login` — Obtain tokens
- `POST /auth/google` — Google login
- `POST /auth/refresh-token` — Rotate access token
- `GET  /auth/request-reset-password` — Send reset link
- `POST /auth/verify-token` — Verify reset token
- `POST /auth/reset-password` — Set new password
- `GET  /auth/me` — Get user profile

**Email Endpoints:**

- `GET  /email/get-auth` — Get OAuth URL
- `POST /email/get-token` — Exchange OAuth code
- `GET  /email/sync-status` — Sync status
- `POST /email/manual-sync` — Trigger sync

**Transaction Endpoints:**

- `GET  /transaction` — Get transactions with query params
- `GET  /transaction/{id}` — Get transaction by ID
- `PUT  /transaction/{id}` — Update transaction
- `GET  /transaction/summary` — Get transaction summary

**Account Endpoints:**

- `GET  /account` — Get accounts
- `GET  /account/{id}` — Get account by ID
- `GET  /account/summary` — Get account summary

**Bank Endpoints:**

- `GET  /bank` — Get banks
- `GET  /bank/{id}` — Get bank by ID

**Category Endpoints:**

- `GET  /category` — Get categories
- `GET  /category/{id}` — Get category by ID

---

## Routing & Access Control

- **Public routes:** `/login`, `/register`, `/forget-password`, `/reset-password`
  - Redirect to dashboard if authenticated
- **Protected routes:**
  - `/` (dashboard)
  - `/link-email` (link email for Gmail sync)
  - `/transactions` (view transactions)
  - `/accounts` (manage accounts)
  - `/insights` (view insights)
  - `/settings` (user settings)
  - Require valid session; else redirect to `/login`

---

## Error Handling

- Typed errors (Failure, ServerException) at each layer
- Mapping helpers for user-friendly messages
- Presentation hooks surface errors via toast/messages

---

## Styling

- Tailwind CSS utility classes
- UI primitives: button, input, label, card
- Layout components for consistent structure

---

## Contributing

- Feature-first structure, clean architecture boundaries
- DI via tsyringe, explicit use-cases
- Repository interfaces are UI-agnostic
- Small, focused components; co-locate tests

---

## Architectural Design

This project follows a **feature-first, clean architecture** approach, ensuring separation of concerns, testability, and scalability. The main architectural concepts are:

### 1. Layered Structure

- **Presentation Layer:**
  - Contains UI components, pages, hooks, and local state.
  - Handles user interaction, form validation, and state display.
  - Example: `src/features/authentication/presentation/` and `src/core/common/presentation/`.
- **Domain Layer:**
  - Contains business logic, use-cases, repository interfaces, and entities.
  - Is UI-agnostic and does not depend on data or presentation layers.
  - Example: `src/features/authentication/domain/`.
- **Data Layer:**
  - Implements data access (API calls, models, data sources).
  - Maps network/data models to domain entities.
  - Example: `src/features/authentication/data/`.

### 2. Dependency Injection

- Uses `tsyringe` for dependency injection.
- All dependencies (repositories, use-cases) are registered at startup in `src/core/init-dependencies/`.
- Promotes loose coupling and easier testing.

### 3. State Management

- Uses Zustand for global state, with slices per feature.
- Local state is managed in components/hooks where appropriate.

### 4. Routing & Access Control

- Uses React Router for navigation.
- Public and protected routes are defined in `src/core/route/`.
- Loaders and layout boundaries enforce authentication and redirect logic.

### 5. Error Handling

- Typed errors propagate from data to presentation layer.
- Helpers map errors to user-friendly messages.

### 6. Extensibility

- New features are added as new folders under `features/`, each with its own data, domain, and presentation subfolders.
- Shared code lives in `core/common` and `core/helpers`.

---

## Diagrams

### Auth Flow (Mermaid)

The authentication flow in this project follows a clean separation of concerns and leverages the layered architecture. Here is how the flow works:

1. **User Interaction:**
   - The user submits their credentials (email/password or Google login) via a form in the UI.
2. **Presentation Layer:**
   - The form component calls a presentation hook (e.g., `useLogin`) which handles form state, validation, and submission.
3. **Domain Layer:**
   - The hook invokes a domain use-case (e.g., `LoginUseCase`) that encapsulates the business logic for authentication.
4. **Repository Abstraction:**
   - The use-case calls a repository interface, which abstracts the data source (network, local storage, etc.).
5. **Data Layer:**
   - The repository implementation makes an HTTP request to the backend API using Axios.
6. **Backend API:**
   - The backend validates the credentials and returns tokens and user profile data.
7. **Data Mapping:**
   - The repository maps the API response to a domain entity and returns it to the use-case.
8. **State Update:**
   - On success, the presentation hook updates the global state (Zustand store) with the new session and user data.
9. **Navigation:**
   - The UI navigates the user to the dashboard or shows error messages as appropriate.

```mermaid
sequenceDiagram
  autonumber
  participant U as User
  participant V as UI (Form)
  participant H as Presentation Hook
  participant UC as Domain Use‑Case
  participant R as Repository
  participant N as AuthNetwork (Axios)
  participant API as Backend API
  participant S as Store (Zustand)
  U->>V: Submit credentials
  V->>H: onSubmit(formData)
  H->>UC: execute(LoginPayload)
  UC->>R: login(payload)
  R->>N: POST /auth/login
  N->>API: Axios request
  API-->>N: 200 OK { tokens, profile }
  N-->>R: data
  R-->>UC: AuthEntity
  UC-->>H: Success(AuthEntity)
  H->>S: setSession(tokens, user)
  S-->>V: state update
  V-->>U: Navigate to dashboard
```

---

## Notes

- Type safety: Zod schemas validate forms; DTO mapping isolates API contracts from UI
- Future: Gmail connection UI, bank notification list/detail UI, privacy dashboard, notifications
- See backend README for server/data privacy details

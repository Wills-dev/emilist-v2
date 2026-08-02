# Emilist

Emilist is a marketplace and project-management platform for finding work, hiring experts, sourcing materials, and managing project-related activity. It is built with Next.js, TypeScript, and a feature-first architecture.

## Highlights

- Job, expert, and material marketplace experiences
- Material browsing, detail pages, image galleries, availability, and reviews
- Authenticated material reviews with modal-based login protection
- Material creation flows with image uploads and validation
- Dashboard listed-material management with responsive cards, pagination, loading and empty states
- Material listing updates with rich descriptions, formatted numeric inputs, incremental image uploads, image removal, price-only editing, and archive confirmation
- Cart retrieval and management: quantities, item removal, discount codes, and server-calculated order summaries
- Dashboard material marketplace with responsive filters and management actions
- Dashboard order management with responsive order cards, compact pagination, status-aware actions, and reusable cancellation, return, and tracking modals
- Responsive order tracking for confirmed, out-for-delivery, and delivered states
- Client-side data fetching, caching, loading skeletons, empty states, and pagination
- Token-aware authentication with immediate login state, refresh-time session restoration, logout cleanup, and profile-completion modal flows
- Responsive dashboard overview with profile-aware states, persisted quick actions, referral sharing, and job-completion insights
- Layout-matched overview loading skeletons and staggered card animations
- Filterable, animated weekly, monthly, and yearly job-completion doughnut reports with accessible percentage callouts
- Responsive notification modal with populated and empty states, sorting, action links, and clear-all handling
- Responsive dashboard drawer with grouped navigation, Pro plan access, user identity, and active-route styling
- Smart mobile-app download route with iOS and Android store detection
- Dashboard, cart, checkout, enterprise booking, and marketing pages
- Reusable Atomic Design UI primitives: atoms, molecules, organisms, and templates

## Tech stack

- [Next.js 16](https://nextjs.org/) with the App Router
- React 19 and TypeScript
- Tailwind CSS 4 and shadcn/ui primitives
- TanStack Query for server-state fetching and caching
- Axios for API requests
- Zustand for client-side/auth flow state
- Radix UI, Lucide icons, Sonner, Framer Motion, and date-fns
- Tiptap for document-style material description editing and rendering

## Project structure

```text
src/
├── app/          # Routes, layouts, and route-level pages
├── components/   # Shared UI, organised with Atomic Design
│   ├── atoms/
│   ├── molecules/
│   ├── organisms/
│   ├── templates/
│   └── ui/       # shadcn/ui primitives
├── features/     # Domain modules: API, hooks, types, and UI
│   ├── auth/
│   ├── experts/
│   ├── jobs/
│   ├── materials/
│   ├── notifications/
│   ├── overview/
│   └── orders/
├── lib/          # Shared helpers, hooks, constants, and API utilities
└── store/        # Zustand stores and store types

public/
└── assets/       # Static images, icons, and dummy assets
```

## Prerequisites

- Node.js 20.9 or newer
- npm

## Getting started

Clone the repository and install dependencies:

```bash
git clone https://github.com/Wills-dev/emilist.git
cd emilist-v2
npm install
```

Create a `.env.local` file in the project root:

```bash
NEXT_PUBLIC_BACKEND_BASE_URL=https://your-api.example.com
NEXT_PUBLIC_WEB_URL=http://localhost:3000

# Optional. Set when cookies need to work across subdomains in production.
NEXT_PUBLIC_COOKIE_DOMAIN=
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server. |
| `npm run build` | Create a production build. |
| `npm run start` | Run the production build locally. |
| `npm run lint` | Run ESLint. |

## Architecture notes

### Features own domain logic

Keep domain-specific API clients, hooks, types, and feature UI together under `src/features/<feature>`. For example, material requests belong in `src/features/materials/api`, while material query/mutation hooks belong in `src/features/materials/hooks`.

### Shared UI stays generic

Place reusable UI in `src/components`. Shared components should receive data and callbacks through props rather than importing feature-specific API code.

### One component per folder

Give each component its own folder and implementation file (for example, `MaterialCard/MaterialCard.tsx`). Keep component-specific tests and supporting files in that same folder so they are easy to find and maintain.

### Hooks separate behaviour from presentation

Put request state, form state, mutations, validation, and submit handlers in hooks. Components should primarily render the UI and connect inputs to a hook's returned values and handlers.

The material editing flow follows this separation explicitly: modal composition, form fields, form state and payload normalization, image state, image presentation, and API mutations are maintained as focused modules.

### Numeric form inputs

Keep price and quantity fields as text inputs with numeric input modes so formatting remains controllable across browsers. Quantities accept digits only, while prices may display thousands separators. Always remove presentation commas and convert values to numbers before creating API payloads.

### Material images

New material images remain local until the create or update request is submitted. Removing a newly selected image only updates local state. Existing persisted images are removed through the material image deletion endpoint and should refresh the related material queries after a successful request.

### Data fetching

Use TanStack Query for remote data. Include all request inputs in the query key, invalidate related keys after mutations, and render loading, empty, and error-safe states around query data.

### Authentication lifecycle

Successful login responses update `currentUser` and `isAuthInitialized` atomically in Zustand, allowing public navigation controls to switch immediately from Login/Sign Up to Dashboard. The login response is the source of truth for that browser session; `/auth/current-user` is used to restore the session when the application loads or the browser is refreshed with an existing token.

User response normalization supports APIs that return the user directly or under `user` or `userData`. Logout calls `GET /auth/log-out`, clears application cookies, auth-flow state, cart state, modals, and the React Query cache, then returns the user to the home page. Local cleanup still runs if the server logout request fails.

### Dashboard overview

The overview feature lives in `src/features/overview` and contains the dashboard metrics, profile-aware welcome state, configurable quick actions, referral panel, and job-completion insight report. Quick-action preferences are persisted per user through `src/store/dashboardPreferencesStore.ts`.

The overview route provides an instant `loading.tsx` fallback and also displays the same layout-matched skeleton while authentication initializes. Dashboard cards use staggered entrance and subtle hover animations, while the doughnut chart animates between filtered datasets and respects reduced-motion preferences.

The temporary typed insight fixture is defined in `src/features/overview/constants/insightReportTestData.ts`. It provides week, month, and year values that each total 100 and can be replaced with API data using the same `InsightReportData` shape.

The Spotlight card reuses the shared `UserRatingCard`; selecting the featured user's name navigates through the standard profile route.

### Notifications

The dashboard notification bell opens the responsive notification modal from `src/features/notifications`. The modal supports latest/oldest sorting, action links, a scrollable populated state, and a clear action that reveals the `NotificationEmpty` state.

Typed development fixtures live in `src/features/notifications/constants/testNotifications.ts`. The exported `testNotifications` collection opens the populated state with ten records, while `emptyNotifications` can be supplied to render the empty state directly. During manual testing, selecting **Clear Notifications** also transitions from populated to empty without changing code.

### Mobile app downloads

Use `/download` as the public smart-download URL and QR-code destination. On iPhone and iPad it redirects to the Emilist App Store listing; on Android it redirects to Google Play. Desktop and unrecognized devices receive a page with both store choices. Store URLs are maintained in `src/lib/constants/appDownload.ts`.

### Loading states

Use the shared shadcn `Skeleton` for loading UI. Skeleton layouts should match the rendered page structure—including dashboard container widths, columns, spacing, and tertiary panels—to prevent layout shifts when data resolves. The shared primitive uses `bg-gray-200` as the loading surface.

The overview skeleton intentionally renders before the current user's profile-completion status is known. Once authentication initializes, it is replaced by either the completed dashboard or the profile-completion welcome state.

### Styling

Use Tailwind utilities and the theme tokens defined in `src/app/globals.css`. Prefer semantic theme utilities for shared typography and colors as they are introduced; avoid adding new repeated arbitrary color or font-size values.

## Contributing

1. Keep changes scoped to the relevant feature or shared component.
2. Prefer existing atoms, molecules, hooks, helpers, and shadcn/ui primitives before creating new ones.
3. Use `Skeleton` for loading placeholders and `EmptyState` for empty API responses.
4. Run `npm run lint` before opening a pull request.
5. Do not commit `.env.local` or other secrets.

## Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_BACKEND_BASE_URL` | Yes | Base URL used by the Axios API client. |
| `NEXT_PUBLIC_WEB_URL` | Recommended | Public application URL used when composing referral and QR-code download links. |
| `NEXT_PUBLIC_COOKIE_DOMAIN` | Optional | Cookie domain for multi-subdomain production deployments. |

## License

This repository is private. All rights reserved.

# Emilist

Emilist is a marketplace and project-management platform for finding work, hiring experts, sourcing materials, and managing project-related activity. It is built with Next.js, TypeScript, and a feature-first architecture.

## Highlights

- Job, expert, and material marketplace experiences
- Material browsing, detail pages, image galleries, availability, and reviews
- Authenticated material reviews with modal-based login protection
- Material creation flows with image uploads and validation
- Client-side data fetching, caching, loading skeletons, empty states, and pagination
- Authentication and profile-completion modal flows
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
│   └── materials/
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

### Hooks separate behaviour from presentation

Put request state, form state, mutations, validation, and submit handlers in hooks. Components should primarily render the UI and connect inputs to a hook's returned values and handlers.

### Data fetching

Use TanStack Query for remote data. Include all request inputs in the query key, invalidate related keys after mutations, and render loading, empty, and error-safe states around query data.

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
| `NEXT_PUBLIC_WEB_URL` | Recommended | Public application URL used when composing share links. |
| `NEXT_PUBLIC_COOKIE_DOMAIN` | Optional | Cookie domain for multi-subdomain production deployments. |

## License

This repository is private. All rights reserved.

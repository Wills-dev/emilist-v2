# Emilist

Emilist is a marketplace and project-management platform for finding work, hiring experts, sourcing materials, and managing project-related activity. It is built with Next.js, TypeScript, and a feature-first architecture.

## Highlights

- Job, expert, and material marketplace experiences
- Material browsing, detail pages, image galleries, availability, and reviews
- Authenticated material reviews with modal-based login protection
- Material creation flows with image uploads and validation
- Responsive two-step public job creation with urgency-specific fields, milestone balancing, draft restoration, protected submission, and a completion route
- Dashboard listed-material management with responsive cards, pagination, loading and empty states
- Material listing updates with rich descriptions, formatted numeric inputs, incremental image uploads, image removal, price-only editing, and archive confirmation
- Cart retrieval and management: quantities, item removal, discount codes, and server-calculated order summaries
- Dashboard material marketplace with responsive filters and management actions
- Paginated public and dashboard jobs marketplace with server-backed search, job-specific filters, personalized saved state, animated cards, and infinite-scroll loading
- API-backed homepage job cards with loading, retry, empty, and personalized liked states
- Full-viewport job image previews rendered through a portal with scroll locking and Escape-key dismissal
- API-backed public and dashboard job details with galleries, milestones, urgency-aware timelines, employer information, responsive loading skeletons, and dashboard actions
- Swipeable job comparison with reusable comparison cards and downloadable CSV reports
- Dashboard job management with API-backed status tabs, subscription-restricted leads, action menus, and URL-preserved tab selection
- Shared owner/artisan job-information layouts with applicants, milestones, invoices, payments, and status-specific actions
- Dashboard job editing with reused creation steps, existing attachment removal, and multipart updates
- Role-specific public and dashboard profiles for artisans, employers, and merchants
- Responsive dashboard expert marketplace with service filters, saved experts, profile details, full review pages, and animated infinite-scroll listings
- Responsive public expert marketplace with the dedicated expert banner, search, sorting, service filters, public profiles, rating summaries, and full review pages
- Swipeable expert comparison with reusable comparison cards and downloadable comparison reports
- Dashboard-only service registration that reuses the expert business and verification forms while preserving the public registration flow
- Linked review counts across job, expert, and material cards with routes to their corresponding full review pages
- Dashboard order management with responsive order cards, compact pagination, status-aware actions, and reusable cancellation, return, and tracking modals
- Responsive order tracking for confirmed, out-for-delivery, and delivered states
- Client-side data fetching, caching, loading skeletons, empty states, and pagination
- Token-aware authentication with immediate login state, refresh-time session restoration, logout cleanup, and profile-completion modal flows
- Responsive User Settings with editable biodata, rich-text bio, independent profile-photo upload, immediate auth-state synchronization, loading skeletons, and animated tab transitions
- Responsive bank-details settings with searchable countries, password-confirmed saves, and support for multiple account drafts
- Expert-service settings with multiple-service switching, editable business details, photos, pricing, and collapsible credentials
- Security, notification-preference, and subscription settings with account deactivation, billing history, printable receipts, and reusable confirmation dialogs
- Responsive dashboard overview with profile-aware states, persisted quick actions, referral sharing, and job-completion insights
- Layout-matched overview loading skeletons and staggered card animations
- Filterable, animated weekly, monthly, and yearly job-completion doughnut reports with accessible percentage callouts
- Responsive dashboard Reports with Jobs, Finance, Trade, and Insights views, interactive doughnut charts, CSV exports, and target management
- API-backed messaging with Socket.IO updates, conversation modals, immediate outgoing messages, delivery icons, voice recording, attachments, read receipts, presence, typing indicators, and incoming-message sounds
- API-backed notification modal with pagination, read status, deletion, loading and empty states
- Wallet overview, currency wallets, funding, payout accounts, withdrawal requests, and transaction history
- Milestone payments through Wallet or Paystack, invoice/receipt downloads, and payment-return confirmation
- API-backed job analytics with reusable month/year and date-range filters
- Applicant business profiles and optimistic business likes, with business IDs kept separate from messaging user IDs
- Responsive dashboard drawer with grouped navigation, Pro plan access, user identity, and active-route styling
- Responsive dashboard support page with direct contact actions, categorized FAQs, the supplied support artwork, and staggered animations
- Reusable segmented tabs with desktop pill and mobile select presentations
- Shared logout confirmation flow across desktop and mobile dashboard navigation
- Smart mobile-app download route with iOS and Android store detection
- Dashboard, cart, checkout, enterprise booking, and marketing pages
- Accessible home-page section reveals that animate upward as content enters the viewport while keeping the hero immediately visible
- Reusable Atomic Design UI primitives: atoms, molecules, organisms, and templates

## Tech stack

- [Next.js 16](https://nextjs.org/) with the App Router
- React 19 and TypeScript
- Tailwind CSS 4 and shadcn/ui primitives
- TanStack Query for server-state fetching and caching
- Axios for API requests
- Socket.IO client for real-time messaging
- Zustand for client-side/auth flow state
- Radix UI, Lucide icons, Sonner, Framer Motion, and date-fns
- Tiptap for document-style material, business-description, and profile-bio editing and rendering

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
│   ├── businesses/
│   ├── experts/
│   ├── jobs/
│   ├── materials/
│   ├── messages/
│   ├── notifications/
│   ├── overview/
│   ├── orders/
│   ├── payments/
│   ├── profiles/
│   ├── reports/
│   ├── settings/
│   ├── subscriptions/
│   └── support/
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

Copy `.env.example` to `.env.local` in the project root and set the values for your environment:

```bash
NEXT_PUBLIC_BACKEND_BASE_URL=https://your-api.example.com/api/v1
NEXT_PUBLIC_SOCKET_URL=https://your-api.example.com
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

Give each component file its own identically named folder (for example, `MaterialCard/MaterialCard.tsx` or `ProfileSkeleton/ProfileSkeleton.tsx`). This also applies to providers, icons, nested components, and shared UI primitives such as `src/components/ui/skeleton/skeleton.tsx`. Import the implementation using its full path. Keep component-specific tests and supporting files alongside it.

Next.js route conventions (`page.tsx`, `layout.tsx`, and `loading.tsx`) and non-component modules such as table-column definitions retain their existing locations.

### Hooks separate behaviour from presentation

Put request state, form state, mutations, validation, and submit handlers in hooks. Components should primarily render the UI and connect inputs to a hook's returned values and handlers. Keep business logic and event-handler implementations in `.ts` hooks and helpers, and reuse existing dashboard components before introducing another layout.

The material editing flow follows this separation explicitly: modal composition, form fields, form state and payload normalization, image state, image presentation, and API mutations are maintained as focused modules.

### Numeric form inputs

Keep price and quantity fields as text inputs with numeric input modes so formatting remains controllable across browsers. Quantities accept digits only, while prices may display thousands separators. Always remove presentation commas and convert values to numbers before creating API payloads.

### Public job creation

The public job-creation flow is available at `/post-job`. It uses a responsive two-step form: job details first, followed by one to five milestones. Successful submissions navigate to `/post-job/congratulations`.

The details step sends the conditional block required by the selected urgency:

| Urgency | API value | Required conditional fields | Milestone budget source |
| --- | --- | --- | --- |
| Right now | `right_now` | `jobDuration`, `totalBudget` | `totalBudget` |
| In future | `in_future` | `jobSchedule`, `estimatedBudget` | `estimatedBudget` |
| Regularly | `regularly` | `jobFrequency`, `startDate`, `recurringBudget`; `endDate` is optional | One `recurringBudget` period |

Shared fields include category, service, title, description, urgency, location, milestones, optional images, and either public-bidding fields or a direct-hire expert ID. Category and service options currently come from `src/features/jobs/constants/postJob.ts` and should be replaced by an authoritative taxonomy endpoint when one is available.

Milestone allocation follows these invariants:

- Every job has between one and five milestones.
- A compact sticky guide remains visible while scrolling later milestones, showing the current milestone count and the budget and duration reserved for the final checkpoint.
- Earlier milestone payments are editable; the final payment is read-only and automatically receives the unallocated budget balance.
- Milestone amounts are calculated in currency minor units so the total exactly matches the selected job budget, including decimal values.
- Milestone currency is derived from the job budget and cannot diverge from it.
- For `right_now` jobs, earlier milestone durations are editable and the final duration receives the remaining project time. Duration comparisons use one day, seven-day weeks, and fixed 30-day months.
- Jobs without a total project duration still require a positive duration for every milestone, but their milestone durations are not accumulated against the schedule.

The form submits `multipart/form-data` to `POST /jobs/create-job`. Nested values such as `location`, `milestones`, budgets, schedules, and durations are JSON-encoded, while each selected file is appended with the `files` key. Image selection is limited to ten PNG or JPEG files of at most 5 MB each.

Only serializable draft fields are persisted. Browser `File` objects and blob preview URLs stay in memory; after a refresh, the restored draft asks the user to re-upload previously selected images. Store restoration is explicitly delayed until the client mounts so saved steps and urgency branches cannot conflict with the server-rendered HTML. Logging out revokes preview URLs and clears both the in-memory and persisted job draft.

Protected submissions resume once after authentication and profile completion. Direct creation accepts an expert Business `uniqueId` through `expertId`, omits bidding and experience-level fields, and creates a new direct-job invitation. The direct target is deliberately not persisted across sessions or unrelated jobs.

`POST /jobs/create-job` does not attach an expert to an existing job. Hiring for an existing job requires a separate job-selection experience and an employer-side invitation or assignment endpoint that accepts both the existing job ID and the expert Business `uniqueId`. Existing expert-card actions should not be connected to the new-job route until that API contract is available.

The current form requires a full location address. The payload supports latitude and longitude when a location provider supplies both values, but it does not fabricate coordinates when only an address is available.

### Material images

New material images remain local until the create or update request is submitted. Removing a newly selected image only updates local state. Existing persisted images are removed through the material image deletion endpoint and should refresh the related material queries after a successful request.

### Data fetching

Use TanStack Query for remote data. Include all request inputs in the query key, invalidate related keys after mutations, and render loading, empty, and error-safe states around query data.

The home-page Jobs tab and the public and dashboard Find Jobs screens use `GET /jobs/fetch-all-jobs`. The home section requests the first four available records without marketplace filter state. The API client, wire DTOs, query-key factory, response mapper, query/controller hooks, and list presentation are kept in separate job-feature modules. The marketplace controller sends the submitted search text, selected categories and locations, unformatted budget limits, job urgency, lower-case experience level, minimum employer rating, and the authenticated viewer's `_id` when available. Multi-value filters are serialized as stable comma-separated values.

The jobs-list responsibilities are intentionally layered:

- `api/fetchAllJobs.ts` serializes supported query parameters, executes the request, validates the page envelope, and logs the complete response during development.
- `helpers/jobList.ts` contains pure filter normalization and API-record-to-card mapping, including urgency-specific budgets, schedules, `jobFiles`, and missing-field fallbacks.
- `hooks/useGetAllJobs.ts` owns the reusable TanStack infinite query and server pagination.
- `hooks/useHomeJobs.ts` configures that query for the four-card homepage section without creating marketplace filter state.
- `hooks/useJobsMarketplace.ts` combines marketplace search and filters, the authenticated viewer ID, paginated results, and duplicate removal.
- `queries/jobKeys.ts` centralizes cache keys so different filters and viewers remain isolated while job mutations can invalidate the complete jobs query family.

Public and dashboard job-detail pages use `GET /jobs/fetch-job-by-id` with the job `id`, `reviewsPage`, and `reviewsLimit` query parameters. The API client validates the response envelope, `useGetJobById` owns TanStack Query caching and request cancellation, and `helpers/jobDetails.ts` maps the wire response into the view model consumed by the information and milestone components. Loading uses a responsive skeleton that follows the final page layout, while failed requests provide a retry action.

The detail timeline follows the same urgency-specific contract as job creation:

- `right_now` displays `jobDuration`, with singular and plural duration units handled for presentation.
- `in_future` displays the `jobSchedule` start and end dates.
- `regularly` displays `jobFrequency` together with its start date and optional end date.

Milestone duration, amount, currency, and description values also come from the fetched job. The UI components remain request-agnostic and receive normalized job data through props.

Pagination comes from `currentPage`, `totalPages`, and `totalJobs`; the next page is requested only while `currentPage < totalPages`. Changing any normalized filter creates a new query key and restarts the list at page one. Initial loading, retryable errors, no-results, next-page progress, and end-of-list states are rendered by the shared `JobCardList`.

Job likes use `POST /jobs/like-job/{jobId}` and `POST /jobs/unlike-job/{jobId}`. `useToggleLike` requires authentication and updates both the matching detail cache and every loaded page containing the job before the request completes. It snapshots the complete jobs query family first, allowing a failed request to restore the previous liked state. After a successful request, invalidating `jobKeys.all` marks both `jobs/list/*` and `jobs/detail/*` queries stale; active queries refetch immediately and inactive queries refresh when they are used again. This keeps the responsive optimistic interaction while treating the server-provided `liked` field as authoritative.

The documented list response does not currently include budget, currency, timeline, media, or creation date. The mapper can consume the matching create-job fields when the API supplies them, but otherwise cards show explicit unavailable states instead of copying fixture values. In development, the complete response envelope is logged as `[fetchAllJobs] response` to make contract verification straightforward; production builds do not log it.

The all-jobs endpoint has no sort parameter, so sort controls are intentionally hidden on its API-backed lists rather than sorting only the pages already loaded. Saved jobs are fetched independently through `GET /jobs/fetch-liked-jobs`; the dashboard saved-jobs page maps those records through the shared job-card view model and applies its search, sorting, and filters to the returned collection. Because membership in this response is authoritative, every returned record is normalized to `isLiked: true` even when the API omits its `liked` field, ensuring the saved-state control renders consistently. Unliking a saved job removes it from the liked-jobs cache optimistically and restores it if the request fails.

Job image previews use the shared `ImagePreview` component. The preview is portalled directly into `document.body` so animated sections and horizontally scrolling card containers cannot clip its fixed backdrop. While open, it covers the complete viewport, prevents background scrolling, and closes from the backdrop or Escape key.

Temporary or demonstration records must live in a clearly named `constants/dummy.ts` or dedicated test-data constants file within the owning feature. Keep fixtures, domain types, rendering components, and interaction hooks separate so API data can replace fixtures without restructuring the UI.

### Authentication lifecycle

Successful login responses update `currentUser` and `isAuthInitialized` atomically in Zustand, allowing public navigation controls to switch immediately from Login/Sign Up to Dashboard. The login response is the source of truth for that browser session; `/auth/current-user` is used to restore the session when the application loads or the browser is refreshed with an existing token.

User response normalization supports APIs that return the user directly or under `user` or `userData`. Dashboard logout actions first open the shared confirmation modal on desktop and mobile. Confirming logout calls `GET /auth/log-out`, clears application cookies, auth-flow state, cart state, the post-job draft and image previews, modals, and the React Query cache, then returns the user to the home page. Local cleanup still runs if the server logout request fails.

### User settings

The authenticated user settings page is available at `/dashboard/settings`. Dashboard header avatars and the desktop and mobile sidebar identities link to this route. It includes User Details, Services, Bank Details, Security, Notifications, and Subscriptions. Larger screens use pill-style navigation, while small screens use a compact dropdown to avoid horizontally overflowing tabs. Both presentations come from the shared generic `SegmentedTabs`, which is also used by credential management and support FAQ categories.

User Details follows read-first editing: biodata and bio values render as content until Edit is selected. Edit remains beside each section heading, while Save and Cancel appear after the complete input or textarea group on every screen size. On small screens, content is ordered as profile summary, biodata, then bio. The profile summary uses the shared default avatar when no image exists and displays verification, rating, review, email, and unique-ID information without allowing long identifiers to break the layout. Unverified users can open the request-verification confirmation UI; its final submission remains ready for the verification endpoint when that backend route becomes available.

Profile responsibilities are separated into focused hooks:

- `useUserProfileForm` manages biodata and bio drafts and submits them to `POST /auth/add-profile`.
- `useProfileImageUpload` manages image validation, preview, cancellation, and submission to `POST /auth/upload-image` using the `image` form-data key.
- `useSyncCurrentUser` synchronizes successful responses with Zustand and the TanStack Query `currentUser` cache.

The settings route has a layout-matched `loading.tsx` fallback and continues showing the same skeleton while authentication restores `currentUser` after a refresh. Settings sections use staggered entrance animations, and tab content uses animated enter/exit transitions.

Bank Details uses a two-column field grid on larger screens and a single column on small screens. Each account collects bank name, account number, account name, bank country, and the user's Emilist password for save authorization. Bank name remains a text input, account numbers accept digits only, and country selection uses the shared `SearchableSelect` with a constrained results panel.

`useBankDetailsForm` owns the temporary multi-account form state. Passwords are maintained separately from bank-detail values and cleared after a save. The Add another bank action appears only after an existing account has been saved, and another account cannot be added while the current one is incomplete or unsaved. This state is currently client-side only and is structured for the future fetch, create, update, and delete bank-detail endpoints.

The settings bank-detail drafts are separate from wallet payout accounts. Wallet payout accounts use the connected NGN bank lookup and account-resolution endpoints described under Wallets, payments, and receipts.

Services supports users with more than one expert business. The selector changes the active service without turning display values into inputs. The tab is composed from focused profile, description, photo, and business-detail cards so editing responsibilities remain isolated and readable. These flows handle business details, description, display image, business photos, formatted currency pricing, and certificate, membership, and insurance arrays. Credential management uses the shared segmented control to switch between Certificates, Memberships, and Insurance, while retaining the collapsible form patterns from service registration. Mutations submit nested `FormData` to `PATCH /business/update-business/:id`. Services are loaded from `GET /business/fetch-user-business` through the shared businesses feature.

Security provides password fields and a confirmed account-deactivation flow. Deactivation calls `PATCH /auth/deactivate-user`, then clears the local session and cached authenticated data. Notification preferences are persisted per user in browser storage through `notificationPreferencesStore`. The existing Allow new message notification setting controls incoming-message sounds; preference synchronization with the backend is not connected.

Subscriptions uses `GET /subscription/get-plans`, with `duration=monthly` or `duration=yearly`, plus `GET /subscription/get-user-subscription` and `GET /subscription/get-all-user-subscriptions` for the current plan and history. Activation uses `POST /subscription/subscribe-plan` from a reusable payment modal with Wallet and Paystack options; Paystack sends `paymentMethod: "Card"`. Basic is free and displays “Doesn’t expire.” The selected settings tab persists in the URL, including after refresh. Paid yearly activation remains dependent on the backend billing-duration contract.

### Dashboard overview

The overview feature lives in `src/features/overview` and contains the dashboard metrics, profile-aware welcome state, configurable quick actions, referral panel, and job-completion insight report. Quick-action preferences are persisted per user through `src/store/dashboardPreferencesStore.ts`.

The overview route provides an instant `loading.tsx` fallback and also displays the same layout-matched skeleton while authentication initializes. Dashboard cards use staggered entrance and subtle hover animations, while the doughnut chart animates between filtered datasets and respects reduced-motion preferences.

The temporary typed insight fixture is defined in `src/features/overview/constants/insightReportTestData.ts`. It provides week, month, and year values that each total 100 and can be replaced with API data using the same `InsightReportData` shape.

The Spotlight card reuses the shared `UserRatingCard`; selecting the featured user's name navigates through the standard profile route.

### Dashboard jobs marketplace

The authenticated jobs marketplace lives under `/dashboard/marketplace/jobs`. It reuses the shared marketplace tabs, filters, job cards, search, rating, profile, and action components while keeping dashboard navigation separate from the public `/marketplace/jobs` experience.

Dashboard job routes include:

| Route | Purpose |
| --- | --- |
| `/dashboard/marketplace/jobs` | Browse, search, filter, and progressively load jobs from the jobs API. |
| `/dashboard/marketplace/jobs/saved` | View saved jobs with the active pink saved-state control. |
| `/dashboard/marketplace/jobs/[id]` | View dashboard-specific job information, milestones, and actions. |
| `/dashboard/marketplace/jobs/[id]/reviews` | View, search, and add reviews for the job owner. |
| `/dashboard/marketplace/jobs/compare` | Compare selected jobs and download a CSV comparison report. |

Dashboard job cards receive dashboard-specific detail and comparison links. Public cards retain their public routes. Marketplace navigation remains active throughout `/dashboard/marketplace/*`, while the separate dashboard Jobs navigation points to `/dashboard/jobs`.

The public and dashboard marketplace lists use an intersection observer to request the next server page as the user scrolls. There is no numbered pagination on these listing pages. The comparison page uses horizontal scrolling on narrow screens with swipe guidance and preserves a multi-column comparison view when space permits.

Development fixtures for owner reviews and comparison records are kept in `src/features/jobs/constants/dummy.ts`. Public and dashboard job-information pages resolve real list IDs through the fetch-job-by-ID endpoint, while the saved-jobs page uses the liked-jobs endpoint. Components should not define dummy records inline. Reusable domain options that are not fixtures, such as job categories, belong in `src/features/jobs/constants/index.ts`, while data shapes belong in `src/features/jobs/types`.

### Dashboard job management

`/dashboard/jobs` separates Listed, Overdue, Paused, Active, Completed, and Leads tabs. Listed is the default and has no query parameter; other tabs use `?tab=active`, `?tab=leads`, and so on. Detail and applicant navigation carries the originating tab so returning restores it. Job-information sections use `?section=applicants`, `invoices`, or `payments`.

| Route | Purpose |
| --- | --- |
| `/dashboard/jobs/[id]` | Shared job details with owner/artisan-specific actions and milestones. |
| `/dashboard/jobs/[id]/edit` | Edit job details, attachments, and milestones using the shared creation steps. |
| `/dashboard/jobs/[id]/applicants/[expertId]` | View an applicant in the context of the job. |
| `/dashboard/jobs/[id]/applicants/[expertId]/reviews` | View applicant reviews while preserving job navigation. |

Listed jobs include `listed`, `in-review`, `applied`, and `rejected` records. Rejected rows are muted. Row actions use an icon-triggered dropdown with a View entry. Artisan details provide offer-response, withdrawal, and milestone-completion controls; owner details provide editing, applicant review, pause/resume, and milestone-review controls as appropriate to the status.

Job requests follow `api → query hook → mapper → presentation`, with shared keys in `queries/jobKeys.ts`:

| Endpoint | Usage |
| --- | --- |
| `GET /jobs/fetch-listed-jobs` | Listed-job records and pagination. |
| `GET /jobs/fetch-jobs-by-status` | Active, paused, overdue, and completed records. |
| `GET /jobs/leads` | Paginated recommendations for the user's business. |
| `PUT /jobs/update-job/{jobId}` | Multipart job updates, reusing the job-creation serializer. |
| `DELETE /jobs/remove-job/{jobId}/file/{fileId}` | Remove an existing job attachment. |

Leads require an active subscription on a non-basic plan. The client sends only the documented `page` and `limit` parameters (defaults: 1 and 10). Search filters the current page and is labelled accordingly. Lead queries include the signed-in user's ID in their cache key, support cancellation, and reuse the jobs table's skeleton and empty states. Expert leads remain a separate, unavailable category.

**Leads contract assumptions:** the adapter currently expects the shared `{ message, data: { jobs, currentPage, totalPages, totalJobs } }` envelope and treats HTTP 402/403 as subscription restrictions. Confirm these against a real endpoint response. Other failures show an error with retry; malformed successful responses are rejected rather than displayed as empty results.

Applicants are loaded from `GET /jobs/fetch-applicants`. Regular-job application acceptance/rejection and job pause/unpause use `PATCH /jobs/update-application-status/{projectId}`; despite the parameter name, `projectId` is an **application ID**. An accepted applicant is labelled accordingly, while competing applications are dimmed and response actions are restricted until cancellation. Biddable jobs retain their offer/history actions.

Applicant details reuse the existing expert profile and review layouts. `GET /business/fetch-single-business/{businessId}` fetches the business used in the application and includes the **logged-in viewer’s user ID** as the `userId` query parameter for personalized like state. Business likes use `PATCH /business/like-business/{businessId}` and `PATCH /business/unlike-business/{businessId}` with optimistic updates and rollback on failure. Messaging targets the **applicant’s user ID**, never the business ID or application ID. The compact message icon appears beside Share on expert details, not on application cards.

Job analytics uses `GET /jobs/user-job-analytics` with optional `year`, `month`, `startDate`, and `endDate` parameters. Cards show `totalJobs`, `totalActiveJobs`, `totalOverdueJobs`, and `totalCompletedJobs`, with matching loading skeletons and retry handling. The reusable `DateFilter` combines searchable month/year dropdowns, a validated date range, and Clear filters for all-time results; a date range replaces month/year parameters.

Invoice and milestone-payment details use real payment status, actual amount paid, payment method, and payment date. Paid documents download as receipts; unpaid documents download as invoices. Invoice identifiers are shortened and copyable. Dispute actions remain placeholders until the dispute endpoint is supplied. Other actions without confirmed mutation contracts continue to show availability feedback.

### Role-specific profiles

| Route | Purpose |
| --- | --- |
| `/profiles/[kind]/[id]` | Public profile for `artisan`, `employer`, or `merchant`. |
| `/profiles/[kind]/[id]/reviews` | Public profile reviews. |
| `/dashboard/profiles/[kind]/[id]` | Profile within the authenticated dashboard layout. |
| `/dashboard/profiles/[kind]/[id]/reviews` | Profile reviews within the dashboard. |
| `/profile/[id]` | Compatibility destination for older links that contain only a user ID. |

Employer and merchant pages share `PersonProfileView`; artisans reuse the expert profile and review components. Employer summaries resolve through `?jobId=...`, and merchant summaries through `?materialId=...`, verifying that the source record belongs to the requested user. Full profile/review APIs are not yet connected. Missing sources show an unavailable state; product ratings are not used as merchant ratings. Applicant-context artisan profiles fetch the application’s business and reuse the expert presentation. General artisan marketplace/profile routes still use the existing expert fixtures where remote listing/profile lookup is not connected.

The singular `/profile/[id]` route cannot resolve a generic user without a lookup API and currently shows an unavailable state. It is not the current user's settings page; that remains `/dashboard/settings`.

### Dashboard experts marketplace

The authenticated expert marketplace lives under `/dashboard/marketplace/experts`. It reuses shared marketplace controls and expert cards while supplying dashboard-specific profile, review, saved, and comparison destinations.

Dashboard expert routes include:

| Route | Purpose |
| --- | --- |
| `/dashboard/marketplace/experts` | Browse, search, sort, filter, and progressively load experts. |
| `/dashboard/marketplace/experts/saved` | View saved experts with the shared active saved-state control. |
| `/dashboard/marketplace/experts/[id]` | View an expert's profile, gallery, business information, rating summary, and recent reviews. |
| `/dashboard/marketplace/experts/[id]/reviews` | View and search an expert's complete review history. |
| `/dashboard/marketplace/experts/compare` | Compare experts in a responsive horizontal comparison view. |
| `/dashboard/offer-service` | Register a service without repeating profile completion. |

Dashboard offer-service links—including marketplace actions, overview quick actions, and mobile navigation—use `/dashboard/offer-service`. The public `/become-expert` route remains a separate three-step flow. Dashboard registration hydrates the completed user profile into the submission payload and presents only service setup and expertise verification. Users whose profiles are incomplete are returned to profile completion.

Business descriptions and profile bios reuse the same Tiptap rich-text editor as material descriptions. Render saved rich text through `RichTextContent` so supported headings, paragraphs, emphasis, and lists display correctly instead of exposing stored HTML.

Expert fixtures and comparison data live in `src/features/experts/constants/dummy.ts`; UI components should not define demonstration records inline.

### Public experts marketplace

The public expert marketplace is available under `/marketplace/experts`. It follows the same responsive structure as the public jobs and materials experiences, using the shared marketplace banner, tabs, search, sorting, filters, saved-filter action, expert cards, and mobile filter modal. The expert banner uses `public/assets/images/experts.svg` with the dark-green `#0F6B4B` to `#215342` gradient.

Public expert routes include:

| Route | Purpose |
| --- | --- |
| `/marketplace/experts` | Browse, search, sort, and filter verified experts. |
| `/marketplace/experts/[id]` | View an expert's public profile, gallery, pricing, business information, rating summary, and recent reviews. |
| `/marketplace/experts/[id]/reviews` | View, search, and add reviews from the public expert experience. |

Public and dashboard expert profiles reuse the same profile and review components while receiving route-specific navigation and width constraints from their parent layouts. Shared review summaries use `w-full` so the public page can fill its wider review column without changing the narrower dashboard presentation.

### Dashboard messages

The authenticated message center is at `/dashboard/messages`. The desktop sidebar, mobile drawer, and header message icon navigate to this full page. Desktop keeps the inbox and chat side by side; mobile retains the original animated transitions between them. Sidebar timestamps show today’s time, Yesterday, a weekday within the preceding six days, or a full date for older messages. Contact previews truncate to one line, and message sections show Today, Yesterday, or the existing date format for older days. The message page follows the visual viewport when a mobile keyboard opens, prevents page scrolling, keeps the composer visible above safe-area insets, and scrolls history independently. Mobile inputs use a 16px font to avoid focus zoom. Message images open in the shared accessible image-preview dialog; file attachments download through credential-free blob requests instead of opening another tab.

Messaging lives under `src/features/messages`: `api/` owns HTTP requests, `queries/` user-scoped cache keys, `hooks/` state and event handlers, `helpers/` mapping/validation/cache updates, `audio/` incoming chimes, and `components/` presentation. It uses the shared authenticated Axios client and `socket.io-client`; temporary message fixtures have been removed.

| Endpoint | Usage |
| --- | --- |
| `GET /chat/fetch-all-chat` | Paginated inbox, optional search, conversation unread counts, and global unread count. |
| `GET /chat/fetch-message/{otherUserId}` | Message history for the other participant’s **user ID**, with `page` and `limit`. |
| `POST /chat/send-message/{receiverId}` | Multipart message creation using `content` and repeated `attachments` fields. |
| `PATCH /chat/chats/{chatId}/read` | Mark a conversation read using its **chat ID**. |

Page 1 contains the newest history page; older pages are prepended in chronological order. Messages are deduplicated by `_id` so HTTP responses and socket echoes appear once. Outgoing messages appear immediately, with a clock while pending, one tick when sent, two ticks when read, and a red failure icon. The send button keeps its normal icon. Failed sends remain visible and preserve the draft for retry. Confirmed messages update cached history directly without a full history refetch.

Socket authentication uses `auth: { token }`. The client handles `newMessage`, `messageSent`, `messagesRead`, `getOnlineUsers`, `typing`, and `stopTyping`; typing events sent to the server contain `receiverId` and `chatId`. Reconnection refreshes the inbox and active history. Online badges are green and Offline badges are red. Opening a visible conversation, receiving an active message, or returning to a visible browser tab synchronizes read status.

The shared composer supports text up to 5,000 characters and up to ten image, document, or audio attachments, each at most 15 MB. File and image controls remain separate. Voice recording includes Stop, Cancel, and an audio preview before sending; it requires microphone permission and HTTPS or localhost. The browser sets the multipart boundary; do not manually set the FormData Content-Type. Emoji selection reuses the shared `EmojiPicker`.

`MessageButton` opens the narrower 80vh `MessageModal` for starting or continuing a conversation outside the full message center. Pass a `MessageRecipient` containing the recipient’s **user ID**, name, and optional image. Existing history loads automatically; a new conversation shows the shared empty state and composer. The server creates the chat ID on the first send. Modal content mounts only while open, and closing it releases its socket listeners and typing timers.

Incoming `newMessage` events play a short chime automatically when the user’s general message-notification preference is enabled. Own messages, outgoing `messageSent` echoes, history fetches, duplicate events, and ordinary clicks do not play a chime. There is no separate Inbox sound toggle or test chime. Audio unlocks silently during normal page interaction, resumes after interruption, and retains the unlocked context across navigation. Browser autoplay restrictions and device/browser volume settings still apply. Notification preferences are stored per user locally, not synchronized across devices.

### Wallets, payments, and receipts

`/dashboard/payments` uses the wallet overview endpoint for the selected balance, currency selector, wallet list, and default payout bank account. Wallet loading uses a skeleton matching the card. Amount inputs display commas and API payloads use numbers; wallet payments require a wallet matching the payment currency.

| Endpoint | Usage |
| --- | --- |
| `GET /wallet/fetch-wallet-overview` | Selected wallet, all currency wallets, and default payout account; accepts `walletId` or `currency`. |
| `GET /wallet/fetch-wallets` | Available wallets for payment forms. |
| `POST /wallet/create-wallet` | Create a wallet for a currency. |
| `PATCH /wallet/set-default-wallet/{walletId}` | Set the default wallet after confirmation. |
| `POST /wallet/initiate-wallet-funding` | Paystack card funding or bank-transfer funding with proof of payment. |
| `GET /wallet/fetch-banks` | Banks displayed in the searchable, scrollable bank selector. |
| `POST /wallet/add-bank-account` | Resolve and save an NGN payout account. |
| `POST /wallet/withdraw-funds` | Request a withdrawal for admin approval. |
| `GET /transaction/fetch-all-user-transactions` | Paginated transaction history with references and related identifiers. |
| `GET /transaction/fetch-my-transaction/{transactionId}` | Transaction details/status. |
| `GET /transaction/verify-paystack-payment/{reference}` | Verify a returning Paystack payment. |
| `POST /jobs/pay-for-job` | Pay a milestone through Wallet or Paystack. |

Milestone payments always include the milestone amount; additional invoice cost is optional. Paystack appears as the option label while requests send `paymentMethod: "Card"`. Checkout redirects accept `data.paymentLink` and the supported authorization URL fields. A redirect alone does not establish payment success: return handling verifies the reference, polls transaction status, refreshes related data, and shows confirmation for wallet, job, and subscription payments.

Payment return URLs use `NEXT_PUBLIC_WEB_URL`, falling back to the browser origin when unset. Wallet funding returns to `/dashboard/payments`, job payments to the originating job path/section, and subscriptions to `/dashboard/settings?tab=subscriptions`. Keep the checkout reference and transaction context intact when verifying a return.

### Dashboard reports

`/dashboard/reports` uses the existing Reports and Insights cards, doughnut charts, legends, tabs, target modal, and empty-state artwork with API-backed data. Request clients, types, query keys, state hooks, validation, and chart mapping live separately under `src/features/reports`. Requests reuse the authenticated Axios client and `NEXT_PUBLIC_BACKEND_BASE_URL`; no second API base URL is required.

| Endpoint | Usage |
| --- | --- |
| `GET /reports` | Jobs, applicants/my applications, finance, orders/sales, insights, and target progress. |
| `GET /reports/export` | Download the backend-generated CSV with the same filters. |
| `GET /reports/targets` | Load the target for the selected monthly or annual period and currency. |
| `PUT /reports/targets` | Create or update targets for that period and currency. |
| `POST /reports/events` | Record actual impressions, clicks, shares, and contacts. |

Month selection sends only `year`, `month`, and `currency`. Year selection sends `year`, `range=year`, and `currency`; rolling ranges send `range=last7days`, `last30days`, or `last90days`. Custom dates send `startDate`, `endDate`, and `currency` after Apply range. Clear filters resets the date drafts, selected period, currency, and report search to the current month and NGN. Date-range controls expand and collapse smoothly, respect reduced-motion preferences, and leave calendar popovers unclipped after opening. The displayed date label comes from `report.filters.label`. Card period controls share this filter state. Changing currency refetches backend aggregates; there are no frontend exchange rates or simulated period scaling. CSV export uses the same normalized parameters and never recalculates the report locally.

The search box filters the four local report categories and is not sent to the aggregate API. Skeletons match the report cards. Empty sections show No records found. Flagged application metrics are hidden when `flaggedTrackingAvailable` is false, and remaining-click metrics are hidden when the API returns a null limit. Promotion duration, clicks, and target completion use server values, including a configured/unconfigured target state and the backend tracking note.

Target forms preserve the existing layout, format amounts with commas, and send numeric `job`, `amount`, `referrals`, and `invites` fields. Annual maps to `duration: "yearly"` and omits `month`; Monthly maps to `duration: "monthly"` with the selected year/month. The endpoint upserts by period/currency. Successful saves refresh the user’s report and target queries; failed saves keep the modal open for retry.

Tracking records impressions when real job, material, business, or profile content becomes visible, clicks on resource-detail links, successful share actions, and authenticated contact actions that open messaging. Visibility observers disconnect after recording. Fixture resources are excluded, repeated visibility callbacks for the same element/resource are deduplicated, and tracking failures do not block navigation or messaging. Resource events send only `resourceId` and `resourceType`; the backend resolves ownership. Profile events send `subjectUserId` instead. Saves and invitations remain backend-tracked through their existing mutations. Unrecorded historical activity is not reconstructed.

### Notifications

The dashboard notification bell opens the responsive, API-backed modal in `src/features/notifications`. Notifications use `GET /notification/fetch-user-notification` with `page` and `limit`; marking read uses `PATCH /notification/mark-as-read/{notificationId}`, and deletion uses `DELETE /notification/clear-notification/{notificationId}`. The feature separates response normalization, queries, mutations, and presentation, with loading, empty, and error states. General message/email notification preferences live under Settings → Notifications; the message preference also controls incoming chat sounds.

### Dashboard support

The authenticated support page is available at `/dashboard/support` and uses the same `Container` width, responsive grid proportions, and spacing as the dashboard overview. It combines direct email, telephone, and Instagram actions with the supplied `public/assets/images/support-img.svg` artwork. The image scales responsively but never exceeds its designed 616-pixel height.

The FAQ panel reuses the shared `FaqCard` with its compact dashboard variant and `SegmentedTabs` for General, Jobs, Payments, and Others. Typed category data lives in `src/features/support/constants/supportFaqs.ts`. The page stacks on narrower screens, grows naturally on short laptop viewports instead of using a fixed viewport height, and uses staggered entrance animations with restrained hover feedback.

### Mobile app downloads

Use `/download` as the public smart-download URL and QR-code destination. On iPhone and iPad it redirects to the Emilist App Store listing; on Android it redirects to Google Play. Desktop and unrecognized devices receive a page with both store choices. Store URLs are maintained in `src/lib/constants/appDownload.ts`.

### Loading states

Use the shared shadcn `Skeleton` for loading UI. Skeleton layouts should match the rendered page structure—including dashboard container widths, columns, spacing, and tertiary panels—to prevent layout shifts when data resolves. The shared primitive at `src/components/ui/skeleton/skeleton.tsx` uses `bg-gray-200` and disables its pulse animation for reduced-motion preferences.

Route-level `loading.tsx` files and Suspense fallbacks cover profiles and reviews, dashboard jobs, marketplace listings and details, comparisons, listed materials, login, cart, and checkout. Reuse the same skeleton for client-side query loading where appropriate. Profile skeletons distinguish artisan galleries from employer/merchant summaries; job-section skeletons distinguish applicants, invoices, and payments. Public route fallbacks retain their marketplace banners. Shared placeholder sections live under `src/components/molecules/PageSkeleton`, while feature-specific skeletons stay with their feature.

Navigation side effects belong in effects or event handlers, not state updater callbacks. The congratulations countdown navigates from an effect after reaching zero and cleans up its timers.

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
| `NEXT_PUBLIC_BACKEND_BASE_URL` | Yes | REST base URL used by Axios, including `/api/v1`. |
| `NEXT_PUBLIC_SOCKET_URL` | Yes for messaging | Socket.IO server origin, without `/api/v1` (for example, `https://be.emilist.com`). |
| `NEXT_PUBLIC_WEB_URL` | Recommended | Public application base URL used for payment return URLs, referrals, and QR-code download links. Payment return URLs fall back to the browser origin if unset. |
| `NEXT_PUBLIC_COOKIE_DOMAIN` | Optional | Cookie domain for multi-subdomain production deployments. |

Set `NEXT_PUBLIC_WEB_URL` to the frontend address for each environment (for example, `http://localhost:3000` locally). Wallet funding returns to `/dashboard/payments`; job payments return to the current Job Info path and section. Restart the development server after changing environment variables. Set deployment values before building; production changes require rebuilding because `NEXT_PUBLIC_` values are bundled at build time. Use `.env.example` as the template and keep local environment files out of commits.

## License

This repository is private. All rights reserved.

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
- Responsive dashboard jobs marketplace with search, sorting, job-specific filters, saved jobs, animated cards, and infinite-scroll loading
- Dashboard job details with galleries, milestones, employer reviews, compare and promotion actions, and mobile milestone navigation
- Swipeable job comparison with reusable comparison cards and downloadable CSV reports
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
- Responsive dashboard messaging with searchable conversations, local sending, attachment controls, an emoji picker, and populated and empty states
- Responsive notification modal with populated and empty states, sorting, action links, and clear-all handling
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
│   ├── experts/
│   ├── jobs/
│   ├── materials/
│   ├── messages/
│   ├── notifications/
│   ├── overview/
│   ├── orders/
│   ├── reports/
│   ├── settings/
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

No universal provider-neutral bank-account ownership lookup is integrated. Available services have regional constraints—for example, Paystack account resolution targets supported African markets, Plaid ownership products cover supported banking regions, and Stripe Financial Connections focuses on US bank accounts—so verification should be connected through the future backend based on the product's supported countries.

Services supports users with more than one expert business. The selector changes the active service without turning display values into inputs. The tab is composed from focused profile, description, photo, and business-detail cards so editing responsibilities remain isolated and readable. These flows handle business details, description, display image, business photos, formatted currency pricing, and certificate, membership, and insurance arrays. Credential management uses the shared segmented control to switch between Certificates, Memberships, and Insurance, while retaining the collapsible form patterns from service registration. Mutations submit nested `FormData` to `PATCH /business/update-business/:id`. Until a business-list endpoint is available, typed expert fixtures live in `src/features/settings/constants/expertServices.ts`.

Security provides password fields and a confirmed account-deactivation flow. Deactivation calls `PATCH /auth/deactivate-user`, then clears the local session and cached authenticated data. Notification preferences currently use local state and are ready to be replaced by notification-settings endpoints.

Subscriptions presents responsive plan summaries and a TanStack Table billing history with the shared pagination controls. Each history row can print a receipt containing its transaction ID, amount, issue date, payment date, description, and status. Plan and billing records currently come from `src/features/settings/constants/subscriptions.ts`; plan activation, renewal, and remote subscription retrieval remain integration points for their future endpoints.

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
| `/dashboard/marketplace/jobs` | Browse, search, sort, filter, and progressively load jobs. |
| `/dashboard/marketplace/jobs/saved` | View saved jobs with the active pink saved-state control. |
| `/dashboard/marketplace/jobs/[id]` | View dashboard-specific job information, milestones, and actions. |
| `/dashboard/marketplace/jobs/[id]/reviews` | View, search, and add reviews for the job owner. |
| `/dashboard/marketplace/jobs/compare` | Compare selected jobs and download a CSV comparison report. |

Dashboard job cards receive dashboard-specific detail and comparison links. Public cards retain their public routes. Marketplace navigation remains active throughout `/dashboard/marketplace/*`, while the separate dashboard Jobs navigation points to `/dashboard/jobs`.

The marketplace and saved-job lists use an intersection observer to load additional cards as the user scrolls. There is no numbered pagination on these listing pages. The comparison page uses horizontal scrolling on narrow screens with swipe guidance and preserves a multi-column comparison view when space permits.

Development fixtures for jobs, owner reviews, job information, and comparison records are kept in `src/features/jobs/constants/dummy.ts`. Components should not define dummy records inline. Reusable domain options that are not fixtures, such as job categories, belong in `src/features/jobs/constants/index.ts`, while data shapes belong in `src/features/jobs/types`.

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

The authenticated messaging page is available at `/dashboard/messages`. The desktop sidebar, mobile dashboard drawer, and dashboard header message icon all navigate to this route. The page follows the dashboard `Container` structure and separates inbox search, conversation rows, chat headers, message bubbles, the composer, the empty state, and state management into focused Atomic Design and feature modules.

Typed temporary conversations live in `src/features/messages/constants/dummyMessages.ts` until the messaging endpoint is available. `messageThreads` renders the populated inbox and active conversation, while `emptyMessageThreads` can be passed to `MessagesWrapper` to test the supplied `Message-emptystate.svg` state. The `useMessages` hook owns search, conversation selection, unread clearing, responsive panel state, and locally sent messages so endpoint integration can replace the data source without restructuring the UI.

On small screens, selecting a conversation slides the chat in from the right, while returning to the inbox reverses the transition. Desktop retains both panels side by side. The composer uses separate document and image inputs: the file control accepts common document, spreadsheet, presentation, text, and archive formats, while the image control accepts `image/*` only. The shared `EmojiPicker` provides grouped emoji selection and closes on outside click or Escape. The chat body uses the `GrayedLogo` message variant as a low-opacity blurred watermark.

### Dashboard reports

The authenticated Reports page is available at `/dashboard/reports`. It provides Jobs and Applications, Earnings and Expenses, Orders and Sales, and Insights and Targets views. Report search, type tabs, month and year selectors, per-card period filters, and CSV exports are composed from focused feature components rather than a single route-level implementation.

The generic `DonutChart` molecule accepts arbitrary labelled segments, centre content, colors, and display values. Segment proportions come directly from their numeric values, animate without modifying their SVG dash lengths, and expose accessible mouse-hover and keyboard-focus tooltips. The Jobs centre value represents the sum of active, pending, completed, and overdue jobs. Applications can switch between Applicants and My Applications datasets, while Finance cards can convert totals and legend values between NGN, USD, EUR, and CAD using temporary development rates.

Every populated report card has a functional period dropdown. Changing the period updates its date range, chart dataset, centre value, and legend values. Insights use yearly filters, while the other report groups use 7-day, 30-day, and 90-day periods. Report fixtures live in `src/features/reports/constants/dummyReports.ts` and filtering helpers live under `src/features/reports/utils` pending API integration.

The shared targets modal supports both a blank Set Targets state and a prefilled Review Targets state for monthly or annual goals. Saving updates the local Targets card and displays confirmation feedback. `ReportsWrapper` accepts `hasData={false}` to render reusable Job Summary and Application Summary empty cards with the existing `InsightEmptyState` illustration.

### Notifications

The dashboard notification bell opens the responsive notification modal from `src/features/notifications`. The modal supports latest/oldest sorting, action links, a scrollable populated state, and a clear action that reveals the `NotificationEmpty` state.

Typed development fixtures live in `src/features/notifications/constants/testNotifications.ts`. The exported `testNotifications` collection opens the populated state with ten records, while `emptyNotifications` can be supplied to render the empty state directly. During manual testing, selecting **Clear Notifications** also transitions from populated to empty without changing code.

### Dashboard support

The authenticated support page is available at `/dashboard/support` and uses the same `Container` width, responsive grid proportions, and spacing as the dashboard overview. It combines direct email, telephone, and Instagram actions with the supplied `public/assets/images/support-img.svg` artwork. The image scales responsively but never exceeds its designed 616-pixel height.

The FAQ panel reuses the shared `FaqCard` with its compact dashboard variant and `SegmentedTabs` for General, Jobs, Payments, and Others. Typed category data lives in `src/features/support/constants/supportFaqs.ts`. The page stacks on narrower screens, grows naturally on short laptop viewports instead of using a fixed viewport height, and uses staggered entrance animations with restrained hover feedback.

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

# Phase 3: C2C User Experience — Provider Dashboard, Customer Booking Flow & Admin Panel

**Date:** 2026-05-31  
**Branch:** `phase-3/c2c-user-experience` (from `phase-2/c2c-backend-rewrite`)  
**Target:** `master`

---

## Context

Phase 2 delivered the backend rewrite (C2C business logic, payments, unified auth, migration compat) and aligned the frontend API layer. The backend is feature-complete with endpoints for bookings, payments, providers, admin, notifications, and reviews.

**What's missing** are the actual user-facing pages that make the platform usable. Phase 3 builds the frontend UX on top of the Phase 2 backend foundation.

---

## Phase 3 Overview

```
Phase 3 is 5 workstreams delivered in order.
Each workstream is one or more branches, implemented TDD-style.
```

### 3.1 — Customer Booking & Payment Flow
### 3.2 — Provider Dashboard & Booking Management
### 3.3 — Admin Panel Expansion
### 3.4 — Notifications & Customer Profile
### 3.5 — Polish & Edge Cases

---

## 3.1 — Customer Booking & Payment Flow

**Goal:** Let customers browse providers, create bookings, and pay for them.

### Files to create:
| File | Purpose |
|------|---------|
| `frontend/src/imports/MyBookings/MyBookings.tsx` | List of user's bookings with status badges, provider info |
| `frontend/src/imports/BookingDetail/BookingDetail.tsx` | Full booking view: status timeline, provider details, payment |

### Files to modify:
| File | Change |
|------|--------|
| `frontend/src/app/routes.tsx` | Add `/bookings` and `/bookings/:id` routes with `requireAuth` |
| `frontend/src/app/components/Navbar.tsx` | Add "My Bookings" link to `appLinks` |

### Backend endpoints (already exist):
- `GET /bookings/user` — list customer's bookings ✓
- `GET /bookings/:id` — single booking detail ✓
- `POST /bookings` — create booking (needs providerId, vehicleId, description, preferredSchedule) ✓
- `POST /payments/booking/:id/initiate` — returns PayFast redirect URL ✓
- `GET /payments/booking/:id/status` — returns payment status + WhatsApp URL if paid ✓

### Deliverables:
1. **MyBookings page** (`/bookings`) — table/cards showing each booking with provider name, status badge, service description, date. Empty state when no bookings. Status filter tabs (All / Active / Past).
2. **BookingDetail page** (`/bookings/:id`) — status timeline (payment_pending → paid → in_progress → completed/cancelled), provider info card, "Initiate Payment" button that calls `initiatePayment()` and redirects to PayFast sandbox, payment status check when returning from PayFast.
3. **Backend gap:** Need a `POST /bookings` endpoint documented in routes — confirmed it exists at `/bookings` with `providerId`, `vehicleId`, `description`, `preferredSchedule` validation.

### Data flow:
```
FindYourMechanic  →  /bookings/:id  →  InitiatePayment  →  PayFast sandbox
       |                 ↑                                      |
       |          Payment status check ← ← ← ← ← ← ← ← ← ← ← ← |
       |                                                         ↓
  CreateBooking (inline via FindYourMechanic or /bookings POST)  Done (WhatsApp URL unlocked)
```

---

## 3.2 — Provider Dashboard & Booking Management

**Goal:** Give service providers a dashboard to manage bookings, view earnings, and control their availability.

### Files to create:
| File | Purpose |
|------|---------|
| `frontend/src/imports/ProviderDashboard/ProviderDashboard.tsx` | Overview: active bookings count, earnings, quick stats |
| `frontend/src/imports/ProviderBookings/ProviderBookings.tsx` | All provider bookings with status management |
| `frontend/src/imports/ProviderBookingDetail/ProviderBookingDetail.tsx` | Full booking view: customer info, update status |
| `frontend/src/imports/ProviderAvailability/ProviderAvailability.tsx` | Set available days/times |

### Files to modify:
| File | Change |
|------|--------|
| `frontend/src/app/routes.tsx` | Add `/provider/dashboard`, `/provider/bookings`, `/provider/bookings/:id`, `/provider/availability` with `requireAuth` |
| `frontend/src/app/components/Navbar.tsx` | Conditionally show "Provider Dashboard" link when user has provider role |

### Backend endpoints (already exist):
- `GET /bookings/mechanic` — list provider's bookings ✓
- `GET /bookings/:id` — booking detail ✓
- `PATCH /bookings/:id/status` — update booking status (in_progress, completed, cancelled, rejected) ✓
- `GET /mechanics/:id/profile` — provider's own profile ✓
- `PUT /mechanics/:id` — update provider profile ✓

### Backend gaps (need extension):
- `GET /provider/stats` — dashboard quick stats (active bookings, total earnings, this month bookings). Add to `mechanicController`.
- `POST /provider/availability` — save availability schedule. Add route + controller + service.

### Deliverables:
1. **ProviderDashboard** (`/provider/dashboard`) — stat cards (active bookings, total bookings, earnings this month), recent booking activity list, quick actions (view bookings, edit profile).
2. **ProviderBookings** (`/provider/bookings`) — tabular view with status filter tabs, action buttons per row (accept/reject/complete), pagination.
3. **ProviderBookingDetail** (`/provider/bookings/:id`) — customer info card, booking details, status update dropdown + confirm, contact info after payment confirmed.
4. **ProviderAvailability** (`/provider/availability`) — simple weekly schedule picker, days/times selection, save. If backend endpoint not ready, store in localStorage as MVP.

---

## 3.3 — Admin Panel Expansion

**Goal:** Turn the basic admin dashboard into a full panel for platform management.

### Files to create:
| File | Purpose |
|------|---------|
| `frontend/src/imports/AdminUsers/AdminUsers.tsx` | User management table with suspend action |
| `frontend/src/imports/AdminProviders/AdminProviders.tsx` | Provider management with verify/document approval |
| `frontend/src/imports/AdminBookings/AdminBookings.tsx` | All bookings view |
| `frontend/src/imports/AdminPayments/AdminPayments.tsx` | Payment ledger |

### Files to modify:
| File | Change |
|------|--------|
| `frontend/src/imports/PlatformAdminDashboard/PlatformAdminDashboard.tsx` | Add tab navigation: overview / users / providers / bookings / payments / documents. Keep existing dashboard as "Overview" tab. |
| `frontend/src/app/routes.tsx` | May add admin sub-routes or handle via tabs |

### Backend endpoints (all exist):
- `GET /admin/dashboard` — stats ✓
- `GET /admin/users` — list users ✓
- `DELETE /admin/users/:id` — delete user ✓
- `PATCH /admin/accounts/:id/suspend` — suspend account ✓
- `GET /admin/mechanics` — list providers ✓
- `DELETE /admin/mechanics/:id` — delete provider ✓
- `PATCH /admin/mechanics/:id/verify` — verify provider ✓
- `GET /admin/documents` — pending documents ✓
- `PATCH /admin/documents/:id/approve` ✓
- `PATCH /admin/documents/:id/reject` ✓
- `GET /admin/payments` — list all payments ✓

### Deliverables:
1. **Dashboard** → Tabbed layout with 6 tabs: Overview (current dashboard), Users, Providers, Bookings, Payments, Documents.
2. **Users tab** — table with columns: ID, name, email, role, status, "Suspend" / "Delete" action buttons with confirmation dialogs.
3. **Providers tab** — table with columns: business name, owner, email, verification badge, "Verify" toggle, "View Documents" action.
4. **Documents tab** — table of pending documents with "Approve" / "Reject" buttons. Keep the existing activity feed style.
5. **Bookings tab** — read-only table of all platform bookings with search/filter.
6. **Payments tab** — payment ledger showing amount, payer, booking, status, date.

---

## 3.4 — Notifications & Customer Profile

**Goal:** In-app notification system and customer profile management.

### Files to create:
| File | Purpose |
|------|---------|
| `frontend/src/imports/Notifications/Notifications.tsx` | Full notification page |
| `frontend/src/imports/CustomerProfile/CustomerProfile.tsx` | Edit personal info, change password |
| `frontend/src/app/components/NotificationBell.tsx` | Bell icon component with unread count, dropdown |

### Files to modify:
| File | Change |
|------|--------|
| `frontend/src/app/routes.tsx` | Add `/notifications`, `/profile` routes |
| `frontend/src/app/components/Navbar.tsx` | Add notification bell + link, "My Profile" link for customers |

### Backend endpoints (all exist):
- `GET /notifications` — list notifications ✓
- `PATCH /notifications/:id/read` — mark as read ✓
- `GET /users/me` / `PUT /users/me` — get/update profile (verify endpoint exists)

### Backend gaps:
- Need user profile endpoints (`GET /users/me`, `PUT /users/me`). If not exist, create in `userController`/`userService`.
- `GET /notifications/unread-count` — for bell badge. Optional; can count on client side.

### Deliverables:
1. **NotificationBell** — bell icon in Navbar, shows unread count badge, click opens dropdown with last 5 notifications + "View all" link to `/notifications`.
2. **Notifications page** (`/notifications`) — full list with mark-as-read toggle, filter by read/unread.
3. **CustomerProfile** (`/profile`) — edit first name, last name, email, phone number; change password section.

---

## 3.5 — Polish & Edge Cases

**Goal:** Make every page production-ready with proper states.

### Deliverables:
1. **Loading states** — skeleton loaders on every data-fetching page (Bookings, ProviderDashboard, Admin tabs, etc.)
2. **Empty states** — friendly illustrations and CTAs when lists are empty (e.g., "No bookings yet — find a mechanic to get started")
3. **Error boundaries** — per-page error boundary that shows a friendly message + retry button instead of white screen
4. **Form validation** — consistent validation on all forms (booking create, profile edit, provider setup) with inline error messages
5. **Status badge colors** — consistent status color mapping across the entire app:
   - `pending` / `payment_pending` → yellow/amber
   - `paid` → blue
   - `in_progress` → indigo
   - `completed` → green
   - `cancelled` / `rejected` → red/gray
6. **Responsive** — test all new pages on mobile viewport, fix any overflow or layout breaks

---

## Branch Strategy

```
master
  └── phase-2/c2c-backend-rewrite  (merge first, then)
       └── phase-3/3.1-customer-booking-flow
       └── phase-3/3.2-provider-dashboard
       └── phase-3/3.3-admin-panel
       └── phase-3/3.4-notifications-profile
       └── phase-3/3.5-polish
```

Each sub-phase is implemented as a separate branch, reviewed, and merged sequentially. All Phase 3 branches branch from `phase-2/c2c-backend-rewrite` (or `master` once Phase 2 merges).

---

## Dependencies

| Workstream | Depends on | Notes |
|-----------|------------|-------|
| 3.1 Booking Flow | Phase 2 merged | Needs Phase 2 endpoints |
| 3.2 Provider Dashboard | Phase 2 merged | Also needs 3.1 route patterns established |
| 3.3 Admin Panel | Phase 2 merged | Standalone, no dependency on 3.1/3.2 |
| 3.4 Notifications | 3.1, 3.2, or standalone | Navbar changes may conflict with 3.1 |
| 3.5 Polish | All above | Do last — touches all pages |

---

## Estimated Complexity

| Workstream | Files | New Pages | Est. commits |
|-----------|-------|-----------|-------------|
| 3.1 Booking Flow | 2 new, 2 modified | 2 | 3-4 |
| 3.2 Provider Dashboard | 4 new, 2 modified | 4 | 4-5 |
| 3.3 Admin Panel | 4 new, 1 modified | 4 | 3-4 |
| 3.4 Notifications/Profile | 3 new, 2 modified | 2 | 3-4 |
| 3.5 Polish | — | — | 2-3 |

**Total:** ~13 new pages, ~9 modified files, ~15-20 commits across 5 branches.

---

## Risk Areas

1. **Backend gaps** — `POST /provider/availability` and `GET /users/me` may not exist. Need to verify and create during implementation.
2. **Navbar conflicts** — Multiple workstreams modify `Navbar.tsx`. Do Navbar changes in the last applicable workstream to avoid merge conflicts.
3. **Status enum mismatch** — Frontend and backend must agree on booking status values. Document the canonical set:
   - `payment_pending`, `paid`, `whatsapp_redirected`, `in_progress`, `completed`, `cancelled`, `rejected`
4. **Phase 2 not merged yet** — All Phase 3 work branches from `phase-2/c2c-backend-rewrite`. If Phase 2 merges first, rebase onto `master`.

---

## Verification

Before marking each sub-phase complete:

- [ ] All new pages render without console errors
- [ ] Backend APIs respond correctly (run `npm run dev` backend + hit endpoints)
- [ ] Loading states show while data fetches
- [ ] Empty states render when no data
- [ ] Error states handle API failures gracefully
- [ ] Mobile responsive (check at 375px viewport)
- [ ] No regressions on existing pages

# Phase 3 — Adjusted Implementation Plan

> Branch: `phase-3/c2c-ui-experience` from `master`
> Target: `master`

## Workstreams (in order)

### 3.1 — Customer Booking & Payment Flow
Two new pages: MyBookings (list), BookingDetail (detail + payment actions).

### 3.2 — Provider Dashboard & Booking Management
Dedicated dashboard page, booking management, availability.

### 3.3 — Admin Panel Expansion
Tabbed admin: Users, Providers, Bookings, Payments, Documents tabs.

### 3.4 — Notifications & Polish
Notification bell, empty/loading/error states, responsive fixes.

### 3.5 — Bug: Bookings not loading on ProviderInfo
Diagnose and fix the remaining issue where provider bookings don't load.

---

## Starting 3.1 — Customer Booking & Payment Flow

### Files to create:
| File | Purpose |
|------|---------|
| `frontend/src/imports/MyBookings/MyBookings.tsx` | List user bookings with status badges, provider info, empty state |
| `frontend/src/imports/BookingDetail/BookingDetail.tsx` | Full booking view: status timeline, provider card, payment initiation |

### Files to modify:
| File | Change |
|------|--------|
| `frontend/src/app/routes.tsx` | Add `/bookings` and `/bookings/:id` routes with `requireAuth` |
| `frontend/src/app/components/Navbar.tsx` | Add "My Bookings" link to `appLinks` |

### Backend endpoints (already exist):
- `GET /bookings/user` — list customer's bookings ✓
- `GET /bookings/:id` — single booking detail ✓
- `POST /payments/booking/:id/initiate` — PayFast redirect URL ✓
- `GET /payments/booking/:id/status` — payment status + WhatsApp URL ✓

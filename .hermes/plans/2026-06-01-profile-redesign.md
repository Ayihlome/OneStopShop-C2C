# My Profile Redesign — Implementation Plan

> **For Hermes:** Execute this plan task-by-task. No tests needed for UI components — verify in-browser.

**Goal:** Restructure `/mechanic/profile` into two sub-tabs: **Personal Info** (preloaded user data from `GET /users/me`) and **Service Provider Info** (preloaded provider data from `GET /mechanics/:id/profile` + bookings from `GET /bookings/mechanic`).

**Architecture:**
- `/mechanic/profile` stays as the main route, now a tab container
- Personal info tab renders `PersonalInfo.tsx` — form with preloaded first_name, last_name, email, phone, location, photo
- Provider info tab renders `ProviderInfo.tsx` — form with preloaded business_name, whatsapp, specialties, description, availability + bookings table
- Backend endpoints already exist — no new backend work needed

**Existing endpoints:**
| Endpoint | Purpose | Auth |
|----------|---------|------|
| `GET /users/me` | Load personal info | Bearer JWT |
| `PUT /users/me` | Save personal info | Bearer JWT |
| `POST /users/photo` | Upload profile photo | Bearer JWT |
| `GET /mechanics/{id}/profile` | Load provider profile | No auth (public) |
| `PUT /mechanics/{id}` | Save provider info | Bearer JWT |
| `GET /bookings/mechanic` | List provider's bookings | Bearer JWT + provider role |

---

### Task 1: Create PersonalInfo.tsx page

**Objective:** A standalone profile page that preloads user data from `GET /users/me` and allows editing all personal fields.

**Files:**
- Create: `frontend/src/imports/PersonalInfo/PersonalInfo.tsx`

**Step 1: Build the component**

```tsx
// PersonalInfo.tsx
// Fetches GET /users/me on mount → pre-fills form fields
// Fields: first_name, last_name, email, phone, location (city), profile photo
// Photo upload button using POST /users/photo
// Save button calls PUT /users/me
// Shows StatusMessage for loading/saving/error states
```

The component structure:
1. `useEffect` — fetch `client.get('/users/me')`, populate form state
2. Form fields: firstName, lastName, email, phone, location
3. Photo upload: hidden file input + Upload button → `client.post('/users/photo', formData)`
4. Submit: `client.put('/users/me', { first_name, last_name, email, phone_number, city, profile_photo_url })`
5. Validation: firstName, email required; email regex

**Verification:**
- Navigate to `/mechanic/profile` → Personal Info tab shows preloaded user data
- Edits save correctly and fields update after save

---

### Task 2: Create ProviderInfo.tsx page

**Objective:** A provider profile page that preloads provider data and shows bookings for the logged-in provider.

**Files:**
- Create: `frontend/src/imports/ProviderInfo/ProviderInfo.tsx`

**Step 1: Build the component**

```tsx
// ProviderInfo.tsx
// Fetches getMechanicProfile(user.id) on mount → pre-fills provider fields
// Also fetches listProviderBookings() on mount → shows bookings table
// Fields: businessName, whatsappNumber, specialties, description, availability
// Save button calls updateMechanic(user.id, payload)
// Bookings section: table with booking ID, customer, vehicle, status, date
```

The component structure:
1. `useEffect` — fetch provider profile + bookings in parallel
2. Form fields: businessName, specialties (comma-separated), serviceDescription, availability
3. Bookings table: id, vehicle info, status badge, date, action buttons
4. Submit: `updateMechanic(user.id, { business_name, service_description, is_available, specialities })`

**Verification:**
- Switch to Provider Info tab → shows saved provider data
- Bookings table loads if user has bookings
- Edits save and reflect

---

### Task 3: Restructure MyMechanicProfile.tsx as tab container

**Objective:** Current monolithic MyMechanicProfile.tsx becomes a thin wrapper with two sub-tab navigation.

**Files:**
- Modify: `frontend/src/imports/MyMechanicProfile/MyMechanicProfile.tsx`

**Step 1: Replace current content with tab layout**

```tsx
// MyMechanicProfile.tsx
// Tab container with:
// Tab 1: "Personal Info" → renders <PersonalInfo />
// Tab 2: "Provider Info" → renders <ProviderInfo /> (only if isProvider)
// If user is NOT a provider, show PersonalInfo + "Become a provider" CTA
```

**Tab navigation** — use React state, not URL routing (keeps it simple):
```tsx
const [activeTab, setActiveTab] = useState<'personal' | 'provider'>('personal');
```

**Data flow:** MyMechanicProfile checks if user is provider (from localStorage or initial fetch). Passes `isProvider` and `userId` down to child components.

**Verification:**
- Non-provider: sees Personal Info tab + "Become a provider" card
- Provider: sees both tabs, can switch between them
- All data preloads on mount

---

### Task 4: Update routes to support sub-tab navigation

**Objective:** Optional — add query param support so `/mechanic/profile?tab=provider` works.

**Files:**
- Modify: `frontend/src/imports/MyMechanicProfile/MyMechanicProfile.tsx`

Read `?tab=` from URL search params on mount, set initial tab accordingly.

```tsx
const [searchParams] = useSearchParams();
const initialTab = searchParams.get('tab') === 'provider' ? 'provider' : 'personal';
const [activeTab, setActiveTab] = useState(initialTab);
```

**Verification:**
- `/mechanic/profile?tab=provider` opens Provider tab directly
- `/mechanic/profile` opens Personal Info tab

---

### Task 5: ProviderInfo bookings section detail

**Objective:** Build the bookings table section in ProviderInfo with proper status badges and action buttons.

**Files:**
- Modify: `frontend/src/imports/ProviderInfo/ProviderInfo.tsx`

Render a table/card list of bookings:
- Columns: Booking #, Customer name, Vehicle, Status (colored badge), Date, Actions
- Status badge colors: payment_pending=gray, paid=green, in_progress=blue, completed=darkgreen, cancelled=red
- Action buttons: "Mark in progress" (if paid), "Complete" (if in_progress), "Cancel" (if not completed)
- Calls `updateBookingStatus(id, newStatus)` on button click

```tsx
type Booking = {
  id: number;
  booking_status: string;
  preferred_schedule: string;
  vehicle?: { make: string; model: string; license_plate: string };
  customer?: { first_name: string; last_name: string };
};
```

**Verification:**
- Provider with bookings sees them listed
- Status updates work and UI refreshes
- Empty state: "No bookings yet"

---

## Execution Order

```
Task 1: Create PersonalInfo.tsx        ──┐
Task 2: Create ProviderInfo.tsx         ──┤── Commit 1: two new page components
Task 5: Bookings section in ProviderInfo ─┘

Task 3: Restructure MyMechanicProfile.tsx ── Commit 2: tab container
Task 4: URL tab support                    ──┘
```

## Verification Checklist

- [ ] Personal Info tab preloads logged-in user's name, email, phone
- [ ] Personal Info save updates the database
- [ ] Provider Info tab preloads provider profile data (if user is provider)
- [ ] Provider Info bookings table shows provider's bookings
- [ ] Non-provider sees "Become a provider" CTA
- [ ] Tab switching works smoothly
- [ ] `/mechanic/profile?tab=provider` opens correct tab
- [ ] Photo upload works and updates the URL field

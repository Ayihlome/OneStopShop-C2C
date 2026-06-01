# Data Flow Map — OneStopShop-C2C

> Complete end-to-end trace of every data path from form submission to database and back.

---

## 1. AUTHENTICATION FLOW

### 1.1 Signup

```
SignUp.tsx (form: name, email, password, confirmPassword)
  ├── validate() — client-side checks (name non-empty, email regex, password ≥8 chars, match confirm)
  ├── splitName() — "Jordan Smith" → { first_name: "Jordan", last_name: "Smith" }
  ├── signupUser({ first_name, last_name, email, password })
  │   └── POST /auth/signup/user
  │       ├── express-validator: email, password(min:8), first_name, last_name
  │       ├── validate middleware → 400 if errors
  │       ├── authController.signupUser()
  │       │   └── authService.signupUser(req.body)
  │       │       ├── BEGIN TRANSACTION
  │       │       ├── bcrypt.hash(password, 12)
  │       │       ├── INSERT INTO accounts (first_name, last_name, email, password_hash, ...) RETURNING *
  │       │       ├── INSERT INTO users (account_id) VALUES ($1)
  │       │       ├── COMMIT
  │       │       ├── sanitize(account) → strips password_hash
  │       │       └── signToken({ id, email, role: 'user', isProvider: false })
  │       └── Response 201: { data: { user: {...}, token: "eyJ..." }, message: "Success" }
  │
  ├── RESPONSE INTERCEPTOR unwraps: response.data → { data: { user, token }, message }
  ├── auth = response.data → { user, token }
  ├── localStorage.setItem("oss_token", auth.token)
  ├── localStorage.setItem("oss_user", JSON.stringify(auth.user))
  └── navigate("/find-mechanic")
```

**localStorage after signup:**
- `oss_token` = JWT string (Bearer token for all API calls)
- `oss_user` = `{ id, first_name, last_name, email, phone_number: null, city: null, town: null, profile_photo_url: null, status: "active", created_at, updated_at, role: "user" }`

### 1.2 Login (User)

```
Login.tsx (form: email, password)
  ├── validate() — email regex, password non-empty
  ├── loginUser({ email, password })
  │   └── POST /auth/login/user
  │       ├── authController.loginUser()
  │       │   └── authService.loginAccount(email, password)
  │       │       ├── findAccountByEmail(email)
  │       │       │   └── SELECT a.*, CASE WHEN sp.account_id IS NOT NULL THEN 'provider'
  │       │       │       ELSE 'user' END AS role
  │       │       │       FROM accounts a
  │       │       │       LEFT JOIN users u ON u.account_id = a.id
  │       │       │       LEFT JOIN service_provider_profiles sp ON sp.account_id = a.id
  │       │       │       WHERE a.email = $1
  │       │       ├── if !account → 401
  │       │       ├── if account.status !== 'active' → 403
  │       │       ├── bcrypt.compare(password, account.password_hash)
  │       │       ├── sanitize(account)
  │       │       └── signToken(user) → { user, token }
  │       └── Response 200: { data: { user, token }, message: "Success" }
  │
  ├── auth = response.data
  ├── localStorage.setItem("oss_token", auth.token)
  ├── localStorage.setItem("oss_user", JSON.stringify(auth.user))
  ├── if user.isProvider → navigate("/mechanic/profile")
  └── else → navigate("/find-mechanic")
```

### 1.3 Login (Admin — fallback if user login fails)

```
Login.tsx catch block
  └── loginAdmin({ email, password })
      └── POST /auth/login/admin
          ├── authService.loginAdmin(email, password)
          │   ├── SELECT * FROM admins WHERE email = $1
          │   ├── bcrypt.compare(password, admin.password_hash)
          │   └── signToken({ id, email, role: 'moderator'|'superadmin' })
          └── navigate("/admin/dashboard")
```

---

## 2. PROVIDER PROFILE FLOW

### 2.1 Become a Provider

```
MechanicProfileSetup.tsx (form: businessName, whatsappNumber, serviceDescription, years, payfast keys, specialties[])
  ├── validate() — businessName, whatsappNumber required, specialties ≥ 1
  ├── PayFast info banner shown (informational only)
  ├── Maps camelCase → snake_case
  ├── becomeProvider({ business_name, business_whatsapp_number, service_description, specialities, ... })
  │   └── POST /mechanics/become-provider
  │       ├── authenticate middleware (JWT → req.user)
  │       ├── express-validator: whatsapp_number (mobilePhone), optional fields
  │       ├── mechanicController.createProviderProfile(req.user.id, req.body)
  │       │   └── mechanicService.createProviderProfile(accountId, input)
  │       │       ├── SELECT id FROM service_provider_profiles WHERE account_id = $1 → 409 if exists
  │       │       ├── BEGIN TRANSACTION
  │       │       ├── INSERT INTO service_provider_profiles
  │       │       │   (account_id, business_name, business_whatsapp_number, service_description,
  │       │       │    years_of_experience, payfast_merchant_id, payfast_merchant_key, lat, lng)
  │       │       │   VALUES ($1..$9) RETURNING *
  │       │       ├── syncSpecialities(client, profileId, input.specialities)
  │       │       │   └── DELETE FROM provider_specialities WHERE provider_id = $1
  │       │       │       └── for each specialty:
  │       │       │           INSERT INTO specialities (name) VALUES ($1) ON CONFLICT ... RETURNING id
  │       │       │           INSERT INTO provider_specialities (provider_id, speciality_id) ON CONFLICT DO NOTHING
  │       │       ├── [optional] INSERT INTO mechanic_availability (provider_id, day_of_week, start_time, end_time)
  │       │       ├── COMMIT
  │       │       └── Return: getMechanic(accountId) — runs PROVIDER_SELECT query (see §4)
  │       └── Response 201: { data: { fullProviderRow }, message: "Success" }
  │
  ├── client.get('/users/me') — refreshes localStorage oss_user with updated role
  └── navigate("/mechanic/profile")
```

### 2.2 My Profile Page (Provider & Non-Provider)

```
MyMechanicProfile.tsx (renamed MyProfile, exported as default)
  ├── Mount → useEffect → TWO parallel fetches:
  │
  │   A) client.get('/users/me') — personal info (ALWAYS)
  │   │   └── GET /users/me
  │   │       ├── authenticate + requireRole('user', 'provider')
  │   │       └── userService.getUser(req.user.id)
  │   │           └── SELECT a.*, u.id AS user_profile_id, 'user' AS role
  │   │               FROM accounts a
  │   │               INNER JOIN users u ON u.account_id = a.id
  │   │               WHERE a.id = $1
  │   │
  │   B) getMechanicProfile(user.id) — provider profile (try — catch silently if fails)
  │       └── GET /mechanics/:id/profile
  │           ├── NO auth required (public endpoint)
  │           └── mechanicService.getProfile(accountId)
  │               └── → getMechanic(accountId) — PROVIDER_SELECT with WHERE a.id = $1
  │
  ├── Merge data client-side:
  │   └── firstName, lastName, email, phone → from GET /users/me
  │   └── businessName, specialties, serviceDescription → from provider data (if exists)
  │   └── location → provider.city || userData.city || userData.town || ""
  │   └── photoUrl → provider.profile_photo_url || userData.profile_photo_url
  │   └── isProvider → Boolean(providerData)
  │
  ├── If isProvider → render tabs (Edit + Preview) with personal + provider fields
  ├── If !isProvider → render personal info form ONLY + "Become a provider" CTA card
  │
  └── Save (handleSubmit):
      ├── ALWAYS: client.put('/users/me', { first_name, last_name, email, phone_number, city, profile_photo_url })
      │   └── userService.updateUser(accountId, input)
      │       └── UPDATE accounts SET first_name=COALESCE($2,..), ... WHERE id=$1
      │           AND EXISTS (SELECT 1 FROM users WHERE account_id = accounts.id)
      │           RETURNING *, 'user' AS role
      │
      └── IF isProvider: updateMechanic(user.id, { business_name, service_description, ... })
          └── PUT /mechanics/:id (authenticate)
              └── mechanicService.update(accountId, input) — TRANSACTION
                  ├── UPDATE accounts SET ...
                  ├── UPDATE service_provider_profiles SET ... WHERE account_id = $1
                  ├── syncSpecialities()
                  └── RETURN getMechanic(accountId)
```

---

## 3. MECHANICS FEED (Find Your Mechanic)

### 3.1 Page Load Flow

```
FindYourMechanic.tsx
  ├── State: location, specialty (dropdown filters), mechanics[], status, isLoading
  ├── useEffect [location, specialty] — debounced 300ms
  │
  ├── If location || specialty !== "all":
  │   └── filterMechanics({ city: location, specialty })
  │       └── GET /mechanics/filter?city=...&specialty=...
  │           ├── NO auth (public)
  │           └── mechanicService.filterMechanics(req.query)
  │               └── PROVIDER_SELECT (see §4)
  │                   + WHERE a.status = 'active'
  │                   + [optional] a.city ILIKE '%<city>%'
  │                   + [optional] s.name ILIKE '%<specialty>%'
  │                   GROUP BY a.id, sp.id
  │                   ORDER BY sp.verification_badge DESC, average_rating DESC
  │
  └── Else (no filters):
      └── listMechanics()
          └── GET /mechanics
              └── mechanicService.listMechanics()
                  └── PROVIDER_SELECT
                      + WHERE a.status = 'active'
                      + AND sp.provider_status = 'active'
                      + AND sp.verification_badge = true
                      GROUP BY a.id, sp.id
                      ORDER BY sp.verification_badge DESC, average_rating DESC
  │
  ├── On success: response.data.map(normalizeMechanic) → setMechanics()
  │   └── normalizeMechanic() transforms SQL row → UI shape:
  │       id, name (first+last), serviceName, location, specialties[], rating, reviewCount, verified
  │
  ├── On error: setMechanics(fallbackMechanics) + status message
  └── Client-side filter: filteredMechanics = mechanics.filter(location+specialty matches)
```

### 3.2 Mechanic Profile Page (MechProfileFullView)

```
MechProfileFullView.tsx (route: /mechanic/:id)
  ├── useEffect [id] — loads 3 things in parallel:
  │   ├── getMechanicProfile(id) → GET /mechanics/:id/profile → PROVIDER_SELECT WHERE a.id = $1
  │   ├── getMechanicReviews(id) → GET /reviews/mechanic/:id
  │   │   └── reviewService.getMechanicReviews(accountId)
  │   │       └── SELECT r.*, a.first_name, a.last_name
  │   │           FROM reviews r
  │   │           INNER JOIN service_provider_profiles sp ON sp.id = r.service_provider_id
  │   │           INNER JOIN accounts a ON a.id = r.reviewer_user_id
  │   │           WHERE sp.account_id = $1
  │   │           ORDER BY r.created_at DESC
  │   └── listVehicles() → GET /vehicles (authenticated)
  │
  ├── Render: provider header, description, specialties, reviews, booking form
  └── Submit booking → see §5
```

---

## 4. THE PROVIDER_SELECT QUERY

This is the **core data model query** — used by 5 different service functions (list, get, search, filter, profile):

```sql
SELECT
  a.id, a.first_name, a.last_name, a.email, a.phone_number,
  a.city, a.town, a.profile_photo_url, a.status, a.created_at, a.updated_at,
  sp.id AS provider_profile_id,
  sp.business_name, sp.service_description, sp.years_of_experience,
  sp.is_available, sp.verification_badge, sp.verification_status,
  sp.provider_status, sp.lat, sp.lng,
  COALESCE(ROUND(AVG(r.rating)::numeric, 2), 0) AS average_rating,
  COUNT(DISTINCT r.id)::int AS review_count,
  COALESCE(array_agg(DISTINCT s.name) FILTER (WHERE s.name IS NOT NULL), '{}') AS specialities,
  'provider' AS role
FROM accounts a
INNER JOIN service_provider_profiles sp ON sp.account_id = a.id
LEFT JOIN reviews r ON r.service_provider_id = sp.id
LEFT JOIN provider_specialities ps ON ps.provider_id = sp.id
LEFT JOIN specialities s ON s.id = ps.speciality_id
```

**JOIN chain:** 5 tables — `accounts` → `service_provider_profiles` → `reviews` + `provider_specialities` → `specialities`

**Used by:**
| Function | File | Additional WHERE |
|----------|------|-----------------|
| `listMechanics()` | mechanicService.js:57 | active + provider_status active + verification_badge true |
| `getMechanic(id)` | mechanicService.js:72 | a.id = $1 |
| `searchMechanics(q)` | mechanicService.js:94 | ILIKE on name, city, description, specialty |
| `filterMechanics(f)` | mechanicService.js:120 | a.city ILIKE + s.name ILIKE |
| `findNearby(lat,lng)` | mechanicService.js:153 | lat/lng IS NOT NULL + distance_score ORDER BY |

---

## 5. BOOKING & PAYMENT FLOW

### 5.1 Booking Creation

```
MechProfileFullView.tsx — submitBooking()
  ├── Validate: vehicleId, description, preferredSchedule all required
  │
  ├── createBooking({ providerId, vehicleId, description, preferredSchedule })
  │   └── POST /bookings
  │       ├── authenticate + requireRole('user', 'provider')
  │       ├── Validation: providerId(int), vehicleId(int), description(trim,notEmpty), preferredSchedule(ISO8601)
  │       └── bookingService.createBooking(userId, input)
  │           ├── SELECT id FROM vehicles WHERE id=$1 AND user_id=$2 — verify ownership
  │           ├── SELECT id FROM service_provider_profiles WHERE id=$1 AND provider_status='active'
  │           ├── BEGIN
  │           ├── INSERT INTO bookings (customer_user_id, service_provider_id, vehicle_id, description, preferred_schedule)
  │           │   VALUES ($1, $2, $3, $4, $5) RETURNING *
  │           │   → booking_status defaults to 'payment_pending'
  │           ├── INSERT INTO notifications (recipient_id, recipient_type, message)
  │           │   VALUES ((SELECT account_id FROM sp_profiles WHERE id=$1), 'mechanic', 'New booking #X')
  │           └── COMMIT → returns booking row
  │
  └── On success → auto-initiate payment:
```

### 5.2 Payment Initiation

```
initiatePayment(bookingId)
  └── POST /payments/booking/:bookingId/initiate
      ├── authenticate (must be booking owner)
      └── paymentService.initiateSandboxPayment(bookingId, payerUserId)
          ├── BEGIN
          ├── SELECT b.*, sp.payfast_merchant_id, sp.payfast_merchant_key
          │   FROM bookings b
          │   INNER JOIN service_provider_profiles sp ON sp.id = b.service_provider_id
          │   WHERE b.id=$1 AND b.customer_user_id=$2 AND b.booking_status='payment_pending'
          ├── merchantId = booking.payfast_merchant_id || config.payfast.merchantId
          ├── merchantKey = booking.payfast_merchant_key || config.payfast.merchantKey
          ├── amount = '100.00' (HARDCODED — always R100)
          ├── INSERT INTO payments (booking_id, payer_user_id, amount, currency, payment_status)
          │   VALUES ($1, $2, '100.00', 'ZAR', 'pending') RETURNING *
          ├── COMMIT
          └── Build PayFast sandbox URL → returns { paymentId, redirectUrl }
```

### 5.3 PayFast ITN Callback (Webhook — No Auth)

```
POST /payments/itn ← PayFast sends this
  ├── NO AUTH — public endpoint
  ├── express.urlencoded({ extended: false })
  ├── Read: payment_status, m_payment_id, pf_payment_id
  ├── If payment_status !== 'COMPLETE' → 200 'ok' (ignore)
  └── If COMPLETE → paymentService.confirmPayment(m_payment_id, pf_payment_id)
      ├── NO SIGNATURE VERIFICATION ← SECURITY ISSUE (C2)
      ├── BEGIN
      ├── UPDATE payments SET payment_status='successful', payfast_payment_id=$2, paid_at=NOW()
      │   WHERE id=$1 AND payment_status='pending' RETURNING *
      ├── UPDATE bookings SET booking_status='paid' WHERE id=<booking_id>
      └── COMMIT
```

### 5.4 Payment Status Check (After PayFast Redirect Back)

```
GET /payments/booking/:bookingId/status
  └── authenticate
  └── paymentService.getPaymentStatus(bookingId, requesterId)
      ├── SELECT p.*, sp.business_whatsapp_number, b.customer_user_id, b.booking_status
      │   FROM payments p
      │   INNER JOIN bookings b ON b.id = p.booking_id
      │   INNER JOIN sp_profiles sp ON sp.id = b.service_provider_id
      │   WHERE p.booking_id = $1
      ├── if payment_status='successful' + isOwner:
      │   → generate whatsapp_url (https://wa.me/<cleaned_number>)
      │   → if booking_status='paid' → advance to 'whatsapp_redirected'
      └── strip business_whatsapp_number from response (replaced by whatsapp_url)
```

### 5.5 Booking Status State Machine

```
payment_pending → paid (ITN callback)
     ↓
whatsapp_redirected → (auto when whatsapp_url served)
     ↓
in_progress / completed / cancelled / refunded (PATCH /bookings/:id/status)
```

---

## 6. VEHICLES FLOW

```
MyVehicles.tsx
  ├── Mount → listVehicles()
  │   └── GET /vehicles
  │       ├── authenticate + requireRole('user', 'provider')
  │       └── vehicleService.listVehicles(req.user.id)
  │           └── SELECT * FROM vehicles WHERE user_id = $1 ORDER BY created_at DESC
  │
  ├── Add vehicle: createVehicle({ make, model, year_produced?, license_plate?, notes? })
  │   └── POST /vehicles
  │       ├── Validation: make(required), model(required), year_produced(optional, 1900-2030), license_plate(optional)
  │       └── INSERT INTO vehicles (user_id, make, model, year_produced, color, license_plate, fuel_type, transmission, notes)
  │           VALUES ($1..$9) RETURNING *
  │
  └── Delete: deleteVehicle(id)
      └── DELETE FROM vehicles WHERE id = $1 AND user_id = $2 RETURNING *
```

---

## 7. REVIEWS FLOW

```
Create: POST /reviews
  ├── authenticate + requireRole('user')
  ├── Validation: booking_id(int), rating(1-5), comment(notEmpty)
  └── reviewService.createReview(req.user.id, req.body)
      ├── SELECT id FROM bookings WHERE id=$1 AND booking_status='completed' AND customer_user_id=$2
      ├── INSERT INTO reviews (booking_id, reviewer_user_id, service_provider_id, rating, comment)
      │   VALUES ($1, $2, (SELECT service_provider_id FROM bookings WHERE id=$1), $3, $4) RETURNING *
      └── 409 if error.code === '23505' (unique booking constraint)

Read by mechanic: GET /reviews/mechanic/:id  (public)
Read by user:     GET /reviews/user          (authenticated)
```

---

## 8. ADMIN DASHBOARD FLOW

```
PlatformAdminDashboard.tsx
  ├── Mount → getDashboard()
  │   └── GET /admin/dashboard
  │       ├── authenticate + requireRole('moderator', 'superadmin')
  │       └── adminService.getDashboardStats()
  │           ├── 12 concurrent SELECT COUNT(*) queries across:
  │           │   users, service_provider_profiles, bookings (by status),
  │           │   reviews, page_visits (today+total), mechanic_documents (pending),
  │           │   payments (pending+failed)
  │           └── Returns: { stats: { users, providers, activeJobs, disputes, ... }, ... }
  │
  ├── Document approval: approveDocument(documentId, adminId, status)
  │   └── PATCH /admin/documents/:id
  │       ├── TRANSACTION:
  │       │   UPDATE mechanic_documents SET status=$1, reviewed_at=NOW(), reviewed_by=$2 WHERE id=$3 RETURNING *
  │       │   IF approved: UPDATE service_provider_profiles SET verification_status='verified', verification_badge=true
  │       │   WHERE id=(SELECT provider_id FROM mechanic_documents WHERE id=$3)
  │       └── COMMIT
  │
  └── Payments: listPayments() — MISSING EXPORT (C4)
```

---

## 9. FILE UPLOAD FLOW

### 9.1 Profile Photo

```
MyMechanicProfile.tsx — handlePhotoUpload(file)
  ├── FormData({ photo: File })
  ├── POST /users/photo (Content-Type: multipart/form-data)
  │   ├── authenticate + requireRole('user', 'provider')
  │   ├── multer (photoUpload): max 2MB, .jpg/.jpeg/.png/.webp
  │   │   └── Saved to: backend/uploads/photos/photo-{userId}-{timestamp}{ext}
  │   ├── userController.uploadPhoto()
  │   │   └── userService.updateUser(accountId, { profile_photo_url: '/uploads/photos/photo-...' })
  │   │       └── UPDATE accounts SET profile_photo_url = $2 WHERE id = $1 RETURNING *
  │   └── Response: { data: updatedUser, message: 'Photo uploaded' }
  │
  └── updateField("photoUrl", userData.profile_photo_url)
```

### 9.2 Document Upload (Mechanic Verification)

```
MechanicVerification.tsx — uploadDocument(file, docType)
  ├── FormData({ document: File, doc_type: 'id'|'certification'|'proof_of_residence' })
  ├── POST /mechanics/documents (multipart)
  │   ├── authenticate + requireRole('provider')
  │   ├── multer (docUpload): max 5MB, .pdf/.jpg/.jpeg/.png only
  │   │   └── Saved to: backend/uploads/documents/{timestamp}-{safeName}
  │   ├── Validation: doc_type in ['id', 'certification', 'proof_of_residence']
  │   └── mechanicService.uploadDocument(accountId, docType, file)
  │       ├── SELECT id FROM service_provider_profiles WHERE account_id = $1
  │       ├── INSERT INTO mechanic_documents (provider_id, doc_type, file_url)
  │       │   VALUES ($1, $2, '/uploads/documents/{filename}')
  │       └── Returns: created document row
  │
  └── Status: "pending" — admin must approve via admin dashboard
```

---

## 10. DATABASE TABLES (Complete)

| Table | Columns | FKs | Inserted By | Queried By |
|-------|---------|-----|------------|------------|
| **accounts** | id, first_name, last_name, email, password_hash, phone_number, city, town, profile_photo_url, status, created_at, updated_at | — | signup | All flows |
| **users** | id, account_id | FK→accounts(id) | signup | login role detection, user profile |
| **admins** | id, username, email, password_hash, role, created_at | — | seed | admin login |
| **service_provider_profiles** | id, account_id, business_name, business_whatsapp_number, service_description, years_of_experience, payfast_merchant_id, payfast_merchant_key, is_available, verification_badge, verification_status, provider_status, lat, lng, created_at, updated_at | FK→accounts(account_id) | becomeProvider | PROVIDER_SELECT |
| **specialities** | id, name (UNIQUE) | — | syncSpecialities | PROVIDER_SELECT |
| **provider_specialities** | provider_id, speciality_id | FK→profiles(id), FK→specialities(id) | syncSpecialities | PROVIDER_SELECT |
| **mechanic_availability** | id, provider_id, day_of_week, start_time, end_time, CHECK(start<end) | FK→profiles(id) | becomeProvider (optional) | — |
| **mechanic_documents** | id, provider_id, doc_type, file_url, status, reviewed_at, reviewed_by, created_at | FK→profiles(id), FK→admins(id) | document upload | admin dashboard |
| **vehicles** | id, user_id, make, model, year_produced, color, license_plate, fuel_type, transmission, notes, created_at | FK→accounts(id) | createVehicle | bookings, MyVehicles |
| **bookings** | id, customer_user_id, service_provider_id, vehicle_id, description, preferred_schedule, booking_status, created_at, updated_at | FK→accounts(id), FK→profiles(id), FK→vehicles(id) | createBooking | booking detail, payment |
| **payments** | id, booking_id, payer_user_id, amount, currency, payment_status, payfast_payment_id, sandbox_transaction_id, paid_at, created_at | FK→booking(id), FK→accounts(id) | payment initiate | payment status |
| **reviews** | id, booking_id, reviewer_user_id, service_provider_id, rating, comment, created_at | FK→booking(id), FK→accounts(id), FK→profiles(id) | createReview | profile page |
| **notifications** | id, recipient_id, recipient_type, message, is_read, created_at | — (no FK — C9) | createBooking | — |

---

## 11. API ENDPOINT MAP

| Endpoint | Auth | Method | Purpose | DB Tables |
|----------|------|--------|---------|-----------|
| `/auth/signup/user` | No | POST | Create account | accounts, users |
| `/auth/login/user` | No | POST | Login (user/provider) | accounts, service_provider_profiles |
| `/auth/login/admin` | No | POST | Login (admin) | admins |
| `/users/me` | User/Provider | GET | Get personal info | accounts, users |
| `/users/me` | User/Provider | PUT | Update personal info | accounts |
| `/users/photo` | User/Provider | POST | Upload profile photo | accounts (file upload) |
| `/mechanics` | No | GET | List verified providers | 5-table JOIN |
| `/mechanics/filter` | No | GET | Filter providers | 5-table JOIN |
| `/mechanics/search` | No | GET | Search providers | 5-table JOIN |
| `/mechanics/nearby` | No | GET | Nearby providers | 5-table JOIN + haversine |
| `/mechanics/become-provider` | Yes | POST | Create provider profile | sp_profiles, specialities, availability |
| `/mechanics/:id` | No | GET | Get provider by account ID | 5-table JOIN |
| `/mechanics/:id/profile` | No | GET | Same as above (alias) | 5-table JOIN |
| `/mechanics/:id` | Yes | PUT | Update provider profile | accounts, sp_profiles, specialities |
| `/mechanics/documents` | Provider | POST | Upload verification doc | mechanic_documents (file upload) |
| `/vehicles` | User/Provider | GET | List my vehicles | vehicles |
| `/vehicles` | User/Provider | POST | Add vehicle | vehicles |
| `/vehicles/:id` | User/Provider | DELETE | Delete vehicle | vehicles |
| `/bookings` | User/Provider | POST | Create booking | bookings, notifications |
| `/bookings/:id` | User/Provider | GET | Get booking detail | bookings |
| `/bookings/user` | User/Provider | GET | List user's bookings | bookings |
| `/bookings/:id/status` | Provider | PATCH | Update booking status | bookings |
| `/payments/booking/:id/initiate` | Yes | POST | Initiate PayFast payment | payments, bookings |
| `/payments/booking/:id/status` | Yes | GET | Check payment status | payments, bookings, sp_profiles |
| `/payments/itn` | No | POST | PayFast webhook callback | payments, bookings |
| `/reviews` | User | POST | Submit review | reviews, bookings |
| `/reviews/mechanic/:id` | No | GET | Get reviews for provider | reviews, accounts |
| `/reviews/user` | Yes | GET | Get user's reviews | reviews, bookings |
| `/admin/dashboard` | Admin | GET | Dashboard stats | 7 tables × COUNT |
| `/admin/documents/:id` | Admin | PATCH | Approve/reject document | mechanic_documents, sp_profiles |
| `/admin/payments` | Admin | GET | List payments (missing export C4) | payments |

---

## 12. RESPONSE SHAPE PATTERNS

| Shape | Used For |
|-------|----------|
| `{ data: {...}, message: "Success" }` | Mutations (POST/PUT) |
| `{ data: {...} }` | Single item reads |
| `{ data: [...] }` | List reads |
| `{ error: "...", message: "..." }` | Client errors (400, 401, 403, 404) |
| `{ error: "...", errors: [...] }` | Validation errors (400) |

**Axios interceptor** unwraps `response.data` from all responses:
- Success: caller gets the `{ data, message }` object directly
- Error: wrapped in `new Error(formatApiError(...))`

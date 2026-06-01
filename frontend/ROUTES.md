# OneStopShop Application Routes

## All Routes

| Route | Component | Description | Auth |
|-------|-----------|-------------|------|
| `/` | Main | Landing page with hero section and CTAs | Public |
| `/login` | Login | User authentication page | Redirects to `/` if logged in |
| `/signup` | SignUp | Create account (preserves `?redirect=` param) | Redirects to `/` if logged in |
| `/driver/setup` | DriverProfileSetup | Driver profile creation | Requires auth |
| `/driver/verify` | DriverEmailVerification | Driver email verification | Requires auth |
| `/mechanic/setup` | MechanicProfileSetup | Mechanic profile creation | Requires auth |
| `/mechanic/verify` | MechanicVerification | Mechanic verification | Requires auth |
| `/mechanic/profile` | MyMechanicProfile | Mechanic's own profile view/edit | Requires auth |
| `/mechanic/:id` | MechProfileFullView | Public mechanic profile (with ID param) | Requires auth |
| `/find-mechanic` | FindYourMechanic | Search and browse mechanics | Requires auth |
| `/admin/dashboard` | PlatformAdminDashboard | Admin dashboard | Requires auth |
| `*` | 404 Page | Not found page | Public |

## Navigation Flow

### Public (unauthenticated)
- **Navbar**: Shows "Find a mechanic", "Become a provider", "Log in", "Get started"
- **Main page CTAs**: "Find a mechanic" → `/find-mechanic` → `requireAuth` → `/login?redirect=/find-mechanic`
- **Main page CTAs**: "Join the platform" → `/signup`
- **Main page CTAs**: "Start as driver" → `/signup`
- **Main page CTAs**: "Become a provider" → `/mechanic/setup` → `requireAuth` → `/login?redirect=/mechanic/setup`

### Authenticated
- **Navbar**: Shows "Find a mechanic", "Become a provider", "My profile", "Log out"
- **Logout**: Clears localStorage (`oss_token`, `oss_user`) → navigates to `/`

### User Signup → Driver Path
1. `/` or `/login` → `/signup`
2. `/signup` → submit → API creates user → `navigate("/driver/setup")`
3. `/driver/setup` → submit → saves profile + vehicle → `navigate("/driver/verify")`
4. `/driver/verify` → "Continue to find mechanics" → `navigate("/find-mechanic")`

### User Signup → Mechanic Provider Path
1. `/` → "Become a provider" → `/mechanic/setup` → `requireAuth` → `/login?redirect=/mechanic/setup`
2. `/login` → "Create an account" → `/signup?redirect=/mechanic/setup`
3. `/signup?redirect=/mechanic/setup` → submit → `navigate("/mechanic/setup")`
4. `/mechanic/setup` → submit → `navigate("/mechanic/verify")`
5. `/mechanic/verify` → "Continue to profile" → `navigate("/mechanic/profile")`

### Login Redirect Logic
- Login handler checks `auth.user.isProvider`:
  - Provider → `navigate(redirectTo || "/mechanic/profile")`
  - Regular user → `navigate(redirectTo || "/find-mechanic")`
  - Admin → `navigate(redirectTo || "/admin/dashboard")`
- `redirectTo` comes from `?redirect=` search param in URL

### Active Navigation

| Page | Nav variant | Nav links | User menu |
|------|-------------|-----------|-----------|
| Main (`/`) | `public` | Find a mechanic, Become a provider | Log in + Get started / My profile + Log out |
| Login (`/login`) | `public` | Find a mechanic, Become a provider | Log in + Get started / My profile + Log out |
| SignUp (`/signup`) | `public` | Find a mechanic, Become a provider | Log in + Get started / My profile + Log out |
| DriverProfileSetup (`/driver/setup`) | `onboarding` | None | None |
| MechanicProfileSetup (`/mechanic/setup`) | `onboarding` | None | None |
| FindYourMechanic (`/find-mechanic`) | `app` | Find mechanics, My profile | Log out |
| MyMechanicProfile (`/mechanic/profile`) | `app` | Find mechanics, My profile | Log out |
| MechProfileFullView (`/mechanic/:id`) | `app` | Find mechanics, My profile | Log out |
| PlatformAdminDashboard (`/admin/dashboard`) | `admin` | None | Exit admin |

## Cross-Page Routing

### Footer Links
- "Find a mechanic" → `/find-mechanic`
- "Join as a mechanic" → `/signup`
- "Log in" → `/login`
- "Admin dashboard" → `/admin/dashboard`

### "Back" Buttons
- DriverProfileSetup → `/signup`
- MechanicProfileSetup → `/signup`
- MechProfileFullView → `/find-mechanic`

# OneStopShop Application Routes

## All Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | Main | Landing page with hero section and CTAs |
| `/login` | Login | User authentication page |
| `/signup` | SignUp | Choose Driver or Mechanic path |
| `/driver/setup` | DriverProfileSetup | Driver profile creation |
| `/driver/verify` | DriverEmailVerification | Driver email verification |
| `/mechanic/setup` | MechanicProfileSetup | Mechanic profile creation |
| `/mechanic/verify` | MechanicVerification | Mechanic verification |
| `/mechanic/profile` | MyMechanicProfile | Mechanic's own profile view |
| `/mechanic/:id` | MechProfileFullView | Public mechanic profile (with ID param) |
| `/find-mechanic` | FindYourMechanic | Search and browse mechanics |
| `/admin/dashboard` | PlatformAdminDashboard | Admin dashboard |
| `*` | 404 Page | Not found page |

## Navigation Flow

### User Onboarding (Driver Path)
1. `/` (Main) → "Access Driver Portal" button → `/login`
2. `/login` → "Create an account" → `/signup`
3. `/signup` → "Hire a Pro" button → `/driver/setup`
4. `/driver/setup` → (after completion) → `/driver/verify`
5. `/driver/verify` → (after email verification) → `/find-mechanic`

### User Onboarding (Mechanic Path)
1. `/` (Main) → "Access Pro Portal" button → `/login`
2. `/login` → "Create an account" → `/signup`
3. `/signup` → "Provide Service" button → `/mechanic/setup`
4. `/mechanic/setup` → (after completion) → `/mechanic/verify`
5. `/mechanic/verify` → (after verification) → `/mechanic/profile`

### Active Navigation
- **Main page**: Both CTA buttons navigate to `/login`
- **Login page**: 
  - "Log In to Account" → `/find-mechanic` (demo)
  - "Create an account" link → `/signup`
- **SignUp page**: 
  - "Hire a Pro" → `/driver/setup`
  - "Provide Service" → `/mechanic/setup`
  - "Login" link → `/login`

## Additional Navigation to Add

The following pages may have navigation elements that can be wired up:

1. **DriverProfileSetup** - Form submission, next/back buttons
2. **MechanicProfileSetup** - Form submission, next/back buttons
3. **DriverEmailVerification** - "Open Email Inbox", "Contact Support"
4. **MechanicVerification** - Verification actions
5. **FindYourMechanic** - Mechanic cards → `/mechanic/:id`
6. **MyMechanicProfile** - Edit profile, settings
7. **MechProfileFullView** - Back button, contact buttons
8. **PlatformAdminDashboard** - Admin actions and navigation

## Next Steps

To complete the navigation:
1. Add form submission handlers to profile setup pages
2. Wire up "Find Mechanic" search results to profile pages
3. Add navigation bars/menus if needed
4. Implement protected routes for authenticated pages
5. Add logout functionality
6. Connect mechanic cards in FindYourMechanic to MechProfileFullView with IDs

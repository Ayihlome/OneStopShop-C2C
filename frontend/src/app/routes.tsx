import { createBrowserRouter } from "react-router";
import { requireAuth, requireAdmin, redirectIfAuth } from "../lib/authGuard";

// Import all pages
import Main from "../imports/Main/Main";
import Login from "../imports/Login/Login";
import SignUp from "../imports/SignUp/SignUp";
import DriverProfileSetup from "../imports/DriverProfileSetup/DriverProfileSetup";
import MechanicProfileSetup from "../imports/MechanicProfileSetup/MechanicProfileSetup";
import DriverEmailVerification from "../imports/DriverEmailVerification/DriverEmailVerification";
import MechanicVerification from "../imports/MechanicVerification/MechanicVerification";
import FindYourMechanic from "../imports/FindYourMechanic/FindYourMechanic";
import MyMechanicProfile from "../imports/MyMechanicProfile/MyMechanicProfile";
import MechProfileFullView from "../imports/MechProfileFullView/MechProfileFullView";
import MyVehicles from "../imports/MyVehicles/MyVehicles";
import PlatformAdminDashboard from "../imports/PlatformAdminDashboard/PlatformAdminDashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Main,
  },
  {
    path: "/login",
    loader: redirectIfAuth,
    Component: Login,
  },
  {
    path: "/signup",
    loader: redirectIfAuth,
    Component: SignUp,
  },
  {
    path: "/driver/setup",
    loader: requireAuth,
    Component: DriverProfileSetup,
  },
  {
    path: "/driver/verify",
    loader: requireAuth,
    Component: DriverEmailVerification,
  },
  {
    path: "/mechanic/setup",
    loader: requireAuth,
    Component: MechanicProfileSetup,
  },
  {
    path: "/mechanic/verify",
    loader: requireAuth,
    Component: MechanicVerification,
  },
  {
    path: "/mechanic/profile",
    loader: requireAuth,
    Component: MyMechanicProfile,
  },
  {
    path: "/mechanic/:id",
    loader: requireAuth,
    Component: MechProfileFullView,
  },
  {
    path: "/find-mechanic",
    loader: requireAuth,
    Component: FindYourMechanic,
  },
  {
    path: "/admin/dashboard",
    loader: requireAdmin,
    Component: PlatformAdminDashboard,
  },
  {
    path: "/my-vehicles",
    loader: requireAuth,
    Component: MyVehicles,
  },
  {
    path: "*",
    Component: () => (
      <div className="min-h-screen bg-background text-foreground">
        <div className="flex flex-col items-center justify-center h-screen gap-4">
          <h1 className="text-4xl font-bold text-foreground">404 - Page Not Found</h1>
          <a href="/" className="text-foreground underline">Return to Home</a>
        </div>
      </div>
    ),
  },
]);

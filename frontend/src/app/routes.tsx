import { createBrowserRouter } from "react-router";

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
import PlatformAdminDashboard from "../imports/PlatformAdminDashboard/PlatformAdminDashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Main,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/signup",
    Component: SignUp,
  },
  {
    path: "/driver/setup",
    Component: DriverProfileSetup,
  },
  {
    path: "/driver/verify",
    Component: DriverEmailVerification,
  },
  {
    path: "/mechanic/setup",
    Component: MechanicProfileSetup,
  },
  {
    path: "/mechanic/verify",
    Component: MechanicVerification,
  },
  {
    path: "/mechanic/profile",
    Component: MyMechanicProfile,
  },
  {
    path: "/mechanic/:id",
    Component: MechProfileFullView,
  },
  {
    path: "/find-mechanic",
    Component: FindYourMechanic,
  },
  {
    path: "/admin/dashboard",
    Component: PlatformAdminDashboard,
  },
  {
    path: "*",
    Component: () => (
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <h1 className="text-4xl font-bold text-[#010813]">404 - Page Not Found</h1>
        <a href="/" className="text-[#010813] underline">Return to Home</a>
      </div>
    ),
  },
]);

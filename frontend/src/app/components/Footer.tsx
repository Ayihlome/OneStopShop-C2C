import { Wrench } from "lucide-react";
import { useNavigate } from "react-router";

import { Button } from "./ui/button";

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="border-t bg-[#5B360B]">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-[#010813]">
            <Wrench className="size-5" />
            <span className="font-semibold">OneStopShop</span>
          </div>
          <p className="max-w-md text-sm text-[#362007]">
            A practical way for drivers to find trusted mechanics and for
            mechanics to manage their local service presence.
          </p>
        </div>
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-[#010813]">Platform</h3>
          <Button
            className="h-auto justify-start p-0 text-[#362007]"
            onClick={() => navigate("/find-mechanic")}
            variant="link"
          >
            Find a mechanic
          </Button>
          <Button
            className="h-auto justify-start p-0 text-[#362007]"
            onClick={() => navigate("/signup")}
            variant="link"
          >
            Join as a mechanic
          </Button>
        </div>
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-[#010813]">Account</h3>
          <Button
            className="h-auto justify-start p-0 text-[#362007]"
            onClick={() => navigate("/login")}
            variant="link"
          >
            Log in
          </Button>
          <Button
            className="h-auto justify-start p-0 text-[#362007]"
            onClick={() => navigate("/admin/dashboard")}
            variant="link"
          >
            Admin dashboard
          </Button>
        </div>
      </div>
      <div className="border-t px-4 py-4 text-center text-xs text-[#362007]">
        &copy; 2026 OneStopShop. Built for drivers and trusted service
        providers.
      </div>
    </footer>
  );
}

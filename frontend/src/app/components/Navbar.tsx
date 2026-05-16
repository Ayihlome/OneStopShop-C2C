import { Menu, Wrench, X } from "lucide-react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router";

import { Button } from "./ui/button";
import { cn } from "./ui/utils";

type NavbarProps = {
  variant?: "public" | "app" | "admin" | "onboarding";
};

const publicLinks = [
  { label: "Find a mechanic", path: "/find-mechanic" },
  { label: "For mechanics", path: "/signup" },
];

const appLinks = [
  { label: "Find mechanics", path: "/find-mechanic" },
  { label: "My profile", path: "/mechanic/profile" },
];

export default function Navbar({ variant = "public" }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const links = variant === "app" ? appLinks : publicLinks;
  const showNavLinks = variant !== "onboarding";

  const goTo = (path: string) => {
    setOpen(false);
    navigate(path);
  };

  return (
    <header className="sticky top-0 z-40 border-b bg-[#FAD775]/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <button
          className="flex items-center gap-2 text-left"
          onClick={() => goTo("/")}
          type="button"
        >
          <span className="flex size-10 items-center justify-center rounded-md bg-[#010813] text-white">
            <Wrench className="size-5" />
          </span>
          <span>
            <span className="block text-lg font-semibold text-[#010813]">
              OneStopShop
            </span>
            <span className="block text-xs text-[#362007]">
              Vehicle care made simpler
            </span>
          </span>
        </button>

        {showNavLinks && (
          <nav className="hidden items-center gap-1 md:flex">
            {links.map((link) => (
              <Button
                className={cn(
                  "text-[#010813]",
                  location.pathname === link.path && "text-[#010813]",
                )}
                key={link.path}
                onClick={() => goTo(link.path)}
                variant="ghost"
              >
                {link.label}
              </Button>
            ))}
          </nav>
        )}

        <div className="hidden items-center gap-2 md:flex">
          {variant === "admin" ? (
            <Button variant="outline" onClick={() => goTo("/")}>
              Exit admin
            </Button>
          ) : (
            <>
              <Button variant="ghost" onClick={() => goTo("/login")}>
                Log in
              </Button>
              <Button
                className="bg-[#010813] text-white hover:bg-[#362007]"
                onClick={() => goTo("/signup")}
              >
                Get started
              </Button>
            </>
          )}
        </div>

        <Button
          aria-label="Toggle menu"
          className="md:hidden"
          onClick={() => setOpen((current) => !current)}
          size="icon"
          variant="ghost"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </Button>
      </div>

      {open && (
        <div className="border-t bg-[#FAD775] px-4 py-4 md:hidden">
          <div className="flex flex-col gap-2">
            {showNavLinks &&
              links.map((link) => (
                <Button
                  className="justify-start"
                  key={link.path}
                  onClick={() => goTo(link.path)}
                  variant="ghost"
                >
                  {link.label}
                </Button>
              ))}
            <Button
              className="justify-start"
              onClick={() => goTo("/login")}
              variant="ghost"
            >
              Log in
            </Button>
            <Button
              className="bg-[#010813] text-white hover:bg-[#362007]"
              onClick={() => goTo(variant === "admin" ? "/" : "/signup")}
            >
              {variant === "admin" ? "Exit admin" : "Get started"}
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}

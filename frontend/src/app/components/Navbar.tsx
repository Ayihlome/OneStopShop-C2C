import { LogOut, Menu, User, Wrench, X } from "lucide-react";
import { useCallback, useState } from "react";
import { useLocation, useNavigate } from "react-router";

import { Button } from "./ui/button";
import { cn } from "./ui/utils";

type NavbarProps = {
  variant?: "public" | "app" | "admin" | "onboarding";
};

function getAuthState() {
  const token =
    typeof window !== "undefined" && localStorage.getItem("oss_token");
  if (!token) return { authenticated: false, user: null } as const;

  try {
    const user = JSON.parse(localStorage.getItem("oss_user") || "{}");
    return { authenticated: true, user } as const;
  } catch {
    return { authenticated: true, user: null } as const;
  }
}

const publicLinks = [
  { label: "Find a mechanic", path: "/find-mechanic" },
  { label: "Become a provider", path: "/mechanic/setup" },
];

const appLinks = [
  { label: "Find mechanics", path: "/find-mechanic" },
  { label: "My profile", path: "/mechanic/profile" },
];

export default function Navbar({ variant = "public" }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { authenticated } = getAuthState();

  const links = variant === "app" ? appLinks : publicLinks;
  const showNavLinks = variant !== "onboarding" && variant !== "admin";
  const isPublic = variant === "public";

  const goTo = useCallback(
    (path: string) => {
      setOpen(false);
      navigate(path);
    },
    [navigate],
  );

  const handleLogout = useCallback(() => {
    localStorage.removeItem("oss_token");
    localStorage.removeItem("oss_user");
    setOpen(false);
    navigate("/");
  }, [navigate]);

  const desktopButtons = () => {
    if (variant === "admin") {
      return (
        <Button variant="outline" onClick={() => goTo("/")}>
          Exit admin
        </Button>
      );
    }

    if (isPublic && !authenticated) {
      return (
        <>
          <Button variant="ghost" onClick={() => goTo("/login")}>
            Log in
          </Button>
          <Button
            className="bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={() => goTo("/signup")}
          >
            Get started
          </Button>
        </>
      );
    }

    // Authenticated user — show profile + logout
    return (
      <>
        <Button variant="ghost" onClick={() => goTo("/mechanic/profile")}>
          <User className="size-4" />
          My profile
        </Button>
        <Button variant="outline" onClick={handleLogout}>
          <LogOut className="size-4" />
          Log out
        </Button>
      </>
    );
  };

  const mobileButtons = () => {
    if (variant === "admin") {
      return (
        <Button
          className="bg-primary text-primary-foreground hover:bg-primary/90"
          onClick={() => goTo("/")}
        >
          Exit admin
        </Button>
      );
    }

    if (isPublic && !authenticated) {
      return (
        <>
          <Button
            className="justify-start"
            onClick={() => goTo("/login")}
            variant="ghost"
          >
            Log in
          </Button>
          <Button
            className="bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={() => goTo("/signup")}
          >
            Get started
          </Button>
        </>
      );
    }

    return (
      <>
        <Button
          className="justify-start"
          onClick={() => goTo("/mechanic/profile")}
          variant="ghost"
        >
          <User className="size-4" />
          My profile
        </Button>
        <Button
          className="justify-start"
          onClick={handleLogout}
          variant="ghost"
        >
          <LogOut className="size-4" />
          Log out
        </Button>
      </>
    );
  };

  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <button
          className="flex items-center gap-2 text-left"
          onClick={() => goTo("/")}
          type="button"
        >
          <span className="flex size-10 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Wrench className="size-5" />
          </span>
          <span>
            <span className="block text-lg font-semibold text-foreground">
              OneStopShop
            </span>
            <span className="block text-xs text-muted-foreground">
              Vehicle care made simpler
            </span>
          </span>
        </button>

        {showNavLinks && (
          <nav className="hidden items-center gap-1 md:flex">
            {links.map((link) => (
              <Button
                className={cn(
                  "text-foreground",
                  location.pathname === link.path && "text-foreground",
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
          {desktopButtons()}
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
        <div className="border-t bg-background px-4 py-4 md:hidden">
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

            {mobileButtons()}
          </div>
        </div>
      )}
    </header>
  );
}

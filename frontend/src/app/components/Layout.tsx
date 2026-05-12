import type { ReactNode } from "react";

import Footer from "./Footer";
import Navbar from "./Navbar";
import { cn } from "./ui/utils";

type LayoutProps = {
  children: ReactNode;
  variant?: "public" | "app" | "admin" | "onboarding";
  className?: string;
  hideFooter?: boolean;
};

export default function Layout({
  children,
  className,
  hideFooter = false,
  variant = "public",
}: LayoutProps) {
  return (
    <div className="min-h-screen bg-white text-slate-950">
      <Navbar variant={variant} />
      <main className={cn("min-h-[calc(100vh-9rem)]", className)}>
        {children}
      </main>
      {!hideFooter && <Footer />}
    </div>
  );
}

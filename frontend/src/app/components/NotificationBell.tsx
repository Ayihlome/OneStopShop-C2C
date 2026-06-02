import { Bell } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";

import { Button } from "@/app/components/ui/button";
import { getNotifications, markRead } from "@/api/notifications";

type NotificationItem = {
  id: number;
  message: string;
  is_read: boolean;
  created_at: string;
};

export default function NotificationBell() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function load() {
      try {
        const resp = await getNotifications();
        setNotifications(resp?.data ?? []);
      } catch {
        // Silently fail — non-critical
      }
    }
    load();
    const int = setInterval(load, 60000); // refresh every 60s
    return () => clearInterval(int);
  }, []);

  // Close on click outside
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  const unread = notifications.filter((n) => !n.is_read).length;

  const handleMarkRead = async (id: number) => {
    try {
      await markRead(id);
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, is_read: true } : n))
      );
    } catch {
      // silent
    }
  };

  const recent = notifications.slice(0, 5);

  const formatTime = (raw: string) => {
    try {
      const d = new Date(raw);
      const now = new Date();
      const diff = now.getTime() - d.getTime();
      if (diff < 60000) return "Just now";
      if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
      if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
      return d.toLocaleDateString("en-ZA", { day: "numeric", month: "short" });
    } catch {
      return raw;
    }
  };

  return (
    <div className="relative" ref={ref}>
      <Button
        onClick={() => setOpen(!open)}
        size="icon"
        variant="ghost"
        className="relative"
      >
        <Bell className="size-5" />
        {unread > 0 && (
          <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
            {unread > 9 ? "9+" : unread}
          </span>
        )}
      </Button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-80 rounded-lg border bg-card shadow-lg">
          <div className="border-b px-4 py-3">
            <p className="text-sm font-medium">Notifications</p>
          </div>

          <div className="max-h-80 overflow-y-auto">
            {recent.length === 0 ? (
              <p className="px-4 py-6 text-center text-sm text-muted-foreground">
                No notifications yet.
              </p>
            ) : (
              recent.map((n) => (
                <div
                  key={n.id}
                  className={`flex items-start gap-3 border-b px-4 py-3 transition-colors hover:bg-muted/50 ${
                    !n.is_read ? "bg-muted/30" : ""
                  }`}
                >
                  <div
                    className={`mt-1.5 size-2 shrink-0 rounded-full ${
                      n.is_read ? "bg-transparent" : "bg-blue-500"
                    }`}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-foreground">{n.message}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {formatTime(n.created_at)}
                    </p>
                  </div>
                  {!n.is_read && (
                    <button
                      className="shrink-0 text-xs text-muted-foreground underline hover:text-foreground"
                      onClick={() => handleMarkRead(n.id)}
                    >
                      Mark read
                    </button>
                  )}
                </div>
              ))
            )}
          </div>

          <div className="border-t px-4 py-2">
            <button
              className="w-full text-center text-sm text-muted-foreground underline hover:text-foreground"
              onClick={() => {
                setOpen(false);
                navigate("/notifications");
              }}
            >
              View all notifications
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

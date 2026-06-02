import { ArrowLeft, Bell } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import Layout from "@/app/components/Layout";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { StatusMessage } from "@/app/components/ui/status-message";
import { getNotifications, markRead } from "@/api/notifications";

type Notification = {
  id: number;
  message: string;
  is_read: boolean;
  created_at: string;
  recipient_type?: string;
};

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [status, setStatus] = useState("Loading notifications...");
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const navigate = useNavigate();

  useEffect(() => {
    let ignore = false;

    async function load() {
      try {
        const resp = await getNotifications();
        const data = Array.isArray(resp) ? resp : resp?.data ?? [];
        if (!ignore) {
          setNotifications(data);
          setStatus("");
        }
      } catch {
        if (!ignore) setStatus("Could not load notifications.");
      } finally {
        if (!ignore) setIsLoading(false);
      }
    }

    load();
    return () => { ignore = true; };
  }, []);

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

  const handleMarkAllRead = async () => {
    const unread = notifications.filter((n) => !n.is_read);
    for (const n of unread) {
      await handleMarkRead(n.id);
    }
  };

  const filtered =
    filter === "unread"
      ? notifications.filter((n) => !n.is_read)
      : notifications;

  const formatTime = (raw: string) => {
    try {
      return new Date(raw).toLocaleString("en-ZA", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return raw;
    }
  };

  const unreadCount = notifications.filter((n) => !n.is_read).length;

  return (
    <Layout className="bg-primary" variant="app">
      <section className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <Button
          className="mb-6 px-0 text-foreground"
          onClick={() => navigate(-1)}
          variant="link"
        >
          <ArrowLeft className="size-4" />
          Back
        </Button>

        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <Badge className="mb-4 bg-primary text-primary-foreground">
              <Bell className="size-3 mr-1" /> Notifications
            </Badge>
            <h1 className="text-4xl font-semibold text-primary-foreground">
              Notifications
            </h1>
            <p className="mt-3 text-primary-foreground/80">
              {unreadCount > 0
                ? `${unreadCount} unread notification${unreadCount > 1 ? "s" : ""}`
                : "All caught up!"}
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => setFilter("all")}
              size="sm"
              variant={filter === "all" ? "default" : "outline"}
            >
              All
            </Button>
            <Button
              onClick={() => setFilter("unread")}
              size="sm"
              variant={filter === "unread" ? "default" : "outline"}
            >
              Unread ({unreadCount})
            </Button>
            {unreadCount > 0 && (
              <Button onClick={handleMarkAllRead} size="sm" variant="outline">
                Mark all read
              </Button>
            )}
          </div>
        </div>

        {isLoading ? (
          <StatusMessage message="Loading notifications..." />
        ) : filtered.length === 0 ? (
          <Card className="rounded-lg bg-card">
            <CardContent className="py-12 text-center">
              <Bell className="mx-auto mb-4 size-10 text-muted-foreground" />
              <CardTitle className="mb-2 text-lg">No notifications</CardTitle>
              <p className="text-sm text-muted-foreground">
                {filter === "unread"
                  ? "No unread notifications."
                  : "You'll see notifications here when there's activity."}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-2">
            {filtered.map((n) => (
              <Card
                key={n.id}
                className={`rounded-lg bg-card transition-colors ${
                  !n.is_read ? "border-l-4 border-l-blue-500" : ""
                }`}
              >
                <CardContent className="flex items-start gap-4 py-4">
                  <div
                    className={`mt-1 size-3 shrink-0 rounded-full ${
                      n.is_read ? "bg-muted-foreground/30" : "bg-blue-500"
                    }`}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-foreground">{n.message}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {formatTime(n.created_at)}
                    </p>
                  </div>
                  {!n.is_read && (
                    <Button
                      onClick={() => handleMarkRead(n.id)}
                      size="sm"
                      variant="ghost"
                      className="shrink-0"
                    >
                      Mark read
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {status && !isLoading && <StatusMessage className="mt-4" message={status} />}
      </section>
    </Layout>
  );
}

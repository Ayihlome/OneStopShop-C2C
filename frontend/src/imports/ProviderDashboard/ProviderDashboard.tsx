import {
  Calendar,
  CheckCircle2,
  Clock,
  DollarSign,
  TrendingUp,
  Users,
  Wrench,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import Layout from "@/app/components/Layout";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { StatusMessage } from "@/app/components/ui/status-message";
import { getProviderStats } from "@/api/mechanics";
import { listProviderBookings } from "@/api/bookings";

type Stats = {
  active_bookings: number;
  total_bookings: number;
  earnings_this_month: number;
  completed_bookings: number;
};

type Booking = {
  id: number;
  booking_status: string;
  description: string;
  preferred_schedule: string;
  customer_first_name?: string;
  customer_last_name?: string;
  vehicle_make?: string;
  vehicle_model?: string;
};

export default function ProviderDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [recentBookings, setRecentBookings] = useState<Booking[]>([]);
  const [status, setStatus] = useState("Loading dashboard...");
  const navigate = useNavigate();

  useEffect(() => {
    let ignore = false;

    async function load() {
      const [statsResult, bookingsResult] = await Promise.allSettled([
        getProviderStats(),
        listProviderBookings(),
      ]);

      if (!ignore) {
        if (statsResult.status === "fulfilled") {
          const statsResp = statsResult.value;
          setStats(statsResp?.data ?? statsResp ?? null);
        }

        if (bookingsResult.status === "fulfilled") {
          const bookingsResp = bookingsResult.value;
          const bData = bookingsResp.data || bookingsResp;
          setRecentBookings(
            (Array.isArray(bData) ? bData : []).slice(0, 5)
          );
        }

        setStatus(
          statsResult.status === "rejected" && bookingsResult.status === "rejected"
            ? "Could not load dashboard."
            : ""
        );
      }
    }

    load();
    return () => { ignore = true; };
  }, []);

  const formatDate = (raw: string) => {
    try {
      return new Date(raw).toLocaleDateString("en-ZA", {
        day: "numeric",
        month: "short",
      });
    } catch {
      return raw;
    }
  };

  const label = (s: string) => s.replace(/_/g, " ");

  const statCards = stats
    ? [
        {
          label: "Active bookings",
          value: stats.active_bookings,
          icon: Clock,
          color: "text-blue-600 bg-blue-100",
        },
        {
          label: "Completed",
          value: stats.completed_bookings,
          icon: CheckCircle2,
          color: "text-emerald-600 bg-emerald-100",
        },
        {
          label: "Total bookings",
          value: stats.total_bookings,
          icon: Calendar,
          color: "text-indigo-600 bg-indigo-100",
        },
        {
          label: "Earnings this month",
          value: `R${Number(stats.earnings_this_month).toFixed(2)}`,
          icon: DollarSign,
          color: "text-amber-600 bg-amber-100",
        },
      ]
    : [];

  return (
    <Layout className="bg-primary" variant="app">
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Badge className="mb-4 bg-primary text-primary-foreground">Dashboard</Badge>
            <h1 className="text-4xl font-semibold text-primary-foreground">
              Provider dashboard
            </h1>
            <p className="mt-3 text-primary-foreground/80">
              Overview of your bookings, earnings, and recent activity.
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => navigate("/provider/bookings")}
              variant="outline"
            >
              <Calendar className="size-4" />
              All bookings
            </Button>
            <Button onClick={() => navigate("/mechanic/profile?tab=provider")}>
              <Wrench className="size-4" />
              Edit profile
            </Button>
          </div>
        </div>

        {!stats && status && <StatusMessage message={status} />}

        {stats && (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {statCards.map((card) => (
              <Card key={card.label} className="rounded-lg bg-card">
                <CardContent className="flex items-center gap-4 py-5">
                  <span
                    className={`flex size-12 shrink-0 items-center justify-center rounded-full ${card.color}`}
                  >
                    <card.icon className="size-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-2xl font-bold text-foreground">
                      {card.value}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {card.label}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Recent bookings */}
        <Card className="mt-8 rounded-lg bg-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent bookings</CardTitle>
                <CardDescription>
                  Your 5 most recent service requests.
                </CardDescription>
              </div>
              <Button
                onClick={() => navigate("/provider/bookings")}
                size="sm"
                variant="outline"
              >
                View all
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {recentBookings.length === 0 ? (
              <p className="py-4 text-center text-sm text-muted-foreground">
                No bookings yet.
              </p>
            ) : (
              <div className="divide-y">
                {recentBookings.map((b) => (
                  <div
                    key={b.id}
                    className="flex cursor-pointer items-center gap-4 py-3 transition-colors hover:bg-muted/50"
                    onClick={() => navigate(`/provider/bookings/${b.id}`)}
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-foreground">
                        {b.customer_first_name} {b.customer_last_name}
                      </p>
                      <p className="line-clamp-1 text-xs text-muted-foreground">
                        {b.description}
                      </p>
                    </div>
                    <Badge variant="outline" className="shrink-0 text-xs">
                      {label(b.booking_status)}
                    </Badge>
                    <span className="shrink-0 text-xs text-muted-foreground">
                      {formatDate(b.preferred_schedule)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </section>
    </Layout>
  );
}

import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  ChevronRight,
  XCircle,
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
import {
  listProviderBookings,
  updateBookingStatus,
} from "@/api/bookings";

const statusColors: Record<string, string> = {
  payment_pending: "bg-amber-100 text-amber-800 border-amber-200",
  paid: "bg-blue-100 text-blue-800 border-blue-200",
  whatsapp_redirected: "bg-indigo-100 text-indigo-800 border-indigo-200",
  in_progress: "bg-indigo-100 text-indigo-800 border-indigo-200",
  completed: "bg-emerald-100 text-emerald-800 border-emerald-200",
  cancelled: "bg-red-100 text-red-800 border-red-200",
  rejected: "bg-gray-100 text-gray-800 border-gray-200",
};

const statusTabs = [
  { key: "all", label: "All" },
  { key: "payment_pending", label: "Pending payment" },
  { key: "paid", label: "Paid" },
  { key: "in_progress", label: "In progress" },
  { key: "completed", label: "Completed" },
];

type Booking = {
  id: number;
  booking_status: string;
  description: string;
  preferred_schedule: string;
  created_at: string;
  customer_first_name?: string;
  customer_last_name?: string;
  vehicle_make?: string;
  vehicle_model?: string;
};

export default function ProviderBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [status, setStatus] = useState("Loading bookings...");
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    let ignore = false;

    async function load() {
      try {
        const resp = await listProviderBookings();
        const data = Array.isArray(resp) ? resp : resp?.data ?? [];
        if (!ignore) {
          setBookings(data);
          setStatus("");
        }
      } catch (error) {
        if (!ignore) {
          setStatus(
            error instanceof Error
              ? error.message
              : "Could not load bookings."
          );
        }
      } finally {
        if (!ignore) setIsLoading(false);
      }
    }

    load();
    return () => { ignore = true; };
  }, []);

  const handleStatusAction = async (bookingId: number, newStatus: string) => {
    try {
      await updateBookingStatus(bookingId, newStatus);
      setBookings((prev) =>
        prev.map((b) =>
          b.id === bookingId ? { ...b, booking_status: newStatus } : b
        )
      );
    } catch {
      setStatus(`Could not update booking #${bookingId}.`);
    }
  };

  const canTransition = (current: string): { status: string; label: string }[] => {
    switch (current) {
      case "paid":
        return [{ status: "in_progress", label: "Accept" }];
      case "in_progress":
        return [{ status: "completed", label: "Complete" }];
      case "payment_pending":
        return [{ status: "rejected", label: "Reject" }];
      case "whatsapp_redirected":
        return [
          { status: "in_progress", label: "Start" },
          { status: "cancelled", label: "Cancel" },
        ];
      default:
        return [];
    }
  };

  const filteredBookings =
    activeTab === "all"
      ? bookings
      : bookings.filter((b) => b.booking_status === activeTab);

  const label = (s: string) => s.replace(/_/g, " ");

  const formatDate = (raw: string) => {
    try {
      return new Date(raw).toLocaleDateString("en-ZA", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } catch {
      return raw;
    }
  };

  return (
    <Layout className="bg-primary" variant="app">
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <Button
          className="mb-6 px-0 text-foreground"
          onClick={() => navigate("/provider/dashboard")}
          variant="link"
        >
          <ArrowLeft className="size-4" />
          Back to dashboard
        </Button>

        <div className="mb-6">
          <Badge className="mb-4 bg-primary text-primary-foreground">Bookings</Badge>
          <h1 className="text-4xl font-semibold text-primary-foreground">
            Manage bookings
          </h1>
          <p className="mt-3 text-primary-foreground/80">
            View and manage all service requests from customers.
          </p>
        </div>

        {/* Status tabs */}
        <div className="mb-6 flex flex-wrap gap-2">
          {statusTabs.map((tab) => (
            <Button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              variant={activeTab === tab.key ? "default" : "outline"}
              size="sm"
            >
              {tab.label}
            </Button>
          ))}
        </div>

        {isLoading && <StatusMessage message="Loading bookings..." />}

        {!isLoading && filteredBookings.length === 0 && (
          <Card className="rounded-lg bg-card">
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">No bookings found.</p>
            </CardContent>
          </Card>
        )}

        {!isLoading && filteredBookings.length > 0 && (
          <Card className="rounded-lg bg-card">
            <CardContent className="p-0">
              <div className="divide-y">
                {filteredBookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:gap-4"
                  >
                    <div
                      className="min-w-0 flex-1 cursor-pointer"
                      onClick={() =>
                        navigate(`/provider/bookings/${booking.id}`)
                      }
                    >
                      <div className="flex items-center gap-2">
                        <Badge
                          className={
                            statusColors[booking.booking_status] ||
                            "bg-gray-100 text-gray-800"
                          }
                          variant="outline"
                        >
                          {label(booking.booking_status)}
                        </Badge>
                        <span className="text-sm font-medium text-foreground">
                          #{booking.id}
                        </span>
                      </div>
                      <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">
                        {booking.customer_first_name}{" "}
                        {booking.customer_last_name}
                        {booking.vehicle_make &&
                          ` — ${booking.vehicle_make} ${booking.vehicle_model}`}
                      </p>
                      <p className="line-clamp-1 text-xs text-muted-foreground">
                        {booking.description}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex shrink-0 gap-1">
                      {canTransition(booking.booking_status).map(
                        (action) => (
                          <Button
                            key={action.status}
                            onClick={() =>
                              handleStatusAction(booking.id, action.status)
                            }
                            size="sm"
                            variant="outline"
                          >
                            {action.label === "Reject" ? (
                              <XCircle className="size-3" />
                            ) : action.label === "Complete" ? (
                              <CheckCircle2 className="size-3" />
                            ) : (
                              <Calendar className="size-3" />
                            )}
                            {action.label}
                          </Button>
                        )
                      )}
                      <Button
                        onClick={() =>
                          navigate(`/provider/bookings/${booking.id}`)
                        }
                        size="icon"
                        variant="ghost"
                      >
                        <ChevronRight className="size-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {status && filteredBookings.length > 0 && (
          <StatusMessage className="mt-4" message={status} />
        )}
      </section>
    </Layout>
  );
}

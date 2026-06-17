import { Calendar, ChevronRight, MapPin, Wrench } from "lucide-react";
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
import { listMyBookings } from "@/api/bookings";

const statusColors: Record<string, string> = {
  payment_pending: "bg-amber-100 text-amber-800 border-amber-200",
  paid: "bg-blue-100 text-blue-800 border-blue-200",
  whatsapp_redirected: "bg-indigo-100 text-indigo-800 border-indigo-200",
  in_progress: "bg-indigo-100 text-indigo-800 border-indigo-200",
  completed: "bg-emerald-100 text-emerald-800 border-emerald-200",
  cancelled: "bg-red-100 text-red-800 border-red-200",
  rejected: "bg-gray-100 text-gray-800 border-gray-200",
};

type Booking = {
  id: number;
  booking_status: string;
  description: string;
  preferred_schedule: string;
  created_at: string;
  quoted_amount?: number | string | null;
  customer_first_name?: string;
  customer_last_name?: string;
  provider_first_name?: string;
  provider_last_name?: string;
  business_name?: string;
  provider_profile_id?: number;
  vehicle_make?: string;
  vehicle_model?: string;
  license_plate?: string;
};

export default function MyBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [status, setStatus] = useState("Loading bookings...");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let ignore = false;

    async function load() {
      try {
        const resp = await listMyBookings();
        const data = Array.isArray(resp) ? resp : resp?.data ?? [];
        if (!ignore) {
          setBookings(data);
          setStatus(data.length === 0 ? "You don't have any bookings yet." : "");
        }
      } catch {
        if (!ignore) {
          setStatus("Could not load bookings.");
        }
      } finally {
        if (!ignore) setIsLoading(false);
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
        year: "numeric",
      });
    } catch {
      return raw;
    }
  };

  const label = (s: string) => s.replace(/_/g, " ");
  const formatCurrency = (value?: number | string | null) => {
    const amount = Number(value);
    if (!Number.isFinite(amount) || amount <= 0) return "Awaiting quote";
    return new Intl.NumberFormat("en-ZA", {
      style: "currency",
      currency: "ZAR",
    }).format(amount);
  };

  return (
    <Layout className="bg-primary" variant="app">
      <section className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Badge className="mb-4 bg-primary text-primary-foreground">Bookings</Badge>
          <h1 className="text-4xl font-semibold text-primary-foreground">
            My bookings
          </h1>
          <p className="mt-3 text-primary-foreground/80">
            Track your service requests, make payments, and view booking history.
          </p>
        </div>

        {isLoading && <StatusMessage message="Loading bookings..." />}

        {!isLoading && bookings.length === 0 && (
          <Card className="rounded-lg bg-card">
            <CardContent className="py-12 text-center">
              <Wrench className="mx-auto mb-4 size-10 text-muted-foreground" />
              <CardTitle className="mb-2">No bookings yet</CardTitle>
              <CardDescription className="mb-6 max-w-md mx-auto">
                Find a mechanic and request a service to get started.
              </CardDescription>
              <Button onClick={() => navigate("/find-mechanic")}>
                Find a mechanic
              </Button>
            </CardContent>
          </Card>
        )}

        {!isLoading && bookings.length > 0 && (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <Card
                key={booking.id}
                className="rounded-lg bg-card cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => navigate(`/bookings/${booking.id}`)}
              >
                <CardContent className="flex items-center gap-4 py-4 sm:gap-6">
                  {/* Status indicator */}
                  <div
                    className={`hidden sm:flex size-12 shrink-0 items-center justify-center rounded-full border-2 ${
                      statusColors[booking.booking_status] || "bg-gray-50 text-gray-600 border-gray-200"
                    }`}
                  >
                    <Calendar className="size-5" />
                  </div>

                  {/* Main info */}
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge
                        className={
                          statusColors[booking.booking_status] || "bg-gray-100 text-gray-800"
                        }
                        variant="outline"
                      >
                        {label(booking.booking_status)}
                      </Badge>
                      {booking.business_name && (
                        <span className="text-sm font-medium text-foreground">
                          {booking.business_name}
                        </span>
                      )}
                      <span className="text-sm font-medium text-foreground">
                        {formatCurrency(booking.quoted_amount)}
                      </span>
                    </div>
                    <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">
                      {booking.description || "No description"}
                    </p>
                    <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="size-3" />
                        {formatDate(booking.preferred_schedule)}
                      </span>
                      {booking.vehicle_make && (
                        <span className="flex items-center gap-1">
                          <MapPin className="size-3" />
                          {booking.vehicle_make} {booking.vehicle_model}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Arrow */}
                  <ChevronRight className="size-5 shrink-0 text-muted-foreground" />
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {!isLoading && status && bookings.length > 0 && (
          <StatusMessage className="mt-4" message={status} />
        )}
      </section>
    </Layout>
  );
}

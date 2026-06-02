import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Clock,
  MapPin,
  MessageSquare,
  Star,
  XCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import Layout from "@/app/components/Layout";
import { Avatar, AvatarFallback } from "@/app/components/ui/avatar";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Separator } from "@/app/components/ui/separator";
import { StatusMessage } from "@/app/components/ui/status-message";
import { getBooking, updateBookingStatus } from "@/api/bookings";

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
  customer_first_name?: string;
  customer_last_name?: string;
  provider_first_name?: string;
  provider_last_name?: string;
  business_name?: string;
  vehicle_make?: string;
  vehicle_model?: string;
  license_plate?: string;
};

export default function ProviderBookingDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [status, setStatus] = useState("Loading booking...");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    let ignore = false;

    async function load() {
      try {
        const resp = await getBooking(id);
        const data = resp?.data ?? resp;
        if (!ignore && data) {
          setBooking(data);
          setStatus("");
        } else if (!ignore) {
          setStatus("Booking not found.");
        }
      } catch {
        if (!ignore) setStatus("Could not load booking.");
      } finally {
        if (!ignore) setIsLoading(false);
      }
    }

    load();
    return () => { ignore = true; };
  }, [id]);

  const handleStatus = async (newStatus: string) => {
    if (!booking) return;
    try {
      await updateBookingStatus(booking.id, newStatus);
      setBooking((prev) => prev ? { ...prev, booking_status: newStatus } : prev);
      setStatus(`Booking #${booking.id} updated to ${newStatus.replace(/_/g, " ")}.`);
    } catch {
      setStatus("Could not update booking status.");
    }
  };

  const formatDate = (raw: string) => {
    try {
      return new Date(raw).toLocaleDateString("en-ZA", {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } catch {
      return raw;
    }
  };

  const formatTime = (raw: string) => {
    try {
      return new Date(raw).toLocaleTimeString("en-ZA", {
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "";
    }
  };

  const label = (s: string) => s.replace(/_/g, " ");

  const availableActions: { status: string; label: string; variant: "default" | "destructive" | "outline" }[] = [];
  if (booking) {
    switch (booking.booking_status) {
      case "paid":
        availableActions.push({ status: "in_progress", label: "Accept & start work", variant: "default" });
        break;
      case "in_progress":
        availableActions.push({ status: "completed", label: "Mark as completed", variant: "default" });
        break;
      case "payment_pending":
        availableActions.push({ status: "rejected", label: "Reject booking", variant: "destructive" });
        break;
    }
  }

  if (isLoading) {
    return (
      <Layout className="bg-primary" variant="app">
        <section className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
          <StatusMessage message="Loading booking..." />
        </section>
      </Layout>
    );
  }

  if (!booking) {
    return (
      <Layout className="bg-primary" variant="app">
        <section className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
          <Card className="rounded-lg bg-card">
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">{status}</p>
              <Button className="mt-4" onClick={() => navigate("/provider/bookings")}>
                Back to bookings
              </Button>
            </CardContent>
          </Card>
        </section>
      </Layout>
    );
  }

  return (
    <Layout className="bg-primary" variant="app">
      <section className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <Button
          className="mb-6 px-0 text-foreground"
          onClick={() => navigate("/provider/bookings")}
          variant="link"
        >
          <ArrowLeft className="size-4" />
          Back to bookings
        </Button>

        <div className="mb-6 flex flex-wrap items-center gap-3">
          <Badge
            className={statusColors[booking.booking_status] || ""}
            variant="outline"
          >
            {label(booking.booking_status)}
          </Badge>
          <h1 className="text-3xl font-semibold text-primary-foreground">
            Booking #{booking.id}
          </h1>
          <span className="text-sm text-primary-foreground/60">
            {formatDate(booking.created_at)} at {formatTime(booking.created_at)}
          </span>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          {/* Customer info */}
          <div className="space-y-6">
            <Card className="rounded-lg bg-card">
              <CardHeader>
                <CardTitle className="text-lg">Customer</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <Avatar className="size-12">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {(booking.customer_first_name?.[0] || "C") +
                        (booking.customer_last_name?.[0] || "")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">
                      {booking.customer_first_name} {booking.customer_last_name}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Service details */}
            <Card className="rounded-lg bg-card">
              <CardHeader>
                <CardTitle className="text-lg">Service details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <p className="text-xs text-muted-foreground">Scheduled</p>
                    <p className="text-sm font-medium">
                      {formatDate(booking.preferred_schedule)} at{" "}
                      {formatTime(booking.preferred_schedule)}
                    </p>
                  </div>
                  {booking.vehicle_make && (
                    <div>
                      <p className="text-xs text-muted-foreground">Vehicle</p>
                      <p className="text-sm font-medium">
                        {booking.vehicle_make} {booking.vehicle_model}
                        {booking.license_plate &&
                          ` (${booking.license_plate})`}
                      </p>
                    </div>
                  )}
                </div>
                <Separator />
                <div>
                  <p className="text-xs text-muted-foreground">Description</p>
                  <p className="mt-1 text-sm leading-6">{booking.description}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Actions */}
          <div className="space-y-6">
            <Card className="rounded-lg bg-card">
              <CardHeader>
                <CardTitle className="text-lg">Actions</CardTitle>
                <CardDescription>
                  Update the booking status as you progress.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {availableActions.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    No actions available for {label(booking.booking_status)} bookings.
                  </p>
                ) : (
                  availableActions.map((action) => (
                    <Button
                      key={action.status}
                      className="w-full"
                      onClick={() => handleStatus(action.status)}
                      variant={action.variant}
                    >
                      {action.status === "completed" ? (
                        <CheckCircle2 className="size-4" />
                      ) : action.status === "rejected" ? (
                        <XCircle className="size-4" />
                      ) : (
                        <Calendar className="size-4" />
                      )}
                      {action.label}
                    </Button>
                  ))
                )}
              </CardContent>
            </Card>

            {status && <StatusMessage message={status} />}
          </div>
        </div>
      </section>
    </Layout>
  );
}

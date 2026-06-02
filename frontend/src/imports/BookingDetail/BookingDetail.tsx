import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Clock,
  ExternalLink,
  MapPin,
  MessageSquare,
  Star,
  Wrench,
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
import {
  getBooking,
  initiatePayment,
  getPaymentStatus,
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

const statusTimeline = [
  "payment_pending",
  "paid",
  "whatsapp_redirected",
  "in_progress",
  "completed",
];

type BookingDetail = {
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
  provider_profile_id?: number;
  vehicle_make?: string;
  vehicle_model?: string;
  license_plate?: string;
  whatsapp_url?: string;
};

export default function BookingDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState<BookingDetail | null>(null);
  const [status, setStatus] = useState("Loading booking...");
  const [isLoading, setIsLoading] = useState(true);
  const [paymentUrl, setPaymentUrl] = useState("");
  const [whatsappUrl, setWhatsappUrl] = useState("");

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

          // If booking already has whatsapp_url unlocked, show it
          if (data.whatsapp_url) {
            setWhatsappUrl(data.whatsapp_url);
          }
        } else if (!ignore) {
          setStatus("Booking not found.");
        }
      } catch (error) {
        if (!ignore) {
          setStatus(
            error instanceof Error
              ? error.message
              : "Could not load booking."
          );
        }
      } finally {
        if (!ignore) setIsLoading(false);
      }
    }

    load();
    return () => { ignore = true; };
  }, [id]);

  const handlePay = async () => {
    if (!booking) return;
    setStatus("Initiating payment...");
    try {
      const resp = await initiatePayment(booking.id);
      const pData = resp?.data ?? resp;
      if (pData.redirectUrl) {
        setPaymentUrl(pData.redirectUrl);
        setStatus("Payment ready. Click the button below to pay via PayFast.");
      }
    } catch (error) {
      setStatus(
        error instanceof Error
          ? error.message
          : "Could not initiate payment."
      );
    }
  };

  const handleCheckPayment = async () => {
    if (!booking) return;
    setStatus("Checking payment status...");
    try {
      const resp = await getPaymentStatus(booking.id);
      const pData = resp?.data ?? resp;
      if (pData.whatsapp_url) {
        setWhatsappUrl(pData.whatsapp_url);
        setStatus("Payment confirmed! You can now contact the provider.");
      } else {
        setStatus("Payment not yet confirmed. Complete the payment first.");
      }
    } catch {
      setStatus("Could not check payment status.");
    }
  };

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

  const currentStatusIndex = booking
    ? statusTimeline.indexOf(booking.booking_status)
    : -1;
  const isCancelled = booking?.booking_status === "cancelled" || booking?.booking_status === "rejected";

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
              <Button className="mt-4" onClick={() => navigate("/bookings")}>
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
          onClick={() => navigate("/bookings")}
          variant="link"
        >
          <ArrowLeft className="size-4" />
          Back to bookings
        </Button>

        <div className="mb-6">
          <div className="flex flex-wrap items-center gap-3">
            <Badge
              className={statusColors[booking.booking_status] || ""}
              variant="outline"
            >
              {label(booking.booking_status)}
            </Badge>
            <h1 className="text-3xl font-semibold text-primary-foreground">
              Booking #{booking.id}
            </h1>
          </div>
          <p className="mt-2 text-primary-foreground/80">
            Created {formatDate(booking.created_at)} at{" "}
            {formatTime(booking.created_at)}
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          {/* Left column — details */}
          <div className="space-y-6">
            {/* Status timeline */}
            {!isCancelled && (
              <Card className="rounded-lg bg-card">
                <CardHeader>
                  <CardTitle className="text-lg">Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-0">
                    {statusTimeline.map((step, index) => {
                      const isCompleted = index <= currentStatusIndex;
                      const isCurrent = index === currentStatusIndex;
                      return (
                        <div key={step} className="flex gap-3">
                          <div className="flex flex-col items-center">
                            <div
                              className={`size-4 rounded-full border-2 ${
                                isCompleted
                                  ? "bg-primary border-primary"
                                  : "bg-card border-muted-foreground/30"
                              }`}
                            />
                            {index < statusTimeline.length - 1 && (
                              <div
                                className={`mt-0.5 h-8 w-0.5 ${
                                  isCompleted
                                    ? "bg-primary/40"
                                    : "bg-muted-foreground/20"
                                }`}
                              />
                            )}
                          </div>
                          <div className={`pb-6 ${isCurrent ? "font-medium" : "text-muted-foreground"}`}>
                            <p className="text-sm capitalize">{label(step)}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            )}

            {isCancelled && (
              <Card className="rounded-lg bg-card">
                <CardContent className="py-6 text-center">
                  <p className="font-medium text-muted-foreground">
                    This booking was {label(booking.booking_status)}.
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Description */}
            <Card className="rounded-lg bg-card">
              <CardHeader>
                <CardTitle className="text-lg">Service details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <p className="text-xs text-muted-foreground">Scheduled</p>
                    <p className="text-sm font-medium">
                      {formatDate(booking.preferred_schedule)}
                    </p>
                  </div>
                  {booking.vehicle_make && (
                    <div>
                      <p className="text-xs text-muted-foreground">Vehicle</p>
                      <p className="text-sm font-medium">
                        {booking.vehicle_make} {booking.vehicle_model}
                        {booking.license_plate && ` (${booking.license_plate})`}
                      </p>
                    </div>
                  )}
                </div>
                <Separator />
                <div>
                  <p className="text-xs text-muted-foreground">Description</p>
                  <p className="mt-1 text-sm leading-6">
                    {booking.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right column — actions */}
          <div className="space-y-6">
            {/* Provider card */}
            {booking.business_name && (
              <Card className="rounded-lg bg-card">
                <CardHeader>
                  <CardTitle className="text-lg">Service provider</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3">
                    <Avatar className="size-10">
                      <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                        {(booking.business_name || "SP")
                          .split(" ")
                          .map((p) => p[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{booking.business_name}</p>
                      {booking.provider_first_name && (
                        <p className="text-xs text-muted-foreground">
                          {booking.provider_first_name}{" "}
                          {booking.provider_last_name}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Payment card */}
            {booking.booking_status === "payment_pending" && (
              <Card className="rounded-lg bg-card">
                <CardHeader>
                  <CardTitle className="text-lg">Payment</CardTitle>
                  <CardDescription>
                    Pay via PayFast sandbox to confirm your booking.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {!paymentUrl ? (
                    <Button className="w-full" onClick={handlePay}>
                      <ExternalLink className="size-4" />
                      Pay now (R100.00)
                    </Button>
                  ) : (
                    <>
                      <Button
                        className="w-full"
                        onClick={() => window.open(paymentUrl, "_blank")}
                      >
                        <ExternalLink className="size-4" />
                        Open PayFast
                      </Button>
                      <Button
                        className="w-full"
                        onClick={handleCheckPayment}
                        variant="outline"
                      >
                        <CheckCircle2 className="size-4" />
                        I've paid — check status
                      </Button>
                    </>
                  )}
                </CardContent>
              </Card>
            )}

            {/* WhatsApp unlock / contact */}
            {whatsappUrl && (
              <Card className="rounded-lg border-emerald-200 bg-card">
                <CardContent className="py-4">
                  <p className="mb-2 text-sm font-medium text-emerald-700">
                    Payment confirmed! Contact the provider:
                  </p>
                  <Button
                    className="w-full"
                    onClick={() => window.open(whatsappUrl, "_blank")}
                  >
                    <MessageSquare className="size-4" />
                    Open WhatsApp
                  </Button>
                </CardContent>
              </Card>
            )}

            {status && <StatusMessage message={status} />}
          </div>
        </div>
      </section>
    </Layout>
  );
}

import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  Clock,
  CreditCard,
  XCircle,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router";

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
  cancelPaymentReturn,
  confirmPaymentReturn,
  getPaymentStatus,
} from "@/api/bookings";

type PaymentStatus = {
  booking_id?: number;
  amount?: number | string;
  currency?: string;
  payment_status?: string;
  paid_at?: string | null;
};

export default function PaymentResult() {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const bookingId = searchParams.get("bookingId");
  const routeResult = location.pathname.includes("cancel") ? "cancel" : "success";
  const [payment, setPayment] = useState<PaymentStatus | null>(null);
  const [status, setStatus] = useState("Checking payment status...");
  const [isLoading, setIsLoading] = useState(true);

  const formatCurrency = (value?: number | string, currency = "ZAR") => {
    const amount = Number(value);
    if (!Number.isFinite(amount)) return "";
    return new Intl.NumberFormat("en-ZA", {
      style: "currency",
      currency,
    }).format(amount);
  };

  const loadStatus = async (markCancelled = false) => {
    if (!bookingId) {
      setStatus("Payment redirect is missing the booking reference.");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const response = markCancelled
        ? await cancelPaymentReturn(bookingId)
        : routeResult === "success"
          ? await confirmPaymentReturn(bookingId)
          : await getPaymentStatus(bookingId);
      const data = response?.data ?? response;
      setPayment(data);

      if (data.payment_status === "successful") {
        setStatus("Payment successful. Your booking is confirmed.");
      } else if (data.payment_status === "pending") {
        setStatus("PayFast is still confirming this payment. Try again in a moment.");
      } else if (data.payment_status === "cancelled") {
        setStatus("Payment was cancelled. You can return to the booking and try again.");
      } else if (data.payment_status === "failed") {
        setStatus("Payment failed. You can return to the booking and try again.");
      } else {
        setStatus("Payment status is not available yet.");
      }
    } catch (error) {
      setStatus(
        error instanceof Error
          ? error.message
          : "Could not verify the payment status."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadStatus(routeResult === "cancel");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookingId, routeResult]);

  const presentation = useMemo(() => {
    switch (payment?.payment_status) {
      case "successful":
        return {
          icon: CheckCircle2,
          title: "Payment Successful",
          badge: "Successful",
          tone: "bg-emerald-100 text-emerald-800 border-emerald-200",
        };
      case "cancelled":
        return {
          icon: XCircle,
          title: "Payment Cancelled",
          badge: "Cancelled",
          tone: "bg-red-100 text-red-800 border-red-200",
        };
      case "failed":
        return {
          icon: AlertCircle,
          title: "Payment Failed",
          badge: "Failed",
          tone: "bg-red-100 text-red-800 border-red-200",
        };
      case "pending":
        return {
          icon: Clock,
          title: "Payment Pending",
          badge: "Pending",
          tone: "bg-amber-100 text-amber-800 border-amber-200",
        };
      default:
        return {
          icon: CreditCard,
          title: routeResult === "cancel" ? "Payment Cancelled" : "Payment Status",
          badge: "Checking",
          tone: "bg-gray-100 text-gray-800 border-gray-200",
        };
    }
  }, [payment?.payment_status, routeResult]);

  const Icon = presentation.icon;

  return (
    <Layout className="bg-primary" variant="app">
      <section className="mx-auto max-w-2xl px-4 py-10 sm:px-6 lg:px-8">
        <Card className="rounded-lg bg-card">
          <CardHeader>
            <div className="mb-4 flex items-center gap-3">
              <div className="flex size-12 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <Icon className="size-6" />
              </div>
              <Badge className={presentation.tone} variant="outline">
                {presentation.badge}
              </Badge>
            </div>
            <CardTitle className="text-2xl">{presentation.title}</CardTitle>
            <CardDescription>
              Booking {bookingId ? `#${bookingId}` : "reference unavailable"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {payment?.amount && (
              <div>
                <p className="text-xs text-muted-foreground">Amount</p>
                <p className="text-2xl font-semibold">
                  {formatCurrency(payment.amount, payment.currency || "ZAR")}
                </p>
              </div>
            )}

            <StatusMessage message={isLoading ? "Checking payment status..." : status} />

            <div className="flex flex-col gap-2 sm:flex-row">
              {bookingId && (
                <Button onClick={() => navigate(`/bookings/${bookingId}`)}>
                  <ArrowLeft className="size-4" />
                  View booking
                </Button>
              )}
              <Button
                disabled={!bookingId || isLoading}
                onClick={() => loadStatus(false)}
                variant="outline"
              >
                <Clock className="size-4" />
                Refresh status
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </Layout>
  );
}

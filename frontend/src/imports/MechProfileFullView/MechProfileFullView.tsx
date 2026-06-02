import {
  ArrowLeft,
  CalendarPlus,
  CheckCircle2,
  ExternalLink,
  MapPin,
  MessageSquare,
  Star,
} from "lucide-react";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router";

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
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Separator } from "@/app/components/ui/separator";
import { StatusMessage } from "@/app/components/ui/status-message";
import { Textarea } from "@/app/components/ui/textarea";
import { createBooking, initiatePayment, getPaymentStatus } from "@/api/bookings";
import { getMechanicProfile } from "@/api/mechanics";
import { getMechanicReviews } from "@/api/reviews";
import { listVehicles } from "@/api/vehicles";

const fallbackProfile = {
  id: "robert-auto",
  name: "Robert Daniels",
  serviceName: "Robert's Auto Clinic",
  location: "Johannesburg",
  specialties: ["Diagnostics", "Engine repair", "Electrical"],
  rating: 4.9,
  reviewCount: 128,
  responseTime: "Usually responds within 1 hour",
  bio: "Independent workshop focused on reliable diagnostics, transparent estimates, and practical repairs for everyday drivers.",
  verified: true,
};

const fallbackReviews = [
  {
    name: "Avery J.",
    text: "Clear diagnosis, fair estimate, and the car was ready when promised.",
  },
  {
    name: "Sam N.",
    text: "Helpful communication and practical advice before any work started.",
  },
];

export default function MechProfileFullView() {
  const [status, setStatus] = useState("Loading mechanic from backend...");
  const [mechanicData, setMechanicData] = useState(null);
  const [backendReviews, setBackendReviews] = useState(fallbackReviews);
  const [vehicles, setVehicles] = useState([]);
  const [bookingForm, setBookingForm] = useState({
    vehicleId: "",
    description: "",
    preferredSchedule: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState("");
  const [whatsappUrl, setWhatsappUrl] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const fromProfile = searchParams.get("from") === "profile";

  useEffect(() => {
    let ignore = false;

    async function loadProfile() {
      if (!id) return;

      try {
        const [profileResponse, reviewResponse] = await Promise.all([
          getMechanicProfile(id),
          getMechanicReviews(id).catch(() => ({ data: [] })),
        ]);
        const profile = profileResponse.data;
        const name =
          [profile.first_name, profile.last_name].filter(Boolean).join(" ") ||
          "Mechanic";

        if (!ignore) {
          setMechanicData({
            id: String(profile.id),
            name,
            serviceName: profile.business_name || name,
            location: profile.city || profile.town || "Unknown",
            specialties: profile.specialities || [],
            rating: Number(profile.average_rating || 0),
            reviewCount: Number(profile.review_count || 0),
            responseTime: profile.is_available
              ? "Available for requests"
              : "Availability on request",
            bio: profile.service_description || "No description provided yet.",
            verified: Boolean(profile.verification_badge),
            photoUrl: profile.profile_photo_url || "",
            phone: profile.business_whatsapp_number || profile.phone_number || "",
          });
          setBackendReviews(
            (reviewResponse.data || []).map((review) => ({
              name:
                [review.user_first_name, review.user_last_name]
                  .filter(Boolean)
                  .join(" ") || "Customer",
              text: review.comment,
            })),
          );
          setStatus("Mechanic profile loaded from backend.");
        }
      } catch (error) {
        if (!ignore) {
          setMechanicData(null);
          setStatus(
            error instanceof Error
              ? `${error.message}. Showing local fallback profile.`
              : "Could not load backend mechanic profile. Showing local fallback profile.",
          );
        }
      }
    }

    async function loadVehicles() {
      try {
        const response = await listVehicles();
        if (!ignore) {
          setVehicles(response.data || []);
        }
      } catch {
        if (!ignore) setVehicles([]);
      }
    }

    loadProfile();
    loadVehicles();

    return () => {
      ignore = true;
    };
  }, [id]);

  const mechanic = useMemo(
    () => mechanicData || fallbackProfile,
    [mechanicData],
  );

  const submitBooking = async (event) => {
    event.preventDefault();

    if (!bookingForm.vehicleId || !bookingForm.description || !bookingForm.preferredSchedule) {
      setStatus("Choose a vehicle, describe the job, and pick a preferred schedule.");
      return;
    }

    setIsSubmitting(true);
    setStatus("Creating booking...");

    try {
      const bookingResp = await createBooking({
        providerId: Number(id),
        vehicleId: Number(bookingForm.vehicleId),
        description: bookingForm.description,
        preferredSchedule: new Date(bookingForm.preferredSchedule).toISOString(),
      });
      const booking = bookingResp.data;
      setStatus("Booking created. Initiating payment...");

      // Initiate PayFast payment
      const paymentResp = await initiatePayment(booking.id);
      const payment = paymentResp.data;
      setPaymentUrl(payment.redirectUrl);
      setStatus(
        "Booking created. Click the payment button to complete via PayFast sandbox.",
      );
      setBookingForm({ vehicleId: "", description: "", preferredSchedule: "" });
    } catch (error) {
      setStatus(
        error instanceof Error
          ? error.message
          : "Could not create booking. Please sign in and try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const checkPaymentStatus = async (bookingId) => {
    try {
      const resp = await getPaymentStatus(bookingId);
      const data = resp.data;
      if (data.whatsapp_url) {
        setWhatsappUrl(data.whatsapp_url);
      } else {
        setStatus("Payment not yet confirmed. Check back after paying.");
      }
    } catch {
      setStatus("Could not fetch payment status.");
    }
  };

  const handleContact = () => {
    if (mechanicData?.phone) {
      const cleaned = mechanicData.phone.replace(/[^0-9]/g, "");
      window.open(
        `https://wa.me/${cleaned}?text=${encodeURIComponent("Hi, I'm interested in your services from OneStopShop.")}`,
        "_blank",
      );
    } else {
      setStatus("WhatsApp number not available for this provider yet. Check back after they update their profile.");
    }
  };

  return (
    <Layout className="bg-primary" variant="app">
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <Button
          className="mb-6 px-0 text-foreground"
          onClick={() => navigate(fromProfile ? "/mechanic/profile" : "/find-mechanic")}
          variant="link"
        >
          <ArrowLeft className="size-4" />
          Back to results
        </Button>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <Card className="rounded-lg bg-card">
            <CardHeader>
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                <Avatar className="size-20">
                  {mechanic.photoUrl ? (
                    <img
                      alt={mechanic.name}
                      className="size-full rounded-full object-cover"
                      src={mechanic.photoUrl}
                    />
                  ) : (
                    <AvatarFallback className="bg-primary text-xl text-primary-foreground">
                      {mechanic.name
                        .split(" ")
                        .map((part) => part[0])
                        .join("")}
                    </AvatarFallback>
                  )}
                </Avatar>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    {mechanic.verified && (
                      <Badge className="bg-primary text-primary-foreground">
                        <CheckCircle2 className="size-3" />
                        Verified
                      </Badge>
                    )}
                    <Badge variant="secondary">{mechanic.responseTime}</Badge>
                  </div>
                  <CardTitle className="mt-4 text-3xl">
                    {mechanic.serviceName}
                  </CardTitle>
                  <CardDescription className="mt-2">
                    {mechanic.name}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-md bg-primary p-4">
                  <MapPin className="mb-2 size-4 text-primary-foreground" />
                  <p className="text-sm text-primary-foreground/80">Location</p>
                  <p className="font-medium text-primary-foreground">{mechanic.location}</p>
                </div>
                <div className="rounded-md bg-primary p-4">
                  <Star className="mb-2 size-4 fill-primary-foreground text-primary-foreground" />
                  <p className="text-sm text-primary-foreground/80">Rating</p>
                  <p className="font-medium text-primary-foreground">
                    {mechanic.rating} ({mechanic.reviewCount})
                  </p>
                </div>
                <div className="rounded-md bg-primary p-4">
                  <CalendarPlus className="mb-2 size-4 text-primary-foreground" />
                  <p className="text-sm text-primary-foreground/80">Availability</p>
                  <p className="font-medium text-primary-foreground">Weekdays</p>
                </div>
              </div>

              <Separator />

              <div>
                <h2 className="text-xl font-semibold">About</h2>
                <p className="mt-3 leading-7 text-muted-foreground">{mechanic.bio}</p>
              </div>

              <div>
                <h2 className="text-xl font-semibold">Specialties</h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  {mechanic.specialties.map((specialty) => (
                    <Badge key={specialty} variant="secondary">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="rounded-lg bg-card">
              <CardHeader>
                <CardTitle>Request service</CardTitle>
                <CardDescription>
                  Submit a booking request. Payment is handled via PayFast
                  sandbox after creation.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-3" onSubmit={submitBooking}>
                  <div className="space-y-2">
                    <Label htmlFor="vehicleId">Vehicle</Label>
                    <select
                      className="flex h-9 w-full rounded-md border border-border bg-input-background px-3 py-1 text-sm text-foreground outline-none"
                      id="vehicleId"
                      onChange={(event) =>
                        setBookingForm((current) => ({
                          ...current,
                          vehicleId: event.target.value,
                        }))
                      }
                      value={bookingForm.vehicleId}
                    >
                      <option value="">Choose a saved vehicle</option>
                      {vehicles.map((vehicle) => (
                        <option key={vehicle.id} value={vehicle.id}>
                          {vehicle.make} {vehicle.model}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="preferredSchedule">Preferred schedule</Label>
                    <Input
                      id="preferredSchedule"
                      min={new Date().toISOString().slice(0, 16)}
                      onChange={(event) =>
                        setBookingForm((current) => ({
                          ...current,
                          preferredSchedule: event.target.value,
                        }))
                      }
                      type="datetime-local"
                      value={bookingForm.preferredSchedule}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Job description</Label>
                    <Textarea
                      id="description"
                      onChange={(event) =>
                        setBookingForm((current) => ({
                          ...current,
                          description: event.target.value,
                        }))
                      }
                      placeholder="Describe the issue or service needed."
                      value={bookingForm.description}
                    />
                  </div>
                  <Button disabled={isSubmitting} type="submit">
                    <CalendarPlus className="size-4" />
                    {isSubmitting ? "Sending..." : "Request booking"}
                  </Button>
                </form>

                {paymentUrl && (
                  <div className="mt-4 space-y-2">
                    <Button
                      className="w-full"
                      onClick={() => window.open(paymentUrl, "_blank")}
                      variant="default"
                    >
                      <ExternalLink className="size-4" />
                      Pay via PayFast (Sandbox)
                    </Button>
                    <p className="text-xs text-muted-foreground">
                      After paying, come back and check payment status below.
                    </p>
                  </div>
                )}

                <Button
                  className="mt-3 w-full"
                  onClick={handleContact}
                  variant="outline"
                >
                  <MessageSquare className="size-4" />
                  Contact mechanic
                </Button>

                {whatsappUrl && (
                  <div className="mt-4 rounded-md border border-emerald-200 bg-emerald-50 p-4">
                    <p className="mb-2 text-sm font-medium text-emerald-800">
                      Payment confirmed! Contact the provider:
                    </p>
                    <Button
                      className="w-full"
                      onClick={() => window.open(whatsappUrl, "_blank")}
                      variant="default"
                    >
                      <MessageSquare className="size-4" />
                      Open WhatsApp
                    </Button>
                  </div>
                )}

                {status && <StatusMessage className="mt-3" message={status} />}
              </CardContent>
            </Card>

            <Card className="rounded-lg bg-card">
              <CardHeader>
                <CardTitle>Recent reviews</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {(backendReviews.length ? backendReviews : fallbackReviews).map((review) => (
                  <div className="rounded-md border p-4" key={review.name}>
                    <div className="mb-2 flex gap-1 text-foreground">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star
                          className="size-4 fill-current"
                          key={`${review.name}-${index}`}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground">{review.text}</p>
                    <p className="mt-2 text-sm font-medium">{review.name}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
}

import { Save, Upload, CalendarDays } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";

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
import { StatusMessage } from "@/app/components/ui/status-message";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";
import { Textarea } from "@/app/components/ui/textarea";
import {
  getMechanicProfile,
  updateMechanic,
  uploadDocument,
  getAvailability,
  setAvailability,
} from "@/api/mechanics";
import {
  listProviderBookings,
  updateBookingStatus,
} from "@/api/bookings";

type ProviderForm = {
  businessName: string;
  businessWhatsapp: string;
  specialties: string;
  serviceDescription: string;
  availability: string;
  payfastMerchantId: string;
  payfastMerchantKey: string;
};

type Booking = {
  id: number;
  booking_status: string;
  preferred_schedule: string;
  quoted_amount?: number | string | null;
  description?: string;
};

const statusColors: Record<string, string> = {
  payment_pending: "bg-gray-100 text-gray-800",
  paid: "bg-green-100 text-green-800",
  whatsapp_redirected: "bg-blue-100 text-blue-800",
  in_progress: "bg-blue-100 text-blue-800",
  completed: "bg-emerald-100 text-emerald-800",
  cancelled: "bg-red-100 text-red-800",
  refunded: "bg-orange-100 text-orange-800",
};

const emptyForm: ProviderForm = {
  businessName: "",
  businessWhatsapp: "",
  specialties: "",
  serviceDescription: "",
  availability: "Available",
  payfastMerchantId: "",
  payfastMerchantKey: "",
};

export default function ProviderInfo({ userId }: { userId: number }) {
  const [form, setForm] = useState<ProviderForm>(emptyForm);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [status, setStatus] = useState("Loading provider info...");
  const [bookingsStatus, setBookingsStatus] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Document upload state
  const [docType, setDocType] = useState("id");
  const [docFile, setDocFile] = useState<File | null>(null);
  const [docStatus, setDocStatus] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    let ignore = false;

    async function load() {
      try {
        const profileResp = await getMechanicProfile(userId);
        const profile = profileResp.data;

        if (!ignore) {
          setForm({
            businessName: String(profile.business_name ?? ""),
            businessWhatsapp: String(profile.business_whatsapp_number ?? ""),
            specialties: Array.isArray(profile.specialities)
              ? (profile.specialities as string[]).join(", ")
              : "",
            serviceDescription: String(profile.service_description ?? ""),
            availability: profile.is_available ? "Available" : "Unavailable",
            payfastMerchantId: "",
            payfastMerchantKey: "",
          });
          setLoaded(true);
          setStatus("");
        }
      } catch (error) {
        if (!ignore) {
          setStatus(
            error instanceof Error
              ? error.message
              : "Could not load provider info.",
          );
        }
      }

      // Fetch bookings independently — doesn't block profile load
      try {
        const bookingsResp = await listProviderBookings();
        if (!ignore && bookingsResp) {
          const bData = bookingsResp.data || bookingsResp;
          setBookings(Array.isArray(bData) ? bData : []);
        }
      } catch {
        if (!ignore) setBookingsStatus("Could not load bookings.");
      }
    }

    load();
    return () => { ignore = true; };
  }, [userId]);

  const updateField = (field: keyof ProviderForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("Saving...");

    try {
      const specialties = form.specialties
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      await updateMechanic(userId, {
        business_name: form.businessName || null,
        business_whatsapp_number: form.businessWhatsapp || null,
        service_description: form.serviceDescription || null,
        is_available: form.availability.toLowerCase() !== "unavailable",
        payfast_merchant_id: form.payfastMerchantId || null,
        payfast_merchant_key: form.payfastMerchantKey || null,
        specialities: specialties,
      });
      setStatus("Provider info saved.");
    } catch (error) {
      setStatus(
        error instanceof Error ? error.message : "Could not save.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBookingAction = async (bookingId: number, newStatus: string) => {
    try {
      await updateBookingStatus(bookingId, newStatus);
      setBookings((prev) =>
        prev.map((b) =>
          b.id === bookingId ? { ...b, booking_status: newStatus } : b,
        ),
      );
      setBookingsStatus(`Booking #${bookingId} updated to ${newStatus}.`);
    } catch (error) {
      setBookingsStatus(
        error instanceof Error
          ? error.message
          : `Could not update booking #${bookingId}.`,
      );
    }
  };

  const handleDocUpload = async () => {
    if (!docFile) {
      setDocStatus("Select a document file first.");
      return;
    }

    setIsUploading(true);
    setDocStatus("Uploading...");

    try {
      await uploadDocument(docFile, docType);
      setDocStatus("Document uploaded and queued for processing.");
      setDocFile(null);
    } catch (error) {
      setDocStatus(
        error instanceof Error
          ? error.message
          : "Upload failed. Make sure you're signed in as a service provider.",
      );
    } finally {
      setIsUploading(false);
    }
  };

  const canTransition = (current: string): string[] => {
    switch (current) {
      case "paid":
        return ["in_progress"];
      case "in_progress":
        return ["completed"];
      case "payment_pending":
      case "whatsapp_redirected":
        return ["cancelled"];
      default:
        return [];
    }
  };

  const formatCurrency = (value?: number | string | null) => {
    const amount = Number(value);
    if (!Number.isFinite(amount) || amount <= 0) return "No quote";
    return new Intl.NumberFormat("en-ZA", {
      style: "currency",
      currency: "ZAR",
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Provider Info Form */}
      <Card className="rounded-lg bg-card">
        <CardHeader>
          <CardTitle>Service provider information</CardTitle>
          <CardDescription>
            Your public service profile. Customers see this when browsing
            providers.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="sp-businessName">Business name</Label>
                <Input
                  id="sp-businessName"
                  onChange={(e) =>
                    updateField("businessName", e.target.value)
                  }
                  placeholder="e.g. Brake & oil specialist"
                  value={form.businessName}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sp-whatsapp">WhatsApp number</Label>
                <Input
                  id="sp-whatsapp"
                  onChange={(e) =>
                    updateField("businessWhatsapp", e.target.value)
                  }
                  placeholder="+27831234567"
                  value={form.businessWhatsapp}
                />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="sp-availability">Availability</Label>
                <Input
                  id="sp-availability"
                  onChange={(e) =>
                    updateField("availability", e.target.value)
                  }
                  placeholder="Available / Unavailable"
                  value={form.availability}
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="sp-payfastMerchantId">PayFast Merchant ID</Label>
                <Input
                  id="sp-payfastMerchantId"
                  onChange={(e) =>
                    updateField("payfastMerchantId", e.target.value)
                  }
                  placeholder="Enter to add or replace"
                  value={form.payfastMerchantId}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sp-payfastMerchantKey">PayFast Merchant Key</Label>
                <Input
                  id="sp-payfastMerchantKey"
                  onChange={(e) =>
                    updateField("payfastMerchantKey", e.target.value)
                  }
                  placeholder="Enter to add or replace"
                  type="password"
                  value={form.payfastMerchantKey}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="sp-specialties">Specialties</Label>
              <Input
                id="sp-specialties"
                onChange={(e) =>
                  updateField("specialties", e.target.value)
                }
                placeholder="Diagnostics, Engine repair, Electrical"
                value={form.specialties}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="sp-description">Service description</Label>
              <Textarea
                id="sp-description"
                onChange={(e) =>
                  updateField("serviceDescription", e.target.value)
                }
                placeholder="Describe your experience and service approach"
                value={form.serviceDescription}
              />
            </div>

            {status && <StatusMessage message={status} />}

            <Button disabled={isSubmitting} type="submit">
              <Save className="size-4" />
              {isSubmitting ? "Saving..." : "Save provider info"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Document Upload Card */}
      <Card className="rounded-lg bg-card">
        <CardHeader>
          <CardTitle>Verification documents</CardTitle>
          <CardDescription>
            Upload your ID, certification, and proof of residence for
            verification. Accepted formats: PDF, JPG, PNG (max 5 MB each).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="docType">Document type</Label>
              <select
                className="flex h-9 w-full rounded-md border border-border bg-input-background px-3 py-1 text-sm text-foreground outline-none"
                id="docType"
                onChange={(e) => setDocType(e.target.value)}
                value={docType}
              >
                <option value="id">ID document</option>
                <option value="certification">Certification</option>
                <option value="proof_of_residence">Proof of residence</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="document">Document file</Label>
              <Input
                accept=".pdf,.jpg,.jpeg,.png"
                id="document"
                onChange={(e) => setDocFile(e.target.files?.[0] || null)}
                type="file"
              />
            </div>
          </div>
          {docFile && (
            <p className="mt-2 text-sm text-muted-foreground">
              {docFile.name} ({(docFile.size / 1024 / 1024).toFixed(1)} MB)
            </p>
          )}
          <Button
            className="mt-4"
            disabled={isUploading || !docFile}
            onClick={handleDocUpload}
          >
            <Upload className="size-4" />
            {isUploading ? "Uploading..." : "Upload document"}
          </Button>
          {docStatus && <div className="mt-3"><StatusMessage message={docStatus} /></div>}
        </CardContent>
      </Card>

      {/* Bookings Section */}
      <Card className="rounded-lg bg-card">
        <CardHeader>
          <CardTitle>Bookings</CardTitle>
          <CardDescription>
            Service requests from customers. Update the status as you work
            through each booking.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {bookings.length === 0 ? (
            <p className="text-sm text-muted-foreground">No bookings yet.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>#</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell className="font-medium">
                      {booking.id}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={
                          statusColors[booking.booking_status] ||
                          "bg-gray-100 text-gray-800"
                        }
                        variant="outline"
                      >
                        {booking.booking_status.replace(/_/g, " ")}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {formatCurrency(booking.quoted_amount)}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(
                        booking.preferred_schedule,
                      ).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="max-w-[200px] truncate text-sm text-muted-foreground">
                      {booking.description || "—"}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        {canTransition(booking.booking_status).map(
                          (nextStatus) => (
                            <Button
                              key={nextStatus}
                              onClick={() =>
                                handleBookingAction(booking.id, nextStatus)
                              }
                              size="sm"
                              variant="outline"
                            >
                              {nextStatus.replace(/_/g, " ")}
                            </Button>
                          ),
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
          {bookingsStatus && (
            <div className="mt-3">
              <StatusMessage message={bookingsStatus} />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

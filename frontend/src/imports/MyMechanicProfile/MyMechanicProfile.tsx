import { Eye, Save, Star, Upload, UserPlus, Wrench } from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";

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
import { StatusMessage } from "@/app/components/ui/status-message";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { Textarea } from "@/app/components/ui/textarea";
import { getMechanicProfile, updateMechanic } from "@/api/mechanics";
import client from "@/api/client";

type ProfileForm = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  businessName: string;
  specialties: string;
  serviceDescription: string;
  availability: string;
  photoUrl: string;
};

const emptyProfile: ProfileForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  location: "",
  businessName: "",
  specialties: "",
  serviceDescription: "",
  availability: "",
  photoUrl: "",
};

export default function MyProfile() {
  const [profile, setProfile] = useState(emptyProfile);
  const [isProvider, setIsProvider] = useState(false);
  const [backendLoaded, setBackendLoaded] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState("Loading profile from backend...");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const photoInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const currentUser = () => {
    try {
      return JSON.parse(localStorage.getItem("oss_user") || "{}");
    } catch {
      return {};
    }
  };

  useEffect(() => {
    const user = currentUser();
    if (!user.id) {
      setStatus("Please sign in to view your profile.");
      return;
    }

    let ignore = false;

    async function loadData() {
      let userData: Record<string, unknown> = {};
      let providerData: Record<string, unknown> | null = null;

      // Always fetch user personal info
      try {
        const userResp = await client.get("/users/me");
        userData = userResp.data || userResp;
      } catch (err) {
        if (!ignore) {
          setStatus(
            err instanceof Error
              ? err.message
              : "Could not load your profile.",
          );
        }
        return;
      }

      // Try to fetch provider profile (only for providers)
      try {
        const providerResp = await getMechanicProfile(user.id);
        providerData = providerResp.data;
      } catch {
        // Not a provider — that's fine
      }

      if (!ignore) {
        const fullName = [String(userData.first_name ?? ""), String(userData.last_name ?? "")]
          .filter(Boolean)
          .join(" ");

        setIsProvider(Boolean(providerData));
        setProfile({
          firstName: String(userData.first_name ?? ""),
          lastName: String(userData.last_name ?? ""),
          email: String(userData.email ?? ""),
          phone: String(userData.phone_number ?? ""),
          location: String(providerData?.city || userData.city || userData.town || ""),
          businessName: String(providerData?.business_name || ""),
          specialties: Array.isArray(providerData?.specialities)
            ? (providerData.specialities as string[]).join(", ")
            : "",
          serviceDescription: String(providerData?.service_description || ""),
          availability: providerData?.is_available ? "Available" : "Unavailable",
          photoUrl: String(providerData?.profile_photo_url || userData.profile_photo_url || ""),
        });
        setBackendLoaded(true);
        setStatus(providerData ? "Profile loaded from backend." : "Personal info loaded.");
      }
    }

    loadData();

    return () => {
      ignore = true;
    };
  }, []);

  const updateField = (field: string, value: string) => {
    setProfile((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const validate = () => {
    const nextErrors: Record<string, string> = {};
    const required = ["firstName", "email", "phone"];

    required.forEach((field) => {
      if (!profile[field as keyof ProfileForm].trim()) {
        nextErrors[field] = "This field is required.";
      }
    });

    if (profile.email && !/^\S+@\S+\.\S+$/.test(profile.email)) {
      nextErrors.email = "Enter a valid email address.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!validate()) return;

    const user = currentUser();
    if (!user.id) {
      setStatus("Please sign in before saving.");
      return;
    }

    setIsSubmitting(true);
    setStatus("Saving profile to backend...");

    try {
      // Always save personal info
      await client.put("/users/me", {
        first_name: profile.firstName,
        last_name: profile.lastName,
        email: profile.email,
        phone_number: profile.phone,
        city: profile.location,
        profile_photo_url: profile.photoUrl || null,
      });

      // If provider, also save provider fields
      if (isProvider) {
        const specialties = profile.specialties
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean);

        await updateMechanic(user.id, {
          first_name: profile.firstName,
          last_name: profile.lastName,
          phone_number: profile.phone,
          city: profile.location,
          business_name: profile.businessName,
          service_description: profile.serviceDescription,
          is_available: profile.availability.toLowerCase() !== "unavailable",
          specialities: specialties,
          profile_photo_url: profile.photoUrl || null,
        });
      }

      setStatus("Profile saved to backend.");
    } catch (error) {
      setStatus(
        error instanceof Error
          ? error.message
          : "Could not save profile to backend.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePhotoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("photo", file);

    setUploadingPhoto(true);
    setStatus("Uploading photo...");

    try {
      const resp = await client.post("/users/photo", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const userData = resp.data || resp;
      setProfile((prev) => ({ ...prev, photoUrl: userData.profile_photo_url || "" }));
      setStatus("Photo uploaded.");
    } catch (error) {
      setStatus(
        error instanceof Error ? error.message : "Could not upload photo.",
      );
    } finally {
      setUploadingPhoto(false);
      if (photoInputRef.current) photoInputRef.current.value = "";
    }
  };

  const specialties = profile.specialties
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  return (
    <Layout className="bg-primary" variant="app">
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Badge className="mb-4 bg-primary text-primary-foreground">
              My account
            </Badge>
            <h1 className="text-4xl font-semibold text-primary-foreground">
              My profile
            </h1>
            <p className="mt-3 max-w-2xl text-primary-foreground/80">
              {isProvider
                ? "Edit your personal info and provider service profile."
                : "View and edit your personal account information."}
            </p>
          </div>
          {isProvider && (
            <Button
              onClick={() => navigate(`/mechanic/${currentUser().id}?from=profile`)}
              variant="outline"
            >
              <Eye className="size-4" />
              View public profile
            </Button>
          )}
        </div>

        {isProvider ? (
          /* ── Provider view: tabs ── */
          <Tabs defaultValue="edit">
            <TabsList className="mb-6">
              <TabsTrigger value="edit">Edit profile</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>

            <TabsContent value="edit">
              <Card className="rounded-lg bg-card">
                <CardHeader>
                  <CardTitle>Personal info</CardTitle>
                  <CardDescription>
                    Your name, contact details, and provider service information.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ProfileFormFields
                    errors={errors}
                    handlePhotoUpload={handlePhotoUpload}
                    handleSubmit={handleSubmit}
                    isProvider={isProvider}
                    isSubmitting={isSubmitting}
                    photoInputRef={photoInputRef}
                    profile={profile}
                    status={status}
                    updateField={updateField}
                    uploadingPhoto={uploadingPhoto}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="preview">
              <Card className="rounded-lg bg-card">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <Avatar className="size-16">
                      {profile.photoUrl ? (
                        <img
                          alt={profile.firstName || "Profile"}
                          className="size-full rounded-full object-cover"
                          src={profile.photoUrl}
                        />
                      ) : (
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {profile.firstName?.[0]?.toUpperCase() || "?"}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <div>
                      <CardTitle className="text-2xl">
                        {profile.businessName || "Your service name"}
                      </CardTitle>
                      <CardDescription>
                        {[profile.firstName, profile.lastName]
                          .filter(Boolean)
                          .join(" ") || "Your name"}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div className="flex flex-wrap gap-2">
                    {specialties.length > 0 &&
                      specialties.map((specialty) => (
                        <Badge key={specialty} variant="secondary">
                          {specialty}
                        </Badge>
                      ))}
                  </div>
                  <p className="leading-7 text-muted-foreground">
                    {profile.serviceDescription || "No description yet."}
                  </p>
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="rounded-md bg-primary p-4">
                      <p className="text-sm text-primary-foreground/70">
                        Location
                      </p>
                      <p className="font-medium">
                        {profile.location || "Not set"}
                      </p>
                    </div>
                    <div className="rounded-md bg-primary p-4">
                      <p className="text-sm text-primary-foreground/70">
                        Availability
                      </p>
                      <p className="font-medium">
                        {profile.availability || "Not set"}
                      </p>
                    </div>
                    <div className="rounded-md bg-primary p-4">
                      <Star className="mb-2 size-4 fill-primary-foreground text-primary-foreground" />
                      <p className="font-medium">Provider</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        ) : (
          /* ── Non-provider view: simple form ── */
          <Card className="rounded-lg bg-card">
            <CardHeader>
              <CardTitle>Personal info</CardTitle>
              <CardDescription>
                Your name, email, and contact details.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ProfileFormFields
                errors={errors}
                handlePhotoUpload={handlePhotoUpload}
                handleSubmit={handleSubmit}
                isProvider={isProvider}
                isSubmitting={isSubmitting}
                photoInputRef={photoInputRef}
                profile={profile}
                status={status}
                updateField={updateField}
                uploadingPhoto={uploadingPhoto}
              />
            </CardContent>
          </Card>
        )}

        {/* Become a provider CTA (non-providers only) */}
        {!isProvider && (
          <Card className="mt-6 rounded-lg bg-card">
            <CardContent className="flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-md bg-primary text-primary-foreground">
                  <Wrench className="size-5" />
                </span>
                <div>
                  <p className="font-medium">Offer your services</p>
                  <p className="text-sm text-muted-foreground">
                    Become a service provider and start receiving bookings from
                    customers.
                  </p>
                </div>
              </div>
              <Button onClick={() => navigate("/mechanic/setup")}>
                <UserPlus className="size-4" />
                Become a provider
              </Button>
            </CardContent>
          </Card>
        )}
      </section>
    </Layout>
  );
}

/* ── Shared form fields component ── */
function ProfileFormFields({
  errors,
  handlePhotoUpload,
  handleSubmit,
  isProvider,
  isSubmitting,
  photoInputRef,
  profile,
  status,
  updateField,
  uploadingPhoto,
}: {
  errors: Record<string, string>;
  handlePhotoUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: FormEvent) => void;
  isProvider: boolean;
  isSubmitting: boolean;
  photoInputRef: React.RefObject<HTMLInputElement | null>;
  profile: ProfileForm;
  status: string;
  updateField: (field: string, value: string) => void;
  uploadingPhoto: boolean;
}) {
  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="firstName">First name</Label>
          <Input
            id="firstName"
            onChange={(e) => updateField("firstName", e.target.value)}
            placeholder="Your first name"
            value={profile.firstName}
          />
          {errors.firstName && (
            <p className="text-sm text-red-600">{errors.firstName}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last name</Label>
          <Input
            id="lastName"
            onChange={(e) => updateField("lastName", e.target.value)}
            placeholder="Your last name"
            value={profile.lastName}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            onChange={(e) => updateField("email", e.target.value)}
            type="email"
            value={profile.email}
          />
          {errors.email && (
            <p className="text-sm text-red-600">{errors.email}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            onChange={(e) => updateField("phone", e.target.value)}
            type="tel"
            placeholder="+27 82 123 4567"
            value={profile.phone}
          />
          {errors.phone && (
            <p className="text-sm text-red-600">{errors.phone}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            onChange={(e) => updateField("location", e.target.value)}
            placeholder="City or town"
            value={profile.location}
          />
        </div>
      </div>

      {/* Profile photo */}
      <div className="space-y-2">
        <Label htmlFor="photoUrl">Profile photo</Label>
        <div className="flex items-center gap-3">
          <Input
            id="photoUrl"
            onChange={(e) => updateField("photoUrl", e.target.value)}
            placeholder="https://example.com/photo.jpg"
            value={profile.photoUrl}
          />
          <div>
            <input
              accept=".jpg,.jpeg,.png,.webp"
              className="hidden"
              onChange={handlePhotoUpload}
              ref={photoInputRef}
              type="file"
            />
            <Button
              disabled={uploadingPhoto}
              onClick={() => photoInputRef.current?.click()}
              type="button"
              variant="outline"
            >
              <Upload className="size-4" />
              {uploadingPhoto ? "Uploading..." : "Upload"}
            </Button>
          </div>
        </div>
      </div>

      {/* Provider-only fields */}
      {isProvider && (
        <>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="businessName">Service name</Label>
              <Input
                id="businessName"
                onChange={(e) => updateField("businessName", e.target.value)}
                placeholder="e.g. Brake & oil specialist"
                value={profile.businessName}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="availability">Availability</Label>
              <Input
                id="availability"
                onChange={(e) => updateField("availability", e.target.value)}
                placeholder="Available / Unavailable"
                value={profile.availability}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="specialties">Specialties</Label>
            <Input
              id="specialties"
              onChange={(e) => updateField("specialties", e.target.value)}
              placeholder="Diagnostics, Engine repair, Electrical"
              value={profile.specialties}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="serviceDescription">Service description</Label>
            <Textarea
              id="serviceDescription"
              onChange={(e) =>
                updateField("serviceDescription", e.target.value)
              }
              placeholder="Describe your experience and service approach"
              value={profile.serviceDescription}
            />
          </div>
        </>
      )}

      {status && <StatusMessage message={status} />}

      <Button disabled={isSubmitting} type="submit">
        <Save className="size-4" />
        {isSubmitting ? "Saving..." : "Save profile"}
      </Button>
    </form>
  );
}

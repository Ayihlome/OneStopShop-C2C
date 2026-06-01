import { Save, Upload } from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";

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
import client from "@/api/client";

type UserForm = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  photoUrl: string;
};

const emptyForm: UserForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  location: "",
  photoUrl: "",
};

export default function PersonalInfo() {
  const [form, setForm] = useState<UserForm>(emptyForm);
  const [status, setStatus] = useState("Loading personal info...");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const photoInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let ignore = false;

    async function load() {
      try {
        const resp = await client.get("/users/me");
        const user = resp.data || resp;

        if (!ignore) {
          setForm({
            firstName: String(user.first_name ?? ""),
            lastName: String(user.last_name ?? ""),
            email: String(user.email ?? ""),
            phone: String(user.phone_number ?? ""),
            location: String(user.city || user.town || ""),
            photoUrl: String(user.profile_photo_url ?? ""),
          });
          setLoaded(true);
          setStatus("");
        }
      } catch (error) {
        if (!ignore) {
          setStatus(
            error instanceof Error
              ? error.message
              : "Could not load personal info.",
          );
        }
      }
    }

    load();
    return () => { ignore = true; };
  }, []);

  const updateField = (field: keyof UserForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = () => {
    const next: Record<string, string> = {};
    if (!form.firstName.trim()) next.firstName = "First name is required.";
    if (!form.email.trim()) next.email = "Email is required.";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Enter a valid email.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setStatus("Saving...");

    try {
      await client.put("/users/me", {
        first_name: form.firstName,
        last_name: form.lastName,
        email: form.email,
        phone_number: form.phone || null,
        city: form.location || null,
        profile_photo_url: form.photoUrl || null,
      });
      setStatus("Personal info saved.");
    } catch (error) {
      setStatus(
        error instanceof Error ? error.message : "Could not save.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fd = new FormData();
    fd.append("photo", file);

    setUploadingPhoto(true);
    setStatus("Uploading photo...");

    try {
      const resp = await client.post("/users/photo", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const data = resp.data || resp;
      setForm((prev) => ({ ...prev, photoUrl: String(data.profile_photo_url ?? "") }));
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

  return (
    <Card className="rounded-lg bg-card">
      <CardHeader>
        <CardTitle>Personal information</CardTitle>
        <CardDescription>
          Your name, email, and contact details. Changes are saved to your
          account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Avatar preview */}
          <div className="flex items-center gap-4">
            <Avatar className="size-16">
              {form.photoUrl ? (
                <img
                  alt="Profile"
                  className="size-full rounded-full object-cover"
                  src={form.photoUrl}
                />
              ) : (
                <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                  {form.firstName?.[0]?.toUpperCase() || "?"}
                </AvatarFallback>
              )}
            </Avatar>
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
                size="sm"
              >
                <Upload className="size-4" />
                {uploadingPhoto ? "Uploading..." : "Upload photo"}
              </Button>
              <p className="mt-1 text-xs text-muted-foreground">
                JPG, PNG, or WebP. Max 2 MB.
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="pi-firstName">First name</Label>
              <Input
                id="pi-firstName"
                onChange={(e) => updateField("firstName", e.target.value)}
                value={form.firstName}
              />
              {errors.firstName && (
                <p className="text-sm text-red-600">{errors.firstName}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="pi-lastName">Last name</Label>
              <Input
                id="pi-lastName"
                onChange={(e) => updateField("lastName", e.target.value)}
                value={form.lastName}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pi-email">Email</Label>
              <Input
                id="pi-email"
                onChange={(e) => updateField("email", e.target.value)}
                type="email"
                value={form.email}
              />
              {errors.email && (
                <p className="text-sm text-red-600">{errors.email}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="pi-phone">Phone</Label>
              <Input
                id="pi-phone"
                onChange={(e) => updateField("phone", e.target.value)}
                placeholder="+27 82 123 4567"
                type="tel"
                value={form.phone}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pi-location">Location</Label>
              <Input
                id="pi-location"
                onChange={(e) => updateField("location", e.target.value)}
                placeholder="City or town"
                value={form.location}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pi-photoUrl">Photo URL</Label>
              <Input
                id="pi-photoUrl"
                onChange={(e) => updateField("photoUrl", e.target.value)}
                placeholder="https://example.com/photo.jpg"
                value={form.photoUrl}
              />
            </div>
          </div>

          {status && <StatusMessage message={status} />}

          <Button disabled={isSubmitting} type="submit">
            <Save className="size-4" />
            {isSubmitting ? "Saving..." : "Save personal info"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

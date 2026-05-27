import { Eye, Save, Star, Wrench } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
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

type ProfileForm = {
  businessName: string;
  ownerName: string;
  email: string;
  phone: string;
  location: string;
  specialties: string;
  serviceDescription: string;
  availability: string;
};

const initialProfile: ProfileForm = {
  businessName: "Robert's Auto Clinic",
  ownerName: "Robert Daniels",
  email: "service@robertsauto.example",
  phone: "+27 82 123 4567",
  location: "Johannesburg",
  specialties: "Diagnostics, Engine repair, Electrical",
  serviceDescription:
    "Independent workshop focused on reliable diagnostics, transparent estimates, and practical repairs for everyday drivers.",
  availability: "Weekdays, 08:00-17:00",
};

export default function MyMechanicProfile() {
  const [profile, setProfile] = useState(initialProfile);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("Loading profile from backend...");
  const [isSubmitting, setIsSubmitting] = useState(false);
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
      setStatus("Please sign in as a provider to load your backend profile.");
      return;
    }

    let ignore = false;

    async function loadProfile() {
      try {
        const response = await getMechanicProfile(user.id);
        const provider = response.data;
        const fullName = [provider.first_name, provider.last_name]
          .filter(Boolean)
          .join(" ");

        if (!ignore) {
          setProfile({
            businessName: provider.business_name || provider.first_name || "",
            ownerName: fullName || initialProfile.ownerName,
            email: provider.email || "",
            phone: provider.phone_number || "",
            location: provider.city || provider.town || "",
            specialties: (provider.specialities || []).join(", "),
            serviceDescription: provider.service_description || "",
            availability: provider.is_available ? "Available" : "Unavailable",
          });
          setStatus("Profile loaded from backend.");
        }
      } catch (error) {
        if (!ignore) {
          setStatus(
            error instanceof Error
              ? error.message
              : "Could not load backend profile.",
          );
        }
      }
    }

    loadProfile();

    return () => {
      ignore = true;
    };
  }, []);

  const updateField = (field, value) => {
    setProfile((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const validate = () => {
    const nextErrors = {};
    const required = [
      "businessName",
      "ownerName",
      "email",
      "phone",
      "location",
      "specialties",
      "serviceDescription",
      "availability",
    ];

    required.forEach((field) => {
      if (!profile[field].trim()) {
        nextErrors[field] = "This field is required.";
      }
    });

    if (!/^\S+@\S+\.\S+$/.test(profile.email)) {
      nextErrors.email = "Enter a valid email address.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    const user = currentUser();
    if (!user.id) {
      setStatus("Please sign in as a provider before saving.");
      return;
    }

    setIsSubmitting(true);
    setStatus("Saving profile to backend...");

    try {
      const ownerParts = profile.ownerName.trim().split(/\s+/);
      const specialties = profile.specialties
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);

      await updateMechanic(user.id, {
        first_name: ownerParts[0] || profile.ownerName,
        last_name: ownerParts.slice(1).join(" ") || ownerParts[0] || "",
        phone_number: profile.phone,
        city: profile.location,
        business_name: profile.businessName,
        service_description: profile.serviceDescription,
        is_available: profile.availability.toLowerCase() !== "unavailable",
        specialities: specialties,
      });

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
              Provider workspace
            </Badge>
            <h1 className="text-4xl font-semibold text-primary-foreground">
              My provider profile
            </h1>
            <p className="mt-3 max-w-2xl text-primary-foreground/80">
              Edit the public details customers will see when they review your
              service profile.
            </p>
          </div>
          <Button
            onClick={() => navigate(`/mechanic/${currentUser().id}`)}
            variant="outline"
          >
            <Eye className="size-4" />
            View public profile
          </Button>
        </div>

        <Tabs defaultValue="edit">
          <TabsList className="mb-6">
            <TabsTrigger value="edit">Edit profile</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>

          <TabsContent value="edit">
            <Card className="rounded-lg bg-card">
              <CardHeader>
                <CardTitle>Profile details</CardTitle>
                <CardDescription>
                  Update your provider profile — WhatsApp and PayFast details
                  are set during provider creation and cannot be edited here.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="businessName">Business name</Label>
                      <Input
                        id="businessName"
                        onChange={(event) =>
                          updateField("businessName", event.target.value)
                        }
                        value={profile.businessName}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="ownerName">Owner name</Label>
                      <Input
                        id="ownerName"
                        onChange={(event) =>
                          updateField("ownerName", event.target.value)
                        }
                        value={profile.ownerName}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        onChange={(event) =>
                          updateField("email", event.target.value)
                        }
                        type="email"
                        value={profile.email}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        onChange={(event) =>
                          updateField("phone", event.target.value)
                        }
                        type="tel"
                        value={profile.phone}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        onChange={(event) =>
                          updateField("location", event.target.value)
                        }
                        value={profile.location}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="availability">Availability</Label>
                      <Input
                        id="availability"
                        onChange={(event) =>
                          updateField("availability", event.target.value)
                        }
                        value={profile.availability}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="specialties">Specialties</Label>
                    <Input
                      id="specialties"
                      onChange={(event) =>
                        updateField("specialties", event.target.value)
                      }
                      value={profile.specialties}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="serviceDescription">Service description</Label>
                    <Textarea
                      id="serviceDescription"
                      onChange={(event) =>
                        updateField("serviceDescription", event.target.value)
                      }
                      value={profile.serviceDescription}
                    />
                  </div>

                  {status && <StatusMessage message={status} />}

                  <Button disabled={isSubmitting} type="submit">
                    <Save className="size-4" />
                    {isSubmitting ? "Saving..." : "Save profile"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preview">
            <Card className="rounded-lg bg-card">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <Avatar className="size-16">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {profile.businessName
                        .split(" ")
                        .map((part) => part[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-2xl">
                      {profile.businessName}
                    </CardTitle>
                    <CardDescription>{profile.ownerName}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-primary text-primary-foreground">
                    Verified
                  </Badge>
                  {specialties.map((specialty) => (
                    <Badge key={specialty} variant="secondary">
                      {specialty}
                    </Badge>
                  ))}
                </div>
                <p className="leading-7 text-muted-foreground">
                  {profile.serviceDescription}
                </p>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="rounded-md bg-primary p-4">
                    <p className="text-sm text-primary-foreground/70">
                      Location
                    </p>
                    <p className="font-medium">{profile.location}</p>
                  </div>
                  <div className="rounded-md bg-primary p-4">
                    <p className="text-sm text-primary-foreground/70">
                      Availability
                    </p>
                    <p className="font-medium">{profile.availability}</p>
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

        <Card className="mt-6 rounded-lg bg-card">
          <CardContent className="flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <Wrench className="size-5" />
              </span>
              <div>
                <p className="font-medium">Profile completion</p>
                <p className="text-sm text-muted-foreground">
                  Complete profiles receive better customer context.
                </p>
              </div>
            </div>
            <Badge variant="secondary">Provider profile</Badge>
          </CardContent>
        </Card>
      </section>
    </Layout>
  );
}

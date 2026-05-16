import { Eye, Save, Star, Wrench } from "lucide-react";
import { FormEvent, useState } from "react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { Textarea } from "@/app/components/ui/textarea";

type ProfileForm = {
  businessName: string;
  ownerName: string;
  email: string;
  phone: string;
  location: string;
  specialties: string;
  bio: string;
  availability: string;
};

const initialProfile: ProfileForm = {
  businessName: "Robert's Auto Clinic",
  ownerName: "Robert Daniels",
  email: "service@robertsauto.example",
  phone: "+27 82 123 4567",
  location: "Johannesburg",
  specialties: "Diagnostics, Engine repair, Electrical",
  bio: "Independent workshop focused on reliable diagnostics, transparent estimates, and practical repairs for everyday drivers.",
  availability: "Weekdays, 08:00-17:00",
};

export default function MyMechanicProfile() {
  const [profile, setProfile] = useState(initialProfile);
  const [errors, setErrors] = useState<Partial<ProfileForm>>({});
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  const updateField = (field: keyof ProfileForm, value: string) => {
    setProfile((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const validate = () => {
    const nextErrors: Partial<ProfileForm> = {};
    const required: Array<keyof ProfileForm> = [
      "businessName",
      "ownerName",
      "email",
      "phone",
      "location",
      "specialties",
      "bio",
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

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (validate()) {
      setStatus("Profile saved locally.");
    }
  };

  const renderInput = (
    field: keyof ProfileForm,
    label: string,
    type = "text",
  ) => (
    <div className="space-y-2">
      <Label htmlFor={field}>{label}</Label>
      <Input
        aria-invalid={Boolean(errors[field])}
        id={field}
        onChange={(event) => updateField(field, event.target.value)}
        type={type}
        value={profile[field]}
      />
      {errors[field] && <p className="text-sm text-red-600">{errors[field]}</p>}
    </div>
  );

  const specialties = profile.specialties
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  return (
    <Layout className="bg-[#5B360B]" variant="app">
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Badge className="mb-4 bg-[#010813] text-white">
              Mechanic workspace
            </Badge>
            <h1 className="text-4xl font-semibold text-[#010813]">
              My mechanic profile
            </h1>
            <p className="mt-3 max-w-2xl text-[#362007]">
              Edit the public details drivers will see when they review your
              service profile.
            </p>
          </div>
          <Button
            onClick={() => navigate("/mechanic/robert-auto")}
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
            <Card className="rounded-lg bg-[#FAD775]">
              <CardHeader>
                <CardTitle>Profile details</CardTitle>
                <CardDescription>
                  Local state only for now; this form is ready for the mechanic
                  profile API.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {renderInput("businessName", "Business name")}
                    {renderInput("ownerName", "Owner name")}
                    {renderInput("email", "Email", "email")}
                    {renderInput("phone", "Phone", "tel")}
                    {renderInput("location", "Location")}
                    {renderInput("availability", "Availability")}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="specialties">Specialties</Label>
                    <Input
                      aria-invalid={Boolean(errors.specialties)}
                      id="specialties"
                      onChange={(event) =>
                        updateField("specialties", event.target.value)
                      }
                      value={profile.specialties}
                    />
                    {errors.specialties && (
                      <p className="text-sm text-red-600">
                        {errors.specialties}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      aria-invalid={Boolean(errors.bio)}
                      id="bio"
                      onChange={(event) => updateField("bio", event.target.value)}
                      value={profile.bio}
                    />
                    {errors.bio && (
                      <p className="text-sm text-red-600">{errors.bio}</p>
                    )}
                  </div>

                  {status && <p className="text-sm text-[#010813]">{status}</p>}

                  <Button
                    className="bg-[#010813] text-white hover:bg-[#362007]"
                    type="submit"
                  >
                    <Save className="size-4" />
                    Save profile
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preview">
            <Card className="rounded-lg bg-[#FAD775]">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <Avatar className="size-16">
                    <AvatarFallback className="bg-[#010813] text-white">
                      RD
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
                  <Badge className="bg-[#010813] text-white">Verified</Badge>
                  {specialties.map((specialty) => (
                    <Badge key={specialty} variant="secondary">
                      {specialty}
                    </Badge>
                  ))}
                </div>
                <p className="leading-7 text-[#362007]">{profile.bio}</p>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="rounded-md bg-[#5B360B] p-4">
                    <p className="text-sm text-[#362007]">Location</p>
                    <p className="font-medium">{profile.location}</p>
                  </div>
                  <div className="rounded-md bg-[#5B360B] p-4">
                    <p className="text-sm text-[#362007]">Availability</p>
                    <p className="font-medium">{profile.availability}</p>
                  </div>
                  <div className="rounded-md bg-[#5B360B] p-4">
                    <Star className="mb-2 size-4 fill-[#010813] text-[#010813]" />
                    <p className="font-medium">4.9 rating</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card className="mt-6 rounded-lg bg-[#FAD775]">
          <CardContent className="flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-md bg-[#5B360B] text-[#010813]">
                <Wrench className="size-5" />
              </span>
              <div>
                <p className="font-medium">Profile completion</p>
                <p className="text-sm text-[#362007]">
                  Complete profiles receive better driver context.
                </p>
              </div>
            </div>
            <Badge variant="secondary">Ready for API sync</Badge>
          </CardContent>
        </Card>
      </section>
    </Layout>
  );
}

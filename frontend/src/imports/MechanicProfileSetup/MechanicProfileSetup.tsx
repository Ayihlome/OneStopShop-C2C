import { ArrowLeft, ArrowRight, BriefcaseBusiness, Wrench } from "lucide-react";
import { FormEvent, useState } from "react";
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
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Textarea } from "@/app/components/ui/textarea";

type MechanicForm = {
  businessName: string;
  ownerName: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  availability: string;
  specialties: string[];
};

const specialtyOptions = [
  "Diagnostics",
  "Engine repair",
  "Electrical",
  "Brakes",
  "Battery",
  "Suspension",
  "Servicing",
  "Mobile service",
];

const initialForm: MechanicForm = {
  businessName: "",
  ownerName: "",
  email: "",
  phone: "",
  location: "",
  bio: "",
  availability: "",
  specialties: [],
};

export default function MechanicProfileSetup() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof MechanicForm, string>>>(
    {},
  );
  const navigate = useNavigate();

  const updateField = (field: keyof MechanicForm, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const toggleSpecialty = (specialty: string) => {
    setForm((current) => ({
      ...current,
      specialties: current.specialties.includes(specialty)
        ? current.specialties.filter((item) => item !== specialty)
        : [...current.specialties, specialty],
    }));
    setErrors((current) => ({ ...current, specialties: undefined }));
  };

  const validate = () => {
    const nextErrors: Partial<Record<keyof MechanicForm, string>> = {};
    const required: Array<keyof MechanicForm> = [
      "businessName",
      "ownerName",
      "email",
      "phone",
      "location",
      "bio",
      "availability",
    ];

    required.forEach((field) => {
      const value = form[field];
      if (typeof value === "string" && !value.trim()) {
        nextErrors[field] = "This field is required.";
      }
    });

    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (form.specialties.length === 0) {
      nextErrors.specialties = "Choose at least one specialty.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (validate()) {
      navigate("/mechanic/verify");
    }
  };

  const renderInput = (
    field: keyof MechanicForm,
    label: string,
    placeholder: string,
    type = "text",
  ) => (
    <div className="space-y-2">
      <Label htmlFor={field}>{label}</Label>
      <Input
        aria-invalid={Boolean(errors[field])}
        id={field}
        onChange={(event) => updateField(field, event.target.value)}
        placeholder={placeholder}
        type={type}
        value={String(form[field])}
      />
      {errors[field] && <p className="text-sm text-red-600">{errors[field]}</p>}
    </div>
  );

  return (
    <Layout className="bg-[#5B360B]" variant="onboarding">
      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8 lg:py-14">
        <aside className="space-y-5">
          <Button
            className="px-0 text-[#010813]"
            onClick={() => navigate("/signup")}
            variant="link"
          >
            <ArrowLeft className="size-4" />
            Back to signup
          </Button>
          <div className="rounded-lg bg-[#010813] p-6 text-white">
            <Wrench className="mb-6 size-10" />
            <h1 className="text-3xl font-semibold">
              Build your mechanic profile
            </h1>
            <p className="mt-3 text-sm text-[#5B360B]">
              Set up the business details drivers will use to evaluate your
              services before verification.
            </p>
          </div>
          <Card className="rounded-lg bg-[#FAD775]">
            <CardHeader>
              <CardTitle className="text-lg">Setup checklist</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-[#362007]">
              <p>Business details</p>
              <p>Specialties and bio</p>
              <p>Verification review</p>
            </CardContent>
          </Card>
        </aside>

        <Card className="rounded-lg shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <BriefcaseBusiness className="size-5 text-[#010813]" />
              Mechanic details
            </CardTitle>
            <CardDescription>
              Stored locally for now; shaped for the future mechanic profile
              endpoint.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-8" onSubmit={handleSubmit}>
              <div className="grid gap-4 sm:grid-cols-2">
                {renderInput("businessName", "Business name", "Robert's Auto Clinic")}
                {renderInput("ownerName", "Owner name", "Robert Daniels")}
                {renderInput("email", "Email", "service@example.com", "email")}
                {renderInput("phone", "Phone", "+27 82 123 4567", "tel")}
                {renderInput("location", "Location", "Johannesburg")}
                {renderInput("availability", "Availability", "Weekdays, 08:00-17:00")}
              </div>

              <div className="space-y-3">
                <Label>Specialties</Label>
                <div className="flex flex-wrap gap-2">
                  {specialtyOptions.map((specialty) => {
                    const active = form.specialties.includes(specialty);

                    return (
                      <button
                        className={`rounded-md border px-3 py-2 text-sm transition ${
                          active
                            ? "border-[#010813] bg-[#010813] text-white"
                            : "bg-[#FAD775] text-[#010813] hover:border-[#362007]"
                        }`}
                        key={specialty}
                        onClick={() => toggleSpecialty(specialty)}
                        type="button"
                      >
                        {specialty}
                      </button>
                    );
                  })}
                </div>
                {errors.specialties && (
                  <p className="text-sm text-red-600">{errors.specialties}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Professional bio</Label>
                <Textarea
                  aria-invalid={Boolean(errors.bio)}
                  id="bio"
                  onChange={(event) => updateField("bio", event.target.value)}
                  placeholder="Describe your experience, service approach, and workshop strengths."
                  value={form.bio}
                />
                {errors.bio && (
                  <p className="text-sm text-red-600">{errors.bio}</p>
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                {form.specialties.map((specialty) => (
                  <Badge className="bg-[#010813] text-white" key={specialty}>
                    {specialty}
                  </Badge>
                ))}
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                <Button
                  onClick={() => navigate("/signup")}
                  type="button"
                  variant="outline"
                >
                  Back
                </Button>
                <Button
                  className="bg-[#010813] text-white hover:bg-[#362007]"
                  type="submit"
                >
                  Continue to verification
                  <ArrowRight className="size-4" />
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </section>
    </Layout>
  );
}

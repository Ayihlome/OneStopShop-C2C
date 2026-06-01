import { ArrowLeft, ArrowRight, UserRound, Wrench } from "lucide-react";
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
import { StatusMessage } from "@/app/components/ui/status-message";
import { Textarea } from "@/app/components/ui/textarea";
import { becomeProvider } from "@/api/mechanics";
import client from "@/api/client";

type ProviderForm = {
  businessName: string;
  whatsappNumber: string;
  serviceDescription: string;
  yearsOfExperience: string;
  payfastMerchantId: string;
  payfastMerchantKey: string;
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

const initialForm: ProviderForm = {
  businessName: "",
  whatsappNumber: "",
  serviceDescription: "",
  yearsOfExperience: "",
  payfastMerchantId: "",
  payfastMerchantKey: "",
  specialties: [],
};

export default function MechanicProfileSetup() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const toggleSpecialty = (specialty) => {
    setForm((current) => ({
      ...current,
      specialties: current.specialties.includes(specialty)
        ? current.specialties.filter((item) => item !== specialty)
        : [...current.specialties, specialty],
    }));
    setErrors((current) => ({ ...current, specialties: undefined }));
  };

  const validate = () => {
    const nextErrors = {};

    if (!form.businessName.trim()) {
      nextErrors.businessName = "Service name is required.";
    }

    if (!form.whatsappNumber.trim()) {
      nextErrors.whatsappNumber = "WhatsApp number is required.";
    }

    if (form.specialties.length === 0) {
      nextErrors.specialties = "Choose at least one specialty.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    setStatus("Creating provider profile...");

    try {
      await becomeProvider({
        business_name: form.businessName,
        business_whatsapp_number: form.whatsappNumber,
        service_description: form.serviceDescription || null,
        years_of_experience: form.yearsOfExperience
          ? Number(form.yearsOfExperience)
          : null,
        payfast_merchant_id: form.payfastMerchantId || null,
        payfast_merchant_key: form.payfastMerchantKey || null,
        specialities: form.specialties,
      });

      // Refresh user data in localStorage to reflect provider role
      try {
        const meResp = await client.get('/users/me');
        const me = meResp.data || meResp;
        if (me) {
          const existingUser = JSON.parse(localStorage.getItem('oss_user') || '{}');
          localStorage.setItem('oss_user', JSON.stringify({ ...existingUser, ...me }));
        }
      } catch {
        // Non-critical — user data refreshes on next login
      }

      setStatus("Provider profile created.");
      navigate("/mechanic/verify");
    } catch (error) {
      setStatus(
        error instanceof Error
          ? error.message
          : "Could not create provider profile. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderInput = (field, label, placeholder, type = "text") => (
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
    <Layout className="bg-primary" variant="onboarding">
      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8 lg:py-14">
        <aside className="space-y-5">
          <Button
            className="px-0 text-primary-foreground"
            onClick={() => navigate("/signup")}
            variant="link"
          >
            <ArrowLeft className="size-4" />
            Back to signup
          </Button>
          <div className="rounded-lg bg-primary p-6 text-primary-foreground">
            <Wrench className="mb-6 size-10" />
            <h1 className="text-3xl font-semibold">
              Become a service provider
            </h1>
            <p className="mt-3 text-sm text-primary-foreground/70">
              Upgrade your account to offer services. Set up your profile
              details, WhatsApp number, and PayFast payment credentials.
            </p>
          </div>
          <Card className="rounded-lg bg-card">
            <CardHeader>
              <CardTitle className="text-lg">Setup checklist</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>Profile details</p>
              <p>WhatsApp number (required)</p>
              <p>Specialties and description</p>
              <p>PayFast merchant credentials</p>
              <p>Verification &amp; document upload</p>
            </CardContent>
          </Card>
        </aside>

        <Card className="rounded-lg shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <UserRound className="size-5 text-foreground" />
              Service details
            </CardTitle>
            <CardDescription>
              After creating your provider profile, you can manage it from your
              profile page.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-8" onSubmit={handleSubmit}>
              <div className="grid gap-4 sm:grid-cols-2">
                {renderInput("businessName", "Service name", "Brake & oil specialist")}
                {renderInput("whatsappNumber", "WhatsApp number", "+27 82 123 4567", "tel")}
                {renderInput("yearsOfExperience", "Years of experience", "10", "number")}
                {renderInput("payfastMerchantId", "PayFast Merchant ID (optional)", "")}
                {renderInput("payfastMerchantKey", "PayFast Merchant Key (optional)", "")}
              </div>

              {/* PayFast info notice */}
              <div className="rounded-md border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
                <p className="font-medium">PayFast account required for payments</p>
                <p className="mt-1">
                  To receive payments from customers, you need a{" "}
                  <a
                    className="underline underline-offset-2 hover:text-amber-900"
                    href="https://www.payfast.co.za/"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    PayFast
                  </a>{" "}
                  merchant account. Sign up at payfast.co.za, then enter your
                  Merchant ID and Key above. You can add these later from your
                  profile page.
                </p>
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
                            ? "border-primary bg-primary text-primary-foreground"
                            : "bg-card text-foreground hover:border-border"
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
                <Label htmlFor="serviceDescription">Service description</Label>
                <Textarea
                  id="serviceDescription"
                  onChange={(event) =>
                    updateField("serviceDescription", event.target.value)
                  }
                  placeholder="Describe your experience, service approach, and workshop strengths."
                  value={form.serviceDescription}
                />
              </div>

              <div className="flex flex-wrap gap-2">
                {form.specialties.map((specialty) => (
                  <Badge className="bg-primary text-primary-foreground" key={specialty}>
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
                <Button disabled={isSubmitting} type="submit">
                  {isSubmitting ? "Creating..." : "Create provider profile"}
                  <ArrowRight className="size-4" />
                </Button>
              </div>
              {status && <StatusMessage message={status} />}
            </form>
          </CardContent>
        </Card>
      </section>
    </Layout>
  );
}

import { ArrowLeft, ArrowRight, Car, UserRound } from "lucide-react";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router";

import Layout from "@/app/components/Layout";
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

type DriverForm = {
  firstName: string;
  lastName: string;
  phone: string;
  location: string;
  vehicleMake: string;
  vehicleModel: string;
  vehicleYear: string;
  notes: string;
};

const initialForm: DriverForm = {
  firstName: "",
  lastName: "",
  phone: "",
  location: "",
  vehicleMake: "",
  vehicleModel: "",
  vehicleYear: "",
  notes: "",
};

export default function DriverProfileSetup() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<Partial<DriverForm>>({});
  const navigate = useNavigate();

  const updateField = (field: keyof DriverForm, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const validate = () => {
    const nextErrors: Partial<DriverForm> = {};
    const required: Array<keyof DriverForm> = [
      "firstName",
      "lastName",
      "phone",
      "location",
      "vehicleMake",
      "vehicleModel",
      "vehicleYear",
    ];

    required.forEach((field) => {
      if (!form[field].trim()) {
        nextErrors[field] = "This field is required.";
      }
    });

    const year = Number(form.vehicleYear);
    const maxYear = new Date().getFullYear() + 1;
    if (!/^\d{4}$/.test(form.vehicleYear) || year < 1980 || year > maxYear) {
      nextErrors.vehicleYear = `Enter a year between 1980 and ${maxYear}.`;
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (validate()) {
      navigate("/driver/verify");
    }
  };

  const renderInput = (
    field: keyof DriverForm,
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
        value={form[field]}
      />
      {errors[field] && <p className="text-sm text-red-600">{errors[field]}</p>}
    </div>
  );

  return (
    <Layout className="bg-[#f8f9fa]" variant="onboarding">
      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8 lg:py-14">
        <aside className="space-y-5">
          <Button
            className="px-0 text-[#00346f]"
            onClick={() => navigate("/signup")}
            variant="link"
          >
            <ArrowLeft className="size-4" />
            Back to signup
          </Button>
          <div className="rounded-lg bg-[#00346f] p-6 text-white">
            <UserRound className="mb-6 size-10" />
            <h1 className="text-3xl font-semibold">
              Set up your driver profile
            </h1>
            <p className="mt-3 text-sm text-blue-100">
              Tell mechanics who you are, where you are, and what you drive so
              service requests start with useful context.
            </p>
          </div>
          <div className="grid gap-3">
            {["Profile details", "Vehicle basics", "Email verification"].map(
              (step, index) => (
                <div
                  className="flex items-center gap-3 rounded-md border bg-white p-4"
                  key={step}
                >
                  <span className="flex size-8 items-center justify-center rounded-full bg-[#f8f9fa] text-sm font-semibold text-[#00346f]">
                    {index + 1}
                  </span>
                  <span className="text-sm font-medium text-slate-700">
                    {step}
                  </span>
                </div>
              ),
            )}
          </div>
        </aside>

        <Card className="rounded-lg shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Car className="size-5 text-[#00346f]" />
              Driver details
            </CardTitle>
            <CardDescription>
              These fields are held locally for now and ready for the driver
              profile API later.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-8" onSubmit={handleSubmit}>
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Contact information</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {renderInput("firstName", "First name", "Avery")}
                  {renderInput("lastName", "Last name", "Johnson")}
                  {renderInput("phone", "Phone", "+27 82 123 4567", "tel")}
                  {renderInput("location", "Location", "Johannesburg")}
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Vehicle details</h2>
                <div className="grid gap-4 sm:grid-cols-3">
                  {renderInput("vehicleMake", "Make", "Toyota")}
                  {renderInput("vehicleModel", "Model", "Corolla")}
                  {renderInput("vehicleYear", "Year", "2020", "number")}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Service notes</Label>
                <Textarea
                  id="notes"
                  onChange={(event) => updateField("notes", event.target.value)}
                  placeholder="Share recurring issues, preferred availability, or useful context."
                  value={form.notes}
                />
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
                  className="bg-[#00346f] text-white hover:bg-[#002b5c]"
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

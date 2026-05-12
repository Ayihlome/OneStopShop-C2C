import { ArrowRight, LockKeyhole, Mail } from "lucide-react";
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

type LoginForm = {
  email: string;
  password: string;
};

const initialForm: LoginForm = {
  email: "",
  password: "",
};

export default function Login() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<Partial<LoginForm>>({});
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const updateField = (field: keyof LoginForm, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const validate = () => {
    const nextErrors: Partial<LoginForm> = {};

    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (form.password.length < 8) {
      nextErrors.password = "Password must be at least 8 characters.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    setStatus("Demo login accepted. Redirecting...");

    window.setTimeout(() => {
      setIsSubmitting(false);
      navigate("/find-mechanic");
    }, 500);
  };

  return (
    <Layout className="bg-[#f8f9fa]" variant="public">
      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:px-8 lg:py-20">
        <div className="flex flex-col justify-center gap-6">
          <div className="inline-flex w-fit items-center gap-2 rounded-md border bg-white px-3 py-1 text-sm text-[#00346f]">
            <LockKeyhole className="size-4" />
            Secure account access
          </div>
          <div className="space-y-4">
            <h1 className="max-w-2xl text-4xl font-semibold tracking-normal text-slate-950 sm:text-5xl">
              Get back to managing vehicle care with less friction.
            </h1>
            <p className="max-w-xl text-lg text-slate-600">
              Sign in to browse mechanics, manage your profile, and continue
              the service flow from one clear dashboard.
            </p>
          </div>
          <div className="grid gap-3 text-sm text-slate-600 sm:grid-cols-3">
            {["Verified mechanics", "Local search", "Profile-ready"].map(
              (item) => (
                <div className="rounded-md border bg-white p-4" key={item}>
                  {item}
                </div>
              ),
            )}
          </div>
        </div>

        <Card className="self-center rounded-lg shadow-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Log in</CardTitle>
            <CardDescription>
              Use your OneStopShop account credentials.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                  <Input
                    aria-invalid={Boolean(errors.email)}
                    className="pl-9"
                    id="email"
                    onChange={(event) =>
                      updateField("email", event.target.value)
                    }
                    placeholder="you@example.com"
                    type="email"
                    value={form.email}
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  aria-invalid={Boolean(errors.password)}
                  id="password"
                  onChange={(event) =>
                    updateField("password", event.target.value)
                  }
                  placeholder="At least 8 characters"
                  type="password"
                  value={form.password}
                />
                {errors.password && (
                  <p className="text-sm text-red-600">{errors.password}</p>
                )}
              </div>

              {status && <p className="text-sm text-[#00346f]">{status}</p>}

              <Button
                className="w-full bg-[#00346f] text-white hover:bg-[#002b5c]"
                disabled={isSubmitting}
                type="submit"
              >
                {isSubmitting ? "Logging in..." : "Log in to account"}
                <ArrowRight className="size-4" />
              </Button>
            </form>

            <div className="mt-6 flex flex-col gap-2 text-center text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-center">
              <span>New to OneStopShop?</span>
              <Button
                className="h-auto p-0 text-[#00346f]"
                onClick={() => navigate("/signup")}
                variant="link"
              >
                Create an account
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </Layout>
  );
}

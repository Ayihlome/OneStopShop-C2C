import { ArrowRight, Car, ShieldCheck, Wrench } from "lucide-react";
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

type Role = "driver" | "mechanic";

type SignupForm = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: Role;
};

const initialForm: SignupForm = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  role: "driver",
};

export default function SignUp() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<Partial<SignupForm>>({});
  const navigate = useNavigate();

  const updateField = (field: keyof SignupForm, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const validate = () => {
    const nextErrors: Partial<SignupForm> = {};

    if (!form.name.trim()) {
      nextErrors.name = "Enter your full name.";
    }

    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (form.password.length < 8) {
      nextErrors.password = "Use at least 8 characters.";
    }

    if (form.confirmPassword !== form.password) {
      nextErrors.confirmPassword = "Passwords must match.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    navigate(form.role === "driver" ? "/driver/setup" : "/mechanic/setup");
  };

  return (
    <Layout className="bg-[#f8f9fa]" variant="public">
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-3xl text-center">
          <Badge className="mb-4 bg-[#00346f] text-white">
            One account, two paths
          </Badge>
          <h1 className="text-4xl font-semibold text-slate-950 sm:text-5xl">
            Join OneStopShop
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Create your account, choose how you will use the platform, and we
            will route you into the right setup flow.
          </p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="grid gap-4">
            {[
              {
                role: "driver" as Role,
                icon: Car,
                title: "I need a mechanic",
                copy: "Build a driver profile and find trusted local service providers.",
              },
              {
                role: "mechanic" as Role,
                icon: Wrench,
                title: "I provide repairs",
                copy: "Create a mechanic profile and prepare for verification.",
              },
            ].map((option) => {
              const Icon = option.icon;
              const active = form.role === option.role;

              return (
                <button
                  className={`rounded-lg border bg-white p-5 text-left transition ${
                    active
                      ? "border-[#00346f] ring-2 ring-[#00346f]/20"
                      : "hover:border-slate-300"
                  }`}
                  key={option.role}
                  onClick={() => updateField("role", option.role)}
                  type="button"
                >
                  <div className="flex items-start gap-4">
                    <span className="flex size-11 items-center justify-center rounded-md bg-[#f8f9fa] text-[#00346f]">
                      <Icon className="size-5" />
                    </span>
                    <span>
                      <span className="block font-semibold text-slate-950">
                        {option.title}
                      </span>
                      <span className="mt-1 block text-sm text-slate-600">
                        {option.copy}
                      </span>
                    </span>
                  </div>
                </button>
              );
            })}
            <div className="rounded-lg border bg-white p-5 text-sm text-slate-600">
              <ShieldCheck className="mb-3 size-5 text-[#00346f]" />
              Account creation is local-only in this demo. The API helper is
              ready for backend wiring later.
            </div>
          </div>

          <Card className="rounded-lg shadow-sm">
            <CardHeader>
              <CardTitle className="text-2xl">Create account</CardTitle>
              <CardDescription>
                We will send you to{" "}
                {form.role === "driver" ? "driver setup" : "mechanic setup"}{" "}
                after validation.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="grid gap-5" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <Label htmlFor="name">Full name</Label>
                  <Input
                    aria-invalid={Boolean(errors.name)}
                    id="name"
                    onChange={(event) =>
                      updateField("name", event.target.value)
                    }
                    placeholder="Jordan Smith"
                    value={form.name}
                  />
                  {errors.name && (
                    <p className="text-sm text-red-600">{errors.name}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email address</Label>
                  <Input
                    aria-invalid={Boolean(errors.email)}
                    id="email"
                    onChange={(event) =>
                      updateField("email", event.target.value)
                    }
                    placeholder="you@example.com"
                    type="email"
                    value={form.email}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-600">{errors.email}</p>
                  )}
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      aria-invalid={Boolean(errors.password)}
                      id="password"
                      onChange={(event) =>
                        updateField("password", event.target.value)
                      }
                      type="password"
                      value={form.password}
                    />
                    {errors.password && (
                      <p className="text-sm text-red-600">{errors.password}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm password</Label>
                    <Input
                      aria-invalid={Boolean(errors.confirmPassword)}
                      id="confirmPassword"
                      onChange={(event) =>
                        updateField("confirmPassword", event.target.value)
                      }
                      type="password"
                      value={form.confirmPassword}
                    />
                    {errors.confirmPassword && (
                      <p className="text-sm text-red-600">
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>
                </div>

                <Button
                  className="bg-[#00346f] text-white hover:bg-[#002b5c]"
                  type="submit"
                >
                  Continue as {form.role === "driver" ? "driver" : "mechanic"}
                  <ArrowRight className="size-4" />
                </Button>
              </form>

              <div className="mt-6 text-center text-sm text-slate-600">
                Already have an account?{" "}
                <Button
                  className="h-auto p-0 text-[#00346f]"
                  onClick={() => navigate("/login")}
                  variant="link"
                >
                  Log in
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </Layout>
  );
}

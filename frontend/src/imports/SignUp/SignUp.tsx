import { ArrowRight, Car, ShieldCheck } from "lucide-react";
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
import { signupUser } from "@/api/auth";

type SignupForm = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const initialForm: SignupForm = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function SignUp() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof SignupForm, string>>>({});
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const updateField = (field: keyof SignupForm, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const validate = () => {
    const nextErrors: Partial<Record<keyof SignupForm, string>> = {};

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

  const splitName = () => {
    const parts = form.name.trim().split(/\s+/);
    return {
      first_name: parts[0] || "",
      last_name: parts.slice(1).join(" ") || parts[0] || "",
    };
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    setStatus("Creating account...");

    try {
      const name = splitName();
      const payload = {
        ...name,
        email: form.email,
        password: form.password,
      };
      const response = await signupUser(payload);
      const auth = response.data;

      localStorage.setItem("oss_token", auth.token);
      localStorage.setItem("oss_user", JSON.stringify(auth.user));
      setStatus("Account created. Continue setup to sync profile details.");
      navigate("/driver/setup");
    } catch (error) {
      setStatus(
        error instanceof Error
          ? error.message
          : "Signup failed. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout className="bg-primary" variant="public">
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-3xl text-center">
          <Badge className="mb-4 bg-primary text-primary-foreground">
            One account, all access
          </Badge>
          <h1 className="text-4xl font-semibold text-foreground sm:text-5xl">
            Join OneStopShop
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Create your account. You can become a service provider at any time
            after signing up.
          </p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="grid gap-4">
            <div className="rounded-lg border bg-card p-5">
              <div className="flex items-start gap-4">
                <span className="flex size-11 items-center justify-center rounded-md bg-primary text-primary-foreground">
                  <Car className="size-5" />
                </span>
                <span>
                  <span className="block font-semibold text-foreground">
                    Register your account
                  </span>
                  <span className="mt-1 block text-sm text-muted-foreground">
                    Sign up once — then optionally upgrade to a provider profile
                    with PayFast payment details.
                  </span>
                </span>
              </div>
            </div>
            <div className="rounded-lg border bg-muted p-5 text-sm text-muted-foreground">
              <ShieldCheck className="mb-3 size-5 text-foreground" />
              Account creation syncs with the backend before setup begins.
              No separate mechanic signup — upgrade from within your account.
            </div>
          </div>

          <Card className="rounded-lg shadow-sm">
            <CardHeader>
              <CardTitle className="text-2xl">Create account</CardTitle>
              <CardDescription>
                We will send you to driver setup after validation.
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

                <Button disabled={isSubmitting} type="submit">
                  {isSubmitting ? "Creating account..." : "Create account"}
                  <ArrowRight className="size-4" />
                </Button>
                {status && <StatusMessage message={status} />}
              </form>

              <div className="mt-6 text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Button
                  className="h-auto p-0 text-muted-foreground"
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

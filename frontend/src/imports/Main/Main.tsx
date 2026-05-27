import {
  ArrowRight,
  CalendarCheck,
  Car,
  ShieldCheck,
  Star,
  Wrench,
} from "lucide-react";
import { useNavigate } from "react-router";

import Layout from "@/app/components/Layout";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";

const features = [
  {
    icon: ShieldCheck,
    title: "Verified profiles",
    copy: "Mechanic profiles surface specialties, location, and verification status.",
  },
  {
    icon: CalendarCheck,
    title: "Cleaner requests",
    copy: "Drivers can share useful vehicle context before booking service.",
  },
  {
    icon: Star,
    title: "Local trust signals",
    copy: "Ratings, reviews, and response times help drivers choose confidently.",
  },
];

export default function Main() {
  const navigate = useNavigate();

  return (
    <Layout variant="public">
      <section className="bg-primary">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-20">
          <div className="flex flex-col justify-center gap-7">
            <Badge className="w-fit bg-primary text-primary-foreground">
              Drivers and mechanics, one platform
            </Badge>
            <div className="space-y-5">
              <h1 className="max-w-3xl text-4xl font-semibold text-primary-foreground sm:text-5xl lg:text-6xl">
                OneStopShop
              </h1>
              <p className="max-w-2xl text-lg text-primary-foreground/80">
                Find trusted vehicle repair professionals, set up useful
                service profiles, and keep the whole mechanic discovery flow in
                one practical place.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                onClick={() => navigate("/find-mechanic")}
                size="lg"
              >
                Find a mechanic
                <ArrowRight className="size-4" />
              </Button>
              <Button
                onClick={() => navigate("/signup")}
                size="lg"
                variant="outline"
              >
                Join the platform
              </Button>
            </div>
          </div>
          <div className="rounded-lg border bg-card p-4 shadow-sm">
            <img
              alt="Mechanic workshop"
              className="h-full min-h-80 w-full rounded-md object-cover"
              src="/images/mechanic-shop.svg"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-5 md:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <Card className="rounded-lg" key={feature.title}>
                <CardHeader>
                  <span className="mb-3 flex size-11 items-center justify-center rounded-md bg-primary text-primary-foreground">
                    <Icon className="size-5" />
                  </span>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-6 text-muted-foreground">
                    {feature.copy}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="bg-primary">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-12 text-primary-foreground sm:px-6 md:grid-cols-2 lg:px-8">
          <div className="rounded-lg border border-white/20 p-6">
            <Car className="mb-5 size-8" />
            <h2 className="text-2xl font-semibold">For drivers</h2>
            <p className="mt-3 text-primary-foreground/70">
              Build your profile, describe your vehicle, and browse mechanics
              by specialty and location.
            </p>
            <Button
              className="mt-6 bg-accent text-accent-foreground hover:bg-accent/90"
              onClick={() => navigate("/signup")}
            >
              Start as driver
            </Button>
          </div>
          <div className="rounded-lg border border-white/20 p-6">
            <Wrench className="mb-5 size-8" />
            <h2 className="text-2xl font-semibold">For service providers</h2>
            <p className="mt-3 text-primary-foreground/70">
              Upgrade your account to create a service profile, highlight specialties, and prepare for
              platform verification.
            </p>
            <Button
              className="mt-6 bg-accent text-accent-foreground hover:bg-accent/90"
              onClick={() => navigate("/mechanic/setup")}
            >
              Become a provider
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}

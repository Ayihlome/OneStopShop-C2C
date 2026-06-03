import { MapPin, Search, Star, Wrench, CalendarDays, Verified } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import Layout from "@/app/components/Layout";
import { Avatar, AvatarFallback } from "@/app/components/ui/avatar";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { StatusMessage } from "@/app/components/ui/status-message";
import { filterMechanics, listMechanics } from "@/api/mechanics";

const fallbackMechanics = [
  {
    id: "robert-auto",
    name: "Robert Daniels",
    serviceName: "Robert's Auto Clinic",
    location: "Johannesburg",
    specialties: ["Diagnostics", "Engine repair", "Electrical"],
    rating: 4.9,
    reviewCount: 128,
    responseTime: "Usually responds within 1 hour",
    bio: "Independent workshop focused on reliable diagnostics and practical repairs.",
    verified: true,
  },
  {
    id: "marcus-mobile",
    name: "Marcus Mokoena",
    serviceName: "Marcus Mobile Mechanics",
    location: "Pretoria",
    specialties: ["Mobile service", "Brakes", "Battery"],
    rating: 4.7,
    reviewCount: 86,
    responseTime: "Usually responds same day",
    bio: "Mobile mechanic helping drivers with common roadside and driveway repairs.",
    verified: true,
  },
  {
    id: "jordan-performance",
    name: "Jordan Pillay",
    serviceName: "JP Performance Garage",
    location: "Cape Town",
    specialties: ["Performance", "Suspension", "Servicing"],
    rating: 4.8,
    reviewCount: 74,
    responseTime: "Usually responds within 2 hours",
    bio: "Performance-minded service garage with clear estimates and careful workmanship.",
    verified: false,
  },
];

const specialtyOptions = Array.from(
  new Set(fallbackMechanics.flatMap((mechanic) => mechanic.specialties)),
).sort();

type BackendMechanic = {
  id: number | string;
  first_name?: string;
  last_name?: string;
  name?: string;
  businessName?: string;
  business_name?: string;
  city?: string;
  town?: string;
  location?: string;
  specialities?: string[];
  specialties?: string[];
  average_rating?: number | string;
  rating?: number | string;
  review_count?: number | string;
  reviewCount?: number | string;
  is_available?: boolean;
  service_description?: string;
  verification_badge?: boolean;
  verified?: boolean;
};

function normalizeMechanic(mechanic: BackendMechanic) {
  const name =
    [mechanic.first_name, mechanic.last_name].filter(Boolean).join(" ") ||
    mechanic.name ||
    "Mechanic";

  return {
    id: String(mechanic.id),
    name,
    serviceName: mechanic.businessName || mechanic.business_name || name,
    location: mechanic.city || mechanic.town || mechanic.location || "Unknown",
    specialties: mechanic.specialities || mechanic.specialties || [],
    rating: Number(mechanic.average_rating || mechanic.rating || 0),
    reviewCount: Number(mechanic.review_count || mechanic.reviewCount || 0),
    responseTime: mechanic.is_available
      ? "Available for requests"
      : "Availability on request",
    bio: mechanic.service_description || "No description provided yet.",
    verified: Boolean(mechanic.verification_badge ?? mechanic.verified),
  };
}

export default function FindYourMechanic() {
  const [location, setLocation] = useState("");
  const [specialty, setSpecialty] = useState("all");
  const [availableOn, setAvailableOn] = useState("");
  const [minRating, setMinRating] = useState("all");
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [mechanics, setMechanics] = useState(fallbackMechanics);
  const [status, setStatus] = useState("Loading mechanics from backend...");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = window.setTimeout(async () => {
      setIsLoading(true);
      setStatus("Loading mechanics from backend...");

      try {
          const response =
            location || specialty !== "all" || availableOn || minRating !== "all" || verifiedOnly
              ? await filterMechanics({
                  city: location || undefined,
                  specialty: specialty === "all" ? undefined : specialty,
                  available_on: availableOn || undefined,
                  min_rating: minRating !== "all" ? minRating : undefined,
                  verified: verifiedOnly ? "true" : undefined,
                })
              : await listMechanics();

        setMechanics(response.data.map(normalizeMechanic));
        setStatus("Mechanics loaded from backend.");
      } catch (error) {
        setMechanics(fallbackMechanics);
        setStatus(
          error instanceof Error
            ? `${error.message}. Showing local fallback mechanics.`
            : "Could not load backend mechanics. Showing local fallback mechanics.",
        );
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => window.clearTimeout(timer);
  }, [location, specialty, availableOn, minRating, verifiedOnly]);

  const filteredMechanics = mechanics.filter((mechanic) => {
    const matchesLocation =
      !location ||
      mechanic.location.toLowerCase().includes(location.toLowerCase());
    const matchesSpecialty =
      specialty === "all" || mechanic.specialties.includes(specialty);

    return matchesLocation && matchesSpecialty;
  });

  return (
    <Layout className="bg-primary" variant="app">
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <Badge className="mb-4 bg-primary text-primary-foreground">
              Browse mechanics
            </Badge>
            <h1 className="text-4xl font-semibold text-primary-foreground">
              Find your mechanic
            </h1>
            <p className="mt-3 max-w-2xl text-primary-foreground/80">
              Filter trusted local providers by city and specialty, then open a
              public profile to review details.
            </p>
          </div>
          <Card className="rounded-lg">
            <CardContent className="grid gap-4 pt-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    className="pl-9"
                    id="location"
                    onChange={(event) => setLocation(event.target.value)}
                    placeholder="Johannesburg"
                    value={location}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Specialty</Label>
                <Select onValueChange={setSpecialty} value={specialty}>
                  <SelectTrigger>
                    <SelectValue placeholder="Any specialty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Any specialty</SelectItem>
                    {specialtyOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardContent className="grid gap-4 pb-6 sm:grid-cols-3">
              <div className="space-y-2">
                <Label>Available on</Label>
                <div className="relative">
                  <CalendarDays className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    className="pl-9"
                    onChange={(e) => setAvailableOn(e.target.value)}
                    type="date"
                    value={availableOn}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Minimum rating</Label>
                <Select onValueChange={setMinRating} value={minRating}>
                  <SelectTrigger>
                    <SelectValue placeholder="Any rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Any rating</SelectItem>
                    <SelectItem value="3">3+ stars</SelectItem>
                    <SelectItem value="4">4+ stars</SelectItem>
                    <SelectItem value="4.5">4.5+ stars</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Verified only</Label>
                <Button
                  className={`w-full ${verifiedOnly ? "" : "border-border text-muted-foreground"}`}
                  onClick={() => setVerifiedOnly(!verifiedOnly)}
                  variant={verifiedOnly ? "default" : "outline"}
                >
                  <Verified className="size-4 mr-2" />
                  {verifiedOnly ? "Verified only" : "All providers"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <StatusMessage
          className="mt-4"
          message={isLoading ? "Loading mechanics..." : status}
        />

        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredMechanics.map((mechanic) => (
            <Card className="rounded-lg bg-card" key={mechanic.id}>
              <CardHeader>
                <div className="flex items-start gap-4">
                  <Avatar className="size-12">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {mechanic.name
                        .split(" ")
                        .map((part) => part[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <CardTitle className="text-xl">
                      {mechanic.serviceName}
                    </CardTitle>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {mechanic.name}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {mechanic.verified && (
                    <Badge className="bg-primary text-primary-foreground">Verified</Badge>
                  )}
                  {mechanic.specialties.slice(0, 3).map((item) => (
                    <Badge key={item} variant="secondary">
                      {item}
                    </Badge>
                  ))}
                </div>
                <p className="text-sm leading-6 text-muted-foreground">
                  {mechanic.bio}
                </p>
                <div className="grid gap-2 text-sm text-muted-foreground">
                  <span className="flex items-center gap-2">
                    <MapPin className="size-4 text-foreground" />
                    {mechanic.location}
                  </span>
                  <span className="flex items-center gap-2">
                    <Star className="size-4 fill-foreground text-foreground" />
                    {mechanic.rating} ({mechanic.reviewCount} reviews)
                  </span>
                  <span className="flex items-center gap-2">
                    <Wrench className="size-4 text-foreground" />
                    {mechanic.responseTime}
                  </span>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  onClick={() => navigate(`/mechanic/${mechanic.id}`)}
                >
                  View profile
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {filteredMechanics.length === 0 && (
          <Card className="mt-8 rounded-lg bg-card">
            <CardContent className="py-10 text-center">
              <p className="font-medium text-foreground">No mechanics found</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Try another city or specialty.
              </p>
            </CardContent>
          </Card>
        )}
      </section>
    </Layout>
  );
}

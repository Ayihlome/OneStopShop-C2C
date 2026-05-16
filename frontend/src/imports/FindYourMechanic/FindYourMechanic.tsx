import { MapPin, Search, Star, Wrench } from "lucide-react";
import { useMemo, useState } from "react";
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

const mechanics = [
  {
    id: "robert-auto",
    name: "Robert Daniels",
    businessName: "Robert's Auto Clinic",
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
    businessName: "Marcus Mobile Mechanics",
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
    businessName: "JP Performance Garage",
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
  new Set(mechanics.flatMap((mechanic) => mechanic.specialties)),
).sort();

export default function FindYourMechanic() {
  const [location, setLocation] = useState("");
  const [specialty, setSpecialty] = useState("all");
  const navigate = useNavigate();

  const filteredMechanics = useMemo(() => {
    return mechanics.filter((mechanic) => {
      const matchesLocation =
        !location ||
        mechanic.location.toLowerCase().includes(location.toLowerCase());
      const matchesSpecialty =
        specialty === "all" || mechanic.specialties.includes(specialty);

      return matchesLocation && matchesSpecialty;
    });
  }, [location, specialty]);

  return (
    <Layout className="bg-[#5B360B]" variant="app">
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <Badge className="mb-4 bg-[#010813] text-white">
              Browse mechanics
            </Badge>
            <h1 className="text-4xl font-semibold text-[#010813]">
              Find your mechanic
            </h1>
            <p className="mt-3 max-w-2xl text-[#362007]">
              Filter trusted local providers by city and specialty, then open a
              public profile to review details.
            </p>
          </div>
          <Card className="rounded-lg">
            <CardContent className="grid gap-4 pt-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#362007]" />
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
          </Card>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredMechanics.map((mechanic) => (
            <Card className="rounded-lg bg-[#FAD775]" key={mechanic.id}>
              <CardHeader>
                <div className="flex items-start gap-4">
                  <Avatar className="size-12">
                    <AvatarFallback className="bg-[#010813] text-white">
                      {mechanic.name
                        .split(" ")
                        .map((part) => part[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <CardTitle className="text-xl">
                      {mechanic.businessName}
                    </CardTitle>
                    <p className="mt-1 text-sm text-[#362007]">
                      {mechanic.name}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {mechanic.verified && (
                    <Badge className="bg-[#010813] text-white">Verified</Badge>
                  )}
                  {mechanic.specialties.slice(0, 3).map((item) => (
                    <Badge key={item} variant="secondary">
                      {item}
                    </Badge>
                  ))}
                </div>
                <p className="text-sm leading-6 text-[#362007]">
                  {mechanic.bio}
                </p>
                <div className="grid gap-2 text-sm text-[#362007]">
                  <span className="flex items-center gap-2">
                    <MapPin className="size-4 text-[#010813]" />
                    {mechanic.location}
                  </span>
                  <span className="flex items-center gap-2">
                    <Star className="size-4 fill-[#010813] text-[#010813]" />
                    {mechanic.rating} ({mechanic.reviewCount} reviews)
                  </span>
                  <span className="flex items-center gap-2">
                    <Wrench className="size-4 text-[#010813]" />
                    {mechanic.responseTime}
                  </span>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full bg-[#010813] text-white hover:bg-[#362007]"
                  onClick={() => navigate(`/mechanic/${mechanic.id}`)}
                >
                  View profile
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {filteredMechanics.length === 0 && (
          <Card className="mt-8 rounded-lg bg-[#FAD775]">
            <CardContent className="py-10 text-center">
              <p className="font-medium text-[#010813]">No mechanics found</p>
              <p className="mt-2 text-sm text-[#362007]">
                Try another city or specialty.
              </p>
            </CardContent>
          </Card>
        )}
      </section>
    </Layout>
  );
}

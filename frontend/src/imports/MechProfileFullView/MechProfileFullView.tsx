import {
  ArrowLeft,
  CalendarPlus,
  CheckCircle2,
  MapPin,
  MessageSquare,
  Star,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";

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
import { Separator } from "@/app/components/ui/separator";

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
    bio: "Independent workshop focused on reliable diagnostics, transparent estimates, and practical repairs for everyday drivers.",
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
    bio: "Mobile mechanic helping drivers with common roadside and driveway repairs across Pretoria.",
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

const reviews = [
  {
    name: "Avery J.",
    text: "Clear diagnosis, fair estimate, and the car was ready when promised.",
  },
  {
    name: "Sam N.",
    text: "Helpful communication and practical advice before any work started.",
  },
];

export default function MechProfileFullView() {
  const [status, setStatus] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const mechanic = useMemo(
    () => mechanics.find((item) => item.id === id) ?? mechanics[0],
    [id],
  );

  return (
    <Layout className="bg-[#f8f9fa]" variant="app">
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <Button
          className="mb-6 px-0 text-[#00346f]"
          onClick={() => navigate("/find-mechanic")}
          variant="link"
        >
          <ArrowLeft className="size-4" />
          Back to results
        </Button>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <Card className="rounded-lg bg-white">
            <CardHeader>
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                <Avatar className="size-20">
                  <AvatarFallback className="bg-[#00346f] text-xl text-white">
                    {mechanic.name
                      .split(" ")
                      .map((part) => part[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    {mechanic.verified && (
                      <Badge className="bg-[#00346f] text-white">
                        <CheckCircle2 className="size-3" />
                        Verified
                      </Badge>
                    )}
                    <Badge variant="secondary">{mechanic.responseTime}</Badge>
                  </div>
                  <CardTitle className="mt-4 text-3xl">
                    {mechanic.businessName}
                  </CardTitle>
                  <CardDescription className="mt-2">
                    Owned by {mechanic.name}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-md bg-[#f8f9fa] p-4">
                  <MapPin className="mb-2 size-4 text-[#00346f]" />
                  <p className="text-sm text-slate-500">Location</p>
                  <p className="font-medium">{mechanic.location}</p>
                </div>
                <div className="rounded-md bg-[#f8f9fa] p-4">
                  <Star className="mb-2 size-4 fill-[#00346f] text-[#00346f]" />
                  <p className="text-sm text-slate-500">Rating</p>
                  <p className="font-medium">
                    {mechanic.rating} ({mechanic.reviewCount})
                  </p>
                </div>
                <div className="rounded-md bg-[#f8f9fa] p-4">
                  <CalendarPlus className="mb-2 size-4 text-[#00346f]" />
                  <p className="text-sm text-slate-500">Availability</p>
                  <p className="font-medium">Weekdays</p>
                </div>
              </div>

              <Separator />

              <div>
                <h2 className="text-xl font-semibold">About</h2>
                <p className="mt-3 leading-7 text-slate-600">{mechanic.bio}</p>
              </div>

              <div>
                <h2 className="text-xl font-semibold">Specialties</h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  {mechanic.specialties.map((specialty) => (
                    <Badge key={specialty} variant="secondary">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="rounded-lg bg-white">
              <CardHeader>
                <CardTitle>Request service</CardTitle>
                <CardDescription>
                  Actions are local stubs until backend messaging is connected.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  className="w-full bg-[#00346f] text-white hover:bg-[#002b5c]"
                  onClick={() => setStatus("Service request drafted locally.")}
                >
                  <CalendarPlus className="size-4" />
                  Request booking
                </Button>
                <Button
                  className="w-full"
                  onClick={() => setStatus("Message composer opened locally.")}
                  variant="outline"
                >
                  <MessageSquare className="size-4" />
                  Contact mechanic
                </Button>
                {status && <p className="text-sm text-[#00346f]">{status}</p>}
              </CardContent>
            </Card>

            <Card className="rounded-lg bg-white">
              <CardHeader>
                <CardTitle>Recent reviews</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {reviews.map((review) => (
                  <div className="rounded-md border p-4" key={review.name}>
                    <div className="mb-2 flex gap-1 text-[#00346f]">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star
                          className="size-4 fill-current"
                          key={`${review.name}-${index}`}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-slate-600">{review.text}</p>
                    <p className="mt-2 text-sm font-medium">{review.name}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
}

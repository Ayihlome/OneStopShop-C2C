import { Eye, UserPlus, Wrench } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";

import Layout from "@/app/components/Layout";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import PersonalInfo from "../PersonalInfo/PersonalInfo";
import ProviderInfo from "../ProviderInfo/ProviderInfo";

export default function MyProfile() {
  const [isProvider, setIsProvider] = useState(false);
  const [userId, setUserId] = useState<number>(0);
  const [status, setStatus] = useState("Loading...");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const initialTab = searchParams.get("tab") === "provider" ? "provider" : "personal";
  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    const stored = localStorage.getItem("oss_user");
    if (!stored) {
      setStatus("Please sign in to view your profile.");
      return;
    }

    try {
      const user = JSON.parse(stored);
      if (!user.id) {
        setStatus("Please sign in to view your profile.");
        return;
      }

      setUserId(Number(user.id));
      setIsProvider(
        user.role === "provider" ||
        user.isProvider === true ||
        Boolean(user.provider_profile_id),
      );
      setStatus("");
    } catch {
      setStatus("Could not read user data. Please sign in again.");
    }
  }, []);

  if (status && !userId) {
    return (
      <Layout className="bg-primary" variant="app">
        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <Card className="rounded-lg bg-card">
            <CardContent className="py-10 text-center">
              <p className="text-muted-foreground">{status}</p>
            </CardContent>
          </Card>
        </section>
      </Layout>
    );
  }

  return (
    <Layout className="bg-primary" variant="app">
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Badge className="mb-4 bg-primary text-primary-foreground">
              My account
            </Badge>
            <h1 className="text-4xl font-semibold text-primary-foreground">
              My profile
            </h1>
            <p className="mt-3 max-w-2xl text-primary-foreground/80">
              {isProvider
                ? "Manage your personal details and service provider profile."
                : "View and edit your personal account information."}
            </p>
          </div>
          {isProvider && (
            <Button
              onClick={() => navigate(`/mechanic/${userId}?from=profile`)}
              variant="outline"
            >
              <Eye className="size-4" />
              View public profile
            </Button>
          )}
        </div>

        <Tabs
          defaultValue={initialTab}
          onValueChange={(v) => setActiveTab(v)}
          value={activeTab}
        >
          <TabsList className="mb-6">
            <TabsTrigger value="personal">Personal info</TabsTrigger>
            {isProvider && (
              <TabsTrigger value="provider">Service provider</TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="personal">
            <PersonalInfo />
            {!isProvider && (
              <Card className="mt-6 rounded-lg bg-card">
                <CardContent className="flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    <span className="flex size-10 items-center justify-center rounded-md bg-primary text-primary-foreground">
                      <Wrench className="size-5" />
                    </span>
                    <div>
                      <p className="font-medium">Offer your services</p>
                      <p className="text-sm text-muted-foreground">
                        Become a service provider and start receiving bookings.
                      </p>
                    </div>
                  </div>
                  <Button onClick={() => navigate("/mechanic/setup")}>
                    <UserPlus className="size-4" />
                    Become a provider
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {isProvider && (
            <TabsContent value="provider">
              <ProviderInfo userId={userId} />
            </TabsContent>
          )}
        </Tabs>
      </section>
    </Layout>
  );
}

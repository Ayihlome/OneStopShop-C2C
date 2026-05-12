import { CheckCircle2, Mail, RefreshCw } from "lucide-react";
import { useState } from "react";
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

export default function DriverEmailVerification() {
  const [status, setStatus] = useState("Verification email is ready to send.");
  const navigate = useNavigate();

  return (
    <Layout className="bg-[#f8f9fa]" variant="onboarding">
      <section className="mx-auto flex max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <Card className="w-full rounded-lg bg-white text-center shadow-sm">
          <CardHeader>
            <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-[#00346f] text-white">
              <Mail className="size-7" />
            </div>
            <CardTitle className="text-3xl">Verify your email</CardTitle>
            <CardDescription>
              Confirm your email address before browsing mechanics as a driver.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="rounded-md bg-[#f8f9fa] p-4 text-sm text-slate-600">
              {status}
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <Button
                className="bg-[#00346f] text-white hover:bg-[#002b5c]"
                onClick={() => setStatus("Verification email resent locally.")}
              >
                <RefreshCw className="size-4" />
                Resend email
              </Button>
              <Button
                onClick={() => setStatus("Inbox action opened locally.")}
                variant="outline"
              >
                Open inbox
              </Button>
            </div>
            <Button
              className="w-full"
              onClick={() => navigate("/find-mechanic")}
              variant="secondary"
            >
              <CheckCircle2 className="size-4" />
              Continue to find mechanics
            </Button>
          </CardContent>
        </Card>
      </section>
    </Layout>
  );
}

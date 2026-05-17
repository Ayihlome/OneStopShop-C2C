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
    <Layout className="bg-[#5B360B]" variant="onboarding">
      <section className="mx-auto flex max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <Card className="w-full rounded-lg bg-[#FAD775] text-center shadow-sm">
          <CardHeader>
            <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-[#010813] text-white">
              <Mail className="size-7" />
            </div>
            <CardTitle className="text-3xl">Verify your email</CardTitle>
            <CardDescription>
              Confirm your email address before browsing mechanics as a driver.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="rounded-md bg-[#5B360B] p-4 text-sm text-[#362007]">
              {status}
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <Button
                className="bg-[#010813] text-white hover:bg-[#362007]"
                onClick={() => setStatus("The backend does not expose email resend yet. Continue once your profile is saved.")}
              >
                <RefreshCw className="size-4" />
                Resend email
              </Button>
              <Button
                onClick={() => setStatus("Inbox opening is a client-side action; no backend endpoint is required.")}
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

import { CheckCircle2, FileCheck2, ShieldCheck } from "lucide-react";
import { useState } from "react";
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
import { Progress } from "@/app/components/ui/progress";

const checklist = [
  "Business profile submitted",
  "Identity details queued",
  "Service categories selected",
];

export default function MechanicVerification() {
  const [status, setStatus] = useState("Verification packet prepared locally.");
  const navigate = useNavigate();

  return (
    <Layout className="bg-[#5B360B]" variant="onboarding">
      <section className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
        <Card className="rounded-lg bg-[#FAD775] shadow-sm">
          <CardHeader>
            <Badge className="mb-4 w-fit bg-[#010813] text-white">
              Mechanic verification
            </Badge>
            <CardTitle className="text-3xl">Review your verification status</CardTitle>
            <CardDescription>
              This page is ready for document and status APIs once the backend
              is connected.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="rounded-md bg-[#5B360B] p-5">
              <div className="mb-3 flex items-center justify-between gap-4">
                <span className="font-medium text-[#010813]">
                  Profile readiness
                </span>
                <span className="text-sm text-[#362007]">75%</span>
              </div>
              <Progress value={75} />
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {checklist.map((item) => (
                <div className="rounded-md border p-4" key={item}>
                  <CheckCircle2 className="mb-3 size-5 text-[#010813]" />
                  <p className="text-sm font-medium">{item}</p>
                </div>
              ))}
            </div>

            <div className="rounded-md border p-5">
              <div className="flex items-start gap-4">
                <ShieldCheck className="size-6 text-[#010813]" />
                <div>
                  <h2 className="font-semibold">Next verification step</h2>
                  <p className="mt-2 text-sm leading-6 text-[#362007]">
                    Upload and review controls will connect here. For now, use
                    the local action below to continue to your editable profile.
                  </p>
                  <p className="mt-3 text-sm text-[#010813]">{status}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <Button
                onClick={() => setStatus("Verification check refreshed locally.")}
                variant="outline"
              >
                <FileCheck2 className="size-4" />
                Refresh status
              </Button>
              <Button
                className="bg-[#010813] text-white hover:bg-[#362007]"
                onClick={() => navigate("/mechanic/profile")}
              >
                Continue to profile
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </Layout>
  );
}

import { CheckCircle2, FileCheck2, ShieldCheck } from "lucide-react";
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
import { Progress } from "@/app/components/ui/progress";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { StatusMessage } from "@/app/components/ui/status-message";
import { uploadDocument } from "@/api/mechanics";

const checklist = [
  "Business profile submitted",
  "Identity details queued",
  "Service categories selected",
];

export default function MechanicVerification() {
  const [status, setStatus] = useState("Upload a document to send it to backend review.");
  const [docType, setDocType] = useState("id");
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleUpload = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!file) {
      setStatus("Choose a PDF, JPG, JPEG, or PNG document first.");
      return;
    }

    setIsSubmitting(true);
    setStatus("Uploading document to backend...");

    try {
      await uploadDocument(file, docType);
      setStatus("Document uploaded to backend for review.");
      setFile(null);
    } catch (error) {
      setStatus(
        error instanceof Error
          ? error.message
          : "Document upload failed. Please sign in as a mechanic and try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

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
              Upload verification documents directly to the backend review
              queue.
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
                  <StatusMessage className="mt-3" message={status} />
                </div>
              </div>
            </div>

            <form className="rounded-md border p-5" onSubmit={handleUpload}>
              <h2 className="font-semibold">Upload verification document</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="docType">Document type</Label>
                  <select
                    className="flex h-9 w-full rounded-md border border-[#010813]/60 bg-input-background px-3 py-1 text-sm text-[#010813] outline-none"
                    id="docType"
                    onChange={(event) => setDocType(event.target.value)}
                    value={docType}
                  >
                    <option value="id">ID document</option>
                    <option value="certification">Certification</option>
                    <option value="proof_of_residence">Proof of residence</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="document">Document file</Label>
                  <Input
                    accept=".pdf,.jpg,.jpeg,.png"
                    id="document"
                    onChange={(event) => setFile(event.target.files?.[0] || null)}
                    type="file"
                  />
                </div>
              </div>
              <Button
                className="mt-4 bg-[#010813] text-white hover:bg-[#362007]"
                disabled={isSubmitting}
                type="submit"
              >
                {isSubmitting ? "Uploading..." : "Upload document"}
              </Button>
            </form>

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <Button
                onClick={() => setStatus("Verification status is refreshed when the backend returns updated document state.")}
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

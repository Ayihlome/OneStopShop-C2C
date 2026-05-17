import { AlertCircle, AlertTriangle, CheckCircle2 } from "lucide-react";

import { cn } from "./utils";

type StatusTone = "error" | "success" | "warning";

type StatusMessageProps = {
  className?: string;
  message: string;
  tone?: StatusTone;
};

function inferTone(message: string): StatusTone {
  const value = message.toLowerCase();

  if (
    value.includes("success") ||
    value.includes("saved") ||
    value.includes("created") ||
    value.includes("uploaded") ||
    value.includes("loaded")
  ) {
    return "success";
  }

  if (
    value.includes("failed") ||
    value.includes("could not") ||
    value.includes("404") ||
    value.includes("400") ||
    value.includes("401") ||
    value.includes("403") ||
    value.includes("500") ||
    value.includes("error")
  ) {
    return "error";
  }

  return "warning";
}

function StatusMessage({ className, message, tone }: StatusMessageProps) {
  const activeTone = tone || inferTone(message);
  const Icon =
    activeTone === "success"
      ? CheckCircle2
      : activeTone === "error"
        ? AlertCircle
        : AlertTriangle;

  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-md border px-4 py-3 text-sm font-medium leading-6",
        activeTone === "success" &&
          "border-green-700 bg-green-100 text-green-950",
        activeTone === "error" && "border-red-700 bg-red-100 text-red-950",
        activeTone === "warning" &&
          "border-yellow-700 bg-yellow-100 text-yellow-950",
        className,
      )}
      role={activeTone === "error" ? "alert" : "status"}
    >
      <Icon className="mt-0.5 size-4 shrink-0" />
      <span>{message}</span>
    </div>
  );
}

export { StatusMessage };

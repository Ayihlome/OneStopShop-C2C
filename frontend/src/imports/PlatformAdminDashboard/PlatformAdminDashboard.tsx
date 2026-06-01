import {
  Activity,
  AlertTriangle,
  ShieldCheck,
  UsersRound,
  Wrench,
} from "lucide-react";
import { useEffect, useState } from "react";

import Layout from "@/app/components/Layout";
import { Badge } from "@/app/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";
import { StatusMessage } from "@/app/components/ui/status-message";
import { getDashboard, listPendingDocuments, listPayments } from "@/api/admin";

const stats = [
  {
    label: "Total users",
    value: "1,284",
    icon: UsersRound,
    tone: "bg-card text-foreground",
  },
  {
    label: "Verified mechanics",
    value: "326",
    icon: ShieldCheck,
    tone: "bg-emerald-50 text-emerald-700",
  },
  {
    label: "Active jobs",
    value: "79",
    icon: Wrench,
    tone: "bg-card text-foreground",
  },
  {
    label: "Open disputes",
    value: "4",
    icon: AlertTriangle,
    tone: "bg-card text-foreground",
  },
];

const activity = [
  {
    id: "ACT-1001",
    actor: "Robert's Auto Clinic",
    action: "Submitted verification refresh",
    status: "Review",
    time: "10 minutes ago",
  },
  {
    id: "ACT-1002",
    actor: "Avery Johnson",
    action: "Created driver profile",
    status: "Complete",
    time: "34 minutes ago",
  },
  {
    id: "ACT-1003",
    actor: "JP Performance Garage",
    action: "Updated service specialties",
    status: "Info",
    time: "1 hour ago",
  },
  {
    id: "ACT-1004",
    actor: "Marcus Mobile Mechanics",
    action: "Received new service request",
    status: "Pending",
    time: "2 hours ago",
  },
];

type PendingDocument = {
  id: number | string;
  first_name?: string;
  last_name?: string;
  doc_type?: string;
  status?: string;
  created_at?: string;
};

export default function PlatformAdminDashboard() {
  const [dashboardStats, setDashboardStats] = useState(stats);
  const [activityRows, setActivityRows] = useState(activity);
  const [paymentCount, setPaymentCount] = useState(0);
  const [status, setStatus] = useState("Loading admin dashboard from backend...");

  useEffect(() => {
    let ignore = false;

    async function loadAdminDashboard() {
      try {
        const [dashboardResponse, documentsResponse, paymentsResponse] = await Promise.all([
          getDashboard(),
          listPendingDocuments(),
          listPayments().catch(() => ({ data: [] })),
        ]);
        const data = dashboardResponse.data;
        const documents = documentsResponse.data || [];
        const payments = paymentsResponse.data || [];

        if (!ignore) {
          setDashboardStats([
            {
              label: "Total users",
              value: String(data.total_users ?? 0),
              icon: UsersRound,
              tone: "bg-card text-foreground",
            },
            {
              label: "Verified mechanics",
              value: String(data.verified_mechanics ?? 0),
              icon: ShieldCheck,
              tone: "bg-emerald-50 text-emerald-700",
            },
            {
              label: "Active jobs",
              value: String(data.active_bookings ?? 0),
              icon: Wrench,
              tone: "bg-card text-foreground",
            },
            {
              label: "Pending documents",
              value: String(data.pending_verifications ?? documents.length),
              icon: AlertTriangle,
              tone: "bg-card text-foreground",
            },
            {
              label: "Total payments",
              value: String(data.total_payments ?? paymentCount),
              icon: Activity,
              tone: "bg-card text-foreground",
            },
          ]);
          setActivityRows(
            documents.length
              ? documents.map((document: PendingDocument) => ({
                  id: `DOC-${document.id}`,
                  actor:
                    [document.first_name, document.last_name]
                      .filter(Boolean)
                      .join(" ") || "Mechanic",
                  action: `Uploaded ${document.doc_type}`,
                  status: document.status || "pending",
                  time: document.created_at
                    ? new Date(document.created_at).toLocaleString()
                    : "Unknown",
                }))
              : activity,
          );
          setPaymentCount(payments.length);
          setStatus("Admin dashboard loaded from backend.");
        }
      } catch (error) {
        if (!ignore) {
          setStatus(
            error instanceof Error
              ? `${error.message}. Showing local fallback dashboard.`
              : "Could not load backend admin dashboard. Showing local fallback dashboard.",
          );
        }
      }
    }

    loadAdminDashboard();

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <Layout className="bg-primary" variant="admin">
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Badge className="mb-4 bg-primary text-primary-foreground">
              Platform admin
            </Badge>
            <h1 className="text-4xl font-semibold text-foreground">
              Dashboard
            </h1>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Monitor platform health, verification flow, and recent user
              activity from backend dashboard endpoints.
            </p>
          </div>
          <StatusMessage className="sm:max-w-sm" message={status} />
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {dashboardStats.map((stat) => {
            const Icon = stat.icon;

            return (
              <Card className="rounded-lg bg-card" key={stat.label}>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.label}
                  </CardTitle>
                  <span className={`rounded-md p-2 ${stat.tone}`}>
                    <Icon className="size-4" />
                  </span>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-semibold text-foreground">
                    {stat.value}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <Card className="rounded-lg bg-card overflow-x-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="size-5 text-foreground" />
                Recent activity
              </CardTitle>
              <CardDescription>
                Pending document activity from the backend, with fallback data
                when unavailable.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Actor</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activityRows.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.id}</TableCell>
                      <TableCell>{item.actor}</TableCell>
                      <TableCell>{item.action}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            item.status === "Complete"
                              ? "bg-emerald-600 text-white"
                              : item.status === "Pending"
                                ? "bg-muted text-muted-foreground"
                                : "bg-primary text-primary-foreground"
                          }
                        >
                          {item.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{item.time}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card className="rounded-lg bg-card">
            <CardHeader>
              <CardTitle>Admin focus</CardTitle>
              <CardDescription>
                Quick read on the areas a platform operator would review first.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                "Review mechanic verification queue",
                "Check disputes before approving payouts",
                "Watch driver signup completion",
              ].map((item) => (
                <div className="rounded-md border p-4" key={item}>
                  <p className="font-medium text-foreground">{item}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Ready for backend metrics and workflow actions.
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>
    </Layout>
  );
}

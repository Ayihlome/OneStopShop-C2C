import {
  Activity,
  AlertTriangle,
  ShieldCheck,
  UsersRound,
  Wrench,
} from "lucide-react";

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

const stats = [
  {
    label: "Total users",
    value: "1,284",
    icon: UsersRound,
    tone: "bg-blue-50 text-[#00346f]",
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
    tone: "bg-slate-100 text-slate-700",
  },
  {
    label: "Open disputes",
    value: "4",
    icon: AlertTriangle,
    tone: "bg-amber-50 text-amber-700",
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

export default function PlatformAdminDashboard() {
  return (
    <Layout className="bg-[#f8f9fa]" variant="admin">
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Badge className="mb-4 bg-[#00346f] text-white">
              Platform admin
            </Badge>
            <h1 className="text-4xl font-semibold text-slate-950">
              Dashboard
            </h1>
            <p className="mt-3 max-w-2xl text-slate-600">
              Monitor platform health, verification flow, and recent user
              activity with API-ready local data.
            </p>
          </div>
          <div className="rounded-md border bg-white px-4 py-3 text-sm text-slate-600">
            Last updated locally
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <Card className="rounded-lg bg-white" key={stat.label}>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-sm font-medium text-slate-600">
                    {stat.label}
                  </CardTitle>
                  <span className={`rounded-md p-2 ${stat.tone}`}>
                    <Icon className="size-4" />
                  </span>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-semibold text-slate-950">
                    {stat.value}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <Card className="rounded-lg bg-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="size-5 text-[#00346f]" />
                Recent activity
              </CardTitle>
              <CardDescription>
                Placeholder feed for `/api/admin/activity`.
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
                  {activity.map((item) => (
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
                                ? "bg-amber-600 text-white"
                                : "bg-[#00346f] text-white"
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

          <Card className="rounded-lg bg-white">
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
                  <p className="font-medium text-slate-900">{item}</p>
                  <p className="mt-1 text-sm text-slate-600">
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

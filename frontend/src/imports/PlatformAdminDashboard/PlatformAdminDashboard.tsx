import {
  Activity,
  AlertTriangle,
  BookOpen,
  CheckCircle2,
  DollarSign,
  Download,
  Eye,
  ShieldCheck,
  UsersRound,
  Wrench,
  XCircle,
} from "lucide-react";
import { useEffect, useState } from "react";

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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { StatusMessage } from "@/app/components/ui/status-message";
import {
  getDashboard,
  listUsers,
  deleteUser,
  listMechanics,
  deleteMechanic,
  verifyMechanic,
  suspendAccount,
  listPendingDocuments,
  approveDocument,
  rejectDocument,
  listPayments,
} from "@/api/admin";

type DashboardStats = {
  total_users: number;
  total_mechanics: number;
  verified_mechanics: number;
  total_bookings: number;
  total_reviews: number;
  total_visits: number;
  visits_today: number;
  visits_this_week: number;
  pending_verifications: number;
  active_bookings: number;
  total_payments: number;
  successful_payments: number;
};

type User = {
  id: number;
  first_name?: string;
  last_name?: string;
  email?: string;
  role?: string;
  status?: string;
  created_at?: string;
};

type Provider = {
  id: number;
  first_name?: string;
  last_name?: string;
  business_name?: string;
  email?: string;
  verification_badge?: boolean;
  verification_status?: string;
  provider_status?: string;
};

type Document = {
  id: number;
  first_name?: string;
  last_name?: string;
  doc_type?: string;
  status?: string;
  created_at?: string;
};

type Payment = {
  id: number;
  amount?: string;
  currency?: string;
  payment_status?: string;
  payer_email?: string;
  payer_first_name?: string;
  payer_last_name?: string;
  booking_description?: string;
  booking_status?: string;
  created_at?: string;
};

type Booking = {
  id: number;
  customer_first_name?: string;
  customer_last_name?: string;
  business_name?: string;
  vehicle_make?: string;
  vehicle_model?: string;
  description?: string;
  preferred_schedule?: string;
  booking_status?: string;
  created_at?: string;
};

export default function PlatformAdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [status, setStatus] = useState("Loading admin dashboard...");

  // Data state
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [providers, setProviders] = useState<Provider[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);

  // Loading per tab
  const [loading, setLoading] = useState<Record<string, boolean>>({
    overview: true,
    users: true,
    providers: true,
    bookings: true,
    payments: true,
    documents: true,
  });

  useEffect(() => {
    let ignore = false;

    async function loadOverview() {
      try {
        const [dashResp, docResp, payResp] = await Promise.all([
          getDashboard(),
          listPendingDocuments().catch(() => ({ data: [] })),
          listPayments().catch(() => ({ data: [] })),
        ]);
        if (!ignore) {
          setStats(dashResp?.data ?? dashResp ?? null);
          setDocuments(docResp?.data ?? []);
          setPayments(payResp?.data ?? []);
        }
      } catch {
        if (!ignore) setStatus("Could not load overview.");
      } finally {
        if (!ignore) setLoading((p) => ({ ...p, overview: false }));
      }
    }

    loadOverview();
    return () => { ignore = true; };
  }, []);

  const loadTab = async (tab: string) => {
    if (!loading[tab]) return;
    try {
      switch (tab) {
        case "users": {
          const resp = await listUsers();
          setUsers(resp?.data ?? []);
          break;
        }
        case "providers": {
          const resp = await listMechanics();
          setProviders(resp?.data ?? []);
          break;
        }
        case "bookings": {
          const resp = await listPayments();
          // Reuse payments that include booking info, but we need a bookings endpoint
          // Fallback: use the payments data which has booking_description
          const payData = resp?.data ?? [];
          setPayments(payData);
          // Bookings data comes from dashboard stats for now
          break;
        }
        case "payments": {
          const resp = await listPayments();
          setPayments(resp?.data ?? []);
          break;
        }
        case "documents": {
          const resp = await listPendingDocuments();
          setDocuments(resp?.data ?? []);
          break;
        }
      }
    } catch {
      setStatus(`Could not load ${tab}.`);
    } finally {
      setLoading((p) => ({ ...p, [tab]: false }));
    }
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    loadTab(tab);
  };

  const handleDeleteUser = async (id: number) => {
    if (!confirm("Delete this user account? This cannot be undone.")) return;
    try {
      await deleteUser(id);
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch {
      setStatus("Could not delete user.");
    }
  };

  const handleSuspend = async (id: number) => {
    try {
      await suspendAccount(id);
      setUsers((prev) =>
        prev.map((u) => (u.id === id ? { ...u, status: "suspended" } : u))
      );
    } catch {
      setStatus("Could not suspend account.");
    }
  };

  const handleVerify = async (id: number) => {
    try {
      await verifyMechanic(id);
      setProviders((prev) =>
        prev.map((p) =>
          p.id === id ? { ...p, verification_badge: true, verification_status: "verified" } : p
        )
      );
    } catch {
      setStatus("Could not verify mechanic.");
    }
  };

  const handleDeleteProvider = async (id: number) => {
    if (!confirm("Delete this provider profile?")) return;
    try {
      await deleteMechanic(id);
      setProviders((prev) => prev.filter((p) => p.id !== id));
    } catch {
      setStatus("Could not delete provider.");
    }
  };

  const handleApproveDoc = async (id: number) => {
    try {
      await approveDocument(id);
      setDocuments((prev) => prev.filter((d) => d.id !== id));
    } catch {
      setStatus("Could not approve document.");
    }
  };

  const handleRejectDoc = async (id: number) => {
    try {
      await rejectDocument(id);
      setDocuments((prev) => prev.filter((d) => d.id !== id));
    } catch {
      setStatus("Could not reject document.");
    }
  };

  const formatDate = (raw?: string) => {
    if (!raw) return "—";
    try {
      return new Date(raw).toLocaleDateString("en-ZA", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } catch {
      return raw;
    }
  };

  const label = (s?: string) => (s || "").replace(/_/g, " ");

  const statCards = stats
    ? [
        { label: "Total users", value: String(stats.total_users), icon: UsersRound },
        { label: "Verified mechanics", value: String(stats.verified_mechanics), icon: ShieldCheck },
        { label: "Active bookings", value: String(stats.active_bookings), icon: Wrench },
        { label: "Pending docs", value: String(stats.pending_verifications), icon: AlertTriangle },
        { label: "Payments received", value: String(stats.successful_payments), icon: DollarSign },
        { label: "Visits today", value: String(stats.visits_today), icon: Activity },
      ]
    : [];

  return (
    <Layout className="bg-primary" variant="admin">
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Badge className="mb-4 bg-primary text-primary-foreground">
            Platform admin
          </Badge>
          <h1 className="text-4xl font-semibold text-foreground">Dashboard</h1>
        </div>

        <Tabs onValueChange={handleTabChange} value={activeTab}>
          <TabsList className="mb-6 flex-wrap">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="providers">Providers</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>

          {/* === OVERVIEW === */}
          <TabsContent value="overview">
            {loading.overview ? (
              <StatusMessage message="Loading overview..." />
            ) : (
              <>
                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {statCards.map((stat) => {
                    const Icon = stat.icon;
                    return (
                      <Card key={stat.label} className="rounded-lg bg-card">
                        <CardHeader className="flex flex-row items-center justify-between">
                          <CardTitle className="text-sm font-medium text-muted-foreground">
                            {stat.label}
                          </CardTitle>
                          <span className="rounded-md bg-primary p-2 text-primary-foreground">
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

                {status && <StatusMessage className="mt-4" message={status} />}

                <Card className="mt-8 rounded-lg bg-card">
                  <CardHeader>
                    <CardTitle>Quick actions</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-wrap gap-3">
                    <Button onClick={() => setActiveTab("documents")} variant="outline">
                      Review documents ({documents.length})
                    </Button>
                    <Button onClick={() => setActiveTab("users")} variant="outline">
                      Manage users
                    </Button>
                    <Button onClick={() => setActiveTab("providers")} variant="outline">
                      Manage providers
                    </Button>
                  </CardContent>
                </Card>
              </>
            )}
          </TabsContent>

          {/* === USERS === */}
          <TabsContent value="users">
            {loading.users ? (
              <StatusMessage message="Loading users..." />
            ) : users.length === 0 ? (
              <Card className="rounded-lg bg-card">
                <CardContent className="py-8 text-center text-muted-foreground">
                  No users found.
                </CardContent>
              </Card>
            ) : (
              <Card className="rounded-lg bg-card overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>{user.id}</TableCell>
                        <TableCell>
                          {user.first_name} {user.last_name}
                        </TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{user.role}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={
                              user.status === "active"
                                ? "bg-emerald-100 text-emerald-800"
                                : user.status === "suspended"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-gray-100 text-gray-800"
                            }
                            variant="outline"
                          >
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            {user.status !== "suspended" && (
                              <Button
                                onClick={() => handleSuspend(user.id)}
                                size="sm"
                                variant="outline"
                              >
                                Suspend
                              </Button>
                            )}
                            <Button
                              onClick={() => handleDeleteUser(user.id)}
                              size="sm"
                              variant="destructive"
                            >
                              Delete
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            )}
          </TabsContent>

          {/* === PROVIDERS === */}
          <TabsContent value="providers">
            {loading.providers ? (
              <StatusMessage message="Loading providers..." />
            ) : providers.length === 0 ? (
              <Card className="rounded-lg bg-card">
                <CardContent className="py-8 text-center text-muted-foreground">
                  No providers found.
                </CardContent>
              </Card>
            ) : (
              <Card className="rounded-lg bg-card overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Business</TableHead>
                      <TableHead>Owner</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Verified</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {providers.map((p) => (
                      <TableRow key={p.id}>
                        <TableCell>{p.id}</TableCell>
                        <TableCell>{p.business_name || "—"}</TableCell>
                        <TableCell>
                          {p.first_name} {p.last_name}
                        </TableCell>
                        <TableCell>{p.email}</TableCell>
                        <TableCell>
                          {p.verification_badge ? (
                            <Badge className="bg-emerald-100 text-emerald-800" variant="outline">
                              <CheckCircle2 className="size-3 mr-1" /> Verified
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="bg-amber-100 text-amber-800">
                              Pending
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {p.provider_status || "active"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            {!p.verification_badge && (
                              <Button
                                onClick={() => handleVerify(p.id)}
                                size="sm"
                                variant="outline"
                              >
                                Verify
                              </Button>
                            )}
                            <Button
                              onClick={() => handleDeleteProvider(p.id)}
                              size="sm"
                              variant="destructive"
                            >
                              Delete
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            )}
          </TabsContent>

          {/* === BOOKINGS === */}
          <TabsContent value="bookings">
            <Card className="rounded-lg bg-card overflow-x-auto">
              <CardHeader>
                <CardTitle>All bookings</CardTitle>
                <CardDescription>
                  Read-only view of all platform bookings. Use overview or provider
                  dashboards for status management.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {payments.length === 0 ? (
                  <p className="py-4 text-center text-muted-foreground">
                    No booking data available.
                  </p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Provider</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {payments.map((p, i) => (
                        <TableRow key={p.id || i}>
                          <TableCell>#{p.id}</TableCell>
                          <TableCell>
                            {p.payer_first_name} {p.payer_last_name}
                          </TableCell>
                          <TableCell>{p.payer_email}</TableCell>
                          <TableCell className="max-w-[200px] truncate">
                            {p.booking_description || "—"}
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{label(p.payment_status)}</Badge>
                          </TableCell>
                          <TableCell>{formatDate(p.created_at)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* === PAYMENTS === */}
          <TabsContent value="payments">
            <Card className="rounded-lg bg-card overflow-x-auto">
              <CardHeader>
                <CardTitle>Payment ledger</CardTitle>
                <CardDescription>
                  All payments processed through the platform.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loading.payments ? (
                  <StatusMessage message="Loading payments..." />
                ) : payments.length === 0 ? (
                  <p className="py-4 text-center text-muted-foreground">
                    No payments found.
                  </p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Payer</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Booking</TableHead>
                        <TableHead>Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {payments.map((p, i) => (
                        <TableRow key={p.id || i}>
                          <TableCell>{p.id}</TableCell>
                          <TableCell>
                            {p.payer_first_name} {p.payer_last_name}
                            <br />
                            <span className="text-xs text-muted-foreground">
                              {p.payer_email}
                            </span>
                          </TableCell>
                          <TableCell>
                            {p.currency || "ZAR"} {p.amount || "—"}
                          </TableCell>
                          <TableCell>
                            <Badge
                              className={
                                p.payment_status === "successful"
                                  ? "bg-emerald-100 text-emerald-800"
                                  : p.payment_status === "pending"
                                    ? "bg-amber-100 text-amber-800"
                                    : "bg-red-100 text-red-800"
                              }
                              variant="outline"
                            >
                              {label(p.payment_status)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {p.booking_description
                              ? `${p.booking_description.slice(0, 40)}...`
                              : "—"}
                          </TableCell>
                          <TableCell>{formatDate(p.created_at)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* === DOCUMENTS === */}
          <TabsContent value="documents">
            {loading.documents ? (
              <StatusMessage message="Loading documents..." />
            ) : documents.length === 0 ? (
              <Card className="rounded-lg bg-card">
                <CardContent className="py-8 text-center text-muted-foreground">
                  No pending documents to review.
                </CardContent>
              </Card>
            ) : (
              <Card className="rounded-lg bg-card overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Provider</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Uploaded</TableHead>
                      <TableHead>Preview</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {documents.map((doc) => (
                      <TableRow key={doc.id}>
                        <TableCell>{doc.id}</TableCell>
                        <TableCell>
                          {doc.first_name} {doc.last_name}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {label(doc.doc_type)}
                          </Badge>
                        </TableCell>
                        <TableCell>{formatDate(doc.created_at)}</TableCell>
                        <TableCell>
                          {doc.thumbnail_url ? (
                            <div className="relative">
                              <img
                                alt="Thumbnail"
                                className="size-10 rounded object-cover cursor-pointer"
                                src={doc.thumbnail_url}
                                onClick={() =>
                                  doc.ocr_text &&
                                  alert(`OCR Text:\n\n${doc.ocr_text}`)
                                }
                              />
                              {doc.ocr_text && (
                                <span className="absolute -bottom-1 -right-1 flex size-4 items-center justify-center rounded-full bg-primary text-[8px] text-primary-foreground">
                                  <Eye className="size-3" />
                                </span>
                              )}
                            </div>
                          ) : (
                            <span className="text-xs text-muted-foreground">—</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button
                              onClick={() => handleApproveDoc(doc.id)}
                              size="sm"
                              variant="outline"
                              className="text-emerald-600"
                            >
                              <CheckCircle2 className="size-3 mr-1" />
                              Approve
                            </Button>
                            <Button
                              onClick={() => handleRejectDoc(doc.id)}
                              size="sm"
                              variant="outline"
                              className="text-red-600"
                            >
                              <XCircle className="size-3 mr-1" />
                              Reject
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </section>
    </Layout>
  );
}

export type UserRole = "driver" | "mechanic" | "admin";

export type ApiResponse<T> = {
  data: T;
  message?: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = {
  name: string;
  email: string;
  password: string;
  role: Exclude<UserRole, "admin">;
};

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
};

export type DriverProfilePayload = {
  firstName: string;
  lastName: string;
  phone: string;
  location: string;
  vehicleMake: string;
  vehicleModel: string;
  vehicleYear: string;
  notes?: string;
};

export type MechanicProfilePayload = {
  businessName: string;
  ownerName: string;
  email: string;
  phone: string;
  location: string;
  specialties: string[];
  bio: string;
  availability: string;
};

export type Mechanic = {
  id: string;
  name: string;
  businessName: string;
  location: string;
  specialties: string[];
  rating: number;
  reviewCount: number;
  responseTime: string;
  bio: string;
  verified: boolean;
};

export type AdminStats = {
  users: number;
  mechanics: number;
  activeJobs: number;
  disputes: number;
};

export type AdminActivity = {
  id: string;
  actor: string;
  action: string;
  status: "info" | "success" | "warning";
  createdAt: string;
};

type RequestOptions = {
  method?: "GET" | "POST";
  body?: unknown;
  query?: Record<string, string | undefined>;
};

const buildUrl = (path: string, query?: RequestOptions["query"]) => {
  const url = new URL(path, window.location.origin);

  Object.entries(query ?? {}).forEach(([key, value]) => {
    if (value) {
      url.searchParams.set(key, value);
    }
  });

  return `${url.pathname}${url.search}`;
};

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const response = await fetch(buildUrl(path, options.query), {
    method: options.method ?? "GET",
    headers: {
      "Content-Type": "application/json",
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  if (!response.ok) {
    const fallback = `Request failed with status ${response.status}`;
    let message: string;

    if (response.headers.get("content-type")?.includes("application/json")) {
      const payload = (await response.json()) as { message?: string };
      message = payload.message ?? fallback;
    } else {
      const text = await response.text();
      message = text || fallback;
    }

    throw new Error(message);
  }

  return response.json() as Promise<T>;
}

export const api = {
  login: (payload: LoginPayload) =>
    request<ApiResponse<{ user: AuthUser; token: string }>>("/api/auth/login", {
      method: "POST",
      body: payload,
    }),
  register: (payload: RegisterPayload) =>
    request<ApiResponse<{ user: AuthUser }>>("/api/auth/register", {
      method: "POST",
      body: payload,
    }),
  createDriverProfile: (payload: DriverProfilePayload) =>
    request<ApiResponse<DriverProfilePayload>>("/api/driver/profile", {
      method: "POST",
      body: payload,
    }),
  getDriverProfile: () =>
    request<ApiResponse<DriverProfilePayload>>("/api/driver/profile"),
  saveMechanicProfile: (payload: MechanicProfilePayload) =>
    request<ApiResponse<MechanicProfilePayload>>("/api/mechanic/profile", {
      method: "POST",
      body: payload,
    }),
  getMechanic: (id: string) =>
    request<ApiResponse<Mechanic>>(`/api/mechanic/${id}`),
  searchMechanics: (query: { location?: string; specialty?: string }) =>
    request<ApiResponse<Mechanic[]>>("/api/mechanic/search", { query }),
  getAdminStats: () => request<ApiResponse<AdminStats>>("/api/admin/stats"),
  getAdminActivity: () =>
    request<ApiResponse<AdminActivity[]>>("/api/admin/activity"),
};

const API_BASE_URL = "/api";

async function request(endpoint: string, options: RequestInit = {}) {
  const token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Something went wrong");
  }

  return data;
}

export const api = {
  auth: {
    login: (credentials: any) => request("/auth/login", { method: "POST", body: JSON.stringify(credentials) }),
    register: (data: any) => request("/auth/register", { method: "POST", body: JSON.stringify(data) }),
  },
  user: {
    getProfile: () => request("/user/profile"),
    getTransactions: () => request("/user/transactions"),
  },
  wallet: {
    fund: (data: any) => request("/wallet/fund", { method: "POST", body: JSON.stringify(data) }),
  },
  services: {
    getAll: () => request("/services"),
    buy: (data: any) => request("/services/buy", { method: "POST", body: JSON.stringify(data) }),
  },
  admin: {
    getStats: () => request("/admin/stats"),
  },
};

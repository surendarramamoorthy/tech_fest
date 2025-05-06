// client/src/services/authService.ts
const API_URL = "http://localhost:5000/api/auth";

export const login = async (email: string, password: string) => {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) throw new Error("Login failed");
  return await res.json();
};

export const register = async (name: string, email: string, password: string, role?: string) => {
  const res = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password, role }),
  });

  if (!res.ok) throw new Error("Registration failed");
  return await res.json();
};

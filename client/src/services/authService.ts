// const API_URL = "http://localhost:5000/api"
// const API_URL = `${import.meta.env.VITE_API_BASE_URL}`;
const API = `${import.meta.env.VITE_API_BASE_URL}/auth`;


export async function loginUser(credentials: { email: string; password: string }) {
  const response = await fetch(`${API}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Login failed");
  }

  // ✅ Add this line
  localStorage.setItem("token", data.token);
  localStorage.setItem("user", JSON.stringify(data.user));

  return data.user;
}

export function logoutUser() {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
}

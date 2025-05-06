const API_URL = "http://localhost:5000/api"

export async function loginUser(credentials: { email: string; password: string }) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  })

  const data = await response.json()
  if (!response.ok) {
    throw new Error(data.message || "Login failed")
  }

  localStorage.setItem("user", JSON.stringify(data.user))
  return data.user
}

export function logoutUser() {
  localStorage.removeItem("user")
}

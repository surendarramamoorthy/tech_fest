const API = `${import.meta.env.VITE_API_BASE_URL}/events`;

const authHeader = () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Not logged in");
  return {
    Authorization: `Bearer ${token}`,
  };
};

export const registerForEvent = async (eventId: number) => {
  const res = await fetch(`${API}/register`, {
    method: "POST",
    headers: {
      ...authHeader(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ eventId }),
  });
  if (!res.ok) throw new Error("Registration failed");
  return res.json();
};

export const getMyRegistrations = async () => {
  const res = await fetch(`${API}/my-registrations`, {
    headers: authHeader(),
  });
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
};

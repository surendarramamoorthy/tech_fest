// const API_BASE = "http://localhost:5000/api/admin";
// const API_BASE = `${import.meta.env.VITE_API_BASE_URL}/admin`;
const API = `${import.meta.env.VITE_API_BASE_URL}/admin`;

const getAuthHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

// ✅ Fetch pending verifications
export const fetchPendingVerifications = async () => {
  const res = await fetch(`${API_BASE}/verifications`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Failed to fetch pending data");
  return res.json();
};

export const approveUser = async (id: number) => {
  const res = await fetch(`${API_BASE}/verifications/user/${id}/approve`, {
    method: "POST",
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Failed to approve user");
};

export const rejectUser = async (id: number) => {
  const res = await fetch(`${API_BASE}/verifications/user/${id}/reject`, {
    method: "POST",
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Failed to reject user");
};

export const approveEvent = async (id: number) => {
  const res = await fetch(`${API_BASE}/verifications/event/${id}/approve`, {
    method: "POST",
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Failed to approve event");
};

export const rejectEvent = async (id: number) => {
  const res = await fetch(`${API_BASE}/verifications/event/${id}/reject`, {
    method: "POST",
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Failed to reject event");
};

export const fetchStats = async () => {
  const res = await fetch(`${API_BASE}/stats`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Failed to fetch stats");
  return res.json();
};

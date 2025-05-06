const API_BASE = "http://localhost:5000/api/admin";
const token = localStorage.getItem("token");

const fetchWithAuth = (url: string, method: string = "GET") => {
    return fetch(url, {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

// ✅ Fetch pending verifications
export const fetchPendingVerifications = async () => {
  const response = await fetch(`${API_BASE}/verifications`);
  if (!response.ok) throw new Error("Failed to fetch pending data");
  return response.json();
};

// ✅ User Approvals
export const approveUser = async (id: number) => {
  const res = await fetch(`${API_BASE}/verifications/user/${id}/approve`, { method: "POST" });
  if (!res.ok) throw new Error("Failed to approve user");
};

export const rejectUser = async (id: number) => {
  const res = await fetch(`${API_BASE}/verifications/user/${id}/reject`, { method: "POST" });
  if (!res.ok) throw new Error("Failed to reject user");
};

// ✅ Event Approvals
export const approveEvent = async (id: number) => {
  const res = await fetch(`${API_BASE}/verifications/event/${id}/approve`, { method: "POST" });
  if (!res.ok) throw new Error("Failed to approve event");
};

export const rejectEvent = async (id: number) => {
  const res = await fetch(`${API_BASE}/verifications/event/${id}/reject`, { method: "POST" });
  if (!res.ok) throw new Error("Failed to reject event");
};

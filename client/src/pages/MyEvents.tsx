import { useEffect, useState } from "react";
import { getMyRegistrations } from "../services/eventService";

export default function MyEvents() {
  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
    getMyRegistrations()
      .then(setRegistrations)
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Registered Events</h2>
      {registrations.length === 0 ? (
        <p>You haven’t registered for any events yet.</p>
      ) : (
        <div className="space-y-4">
          {registrations.map((r: any) => (
            <div key={r.id} className="p-4 border rounded bg-white shadow-sm">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-semibold">{r.name}</h3>
                  <p className="text-sm text-gray-600">{r.category}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    r.status === "approved"
                      ? "bg-green-200 text-green-800"
                      : r.status === "rejected"
                      ? "bg-red-200 text-red-800"
                      : "bg-yellow-200 text-yellow-800"
                  }`}
                >
                  {r.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

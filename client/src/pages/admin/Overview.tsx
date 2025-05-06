import { useEffect, useState } from 'react';

export default function Overview() {
  const [stats, setStats] = useState({ totalUsers: 0, pendingUsers: 0, totalEvents: 0, pendingEvents: 0 });

  useEffect(() => {
    fetch("http://localhost:5000/api/admin/stats", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then(res => res.json())
      .then(data => setStats(data));
  }, []);

  return (
    <div className="grid grid-cols-2 gap-6 mt-8">
      <StatCard label="Total Users" value={stats.totalUsers} />
      <StatCard label="Pending Users" value={stats.pendingUsers} />
      <StatCard label="Total Events" value={stats.totalEvents} />
      <StatCard label="Pending Events" value={stats.pendingEvents} />
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-white p-6 rounded shadow text-center">
      <h2 className="text-lg font-medium">{label}</h2>
      <p className="text-3xl font-bold mt-2 text-blue-700">{value}</p>
    </div>
  );
}

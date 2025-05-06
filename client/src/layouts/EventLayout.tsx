// src/layouts/EventLayout.tsx
import { Outlet, Link } from "react-router-dom"
import { useUser } from "../context/UserContext"

export default function EventLayout() {
  const { user, logout } = useUser()

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-indigo-800 text-white p-4 space-y-4">
        <h2 className="text-xl font-bold">Event Coordinator</h2>
        <nav className="flex flex-col space-y-2">
          <Link to="/event-dashboard" className="hover:text-yellow-300">Dashboard</Link>
          <Link to="/event-dashboard/submissions" className="hover:text-yellow-300">Submissions</Link>
          <Link to="/" className="hover:text-yellow-300">Home</Link>
        </nav>
        <button onClick={logout} className="mt-10 text-red-400 hover:text-red-600">
          Logout
        </button>
      </aside>

      {/* Content */}
      <main className="flex-1 p-6 bg-gray-100">
        <header className="mb-4 border-b pb-2 flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Welcome, {user?.name}</h1>
        </header>
        <Outlet />
      </main>
    </div>
  )
}

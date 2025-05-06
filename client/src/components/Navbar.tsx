// src/components/Navbar.tsx

import { useUser } from "../context/UserContext"
import { useNavigate, Link } from "react-router-dom"
import { logoutUser } from "../services/authService"

export default function Navbar() {
  const { user, setUser } = useUser()
  const navigate = useNavigate()

  const handleLogout = () => {
    logoutUser()
    setUser(null)
    navigate("/")
  }

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center">
      <div className="font-bold text-lg">
        <Link to="/">YUVA'25</Link>
      </div>
      <div className="space-x-4 flex items-center">
        {user ? (
          <>
            {/* 🔒 Admin-only links */}
            {user.role === "admin" && (
              <>
                <Link to="/admin" className="hover:underline">
                  Dashboard
                </Link>
                <Link to="/admin/users" className="hover:underline">
                  Manage Users
                </Link>
                <Link to="/admin/verifications" className="hover:underline">
                  Pending Approvals
                </Link>
              </>
            )}

            {/* 👨‍💼 Event Coordinator or Admin */}
            {["admin", "event_coordinator"].includes(user.role) && (
              <Link to="/create-event" className="hover:underline">
                Add Event
              </Link>
            )}

            {/* 👥 General or any logged-in user */}
            <Link to="/events" className="hover:underline">
              Events
            </Link>
            <Link to="/my-events" className="hover:underline">
              My Events
            </Link>

            {/* ✅ Common */}
            <span>Welcome, {user.email}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:underline">
              Login
            </Link>
            <Link to="/register" className="hover:underline">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}

import { useUser } from "../context/UserContext"
import { useNavigate } from "react-router-dom"
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
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between">
      <div className="font-bold text-lg">YUVA'25</div>
      <div className="space-x-4">
        {user ? (
          <>
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
            <a href="/login" className="hover:underline">
              Login
            </a>
            <a href="/register" className="hover:underline">
              Register
            </a>
          </>
        )}
      </div>
    </nav>
  )
}

// src/components/ProtectedRoute.tsx
import { Navigate } from "react-router-dom"
import { useUser } from "../context/UserContext"

interface Props {
  allowedRoles: string[]
  children: React.ReactNode
}

export default function ProtectedRoute({ allowedRoles, children }: Props) {
  const { user } = useUser()

  // 🧠 1. No user = redirect to login
  if (!user) {
    return <Navigate to="/login" replace />
  }

  // ❌ 2. Logged in but not allowed role
  if (!allowedRoles.includes(user.role)) {
    return (
      <div className="text-center mt-20">
        <h1 className="text-2xl text-red-600 font-semibold">403 – Access Denied</h1>
        <p className="text-gray-600 mt-2">
          You do not have permission to view this page.
        </p>
      </div>
    )
    // OR optionally: return <Navigate to="/" replace />
  }

  // ✅ 3. User is authenticated and authorized
  return <>{children}</>
}

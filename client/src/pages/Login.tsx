import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { loginUser } from "../services/authService"
import { useUser } from "../context/UserContext"

export default function Login() {
  const { setUser } = useUser()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ email: "", password: "" })
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    try {
      const user = await loginUser(formData)
      setUser(user)
      
      // 🔁 Redirect based on role
      switch (user.role) {
        case "admin":
          navigate("/admin")
          break
        case "event_coordinator":
          navigate("/event-dashboard")
          break
        case "finance_coordinator":
          navigate("/finance-dashboard")
          break
        default:
          navigate("/dashboard")
      }
    } catch (err: any) {
      setError(err.message || "Login failed")
    }
  }
  
  return (
    <div className="max-w-md mx-auto mt-20 bg-white shadow-md p-8 rounded">
      <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
      {error && <p className="text-red-500 mb-3 text-center">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 border rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  )
}

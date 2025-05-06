// src/routes/AppRoutes.tsx
import { Routes, Route } from "react-router-dom"
import App from "../App"

import Home from "../pages/Home"
import Events from "../pages/Events"
import Login from "../pages/Login"
import Register from "../pages/Register"

import AdminDashboard from "../pages/AdminDashboard"
import EventDashboard from "../pages/EventDashboard"
import FinanceDashboard from "../pages/FinanceDashboard"
import UserDashboard from "../pages/UserDashboard"

import ProtectedRoute from "../components/ProtectedRoute"

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="events" element={<Events />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        <Route
          path="admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="event-dashboard"
          element={
            <ProtectedRoute allowedRoles={["event_coordinator"]}>
              <EventDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="finance-dashboard"
          element={
            <ProtectedRoute allowedRoles={["finance_coordinator"]}>
              <FinanceDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="dashboard"
          element={
            <ProtectedRoute allowedRoles={["general"]}>
              <UserDashboard />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  )
}

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

import AdminLayout from "../layouts/AdminLayout"
import Overview from "../pages/admin/Overview"
import Users from "../pages/admin/Users"

import EventLayout from "../layouts/EventLayout"
import EventOverview from "../pages/event/Overview"
import Submissions from "../pages/event/Submissions"

import FinanceLayout from "../layouts/FinanceLayout"
import FinanceOverview from "../pages/finance/Overview"
import Transactions from "../pages/finance/Transactions"

import PendingVerifications from "../pages/admin/PendingVerifications"

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
        <Route
            path="admin"
            element={
                <ProtectedRoute allowedRoles={["admin"]}>
                <AdminLayout />
                </ProtectedRoute>
            }
            >
            <Route index element={<Overview />} />
            <Route path="users" element={<Users />} />
        </Route>
        <Route
            path="event-dashboard"
            element={
                <ProtectedRoute allowedRoles={["event_coordinator"]}>
                <EventLayout />
                </ProtectedRoute>
            }
            >
            <Route index element={<EventOverview />} />
            <Route path="submissions" element={<Submissions />} />
        </Route>
        <Route
            path="finance-dashboard"
            element={
                <ProtectedRoute allowedRoles={["finance_coordinator"]}>
                <FinanceLayout />
                </ProtectedRoute>
            }
            >
            <Route index element={<FinanceOverview />} />
            <Route path="transactions" element={<Transactions />} />
        </Route>

        <Route
            path="admin"
            element={
                <ProtectedRoute allowedRoles={["admin"]}>
                <AdminLayout />
                </ProtectedRoute>
            }
            >
            <Route index element={<Overview />} />
            <Route path="users" element={<Users />} />
            <Route path="verifications" element={<PendingVerifications />} />
        </Route>


    </Routes>
  )
}

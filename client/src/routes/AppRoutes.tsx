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

import PendingVerifications from "../pages/admin/PendingVerifications"
import Users from "../pages/admin/Users"

import EventOverview from "../pages/event/Overview"
import Submissions from "../pages/event/Submissions"

import FinanceOverview from "../pages/finance/Overview"
import Transactions from "../pages/finance/Transactions"

import EventList from "../pages/EventList"
import MyEvents from "../pages/MyEvents"
import CreateEvent from "../pages/CreateEvent"
import { Navigate } from "react-router-dom"

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="events" element={<EventList />} />

        <Route
          path="my-events"
          element={
            <ProtectedRoute allowedRoles={["general", "admin", "event_coordinator"]}>
              <MyEvents />
            </ProtectedRoute>
          }
        />
        <Route
        path="admin"
        element={<Navigate to="/admin/dashboard" replace />}
        />

        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        {/* Admin Section */}
        <Route
          path="admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="admin/manage-users"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Users />
            </ProtectedRoute>
          }
        />
        <Route
          path="admin/pending-approvals"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <PendingVerifications />
            </ProtectedRoute>
          }
        />

        {/* Event Coordinator */}
        <Route
          path="event-dashboard"
          element={
            <ProtectedRoute allowedRoles={["event_coordinator"]}>
              <EventDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="event-dashboard/overview"
          element={
            <ProtectedRoute allowedRoles={["event_coordinator"]}>
              <EventOverview />
            </ProtectedRoute>
          }
        />
        <Route
          path="event-dashboard/submissions"
          element={
            <ProtectedRoute allowedRoles={["event_coordinator"]}>
              <Submissions />
            </ProtectedRoute>
          }
        />

        {/* Finance Coordinator */}
        <Route
          path="finance-dashboard"
          element={
            <ProtectedRoute allowedRoles={["finance_coordinator"]}>
              <FinanceDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="finance-dashboard/overview"
          element={
            <ProtectedRoute allowedRoles={["finance_coordinator"]}>
              <FinanceOverview />
            </ProtectedRoute>
          }
        />
        <Route
          path="finance-dashboard/transactions"
          element={
            <ProtectedRoute allowedRoles={["finance_coordinator"]}>
              <Transactions />
            </ProtectedRoute>
          }
        />

        {/* Create Event */}
        <Route
          path="create-event"
          element={
            <ProtectedRoute allowedRoles={["admin", "event_coordinator"]}>
              <CreateEvent />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  )
}

// src/components/Navbar.tsx
import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";

function Navbar() {
  const { user, logout } = useUser();

  return (
    <nav className="bg-blue-600 text-white px-4 py-2 flex justify-between items-center">
      <h1 className="text-xl font-bold">TechFest</h1>
      <div className="flex items-center gap-4">
        <Link to="/">Home</Link>
        <Link to="/events">Events</Link>
        {user && user.role === "admin" && <Link to="/dashboard">Admin</Link>}
        {user && user.role === "event_coordinator" && <Link to="/dashboard">Coordinator</Link>}
        {!user ? (
          <Link to="/login">Login</Link>
        ) : (
          <button onClick={logout} className="bg-red-600 px-2 py-1 rounded">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

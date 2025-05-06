// client/src/components/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

interface Props {
  children: JSX.Element;
  allowedRoles: string[];
}

const ProtectedRoute = ({ children, allowedRoles }: Props) => {
  const { user } = useUser();

  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;

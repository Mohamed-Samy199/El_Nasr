import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../../store/auth.store.js";

const ProtectedRoute = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/dashboard/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;

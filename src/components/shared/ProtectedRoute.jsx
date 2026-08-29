import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../../store/auth.store.js";

/**
 * بيحمي أي مجموعة routes جوه لوحة التحكم — لو مفيش توكن صالح، يحوّل لصفحة اللوجن.
 * مستخدم كـ layout route في router.jsx (<Route element={<ProtectedRoute />}>).
 */
const ProtectedRoute = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/dashboard/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;

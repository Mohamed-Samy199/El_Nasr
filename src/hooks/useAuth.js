import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { authApi } from "../features/auth/api/authApi.js";
import { useAuthStore } from "../store/auth.store.js";

/**
 * بيغلّف عملية اللوجن: نداء الـ API + حفظ الـ session في الـ store + تحويل
 * المستخدم للوحة التحكم. أي component عايز يعمل login بيستخدم الـ hook ده
 * بدل ما يكرر نفس المنطق.
 */
export const useAuth = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const loginMutation = useMutation({
    mutationFn: authApi.login,
    onSuccess: (response) => {
      const { user, token } = response.data;
      login(user, token);
      toast.success(`Welcome back, ${user.name}`);
      navigate("/dashboard");
    },
    onError: (error) => {
      toast.error(error.message || "Login failed");
    },
  });

  return { loginMutation };
};

import axios from "axios";
import { API_URL } from "../config/env.config.js";
import { useAuthStore } from "../store/auth.store.js";
import { useLanguageStore } from "../store/language.store.js";

export const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 15000,
});

// ── Request interceptor ──────────────────────────────────────────────────
// بيضيف التوكن (لو موجود) وهيدر اللغة الحالية مع كل نداء تلقائيًا
axiosInstance.interceptors.request.use((config) => {
  const { token } = useAuthStore.getState();
  const { currentLang } = useLanguageStore.getState();

  if (token) {
    // ملاحظة: التوكن متخزن بالفعل بصيغة "Bearer <token>" زي ما بيرجع من الباك اند
    config.headers.Authorization = token;
  }

  config.headers["Accept-Language"] = currentLang;

  return config;
});

// ── Response interceptor ─────────────────────────────────────────────────
// لو التوكن انتهى أو بقى غير صالح (401)، نعمل logout تلقائي بدل ما نسيب المستخدم
// في حالة "متسجل دخول" وهمية والـ API بيرفض كل نداء
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
    }
    return Promise.reject(error);
  }
);

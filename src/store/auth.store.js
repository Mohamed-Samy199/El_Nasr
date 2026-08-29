import { create } from "zustand";

const TOKEN_KEY = "elnasr_token";
const USER_KEY = "elnasr_user";

// بنقرأ من localStorage عند أول تحميل عشان الجلسة تفضل شغالة بعد ما المستخدم يقفل التاب
const storedToken = localStorage.getItem(TOKEN_KEY);
const storedUser = localStorage.getItem(USER_KEY);

export const useAuthStore = create((set) => ({
  user: storedUser ? JSON.parse(storedUser) : null,
  token: storedToken || null,
  isAuthenticated: !!storedToken,

  login: (user, token) => {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    set({ user, token, isAuthenticated: true });
  },

  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    set({ user: null, token: null, isAuthenticated: false });
  },
}));

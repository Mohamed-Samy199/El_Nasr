import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  server: {
    port: 5173,
    // بيسمح بالوصول من أجهزة تانية على نفس الشبكة المحلية وقت التطوير
    host: true,
  },

  build: {
    // بيقسم المكتبات الكبيرة في ملفات منفصلة عن كود المشروع
    // عشان المتصفح يقدر يكاش (cache) المكتبات لوحدها ومتغيرش مع كل نشر جديد
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
          query: ["@tanstack/react-query", "axios"],
          forms: ["formik", "yup"],
          i18n: ["i18next", "react-i18next", "i18next-browser-languagedetector"],
          // gsap مستخدمة في صفحة واحدة بس (الهيرو) — عزلها في chunk منفصل
          // يمنعها من تكبير حجم كل صفحة تانية محتاجاش الأنيميشن دي
          animation: ["gsap"],
        },
      },
    },
    // بيقلل من تحذيرات حجم الـ chunk للمكتبات الكبيرة زي framer-motion
    chunkSizeWarningLimit: 700,
  },
});
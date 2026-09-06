// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import path from "path";

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],

//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./src"),
//     },
//   },

//   server: {
//     port: 5173,
//     // بيسمح بالوصول من أجهزة تانية على نفس الشبكة المحلية وقت التطوير
//     host: true,
//   },

//   build: {
//     // بيقسم المكتبات الكبيرة في ملفات منفصلة عن كود المشروع
//     // عشان المتصفح يقدر يكاش (cache) المكتبات لوحدها ومتغيرش مع كل نشر جديد
//     rollupOptions: {
//       output: {
//         manualChunks: {
//           vendor: ["react", "react-dom", "react-router-dom"],
//           query: ["@tanstack/react-query", "axios"],
//           forms: ["formik", "yup"],
//           i18n: ["i18next", "react-i18next", "i18next-browser-languagedetector"],
//           // gsap مستخدمة في صفحة واحدة بس (الهيرو) — عزلها في chunk منفصل
//           // يمنعها من تكبير حجم كل صفحة تانية محتاجاش الأنيميشن دي
//           animation: ["gsap"],
//           // swiper مستخدمة في صفحة "من نحن" بس (سلايدر صور المصنع) — نفس
//           // منطق العزل
//           carousel: ["swiper"],
//         },
//       },
//     },
//     // بيقلل من تحذيرات حجم الـ chunk للمكتبات الكبيرة زي framer-motion
//     chunkSizeWarningLimit: 700,
//   },
// });




import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { VitePWA } from "vite-plugin-pwa"; 

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // ⬅️ جديد: تحويل الموقع لـ PWA
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "apple-touch-icon.png"],
      manifest: {
        name: "شركة النصر لتعبئة الحاصلات الزراعية",
        short_name: "النصر",
        description:
          "من أرض مصر إلى العالم — منتجات زراعية بأعلى معايير الجودة العالمية.",
        theme_color: "#2f8f5f",
        background_color: "#f8f6f0",
        display: "standalone",
        orientation: "portrait",
        start_url: "/",
        scope: "/",
        lang: "ar",
        dir: "rtl",
        icons: [
          { src: "/pwa-192x192.png", sizes: "192x192", type: "image/png" },
          { src: "/pwa-512x512.png", sizes: "512x512", type: "image/png" },
          {
            src: "/pwa-maskable-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable",
          },
          {
            src: "/pwa-maskable-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,webp,woff2}"],
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === "image",
            handler: "CacheFirst",
            options: {
              cacheName: "images-cache",
              expiration: { maxEntries: 60, maxAgeSeconds: 30 * 24 * 60 * 60 },
            },
          },
          {
            urlPattern: ({ url }) => url.pathname.startsWith("/api"),
            handler: "NetworkFirst",
            options: { cacheName: "api-cache", networkTimeoutSeconds: 5 },
          },
        ],
      },
      devOptions: {
        enabled: true,
      },
    }),
  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  server: {
    port: 5173,
    host: true,
  },

  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
          query: ["@tanstack/react-query", "axios"],
          forms: ["formik", "yup"],
          i18n: ["i18next", "react-i18next", "i18next-browser-languagedetector"],
          animation: ["gsap"],
          carousel: ["swiper"],
        },
      },
    },
    chunkSizeWarningLimit: 700,
  },
});
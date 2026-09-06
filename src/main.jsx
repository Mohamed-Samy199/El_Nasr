import { registerSW } from "virtual:pwa-register";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import AppProviders from "./app/AppProviders.jsx";

import "./styles/globals.css";
import "./styles/rtl.css";


// بيسجل الـ service worker ويعمل تحديث تلقائي لما يطلع نسخة جديدة من الموقع
registerSW({
  onNeedRefresh() {
    console.log("فيه نسخة جديدة من الموقع متاحة");
  },
  onOfflineReady() {
    console.log("الموقع جاهز يشتغل أوفلاين");
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppProviders />
  </StrictMode>
);

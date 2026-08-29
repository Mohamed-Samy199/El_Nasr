import { create } from "zustand";
import i18n from "../i18n/i18n.config.js";

const RTL_LANGS = ["ar"];

const applyDocumentDirection = (lang) => {
  const dir = RTL_LANGS.includes(lang) ? "rtl" : "ltr";
  document.documentElement.setAttribute("dir", dir);
  document.documentElement.setAttribute("lang", lang);
  return dir;
};

// أول تحميل للصفحة: نظبط الـ <html dir="..."> على القيمة الصح فورًا
// (i18next-browser-languagedetector بيكون بالفعل حدد i18n.language من localStorage)
const initialDir = applyDocumentDirection(i18n.language || "en");

export const useLanguageStore = create((set) => ({
  currentLang: i18n.language || "en",
  dir: initialDir,

  setLanguage: (lang) => {
    i18n.changeLanguage(lang);
    const dir = applyDocumentDirection(lang);
    set({ currentLang: lang, dir });
  },
}));

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "../../public/locales/en/translation.json";
import ar from "../../public/locales/ar/translation.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ar: { translation: ar },
    },

    // English هو الديفولت دايمًا — العميل حدد كده صراحة
    fallbackLng: "en",

    // بيحدد ترتيب اكتشاف اللغة: لو المستخدم غيّرها قبل كده هتتقرأ من localStorage
    // أول حاجة، وإلا هيرجع للديفولت (en) — مش للغة المتصفح
    detection: {
      order: ["localStorage"],
      lookupLocalStorage: "elnasr_lang",
      caches: ["localStorage"],
    },

    interpolation: {
      escapeValue: false, // React أصلاً بيعمل escape لوحده
    },

    react: {
      useSuspense: false, // بيسهّل التعامل مع الـ loading state يدويًا بدل Suspense
    },
  });

export default i18n;

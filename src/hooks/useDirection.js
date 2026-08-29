import { useLanguageStore } from "../store/language.store.js";

/**
 * بيرجع الاتجاه الحالي للصفحة ("ltr" أو "rtl") وبعض الـ helpers
 * المفيدة لأي component محتاج يتصرف بشكل مختلف حسب الاتجاه
 * (زي اتجاه الأيقونات أو ترتيب الفلكس).
 */
export const useDirection = () => {
  const dir = useLanguageStore((state) => state.dir);
  const currentLang = useLanguageStore((state) => state.currentLang);

  return {
    dir,
    isRtl: dir === "rtl",
    currentLang,
    // مفيد لما تكون محتاج تقلب اتجاه أيقونة (زي سهم "التالي")
    flip: dir === "rtl" ? "scale-x-[-1]" : "",
  };
};

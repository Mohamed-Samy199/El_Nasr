import { useQuery } from "@tanstack/react-query";

import PublicHeader from "../../../components/layout/PublicHeader.jsx";
import PublicFooter from "../../../components/layout/PublicFooter.jsx";
import SEO from "../../../components/shared/SEO.jsx";
import { productsApi } from "../api/productsApi.js";
import { useLanguageStore } from "../../../store/language.store.js";
import ScrollToTop from "../../../components/shared/ScrollToTop.jsx";
import ContactFormSection from "../../../components/contact/ContactFormSection.jsx";
import LocationSection from "../../../components/contact/LocationSection.jsx";

const ContactPage = () => {
  const currentLang = useLanguageStore((state) => state.currentLang);
  const isAr = currentLang === "ar";

  // بنجيب المنتجات المنشورة بس عشان الـ select في الفورم — الزائر مينفعش
  // يطلب عرض سعر لمنتج لسه مسودة أو قيد المراجعة
  const { data } = useQuery({
    queryKey: ["published-products", "contact-form"],
    queryFn: () => productsApi.getPublished(),
  });
  const products = data?.data?.result || [];

  return (
    <div className="bg-paper text-ink min-h-screen">
      <SEO
        title="Contact & Request a Quote"
        description="Get in touch with Al Nasr Company for Agricultural Crops Packaging, Asmoun, Egypt, or submit a B2B quote request."
      />
      <PublicHeader />

      <ContactFormSection isAr={isAr} products={products} />
      <LocationSection isAr={isAr} />
      
      <PublicFooter />
      <ScrollToTop />
    </div>
  );
};

export default ContactPage;

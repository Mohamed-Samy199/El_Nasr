// import { useState } from "react";
// import { useParams, NavLink } from "react-router-dom";
// import { useTranslation } from "react-i18next";
// import { useQuery } from "@tanstack/react-query";
// import { ChevronRight } from "lucide-react";

// import PublicHeader from "../../../components/layout/PublicHeader.jsx";
// import PublicFooter from "../../../components/layout/PublicFooter.jsx";
// import SEO from "../../../components/shared/SEO.jsx";
// import { productsApi } from "../api/productsApi.js";
// import QuoteRequestForm from "../components/QuoteRequestForm.jsx";
// import { useLanguageStore } from "../../../store/language.store.js";
// import { getLocalizedField } from "../../../utils/getLocalizedField.js";
// import { ProductDetailsSkeleton } from "../../../components/ui/Skeleton.jsx";

// const SPEC_FIELDS = ["origin", "season", "grade", "packaging"];

// const ProductDetailsPage = () => {
//   const { t } = useTranslation();
//   const { slug } = useParams();
//   const currentLang = useLanguageStore((state) => state.currentLang);
//   const [showQuoteForm, setShowQuoteForm] = useState(false);

//   const { data, isLoading, isError } = useQuery({
//     queryKey: ["product", slug],
//     queryFn: () => productsApi.getBySlug(slug),
//   });

//   const product = data?.data?.product;
//   const images = product?.images || [];

//   if (isLoading) {
//     return (
//       <div className="bg-paper min-h-screen">
//         <SEO title="Loading product..." />
//         <PublicHeader />
//         <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
//           <ProductDetailsSkeleton />
//         </section>
//       </div>
//     );
//   }

//   if (isError || !product) {
//     return (
//       <div className="bg-paper min-h-screen">
//         <SEO title="Product not found" />
//         <PublicHeader />
//         <p className="text-center text-muted-foreground py-24">{t("common.noResults")}</p>
//       </div>
//     );
//   }

//   const productName = getLocalizedField(product, "name", currentLang);

//   return (
//     <div className="bg-paper text-ink min-h-screen">
//       <SEO
//         title={productName}
//         description={getLocalizedField(product, "description", currentLang) || undefined}
//       />
//       <PublicHeader />

//       <section className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
//         {/* Breadcrumb */}
//         <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6 sm:mb-8 overflow-x-auto whitespace-nowrap">
//           <NavLink to="/products" className="hover:text-olive shrink-0">{t("nav.products")}</NavLink>
//           <ChevronRight size={14} className="icon-directional shrink-0" />
//           <span className="text-ink truncate">{productName}</span>
//         </div>

//         <div className="grid md:grid-cols-2 gap-8 md:gap-12">
//           {/* الصور */}
//           <div>
//             <div className="aspect-[4/3] bg-secondary rounded-card overflow-hidden border border-line">
//               {images[0] ? (
//                 <img src={images[0].url} alt={productName} className="w-full h-full object-cover" />
//               ) : (
//                 <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
//                   {t("common.noResults")}
//                 </div>
//               )}
//             </div>
//             {images.length > 1 && (
//               <div className="grid grid-cols-4 gap-3 mt-3">
//                 {images.slice(1).map((img) => (
//                   <div key={img.public_id} className="aspect-square rounded-card overflow-hidden border border-line">
//                     <img src={img.url} alt="" className="w-full h-full object-cover" />
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* التفاصيل */}
//           <div>
//             {product.category && (
//               <span className="text-xs font-medium text-mint uppercase tracking-wide">
//                 {getLocalizedField(product.category, "name", currentLang)}
//               </span>
//             )}
//             <h1 className="font-display text-2xl sm:text-3xl font-semibold text-ink mt-1 mb-4">
//               {productName}
//             </h1>

//             {getLocalizedField(product, "description", currentLang) && (
//               <p className="text-muted-foreground leading-relaxed mb-6">
//                 {getLocalizedField(product, "description", currentLang)}
//               </p>
//             )}

//             {/* على الموبايل: الليبل فوق القيمة (flex-col) — القيم بقت طويلة
//                 بعد بيانات البروشور (زي المقاسات ونسبة الرطوبة مع بعض) ومش
//                 هتتكسر صح جنب بعض في مساحة ضيقة */}
//             <div className="bg-card border border-line rounded-card p-5 mb-6 space-y-4">
//               {SPEC_FIELDS.map((field) => {
//                 const value = getLocalizedField(product, field, currentLang);
//                 if (!value) return null;
//                 return (
//                   <div key={field} className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-0.5 sm:gap-4 text-sm">
//                     <span className="text-muted-foreground shrink-0">{t(`product.${field}`)}</span>
//                     <span className="font-medium text-ink sm:text-end">{value}</span>
//                   </div>
//                 );
//               })}
//               {product.minOrderQty && (
//                 <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-0.5 sm:gap-4 text-sm">
//                   <span className="text-muted-foreground shrink-0">{t("product.minOrderQty")}</span>
//                   <span className="font-medium text-ink numeric sm:text-end">{product.minOrderQty}</span>
//                 </div>
//               )}
//             </div>

//             {!showQuoteForm ? (
//               <button
//                 onClick={() => setShowQuoteForm(true)}
//                 className="w-full sm:w-auto rounded-full bg-olive text-paper text-sm font-medium px-6 py-2.5 hover:bg-[#0f2a20] transition-colors"
//               >
//                 {t("product.requestQuote")}
//               </button>
//             ) : (
//               <div className="bg-card border border-line rounded-card shadow-card p-5 sm:p-6">
//                 <QuoteRequestForm productId={product._id} />
//               </div>
//             )}
//           </div>
//         </div>
//       </section>

//       <PublicFooter />
//     </div>
//   );
// };

// export default ProductDetailsPage;





import { useState, useRef, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { ChevronRight, ShieldCheck, MapPin, Calendar, Award, PackageCheck, ArrowRight, ArrowLeft } from "lucide-react";

import PublicHeader from "../../../components/layout/PublicHeader.jsx";
import PublicFooter from "../../../components/layout/PublicFooter.jsx";
import SEO from "../../../components/shared/SEO.jsx";
import { productsApi } from "../api/productsApi.js";
import QuoteRequestForm from "../components/QuoteRequestForm.jsx";
import { useLanguageStore } from "../../../store/language.store.js";
import { getLocalizedField } from "../../../utils/getLocalizedField.js";
import { ProductDetailsSkeleton } from "../../../components/ui/Skeleton.jsx";
import ProductsSection from "../../../components/home/ProductsSection.jsx";
import { spawnLeafBurst } from "../../../utils/leafBurst.js";
import ScrollToTop from "../../../components/shared/ScrollToTop.jsx";




// كل صندوق مواصفة: الحقل، الأيقونة، وثيم لون (نفس تدوير mint-pale/wheat-pale
// المستخدم في كروت التصنيف والمنتج بالموقع كله)
const SPEC_CONFIG = [
  { field: "origin", icon: MapPin, theme: "mint" },
  { field: "season", icon: Calendar, theme: "wheat" },
  { field: "grade", icon: Award, theme: "mint" },
];

const ProductDetailsPage = () => {
  const { t } = useTranslation();
  const { slug } = useParams();
  const currentLang = useLanguageStore((state) => state.currentLang);
  const isRtl = currentLang === "ar";
  const [showQuoteForm, setShowQuoteForm] = useState(false);

  const imageRef = useRef(null);
  const leavesRef = useRef(null);
  const activeTweensRef = useRef([]);

  useEffect(() => {
    return () => {
      activeTweensRef.current.forEach((tw) => tw.kill());
      activeTweensRef.current = [];
    };
  }, []);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["product", slug],
    queryFn: () => productsApi.getBySlug(slug),
  });

  const product = data?.data?.product;
  const images = product?.images || [];

  const triggerBurst = () => spawnLeafBurst(leavesRef.current, activeTweensRef, 14);

  if (isLoading) {
    return (
      <div className="bg-paper min-h-screen">
        <SEO title="Loading product..." />
        <PublicHeader />
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
          <ProductDetailsSkeleton />
        </section>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="bg-paper min-h-screen">
        <SEO title="Product not found" />
        <PublicHeader />
        <p className="text-center text-muted-foreground py-24">{t("common.noResults")}</p>
      </div>
    );
  }

  const name = getLocalizedField(product, "name", currentLang);
  const description = getLocalizedField(product, "description", currentLang);
  const categoryName = product.category ? getLocalizedField(product.category, "name", currentLang) : "";

  return (
    <div className="bg-paper text-ink min-h-screen">
      <SEO
        title={name}
        description={description || undefined}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Product",
          name,
          description: description || undefined,
          image: images[0]?.url,
          brand: { "@type": "Brand", name: "Al Nasr" },
          category: categoryName || undefined,
        }}
      />
      <PublicHeader />

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-semibold text-muted-foreground mb-6 sm:mb-8 overflow-x-auto whitespace-nowrap">
          <NavLink to="/products" className="hover:text-olive shrink-0">
            {t("nav.products")}
          </NavLink>
          <ChevronRight size={14} className="icon-directional shrink-0" />
          <span className="text-olive truncate">{name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* معرض الصور — إطار مزدوج (frame) بتوهج خفيف عند hover، نفس روح
              التصميم المرجعي بس بألوان توكيناتنا */}
          <div className="lg:col-span-6 relative group">
            <div className="absolute -inset-2 rounded-[2.5rem] bg-olive opacity-10 blur-xl transition-all group-hover:opacity-20 pointer-events-none" />

            <div className="relative rounded-[2.5rem] p-3 sm:p-4 border border-line bg-card shadow-xl overflow-hidden">
              <div
                ref={imageRef}
                className="w-full h-[300px] sm:h-[380px] md:h-[420px] rounded-[2rem] overflow-hidden relative"
                onMouseEnter={triggerBurst}
                onTouchStart={triggerBurst}
              >
                {images[0] ? (
                  <img
                    src={images[0].url}
                    alt={name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-mint-pale flex items-center justify-center">
                    <ShieldCheck size={48} className="text-olive/30" strokeWidth={1.5} />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />

                {categoryName && (
                  <span className="absolute top-4 end-4 px-4 py-1.5 rounded-full text-xs font-bold backdrop-blur-md text-white bg-black/40 border border-white/10">
                    {categoryName}
                  </span>
                )}

                {/* ورق الشجر بيطير جوه إطار الصورة بس */}
                <div ref={leavesRef} className="absolute inset-0 overflow-hidden pointer-events-none z-20" />
              </div>
            </div>

            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-3 mt-3">
                {images.slice(1, 5).map((img) => (
                  <div key={img.public_id} className="aspect-square rounded-2xl overflow-hidden border border-line">
                    <img src={img.url} alt="" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* المعلومات والمواصفات */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8">
            <div className="space-y-3 sm:space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-mint-pale text-olive">
                <ShieldCheck size={14} />
                <span>{currentLang === "ar" ? "مواصفات تصدير معتمدة ( Export Ready)" : " Export-Ready Specification"}</span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-olive">{name}</h1>

              {description && (
                <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
              )}
            </div>

            {/* مواصفات الشحن والإنتاج — مصفوفة بطاقات بأيقونات */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {SPEC_CONFIG.map(({ field, icon: Icon, theme }) => {
                const value = getLocalizedField(product, field, currentLang);
                if (!value) return null;
                return (
                  <div
                    key={field}
                    className="p-4 rounded-2xl border border-line bg-card flex items-center gap-3"
                  >
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        theme === "mint" ? "bg-mint-pale text-olive" : "bg-wheat-pale text-ink"
                      }`}
                    >
                      <Icon size={18} />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[11px] block font-semibold text-muted-foreground">
                        {t(`product.${field}`)}
                      </span>
                      <span className="text-xs font-bold text-ink truncate block">{value}</span>
                    </div>
                  </div>
                );
              })}

              {product.minOrderQty && (
                <div className="p-4 rounded-2xl border border-line bg-card flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-wheat-pale text-ink">
                    <PackageCheck size={18} />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[11px] block font-semibold text-muted-foreground">
                      {t("product.minOrderQty")}
                    </span>
                    <span className="text-xs font-bold text-ink truncate block numeric">
                      {product.minOrderQty}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* تفاصيل التعبئة */}
            {getLocalizedField(product, "packaging", currentLang) && (
              <div className="p-4 rounded-2xl border border-line bg-card flex items-center justify-between text-xs font-medium text-muted-foreground gap-3">
                <span className="shrink-0">{t("product.packaging")}:</span>
                <span className="font-bold text-ink text-end">
                  {getLocalizedField(product, "packaging", currentLang)}
                </span>
              </div>
            )}

            {/* زر طلب عرض السعر */}
            <div className="pt-2">
              {!showQuoteForm ? (
                <>
                  <button
                    onClick={() => setShowQuoteForm(true)}
                    className="w-full py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-3 text-sm sm:text-base shadow-lg hover:opacity-95 bg-olive text-paper group"
                  >
                    <span>{t("product.requestQuote")}</span>
                    {isRtl ? (
                      <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                    ) : (
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    )}
                  </button>
                  <p className="text-center text-[11px] mt-3 text-muted-foreground">
                    {currentLang === "ar"
                      ? "نضمن لك شحنًا آمنًا، مستندات مطابقة معتمدة، وأسعارًا تنافسية للمستوردين."
                      : "Safe shipping, verified compliance documents, and competitive pricing for importers."}
                  </p>
                </>
              ) : (
                <div className="bg-card border border-line rounded-[2rem] shadow-card p-5 sm:p-6">
                  <QuoteRequestForm productId={product._id} />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <PublicFooter />
      <ScrollToTop />
    </div>
  );
};

export default ProductDetailsPage;
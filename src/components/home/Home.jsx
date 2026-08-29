// import React from 'react';
// import { Sprout, ShieldCheck, ArrowRight, PackageCheck, Globe, Calendar, MapPin, Award } from 'lucide-react';
// import category1 from '../../assests/catogery/catogery-1.jpg'; // يمكنك استبدالها بصورة المنتج الفعلي

// export default function ProductDetails() {
//   // بيانات تجريبية للمنتج (يمكنك ربطها بالـ props أو الـ state لاحقاً)
//   const product = {
//     name: "سمسم مصري فاخر",
//     category: "بذور",
//     description: "سمسم مصري أصلي فاخر، يتميز بحباته الكاملة ونكهته الغنية ورائحته العطرية الممتازة. نُقي بعناية فائقة بتقنية السورتكس لضمان النقاء التام، وهو مثالي للاستخدامات الغذائية، المخابز، وعصر الزيوت.",
//     origin: "مصر (النيل والدلتا)",
//     season: "حصاد الصيف",
//     grade: "الدرجة الأولى (Export Grade A)",
//     purity: "99.9% نقاء مصفى",
//     packaging: "أكياس منسوجة من (PP) سعة 25 كجم / 50 كجم",
//     moQ: "1 طن (1 Ton)",
//     image: category1
//   };

//   return (
//     <div className="min-h-screen py-16 px-6 lg:px-16" style={{ backgroundColor: 'var(--paper)', color: 'var(--ink)' }} dir="rtl">
      
//       <div className="max-w-7xl mx-auto space-y-12">
        
//         {/* مسار التنقل (Breadcrumb) */}
//         <nav className="flex items-center gap-2 text-xs font-semibold" style={{ color: 'var(--muted-foreground)' }}>
//           <a href="/products" className="hover:underline">المنتجات</a>
//           <span>/</span>
//           <span style={{ color: 'var(--olive)' }}>{product.name}</span>
//         </nav>

//         {/* شبكة تفاصيل المنتج الرئيسية */}
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
//           {/* القسم الأيمن: صورة المنتج بتصميم فخم ومتناسق */}
//           <div className="lg:col-span-6 relative group">
//             <div className="absolute -inset-2 rounded-[2.5rem] opacity-20 blur-xl transition-all group-hover:opacity-30"
//                  style={{ backgroundColor: 'var(--olive)' }} />
            
//             <div className="relative rounded-[2.5rem] p-4 border shadow-xl overflow-hidden"
//                  style={{ backgroundColor: 'var(--card)', borderColor: 'var(--line)' }}>
              
//               <div className="w-full h-[420px] rounded-[2rem] overflow-hidden relative">
//                 <img 
//                   src={product.image} 
//                   alt={product.name}
//                   className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
                
//                 {/* شارة تصنيف علوية داخل الصورة */}
//                 <div className="absolute top-4 right-4 px-4 py-1.5 rounded-full text-xs font-bold backdrop-blur-md text-white bg-black/40 border border-white/10 flex items-center gap-1.5">
//                   <Sprout size={14} />
//                   <span>{product.category}</span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* القسم الأيسر: المعلومات، الوصف، ومواصفات التصدير */}
//           <div className="lg:col-span-6 space-y-8">
            
//             {/* عنوان المنتج ونبذة عنه */}
//             <div className="space-y-4">
//               <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold"
//                    style={{ backgroundColor: 'var(--mint-pale)', color: 'var(--olive)' }}>
//                 <ShieldCheck size={14} />
//                 <span>مواصفات تصدير معتمدة (B2B Export Ready)</span>
//               </div>
              
//               <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight" style={{ color: 'var(--olive)' }}>
//                 {product.name}
//               </h1>
              
//               <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
//                 {product.description}
//               </p>
//             </div>

//             {/* جدول مواصفات الشحن والإنتاج (بتصميم بطاقات شبكية أترابية منظمة) */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
//               <div className="p-4 rounded-2xl border flex items-center gap-3"
//                    style={{ backgroundColor: 'var(--card)', borderColor: 'var(--line)' }}>
//                 <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
//                      style={{ backgroundColor: 'var(--mint-pale)', color: 'var(--olive)' }}>
//                   <MapPin size={18} />
//                 </div>
//                 <div>
//                   <span className="text-[11px] block font-semibold" style={{ color: 'var(--muted-foreground)' }}>المنشأ</span>
//                   <span className="text-xs font-bold" style={{ color: 'var(--ink)' }}>{product.origin}</span>
//                 </div>
//               </div>

//               <div className="p-4 rounded-2xl border flex items-center gap-3"
//                    style={{ backgroundColor: 'var(--card)', borderColor: 'var(--line)' }}>
//                 <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
//                      style={{ backgroundColor: 'var(--wheat-pale)', color: 'var(--ink)' }}>
//                   <Calendar size={18} />
//                 </div>
//                 <div>
//                   <span className="text-[11px] block font-semibold" style={{ color: 'var(--muted-foreground)' }}>الموسم</span>
//                   <span className="text-xs font-bold" style={{ color: 'var(--ink)' }}>{product.season}</span>
//                 </div>
//               </div>

//               <div className="p-4 rounded-2xl border flex items-center gap-3"
//                    style={{ backgroundColor: 'var(--card)', borderColor: 'var(--line)' }}>
//                 <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
//                      style={{ backgroundColor: 'var(--mint-pale)', color: 'var(--olive)' }}>
//                   <Award size={18} />
//                 </div>
//                 <div>
//                   <span className="text-[11px] block font-semibold" style={{ color: 'var(--muted-foreground)' }}>الدرجة والنقاء</span>
//                   <span className="text-xs font-bold" style={{ color: 'var(--ink)' }}>{product.grade}</span>
//                 </div>
//               </div>

//               <div className="p-4 rounded-2xl border flex items-center gap-3"
//                    style={{ backgroundColor: 'var(--card)', borderColor: 'var(--line)' }}>
//                 <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
//                      style={{ backgroundColor: 'var(--wheat-pale)', color: 'var(--ink)' }}>
//                   <PackageCheck size={18} />
//                 </div>
//                 <div>
//                   <span className="text-[11px] block font-semibold" style={{ color: 'var(--muted-foreground)' }}>الحد الأدنى للطلب (MOQ)</span>
//                   <span className="text-xs font-bold" style={{ color: 'var(--ink)' }}>{product.moq}</span>
//                 </div>
//               </div>

//             </div>

//             {/* تفاصيل التعبئة الإضافية */}
//             <div className="p-4 rounded-2xl border flex items-center justify-between text-xs font-medium"
//                  style={{ backgroundColor: 'var(--card)', borderColor: 'var(--line)', color: 'var(--muted-foreground)' }}>
//               <span>طريقة التعبئة القياسية:</span>
//               <span className="font-bold" style={{ color: 'var(--ink)' }}>{product.packaging}</span>
//             </div>

//             {/* زر طلب عرض السعر التفاعلي */}
//             <div className="pt-2">
//               <a 
//                 href="#contact" 
//                 className="w-full py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-3 text-base shadow-lg hover:opacity-95"
//                 style={{ backgroundColor: 'var(--olive)', color: 'var(--paper)' }}
//               >
//                 <span>اطلب عرض سعر لهذا المنتج (Request Quotation)</span>
//                 <ArrowRight size={18} className="rotate-180 transition-transform duration-300 group-hover:-translate-x-1" />
//               </a>
              
//               <p className="text-center text-[11px] mt-3" style={{ color: 'var(--muted-foreground)' }}>
//                 نضمن لك شحناً آمناً، مستندات مطابقة معتمدة، وأسعار تنافسية للمستوردين.
//               </p>
//             </div>

//           </div>

//         </div>

//       </div>
//     </div>
//   );
// }

////////////////////////////////////////////////////////////////////



import { useState, useRef, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { ChevronRight, ShieldCheck, MapPin, Calendar, Award, PackageCheck, ArrowRight, ArrowLeft } from "lucide-react";

// import PublicHeader from "../../../components/layout/PublicHeader.jsx";
// import PublicFooter from "../../../components/layout/PublicFooter.jsx";
// import SEO from "../../../components/shared/SEO.jsx";
// import { productsApi } from "../api/productsApi.js";
// import QuoteRequestForm from "../components/QuoteRequestForm.jsx";
// import ProductsSection from "../components/ProductsSection.jsx";
// import { useLanguageStore } from "../../../store/language.store.js";
// import { getLocalizedField } from "../../../utils/getLocalizedField.js";
// import { ProductDetailsSkeleton } from "../../../components/ui/Skeleton.jsx";
// import { spawnLeafBurst } from "../utils/leafBurst.js";
import PublicHeader from "../layout/PublicHeader.jsx";
import PublicFooter from "../layout/PublicFooter.jsx";
import SEO from "../shared/SEO.jsx";
import { productsApi } from "../../features/public-site/api/productsApi.js";
import QuoteRequestForm from "../../features/public-site/components/QuoteRequestForm.jsx";
import ProductsSection from "./ProductsSection.jsx";
import { useLanguageStore } from "../../store/language.store.js";
import { getLocalizedField } from "../../utils/getLocalizedField.js";
import { ProductDetailsSkeleton } from "../ui/Skeleton.jsx";
import { spawnLeafBurst } from "../../utils/leafBurst.js";

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
      <SEO title={name} description={description || undefined} />
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

      {/* منتجات ذات صلة — نفس تصنيف المنتج الحالي، بدون المنتج ده نفسه */}
      {product.category && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-16 sm:pb-24">
          <h2 className="font-display text-xl sm:text-2xl font-semibold text-ink mb-6">
            {currentLang === "ar" ? "منتجات ذات صلة" : "Related Products"}
          </h2>
          <ProductsSection
            variant="compact"
            fixedCategory={product.category._id}
            excludeId={product._id}
            limit={3}
          />
        </section>
      )}

      <PublicFooter />
    </div>
  );
};

export default ProductDetailsPage;


////////////////////////////////////////////////////////////////////


// import React, { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   Leaf,
//   ArrowUpRight,
//   ShieldCheck,
//   Globe,
//   Calendar,
//   Package,
//   Scale,
//   Award,
//   ChevronRight,
//   FileText,
//   Truck,
//   Sparkles,
//   CheckCircle2
// } from "lucide-react";

// export default function ProductSpotlightDetails() {
//   const [activeTab, setActiveTab] = useState("specs"); // 'specs' | 'packaging' | 'quality'

//   const product = {
//     title: "سمسم مصري فاخر",
//     englishTitle: "Premium Egyptian Sesame Seeds",
//     category: "بذور زراعية",
//     origin: "جمهورية مصر العربية",
//     harvestSeason: "حصاد الصيف",
//     grade: "الدرجة الأولى الممتازة",
//     moisture: "6% كحد أقصى",
//     purity: "99.9% Sortex Cleaned",
//     packaging: "أكياس منسوجة من (PP) سعة 25 كجم / 50 كجم أو أكياس جوت",
//     minOrder: "10 طن متري",
//     shipping: "شحن بحري للجاف (FCL / LCL)",
//     description:
//       "سمسم مصري نقاء عالي ومستخرج من أجود الأراضي الزراعية المصرية، معالج بأحدث تقنيات السورتكس ليزر لإزالة الشوائب وضمان نسبة زيت فائقة ومذاق ممتاز للمخابز والمصانع العالمية.",
//     image: "https://images.unsplash.com/photo-1608797178974-15b35a64ede9?q=80&w=1000&auto=format&fit=crop",
//   };

//   return (
//     <section className="relative w-full min-h-screen py-16 bg-[var(--ink)] text-[var(--paper)] overflow-hidden font-sans" dir="rtl">
      
//       {/* Dynamic Background Glows */}
//       <div className="absolute top-10 right-1/3 w-96 h-96 bg-[var(--olive)]/20 rounded-full blur-[150px] pointer-events-none" />
//       <div className="absolute bottom-10 left-10 w-80 h-80 bg-[var(--wheat)]/10 rounded-full blur-[130px] pointer-events-none" />

//       <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">

//         {/* Breadcrumb */}
//         <div className="flex items-center gap-2 text-xs text-[var(--paper)]/60 mb-8">
//           <a href="/products" className="hover:text-[var(--wheat)] transition-colors">المنتجات</a>
//           <ChevronRight size={14} className="rotate-180 text-[var(--paper)]/40" />
//           <span>{product.category}</span>
//           <ChevronRight size={14} className="rotate-180 text-[var(--paper)]/40" />
//           <span className="text-[var(--wheat)] font-bold">{product.title}</span>
//         </div>

//         {/* HERO SPOTLIGHT DISPLAY */}
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
//           {/* RIGHT: Product Visual Showcase (6 Columns) */}
//           <div className="lg:col-span-6 relative">
//             <motion.div
//               initial={{ opacity: 0, scale: 0.96 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ duration: 0.5 }}
//               className="relative rounded-3xl bg-[var(--card)]/20 border border-[var(--line)]/20 backdrop-blur-2xl p-6 sm:p-8 overflow-hidden shadow-2xl flex items-center justify-center"
//             >
//               {/* Subtle Floating Leaf Animation */}
//               <motion.div
//                 animate={{ y: [0, -15, 0], rotate: [0, 45, 0] }}
//                 transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
//                 className="absolute top-6 left-6 text-[var(--wheat)]/70 pointer-events-none"
//               >
//                 <Leaf size={24} />
//               </motion.div>

//               {/* Product Image Stage */}
//               <div className="relative h-[400px] sm:h-[480px] w-full rounded-2xl overflow-hidden bg-[var(--ink)]/40 border border-[var(--line)]/10">
//                 <img
//                   src={product.image}
//                   alt={product.title}
//                   className="w-full h-full object-cover filter brightness-[0.9] contrast-[1.05] transition-transform duration-700 hover:scale-105"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)] via-transparent to-transparent" />
                
//                 {/* Highlights Badge */}
//                 <div className="absolute bottom-4 right-4 left-4 bg-[var(--ink)]/80 backdrop-blur-md border border-[var(--line)]/30 p-3 rounded-xl flex items-center justify-between">
//                   <div className="flex items-center gap-2">
//                     <ShieldCheck size={18} className="text-[var(--wheat)]" />
//                     <span className="text-xs font-bold text-[var(--paper)]">درجة نقاء {product.purity}</span>
//                   </div>
//                   <span className="text-[10px] text-[var(--wheat)] font-mono uppercase" dir="ltr">Export Standard</span>
//                 </div>
//               </div>
//             </motion.div>
//           </div>

//           {/* LEFT: Interactive Tabs & Information Panel (6 Columns) */}
//           <div className="lg:col-span-6 flex flex-col justify-between">
//             <motion.div
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.5, delay: 0.1 }}
//             >
//               {/* Header Info */}
//               <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--mint)]/15 border border-[var(--mint)]/30 text-[var(--mint-pale)] text-xs font-semibold mb-3">
//                 <Sparkles size={13} className="text-[var(--wheat)]" />
//                 <span>محاصيل تصديرية موثوقة</span>
//               </div>

//               <h1 className="text-4xl sm:text-5xl font-black text-[var(--paper)] mb-1">
//                 {product.title}
//               </h1>
//               <p className="text-xs text-[var(--wheat)] font-mono tracking-wider mb-4" dir="ltr">
//                 {product.englishTitle}
//               </p>
              
//               <p className="text-sm text-[var(--paper)]/75 leading-relaxed mb-6 font-light">
//                 {product.description}
//               </p>

//               {/* TAB SWITCHER */}
//               <div className="flex items-center gap-2 bg-[var(--card)]/30 p-1.5 rounded-xl border border-[var(--line)]/20 mb-6 backdrop-blur-md">
//                 <button
//                   onClick={() => setActiveTab("specs")}
//                   className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
//                     activeTab === "specs"
//                       ? "bg-[var(--wheat)] text-[var(--ink)] shadow-md"
//                       : "text-[var(--paper)]/70 hover:text-[var(--paper)]"
//                   }`}
//                 >
//                   المواصفات الفنية
//                 </button>
//                 <button
//                   onClick={() => setActiveTab("packaging")}
//                   className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
//                     activeTab === "packaging"
//                       ? "bg-[var(--wheat)] text-[var(--ink)] shadow-md"
//                       : "text-[var(--paper)]/70 hover:text-[var(--paper)]"
//                   }`}
//                 >
//                   التعبئة والشحن
//                 </button>
//                 <button
//                   onClick={() => setActiveTab("quality")}
//                   className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
//                     activeTab === "quality"
//                       ? "bg-[var(--wheat)] text-[var(--ink)] shadow-md"
//                       : "text-[var(--paper)]/70 hover:text-[var(--paper)]"
//                   }`}
//                 >
//                   الجودة والنقاء
//                 </button>
//               </div>

//               {/* TAB CONTENT AREAS */}
//               <AnimatePresence mode="wait">
//                 {activeTab === "specs" && (
//                   <motion.div
//                     key="specs"
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: -10 }}
//                     className="grid grid-cols-2 gap-3 mb-8"
//                   >
//                     <div className="bg-[var(--card)]/20 border border-[var(--line)]/15 p-4 rounded-2xl backdrop-blur-xl">
//                       <span className="text-[10px] text-[var(--paper)]/50 block mb-1">البلد المنشأ</span>
//                       <span className="text-xs font-bold text-[var(--paper)]">{product.origin}</span>
//                     </div>
//                     <div className="bg-[var(--card)]/20 border border-[var(--line)]/15 p-4 rounded-2xl backdrop-blur-xl">
//                       <span className="text-[10px] text-[var(--paper)]/50 block mb-1">الموسم</span>
//                       <span className="text-xs font-bold text-[var(--paper)]">{product.harvestSeason}</span>
//                     </div>
//                     <div className="bg-[var(--card)]/20 border border-[var(--line)]/15 p-4 rounded-2xl backdrop-blur-xl">
//                       <span className="text-[10px] text-[var(--paper)]/50 block mb-1">الدرجة</span>
//                       <span className="text-xs font-bold text-[var(--wheat)]">{product.grade}</span>
//                     </div>
//                     <div className="bg-[var(--card)]/20 border border-[var(--line)]/15 p-4 rounded-2xl backdrop-blur-xl">
//                       <span className="text-[10px] text-[var(--paper)]/50 block mb-1">نسبة الرطوبة</span>
//                       <span className="text-xs font-bold text-[var(--paper)]">{product.moisture}</span>
//                     </div>
//                   </motion.div>
//                 )}

//                 {activeTab === "packaging" && (
//                   <motion.div
//                     key="packaging"
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: -10 }}
//                     className="space-y-3 mb-8"
//                   >
//                     <div className="bg-[var(--card)]/20 border border-[var(--line)]/15 p-4 rounded-2xl backdrop-blur-xl flex items-center justify-between">
//                       <div>
//                         <span className="text-[10px] text-[var(--paper)]/50 block">طريقة التعبئة</span>
//                         <span className="text-xs font-bold text-[var(--paper)]">{product.packaging}</span>
//                       </div>
//                       <Package size={20} className="text-[var(--wheat)] shrink-0" />
//                     </div>
//                     <div className="bg-[var(--card)]/20 border border-[var(--line)]/15 p-4 rounded-2xl backdrop-blur-xl flex items-center justify-between">
//                       <div>
//                         <span className="text-[10px] text-[var(--paper)]/50 block">الحد الأدنى للطلب (MOQ)</span>
//                         <span className="text-xs font-bold text-[var(--paper)]">{product.minOrder}</span>
//                       </div>
//                       <Scale size={20} className="text-[var(--mint-pale)] shrink-0" />
//                     </div>
//                   </motion.div>
//                 )}

//                 {activeTab === "quality" && (
//                   <motion.div
//                     key="quality"
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: -10 }}
//                     className="space-y-2.5 mb-8"
//                   >
//                     {["مفروز بتقنية السورتكس ليزر 100%", "خالٍ من الحشرات والآثار الكيميائية", "شهادة فحص وسجائر صحية زراعية (Phytosanitary)", "مطابق لمعايير الاتحاد الأوروبي والخليج"].map((q, i) => (
//                       <div key={i} className="bg-[var(--card)]/15 border border-[var(--line)]/15 p-3 rounded-xl flex items-center gap-3 backdrop-blur-md">
//                         <CheckCircle2 size={16} className="text-[var(--wheat)] shrink-0" />
//                         <span className="text-xs text-[var(--paper)]/90 font-medium">{q}</span>
//                       </div>
//                     ))}
//                   </motion.div>
//                 )}
//               </AnimatePresence>

//               {/* ACTION BUTTON */}
//               <button className="w-full bg-[var(--wheat)] hover:bg-[#c4a355] text-[var(--ink)] font-black py-4 px-8 rounded-2xl transition-all duration-300 shadow-xl flex items-center justify-center gap-2 group text-sm active:scale-98">
//                 <span>اطلب عرض سعر خاص بهذا المنتج</span>
//                 <ArrowUpRight size={18} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
//               </button>

//             </motion.div>
//           </div>

//         </div>

//       </div>
//     </section>
//   );
// }
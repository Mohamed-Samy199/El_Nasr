

// import { useState, useRef, useEffect } from "react";
// import { useParams, NavLink } from "react-router-dom";
// import { useTranslation } from "react-i18next";
// import { useQuery } from "@tanstack/react-query";
// import { ChevronRight, ShieldCheck, MapPin, Calendar, Award, PackageCheck, ArrowRight, ArrowLeft } from "lucide-react";
// import PublicHeader from "../layout/PublicHeader.jsx";
// import PublicFooter from "../layout/PublicFooter.jsx";
// import SEO from "../shared/SEO.jsx";
// import { productsApi } from "../../features/public-site/api/productsApi.js";
// import QuoteRequestForm from "../../features/public-site/components/QuoteRequestForm.jsx";
// import ProductsSection from "./ProductsSection.jsx";
// import { useLanguageStore } from "../../store/language.store.js";
// import { getLocalizedField } from "../../utils/getLocalizedField.js";
// import { ProductDetailsSkeleton } from "../ui/Skeleton.jsx";
// import { spawnLeafBurst } from "../../utils/leafBurst.js";

// const SPEC_CONFIG = [
//   { field: "origin", icon: MapPin, theme: "mint" },
//   { field: "season", icon: Calendar, theme: "wheat" },
//   { field: "grade", icon: Award, theme: "mint" },
// ];

// const ProductDetailsPage = () => {
//   const { t } = useTranslation();
//   const { slug } = useParams();
//   const currentLang = useLanguageStore((state) => state.currentLang);
//   const isRtl = currentLang === "ar";
//   const [showQuoteForm, setShowQuoteForm] = useState(false);

//   const imageRef = useRef(null);
//   const leavesRef = useRef(null);
//   const activeTweensRef = useRef([]);

//   useEffect(() => {
//     return () => {
//       activeTweensRef.current.forEach((tw) => tw.kill());
//       activeTweensRef.current = [];
//     };
//   }, []);

//   const { data, isLoading, isError } = useQuery({
//     queryKey: ["product", slug],
//     queryFn: () => productsApi.getBySlug(slug),
//   });

//   const product = data?.data?.product;
//   const images = product?.images || [];

//   const triggerBurst = () => spawnLeafBurst(leavesRef.current, activeTweensRef, 14);

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

//   const name = getLocalizedField(product, "name", currentLang);
//   const description = getLocalizedField(product, "description", currentLang);
//   const categoryName = product.category ? getLocalizedField(product.category, "name", currentLang) : "";

//   return (
//     <div className="bg-paper text-ink min-h-screen">
//       <SEO title={name} description={description || undefined} />
//       <PublicHeader />

//       <section className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
//         {/* Breadcrumb */}
//         <nav className="flex items-center gap-2 text-xs font-semibold text-muted-foreground mb-6 sm:mb-8 overflow-x-auto whitespace-nowrap">
//           <NavLink to="/products" className="hover:text-olive shrink-0">
//             {t("nav.products")}
//           </NavLink>
//           <ChevronRight size={14} className="icon-directional shrink-0" />
//           <span className="text-olive truncate">{name}</span>
//         </nav>

//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
//           {/* معرض الصور — إطار مزدوج (frame) بتوهج خفيف عند hover، نفس روح
//               التصميم المرجعي بس بألوان توكيناتنا */}
//           <div className="lg:col-span-6 relative group">
//             <div className="absolute -inset-2 rounded-[2.5rem] bg-olive opacity-10 blur-xl transition-all group-hover:opacity-20 pointer-events-none" />

//             <div className="relative rounded-[2.5rem] p-3 sm:p-4 border border-line bg-card shadow-xl overflow-hidden">
//               <div
//                 ref={imageRef}
//                 className="w-full h-[300px] sm:h-[380px] md:h-[420px] rounded-[2rem] overflow-hidden relative"
//                 onMouseEnter={triggerBurst}
//                 onTouchStart={triggerBurst}
//               >
//                 {images[0] ? (
//                   <img
//                     src={images[0].url}
//                     alt={name}
//                     className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
//                   />
//                 ) : (
//                   <div className="w-full h-full bg-mint-pale flex items-center justify-center">
//                     <ShieldCheck size={48} className="text-olive/30" strokeWidth={1.5} />
//                   </div>
//                 )}
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />

//                 {categoryName && (
//                   <span className="absolute top-4 end-4 px-4 py-1.5 rounded-full text-xs font-bold backdrop-blur-md text-white bg-black/40 border border-white/10">
//                     {categoryName}
//                   </span>
//                 )}

//                 {/* ورق الشجر بيطير جوه إطار الصورة بس */}
//                 <div ref={leavesRef} className="absolute inset-0 overflow-hidden pointer-events-none z-20" />
//               </div>
//             </div>

//             {images.length > 1 && (
//               <div className="grid grid-cols-4 gap-3 mt-3">
//                 {images.slice(1, 5).map((img) => (
//                   <div key={img.public_id} className="aspect-square rounded-2xl overflow-hidden border border-line">
//                     <img src={img.url} alt="" className="w-full h-full object-cover" />
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* المعلومات والمواصفات */}
//           <div className="lg:col-span-6 space-y-6 sm:space-y-8">
//             <div className="space-y-3 sm:space-y-4">
//               <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-mint-pale text-olive">
//                 <ShieldCheck size={14} />
//                 <span>{currentLang === "ar" ? "مواصفات تصدير معتمدة ( Export Ready)" : " Export-Ready Specification"}</span>
//               </div>

//               <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-olive">{name}</h1>

//               {description && (
//                 <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
//               )}
//             </div>

//             {/* مواصفات الشحن والإنتاج — مصفوفة بطاقات بأيقونات */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               {SPEC_CONFIG.map(({ field, icon: Icon, theme }) => {
//                 const value = getLocalizedField(product, field, currentLang);
//                 if (!value) return null;
//                 return (
//                   <div
//                     key={field}
//                     className="p-4 rounded-2xl border border-line bg-card flex items-center gap-3"
//                   >
//                     <div
//                       className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
//                         theme === "mint" ? "bg-mint-pale text-olive" : "bg-wheat-pale text-ink"
//                       }`}
//                     >
//                       <Icon size={18} />
//                     </div>
//                     <div className="min-w-0">
//                       <span className="text-[11px] block font-semibold text-muted-foreground">
//                         {t(`product.${field}`)}
//                       </span>
//                       <span className="text-xs font-bold text-ink truncate block">{value}</span>
//                     </div>
//                   </div>
//                 );
//               })}

//               {product.minOrderQty && (
//                 <div className="p-4 rounded-2xl border border-line bg-card flex items-center gap-3">
//                   <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-wheat-pale text-ink">
//                     <PackageCheck size={18} />
//                   </div>
//                   <div className="min-w-0">
//                     <span className="text-[11px] block font-semibold text-muted-foreground">
//                       {t("product.minOrderQty")}
//                     </span>
//                     <span className="text-xs font-bold text-ink truncate block numeric">
//                       {product.minOrderQty}
//                     </span>
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* تفاصيل التعبئة */}
//             {getLocalizedField(product, "packaging", currentLang) && (
//               <div className="p-4 rounded-2xl border border-line bg-card flex items-center justify-between text-xs font-medium text-muted-foreground gap-3">
//                 <span className="shrink-0">{t("product.packaging")}:</span>
//                 <span className="font-bold text-ink text-end">
//                   {getLocalizedField(product, "packaging", currentLang)}
//                 </span>
//               </div>
//             )}

//             {/* زر طلب عرض السعر */}
//             <div className="pt-2">
//               {!showQuoteForm ? (
//                 <>
//                   <button
//                     onClick={() => setShowQuoteForm(true)}
//                     className="w-full py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-3 text-sm sm:text-base shadow-lg hover:opacity-95 bg-olive text-paper group"
//                   >
//                     <span>{t("product.requestQuote")}</span>
//                     {isRtl ? (
//                       <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
//                     ) : (
//                       <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
//                     )}
//                   </button>
//                   <p className="text-center text-[11px] mt-3 text-muted-foreground">
//                     {currentLang === "ar"
//                       ? "نضمن لك شحنًا آمنًا، مستندات مطابقة معتمدة، وأسعارًا تنافسية للمستوردين."
//                       : "Safe shipping, verified compliance documents, and competitive pricing for importers."}
//                   </p>
//                 </>
//               ) : (
//                 <div className="bg-card border border-line rounded-[2rem] shadow-card p-5 sm:p-6">
//                   <QuoteRequestForm productId={product._id} />
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* منتجات ذات صلة — نفس تصنيف المنتج الحالي، بدون المنتج ده نفسه */}
//       {product.category && (
//         <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-16 sm:pb-24">
//           <h2 className="font-display text-xl sm:text-2xl font-semibold text-ink mb-6">
//             {currentLang === "ar" ? "منتجات ذات صلة" : "Related Products"}
//           </h2>
//           <ProductsSection
//             variant="compact"
//             fixedCategory={product.category._id}
//             excludeId={product._id}
//             limit={3}
//           />
//         </section>
//       )}

//       <PublicFooter />
//     </div>
//   );
// };

// export default ProductDetailsPage;
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Filter } from "lucide-react";

import { productsApi } from "../../features/public-site/api/productsApi.js";
import { categoriesApi } from "../../features/public-site/api/categoriesApi.js";
import { useLanguageStore } from "../../store/language.store.js";
import { getLocalizedField } from "../../utils/getLocalizedField.js";
import { ProductGridSkeleton } from "../ui/Skeleton.jsx";
import ProductCard from "../../features/public-site/components/ProductCard.jsx";

/**
 * قسم "المنتجات" — مستخدم في مكانين:
 * 1) الصفحة الرئيسية: limit={6} + showViewAll (عيّنة من الكتالوج).
 * 2) صفحة /products الكاملة: limit={null} (الكتالوج كامل، بدون حد أقصى)،
 *    مع activeCategory/onCategoryChange متحكم فيهم من برّة (مربوطين بالرابط
 *    ?category=id).
 *
 * منطق الفلترة: كل ضغطة فلتر بتجيب أول {limit} منتج **من نفس التصنيف ده
 * تحديدًا** من الباك اند، مش بتفلتر على العيّنة المحمّلة مسبقًا بس.
 */
const ProductsSection = ({
  limit = null,
  showViewAll = false,
  activeCategory: controlledActiveCategory,
  onCategoryChange: controlledOnChange,
}) => {
  const { t } = useTranslation();
  const currentLang = useLanguageStore((state) => state.currentLang);

  const [internalCategory, setInternalCategory] = useState("");
  const isControlled = controlledActiveCategory !== undefined;
  const activeCategory = isControlled ? controlledActiveCategory : internalCategory;
  const setActiveCategory = isControlled ? controlledOnChange : setInternalCategory;

  const { data: categoriesData } = useQuery({
    queryKey: ["categories"],
    queryFn: categoriesApi.getAll,
  });
  const categories = categoriesData?.data?.categories || [];

  const { data: productsData, isLoading } = useQuery({
    queryKey: ["public-products", activeCategory, limit],
    queryFn: () =>
      productsApi.getPublished({
        ...(limit ? { page: 1, size: limit } : {}),
        ...(activeCategory ? { category: activeCategory } : {}),
      }),
  });
  const products = productsData?.data?.result || [];

  return (
    <section className="relative w-full py-4 sm:py-8 bg-paper text-ink px-4 sm:px-6 lg:px-16">
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(var(--ink) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="max-w-7xl mx-auto flex flex-col items-center gap-10 sm:gap-12 relative z-10">
        <div className="flex flex-col items-center gap-5 sm:gap-6 w-full">
          <h2 className="text-xl lg:text-3xl font-extrabold tracking-tight text-center">
            {currentLang === "ar" ? (
              <>
                تصفّح <span className="text-mint">منتجاتنا</span>
              </>
            ) : (
              <>
                Explore Our <span className="text-mint">Products</span>
              </>
            )}
          </h2>

          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 bg-secondary/60 backdrop-blur-md p-2 rounded-2xl border border-line max-w-full overflow-x-auto">
            <div className="hidden sm:flex items-center gap-2 px-3 text-muted-foreground text-xs font-semibold shrink-0">
              <Filter className="w-4 h-4 text-olive" />
              <span>{t("common.filter")}:</span>
            </div>
            <button
              onClick={() => setActiveCategory("")}
              className={`shrink-0 px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                activeCategory === ""
                  ? "bg-olive text-paper shadow-md scale-105"
                  : "text-ink hover:bg-card hover:text-mint"
              }`}
            >
              {t("common.all")}
            </button>
            {categories.map((cat) => (
              <button
                key={cat._id}
                onClick={() => setActiveCategory(cat._id)}
                className={`shrink-0 px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  activeCategory === cat._id
                    ? "bg-olive text-paper shadow-md scale-105"
                    : "text-ink hover:bg-card hover:text-mint"
                }`}
              >
                {getLocalizedField(cat, "name", currentLang)}
              </button>
            ))}
          </div>
        </div>

        {isLoading && <ProductGridSkeleton count={limit || 6} />}

        {!isLoading && products.length === 0 && (
          <p className="text-muted-foreground">{t("common.noResults")}</p>
        )}

        {!isLoading && products.length > 0 && (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 w-full">
            <AnimatePresence>
              {products.map((product, index) => (
                <ProductCard key={product._id} product={product} currentLang={currentLang} index={index} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {showViewAll && (
          <NavLink
            to="/products"
            className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 text-sm font-semibold text-ink hover:bg-secondary transition-colors"
          >
            <span>{currentLang === "ar" ? "عرض كل المنتجات" : "View All Products"}</span>
            <ArrowRight size={16} className="icon-directional" />
          </NavLink>
        )}
      </div>
    </section>
  );
};

export default ProductsSection;
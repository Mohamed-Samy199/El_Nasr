import { useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { Sprout, ArrowRight, Leaf } from "lucide-react";

import { categoriesApi } from "../../features/public-site/api/categoriesApi.js";
import { useLanguageStore } from "../../store/language.store.js";
import { getLocalizedField } from "../../utils/getLocalizedField.js";
import { ACCENT_THEMES, spawnLeafBurst } from "../../utils/leafBurst.js";

const CategoryCard = ({ category, index }) => {
  const currentLang = useLanguageStore((state) => state.currentLang);
  const leavesRef = useRef(null);
  const activeTweensRef = useRef([]);

  const theme = ACCENT_THEMES[index % ACCENT_THEMES.length];
  const name = getLocalizedField(category, "name", currentLang);
  const description = getLocalizedField(category, "description", currentLang);

  useEffect(() => {
    return () => {
      activeTweensRef.current.forEach((tw) => tw.kill());
      activeTweensRef.current = [];
    };
  }, []);

  const triggerBurst = () => spawnLeafBurst(leavesRef.current, activeTweensRef);

  return (
    <NavLink
      to={`/products?category=${category._id}`}
      onMouseEnter={triggerBurst}
      onTouchStart={triggerBurst}
      className="group relative rounded-[2rem] p-8 border border-line bg-card transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl flex flex-col justify-between overflow-hidden"
    >
      {/* توهج خلفية عند الـ hover — بنفس لون الثيم الدوّار */}
      <div
        className={`absolute -top-10 -end-10 w-32 h-32 rounded-full ${theme.glow} opacity-20 blur-xl transition-all duration-500 group-hover:scale-150 pointer-events-none`}
      />

      <div className="space-y-6 relative z-10">
        <div className="flex justify-between items-center">
          <span className={`text-xs font-bold px-3 py-1 rounded-md shadow-sm ${theme.badgeBg} ${theme.badgeText}`}>
            {currentLang === "ar" ? "منتج معتمد" : "Export Grade"}
          </span>
          <div className="w-10 h-10 rounded-xl border border-line bg-paper flex items-center justify-center transition-transform duration-500 group-hover:rotate-12">
            <Leaf size={18} className="text-olive" />
          </div>
        </div>

        {/* الصورة — أو بديل بصري بالأيقونة لو مفيش صورة مرفوعة */}
        <div className="w-full h-48 rounded-2xl relative overflow-hidden shadow-sm">
          {category.image?.url ? (
            <>
              <img
                src={category.image.url}
                alt={name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
            </>
          ) : (
            <div className="w-full h-full bg-mint-pale flex items-center justify-center">
              <Leaf size={40} className="text-olive/40" strokeWidth={1.5} />
            </div>
          )}
          {/* ورق الشجر بيطير جوه إطار الصورة بس (overflow-hidden فوق) */}
          <div ref={leavesRef} className="absolute inset-0 overflow-hidden pointer-events-none z-20" />
        </div>

        <div className="space-y-2">
          <h3 className="text-2xl font-bold tracking-tight text-olive">{name}</h3>
          {description && (
            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">{description}</p>
          )}
        </div>
      </div>

      <div className="pt-6 mt-6 border-t border-line relative z-10">
        <span className="w-full py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2 text-sm shadow-sm bg-olive text-paper group-hover:opacity-90">
          <span>{currentLang === "ar" ? "تصفح المنتجات" : "View Products"}</span>
          <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1 icon-directional" />
        </span>
      </div>
    </NavLink>
  );
};

/**
 * قسم "التصنيفات" في الصفحة الرئيسية — أول 3 تصنيفات بس. الهيكل والمقاسات
 * هنا هي "المرجع" اللي ProductCard في ProductsSection.jsx بيتبع نفس شكله
 * بالظبط (نفس p-8، rounded-[2rem]، h-48، burst ورق الشجر...) — أي تعديل
 * على شكل الكارت هنا لازم ينعكس هناك برضو عشان يفضلوا متطابقين بصريًا.
 */
const CategorySection = () => {
  const { t } = useTranslation();
  const currentLang = useLanguageStore((state) => state.currentLang);

  const { data, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: categoriesApi.getAll,
  });

  const categories = (data?.data?.categories || []).slice(0, 3);

  return (
    <section className="py-4 sm:py-8 px-4 sm:px-6 lg:px-16 relative overflow-hidden">
      {/* خلفية جمالية خفيفة */}
      <div className="absolute top-1/2 start-0 w-72 h-72 rounded-full opacity-10 blur-3xl pointer-events-none bg-mint" />

      <div className="max-w-7xl mx-auto space-y-10 sm:space-y-16 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-center gap-6 border-b border-line pb-8">
          <div className="space-y-3">
            <h2 className="text-xl lg:text-3xl font-extrabold tracking-tight text-olive">
              {currentLang === "ar" ? "محاصيلنا الزراعية" : "Our Agricultural Crops"}
            </h2>
          </div>
        </div>

        {isLoading && <p className="text-center text-muted-foreground">{t("common.loading")}</p>}

        {!isLoading && categories.length === 0 && (
          <p className="text-center text-muted-foreground">{t("common.noResults")}</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <CategoryCard key={category._id} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
import { useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, ShieldCheck, Leaf, ArrowRight } from "lucide-react";

import { getLocalizedField } from "../../../utils/getLocalizedField.js";
import { ACCENT_THEMES, spawnLeafBurst } from "../../../utils/leafBurst.js";

const MotionNavLink = motion(NavLink);

/**
 * ⚠️ نفس هيكل ومقاسات CategoryCard في CategorySection.jsx بالظبط
 * (p-8, rounded-[2rem], hover:-translate-y-2, h-48 للصورة، burst ورق
 * الشجر عند hover) — أي تعديل شكلي هنا لازم ينعكس هناك برضو.
 * الاختلاف الوحيد هو المحتوى: بيانات المنتج الحقيقية بدل التصنيف.
 */
const ProductCard = ({ product, currentLang, index }) => {
  const leavesRef = useRef(null);
  const activeTweensRef = useRef([]);
  const theme = ACCENT_THEMES[index % ACCENT_THEMES.length];

  const image = product.images?.[0];
  const name = getLocalizedField(product, "name", currentLang);
  const origin = getLocalizedField(product, "origin", currentLang);
  const packaging = getLocalizedField(product, "packaging", currentLang);
  const grade = getLocalizedField(product, "grade", currentLang);
  const season = getLocalizedField(product, "season", currentLang);
  const categoryName = product.category ? getLocalizedField(product.category, "name", currentLang) : "";

  useEffect(() => {
    return () => {
      activeTweensRef.current.forEach((tw) => tw.kill());
      activeTweensRef.current = [];
    };
  }, []);

  const triggerBurst = () => spawnLeafBurst(leavesRef.current, activeTweensRef);

  return (
    <MotionNavLink
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      to={`/products/${product.slug}`}
      onMouseEnter={triggerBurst}
      onTouchStart={triggerBurst}
      className="group relative rounded-[2rem] p-8 border border-line bg-card transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl flex flex-col justify-between overflow-hidden"
    >
      <div
        className={`absolute -top-10 -end-10 w-32 h-32 rounded-full ${theme.glow} opacity-20 blur-xl transition-all duration-500 group-hover:scale-150 pointer-events-none`}
      />

      <div className="space-y-6 relative z-10">
        <div className="flex justify-between items-center">
          <span className={`text-xs font-bold px-3 py-1 rounded-md shadow-sm ${theme.badgeBg} ${theme.badgeText}`}>
            {grade || (currentLang === "ar" ? "منتج معتمد" : "Export Grade")}
          </span>
          <div className="w-10 h-10 rounded-xl border border-line bg-paper flex items-center justify-center transition-transform duration-500 group-hover:rotate-12">
            <Leaf size={18} className="text-olive" />
          </div>
        </div>

        <div className="w-full h-48 rounded-2xl relative overflow-hidden shadow-sm">
          {image ? (
            <>
              <img
                src={image.url}
                alt={name}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
            </>
          ) : (
            <div className="w-full h-full bg-mint-pale flex items-center justify-center">
              <Leaf size={40} className="text-olive/40" strokeWidth={1.5} />
            </div>
          )}
          <div ref={leavesRef} className="absolute inset-0 overflow-hidden pointer-events-none z-20" />
        </div>

        <div className="space-y-2">
          <h3 className="text-2xl font-bold tracking-tight text-olive">{name}</h3>

          {(origin || packaging) && (
            <div className="space-y-1.5 pt-1">
              {origin && (
                <p className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin size={14} className="text-mint shrink-0" />
                  <span className="truncate">{origin}</span>
                </p>
              )}
              {packaging && (
                <p className="flex items-center gap-2 text-sm text-muted-foreground">
                  <ShieldCheck size={14} className="text-wheat shrink-0" />
                  <span className="truncate">{packaging}</span>
                </p>
              )}
            </div>
          )}

          {(categoryName || season) && (
            <p className="text-xs text-muted-foreground/70 pt-1">
              {categoryName}
              {categoryName && season ? " · " : ""}
              {season}
            </p>
          )}
        </div>
      </div>

      <div className="pt-6 mt-6 border-t border-line relative z-10">
        <span className="w-full py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2 text-sm shadow-sm bg-olive text-paper group-hover:opacity-90">
          <span>{currentLang === "ar" ? "اطلب عرض سعر" : "Request Quote"}</span>
          <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1 icon-directional" />
        </span>
      </div>
    </MotionNavLink>
  );
};

export default ProductCard;
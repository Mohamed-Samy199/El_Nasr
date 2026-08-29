import { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { gsap } from "gsap";
import { ArrowRight, ArrowLeft, ShieldCheck, MapPin, Sparkles } from "lucide-react";

import { productsApi } from "../../features/public-site/api/productsApi.js";
import { useLanguageStore } from "../../store/language.store.js";
import { getLocalizedField } from "../../utils/getLocalizedField.js";
import { spawnLeafBurst } from "../../utils/leafBurst.js";

const LEAF_COUNT = 16; // ضعف العدد الافتراضي (8) — الصورة هنا أعرض من كروت التصنيف/المنتج
const AUTOPLAY_INTERVAL = 6000;

/**
 * خاتمة الصفحة الرئيسية — أحدث 3 منتجات منشورة، معروضة كسلايد بنفس الهوية
 * البصرية الفاتحة (ورقي/كريمي) المستخدمة في باقي الموقع.
 *
 * اتجاه الحركة (نص وصورة مع بعض) بيتقلب حسب اللغة — بيحاكي اتجاه القراءة
 * الطبيعي: في العربي المحتوى الجديد بيدخل من الشمال ويوصل لليمين (والقديم
 * بيخرج ناحية اليمين)، وفي الإنجليزي العكس بالظبط.
 *
 * autoplay بيتحرك تلقائي كل 6 ثواني، بيوقف مع hover، وبيتنضف بالكامل عند
 * مغادرة الصفحة (نفس درس الـ freeze bug اللي اتصلح في HeroSlider — الـ
 * interval معتمدش على state بيتغيّر مع كل transition).
 */
const ProductsShowcase = () => {
  const { t } = useTranslation();
  const currentLang = useLanguageStore((state) => state.currentLang);
  const isRtl = currentLang === "ar";
  // في العربي: المحتوى بيتحرك من الشمال لليمين (dir = 1)
  // في الإنجليزي: المحتوى بيتحرك من اليمين للشمال (dir = -1)
  const dir = isRtl ? 1 : -1;

  const [activeIndex, setActiveIndex] = useState(0);
  const cardRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);
  const leavesRef = useRef(null);
  const activeTweensRef = useRef([]);
  const isMountedRef = useRef(true);

  const { data, isLoading } = useQuery({
    queryKey: ["latest-products"],
    // الباك اند بيرتّب دايمًا بـ createdAt: -1، يعني أحدث 3 منتجات منشورة فعليًا
    queryFn: () => productsApi.getPublished({ page: 1, size: 3 }),
  });
  const products = data?.data?.result || [];
  const product = products[activeIndex];

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      activeTweensRef.current.forEach((tw) => tw.kill());
      activeTweensRef.current = [];
    };
  }, []);

  const triggerBurst = () => spawnLeafBurst(leavesRef.current, activeTweensRef, LEAF_COUNT);

  const goTo = (index) => {
    if (index === activeIndex || !textRef.current || !imageRef.current) return;

    const exitTween = gsap.to([textRef.current, imageRef.current], {
      opacity: 0,
      x: dir * 30,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        if (!isMountedRef.current) return;
        setActiveIndex(index);

        const enterTween = gsap.fromTo(
          [textRef.current, imageRef.current],
          { opacity: 0, x: -dir * 30 },
          { opacity: 1, x: 0, duration: 0.5, ease: "power3.out" }
        );
        activeTweensRef.current.push(enterTween);

        // ورق الشجر بيتحرك مع كل سلايد جديد، مش بس مع الـ hover
        triggerBurst();
      },
    });
    activeTweensRef.current.push(exitTween);
  };

  const next = () => goTo((activeIndex + 1) % products.length);
  const prev = () => goTo((activeIndex - 1 + products.length) % products.length);

  // Autoplay — effect منفصل بيتعمل مرة واحدة بس، بيستخدم ref عشان يفضل
  // شايف أحدث نسخة من next() من غير ما يحتاج يتعاد إنشاؤه مع كل سلايد
  const nextRef = useRef(next);
  nextRef.current = next;

  useEffect(() => {
    if (products.length < 2) return;
    let timer = null;
    let isPaused = false;

    const start = () => {
      timer = setInterval(() => {
        if (!document.hidden && !isPaused) nextRef.current();
      }, AUTOPLAY_INTERVAL);
    };

    const container = cardRef.current;
    const onEnter = () => (isPaused = true);
    const onLeave = () => (isPaused = false);

    start();
    container?.addEventListener("mouseenter", onEnter);
    container?.addEventListener("mouseleave", onLeave);

    return () => {
      if (timer) clearInterval(timer);
      container?.removeEventListener("mouseenter", onEnter);
      container?.removeEventListener("mouseleave", onLeave);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products.length]);

  if (isLoading || products.length === 0) return null;

  const name = getLocalizedField(product, "name", currentLang);
  const description = getLocalizedField(product, "description", currentLang);
  const origin = getLocalizedField(product, "origin", currentLang);
  const categoryName = product.category ? getLocalizedField(product.category, "name", currentLang) : "";
  const image = product.images?.[0];

  return (
    <section className="relative w-full bg-paper text-ink py-12 sm:py-10 px-4 sm:px-6 md:px-16 overflow-hidden">
      {/* خلفية جمالية خفيفة — نفس روح CategorySection/ProductsSection */}
      <div className="absolute top-1/2 start-0 -translate-y-1/2 w-96 h-96 bg-mint/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* الكارت الرئيسي — نفس مقاس كارت التصنيف/المنتج (p-8, rounded-[2rem]) */}
        <div
          ref={cardRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-center bg-card border border-line rounded-[2rem] p-6 sm:p-8 shadow-card relative overflow-hidden"
        >
          {/* تفاصيل المنتج النصية */}
          <div ref={textRef} className="flex flex-col justify-center space-y-4">
            {categoryName && (
              <span className="text-xs font-bold px-3 py-1 rounded-md shadow-sm bg-wheat-pale text-ink w-fit uppercase">
                {currentLang === "ar" ? "منتجاتنا الأحدث" : "Recently Added"} - {categoryName}
              </span>
            )}

            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-olive">{name}</h3>

            {description && (
              <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">{description}</p>
            )}

            {/* خصائص المحصول */}
            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-line">
              {origin && (
                <div className="flex items-center gap-2.5 bg-secondary p-3 rounded-xl border border-line">
                  <MapPin className="w-4 h-4 text-mint shrink-0" />
                  <div className="min-w-0">
                    <span className="block text-[10px] font-mono text-muted-foreground uppercase">
                      {t("product.origin")}
                    </span>
                    <span className="text-xs font-bold text-ink truncate block">{origin}</span>
                  </div>
                </div>
              )}
              {product.minOrderQty && (
                <div className="flex items-center gap-2.5 bg-secondary p-3 rounded-xl border border-line">
                  <ShieldCheck className="w-4 h-4 text-olive shrink-0" />
                  <div className="min-w-0">
                    <span className="block text-[10px] font-mono text-muted-foreground uppercase">
                      {t("product.minOrderQty")}
                    </span>
                    <span className="text-xs font-bold text-ink truncate block numeric">
                      {product.minOrderQty}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* زر الطلب */}
            <div className="pt-1">
              <NavLink
                to={`/products/${product.slug}`}
                className="inline-flex items-center gap-2 bg-olive text-paper px-5 py-3 rounded-xl font-medium text-sm hover:bg-[#0f2a20] transition-all duration-300 shadow-sm group"
              >
                <span>{currentLang === "ar" ? "اطلب عرض سعر بالجملة" : "Request Wholesale Quote"}</span>
                {isRtl ? (
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1.5 transition-transform" />
                ) : (
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                )}
              </NavLink>
            </div>

            {/* التنقل — نقاط + أسهم */}
            {products.length > 1 && (
              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-2">
                  {products.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goTo(i)}
                      className={`h-2 transition-all duration-300 rounded-full ${
                        activeIndex === i ? "w-8 bg-wheat" : "w-2 bg-line"
                      }`}
                      aria-label={`Product ${i + 1}`}
                    />
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={prev}
                    className="p-2 rounded-lg border border-line text-muted-foreground hover:bg-mint-pale hover:text-olive transition-colors"
                    aria-label="Previous"
                  >
                    <ArrowLeft className={`w-4 h-4 ${isRtl ? "icon-directional" : ""}`} />
                  </button>
                  <button
                    onClick={next}
                    className="p-2 rounded-lg border border-line text-muted-foreground hover:bg-mint-pale hover:text-olive transition-colors"
                    aria-label="Next"
                  >
                    <ArrowRight className={`w-4 h-4 ${isRtl ? "icon-directional" : ""}`} />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* صورة المنتج — نفس مقاس h-48 المستخدم في كروت التصنيف/المنتج */}
          <div
            ref={imageRef}
            className="relative h-80 rounded-2xl overflow-hidden shadow-sm"
            onMouseEnter={triggerBurst}
            onTouchStart={triggerBurst}
          >
            {image ? (
              <img
                src={image.url}
                alt={name}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
              />
            ) : (
              <div className="w-full h-full bg-mint-pale flex items-center justify-center">
                <Sparkles size={40} className="text-olive/40" strokeWidth={1.5} />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
            {/* ورق الشجر بيطير جوه إطار الصورة بس */}
            <div ref={leavesRef} className="absolute inset-0 overflow-hidden pointer-events-none z-20" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsShowcase;
import { useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ACCENT_THEMES, spawnLeafBurst } from "../../utils/leafBurst.js";
import { LOGO_SRC } from "../../config/logo.js";


const AboutHeroSection = ({ isAr, currentLang }) => {
  const { t } = useTranslation();

  const leavesRef = useRef(null);
  const activeTweensRef = useRef([]);

  useEffect(() => {
    return () => {
      activeTweensRef.current.forEach((tw) => tw.kill());
      activeTweensRef.current = [];
    };
  }, []);

  const triggerBurst = () => spawnLeafBurst(leavesRef.current, activeTweensRef, 12);

  return (
    <section className="relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(var(--ink) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <div className="absolute top-0 end-0 w-96 h-96 bg-mint/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 grid md:grid-cols-2 gap-10 md:gap-14 items-center relative z-10">
        <div>
          <span className="inline-block text-xs font-semibold tracking-wide uppercase text-mint bg-mint-pale rounded-full px-3 py-1 mb-5">
            {t("nav.about")}
          </span>

          <h1 className="font-display text-3xl md:text-4xl font-semibold text-ink mb-6 leading-tight">
            {isAr ? "شركة النصر لتعبئة الحاصلات الزراعية" : "Al Nasr Company for Agricultural Crops Packaging"}
          </h1>

          <p className="text-muted-foreground text-lg leading-relaxed">
            {isAr
              ? "من أرض مصر إلى العالم، نقدّم منتجات زراعية تلبي أعلى معايير الجودة العالمية، ونخدم الأسواق المحلية والدولية من خلال منظومة متكاملة للفرز والتصنيع والتصدير."
              : "From the land of Egypt to the world, we deliver agricultural products that meet the highest international quality standards. We serve both local and international markets through an integrated system for sorting, processing, and exporting agricultural crops."}
          </p>
        </div>

        {/* دائرة العلامة التجارية */}
        <div className="flex justify-center md:justify-end">
          <div
            className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-full flex items-center justify-center cursor-pointer"
            onMouseEnter={triggerBurst}
            onTouchStart={triggerBurst}
          >
            <div className="absolute inset-0 rounded-full bg-mint-pale animate-pulse" style={{ animationDuration: "3s" }} />
            <div className="absolute inset-4 rounded-full border-2 border-wheat/40" />
            <div className="absolute inset-8 rounded-full bg-card border border-line shadow-xl flex items-center justify-center p-6">
              <img
                src={LOGO_SRC[currentLang]}
                alt="Al Nasr - شركة النصر"
                className="w-full h-full object-contain"
              />
            </div>
            <div ref={leavesRef} className="absolute inset-0 overflow-hidden rounded-full pointer-events-none z-20" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHeroSection;
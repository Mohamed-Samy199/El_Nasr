import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Factory, ZoomIn, X } from "lucide-react";

// import { ACCENT_THEMES, spawnLeafBurst } from "../utils/leafBurst.js";
import { useLanguageStore } from "../../store/language.store.js";
import { ACCENT_THEMES } from "../../utils/leafBurst.js";

/**
 * قسم "مصنعنا" — تصميم مبدئي جاهز بصور placeholder لحد ما صور المصنع
 * الحقيقية توصل من العميل.
 *
 * لتفعيله بصور حقيقية: بس استبدل src: null بالمسار الحقيقي لكل صورة في
 * FACILITY_IMAGES تحت (أو حطها في public/facility/ واربط منها). مفيش أي
 * تعديل تاني مطلوب — الكارت بيتحول تلقائيًا من حالة "الصورة قريبًا" لعرض
 * الصورة الحقيقية + الـ lightbox بيشتغل عليها فورًا.
 *
 * الشكل هنا "شبكة بسيطة متساوية" (الخيار المقترح الأول) — سهل التحويل
 * لصورة رئيسية كبيرة + مصغّرات، أو slide أفقي، بمجرد ما نشوف عدد الصور
 * الحقيقية وأبعادها.
 */
const FACILITY_IMAGES = [
  { src: null, caption_en: "Facility exterior", caption_ar: "واجهة المصنع" },
  { src: null, caption_en: "Sorting line", caption_ar: "خط الفرز" },
  { src: null, caption_en: "Packing area", caption_ar: "منطقة التعبئة" },
  { src: null, caption_en: "Storage warehouse", caption_ar: "مخزن التخزين" },
  { src: null, caption_en: "Quality control", caption_ar: "مراقبة الجودة" },
  { src: null, caption_en: "Loading & export", caption_ar: "التحميل والتصدير" },
];

const FacilitySection = () => {
  const { t } = useTranslation();
  const currentLang = useLanguageStore((state) => state.currentLang);
  const isAr = currentLang === "ar";
  const [lightboxIndex, setLightboxIndex] = useState(null);

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-14 sm:pb-20">
      <div className="text-center mb-8 sm:mb-10">
        <span className="inline-block text-xs font-semibold tracking-wide uppercase text-mint bg-mint-pale rounded-full px-3 py-1 mb-4">
          {isAr ? "من الداخل" : "Behind the Scenes"}
        </span>
        <h2 className="font-display text-2xl font-semibold text-ink">
          {isAr ? "مصنعنا" : "Our Facility"}
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
        {FACILITY_IMAGES.map((image, index) => (
          <FacilityTile
            key={index}
            image={image}
            index={index}
            isAr={isAr}
            onOpen={() => setLightboxIndex(index)}
          />
        ))}
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          image={FACILITY_IMAGES[lightboxIndex]}
          isAr={isAr}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </section>
  );
};

const FacilityTile = ({ image, index, isAr, onOpen }) => {
  const theme = ACCENT_THEMES[index % ACCENT_THEMES.length];
  const leavesRef = useRef(null);
  const activeTweensRef = useRef([]);
  const caption = isAr ? image.caption_ar : image.caption_en;

  useEffect(() => {
    return () => {
      activeTweensRef.current.forEach((tw) => tw.kill());
      activeTweensRef.current = [];
    };
  }, []);

  const triggerBurst = () => {
    if (image.src) spawnLeafBurst(leavesRef.current, activeTweensRef);
  };

  return (
    <button
      onClick={onOpen}
      onMouseEnter={triggerBurst}
      onTouchStart={triggerBurst}
      className="group relative aspect-square rounded-[2rem] overflow-hidden border border-line shadow-card text-start"
    >
      {image.src ? (
        <>
          <img
            src={image.src}
            alt={caption}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-70" />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-10 h-10 rounded-full bg-paper/90 flex items-center justify-center">
              <ZoomIn size={18} className="text-olive" />
            </div>
          </div>
          <div ref={leavesRef} className="absolute inset-0 overflow-hidden pointer-events-none z-20" />
        </>
      ) : (
        // حالة placeholder — قريبًا هتتبدل بالصورة الحقيقية
        <div className={`w-full h-full flex flex-col items-center justify-center gap-2 ${theme.badgeBg}`}>
          <Factory size={28} className={theme.badgeText} strokeWidth={1.5} />
          <span className={`text-[11px] font-medium ${theme.badgeText} opacity-70`}>
            {isAr ? "الصورة قريبًا" : "Photo coming soon"}
          </span>
        </div>
      )}

      {caption && (
        <span className="absolute bottom-2.5 start-3 end-3 text-[11px] font-medium text-white z-10 truncate opacity-0 group-hover:opacity-100 transition-opacity">
          {image.src ? caption : ""}
        </span>
      )}
    </button>
  );
};

const Lightbox = ({ image, isAr, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const caption = isAr ? image.caption_ar : image.caption_en;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-ink/70 backdrop-blur-sm animate-fade-in" onClick={onClose} />
      <div className="relative max-w-3xl w-full animate-modal-in">
        <button
          onClick={onClose}
          className="absolute -top-12 end-0 w-9 h-9 rounded-full bg-paper/10 flex items-center justify-center text-paper hover:bg-paper/20 transition-colors"
          aria-label="Close"
        >
          <X size={18} />
        </button>
        <div className="rounded-[2rem] overflow-hidden bg-card shadow-2xl">
          {image.src ? (
            <img src={image.src} alt={caption} className="w-full h-auto max-h-[75vh] object-contain" />
          ) : (
            <div className="w-full aspect-video flex items-center justify-center bg-mint-pale">
              <Factory size={48} className="text-olive/40" strokeWidth={1.5} />
            </div>
          )}
          {caption && (
            <div className="px-5 py-3 border-t border-line">
              <p className="text-sm text-ink font-medium">{caption}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FacilitySection;
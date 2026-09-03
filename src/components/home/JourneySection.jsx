import { Ship, Wheat, Leaf } from "lucide-react";
import JourneyCard from "../../features/public-site/components/JourneyCard.jsx";
import { useLanguageStore } from "../../store/language.store.js";
import fieldVideo from "../../assests/field.webm";

const JOURNEY_STEPS = [
  { icon: Leaf, en: "The field", ar: "الحقل", en_desc: "Origin and harvest season", ar_desc: "المنشأ والموسم" },
  { icon: Wheat, en: "Packing", ar: "التعبئة", en_desc: "Grade and packaging spec", ar_desc: "الدرجة والتعبئة" },
  { icon: Ship, en: "Export", ar: "التصدير", en_desc: "Request a quote", ar_desc: "طلب عرض سعر" },
];

export default function JourneySection() {
  // ⚠️ ده كان السبب في "currentLang is not defined" — كان مستخدم من غير
  // ما يتجاب من الـ store أصلاً
  const currentLang = useLanguageStore((state) => state.currentLang);

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <h2 className="font-display text-2xl font-semibold text-ink mb-8 text-center">
        {currentLang === "ar" ? "المسار من الحقل للتصدير" : "The field-to-export journey"}
      </h2>

      <div className="grid sm:grid-cols-3 gap-5">
        {JOURNEY_STEPS.map(({ icon, en, ar, en_desc, ar_desc }, index) => (
          <JourneyCard
            key={en}
            icon={icon}
            title={currentLang === "ar" ? ar : en}
            description={currentLang === "ar" ? ar_desc : en_desc}
            videoSrc={fieldVideo}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}
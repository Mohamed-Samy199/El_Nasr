import {
  PackageOpen,
  Filter,
  SlidersHorizontal,
  Magnet,
  Wind,
  Package,
  Tag,
  Warehouse,
  Truck,
  ClipboardCheck,
} from "lucide-react";

import { useLanguageStore } from "../../../store/language.store.js";

// البنود ثابتة لكل المنتجات، فبنخزنها هنا بالعربي والإنجليزي
const ACTIVITIES = [
  {
    icon: PackageOpen,
    title: { ar: "استلام المحاصيل والحاصلات الزراعية", en: "Crop & Produce Receiving" },
    desc: {
      ar: "تفريغ الشحنات الواردة من الفاصوليا والحبوب والتقاوي وفحصها فحصاً أولياً.",
      en: "Unloading incoming shipments of beans, grains and seeds, followed by an initial inspection.",
    },
  },
  {
    icon: Filter,
    title: { ar: "الغربلة والتنقية الأولية", en: "Screening & Pre-Cleaning" },
    desc: {
      ar: "إزالة الشوائب الكبيرة والأتربة والأجسام الغريبة باستخدام الغرابيل الميكانيكية.",
      en: "Removing large impurities, dust and foreign matter using mechanical sieves.",
    },
  },
  {
    icon: SlidersHorizontal,
    title: { ar: "الفرز والتدريج (Sorting & Grading)", en: "Sorting & Grading" },
    desc: {
      ar: "تصنيف الحبوب والفاصوليا وفقاً للحجم واللون والجودة لتلبية معايير التصدير.",
      en: "Classifying grains and beans by size, color and quality to meet export standards.",
    },
  },
  {
    icon: Magnet,
    title: { ar: "الفصل بالمغناطيس والهواء", en: "Magnetic & Air Separation" },
    desc: {
      ar: "إزالة الشوائب المعدنية الخفيفة والأتربة الدقيقة لضمان سلامة المنتج.",
      en: "Removing light metallic particles and fine dust to guarantee product safety.",
    },
  },
  {
    icon: Wind,
    title: { ar: "التجفيف والتهوية", en: "Drying & Ventilation" },
    desc: {
      ar: "ضبط نسبة الرطوبة داخل الحبوب لحمايتها من العفن والتلف أثناء التخزين أو النقل.",
      en: "Controlling grain moisture to protect against mold and spoilage during storage or transport.",
    },
  },
  {
    icon: Package,
    title: { ar: "التعبئة والتغليف", en: "Filling & Packaging" },
    desc: {
      ar: "تعبئة الحبوب والفاصوليا في أكياس أو عبوات مخصصة وفق الشهادات والمواصفات المحلية والتصديرية.",
      en: "Packing grains and beans in dedicated bags or containers per local and export certifications and specifications.",
    },
  },
  {
    icon: Tag,
    title: { ar: "الوزن والوسم (Labeling)", en: "Weighing & Labeling" },
    desc: {
      ar: "وزن الشحنات وتثبيت البيانات التجارية ومواصفات المنتج على العبوات.",
      en: "Weighing shipments and printing commercial data and product specifications on the packs.",
    },
  },
  {
    icon: Warehouse,
    title: { ar: "التخزين الداخلي والتجميع", en: "Indoor Storage & Consolidation" },
    desc: {
      ar: "إدارة المخازن ورص العبوات بشكل آمن على طبالي خشبية أو بلاستيكية وفق الاشتراطات الصحية.",
      en: "Managing warehouses and stacking packs safely on wooden or plastic pallets per hygiene requirements.",
    },
  },
  {
    icon: Truck,
    title: { ar: "التحميل والتوريد للعملاء", en: "Loading & Customer Delivery" },
    desc: {
      ar: "تجهيز الشحنات ونقلها لتوريدها للمحلات أو الموانئ لغرض التصدير.",
      en: "Preparing shipments and transporting them to retailers or ports for export.",
    },
  },
  {
    icon: ClipboardCheck,
    title: { ar: "النظافة والمكافحة وضبط الجودة", en: "Hygiene, Pest Control & Quality Assurance" },
    desc: {
      ar: "سحب العينات باستمرار للفحص الدوري وتطبيق برامج النظافة ومكافحة الآفات داخل المحطة.",
      en: "Continuous sampling for periodic testing and applying sanitation and pest-control programs inside the station.",
    },
  },
];

const StationActivities = () => {
  const currentLang = useLanguageStore((state) => state.currentLang);
  const lang = currentLang === "ar" ? "ar" : "en";

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-12 sm:pb-16">
      {/* العنوان */}
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 space-y-3">
        <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-mint-pale text-olive">
          {lang === "ar" ? "من المزرعة إلى الميناء" : "From Farm to Port"}
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-olive">
          {lang === "ar" ? "أنشطة العمليات داخل المحطة" : "Station Operations Activities"}
        </h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {lang === "ar"
            ? "10 مراحل متكاملة نمرّ بها كل شحنة لنضمن لك جودة ثابتة ومطابقة لمعايير التصدير."
            : "10 integrated stages every shipment goes through to ensure consistent, export-grade quality."}
        </p>
      </div>

      {/* الكروت */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
        {ACTIVITIES.map(({ icon: Icon, title, desc }, i) => {
          const isMint = i % 2 === 0;
          return (
            <div
              key={i}
              className="group relative overflow-hidden rounded-[1.75rem] border border-line bg-card p-5 sm:p-6 flex items-start gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div
                className={`relative w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 ${
                  isMint ? "bg-mint-pale text-olive" : "bg-wheat-pale text-ink"
                }`}
              >
                <Icon size={22} strokeWidth={1.8} />
              </div>

              <div className="relative min-w-0 space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold text-olive/70 numeric">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="h-px w-6 bg-olive/20" />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-ink leading-snug">{title[lang]}</h3>
                <p className="text-xs sm:text-[13px] leading-relaxed text-muted-foreground">{desc[lang]}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default StationActivities;
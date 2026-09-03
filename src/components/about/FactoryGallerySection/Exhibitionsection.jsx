import { MapPin, Calendar, Award } from "lucide-react";

const EXHIBITION_FEATURES_AR = [
  "أحدث منتجاتنا من الحاصلات الزراعية",
  "نماذج حقيقية من حلول التعبئة والتغليف",
  "جلسات تعريفية عن معايير ومواصفات التصدير",
  "لقاءات مباشرة لعقد اتفاقيات وشراكات جديدة",
];

const EXHIBITION_FEATURES_EN = [
  "Our latest agricultural products",
  "Real packaging and packing solution samples",
  "Briefing sessions on export standards and specifications",
  "Direct meetings for new agreements and partnerships",
];

const ExhibitionSection = ({ isAr }) => {
  const features = isAr ? EXHIBITION_FEATURES_AR : EXHIBITION_FEATURES_EN;

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-14 sm:pb-20">
      <div className="bg-olive text-paper rounded-[2rem] p-6 sm:p-10 relative overflow-hidden">
        <div className="absolute -top-16 -end-16 w-64 h-64 bg-wheat/10 blur-[100px] pointer-events-none rounded-full" />

        <div className="relative z-10">
          <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-wide uppercase text-wheat bg-wheat/10 border border-wheat/30 rounded-full px-3 py-1 mb-5">
            <Award size={13} />
            {isAr ? "سجل مشاركاتنا" : "Track Record"}
          </span>

          <h2 className="font-display text-xl sm:text-2xl font-semibold mb-3 text-paper">
            {isAr
              ? "شاركنا في معرض Cairo Food Africa 2025"
              : "We participated in Cairo Food Africa 2025"}
          </h2>

          <p className="text-paper/75 text-sm leading-relaxed max-w-2xl mb-6">
            {isAr
              ? "واحد من أكبر معارض الغذاء في أفريقيا والشرق الأوسط — قدّمنا فيه أحدث منتجاتنا وفرص التعاون مع شركاء من مختلف دول العالم."
              : "One of the largest food exhibitions in Africa and the Middle East — where we presented our latest products and collaboration opportunities with partners from around the world."}
          </p>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6 mb-6 text-sm">
            <span className="flex items-center gap-2 text-paper/90">
              <MapPin size={15} className="text-wheat shrink-0" />
              {isAr ? "قاعة 5 / D41 — مركز مصر للمعارض الدولية" : "Hall 5 / D41 — Egypt International Exhibition Center"}
            </span>
            <span className="flex items-center gap-2 text-paper/90">
              <Calendar size={15} className="text-wheat shrink-0" />
              <span className="numeric">{isAr ? "9 – 12 ديسمبر 2025" : "Dec 9–12, 2025"}</span>
            </span>
          </div>

          <div className="grid sm:grid-cols-2 gap-2.5">
            {features.map((feature) => (
              <div key={feature} className="flex items-start gap-2 text-sm text-paper/80">
                <span className="w-1.5 h-1.5 rounded-full bg-wheat shrink-0 mt-1.5" />
                {feature}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExhibitionSection;
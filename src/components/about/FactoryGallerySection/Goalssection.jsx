import { CheckCircle2 } from "lucide-react";

/**
 * "أهدافنا" — محتوى جديد كليًا، معتمد من نفس رسمة "الرسالة–الرؤية–الأهداف"
 * الرسمية على صفحة الفيسبوك. مفيش نسخة قديمة لده، فمفيش تعارض نصوص.
 */
const GOALS_AR = [
  "رفع جودة المنتجات الزراعية المصرية وزيادة تنافسيتها عالميًا.",
  "التوسع في الأسواق الجديدة وبناء شبكة توريد قوية ومستدامة.",
  "الاعتماد على أحدث تقنيات الفرز والتعبئة لضمان الجودة والسلامة.",
  "إنشاء شراكات طويلة الأمد مع التجار والمستوردين داخل مصر وخارجها.",
  "تقديم خدمات مرنة وموثوقة تلبي احتياجات العملاء في كل خطوة.",
];

const GOALS_EN = [
  "Raising the quality of Egyptian agricultural products and increasing their global competitiveness.",
  "Expanding into new markets and building a strong, sustainable supply network.",
  "Relying on the latest sorting and packaging technologies to ensure quality and safety.",
  "Building long-term partnerships with traders and importers inside and outside Egypt.",
  "Providing flexible, reliable services that meet customer needs at every step.",
];

const GoalsSection = ({ isAr }) => {
  const goals = isAr ? GOALS_AR : GOALS_EN;

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-14 sm:pb-20">
      <div className="bg-card border border-line rounded-[2rem] shadow-card p-6 sm:p-10">
        <h2 className="font-display text-xl sm:text-2xl font-semibold text-ink mb-6 text-center">
          {isAr ? "أهدافنا" : "Our Goals"}
        </h2>

        <div className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
          {goals.map((goal) => (
            <div key={goal} className="flex items-start gap-3">
              <CheckCircle2 size={18} className="text-mint shrink-0 mt-0.5" strokeWidth={2} />
              <p className="text-sm text-muted-foreground leading-relaxed">{goal}</p>
            </div>
          ))}
        </div>

        {/* الشعار الختامي — من نفس الرسمة */}
        <p className="text-center font-display text-base sm:text-lg text-olive mt-8 pt-6 border-t border-line">
          {isAr
            ? "الجودة تبدأ من الأرض، وتنتهي عند رضا عملائنا."
            : "Quality begins in the field, and ends with our customers' satisfaction."}
        </p>
      </div>
    </section>
  );
};

export default GoalsSection;
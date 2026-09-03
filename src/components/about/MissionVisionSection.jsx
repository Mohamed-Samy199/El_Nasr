import { Target, Eye } from "lucide-react";
import { ACCENT_THEMES } from "../../utils/leafBurst.js";

const MissionVisionSection = ({ isAr }) => {
  const missionVision = [
    {
      icon: Target,
      title: isAr ? "رسالتنا" : "Our Mission",
      text: isAr
        ? "خدمة الأسواق المحلية والدولية من خلال منظومة متكاملة للفرز والتصنيع والتصدير للحاصلات الزراعية، باستخدام تقنيات متقدمة وعمليات تشغيل فعّالة لضمان الجودة الفائقة والنقاوة العالية ورضا العملاء."
        : "To serve both local and international markets through an integrated system for sorting, processing, and exporting agricultural crops, utilizing advanced technologies and efficient operations to ensure premium quality, high purity, and customer satisfaction.",
    },
    {
      icon: Eye,
      title: isAr ? "رؤيتنا" : "Our Vision",
      text: isAr
        ? "أن نجعل من المنتجات الزراعية المصرية خيارًا رائدًا في الأسواق العالمية، من خلال تقديم جودة واتساق وقيمة غذائية فائقة، بما يتماشى مع أعلى المعايير الدولية."
        : "To position Egyptian agricultural products as a leading choice in global markets by delivering superior quality, consistency, and nutritional value, in line with the highest international standards.",
    },
  ];

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-14 sm:pb-20">
      <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
        {missionVision.map(({ icon: Icon, title, text }, index) => {
          const theme = ACCENT_THEMES[index % ACCENT_THEMES.length];
          return (
            <div
              key={title}
              className="group relative bg-card border border-line rounded-[2rem] shadow-card p-6 sm:p-8 overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div
                className={`absolute -top-10 -end-10 w-32 h-32 rounded-full ${theme.glow} opacity-20 blur-xl transition-all duration-500 group-hover:scale-150 pointer-events-none`}
              />
              <div className="relative z-10">
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-transform duration-500 group-hover:rotate-12 ${theme.badgeBg} ${theme.badgeText}`}
                >
                  <Icon size={20} strokeWidth={2} />
                </div>
                <h2 className="font-display text-lg sm:text-xl font-semibold text-ink mb-2">{title}</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default MissionVisionSection;
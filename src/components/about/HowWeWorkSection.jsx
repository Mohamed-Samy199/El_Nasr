import { Leaf, Wheat, Ship } from "lucide-react";
import fieldVideo from "../../assests/field.webm";
import JourneyCard from "../../features/public-site/components/JourneyCard";

const HowWeWorkSection = ({ isAr }) => {
  const howWeWork = [
    {
      icon: Leaf,
      title: isAr ? "المنشأ" : "Origin",
      desc: isAr ? "محاصيل مصرية أصيلة من مزارع موثوقة" : "Authentic Egyptian crops from trusted farms",
    },
    {
      icon: Wheat,
      title: isAr ? "التعبئة" : "Packing",
      desc: isAr ? "تعبئة مطابقة لمواصفات الأسواق المستهدفة" : "Packaging that meets target market specifications",
    },
    {
      icon: Ship,
      title: isAr ? "التصدير" : "Export",
      desc: isAr ? "لأسواق محلية ودولية على حد سواء" : "For both local and international markets",
    },
  ];

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-14 sm:pb-20">
      <h2 className="font-display text-2xl font-semibold text-ink mb-8 text-center">
        {isAr ? "كيف نعمل" : "How We Work"}
      </h2>

      <div className="grid sm:grid-cols-3 gap-5">
        {howWeWork.map((step, index) => (
          <JourneyCard
            key={step.title}
            icon={step.icon}
            title={step.title}
            description={step.desc}
            videoSrc={fieldVideo}
            index={index}
          />
        ))}
      </div>
    </section>
  );
};

export default HowWeWorkSection;
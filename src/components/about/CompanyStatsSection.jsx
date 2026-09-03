/**
 * أرقام سريعة تدي إحساس إن الشركة كيان حقيقي وشغال بجدية.
 * غيّر الأرقام دي بالأرقام الحقيقية بتاعت الشركة.
 */
const CompanyStatsSection = ({ isAr }) => {
  const stats = [
    { value: "10+", labelAr: "سنوات خبرة", labelEn: "Years of Experience" },
    { value: "6+", labelAr: "دول نُصدّر لها", labelEn: "Export Destinations" },
    { value: "1000+", labelAr: "طن سنويًا", labelEn: "Tons Annually" },
    { value: "100%", labelAr: "جودة مطابقة للمواصفات", labelEn: "Quality Compliant" },
  ];

  return (
    <section className="bg-olive/5 border-y border-line">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-12 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 text-center">
        {stats.map((stat) => (
          <div key={stat.labelEn}>
            <div className="font-display text-2xl sm:text-3xl font-bold text-mint mb-1 numeric">
              {stat.value}
            </div>
            <div className="text-xs sm:text-sm text-muted-foreground">
              {isAr ? stat.labelAr : stat.labelEn}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CompanyStatsSection;
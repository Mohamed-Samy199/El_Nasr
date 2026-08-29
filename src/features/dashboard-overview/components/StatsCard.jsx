/**
 * كارت إحصائية واحدة — بيتكرر 4 مرات في صفحة الـ overview.
 * accent اختياري: بيلوّن الرقم بلون مختلف (mint/wheat/clay) حسب أهمية الرقم.
 */
const ACCENT_CLASSES = {
  default: "text-ink",
  mint: "text-mint",
  wheat: "text-wheat",
  clay: "text-clay",
};

const StatsCard = ({ label, value, icon: Icon, accent = "default" }) => {
  return (
    <div className="bg-card border border-line rounded-card shadow-card p-5">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-muted-foreground">{label}</span>
        {Icon && <Icon size={18} className="text-muted-foreground" strokeWidth={2} />}
      </div>
      <p className={`font-display text-3xl font-semibold ${ACCENT_CLASSES[accent]}`}>
        {value}
      </p>
    </div>
  );
};

export default StatsCard;

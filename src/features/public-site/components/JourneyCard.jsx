import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

/**
 * كارت بتاع قسم "المسار من الحقل للتصدير" — الفيديو ظاهر وشغال بشكل خفيف
 * (ambient) في الوضع العادي، ولما تعمل hover (أو touch على الموبايل)
 * بيختفي تمامًا وكأنه مفيش فيديو خالص.
 *
 * ملاحظات:
 * - الفيديو بيشتغل تلقائيًا (autoPlay) من غير مشاكل سياسات المتصفح لأنه
 *   muted + playsInline — المتصفحات بتسمح بالـ autoplay للفيديوهات
 *   المكتومة الصوت بغض النظر عن تفاعل المستخدم.
 * - بيتوقف (pause) لما يختفي بالـ hover عشان نوفر معالجة وهو مش ظاهر أصلاً.
 * - دعم اللمس (touch) صريح — الـ CSS group-hover مبيشتغلش على الموبايل،
 *   فبنتحكم في كل حاجة عبر state واحد يتغيّر من mouse وtouch مع بعض.
 * - احترام prefers-reduced-motion — لو المستخدم مفعّل تقليل الحركة، الفيديو
 *   مش هيشتغل تلقائيًا من الأساس.
 */
const JourneyCard = ({ icon: Icon, title, description, videoSrc, index = 0 }) => {
  const videoRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const prefersReducedMotion = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // تشغيل الفيديو تلقائيًا من أول ما الكارت يظهر (طالما مفيش hover ومفيش
  // تفضيل تقليل حركة)
  useEffect(() => {
    if (prefersReducedMotion()) return;
    if (!isHovered) {
      videoRef.current?.play().catch(() => {
        // بعض المتصفحات بترفض play() قبل أول تفاعل — نتجاهلها بأمان
      });
    }
  }, []);

  const handleEnter = () => {
    setIsHovered(true);
    videoRef.current?.pause();
  };

  const handleLeave = () => {
    setIsHovered(false);
    if (prefersReducedMotion()) return;
    videoRef.current?.play().catch(() => {});
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onTouchStart={handleEnter}
      onTouchEnd={handleLeave}
      className="group relative bg-card border border-line rounded-card shadow-card p-6 flex flex-col items-center text-center overflow-hidden cursor-pointer transition-colors duration-300 hover:border-mint"
    >
      {/* الفيديو — ظاهر بشكل خفيف افتراضيًا، وبيختفي تمامًا مع hover/touch */}
      {videoSrc && (
        <div className="absolute inset-0 z-0 overflow-hidden rounded-card">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className={`w-full h-full object-cover grayscale transition-opacity duration-700 ${
              isHovered ? "opacity-0" : "opacity-20"
            }`}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
          {/* تدرّج شفاف من لون الكارت عشان النص يفضل واضح فوق الفيديو */}
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-card/30" />
        </div>
      )}

      <div className="relative z-10 flex flex-col items-center">
        <div className="w-10 h-10 rounded-full bg-mint-pale flex items-center justify-center mb-3">
          <Icon size={18} className="text-olive" strokeWidth={2} />
        </div>
        <p className="font-display font-semibold text-ink mb-1">{title}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </motion.div>
  );
};

export default JourneyCard;
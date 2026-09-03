import { useState, useEffect, useRef, useMemo } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRight, ArrowLeft, Leaf, ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import { useLanguageStore } from "../../store/language.store.js";
import hero1 from '../../assests/hero/hero-1.png';
import hero2 from '../../assests/hero/hero-2.png';

/**
 * Hero slider للصفحة الرئيسية — محتوى ثنائي اللغة (نفس باترن _en/_ar بتاع
 * المنتجات)، متوافق مع RTL، وألوان مربوطة بالـ design tokens بتاعتنا بدل
 * hex ثابت (ماعدا حالات الشفافية اللي فيها تفاصيل تقنية موضحة تحت).
 *
 * تحسينات أداء عن النسخة الأصلية:
 * 1. عدد ورق الشجر بيتقل تلقائيًا على الموبايل (20 بدل 105) — 105 عنصر DOM
 *    + GSAP tween لكل واحد في كل transition كانت هتبقى تقيلة جدًا خصوصًا
 *    على أجهزة أضعف، وده أول حاجة الزائر بيشوفها في الموقع.
 * 2. احترام prefers-reduced-motion بالكامل — بدل ورق الشجر، تحويل ناعم (fade) بسيط.
 * 3. تنظيف كامل لكل GSAP tweens والـ interval عند مغادرة الصفحة (كان فيه
 *    تسريب ذاكرة (memory leak) لو المستخدم راح وجه للصفحة كذا مرة).
 * 4. إيقاف الـ autoplay لما التاب يبقى غير ظاهر (تبويب تاني) أو المستخدم
 *    يعمل hover — بيوفر معالجة غير ضرورية.
 * 5. الصور بجودة وحجم أقل (w=1280&q=60 بدل w=1920&q=80) — تحميل أخف
 *    من غير فرق بصري ملحوظ في خلفية بيها overlay غامق فوقها أصلاً.
 * 6. الروابط بقت React Router حقيقية (/products، /contact) بدل anchors
 *    (#products) اللي مش هتشتغل في موقعنا multi-page.
 */

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const MOBILE_QUERY = "(max-width: 768px)";

const HeroSlider = () => {
  const { t } = useTranslation();
  const currentLang = useLanguageStore((state) => state.currentLang);
  const isRtl = currentLang === "ar";

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const contentRef = useRef(null);
  const cardContentRef = useRef(null);
  const leavesContainerRef = useRef(null);
  const currentImageRef = useRef(null);
  const nextImageRef = useRef(null);
  const isMountedRef = useRef(true);
  const activeTweensRef = useRef([]);

  // محتوى ثنائي اللغة — نفس باترن _en/_ar بتاع المنتجات في الباك اند
  const slides = useMemo(
    () => [
      {
        id: "01",
        crop_en: "White Beans",
        crop_ar: "فاصوليا بيضاء",
        title_en: "From Egyptian Fields",
        title_ar: "من الحقول المصرية",
        highlight_en: "To Global Markets.",
        highlight_ar: "إلى الأسواق العالمية.",
        description_en:
          "Sourced directly from the fertile soils of Ashmoun, Egypt. Cleaned, sorted, and packaged to meet stringent international quality standards.",
        description_ar:
          "منتقاة مباشرة من أراضي أشمون الخصبة بمصر. منظّفة ومفروزة ومعبأة لتلبية أعلى معايير الجودة العالمية.",
        stats: {
          purity: "99.9%",
          origin_en: "Ashmoun, Egypt",
          origin_ar: "أشمون، مصر",
          status_en: "New Crop",
          status_ar: "محصول جديد",
        },
        bgImage: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1280&q=60",
      },
      {
        id: "02",
        crop_en: "Dry White Kidney Beans",
        crop_ar: "فاصوليا بيضاء جافة",
        title_en: "Handpicked Purity",
        title_ar: "نقاء مُنتقى بعناية",
        highlight_en: "Uncompromised Quality.",
        highlight_ar: "جودة بلا مساومة.",
        description_en:
          "Processed through advanced sorting lines to ensure optimal size, uniform shape, and complete foreign-matter removal for bulk importers.",
        description_ar:
          "تُعالج عبر خطوط فرز متقدمة لضمان الحجم الأمثل والشكل المنتظم وإزالة كاملة للشوائب لصالح مستوردي الجملة.",
        stats: {
          purity: "99.5%",
          origin_en: "Monufia, Egypt",
          origin_ar: "المنوفية، مصر",
          status_en: "Export Ready",
          status_ar: "جاهز للتصدير",
        },
        bgImage: hero1,
      },
      {
        id: "03",
        crop_en: "Beans (Grade A)",
        crop_ar: "فاصوليا درجة اولي",
        title_en: "Golden Harvest",
        title_ar: "حصاد ذهبي",
        highlight_en: "Pure Agricultural Export.",
        highlight_ar: "تصدير زراعي نقي.",
        description_en:
          "100% natural white beans, characterized by uniform grain size and quick cooking time, and rich in essential nutrients.",
        description_ar:
          "فاصوليا بيضاء طبيعية 100%. تتميز بحباتها متناسقة الحجم وسرعة التسويق والنضج، وغنية بالعناصر الغذائية الأساسية.",
        stats: {
          purity: "99.8%",
          origin_en: "Egypt Origin",
          origin_ar: "منشأ مصري",
          status_en: "Grade A",
          status_ar: "الدرجة الأولى",
        },
        bgImage: hero2,
      },
    ],
    []
  );

  const slide = slides[currentSlide];

  const killActiveTweens = () => {
    activeTweensRef.current.forEach((tween) => tween.kill());
    activeTweensRef.current = [];
  };

  const executeTransition = (targetIndex) => {
    if (isTransitioning || targetIndex === currentSlide) return;
    setIsTransitioning(true);

    // الـ transition اللي فات ضمنّا خلاصه بالكامل (isTransitioning gate
    // بيمنع أي transition جديد يبدأ قبل ما اللي قبله يخلص)، فمسموح نصفّر
    // الأرّاي هنا بدل ما تفضل تكبر لعدد غير محدود طول عمر الصفحة
    activeTweensRef.current = [];

    const nextData = slides[targetIndex];
    const prefersReducedMotion = window.matchMedia(REDUCED_MOTION_QUERY).matches;

    // ── وضع "حركة مخفّضة" — تحويل ناعم بدون ورق شجر، احترامًا لإعدادات
    // المستخدم (prefers-reduced-motion)، وأخف بكتير على المعالج ──
    if (prefersReducedMotion) {
      const tween = gsap.to([contentRef.current, cardContentRef.current], {
        opacity: 0,
        duration: 0.25,
        onComplete: () => {
          if (!isMountedRef.current) return;
          setCurrentSlide(targetIndex);
          if (currentImageRef.current) {
            currentImageRef.current.style.backgroundImage = `url(${nextData.bgImage})`;
          }
          gsap.to([contentRef.current, cardContentRef.current], {
            opacity: 1,
            duration: 0.35,
            onComplete: () => setIsTransitioning(false),
          });
        },
      });
      activeTweensRef.current.push(tween);
      return;
    }

    if (!leavesContainerRef.current) return;
    leavesContainerRef.current.innerHTML = "";

    const leafEmojis = ["🍃", "🍂", "🌿", "🌱", "🌾"];
    const isMobile = window.matchMedia(MOBILE_QUERY).matches;
    const totalLeaves = isMobile ? 40 : 90; // زودناها بناء على طلبك (كانت 20/50)
    let completedLeavesCount = 0;

    if (nextImageRef.current) {
      nextImageRef.current.style.backgroundImage = `url(${nextData.bgImage})`;
      gsap.set(nextImageRef.current, {
        clipPath: isRtl
          ? "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)"
          : "polygon(0 0, 0% 0, 0% 100%, 0 100%)",
        zIndex: 20,
        opacity: 1,
      });
    }

    if (contentRef.current && cardContentRef.current) {
      const tween = gsap.to([contentRef.current, cardContentRef.current], {
        opacity: 0,
        x: isRtl ? 25 : -25,
        duration: 0.25,
        ease: "power2.in",
      });
      activeTweensRef.current.push(tween);
    }

    // بناء ورق الشجر في documentFragment وإضافته دفعة واحدة — بيقلل
    // إعادة رسم المتصفح (reflow) مقارنة بإضافة كل عنصر لوحده
    const fragment = document.createDocumentFragment();
    const leafElements = [];

    for (let i = 0; i < totalLeaves; i++) {
      const leaf = document.createElement("div");
      leaf.textContent = leafEmojis[Math.floor(Math.random() * leafEmojis.length)];
      leaf.className = "absolute text-xl md:text-3xl pointer-events-none select-none z-40 opacity-0";
      leaf.style.willChange = "transform, opacity";

      const startY = Math.random() * window.innerHeight;
      const startX = isRtl
        ? window.innerWidth + 250 + Math.random() * 350
        : -250 - Math.random() * 350;
      leaf.style.left = `${startX}px`;
      leaf.style.top = `${startY}px`;

      fragment.appendChild(leaf);
      leafElements.push({ el: leaf, startY });
    }
    leavesContainerRef.current.appendChild(fragment);

    leafElements.forEach(({ el, startY }) => {
      const travelDuration = 1.4 + Math.random() * 0.7; // كانت 2.2-3.3 — قصّرناها عشان النص يظهر أسرع
      const delayTime = Math.random() * 0.3; // كانت حتى 0.6 — قصّرناها للنص
      const travelX = isRtl
        ? -(window.innerWidth + 600)
        : window.innerWidth + 600;

      const tween = gsap.to(el, {
        x: travelX,
        y: startY + (Math.random() * 400 - 200),
        rotation: Math.random() * 720,
        opacity: 0.95,
        duration: travelDuration,
        delay: delayTime,
        ease: "power1.out",
        onComplete: () => {
          el.style.willChange = "auto";
          completedLeavesCount++;
          if (completedLeavesCount === totalLeaves && isMountedRef.current) {
            setCurrentSlide(targetIndex);

            if (currentImageRef.current) {
              currentImageRef.current.style.backgroundImage = `url(${nextData.bgImage})`;
            }
            if (nextImageRef.current) {
              gsap.set(nextImageRef.current, {
                clipPath: isRtl
                  ? "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)"
                  : "polygon(0 0, 0% 0, 0% 100%, 0 100%)",
                opacity: 0,
              });
            }
            if (leavesContainerRef.current) {
              leavesContainerRef.current.innerHTML = "";
            }

            if (contentRef.current && cardContentRef.current) {
              const inTween = gsap.fromTo(
                [contentRef.current, cardContentRef.current],
                { opacity: 0, x: isRtl ? 25 : -25 },
                { opacity: 1, x: 0, duration: 0.35, ease: "power3.out" }
              );
              activeTweensRef.current.push(inTween);
            }

            setIsTransitioning(false);
          }
        },
      });
      activeTweensRef.current.push(tween);
    });

    if (nextImageRef.current) {
      const clipTween = gsap.to(nextImageRef.current, {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        duration: 2.2,
        ease: "power2.inOut",
      });
      activeTweensRef.current.push(clipTween);
    }
  };

  const nextSlide = () => {
    if (isTransitioning) return;
    executeTransition((currentSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    executeTransition((currentSlide - 1 + slides.length) % slides.length);
  };

  // نخزّن أحدث نسخة من nextSlide في ref — عشان الـ interval (اللي بيتعمل
  // مرة واحدة بس) يقدر ينده أحدث currentSlide/isTransitioning من غير ما
  // نحتاج نعيد إنشاء الـ effect نفسه مع كل تغيير حالة
  const nextSlideRef = useRef(nextSlide);
  nextSlideRef.current = nextSlide;

  // ⚠️ إصلاح مهم: الـ cleanup بتاع الأنيميشن (killActiveTweens) لازم يتنفذ
  // فقط لما الكومبوننت يتقفل فعليًا (unmount حقيقي) — مش مع كل تغيير في
  // currentSlide/isTransitioning. لو حطيناها في effect بتاعها dependency
  // array بيتغيّر أثناء transition، بتتقفل الأنيميشن الجارية نفسها في نص
  // الطريق (لأن isTransitioning بيبقى true فورًا أول ما تدوس على زرار،
  // فالـ effect بيعمل re-run وبيقفل الـ tweens اللي لسه شغالة)، وده كان
  // بيسبب الـ "freeze": isTransitioning بيفضل true للأبد لأن onComplete
  // مبيوصلش، فالأزرار تفضل معطّلة.
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      killActiveTweens();
    };
  }, []); // مرة واحدة بس — عند التركيب والفك الحقيقيين

  // Autoplay — effect منفصل تمامًا، بيتعمل مرة واحدة بس (مش بيتكرر مع كل
  // transition)، وبيوقف تلقائيًا لما التاب يبقى مخفي أو المستخدم يعمل hover
  useEffect(() => {
    let timer = null;
    let isPausedByHover = false;

    const start = () => {
      if (timer) clearInterval(timer);
      timer = setInterval(() => {
        if (!document.hidden && !isPausedByHover) nextSlideRef.current();
      }, 6000); // كانت 10 ثواني — قللناها لـ 6
    };

    const handleVisibility = () => {
      if (document.hidden && timer) clearInterval(timer);
      else start();
    };

    const container = leavesContainerRef.current?.parentElement;
    const handleMouseEnter = () => (isPausedByHover = true);
    const handleMouseLeave = () => (isPausedByHover = false);

    start();
    document.addEventListener("visibilitychange", handleVisibility);
    container?.addEventListener("mouseenter", handleMouseEnter);
    container?.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      if (timer) clearInterval(timer);
      document.removeEventListener("visibilitychange", handleVisibility);
      container?.removeEventListener("mouseenter", handleMouseEnter);
      container?.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []); // مرة واحدة بس — بيقرأ أحدث نسخة من nextSlide عبر nextSlideRef

  const crop = isRtl ? slide.crop_ar : slide.crop_en;
  const title = isRtl ? slide.title_ar : slide.title_en;
  const highlight = isRtl ? slide.highlight_ar : slide.highlight_en;
  const description = isRtl ? slide.description_ar : slide.description_en;
  const origin = isRtl ? slide.stats.origin_ar : slide.stats.origin_en;
  const status = isRtl ? slide.stats.status_ar : slide.stats.status_en;

  return (
    <section className="relative w-full min-h-[85vh] sm:min-h-[95vh] bg-ink text-paper flex items-center justify-center overflow-hidden py-14 sm:py-20 px-4 sm:px-6 md:px-16">
      {/* حاوية أوراق الشجر */}
      <div ref={leavesContainerRef} className="absolute inset-0 overflow-hidden pointer-events-none z-40" />

      {/* الخلفية الحالية */}
      <div
        ref={currentImageRef}
        className="absolute inset-0 z-10 bg-cover bg-center"
        style={{ backgroundImage: `url(${slide.bgImage})` }}
      >
        <div
          className={`absolute inset-0 z-10 bg-gradient-to-r ${
            isRtl ? "from-[#173129]/40 via-[#173129]/85 to-[#173129]" : "from-[#173129] via-[#173129]/85 to-[#173129]/40"
          }`}
        />
      </div>

      {/* الصورة القادمة */}
      <div
        ref={nextImageRef}
        className="absolute inset-0 z-20 pointer-events-none opacity-0 bg-cover bg-center"
        style={{
          clipPath: isRtl
            ? "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)"
            : "polygon(0 0, 0% 0, 0% 100%, 0 100%)",
        }}
      >
        <div
          className={`absolute inset-0 z-10 bg-gradient-to-r ${
            isRtl ? "from-[#173129]/40 via-[#173129]/85 to-[#173129]" : "from-[#173129] via-[#173129]/85 to-[#173129]/40"
          }`}
        />
      </div>

      {/* شبكة خلفية خفيفة */}
      <div
        className="absolute inset-0 opacity-10 z-30 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(247,244,235,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(247,244,235,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-50 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        {/* المحتوى النصي */}
        <div ref={contentRef} className="lg:col-span-7 flex flex-col justify-center">
          <div className="inline-flex items-center gap-3 bg-[#278A5B]/20 border border-[#278A5B]/40 px-4 py-2 rounded-full backdrop-blur-md w-fit mb-6">
            <Leaf className="w-4 h-4 text-wheat" />
            <span className="text-xs font-medium text-mint-pale">{t("hero.badge")}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-6xl text-paper font-black tracking-tight leading-[1.1] sm:leading-[1.05] mb-5 sm:mb-6 min-h-[110px] sm:min-h-[150px] md:min-h-[180px]">
            {title} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D8B663] via-[#278A5B] to-[#D9EFDD]">
              {highlight}
            </span>
          </h1>

          <p className="text-secondary/90 text-base sm:text-lg font-normal leading-relaxed max-w-2xl mb-8 sm:mb-10 min-h-[60px] sm:min-h-[80px]">
            {description}
          </p>

          <div className="flex flex-wrap items-center gap-4 sm:gap-5">
            <NavLink
              to="/products"
              className="group flex items-center gap-3 bg-mint hover:bg-olive border border-mint text-paper px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-medium transition-all duration-300 shadow-xl shadow-[#278A5B]/20"
            >
              <span>{t("hero.exploreProducts")}</span>
              {isRtl ? (
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1.5 transition-transform" />
              ) : (
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              )}
            </NavLink>

            <NavLink
              to="/contact"
              className="flex items-center gap-2 bg-[#F7F4EB]/10 hover:bg-[#F7F4EB]/20 border border-[#F7F4EB]/20 text-paper px-6 sm:px-7 py-3.5 sm:py-4 rounded-xl font-medium backdrop-blur-md transition-all duration-300"
            >
              <span>{t("hero.requestQuote")}</span>
              <ArrowUpRight className={`w-4 h-4 text-wheat ${isRtl ? "icon-directional" : ""}`} />
            </NavLink>
          </div>
        </div>

        {/* بطاقة مواصفات المحصول */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <div
            ref={cardContentRef}
            className="w-full max-w-md bg-[#173F31]/80 backdrop-blur-xl border border-[#D8B663]/30 p-6 sm:p-8 rounded-3xl shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-[#D8B663]/10 blur-3xl rounded-full pointer-events-none" />

            <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#F7F4EB]/10">
              <span className="text-xs font-mono text-wheat bg-[#D8B663]/10 px-3 py-1 rounded-md border border-[#D8B663]/20">
                {t("hero.cropSpec")}
              </span>
              <span className="text-xs font-mono text-mint-pale">{t("hero.exportBadge")}</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold mb-6 text-paper min-h-[36px] sm:min-h-[40px]">
              {crop}
            </h3>

            <div className="space-y-4 mb-8">
              <StatRow label={t("hero.purity")} value={slide.stats.purity} valueClass="text-mint" />
              <StatRow label={t("hero.origin")} value={origin} valueClass="text-paper" />
              <StatRow label={t("hero.status")} value={status} valueClass="text-wheat" />
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => executeTransition(index)}
                    disabled={isTransitioning}
                    className={`h-2 transition-all duration-300 rounded-full ${
                      currentSlide === index ? "w-8 bg-wheat" : "w-2 bg-[#F7F4EB]/30"
                    }`}
                    aria-label={`Slide ${index + 1}`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={prevSlide}
                  disabled={isTransitioning}
                  className="p-2.5 rounded-lg bg-ink border border-[#F7F4EB]/15 text-paper hover:bg-mint transition-colors disabled:opacity-50"
                  aria-label="Previous"
                >
                  <ArrowLeft className={`w-4 h-4 ${isRtl ? "icon-directional" : ""}`} />
                </button>
                <button
                  onClick={nextSlide}
                  disabled={isTransitioning}
                  className="p-2.5 rounded-lg bg-ink border border-[#F7F4EB]/15 text-paper hover:bg-mint transition-colors disabled:opacity-50"
                  aria-label="Next"
                >
                  <ArrowRight className={`w-4 h-4 ${isRtl ? "icon-directional" : ""}`} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const StatRow = ({ label, value, valueClass }) => (
  <div className="flex items-center justify-between bg-ink p-3.5 sm:p-4 rounded-xl border border-[#F7F4EB]/10">
    <span className="text-xs font-mono text-muted-foreground">{label}</span>
    <span className={`text-sm font-bold font-mono ${valueClass}`}>{value}</span>
  </div>
);

export default HeroSlider;





























// {
//         id: "03",
//         crop_en: "Natural Sesame Seeds",
//         crop_ar: "سمسم طبيعي",
//         title_en: "Golden Harvest",
//         title_ar: "حصاد ذهبي",
//         highlight_en: "Pure Agricultural Export.",
//         highlight_ar: "تصدير زراعي نقي.",
//         description_en:
//           "Rich in flavor and high in oil content. Prepared and packed under strict supervisory guidelines to fulfill worldwide supply chain demands.",
//         description_ar:
//           "غني بالنكهة وبنسبة زيت عالية. يُجهّز ويُعبأ تحت إشراف دقيق لتلبية متطلبات سلاسل الإمداد العالمية.",
//         stats: {
//           purity: "99.8%",
//           origin_en: "Egypt Origin",
//           origin_ar: "منشأ مصري",
//           status_en: "Grade A",
//           status_ar: "الدرجة الأولى",
//         },
//         bgImage: "https://media.istockphoto.com/id/2281777234/photo/image-of-dried-cannellini-beans-white-kidney-beans-pulses-healthy-eating-protein-fibre.jpg?s=612x612&w=0&k=20&c=3wbNSqY3_ubI_yQ7dIGWqKPMaLzAYzlhBUTXO5bDQIk=",
//       },
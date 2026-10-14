import { useState, useEffect } from "react";
import {
  BadgeCheck,
  ShieldCheck,
  FileText,
  ZoomIn,
  X,
  ExternalLink,
  Landmark,
  MapPin,
  Factory,
  Building2,
  ScrollText,
} from "lucide-react";

// ───────── بيانات المستندات (عدّل هنا بس) ─────────
const ISO = {
  src: "/credentials/iso-9001-certificate.webp",
  verifyUrl: "https://www.ossmideast.com/verify-certificates",
  // املاهم لما توصل الشهادة النهائية — بيظهروا تلقائياً لما يبقوا غير فاضيين
  certNo: "",
  validUntil: "",
};

const REGISTER = {
  src: "/credentials/commercial-register.webp", // نسخة مطموسة البيانات الشخصية
  registerNo: "", // رقم السجل التجاري (اختياري)
};

const T = {
  ar: {
    badge: "شفافية وثقة",
    title: "الاعتمادات والتراخيص",
    subtitle: "شركتنا مرخصة رسمياً وحاصلة على شهادة الجودة الدولية ISO 9001:2015، ومستنداتنا متاحة للاطلاع والتحقق.",
    isoTitle: "شهادة نظام إدارة الجودة",
    isoSub: "ISO 9001:2015",
    isoBody: "صادرة عن OSS Middle East ومعتمدة من المجلس الوطني للاعتماد (EGAC).",
    verify: "تحقق من الشهادة",
    view: "عرض المستند",
    close: "إغلاق",
    open: "فتح في تبويب جديد",
    regTitle: "السجل التجاري",
    regBody: "منشأة مسجلة رسمياً بمصلحة السجل التجاري، وبياناتها القانونية موثقة.",
    certNo: "رقم الشهادة",
    validUntil: "سارية حتى",
    regNo: "رقم السجل",
    facts: [
      { icon: Landmark, label: "الجهة المصدرة", value: "الإدارة المركزية للسجل التجاري — مكتب أشمون المميز" },
      { icon: MapPin, label: "المقر", value: " مركز أشمون — المنوفية" },
      { icon: Factory, label: "النشاط", value: "تجارة الحبوب وتوريد الحاصلات الزراعية" },
    ],
    trust: [
      { icon: ShieldCheck, title: "ISO 9001:2015", desc: "نظام إدارة الجودة" },
      { icon: BadgeCheck, title: "EGAC", desc: "جهة منح معتمدة" },
      { icon: ScrollText, title: "سجل تجاري رسمي", desc: "مكتب أشمون المميز" },
    ],
    isoAlt: "شهادة الأيزو 9001 لمحطة النصر",
    regAlt: "السجل التجاري لشركة النصر",
  },
  en: {
    badge: "Trust & Transparency",
    title: "Accreditations & Licenses",
    subtitle: "We are officially licensed and ISO 9001:2015 certified, and our documents are open for review and verification.",
    isoTitle: "Quality Management System Certificate",
    isoSub: "ISO 9001:2015",
    isoBody: "Issued by OSS Middle East and accredited by the Egyptian Accreditation Council (EGAC).",
    verify: "Verify Certificate",
    view: "View Document",
    close: "Close",
    open: "Open in new tab",
    regTitle: "Commercial Register",
    regBody: "An officially registered establishment with its legal details on record.",
    certNo: "Certificate No.",
    validUntil: "Valid until",
    regNo: "Register No.",
    facts: [
      { icon: Landmark, label: "Issuing Authority", value: "Central Administration for Commercial Registry — Ashmoun Office" },
      { icon: MapPin, label: "Location", value: "Talya, Ashmoun — Menoufia, Egypt" },
      { icon: Factory, label: "Activity", value: "Grain trading & agricultural crops supply" },
    ],
    trust: [
      { icon: ShieldCheck, title: "ISO 9001:2015", desc: "Quality Management System" },
      { icon: BadgeCheck, title: "EGAC", desc: "Accredited certification body" },
      { icon: ScrollText, title: "Official Register", desc: "Ashmoun Commercial Registry" },
    ],
    isoAlt: "Al Nasr ISO 9001 certificate",
    regAlt: "Al Nasr commercial register",
  },
};

// ───────── Lightbox ─────────
const Lightbox = ({ src, alt, onClose, closeLabel, openLabel }) => {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div className="absolute top-4 end-4 flex items-center gap-2 z-10">
        <a
          href={src}
          target="_blank"
          rel="noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold bg-white/10 text-white border border-white/20 hover:bg-white/20 transition-colors"
        >
          <ExternalLink size={14} />
          <span className="hidden sm:inline">{openLabel}</span>
        </a>
        <button
          onClick={onClose}
          aria-label={closeLabel}
          className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10 text-white border border-white/20 hover:bg-white/20 transition-colors"
        >
          <X size={18} />
        </button>
      </div>

      <img
        src={src}
        alt={alt}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[88vh] max-w-full rounded-2xl shadow-2xl bg-white object-contain"
      />
    </div>
  );
};

// ───────── السيكشن ─────────
const CredentialsSection = ({ isAr }) => {
  const t = isAr ? T.ar : T.en;
  const [active, setActive] = useState(null); // "iso" | "register" | null

  const isoMeta = [
    ISO.certNo && { label: t.certNo, value: ISO.certNo },
    ISO.validUntil && { label: t.validUntil, value: ISO.validUntil },
  ].filter(Boolean);

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      {/* العنوان */}
      <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 space-y-3">
        <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-mint-pale text-olive">
          <BadgeCheck size={14} />
          {t.badge}
        </span>
        <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-olive">{t.title}</h2>
        <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">{t.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* الشهادة — ورقة بطبقات */}
        <div className="lg:col-span-5">
          <button
            onClick={() => setActive("iso")}
            className="group relative block w-full max-w-sm mx-auto text-start"
            aria-label={t.view}
          >
            {/* طبقات الورق الخلفية */}
            <div className="absolute inset-0 rounded-3xl bg-wheat-pale border border-line rotate-[-4deg] transition-transform duration-500 group-hover:rotate-[-6deg]" />
            <div className="absolute inset-0 rounded-3xl bg-mint-pale border border-line rotate-[3deg] transition-transform duration-500 group-hover:rotate-[5deg]" />

            <div className="relative rounded-3xl p-2.5 bg-card border border-line shadow-xl overflow-hidden transition-transform duration-500 group-hover:-translate-y-1">
              <div className="relative rounded-2xl overflow-hidden aspect-[924/1308] bg-mint-pale">
                <img
                  src={ISO.src}
                  alt={t.isoAlt}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-olive/0 group-hover:bg-olive/40 transition-colors duration-300">
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold bg-paper text-olive shadow-lg opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <ZoomIn size={16} />
                    {t.view}
                  </span>
                </div>
              </div>
            </div>
          </button>
        </div>

        {/* التفاصيل */}
        <div className="lg:col-span-7 space-y-5">
          {/* كارت الشهادة */}
          <div className="rounded-[2rem] border border-line bg-card p-5 sm:p-7 space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-mint-pale text-olive flex items-center justify-center shrink-0">
                <ShieldCheck size={22} strokeWidth={1.8} />
              </div>
              <div className="min-w-0 space-y-1">
                <h3 className="text-base sm:text-lg font-bold text-ink leading-snug">{t.isoTitle}</h3>
                <span className="inline-block text-xs font-bold text-olive numeric">{t.isoSub}</span>
              </div>
            </div>

            <p className="text-sm leading-relaxed text-muted-foreground">{t.isoBody}</p>

            {isoMeta.length > 0 && (
              <div className="grid grid-cols-2 gap-3">
                {isoMeta.map((m) => (
                  <div key={m.label} className="rounded-xl bg-paper border border-line px-3 py-2">
                    <span className="block text-[11px] font-semibold text-muted-foreground">{m.label}</span>
                    <span className="block text-xs font-bold text-ink numeric">{m.value}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="flex flex-wrap gap-3 pt-1">
              <button
                onClick={() => setActive("iso")}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold bg-olive text-paper hover:opacity-95 transition-opacity"
              >
                <ZoomIn size={16} />
                {t.view}
              </button>
              <a
                href={ISO.verifyUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold border border-line text-olive hover:bg-mint-pale transition-colors"
              >
                <ExternalLink size={16} />
                {t.verify}
              </a>
            </div>
          </div>

          {/* كارت السجل التجاري */}
          <div className="rounded-[2rem] border border-line bg-card p-5 sm:p-7 space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-wheat-pale text-ink flex items-center justify-center shrink-0">
                <Building2 size={22} strokeWidth={1.8} />
              </div>
              <div className="min-w-0 space-y-1">
                <h3 className="text-base sm:text-lg font-bold text-ink leading-snug">{t.regTitle}</h3>
                {REGISTER.registerNo && (
                  <span className="inline-block text-xs font-bold text-olive numeric">
                    {t.regNo}: {REGISTER.registerNo}
                  </span>
                )}
              </div>
            </div>

            <p className="text-sm leading-relaxed text-muted-foreground">{t.regBody}</p>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {t.facts.map(({ icon: Icon, label, value }, i) => (
                <li
                  key={label}
                  className={`flex items-start gap-3 rounded-2xl border border-line bg-paper p-3 ${
                    i === 0 ? "sm:col-span-2" : ""
                  }`}
                >
                  <div className="w-9 h-9 rounded-xl bg-mint-pale text-olive flex items-center justify-center shrink-0">
                    <Icon size={16} />
                  </div>
                  <div className="min-w-0">
                    <span className="block text-[11px] font-semibold text-muted-foreground">{label}</span>
                    <span className="block text-xs font-bold text-ink leading-relaxed">{value}</span>
                  </div>
                </li>
              ))}
            </ul>

            <button
              onClick={() => setActive("register")}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold border border-line text-olive hover:bg-mint-pale transition-colors"
            >
              <FileText size={16} />
              {t.view}
            </button>
          </div>
        </div>
      </div>

      {/* شريط الشارات */}
      <div className="mt-10 sm:mt-14 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {t.trust.map(({ icon: Icon, title, desc }, i) => (
          <div
            key={title}
            className="flex items-center gap-3 rounded-2xl border border-line bg-card p-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
          >
            <div
              className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                i % 2 === 0 ? "bg-mint-pale text-olive" : "bg-wheat-pale text-ink"
              }`}
            >
              <Icon size={20} />
            </div>
            <div className="min-w-0">
              <span className="block text-sm font-bold text-ink numeric">{title}</span>
              <span className="block text-xs text-muted-foreground">{desc}</span>
            </div>
          </div>
        ))}
      </div>

      {active && (
        <Lightbox
          src={active === "iso" ? ISO.src : REGISTER.src}
          alt={active === "iso" ? t.isoAlt : t.regAlt}
          onClose={() => setActive(null)}
          closeLabel={t.close}
          openLabel={t.open}
        />
      )}
    </section>
  );
};

export default CredentialsSection;
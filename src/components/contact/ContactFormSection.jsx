import { useTranslation } from "react-i18next";
import {
  Phone,
  Mail,
  MapPin,
  Globe,
  MessageSquareText,
} from "lucide-react";

import QuoteRequestForm from "../../features/public-site/components/QuoteRequestForm.jsx";
import { ACCENT_THEMES } from "../../utils/leafBurst.js";

const CONTACT_ITEMS = [
  {
    icon: Phone,
    value: "01140156010",
    numeric: true,
    label_en: "Phone",
    label_ar: "تليفون",
    href: "tel:01140156010",
  },
  {
    icon: Phone,
    value: "01270952548",
    numeric: true,
    label_en: "Phone",
    label_ar: "تليفون",
    href: "tel:01270952548",
  },
  {
    icon: Mail,
    value: "elnasrcompanyagricultural@gmail.com",
    label_en: "Email",
    label_ar: "البريد الإلكتروني",
    href: "mailto:elnasrcompanyagricultural@gmail.com",
  },
  {
    icon: MapPin,
    value: "Asmoun, El Menoufia, Egypt",
    value_ar: "أشمون، المنوفية، مصر",
    label_en: "Address",
    label_ar: "العنوان",
    href: "https://www.google.com/maps/search/?api=1&query=Asmoun%2C%20El%20Menoufia%2C%20Egypt",
    external: true,
  },
  {
    icon: Globe,
    value: "www.alnasr.com",
    label_en: "Website",
    label_ar: "الموقع الإلكتروني",
    href: "https://www.alnasr.com",
    external: true,
  },
];

/**
 * سكشن التواصل + الفورم — عمود معلومات التواصل (كروت بأيقونات ملوّنة
 * بتدوير ACCENT_THEMES) بجانب كارت الفورم الأكبر بحواف rounded-[2rem].
 */
const ContactFormSection = ({ isAr, products }) => {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(var(--ink) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="absolute top-0 start-0 w-96 h-96 bg-mint/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16 relative z-10">
        <span className="inline-block text-xs font-semibold tracking-wide uppercase text-mint bg-mint-pale rounded-full px-3 py-1 mb-5">
          {isAr ? "تواصل معنا" : "Get In Touch"}
        </span>

        <div className="grid md:grid-cols-5 gap-10 md:gap-12">

          {/* عمود معلومات التواصل */}
          <div className="md:col-span-2">
            <h1 className="font-display text-3xl font-semibold text-ink mb-4">
              {t("nav.requestQuote")}
            </h1>

            <p className="text-muted-foreground leading-relaxed mb-8">
              {isAr
                ? "تواصل معنا مباشرة أو املأ نموذج طلب عرض السعر، وسيقوم فريقنا بالرد عليك في أقرب وقت."
                : "Reach out directly or fill in the quote request form, and our team will get back to you shortly."}
            </p>

            <div className="space-y-3">
              {CONTACT_ITEMS.map(
                (
                  {
                    icon: Icon,
                    value,
                    value_ar,
                    label_en,
                    label_ar,
                    numeric,
                    href,
                    external,
                  },
                  index
                ) => {
                  const theme =
                    ACCENT_THEMES[index % ACCENT_THEMES.length];

                  return (
                    <a
                      key={label_en + value}
                      href={href}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noopener noreferrer" : undefined}
                      className="flex items-center gap-3 bg-card border border-line rounded-2xl p-3.5 hover:border-mint/40 hover:shadow-sm transition-all duration-300 group"
                    >
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${theme.badgeBg} ${theme.badgeText} group-hover:scale-105 transition-transform duration-300`}
                      >
                        <Icon size={16} strokeWidth={2} />
                      </div>

                      <div className="min-w-0">
                        <span className="block text-[11px] font-semibold text-muted-foreground">
                          {isAr ? label_ar : label_en}
                        </span>

                        <span
                          className={`text-[12px] md:text-sm font-bold text-ink truncate block group-hover:text-mint transition-colors ${
                            numeric ? "numeric" : ""
                          }`}
                        >
                          {isAr && value_ar ? value_ar : value}
                        </span>
                      </div>
                    </a>
                  );
                }
              )}
            </div>
          </div>

          {/* عمود الفورم */}
          <div className="md:col-span-3">
            <div className="relative bg-card border border-line rounded-[2rem] shadow-card p-6 sm:p-8 overflow-hidden">
              <div className="absolute -top-10 -end-10 w-32 h-32 rounded-full bg-mint opacity-10 blur-xl pointer-events-none" />

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-mint-pale text-olive flex items-center justify-center shrink-0">
                    <MessageSquareText size={18} strokeWidth={2} />
                  </div>

                  <h2 className="font-display text-lg sm:text-xl font-semibold text-ink">
                    {t("quoteRequest.title")}
                  </h2>
                </div>

                <QuoteRequestForm products={products} />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactFormSection;

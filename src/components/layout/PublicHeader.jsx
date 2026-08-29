import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Menu, X } from "lucide-react";
import LanguageSwitcher from "../shared/LanguageSwitcher.jsx";
import { useLanguageStore } from "../../store/language.store.js";
import { LOGO_SRC } from "../../config/logo.js";

const NAV_LINKS = [
  { to: "/", key: "nav.home", end: true },
  { to: "/products", key: "nav.products" },
  { to: "/about", key: "nav.about" },
  { to: "/contact", key: "nav.contact" },
];



const PublicHeader = () => {
  const { t } = useTranslation();
  const currentLang = useLanguageStore((state) => state.currentLang);
  const [mobileOpen, setMobileOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    isActive ? "text-olive" : "hover:text-olive transition-colors";

  return (
    // z-[60] لازم يفضل أعلى من أي z-index جوه الـ Hero (اللي بيوصل z-50)،
    // وإلا محتوى الـ Hero بيرسم فوق الهيدر أثناء السكرول بما إنه جاي بعده
    // في ترتيب الـ HTML وبنفس الرقم — ده كان سبب المشكلة في الصورة اللي بعتها
    <header className="sticky top-0 z-[60] bg-paper border-b border-line">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
        <NavLink to="/" className="flex items-center shrink-0">
          <img
            src={LOGO_SRC[currentLang]}
            alt="Al Nasr - النصر"
            className="h-14 sm:h-16 w-auto object-contain"
          />
        </NavLink>

        {/* نافيجيشن الديسكتوب */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-ink">
          {NAV_LINKS.map(({ to, key, end }) => (
            <NavLink key={to} to={to} end={end} className={linkClass}>
              {t(key)}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageSwitcher />
          <NavLink
            to="/contact"
            className="hidden sm:inline-flex items-center rounded-full bg-olive text-paper text-sm font-medium px-4 py-2 hover:bg-[#0f2a20] transition-colors"
          >
            {t("nav.requestQuote")}
          </NavLink>

          {/* زرار الهامبرجر — يظهر بس على الموبايل/التابلت */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-full border border-line text-ink"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* قائمة الموبايل — بتظهر تحت الهيدر مباشرة */}
      {mobileOpen && (
        <nav className="md:hidden border-t border-line bg-paper px-4 sm:px-6 py-4 flex flex-col gap-1">
          {NAV_LINKS.map(({ to, key, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `rounded-card px-3 py-2.5 text-sm font-medium ${
                  isActive ? "bg-mint-pale text-olive" : "text-ink hover:bg-secondary"
                }`
              }
            >
              {t(key)}
            </NavLink>
          ))}
          <NavLink
            to="/contact"
            onClick={() => setMobileOpen(false)}
            className="mt-2 inline-flex justify-center items-center rounded-full bg-olive text-paper text-sm font-medium px-4 py-2.5"
          >
            {t("nav.requestQuote")}
          </NavLink>
        </nav>
      )}
    </header>
  );
};

export default PublicHeader;
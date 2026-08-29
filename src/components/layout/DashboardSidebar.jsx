import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  LayoutDashboard,
  Package,
  Tags,
  MessageSquareText,
  X,
} from "lucide-react";
import { useLanguageStore } from "../../store/language.store.js";
import { LOGO_SRC_LIGHT } from "../../config/logo.js";

const NAV_ITEMS = [
  {
    to: "/dashboard",
    icon: LayoutDashboard,
    labelKey: "dashboard.overview",
    end: true,
  },
  {
    to: "/dashboard/products",
    icon: Package,
    labelKey: "dashboard.products",
  },
  {
    to: "/dashboard/categories",
    icon: Tags,
    labelKey: "dashboard.categories",
  },
  {
    to: "/dashboard/quote-requests",
    icon: MessageSquareText,
    labelKey: "dashboard.quoteRequests",
  },
];

/**
 * Sidebar بلون --olive زي ما حددنا في نظام الألوان (Sidebar الداشبورد).
 * على الديسكتوب: ثابت جوه العمود. على الموبايل: بيتحط جوه overlay من
 * DashboardLayout ويتفتح/يتقفل بزرار الهامبرجر في DashboardTopbar.
 */
const DashboardSidebar = ({ onNavigate, onClose, isMobile = false }) => {
  const { t } = useTranslation();
  const currentLang = useLanguageStore((state) => state.currentLang);

  return (
    <aside
      className={`w-64 shrink-0 bg-olive text-paper min-h-screen p-5 flex flex-col ${
        isMobile ? "" : "hidden md:flex"
      }`}
    >
      <div className="flex items-center justify-between mb-8 px-2">
        <div>
          <NavLink to="/" onClick={onNavigate} className="block">
            <img
              src={LOGO_SRC_LIGHT[currentLang]}
              alt="Al Nasr - النصر"
              className="h-14 sm:h-16 w-auto max-w-[180px] object-contain"
            />
          </NavLink>

          <p className="text-xs md:text-xl text-mint-pale/70 mt-2">
            {t("dashboard.title")}
          </p>
        </div>

        {isMobile && (
          <button
            onClick={onClose}
            className="text-paper/80 hover:text-paper"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        )}
      </div>

      <nav className="flex flex-col gap-1">
        {NAV_ITEMS.map(({ to, icon: Icon, labelKey, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={onNavigate}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-card px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-mint-pale text-olive"
                  : "text-paper/80 hover:bg-white/5 hover:text-paper"
              }`
            }
          >
            <Icon size={18} strokeWidth={2} />
            {t(labelKey)}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default DashboardSidebar;

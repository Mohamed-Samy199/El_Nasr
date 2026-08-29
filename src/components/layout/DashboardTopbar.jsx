import { useTranslation } from "react-i18next";
import { LogOut, Menu } from "lucide-react";
import LanguageSwitcher from "../shared/LanguageSwitcher.jsx";
import { useAuthStore } from "../../store/auth.store.js";

const DashboardTopbar = ({ onMenuClick }) => {
  const { t } = useTranslation();
  const { user, logout } = useAuthStore();

  return (
    <header className="flex items-center justify-between border-b border-line bg-card px-4 sm:px-6 py-4">
      <div className="flex items-center gap-3 min-w-0">
        {/* زرار الهامبرجر — يظهر بس على الموبايل/التابلت لفتح Sidebar */}
        <button
          onClick={onMenuClick}
          className="md:hidden w-9 h-9 flex items-center justify-center rounded-full border border-line text-ink shrink-0"
          aria-label="Open menu"
        >
          <Menu size={18} />
        </button>
        <p className="text-sm text-muted-foreground truncate">
          {user?.name} · <span className="capitalize">{user?.role}</span>
        </p>
      </div>

      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        <LanguageSwitcher />
        <button
          onClick={logout}
          className="flex items-center gap-1.5 text-sm font-medium text-clay hover:underline"
        >
          <LogOut size={16} />
          <span className="hidden sm:inline">{t("dashboard.logout")}</span>
        </button>
      </div>
    </header>
  );
};

export default DashboardTopbar;

import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { LayoutDashboard, Package, Tags, MessageSquareText, X } from "lucide-react";
import { dashboardApi } from "../../features/dashboard-overview/api/dashboardApi.js";

const NAV_ITEMS = [
  { to: "/dashboard", icon: LayoutDashboard, labelKey: "dashboard.overview", end: true },
  { to: "/dashboard/products", icon: Package, labelKey: "dashboard.products" },
  { to: "/dashboard/categories", icon: Tags, labelKey: "dashboard.categories" },
  { to: "/dashboard/quote-requests", icon: MessageSquareText, labelKey: "dashboard.quoteRequests", showBadge: true },
];

const NOTIFICATIONS_POLL_INTERVAL = 30000;

const DashboardSidebar = ({ onNavigate, onClose, isMobile = false }) => {
  const { t } = useTranslation();

  const { data } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: dashboardApi.getStats,
    refetchInterval: NOTIFICATIONS_POLL_INTERVAL,
  });
  const newRequestsCount = data?.data?.stats?.quoteRequests?.new || 0;

  return (
    <aside
      className={`w-64 shrink-0 bg-olive text-paper min-h-screen p-5 flex flex-col ${
        isMobile ? "" : "hidden md:flex"
      }`}
    >
      <div className="flex items-center justify-between mb-8 px-2">
        <div>
          <span className="font-display text-lg font-semibold">Al Nasr</span>
          <p className="text-xs text-mint-pale/70 mt-0.5">{t("dashboard.title")}</p>
        </div>
        {isMobile && (
          <button onClick={onClose} className="text-paper/80 hover:text-paper" aria-label="Close menu">
            <X size={20} />
          </button>
        )}
      </div>

      <nav className="flex flex-col gap-1">
        {NAV_ITEMS.map(({ to, icon: Icon, labelKey, end, showBadge }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={onNavigate}
            className={({ isActive }) =>
              `flex items-center justify-between gap-3 rounded-card px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-mint-pale text-olive"
                  : "text-paper/80 hover:bg-white/5 hover:text-paper"
              }`
            }
          >
            <span className="flex items-center gap-3">
              <Icon size={18} strokeWidth={2} />
              {t(labelKey)}
            </span>

            {showBadge && newRequestsCount > 0 && (
              <span className="min-w-[20px] h-5 px-1.5 rounded-full bg-clay text-paper text-xs font-bold flex items-center justify-center shrink-0">
                {newRequestsCount > 99 ? "99+" : newRequestsCount}
              </span>
            )}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default DashboardSidebar;
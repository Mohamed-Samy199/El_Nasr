import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { Package, CheckCircle2, FileEdit, Inbox } from "lucide-react";
import { dashboardApi } from "../api/dashboardApi.js";
import StatsCard from "../components/StatsCard.jsx";
import { StatsGridSkeleton } from "../../../components/ui/Skeleton.jsx";

const DashboardHomePage = () => {
  const { t } = useTranslation();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: dashboardApi.getStats,
  });

  const stats = data?.data?.stats;

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-olive mb-6">
        {t("dashboard.overview")}
      </h1>

      {isLoading && <StatsGridSkeleton />}

      {isError && (
        <p className="text-clay">
          {t("common.noResults")} — تأكد إن الباك اند شغال على {import.meta.env.VITE_API_URL}
        </p>
      )}

      {stats && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            label={t("dashboard.totalProducts")}
            value={stats.products.total}
            icon={Package}
          />
          <StatsCard
            label={t("dashboard.publishedProducts")}
            value={stats.products.published}
            icon={CheckCircle2}
            accent="mint"
          />
          <StatsCard
            label={t("dashboard.draftProducts")}
            value={stats.products.draft}
            icon={FileEdit}
            accent="wheat"
          />
          <StatsCard
            label={t("dashboard.newQuoteRequests")}
            value={stats.quoteRequests.new}
            icon={Inbox}
            accent="clay"
          />
        </div>
      )}
    </div>
  );
};

export default DashboardHomePage;

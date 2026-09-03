import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { quoteRequestsAdminApi } from "../api/quoteRequestsAdminApi.js";
import QuoteRequestsTable from "../components/QuoteRequestsTable.jsx";
import QuoteRequestDetailsModal from "../../../components/quoteRequests/QuoteRequestDetailsModal.jsx";
import { TableSkeleton } from "../../../components/ui/Skeleton.jsx";

const STATUS_FILTERS = [
  { value: "", labelKey: "common.all" },
  { value: "new", labelKey: "quoteStatus.new" },
  { value: "in_progress", labelKey: "quoteStatus.in_progress" },
  { value: "closed", labelKey: "quoteStatus.closed" },
];

const QuoteRequestsPage = () => {
  const { t } = useTranslation();
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedRequest, setSelectedRequest] = useState(null);

  const { data, isLoading } = useQuery({
    queryKey: ["admin-quote-requests", statusFilter],
    queryFn: () => quoteRequestsAdminApi.getAll(statusFilter ? { status: statusFilter } : {}),
  });

  const requests = data?.data?.result || [];

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <h1 className="font-display text-2xl font-semibold text-olive">
          {t("dashboard.quoteRequests")}
        </h1>

        <div className="flex gap-2 overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
          {STATUS_FILTERS.map(({ value, labelKey }) => (
            <button
              key={value || "all"}
              onClick={() => setStatusFilter(value)}
              className={`shrink-0 text-sm font-medium rounded-full px-3.5 py-1.5 transition-colors ${
                statusFilter === value
                  ? "bg-mint-pale text-olive"
                  : "text-muted-foreground hover:bg-secondary"
              }`}
            >
              {t(labelKey)}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <TableSkeleton rows={5} columns={5} />
      ) : (
        <QuoteRequestsTable requests={requests} onSelect={setSelectedRequest} />
      )}

      {selectedRequest && (
        <QuoteRequestDetailsModal
          request={selectedRequest}
          onClose={() => setSelectedRequest(null)}
        />
      )}
    </div>
  );
};

export default QuoteRequestsPage;
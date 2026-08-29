import { useTranslation } from "react-i18next";
import Badge from "../../../components/ui/Badge.jsx";
import { formatDate } from "../../../utils/formatDate.js";

const QuoteRequestsTable = ({ requests, onSelect }) => {
  const { t } = useTranslation();

  if (requests.length === 0) {
    return <p className="text-muted-foreground text-center py-12">{t("common.noResults")}</p>;
  }

  return (
    <div className="bg-card border border-line rounded-card shadow-card overflow-x-auto">
      <table className="w-full text-sm min-w-[640px]">
        <thead>
          <tr className="border-b border-line bg-muted/40">
            <th className="px-4 py-3 text-start font-medium text-muted-foreground">{t("quoteRequest.fullName")}</th>
            <th className="px-4 py-3 text-start font-medium text-muted-foreground">{t("quoteRequest.country")}</th>
            <th className="px-4 py-3 text-start font-medium text-muted-foreground">{t("quoteRequest.product")}</th>
            <th className="px-4 py-3 text-start font-medium text-muted-foreground">{t("product.Status")}</th>
            <th className="px-4 py-3 text-start font-medium text-muted-foreground">{t("product.Date")}</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req) => (
            <tr
              key={req._id}
              onClick={() => onSelect(req)}
              className="border-b border-line last:border-0 hover:bg-secondary/40 cursor-pointer"
            >
              <td className="px-4 py-3 font-medium text-ink">{req.fullName}</td>
              <td className="px-4 py-3 text-muted-foreground">{req.country}</td>
              <td className="px-4 py-3 text-muted-foreground">{req.product?.name_en || "—"}</td>
              <td className="px-4 py-3">
                <Badge status={req.status}>{t(`quoteStatus.${req.status}`)}</Badge>
              </td>
              <td className="px-4 py-3 text-muted-foreground numeric">{formatDate(req.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QuoteRequestsTable;

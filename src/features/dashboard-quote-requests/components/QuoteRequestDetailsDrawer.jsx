import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { X } from "lucide-react";
import toast from "react-hot-toast";
import { quoteRequestsAdminApi } from "../api/quoteRequestsAdminApi.js";
import { formatDate } from "../../../utils/formatDate.js";

const STATUS_OPTIONS = ["new", "in_progress", "closed"];

/**
 * Drawer جانبي (side panel) بيظهر لما تدوس على صف في الجدول — بيعرض كل تفاصيل
 * الطلب، وبيسمح بتحديث الحالة وكتابة ملاحظة داخلية (internalNote) من غير
 * ما تسيب صفحة الجدول.
 */
const QuoteRequestDetailsDrawer = ({ request, onClose }) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [status, setStatus] = useState(request.status);
  const [note, setNote] = useState(request.internalNote || "");

  useEffect(() => {
    setStatus(request.status);
    setNote(request.internalNote || "");
  }, [request]);

  const updateMutation = useMutation({
    mutationFn: (data) => quoteRequestsAdminApi.update(request._id, data),
    onSuccess: () => {
      toast.success("Quote request updated");
      queryClient.invalidateQueries({ queryKey: ["admin-quote-requests"] });
    },
    onError: (error) => toast.error(error.message),
  });

  const handleSave = () => {
    updateMutation.mutate({ status, internalNote: note });
  };

  return (
    <div className="fixed inset-0 z-40 flex justify-end">
      {/* الخلفية المعتمة — بتقفل الـ drawer لو دُست عليها */}
      <div className="absolute inset-0 bg-ink/30" onClick={onClose} />

      <aside className="relative w-full max-w-md bg-paper h-full shadow-card p-6 overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-xl font-semibold text-ink">{request.fullName}</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-ink">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4 text-sm">
          <DetailRow label={t("quoteRequest.companyName")} value={request.companyName || "—"} />
          <DetailRow label={t("quoteRequest.email")} value={request.email} />
          <DetailRow label={t("quoteRequest.phone")} value={request.phone} />
          <DetailRow label={t("quoteRequest.country")} value={request.country} />
          <DetailRow label="Product" value={request.product?.name_en || "—"} />
          <DetailRow label={t("quoteRequest.quantity")} value={request.quantity} />
          <DetailRow
            label={t("quoteRequest.packagingPreference")}
            value={request.packagingPreference || "—"}
          />
          <DetailRow label="Submitted" value={formatDate(request.createdAt)} />

          {request.message && (
            <div>
              <p className="text-muted-foreground mb-1">{t("quoteRequest.message")}</p>
              <p className="bg-card border border-line rounded-card p-3 text-ink">{request.message}</p>
            </div>
          )}
        </div>

        <div className="mt-6 pt-6 border-t border-line space-y-4">
          <div>
            <label className="block text-sm font-medium text-ink mb-1.5">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full rounded-card border border-line bg-card px-3.5 py-2.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-mint"
            >
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  {t(`quoteStatus.${s}`)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-ink mb-1.5">Internal note</label>
            <textarea
              rows={3}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Notes visible to the team only — not shared with the buyer"
              className="w-full rounded-card border border-line bg-card px-3.5 py-2.5 text-sm text-ink placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-mint"
            />
          </div>

          <button
            onClick={handleSave}
            disabled={updateMutation.isPending}
            className="w-full rounded-card bg-olive text-paper text-sm font-medium py-2.5 hover:bg-[#0f2a20] disabled:opacity-60 transition-colors"
          >
            {updateMutation.isPending ? t("common.loading") : t("common.save")}
          </button>
        </div>
      </aside>
    </div>
  );
};

const DetailRow = ({ label, value }) => (
  <div className="flex justify-between gap-4">
    <span className="text-muted-foreground">{label}</span>
    <span className="text-ink font-medium text-end">{value}</span>
  </div>
);

export default QuoteRequestDetailsDrawer;

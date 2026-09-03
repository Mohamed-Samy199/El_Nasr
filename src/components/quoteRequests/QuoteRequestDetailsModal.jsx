import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { X } from "lucide-react";
import toast from "react-hot-toast";
import { quoteRequestsAdminApi } from "../../features/dashboard-quote-requests/api/quoteRequestsAdminApi.js";
import { formatDate } from "../../utils/formatDate.js";

const STATUS_OPTIONS = ["new", "in_progress", "closed"];
const QuoteRequestDetailsModal = ({ request, onClose }) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [status, setStatus] = useState(request.status);
  const [note, setNote] = useState(request.internalNote || "");

  useEffect(() => {
    setStatus(request.status);
    setNote(request.internalNote || "");
  }, [request]);

  // إغلاق بزرار Escape — سلوك متوقّع لأي modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const updateMutation = useMutation({
    mutationFn: (data) => quoteRequestsAdminApi.update(request._id, data),
    onSuccess: () => {
      toast.success("Quote request updated");
      queryClient.invalidateQueries({ queryKey: ["admin-quote-requests"] });
      // بتحدّث الـ badge في الـ Sidebar فورًا من غير ما تستنى الـ polling
      // التلقائي (30 ثانية) — عشان العداد يقل فورًا لما الأدمن يرد على طلب
      queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] });
      onClose();
    },
    onError: (error) => toast.error(error.message),
  });

  const handleSave = () => {
    updateMutation.mutate({ status, internalNote: note });
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
      {/* الخلفية المعتمة — بتقفل الـ modal لو دُست عليها */}
      <div className="absolute inset-0 bg-ink/40 backdrop-blur-sm animate-fade-in" onClick={onClose} />

      <div
        role="dialog"
        aria-modal="true"
        className="relative w-full max-w-2xl max-h-[90vh] bg-paper rounded-[2rem] shadow-2xl overflow-hidden flex flex-col animate-modal-in"
      >
        {/* الهيدر — ثابت فوق، مش بيسكرول مع المحتوى */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-line shrink-0">
          <h2 className="font-display text-xl font-semibold text-ink truncate">{request.fullName}</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:bg-secondary hover:text-ink transition-colors shrink-0"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* المحتوى — قابل للسكرول لو زاد عن ارتفاع الشاشة */}
        <div className="overflow-y-auto p-6 sm:p-7 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5 text-sm">
            <DetailRow label={t("quoteRequest.companyName")} value={request.companyName || "—"} />
            <DetailRow label={t("quoteRequest.email")} value={request.email} />
            <DetailRow label={t("quoteRequest.phone")} value={request.phone} numeric />
            <DetailRow label={t("quoteRequest.country")} value={request.country} />
            <DetailRow label={t("quoteRequest.product")} value={request.product?.name_en || "—"} />
            <DetailRow label={t("quoteRequest.quantity")} value={request.quantity} />
            <DetailRow
              label={t("quoteRequest.packagingPreference")}
              value={request.packagingPreference || "—"}
            />
            <DetailRow label={t("quoteRequest.submittedAt")} value={formatDate(request.createdAt)} numeric />
          </div>

          {request.message && (
            <div>
              <p className="text-muted-foreground text-sm mb-1.5">{t("quoteRequest.message")}</p>
              <p className="bg-card border border-line rounded-2xl p-3.5 text-sm text-ink leading-relaxed">
                {request.message}
              </p>
            </div>
          )}

          <div className="pt-2 border-t border-line space-y-4">
            <div>
              <label className="block text-sm font-medium text-ink mb-1.5">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full rounded-xl border border-line bg-card px-3.5 py-2.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-mint"
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
                className="w-full rounded-xl border border-line bg-card px-3.5 py-2.5 text-sm text-ink placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-mint"
              />
            </div>
          </div>
        </div>

        {/* الفوتر — ثابت تحت، مش بيسكرول مع المحتوى */}
        <div className="px-6 pt-4 pb-6 border-t border-line shrink-0">
          <button
            onClick={handleSave}
            disabled={updateMutation.isPending}
            className="w-full rounded-xl bg-olive text-paper text-sm font-medium py-2.5 hover:bg-[#0f2a20] disabled:opacity-60 transition-colors"
          >
            {updateMutation.isPending ? t("common.loading") : t("common.save")}
          </button>
        </div>
      </div>
    </div>
  );
};

const DetailRow = ({ label, value, numeric }) => (
  <div className="flex flex-col gap-0.5 text-start">
    <span className="text-muted-foreground text-xs">{label}</span>
    <span className={`text-ink font-medium truncate ${numeric ? "numeric" : ""}`}>{value}</span>
  </div>
);

export default QuoteRequestDetailsModal;
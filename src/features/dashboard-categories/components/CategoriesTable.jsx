import { useTranslation } from "react-i18next";
import { Pencil, Trash2 } from "lucide-react";
import { useLanguageStore } from "../../../store/language.store.js";
import { getLocalizedField } from "../../../utils/getLocalizedField.js";

const CategoriesTable = ({ categories, onEdit, onDelete, isDeleting }) => {
  const { t } = useTranslation();
  const currentLang = useLanguageStore((state) => state.currentLang);

  if (categories.length === 0) {
    return <p className="text-muted-foreground text-center py-12">{t("common.noResults")}</p>;
  }

  return (
    <div className="bg-card border border-line rounded-card shadow-card overflow-x-auto">
      <table className="w-full text-sm min-w-[560px]">
        <thead>
          <tr className="border-b border-line bg-muted/40">
            <th className="px-4 py-3 text-start font-medium text-muted-foreground">{t("product.Name")}</th>
            <th className="px-4 py-3 text-start font-medium text-muted-foreground">{t("product.Description")}</th>
            <th className="px-4 py-3 text-end font-medium text-muted-foreground">{t("common.edit")}</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category._id} className="border-b border-line last:border-0 hover:bg-secondary/40">
              <td className="px-4 py-3 font-medium text-ink">
                {getLocalizedField(category, "name", currentLang)}
              </td>
              <td className="px-4 py-3 text-muted-foreground max-w-xs truncate">
                {getLocalizedField(category, "description", currentLang) || "—"}
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center justify-end gap-3">
                  <button
                    onClick={() => onEdit(category)}
                    className="text-muted-foreground hover:text-olive"
                    title={t("common.edit")}
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => onDelete(category._id)}
                    disabled={isDeleting}
                    className="text-muted-foreground hover:text-clay disabled:opacity-50"
                    title={t("common.delete")}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoriesTable;

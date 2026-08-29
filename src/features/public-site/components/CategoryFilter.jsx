import { useTranslation } from "react-i18next";
import { useLanguageStore } from "../../../store/language.store.js";
import { getLocalizedField } from "../../../utils/getLocalizedField.js";

const CategoryFilter = ({ categories, activeCategory, onChange }) => {
  const { t } = useTranslation();
  const currentLang = useLanguageStore((state) => state.currentLang);

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onChange("")}
        className={`text-sm font-medium rounded-full px-4 py-1.5 transition-colors ${
          activeCategory === ""
            ? "bg-olive text-paper"
            : "bg-card border border-line text-muted-foreground hover:border-mint"
        }`}
      >
        {t("common.all")}
      </button>
      {categories.map((cat) => (
        <button
          key={cat._id}
          onClick={() => onChange(cat._id)}
          className={`text-sm font-medium rounded-full px-4 py-1.5 transition-colors ${
            activeCategory === cat._id
              ? "bg-olive text-paper"
              : "bg-card border border-line text-muted-foreground hover:border-mint"
          }`}
        >
          {getLocalizedField(cat, "name", currentLang)}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;

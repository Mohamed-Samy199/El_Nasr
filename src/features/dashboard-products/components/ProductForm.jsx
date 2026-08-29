import { useFormik } from "formik";
import * as Yup from "yup";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { categoriesAdminApi } from "../../dashboard-categories/api/categoriesAdminApi.js";
import { useLanguageStore } from "../../../store/language.store.js";
import { getLocalizedField } from "../../../utils/getLocalizedField.js";

// نفس بنية createProductSchema بتاعة Joi في الباك اند، مترجمة لـ Yup
const productSchema = Yup.object({
  name_en: Yup.string().min(2).max(100).required("English name is required"),
  name_ar: Yup.string().min(2).max(100).required("الاسم بالعربي مطلوب"),
  category: Yup.string().required("Category is required"),
  description_en: Yup.string().max(1000),
  description_ar: Yup.string().max(1000),
  origin_en: Yup.string().max(100),
  origin_ar: Yup.string().max(100),
  season_en: Yup.string().max(100),
  season_ar: Yup.string().max(100),
  grade_en: Yup.string().max(100),
  grade_ar: Yup.string().max(100),
  packaging_en: Yup.string().max(200),
  packaging_ar: Yup.string().max(200),
  minOrderQty: Yup.string().max(50),
  status: Yup.string().oneOf(["draft", "in_review", "published"]),
});

const FIELD_ROWS = [
  { key: "name", label: "Name", required: true },
  { key: "description", label: "Description", textarea: true },
  { key: "origin", label: "Origin" },
  { key: "season", label: "Season" },
  { key: "grade", label: "Grade" },
  { key: "packaging", label: "Packaging" },
];

/**
 * فورم موحّد للإضافة والتعديل — initialValues لو جاي منتج موجود (وضع تعديل)،
 * أو قيم فاضية (وضع إضافة). onSubmit بيتحدد من الصفحة اللي بتستخدم الكومبوننت.
 */
const ProductForm = ({ initialValues, onSubmit, isSubmitting }) => {
  const { t } = useTranslation();
  const currentLang = useLanguageStore((state) => state.currentLang);

  const { data: categoriesData } = useQuery({
    queryKey: ["admin-categories"],
    queryFn: categoriesAdminApi.getAll,
  });
  const categories = categoriesData?.data?.categories || [];

  const formik = useFormik({
    initialValues: {
      name_en: "",
      name_ar: "",
      category: "",
      description_en: "",
      description_ar: "",
      origin_en: "",
      origin_ar: "",
      season_en: "",
      season_ar: "",
      grade_en: "",
      grade_ar: "",
      packaging_en: "",
      packaging_ar: "",
      minOrderQty: "",
      status: "draft",
      ...initialValues,
    },
    validationSchema: productSchema,
    enableReinitialize: true,
    onSubmit,
  });

  const fieldClass = (name) =>
    `w-full rounded-card border bg-card px-3.5 py-2.5 text-ink placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-mint transition-colors ${
      formik.touched[name] && formik.errors[name] ? "border-clay" : "border-line"
    }`;

  return (
    <form onSubmit={formik.handleSubmit} noValidate className="space-y-6 max-w-3xl">
      {/* Category + Status */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-ink mb-1.5">{t("product.category")}</label>
          <select
            name="category"
            value={formik.values.category}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={fieldClass("category")}
          >
            <option value="">—</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {getLocalizedField(cat, "name", currentLang)}
              </option>
            ))}
          </select>
          {formik.touched.category && formik.errors.category && (
            <p className="mt-1 text-sm text-clay">{formik.errors.category}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-ink mb-1.5">Status</label>
          <select
            name="status"
            value={formik.values.status}
            onChange={formik.handleChange}
            className={fieldClass("status")}
          >
            <option value="draft">{t("productStatus.draft")}</option>
            <option value="in_review">{t("productStatus.in_review")}</option>
            <option value="published">{t("productStatus.published")}</option>
          </select>
        </div>
      </div>

      {/* حقول ثنائية اللغة — EN/AR جنب بعض لكل حقل */}
      {FIELD_ROWS.map(({ key, label, required, textarea }) => (
        <div key={key} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-ink mb-1.5">
              {label} (EN) {required && <span className="text-clay">*</span>}
            </label>
            {textarea ? (
              <textarea
                name={`${key}_en`}
                rows={3}
                value={formik.values[`${key}_en`]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={fieldClass(`${key}_en`)}
              />
            ) : (
              <input
                type="text"
                name={`${key}_en`}
                value={formik.values[`${key}_en`]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={fieldClass(`${key}_en`)}
              />
            )}
            {formik.touched[`${key}_en`] && formik.errors[`${key}_en`] && (
              <p className="mt-1 text-sm text-clay">{formik.errors[`${key}_en`]}</p>
            )}
          </div>

          <div dir="rtl">
            <label className="block text-sm font-medium text-ink mb-1.5">
              {label} (AR) {required && <span className="text-clay">*</span>}
            </label>
            {textarea ? (
              <textarea
                name={`${key}_ar`}
                rows={3}
                value={formik.values[`${key}_ar`]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={fieldClass(`${key}_ar`)}
              />
            ) : (
              <input
                type="text"
                name={`${key}_ar`}
                value={formik.values[`${key}_ar`]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={fieldClass(`${key}_ar`)}
              />
            )}
            {formik.touched[`${key}_ar`] && formik.errors[`${key}_ar`] && (
              <p className="mt-1 text-sm text-clay">{formik.errors[`${key}_ar`]}</p>
            )}
          </div>
        </div>
      ))}

      <div>
        <label className="block text-sm font-medium text-ink mb-1.5">
          {t("product.minOrderQty")}
        </label>
        <input
          type="text"
          name="minOrderQty"
          placeholder="e.g. 1 ton"
          value={formik.values.minOrderQty}
          onChange={formik.handleChange}
          className={fieldClass("minOrderQty")}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-full bg-olive text-paper text-sm font-medium px-6 py-2.5 hover:bg-[#0f2a20] disabled:opacity-60 transition-colors"
      >
        {isSubmitting ? t("common.loading") : t("common.save")}
      </button>
    </form>
  );
};

export default ProductForm;

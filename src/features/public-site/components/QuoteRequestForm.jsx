import { useFormik } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { quoteRequestApi } from "../api/quoteRequestApi.js";
import { useLanguageStore } from "../../../store/language.store.js";
import { getLocalizedField } from "../../../utils/getLocalizedField.js";

// نفس بنية createQuoteRequestSchema بتاعة Joi في الباك اند، مترجمة لـ Yup
const quoteRequestSchema = Yup.object({
  fullName: Yup.string().min(2).max(100).required(),
  companyName: Yup.string().max(100),
  email: Yup.string().email().required(),
  phone: Yup.string().min(6).max(20).required(),
  country: Yup.string().min(2).max(60).required(),
  quantity: Yup.string().min(1).max(50).required(),
  packagingPreference: Yup.string().max(100),
  message: Yup.string().max(1000),
});

/**
 * فورم طلب عرض سعر — لو productId مبعوت (من صفحة تفاصيل منتج)، بيتحط كـ
 * حقل مخفي تلقائيًا. لو مبعتش (من صفحة تواصل معنا العامة)، بيظهر select
 * بسيط عشان الزائر يختار المنتج بنفسه.
 */
const QuoteRequestForm = ({ productId, products = [] }) => {
  const { t } = useTranslation();
  const currentLang = useLanguageStore((state) => state.currentLang);

  const submitMutation = useMutation({
    mutationFn: quoteRequestApi.submit,
    onSuccess: () => {
      toast.success(t("quoteRequest.success"));
      formik.resetForm();
    },
    onError: (error) => toast.error(error.message || "Something went wrong"),
  });

  const formik = useFormik({
    initialValues: {
      fullName: "",
      companyName: "",
      email: "",
      phone: "",
      country: "",
      product: productId || "",
      quantity: "",
      packagingPreference: "",
      message: "",
    },
    validationSchema: quoteRequestSchema.shape({
      product: Yup.string().required("Please select a product"),
    }),
    onSubmit: (values) => submitMutation.mutate(values),
  });

  const fieldClass = (name) =>
    `w-full rounded-card border bg-card px-3.5 py-2.5 text-ink placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-mint transition-colors ${
      formik.touched[name] && formik.errors[name] ? "border-clay" : "border-line"
    }`;

  return (
    <form onSubmit={formik.handleSubmit} noValidate className="space-y-4">
      {!productId && (
        <Field label={t("product.category")} error={formik.touched.product && formik.errors.product}>
          <select
            name="product"
            value={formik.values.product}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={fieldClass("product")}
          >
            <option value="">—</option>
            {products.map((p) => (
              <option key={p._id} value={p._id}>
                {getLocalizedField(p, "name", currentLang)}
              </option>
            ))}
          </select>
        </Field>
      )}

      <div className="grid sm:grid-cols-2 gap-4">
        <Field label={t("quoteRequest.fullName")} error={formik.touched.fullName && formik.errors.fullName}>
          <input name="fullName" value={formik.values.fullName} onChange={formik.handleChange} onBlur={formik.handleBlur} className={fieldClass("fullName")} />
        </Field>
        <Field label={t("quoteRequest.companyName")}>
          <input name="companyName" value={formik.values.companyName} onChange={formik.handleChange} className={fieldClass("companyName")} />
        </Field>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <Field label={t("quoteRequest.email")} error={formik.touched.email && formik.errors.email}>
          <input type="email" name="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} className={fieldClass("email")} />
        </Field>
        <Field label={t("quoteRequest.phone")} error={formik.touched.phone && formik.errors.phone}>
          <input name="phone" value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} className={fieldClass("phone")} />
        </Field>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <Field label={t("quoteRequest.country")} error={formik.touched.country && formik.errors.country}>
          <input name="country" value={formik.values.country} onChange={formik.handleChange} onBlur={formik.handleBlur} className={fieldClass("country")} />
        </Field>
        <Field label={t("quoteRequest.quantity")} error={formik.touched.quantity && formik.errors.quantity}>
          <input name="quantity" placeholder="e.g. 5 tons" value={formik.values.quantity} onChange={formik.handleChange} onBlur={formik.handleBlur} className={fieldClass("quantity")} />
        </Field>
      </div>

      <Field label={t("quoteRequest.packagingPreference")}>
        <input name="packagingPreference" value={formik.values.packagingPreference} onChange={formik.handleChange} className={fieldClass("packagingPreference")} />
      </Field>

      <Field label={t("quoteRequest.message")}>
        <textarea name="message" rows={4} value={formik.values.message} onChange={formik.handleChange} className={fieldClass("message")} />
      </Field>

      <button
        type="submit"
        disabled={submitMutation.isPending}
        className="w-full sm:w-auto rounded-full bg-olive text-paper text-sm font-medium px-6 py-2.5 hover:bg-[#0f2a20] disabled:opacity-60 transition-colors"
      >
        {submitMutation.isPending ? t("common.loading") : t("quoteRequest.submit")}
      </button>
    </form>
  );
};

const Field = ({ label, error, children }) => (
  <div>
    <label className="block text-sm font-medium text-ink mb-1.5">{label}</label>
    {children}
    {error && <p className="mt-1 text-sm text-clay">{error}</p>}
  </div>
);

export default QuoteRequestForm;

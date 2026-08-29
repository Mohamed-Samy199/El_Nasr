// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { useTranslation } from "react-i18next";

// const categorySchema = Yup.object({
//   name_en: Yup.string().min(2).max(60).required("English name is required"),
//   name_ar: Yup.string().min(2).max(60).required("الاسم بالعربي مطلوب"),
//   description_en: Yup.string().max(500),
//   description_ar: Yup.string().max(500),
// });

// /**
//  * فورم مصغّر — بيتحط جوه كارت في أعلى صفحة التصنيفات (مش صفحة منفصلة زي المنتج،
//  * لأن التصنيف بيانات أقل بكتير ومنطقي يتضاف من نفس الصفحة).
//  */
// const CategoryForm = ({ initialValues, onSubmit, isSubmitting, onCancel }) => {
//   const { t } = useTranslation();

//   const formik = useFormik({
//     initialValues: {
//       name_en: "",
//       name_ar: "",
//       description_en: "",
//       description_ar: "",
//       ...initialValues,
//     },
//     validationSchema: categorySchema,
//     enableReinitialize: true,
//     onSubmit: (values, { resetForm }) => {
//       onSubmit(values, { resetForm });
//     },
//   });

//   const fieldClass = (name) =>
//     `w-full rounded-card border bg-card px-3.5 py-2 text-sm text-ink placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-mint transition-colors ${
//       formik.touched[name] && formik.errors[name] ? "border-clay" : "border-line"
//     }`;

//   return (
//     <form onSubmit={formik.handleSubmit} noValidate className="bg-card border border-line rounded-card shadow-card p-5">
//       <div className="grid sm:grid-cols-2 gap-4 mb-4">
//         <div>
//           <label className="block text-sm font-medium text-ink mb-1.5">Name (EN)</label>
//           <input
//             name="name_en"
//             value={formik.values.name_en}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             className={fieldClass("name_en")}
//           />
//           {formik.touched.name_en && formik.errors.name_en && (
//             <p className="mt-1 text-sm text-clay">{formik.errors.name_en}</p>
//           )}
//         </div>
//         <div dir="rtl">
//           <label className="block text-sm font-medium text-ink mb-1.5">Name (AR)</label>
//           <input
//             name="name_ar"
//             value={formik.values.name_ar}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             className={fieldClass("name_ar")}
//           />
//           {formik.touched.name_ar && formik.errors.name_ar && (
//             <p className="mt-1 text-sm text-clay">{formik.errors.name_ar}</p>
//           )}
//         </div>
//       </div>

//       <div className="grid sm:grid-cols-2 gap-4 mb-4">
//         <div>
//           <label className="block text-sm font-medium text-ink mb-1.5">Description (EN)</label>
//           <textarea
//             name="description_en"
//             rows={2}
//             value={formik.values.description_en}
//             onChange={formik.handleChange}
//             className={fieldClass("description_en")}
//           />
//         </div>
//         <div dir="rtl">
//           <label className="block text-sm font-medium text-ink mb-1.5">Description (AR)</label>
//           <textarea
//             name="description_ar"
//             rows={2}
//             value={formik.values.description_ar}
//             onChange={formik.handleChange}
//             className={fieldClass("description_ar")}
//           />
//         </div>
//       </div>

//       <div className="flex items-center gap-3">
//         <button
//           type="submit"
//           disabled={isSubmitting}
//           className="rounded-full bg-olive text-paper text-sm font-medium px-5 py-2 hover:bg-[#0f2a20] disabled:opacity-60 transition-colors"
//         >
//           {isSubmitting ? t("common.loading") : t("common.save")}
//         </button>
//         {onCancel && (
//           <button
//             type="button"
//             onClick={onCancel}
//             className="text-sm text-muted-foreground hover:text-ink"
//           >
//             {t("common.cancel")}
//           </button>
//         )}
//       </div>
//     </form>
//   );
// };

// export default CategoryForm;

























import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { useMutation } from "@tanstack/react-query";
import { ImagePlus, X } from "lucide-react";
import toast from "react-hot-toast";
import { categoriesAdminApi } from "../api/categoriesAdminApi.js";

const categorySchema = Yup.object({
  name_en: Yup.string().min(2).max(60).required("English name is required"),
  name_ar: Yup.string().min(2).max(60).required("الاسم بالعربي مطلوب"),
  description_en: Yup.string().max(500),
  description_ar: Yup.string().max(500),
});

/**
 * فورم مصغّر — بيتحط جوه كارت في أعلى صفحة التصنيفات (مش صفحة منفصلة زي المنتج،
 * لأن التصنيف بيانات أقل بكتير ومنطقي يتضاف من نفس الصفحة).
 *
 * الصورة اختيارية — لو الأدمن مرفعش صورة، الموقع العام هيعرض بديل بصري
 * مبني على الأيقونة بدل صورة، مش هيفضل فاضي.
 */
const CategoryForm = ({ initialValues, onSubmit, isSubmitting, onCancel }) => {
  const { t } = useTranslation();
  const [imagePreview, setImagePreview] = useState(initialValues?.image?.url || null);

  const uploadMutation = useMutation({
    mutationFn: categoriesAdminApi.uploadImage,
    onSuccess: (image) => {
      formik.setFieldValue("image", image);
      setImagePreview(image.url);
    },
    onError: (error) => toast.error(error.message || "Image upload failed"),
  });

  const formik = useFormik({
    initialValues: {
      name_en: "",
      name_ar: "",
      description_en: "",
      description_ar: "",
      image: null,
      ...initialValues,
    },
    validationSchema: categorySchema,
    enableReinitialize: true,
    onSubmit: (values, { resetForm }) => {
      onSubmit(values, { resetForm });
    },
  });

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) uploadMutation.mutate(file);
  };

  const removeImage = () => {
    formik.setFieldValue("image", null);
    setImagePreview(null);
  };

  const fieldClass = (name) =>
    `w-full rounded-card border bg-card px-3.5 py-2 text-sm text-ink placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-mint transition-colors ${
      formik.touched[name] && formik.errors[name] ? "border-clay" : "border-line"
    }`;

  return (
    <form onSubmit={formik.handleSubmit} noValidate className="bg-card border border-line rounded-card shadow-card p-5">
      {/* صورة التصنيف — اختيارية */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-ink mb-1.5">Category image (optional)</label>
        {imagePreview ? (
          <div className="relative w-28 h-28 rounded-card overflow-hidden border border-line group">
            <img src={imagePreview} alt="" className="w-full h-full object-cover" />
            <button
              type="button"
              onClick={removeImage}
              className="absolute top-1 end-1 w-6 h-6 rounded-full bg-ink/70 text-paper flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X size={14} />
            </button>
          </div>
        ) : (
          <label className="w-28 h-28 rounded-card border-2 border-dashed border-line flex flex-col items-center justify-center gap-1.5 cursor-pointer hover:border-mint transition-colors text-muted-foreground">
            <input type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={handleFileChange} />
            <ImagePlus size={20} />
            <span className="text-xs">{uploadMutation.isPending ? "..." : "Upload"}</span>
          </label>
        )}
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-ink mb-1.5">Name (EN)</label>
          <input
            name="name_en"
            value={formik.values.name_en}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={fieldClass("name_en")}
          />
          {formik.touched.name_en && formik.errors.name_en && (
            <p className="mt-1 text-sm text-clay">{formik.errors.name_en}</p>
          )}
        </div>
        <div dir="rtl">
          <label className="block text-sm font-medium text-ink mb-1.5">Name (AR)</label>
          <input
            name="name_ar"
            value={formik.values.name_ar}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={fieldClass("name_ar")}
          />
          {formik.touched.name_ar && formik.errors.name_ar && (
            <p className="mt-1 text-sm text-clay">{formik.errors.name_ar}</p>
          )}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-ink mb-1.5">Description (EN)</label>
          <textarea
            name="description_en"
            rows={2}
            value={formik.values.description_en}
            onChange={formik.handleChange}
            className={fieldClass("description_en")}
          />
        </div>
        <div dir="rtl">
          <label className="block text-sm font-medium text-ink mb-1.5">Description (AR)</label>
          <textarea
            name="description_ar"
            rows={2}
            value={formik.values.description_ar}
            onChange={formik.handleChange}
            className={fieldClass("description_ar")}
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-full bg-olive text-paper text-sm font-medium px-5 py-2 hover:bg-[#0f2a20] disabled:opacity-60 transition-colors"
        >
          {isSubmitting ? t("common.loading") : t("common.save")}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="text-sm text-muted-foreground hover:text-ink"
          >
            {t("common.cancel")}
          </button>
        )}
      </div>
    </form>
  );
};

export default CategoryForm;
/**
 * بيرجّع الحقل الصح من object فيه _en/_ar حسب اللغة الحالية، بدل ما نكرر
 * lang === "ar" ? obj.name_ar : obj.name_en في كل مكان.
 *
 * مثال: getLocalizedField(product, "name", "ar") → product.name_ar
 */
export const getLocalizedField = (obj, field, lang) => {
  if (!obj) return "";
  return obj[`${field}_${lang}`] ?? obj[`${field}_en`] ?? "";
};

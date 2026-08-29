import { apiGet } from "../../../lib/apiRepository.js";

export const productsApi = {
  // الموقع العام لازم يجيب المنشور بس، ده بيتفرض هنا مش على السيرفر
  // (الباك اند بيرجّع كل الحالات لو مبعتش status، عشان اللوحة تقدر تستخدم نفس الراوت)
  getPublished: (params = {}) => apiGet("/products", { ...params, status: "published" }),
  getBySlug: (slug) => apiGet(`/products/${slug}`),
};

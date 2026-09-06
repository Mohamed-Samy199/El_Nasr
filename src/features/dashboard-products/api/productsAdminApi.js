import { apiGet, apiPost, apiPut, apiPatch, apiDelete, apiUpload } from "../../../lib/apiRepository.js";

export const productsAdminApi = {
  // مفيش status هنا — اللوحة لازم تشوف كل الحالات (draft/in_review/published)
  getAll: (params = {}) => apiGet("/products", params),
  getById: (id) => apiGet(`/products/id/${id}`),
  create: (data) => apiPost("/products", data),
  update: (id, data) => apiPut(`/products/${id}`, data),
  remove: (id) => apiDelete(`/products/${id}`),

  // رفع الصور خطوتين منفصلتين زي ما اتفقنا في الباك اند:
  // 1) ترفع الملفات لـ Cloudinary وتاخد { url, public_id }
  // 2) تربطهم بالمنتج
  uploadImages: (files) => {
    const formData = new FormData();
    files.forEach((file) => formData.append("images", file));
    return apiUpload("/upload", formData);
  },
  deleteUploadedImage: (publicId) => apiDelete(`/upload/${encodeURIComponent(publicId)}`),
  attachImages: (productId, images) => apiPatch(`/products/${productId}/images`, { images }),
  removeImage: (productId, publicId) =>
    apiDelete(`/products/${productId}/images/${encodeURIComponent(publicId)}`),
};

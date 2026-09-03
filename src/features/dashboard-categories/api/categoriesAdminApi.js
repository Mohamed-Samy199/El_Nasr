import { apiGet, apiPost, apiPut, apiDelete, apiUpload } from "../../../lib/apiRepository.js";

export const categoriesAdminApi = {
  getAll: () => apiGet("/categories"),
  create: (data) => apiPost("/categories", data),
  update: (id, data) => apiPut(`/categories/${id}`, data),
  remove: (id) => apiDelete(`/categories/${id}`),

  // بيستخدم نفس endpoint رفع صور المنتجات (عام، مش مخصص لكيان معين) —
  // بيرجع array حتى لو صورة واحدة، فبناخد أول عنصر بس
  uploadImage: async (file) => {
    const formData = new FormData();
    formData.append("images", file);
    const { data } = await apiUpload("/upload", formData);
    return data.images[0]; // { url, public_id }
  },
};
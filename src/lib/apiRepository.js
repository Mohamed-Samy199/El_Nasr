import { axiosInstance } from "./axios.js";

/**
 * غلاف موحّد فوق axios — بيرجّع data.data مباشرة (شكل ApiResponse بتاعنا في الباك اند)
 * وبيرمي الرسالة الجاهزة من الباك اند بدل الـ error الخام بتاع axios.
 * نفس فكرة database.repository.js في الباك اند: مكان واحد لأي تعديل مستقبلي
 * (زي إضافة retry أو logging) من غير ما نلمس كل نداء API لوحده.
 */
const request = async (method, url, { data, params, headers } = {}) => {
  try {
    const response = await axiosInstance.request({ method, url, data, params, headers });
    return response.data; // { success, message, data }
  } catch (error) {
    const message = error.response?.data?.message || "Something went wrong. Please try again.";
    const errors = error.response?.data?.errors || [];
    throw { message, errors, statusCode: error.response?.status };
  }
};

export const apiGet = (url, params) => request("get", url, { params });
export const apiPost = (url, data) => request("post", url, { data });
export const apiPut = (url, data) => request("put", url, { data });
export const apiPatch = (url, data) => request("patch", url, { data });
export const apiDelete = (url) => request("delete", url);

export const apiUpload = (url, formData) =>
  request("post", url, {
    data: formData,
    headers: { "Content-Type": "multipart/form-data" },
  });

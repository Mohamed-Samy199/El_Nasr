import { apiGet, apiPatch } from "../../../lib/apiRepository.js";

export const quoteRequestsAdminApi = {
  getAll: (params = {}) => apiGet("/quote-requests", params),
  getById: (id) => apiGet(`/quote-requests/${id}`),
  update: (id, data) => apiPatch(`/quote-requests/${id}`, data),
};

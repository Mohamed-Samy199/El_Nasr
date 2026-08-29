import { apiGet } from "../../../lib/apiRepository.js";

export const dashboardApi = {
  getStats: () => apiGet("/dashboard/stats"),
};

import { apiPost, apiGet } from "../../../lib/apiRepository.js";

export const authApi = {
  login: (credentials) => apiPost("/auth/login", credentials),
  register: (data) => apiPost("/auth/register", data),
  getProfile: () => apiGet("/auth/profile"),
};

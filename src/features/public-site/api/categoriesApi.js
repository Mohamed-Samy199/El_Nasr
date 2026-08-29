import { apiGet } from "../../../lib/apiRepository.js";

export const categoriesApi = {
  getAll: () => apiGet("/categories"),
};

import { apiPost } from "../../../lib/apiRepository.js";

export const quoteRequestApi = {
  submit: (data) => apiPost("/quote-requests", data),
};

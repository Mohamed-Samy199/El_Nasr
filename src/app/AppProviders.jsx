import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import "../i18n/i18n.config.js"; // لازم يتحمل قبل أي component بيستخدم useTranslation
import { queryClient } from "../config/queryClient.js";
import { router } from "./router.jsx";

/**
 * كل الـ Providers مجمّعين في مكان واحد — أي provider جديد (Theme, Auth context..)
 * بيتضاف هنا بس، مش في main.jsx.
 */
const AppProviders = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster position="top-center" toastOptions={{ duration: 3500 }} />
    </QueryClientProvider>
  );
};

export default AppProviders;

import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // دقيقة — يقلل النداءات المتكررة لبيانات مش متغيرة كل ثانية
      retry: 1,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 0, // عمليات الكتابة (إضافة/تعديل/حذف) ميتعادش تلقائي، عشان منعملش العملية مرتين
    },
  },
});

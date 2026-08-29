// كل متغيرات البيئة بتتقرأ من import.meta.env في Vite، ولازم تبدأ بـ VITE_
// عشان Vite يوافق يحطها جوه الكود اللي بيتبعت للمتصفح.

const required = ["VITE_API_URL"];

required.forEach((key) => {
  if (!import.meta.env[key]) {
    throw new Error(`❌ Missing required environment variable: ${key}`);
  }
});

export const API_URL = import.meta.env.VITE_API_URL;

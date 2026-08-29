/** @type {import('tailwindcss').Config} */
export default {
  // مفيش وضع ليلي مطلوب حاليًا — الهوية مبنية على خلفية ورقية فاتحة
  // (مسحنا "darkMode: false" لأن Tailwind 3.4+ بقى بيعتبرها زي "media" تلقائيًا وبيطلع تحذير)
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // كل قيمة مربوطة بمتغير CSS معرّف في globals.css
        // بيسمح لنا نغيّر القيم الفعلية من مكان واحد (globals.css) من غير ما نلمس الكومبوننتس
        paper: "var(--paper)",
        ink: "var(--ink)",
        olive: "var(--olive)",
        mint: "var(--mint)",
        "mint-pale": "var(--mint-pale)",
        card: "var(--card)",
        secondary: "var(--secondary)",
        muted: "var(--muted)",
        "muted-foreground": "var(--muted-foreground)",
        line: "var(--line)",
        wheat: "var(--wheat)",
        "wheat-pale": "var(--wheat-pale)",
        clay: "var(--clay)",

        // aliases دلالية (semantic) — بتخلي الكود يقرأ بمعنى الاستخدام مش بس اسم اللون
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "var(--primary)",
        ring: "var(--ring)",
        accent: "var(--accent)",
        border: "var(--border)",
      },

      fontFamily: {
        // display: للعناوين الكبيرة وهوية الصفحة
        // body: لباقي النصوص والفورمز
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
      },

      borderRadius: {
        card: "0.625rem", // 10px — نفس نطاق shadcn الافتراضي، متسق مع مكونات ui/
      },

      boxShadow: {
        card: "0 1px 2px 0 rgb(23 49 41 / 0.06), 0 1px 3px 0 rgb(23 49 41 / 0.08)",
      },
    },
  },
  plugins: [],
};

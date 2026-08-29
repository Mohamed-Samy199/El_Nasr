/**
 * سكريبت بيجيب كل المنتجات المنشورة من الباك اند الحقيقي ويبني منها
 * sitemap.xml كامل (شامل صفحة كل منتج لوحده)، بدل ما يفضل الملف الثابت
 * بس (اللي بيغطي الروابط الأساسية فقط: /, /products, /about, /contact).
 *
 * الاستخدام:
 *   node scripts/generate-sitemap.js
 *
 * الأفضل إنه يتشغّل قبل كل نشر (deploy) عشان الـ sitemap يفضل محدّث بأحدث
 * المنتجات — ممكن تضيفه كـ "prebuild" script في package.json، أو تشغّله
 * يدويًا كل ما تضيف منتجات جديدة.
 */

const SITE_URL = "https://www.alnasr.com";
const API_URL = process.env.VITE_API_URL || "http://localhost:4000/api";
const OUTPUT_PATH = new URL("../public/sitemap.xml", import.meta.url);

const STATIC_ROUTES = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/products", changefreq: "daily", priority: "0.9" },
  { path: "/about", changefreq: "monthly", priority: "0.6" },
  { path: "/contact", changefreq: "monthly", priority: "0.7" },
];

const escapeXml = (str) =>
  str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const buildUrlEntry = ({ path, changefreq, priority, lastmod }) => `  <url>
    <loc>${escapeXml(`${SITE_URL}${path}`)}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
    ${lastmod ? `<lastmod>${lastmod}</lastmod>` : ""}
  </url>`;

const main = async () => {
  console.log(`Fetching published products from ${API_URL}/products ...`);

  const response = await fetch(`${API_URL}/products?status=published`);
  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.status} ${response.statusText}`);
  }

  const { data } = await response.json();
  const products = data?.result || [];

  console.log(`Found ${products.length} published product(s).`);

  const productEntries = products.map((product) =>
    buildUrlEntry({
      path: `/products/${product.slug}`,
      changefreq: "weekly",
      priority: "0.8",
      lastmod: product.updatedAt ? product.updatedAt.split("T")[0] : undefined,
    })
  );

  const staticEntries = STATIC_ROUTES.map(buildUrlEntry);

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...staticEntries, ...productEntries].join("\n")}
</urlset>
`;

  const fs = await import("node:fs/promises");
  await fs.writeFile(OUTPUT_PATH, xml, "utf-8");

  console.log(`✅ sitemap.xml written with ${STATIC_ROUTES.length + products.length} URLs.`);
};

main().catch((err) => {
  console.error("❌ Failed to generate sitemap:", err.message);
  process.exit(1);
});
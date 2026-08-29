import { useSearchParams } from "react-router-dom";

import PublicHeader from "../../../components/layout/PublicHeader.jsx";
import PublicFooter from "../../../components/layout/PublicFooter.jsx";
import SEO from "../../../components/shared/SEO.jsx";
import ProductsSection from "../../../components/home/ProductsSection.jsx";
import ScrollToTop from "../../../components/shared/ScrollToTop.jsx";
import ProductsShowcase from "../../../components/home/ProductsShowcase.jsx";

/**
 * صفحة الكتالوج الكامل — بتستخدم نفس ProductsSection المعروض في الصفحة
 * الرئيسية، بس من غير حد أقصى (limit={null}) ومن غير زرار "عرض الكل".
 *
 * activeCategory متحكم فيه من هنا (مربوط بـ ?category=id في الرابط) عشان
 * كروت التصنيفات في الصفحة الرئيسية تقدر توديك هنا مفلتر تلقائيًا، ولو حد
 * شارك اللينك يفضل بنفس الفلتر.
 */
const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get("category") || "";

  const handleCategoryChange = (categoryId) => {
    setSearchParams(categoryId ? { category: categoryId } : {});
  };

  return (
    <div className="bg-paper text-ink min-h-screen">
      <SEO
        title="Products"
        description="Browse Egyptian legumes, seeds, and agricultural crops from Al Nasr — origin, grade, packaging, and export specifications."
      />
      <PublicHeader />

      <ProductsSection
        limit={null}
        showViewAll={false}
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
      />

      <ProductsShowcase />

      <PublicFooter />
      <ScrollToTop/>
    </div>
  );
};

export default ProductsPage;
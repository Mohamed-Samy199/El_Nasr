import PublicHeader from "../../../components/layout/PublicHeader.jsx";
import PublicFooter from "../../../components/layout/PublicFooter.jsx";
import SEO from "../../../components/shared/SEO.jsx";
import HeroSlider from "../../../components/home/HeroSlider.jsx";
import JourneySection from "../../../components/home/JourneySection.jsx";
import CategorySection from "../../../components/home/CategorySection.jsx";
import ProductsSection from "../../../components/home/ProductsSection.jsx";
import ProductsShowcase from "../../../components/home/ProductsShowcase.jsx";
import ScrollToTop from "../../../components/shared/ScrollToTop.jsx";

const HomePage = () => {
  return (
    <div className="bg-paper text-ink">
      <SEO
        title="Home"
        description="Al Nasr Company for Agricultural Crops Packaging — Egyptian legumes, seeds, and crops for local and international markets."
      />
      <PublicHeader />

      <HeroSlider />
      <JourneySection />
      <CategorySection />
      <ProductsSection limit={6} showViewAll />
      <ProductsShowcase />

      <PublicFooter />
      <ScrollToTop/>
    </div>
  );
};

export default HomePage;
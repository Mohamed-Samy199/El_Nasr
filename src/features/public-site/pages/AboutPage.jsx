import { useTranslation } from "react-i18next";

import PublicHeader from "../../../components/layout/PublicHeader.jsx";
import PublicFooter from "../../../components/layout/PublicFooter.jsx";
import SEO from "../../../components/shared/SEO.jsx";
import ScrollToTop from "../../../components/shared/ScrollToTop.jsx";
import { useLanguageStore } from "../../../store/language.store.js";
import AboutHeroSection from "../../../components/about/HeroAbout.jsx";
import MissionVisionSection from "../../../components/about/MissionVisionSection.jsx";
import HowWeWorkSection from "../../../components/about/HowWeWorkSection.jsx";
import ContactCtaSection from "../../../components/about/ContactCtaSection.jsx";
import GoalsSection from "../../../components/about/FactoryGallerySection/Goalssection.jsx";
import ExhibitionSection from "../../../components/about/FactoryGallerySection/Exhibitionsection.jsx";
import FacilitySlider from "../../../components/about/FactoryGallerySection/FacilitySlider.jsx";

const AboutPage = () => {
  useTranslation();
  const currentLang = useLanguageStore((state) => state.currentLang);
  const isAr = currentLang === "ar";
  const isRtl = isAr;

  return (
    <div className="bg-paper text-ink min-h-screen">
      <SEO
        title="About Us"
        description="Our mission and vision — from the land of Egypt to the world, delivering agricultural products that meet international quality standards."
      />
      <PublicHeader />

      <AboutHeroSection isAr={isAr} currentLang={currentLang} />
      <MissionVisionSection isAr={isAr} />
      <GoalsSection isAr={isAr} />
      <HowWeWorkSection isAr={isAr} />

      <ExhibitionSection isAr={isAr} />
      <FacilitySlider isAr={isAr} />
      <ContactCtaSection isAr={isAr} isRtl={isRtl} />

      <PublicFooter />
      <ScrollToTop />
    </div>
  );
};

export default AboutPage;
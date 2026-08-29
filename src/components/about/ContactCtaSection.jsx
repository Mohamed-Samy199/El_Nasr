import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Phone, Mail, MapPin, ArrowRight, ArrowLeft } from "lucide-react";

const ContactCtaSection = ({ isAr, isRtl }) => {
  const { t } = useTranslation();

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6">
      <div className="bg-olive rounded-[2rem] p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 text-paper">
        <div className="text-center md:text-start">
          <h2 className="font-display text-xl sm:text-2xl font-semibold mb-3 text-paper">
            {isAr ? "جاهزون للعمل معك" : "Ready to work with you"}
          </h2>
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-5 text-sm text-paper/80">
            <span className="flex items-center gap-1.5">
              <Phone size={14} className="text-wheat" />
              <span className="numeric">+20 102 324 4206</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Mail size={14} className="text-wheat" />
              alnasrcompany25@gmail.com
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin size={14} className="text-wheat" />
              {isAr ? "أشمون، المنوفية، مصر" : "Asmoun, El Menoufia, Egypt"}
            </span>
          </div>
        </div>

        <NavLink
          to="/contact"
          className="shrink-0 inline-flex items-center gap-2 bg-mint text-paper px-6 py-3 rounded-xl font-medium text-sm hover:bg-[#1f6b47] transition-colors group"
        >
          <span>{t("nav.requestQuote")}</span>
          {isRtl ? (
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          ) : (
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          )}
        </NavLink>
      </div>
    </section>
  );
};

export default ContactCtaSection;
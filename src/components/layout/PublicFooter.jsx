import { useTranslation } from "react-i18next";
import {
  Phone,
  MapPin,
  Mail,
  Globe,
} from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa";
import { LOGO_SRC_LIGHT } from "../../config/logo";
import { NavLink } from "react-router-dom";
import { useLanguageStore } from "../../store/language.store";


const PublicFooter = () => {
  const { t } = useTranslation();
  const currentLang = useLanguageStore((state) => state.currentLang);

  return (
    <footer className="bg-olive text-paper mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

        {/* Company */}
        <div>
          <NavLink to="/" className="block mb-4">
            <img
              src={LOGO_SRC_LIGHT[currentLang]}
              alt="Al Nasr - النصر"
              className="h-14 sm:h-16 w-auto max-w-[180px] object-contain"
            />
          </NavLink>

          <p className="text-sm text-paper/70 leading-relaxed">
            {t("footer.desc")}
          </p>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-sm font-semibold mb-3 text-mint-pale">
            {t("nav.contact")}
          </h3>

          <ul className="text-sm text-paper/70 space-y-2">

            {/* Phone 1 */}
            <li>
              <a
                href="tel:01140156010"
                className="flex items-center gap-2 hover:text-paper transition-colors"
              >
                <Phone size={14} className="shrink-0" />
                <span className="numeric">01140156010</span>
              </a>
            </li>

            {/* Phone 2 */}
            <li>
              <a
                href="tel:01270952548"
                className="flex items-center gap-2 hover:text-paper transition-colors"
              >
                <Phone size={14} className="shrink-0" />
                <span className="numeric">01270952548</span>
              </a>
            </li>

            {/* Location */}
            <li>
              <a
                href="https://maps.app.goo.gl/ENwc7c96cmJBJFgk9"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-paper transition-colors"
              >
                <MapPin size={14} className="shrink-0" />
                <span>{t("footer.location")}</span>
              </a>
            </li>

            {/* Email */}
            <li>
              <a
                href="mailto:elnasrcompanyagricultural@gmail.com"
                className="flex items-center gap-2 hover:text-paper transition-colors"
              >
                <Mail size={14} className="shrink-0" />
                <span>elnasrcompanyagricultural@gmail.com</span>
              </a>
            </li>


            {/* Website */}
            <li>
              <a
                href="https://www.alnasr.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-paper transition-colors"
              >
                <Globe size={14} className="shrink-0" />
                <span>www.alnasr.com</span>
              </a>
            </li>

          </ul>
        </div>

        {/* Products */}
        <div>
          <h3 className="text-sm font-semibold mb-3 text-mint-pale">
            {t("nav.products")}
          </h3>

          <ul className="text-sm text-paper/70 space-y-2">
            <li>
              <NavLink
                to="/products"
                className="hover:text-paper transition-colors"
              >
                {t("nav.products")}
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/about"
                className="hover:text-paper transition-colors"
              >
                {t("nav.about")}
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/contact"
                className="hover:text-paper transition-colors"
              >
                {t("nav.requestQuote")}
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-sm font-semibold mb-3 text-mint-pale">
            {t("footer.socialMedia")}
          </h3>

          <div className="flex items-center gap-3">

            {/* Facebook */}
            <a
              href="https://www.facebook.com/share/1EuK1HGhGX/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-paper/70 hover:bg-mint-pale hover:text-olive hover:border-mint-pale transition-all duration-300"
            >
              <FaFacebookF size={16} />
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/YOUR_ACCOUNT"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-paper/70 hover:bg-mint-pale hover:text-olive hover:border-mint-pale transition-all duration-300"
            >
              <FaInstagram size={18} />
            </a>

            {/* WhatsApp - Phone 1 */}
            <a
              href="https://wa.me/201140156010"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp 01140156010"
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-paper/70 hover:bg-mint-pale hover:text-olive hover:border-mint-pale transition-all duration-300"
            >
              <FaWhatsapp size={19} />
            </a>

            {/* WhatsApp - Phone 2 */}
            <a
              href="https://wa.me/201270952548"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp 01270952548"
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-paper/70 hover:bg-mint-pale hover:text-olive hover:border-mint-pale transition-all duration-300"
            >
              <FaWhatsapp size={19} />
            </a>

          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10 py-4">
        <p className="text-center text-xs text-paper/50">
          © {new Date().getFullYear()} {t("footer.end")}
        </p>
      </div>
    </footer>
  );
};

export default PublicFooter;

import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Wheat } from "lucide-react";

import PublicHeader from "../components/layout/PublicHeader.jsx";
import PublicFooter from "../components/layout/PublicFooter.jsx";
import SEO from "../components/shared/SEO.jsx";

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-paper text-ink min-h-screen flex flex-col">
      <SEO title="Page not found" />
      <PublicHeader />

      <div className="flex-1 flex items-center justify-center px-6 py-24 text-center">
        <div>
          <div className="w-16 h-16 rounded-full bg-mint-pale flex items-center justify-center mx-auto mb-6">
            <Wheat size={28} className="text-olive" strokeWidth={1.5} />
          </div>
          <p className="font-display text-6xl font-semibold text-olive mb-3">404</p>
          <h1 className="font-display text-xl font-semibold text-ink mb-2">
            {t("common.noResults")}
          </h1>
          <p className="text-muted-foreground mb-8 max-w-sm mx-auto">
            The page you're looking for doesn't exist or may have moved.
          </p>
          <NavLink
            to="/"
            className="inline-flex items-center rounded-full bg-olive text-paper text-sm font-medium px-5 py-2.5 hover:bg-[#0f2a20] transition-colors"
          >
            {t("nav.home")}
          </NavLink>
        </div>
      </div>

      <PublicFooter />
    </div>
  );
};

export default NotFoundPage;

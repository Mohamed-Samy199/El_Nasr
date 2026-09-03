import { useEffect } from "react";

const SEO = ({ title, description, structuredData }) => {
  useEffect(() => {
    const fullTitle = title ? `${title} | Al Nasr` : "Al Nasr | Agricultural Crops";
    document.title = fullTitle;

    if (description) {
      let metaTag = document.querySelector('meta[name="description"]');
      if (!metaTag) {
        metaTag = document.createElement("meta");
        metaTag.name = "description";
        document.head.appendChild(metaTag);
      }
      metaTag.content = description;
    }

    let scriptTag = null;
    if (structuredData) {
      scriptTag = document.createElement("script");
      scriptTag.type = "application/ld+json";
      scriptTag.textContent = JSON.stringify(structuredData);
      document.head.appendChild(scriptTag);
    }

    return () => {
      if (scriptTag) document.head.removeChild(scriptTag);
    };
  }, [title, description, structuredData]);

  return null;
};

export default SEO;
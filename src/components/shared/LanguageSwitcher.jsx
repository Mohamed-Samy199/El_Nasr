import { useLanguageStore } from "../../store/language.store.js";

const LANGS = [
  { code: "en", label: "English" },
  { code: "ar", label: "Arabic" },
];

/**
 * زرار تبديل اللغة — بيتحط في الـ Header العام وفي أعلى لوحة التحكم.
 * شكله: EN | AR، اللغة الحالية بتتميز بخلفية --mint-pale ونص --olive.
 */
const LanguageSwitcher = () => {
  const currentLang = useLanguageStore((state) => state.currentLang);
  const setLanguage = useLanguageStore((state) => state.setLanguage);

  return (
    <div
      className="inline-flex items-center rounded-full border border-line bg-card p-1"
      role="group"
      aria-label="Language switcher"
    >
      {LANGS.map(({ code, label }) => {
        const isActive = currentLang === code;
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLanguage(code)}
            aria-pressed={isActive}
            className={`px-3 py-1 text-sm font-medium rounded-full transition-colors duration-150 ${
              isActive
                ? "bg-mint-pale text-olive"
                : "text-muted-foreground hover:text-ink"
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
};

export default LanguageSwitcher;

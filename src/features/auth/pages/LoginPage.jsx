import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../../../components/shared/LanguageSwitcher.jsx";
import LoginForm from "../components/LoginForm.jsx";

const LoginPage = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex items-center justify-center bg-paper px-4">
      <div className="w-full max-w-sm">
        <div className="flex justify-center mb-6">
          <LanguageSwitcher />
        </div>

        <div className="bg-card border border-line rounded-card shadow-card p-8">
          <div className="text-center mb-6">
            <span className="font-display text-lg font-semibold text-olive block mb-1">
              El Nasr
            </span>
            <h1 className="font-display text-xl font-semibold text-ink">
              {t("dashboard.title")}
            </h1>
          </div>

          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

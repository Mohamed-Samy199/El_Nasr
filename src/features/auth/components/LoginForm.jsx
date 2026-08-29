import { useFormik } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../../hooks/useAuth.js";

const loginSchema = Yup.object({
  email: Yup.string().email("Enter a valid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const LoginForm = () => {
  const { t } = useTranslation();
  const { loginMutation } = useAuth();

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      loginMutation.mutate(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} noValidate className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-ink mb-1.5">
          {t("auth.email")}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`w-full rounded-card border bg-card px-3.5 py-2.5 text-ink placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-mint transition-colors ${
            formik.touched.email && formik.errors.email ? "border-clay" : "border-line"
          }`}
          placeholder="you@company.com"
        />
        {formik.touched.email && formik.errors.email && (
          <p className="mt-1 text-sm text-clay">{formik.errors.email}</p>
        )}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-ink mb-1.5">
          {t("auth.password")}
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`w-full rounded-card border bg-card px-3.5 py-2.5 text-ink focus:outline-none focus:ring-2 focus:ring-mint transition-colors ${
            formik.touched.password && formik.errors.password ? "border-clay" : "border-line"
          }`}
          placeholder="••••••••"
        />
        {formik.touched.password && formik.errors.password && (
          <p className="mt-1 text-sm text-clay">{formik.errors.password}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={loginMutation.isPending}
        className="w-full rounded-card bg-olive text-paper font-medium py-2.5 hover:bg-[#0f2a20] disabled:opacity-60 transition-colors"
      >
        {loginMutation.isPending ? t("common.loading") : t("auth.loginButton")}
      </button>
    </form>
  );
};

export default LoginForm;

import { createBrowserRouter } from "react-router-dom";

import ProtectedRoute from "../components/shared/ProtectedRoute.jsx";
import DashboardLayout from "../components/layout/DashboardLayout.jsx";

import HomePage from "../features/public-site/pages/HomePage.jsx";
import ProductsPage from "../features/public-site/pages/ProductsPage.jsx";
import ProductDetailsPage from "../features/public-site/pages/ProductDetailsPage.jsx";
import AboutPage from "../features/public-site/pages/AboutPage.jsx";
import ContactPage from "../features/public-site/pages/ContactPage.jsx";
import LoginPage from "../features/auth/pages/LoginPage.jsx";
import DashboardHomePage from "../features/dashboard-overview/pages/DashboardHomePage.jsx";
import ProductsListPage from "../features/dashboard-products/pages/ProductsListPage.jsx";
import ProductCreatePage from "../features/dashboard-products/pages/ProductCreatePage.jsx";
import ProductEditPage from "../features/dashboard-products/pages/ProductEditPage.jsx";
import CategoriesPage from "../features/dashboard-categories/pages/CategoriesPage.jsx";
import QuoteRequestsPage from "../features/dashboard-quote-requests/pages/QuoteRequestsPage.jsx";
import NotFoundPage from "../pages/NotFoundPage.jsx";

export const router = createBrowserRouter([
  // ── الموقع العام ─────────────────────────────────────────────────────
  { path: "/", element: <HomePage /> },
  { path: "/products", element: <ProductsPage /> },
  { path: "/products/:slug", element: <ProductDetailsPage /> },
  { path: "/about", element: <AboutPage /> },
  { path: "/contact", element: <ContactPage /> },

  // ── لوحة التحكم ──────────────────────────────────────────────────────
  {
    path: "/dashboard/login",
    element: <LoginPage />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          { path: "/dashboard", element: <DashboardHomePage /> },
          { path: "/dashboard/products", element: <ProductsListPage /> },
          { path: "/dashboard/products/new", element: <ProductCreatePage /> },
          { path: "/dashboard/products/:id/edit", element: <ProductEditPage /> },
          { path: "/dashboard/categories", element: <CategoriesPage /> },
          { path: "/dashboard/quote-requests", element: <QuoteRequestsPage /> },
        ],
      },
    ],
  },

  // ── 404 — لازم يفضل آخر route في القائمة ────────────────────────────
  { path: "*", element: <NotFoundPage /> },
]);

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import AppProviders from "./app/AppProviders.jsx";

import "./styles/globals.css";
import "./styles/rtl.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppProviders />
  </StrictMode>
);

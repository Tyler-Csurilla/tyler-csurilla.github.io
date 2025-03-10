import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import LandingPage from "./Components/Pages/LandingPage/LandingPage.js";
import NotFoundPage from "./Components/Pages/NotFoundPage/NotFoundPage";
import { ThemeProvider } from "./Components/ThemeProvider/ThemeProvider.tsx";

import { HashRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./Components/AppLayout/AppLayout.js";
import ThemeDemo from "./Components/Pages/ThemePage/ThemeDemo/ThemeDemo.tsx";
import ThemePage from "./Components/Pages/ThemePage/ThemePage.tsx";
import "./global.css";

const root = createRoot(document.getElementById("root")!);

root.render(
  <StrictMode>
    <HashRouter>
      <ThemeProvider>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<LandingPage />} />

            <Route path="/theme" element={<ThemePage />} />
            <Route path="/theme/demo" element={<ThemeDemo />} />

            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </HashRouter>
  </StrictMode>
);

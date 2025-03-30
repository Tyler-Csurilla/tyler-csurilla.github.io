import { Outlet } from "react-router-dom";
import isColorLight from "../../utils/calculation/isColorLight";
import { useTheme } from "../../utils/hooks/useTheme";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import { Footer } from "../Footer/Footer";
import { Navigation } from "../Navigation/Navigation";
import ParticlesBackground from "../ParticleBackground/ParticleBackground";
import ScrollToTop from "../ScrollToTop/ScrollToTop";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";
import "./AppLayout.css";

const AppLayout: React.FC = () => {
  const { currentTheme } = useTheme();
  const isLight = isColorLight(currentTheme.background.base);

  return (
    <div
      className="app-layout"
      style={{
        background: isLight
          ? `linear-gradient(
      180deg,
      rgb(from var(--background-dark5) r g b / 100%) -8%,
      rgb(from var(--background-dark4) r g b / 60%) -1%,
      rgb(from var(--background-dark3) r g b / 30%) 6%,
      rgb(from var(--background-dark2) r g b / 10%) 12%,
      rgb(from var(--background-dark1) r g b / 0%) 18%
    )`
          : `linear-gradient(
      180deg,
      rgb(from var(--background-dark5) r g b / 100%) -8%,
      rgb(from var(--background-dark4) r g b / 60%) 0%,
      rgb(from var(--background-dark3) r g b / 50%) 5%,
      rgb(from var(--background-dark2) r g b / 30%) 12%,
      rgb(from var(--background-dark1) r g b / 50%) 18%
    )`,
      }}
    >
      <ErrorBoundary>
        <ScrollToTop />
        <ParticlesBackground />

        <div
          style={{ position: "fixed", top: "1rem", right: "1rem", zIndex: 100 }}
        >
          <ThemeSwitcher />
        </div>

        <main
          className="app-layout__main-content"
          style={{
            background: isLight
              ? `linear-gradient(180deg,
                  rgb(from var(--background-dark3) r g b / 0%) 0%,
                  rgb(from var(--background-dark2) r g b / 25%) 55%,
                  rgb(from var(--background-dark1) r g b / 0%) 95%)`
              : `linear-gradient(180deg,
                  rgb(from var(--background-light3) r g b / 0%) 10%,
                  rgb(from var(--background-light2) r g b / 25%) 40%,
                  rgb(from var(--background-light1) r g b / 0%) 95%)`,
          }}
        >
          <Navigation />

          <Outlet />
        </main>
        <Footer />
      </ErrorBoundary>
    </div>
  );
};

export default AppLayout;

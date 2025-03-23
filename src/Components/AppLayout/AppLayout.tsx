import { Outlet } from "react-router-dom";
import isColorLight from "../../utils/calculation/isColorLight";
import { useTheme } from "../../utils/hooks/useTheme";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import { Footer } from "../Footer/Footer";
import Navigation from "../Navigation/Navigation";
import ParticlesBackground from "../ParticleBackground/ParticleBackground";
import ScrollToTop from "../ScrollToTop/ScrollToTop";
import "./AppLayout.css";

const AppLayout: React.FC = () => {
  const { currentTheme } = useTheme();
  const isLight = isColorLight(currentTheme.background.base);

  return (
    <div className="app-layout">
      <ErrorBoundary>
        <ScrollToTop />
        <ParticlesBackground />
        <Navigation />
        <main
          className="app-layout__main-content"
          style={{
            background: isLight
              ? `linear-gradient(180deg, 
                  rgb(from var(--background-dark3) r g b / 0%) 5%, 
                  rgb(from var(--accent-dark2) r g b / 25%) 40%, 
                  rgb(from var(--background-dark2) r g b / 0%) 95%)`
              : `linear-gradient(180deg, 
                  rgb(from var(--background-light3) r g b / 0%) 5%, 
                  rgb(from var(--accent-light2) r g b / 25%) 40%, 
                  rgb(from var(--background-light1) r g b / 0%) 95%)`,
          }}
        >
          <Outlet />
        </main>
        <Footer />
      </ErrorBoundary>
    </div>
  );
};

export default AppLayout;

import { Outlet } from "react-router-dom";
import isColorLight from "../../utils/calculation/isColorLight";
import { useTheme } from "../../utils/hooks/useTheme";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import { Footer } from "../Footer/Footer";
import Navigation from "../Navigation/Navigation";
import ParticlesBackground from "../ParticleBackground/ParticleBackground";
import "./AppLayout.css";

const AppLayout: React.FC = () => {
  const { currentTheme } = useTheme();

  return (
    <div className="app-layout">
      <ErrorBoundary>
        <ParticlesBackground />
        <Navigation />
        <main
          className="app-layout__main-content"
          style={{
            boxShadow: isColorLight(currentTheme.background.base)
              ? "0 0 10px 0 rgb(from var(--background-dark4) r g b / 50%)"
              : "0 0 10px 0 rgb(from var(--background-light4) r g b / 50%)",

            // backgroundColor: background: rgb(from var(--background-dark4) r g b / 40%);
            backgroundColor: isColorLight(currentTheme.background.base)
              ? "rgb(from var(--background-dark1) r g b / 40%)"
              : "rgb(from var(--background-light1) r g b / 40%)",
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

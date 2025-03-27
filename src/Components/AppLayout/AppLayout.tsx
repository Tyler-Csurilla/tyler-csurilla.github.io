import { motion } from "motion/react";
import { Link, Outlet } from "react-router-dom";
import isColorLight from "../../utils/calculation/isColorLight";
import { useTheme } from "../../utils/hooks/useTheme";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import { Footer } from "../Footer/Footer";
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
      rgb(from var(--background-dark4) r g b / 60%) 0%,
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
                  rgb(from var(--background-dark3) r g b / 0%) 5%, 
                  rgb(from var(--background-dark2) r g b / 25%) 55%, 
                  rgb(from var(--background-dark1) r g b / 0%) 95%)`
              : `linear-gradient(180deg, 
                  rgb(from var(--background-light3) r g b / 0%) 10%, 
                  rgb(from var(--background-light2) r g b / 25%) 40%, 
                  rgb(from var(--background-light1) r g b / 0%) 95%)`,
          }}
        >
          <nav className="nav">
            <div className="nav-links">
              <Link to="/">Home</Link>
              <Link to="/theme">Theme</Link>
              <a
                href="https://github.com/Tyler-Csurilla/tyler-csurilla.github.io"
                target="_blank"
                rel="noreferrer"
              >
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="30"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  animate={{
                    rotate: [0, 10, -10, 0],
                    transition: { duration: 0.5 },
                  }}
                >
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </motion.svg>
              </a>
            </div>
          </nav>

          <Outlet />
        </main>
        <Footer />
      </ErrorBoundary>
    </div>
  );
};

export default AppLayout;

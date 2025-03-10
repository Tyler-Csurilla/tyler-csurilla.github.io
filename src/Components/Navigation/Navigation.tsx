import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { useTheme } from "../../utils/hooks/useTheme";
import { themes } from "../ThemeProvider/ThemesData";
import "./Navigation.css";

const Navigation: React.FC = () => {
  const { switchToNextTheme, currentTheme, nextThemeName } = useTheme();

  return (
    <motion.header
      initial={{ y: -233 }}
      animate={{ y: 0, transition: { duration: 2, type: "spring" } }}
      className="landing-page__navigation-header"
    >
      <div className="landing-page__nav-container">
        <nav
          className="landing-page__navigation"
          style={{
            backgroundColor: currentTheme.background.dark1,
          }}
        >
          <Link className="navigation__link" to="/">
            Home
          </Link>
          <span className="navigation__separator">|</span>
          <Link className="navigation__link" to="/theme">
            Theme
          </Link>
          <span className="navigation__separator">|</span>
          <Link
            className="navigation__link"
            to="https://github.com/Tyler-Csurilla/tyler-csurilla.github.io"
          >
            Repo
          </Link>
        </nav>
        <button
          className="landing-page__theme-switch-button"
          onClick={switchToNextTheme}
        >
          Switch to {themes[nextThemeName]?.title}
        </button>
      </div>
    </motion.header>
  );
};

export default Navigation;

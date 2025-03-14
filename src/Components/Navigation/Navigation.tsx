import { motion } from "motion/react"; // or 'framer-motion'
import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../utils/hooks/useTheme";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";
import "./Navigation.css";

const Navigation: React.FC = () => {
  const { currentTheme } = useTheme();

  return (
    <motion.header
      className="navigation-header"
      style={{ backgroundColor: currentTheme.background.dark1 }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="navigation-content">
        {/* Left side: avatar + "My Portfolio" */}
        <div className="nav-left">
          <span className="nav-logo-text">Tyler Csurilla</span>
        </div>

        {/* Center: nav links */}
        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/theme">Theme</Link>
          <a
            href="https://github.com/Tyler-Csurilla/tyler-csurilla.github.io"
            target="_blank"
            rel="noreferrer"
          >
            Repo
          </a>
        </nav>

        {/* Right side: theme switcher */}
        <div className="nav-right">
          <ThemeSwitcher />
        </div>
      </div>
    </motion.header>
  );
};

export default Navigation;

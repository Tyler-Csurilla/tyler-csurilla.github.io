import { motion, useScroll, useTransform } from "motion/react"; // or 'framer-motion'
import React from "react";
import { Link } from "react-router-dom";
import isColorLight from "../../utils/calculation/isColorLight";
import { useTheme } from "../../utils/hooks/useTheme";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";
import "./Navigation.css";

const Navigation: React.FC = () => {
  const { currentTheme } = useTheme();
  const isLight = isColorLight(currentTheme.background.base);

  const { scrollYProgress } = useScroll();

  const startFade = 0;
  const midFade1 = 0.05;
  const midFade2 = 0.15;
  const fullFade = 0.25;

  const startOpacity = 0;
  const midOpacity1 = 0.2;
  const midOpacity2 = 0.6;
  const fullOpacity = 1;

  const gradientOpacity = useTransform(
    scrollYProgress,
    [startFade, midFade1, midFade2, fullFade], //
    [startOpacity, midOpacity1, midOpacity2, fullOpacity]
  );

  const backgroundGradient = useTransform(gradientOpacity, (opacity) =>
    isLight
      ? `linear-gradient(90deg, 
            rgb(from var(--background-dark1) r g b / ${opacity * 0.1}) 0%, 
            rgb(from var(--background-dark1) r g b / ${opacity}) 50%, 
            rgb(from var(--background-dark1) r g b / 0%) 100%)`
      : `linear-gradient(90deg, 
            rgb(from var(--background-light1) r g b / ${opacity * 1}) 0%, 
            rgb(from var(--background-light1) r g b / ${opacity}) 50%, 
            rgb(from var(--background-light1) r g b / 0%) 100%)`
  );

  const shadowOpacity = useTransform(
    scrollYProgress,
    [startFade, midFade1, midFade2, fullFade],
    [0, 0.1, 0.3, 0.466]
  );

  const boxShadow = useTransform(shadowOpacity, (opacity) =>
    opacity === 0 ? "none" : `0 2px 2rem rgba(0, 0, 0, ${opacity})`
  );

  return (
    <motion.header
      className="navigation-header"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        background: backgroundGradient,
        boxShadow: boxShadow,
      }}
      transition={{ duration: 1 }}
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

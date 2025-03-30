import { motion } from "motion/react";
import { Link } from "react-router-dom";

import "./Navigation.css";

export function Navigation() {
  return (
    <nav className="nav">
      <div className="nav-links">
        <Link to="/" className="faded-corner-borders-hover">
          Home
        </Link>
        <Link to="/theme" className="faded-corner-borders-hover">
          Theme
        </Link>
        <a
          href="https://github.com/Tyler-Csurilla/tyler-csurilla.github.io"
          target="_blank"
          rel="noreferrer"
          className="faded-corner-borders-hover"
        >
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
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
  );
}

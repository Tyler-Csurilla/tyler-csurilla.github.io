import { Link } from "react-router-dom";
import { useTheme } from "../../utils/hooks/useTheme";
import { motion } from "motion/react";
import "./navigation.css";
import Logo from "../Logo/LogoText";
import { themes } from "../ThemeProvider/ThemesData";

const Navigation: React.FC = () => {
    const { switchToNextTheme, currentTheme, nextThemeName } = useTheme();

    return (
        <motion.header
            initial={{ y: -233 }}
            animate={{ y: 0, transition: { duration: 2, type: "spring" } }}
            className="navigation-header"
        >
            <div className="logo-container">
                <Logo />
            </div>
            <div className="nav-container">
                <nav className="navigation" style={{ backgroundColor: currentTheme.accent_Color }}>
                    <Link className="navLink" to="/">Home</Link>
                    <span className="separator">|</span>
                    <Link className="navLink" to="/theme">Theme</Link>
                </nav>
                <button className="theme-switch-button" onClick={switchToNextTheme} >
                    Switch to {themes[nextThemeName]?.title}
                </button>
            </div>
        </motion.header >
    );
};

export default Navigation;

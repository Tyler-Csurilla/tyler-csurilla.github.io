import { useEffect, useRef, useState } from "react";
import { useTheme } from "../../utils/hooks/useTheme";
import { ArrowDownIcon, ArrowRightIcon, MoonIcon, SunIcon } from "./Icons";
import "./ThemeSwitcher.css";

const ThemeSwitcher: React.FC = () => {
  const {
    themeName,
    switchToNextTheme,
    switchToThemeName,
    availableThemes,
    themeIsLight,
    nextThemeName,
  } = useTheme();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Format theme names for display (convert underscore to space and capitalize words)
  const formatThemeName = (name: string): string => {
    return name
      .split("_")
      .join(" ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  // Toggle between light and dark themes
  const toggleLightDark = () => {
    switchToThemeName(themeIsLight ? "dark" : "light");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        buttonRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Emoji extraction function
  const getThemeEmoji = (name: string) => {
    const emojiMap: Record<string, string> = {
      light: "☀️",
      dark: "🌙",
      desert_bloom: "🌵",
      forest_edge: "🌲",
      sunset_lounge: "🌅",
      midnight_jazz: "🎷",
      candy_pop: "🍭",
      soothing_sage: "🌿",
      random: "🎲",
    };

    return emojiMap[name] || "🎨";
  };

  return (
    <div className="theme-switcher-container">
      <div className="theme-switcher-pill">
        {/* Light/Dark Toggle */}
        <button
          className="theme-switcher-section left"
          onClick={toggleLightDark}
          title={
            themeIsLight ? "Switch to dark theme" : "Switch to light theme"
          }
          aria-label={
            themeIsLight ? "Switch to dark theme" : "Switch to light theme"
          }
        >
          {themeIsLight ? <SunIcon /> : <MoonIcon />}
        </button>

        {/* Next Theme Button */}
        <button
          className="theme-switcher-section middle"
          onClick={switchToNextTheme}
          title={`Switch to ${formatThemeName(nextThemeName)} theme`}
          aria-label={`Switch to ${formatThemeName(nextThemeName)} theme`}
        >
          <ArrowRightIcon />
          <span className="current-theme-name">
            {getThemeEmoji(nextThemeName)} {formatThemeName(nextThemeName)}
          </span>
        </button>

        {/* Theme Dropdown */}
        <div className="theme-switcher-section right">
          <button
            ref={buttonRef}
            className={`dropdown-toggle ${dropdownOpen ? "open" : ""}`}
            onClick={() => setDropdownOpen(!dropdownOpen)}
            title="View all themes"
            aria-label="View all themes"
            aria-expanded={dropdownOpen}
            aria-controls="theme-dropdown"
          >
            <ArrowDownIcon />
          </button>

          {dropdownOpen && (
            <div
              className="dropdown-backdrop"
              onClick={() => setDropdownOpen(false)}
            />
          )}

          <div
            id="theme-dropdown"
            ref={dropdownRef}
            className={`dropdown-menu ${dropdownOpen ? "open" : ""}`}
            role="menu"
          >
            <ul className="themes-list">
              {availableThemes.map((name) => (
                <li
                  key={name}
                  className={`theme-item ${themeName === name ? "active" : ""}`}
                  onClick={() => {
                    switchToThemeName(name);
                    setDropdownOpen(false);
                  }}
                  role="menuitem"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      switchToThemeName(name);
                      setDropdownOpen(false);
                    }
                  }}
                >
                  <span className="theme-emoji">{getThemeEmoji(name)}</span>
                  <span className="theme-name">{formatThemeName(name)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeSwitcher;

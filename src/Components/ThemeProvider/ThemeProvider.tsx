import { createContext, FC, ReactNode, useEffect, useState } from "react";
import {
  ColorScale,
  Theme,
  ThemeContextValue,
  ThemeName,
} from "../../types/theme";
import isColorLight from "../../utils/calculation/isColorLight";
import { generateColorScale } from "../../utils/theme/generateColorScale";
import { themes } from "./ThemesData";

interface ThemeProviderProps {
  children: ReactNode;
}

// Create the context with proper typing
export const ThemeContext = createContext<ThemeContextValue>({
  currentTheme: {} as Theme, // Default empty theme that will be overridden
  themeName: "",
  nextThemeName: "",
  availableThemes: [],
  switchToNextTheme: () => {},
  switchToThemeName: () => {},
  addNewTheme: () => {},
  themeIsLight: false,
});

const randomHex = () =>
  "#" +
  Math.floor(Math.random() * 0xffffff)
    .toString(16)
    .padStart(6, "0");

const randomizeRandomTheme = () => {
  const randomFonts = [
    "Arial",
    "Courier New",
    "Georgia",
    "Lucida Console",
    "Lucida Sans Unicode",
    "Palatino Linotype",
    "Tahoma",
    "Times New Roman",
    "Trebuchet MS",
  ];

  themes.random = {
    title: themes.random.title,
    background: generateColorScale(randomHex()),
    primary: generateColorScale(randomHex()),
    secondary: generateColorScale(randomHex()),
    accent: generateColorScale(randomHex()),
    font_family: randomFonts[Math.floor(Math.random() * randomFonts.length)],
  };
};

export const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  // Retrieve stored theme and custom themes from localStorage
  const storedTheme = localStorage.getItem("themeName") as ThemeName | null;
  const customThemes = localStorage.getItem("customThemes");
  if (customThemes) {
    const customThemesFromStorage = JSON.parse(customThemes) as Record<
      ThemeName,
      Theme
    >;
    Object.entries(customThemesFromStorage).forEach(([key, value]) => {
      themes[key] = value;
    });
  }
  const systemPrefersDark = window.matchMedia?.(
    "(prefers-color-scheme: dark)"
  )?.matches;
  let initialThemeName: ThemeName =
    storedTheme && storedTheme in themes
      ? storedTheme
      : systemPrefersDark
      ? "dark"
      : "light";

  if (initialThemeName === "random") randomizeRandomTheme();

  const [themeName, setThemeName] = useState<ThemeName>(initialThemeName);
  const [updateCount, setUpdateCount] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const handleError = (message: string) => {
    console.error(message);
    setError(message);
  };

  // Update CSS variables whenever theme changes
  const updateCSSVariables = () => {
    const currentTheme = themes[themeName];

    // Set font family variable
    document.documentElement.style.setProperty(
      "--font_family",
      currentTheme.font_family
    );

    // Set color scale variables with expanded shades
    const setColorScaleVariables = (prefix: string, scale: ColorScale) => {
      document.documentElement.style.setProperty(
        `--${prefix}-base`,
        scale.base
      );

      // Set light variations
      document.documentElement.style.setProperty(
        `--${prefix}-light1`,
        scale.light1
      );
      document.documentElement.style.setProperty(
        `--${prefix}-light2`,
        scale.light2
      );
      document.documentElement.style.setProperty(
        `--${prefix}-light3`,
        scale.light3
      );
      document.documentElement.style.setProperty(
        `--${prefix}-light4`,
        scale.light4
      );
      document.documentElement.style.setProperty(
        `--${prefix}-light5`,
        scale.light5
      );

      // Set dark variations
      document.documentElement.style.setProperty(
        `--${prefix}-dark1`,
        scale.dark1
      );
      document.documentElement.style.setProperty(
        `--${prefix}-dark2`,
        scale.dark2
      );
      document.documentElement.style.setProperty(
        `--${prefix}-dark3`,
        scale.dark3
      );
      document.documentElement.style.setProperty(
        `--${prefix}-dark4`,
        scale.dark4
      );
      document.documentElement.style.setProperty(
        `--${prefix}-dark5`,
        scale.dark5
      );
    };

    setColorScaleVariables("background", currentTheme.background);
    setColorScaleVariables("primary", currentTheme.primary);
    setColorScaleVariables("secondary", currentTheme.secondary);
    setColorScaleVariables("accent", currentTheme.accent);

    localStorage.setItem("themeName", themeName);
  };

  useEffect(() => {
    updateCSSVariables();
  }, [themeName, updateCount]);

  const switchToThemeName = (newThemeName: ThemeName) => {
    try {
      if (newThemeName === "random") randomizeRandomTheme();
      if (!themes[newThemeName]) {
        throw new Error(`Theme "${newThemeName}" doesn't exist.`);
      }
      setThemeName(newThemeName);
      setUpdateCount((prev) => prev + 1);
    } catch (err) {
      handleError(
        err instanceof Error ? err.message : "Unknown error occurred"
      );
    }
  };

  const addNewTheme = (newThemeName: ThemeName, newTheme: Theme) => {
    themes[newThemeName] = newTheme;
  };

  const themeNames = Object.keys(themes) as ThemeName[];
  const currentIndex = themeNames.indexOf(themeName);
  const nextThemeName = themeNames[(currentIndex + 1) % themeNames.length];

  const switchToNextTheme = () => switchToThemeName(nextThemeName);

  if (error) {
    return <div>Error: {error}</div>;
  }

  const themeIsLight = isColorLight(themes[themeName].background.base);

  return (
    <ThemeContext.Provider
      value={{
        currentTheme: themes[themeName],
        themeName,
        nextThemeName,
        availableThemes: themeNames,
        switchToNextTheme,
        switchToThemeName,
        addNewTheme,
        themeIsLight: themeIsLight,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

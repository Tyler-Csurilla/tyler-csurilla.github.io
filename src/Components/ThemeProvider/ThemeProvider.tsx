import { createContext, FC, ReactNode, useEffect, useState } from "react";
import { themes } from "./ThemesData";

export interface Theme {
  bg_Color: string;
  primary_Color: string;
  secondary_Color: string;
  accent_Color: string;
  accentHover_Color: string;
  font_family: string;
  title: string;
}

export type ThemeName = string;

export interface ThemeContextValue {
  currentTheme: Theme;
  nextThemeName: ThemeName;
  themeName: ThemeName;
  switchToNextTheme: () => void;
  availableThemes: ThemeName[];
  switchToThemeName: (newThemeName: ThemeName) => void;
  addNewTheme: (newThemeName: ThemeName, newTheme: Theme) => void;
}

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeContext = createContext<ThemeContextValue | undefined>(
  undefined
);

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
    bg_Color: randomHex(),
    primary_Color: randomHex(),
    secondary_Color: randomHex(),
    accent_Color: randomHex(),
    accentHover_Color: randomHex(),
    font_family: randomFonts[Math.floor(Math.random() * randomFonts.length)],
    title: themes.random.title,
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
    Object.entries(currentTheme).forEach(([key, value]) => {
      document.documentElement.style.setProperty(`--${key}`, value);
    });
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
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export interface ColorScale {
  // Base color
  base: string;

  // Light variations - gets progressively lighter
  light1: string;
  light2: string;
  light3: string;
  light4: string;
  light5: string;

  // Dark variations - gets progressively darker
  dark1: string;
  dark2: string;
  dark3: string;
  dark4: string;
  dark5: string;
}

export interface Theme {
  title: string;
  background: ColorScale;
  primary: ColorScale;
  secondary: ColorScale;
  accent: ColorScale;
  font_family: string;
}

export interface ThemeContextValue {
  currentTheme: Theme;
  nextThemeName: string;
  themeName: string;
  switchToNextTheme: () => void;
  availableThemes: string[];
  switchToThemeName: (newThemeName: string) => void;
  addNewTheme: (newThemeName: string, newTheme: Theme) => void;
  themeIsLight: boolean;
  getTheme: (name: string) => Theme | undefined;
}

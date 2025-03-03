export interface ColorScale {
  // Base color
  base: string;

  // Light variations - getting progressively lighter
  light1: string;
  light2: string;
  light3: string;
  light4: string;
  light5: string;

  // Dark variations - getting progressively darker
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

export type ThemeName = string;

export interface ThemeContextValue {
  currentTheme: Theme;
  nextThemeName: ThemeName;
  themeName: ThemeName;
  switchToNextTheme: () => void;
  availableThemes: ThemeName[];
  switchToThemeName: (newThemeName: ThemeName) => void;
  addNewTheme: (newThemeName: ThemeName, newTheme: Theme) => void;
  themeIsLight: boolean;
}

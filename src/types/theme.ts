export interface Theme {
    title: string;
    bg_Color: string;
    primary_Color: string;
    secondary_Color: string;
    accent_Color: string;
    accentHover_Color: string;
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
}

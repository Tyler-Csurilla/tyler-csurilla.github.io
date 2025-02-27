import { useContext } from "react";
import { ThemeContext } from "../../Components/ThemeProvider/ThemeProvider";
import { ThemeContextValue } from "../../types/theme";

/**
 * Hook to access the current theme and theme-related functions
 * @returns ThemeContextValue containing the current theme and theme functions
 */
export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};

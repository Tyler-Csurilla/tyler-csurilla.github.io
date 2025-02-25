import { useContext } from "react";
import { ThemeContext, ThemeContextValue } from "../../Components/ThemeProvider/ThemeProvider";


export const useTheme = (): ThemeContextValue => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};

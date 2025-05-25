import { Theme } from "../types/theme";
import { generateColorScale } from "../utils/theme/generateColorScale";

const createTheme = (
  title: string,
  bgColor: string,
  primaryColor: string,
  secondaryColor: string,
  accentColor: string,
  fontFamily: string
): Theme => ({
  title,
  background: generateColorScale(bgColor),
  primary: generateColorScale(primaryColor),
  secondary: generateColorScale(secondaryColor),
  accent: generateColorScale(accentColor),
  font_family: fontFamily,
});

export const defaultThemes: Record<string, Theme> = {
  light: createTheme(
    "Light Mode 🌞",
    "#E8E8E8",
    "#333333",
    "#777777",
    "#555555",
    '"Inter", sans-serif'
  ),
  dark: createTheme(
    "Dark Mode 🌑",
    "#282828",
    "#E0E0E0",
    "#A0A0A0",
    "#808080",
    '"Inter", sans-serif'
  ),
  morning_mist: createTheme(
    "Morning Mist 🌫️",
    "#F5F8FC",
    "#2E2C3C",
    "#7E76A3",
    "#B39DDB",
    '"Montserrat", sans-serif'
  ),
  pastel_pop: createTheme(
    "Pastel Pop 🍭",
    "#FFF7F9",
    "#3C2C33",
    "#AE8F97",
    "#FF92C2",
    '"Quicksand", sans-serif'
  ),
  arctic_aura: createTheme(
    "Arctic Aura ❄️",
    "#F0FAFF",
    "#234D70",
    "#5DA4C5",
    "#00C8E0",
    '"Nunito", sans-serif'
  ),
  midnight_circuit: createTheme(
    "Midnight Circuit ⚡",
    "#12141B",
    "#D1D9FF",
    "#6B79A6",
    "#5373FF",
    '"Roboto Mono", monospace'
  ),
  noir_orchard: createTheme(
    "Noir Orchard 🌿",
    "#1A221A",
    "#DBFCD6",
    "#6E8F6A",
    "#3DBE6C",
    '"Merriweather", serif'
  ),
  crimson_void: createTheme(
    "Crimson Void 🩸",
    "#1B1314",
    "#F2CDD0",
    "#9C6E72",
    "#FF445E",
    '"Poppins", sans-serif'
  ),
  random: {
    title: "Random Theme 🎲",
    background: {
      base: "",
      light1: "",
      light2: "",
      dark1: "",
      dark2: "",
      light3: "",
      light4: "",
      light5: "",
      dark3: "",
      dark4: "",
      dark5: "",
    },
    primary: {
      base: "",
      light1: "",
      light2: "",
      dark1: "",
      dark2: "",
      light3: "",
      light4: "",
      light5: "",
      dark3: "",
      dark4: "",
      dark5: "",
    },
    secondary: {
      base: "",
      light1: "",
      light2: "",
      dark1: "",
      dark2: "",
      light3: "",
      light4: "",
      light5: "",
      dark3: "",
      dark4: "",
      dark5: "",
    },
    accent: {
      base: "",
      light1: "",
      light2: "",
      dark1: "",
      dark2: "",
      light3: "",
      light4: "",
      light5: "",
      dark3: "",
      dark4: "",
      dark5: "",
    },
    font_family: '"Inter", sans-serif',
  },
};

export const themes: Record<string, Theme> = JSON.parse(
  JSON.stringify(defaultThemes)
);

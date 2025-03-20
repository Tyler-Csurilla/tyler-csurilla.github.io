import { Theme } from "../../types/theme";
import { generateColorScale } from "../../utils/theme/generateColorScale";

const createTheme = (
  title: string,
  bgColor: string,
  primaryColor: string,
  secondaryColor: string,
  accentColor: string,
  fontFamily: string
): Theme => {
  return {
    title,
    background: generateColorScale(bgColor),
    primary: generateColorScale(primaryColor),
    secondary: generateColorScale(secondaryColor),
    accent: generateColorScale(accentColor),
    font_family: fontFamily,
  };
};

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
  ocean_breeze: createTheme(
    "Ocean Breeze 🌊",
    "#E5F2F8",
    "#2C5282",
    "#63B3ED",
    "#38B2AC",
    '"Montserrat", sans-serif'
  ),
  forest_retreat: createTheme(
    "Forest Retreat 🌿",
    "#EAEFEA",
    "#2D3B2D",
    "#687D6C",
    "#81B29A",
    '"Merriweather", serif'
  ),
  warm_sunset: createTheme(
    "Warm Sunset 🌅",
    "#FDF2E7",
    "#4A3933",
    "#B06E50",
    "#ED8936",
    '"Playfair Display", serif'
  ),
  royal_velvet: createTheme(
    "Royal Velvet 👑",
    "#26243B",
    "#CFC9E1",
    "#9C8EC1",
    "#E9D8FD",
    '"Poppins", sans-serif'
  ),
  cotton_candy: createTheme(
    "Cotton Candy 🍬",
    "#FCF1F8",
    "#9D4C6E",
    "#DB7093",
    "#F687B3",
    '"Quicksand", sans-serif'
  ),
  mint_fresh: createTheme(
    "Mint Fresh 🌱",
    "#F3F9F4",
    "#2C4F43",
    "#5E9F8F",
    "#4FD1C5",
    '"Nunito", sans-serif'
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

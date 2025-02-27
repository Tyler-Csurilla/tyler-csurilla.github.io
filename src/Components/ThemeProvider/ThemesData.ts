import { Theme, ThemeName } from "../../types/theme";
import { generateColorScale } from "../../utils/theme/generateColorScale";

// Helper function to create a theme with color scales
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

export const defaultThemes: Record<ThemeName, Theme> = {
  light: createTheme(
    "Luminous Light 🌞",
    "#FAFAFA",
    "#222222",
    "#6F6F6F",
    "#F9863E",
    '"Inter", sans-serif'
  ),
  dark: createTheme(
    "Moody Dark 🌙",
    "#121212",
    "#F5F5F5",
    "#888888",
    "#9F7AEA",
    '"Roboto", sans-serif'
  ),
  desertBloom: createTheme(
    "Desert Bloom 🌵",
    "#F1EFE3",
    "#5B3A24",
    "#AB856F",
    "#D89C6B",
    '"Source Sans Pro", sans-serif'
  ),
  forestEdge: createTheme(
    "Forest Edge 🌲",
    "#F6FBEF",
    "#2F4A3C",
    "#637B74",
    "#92B4A7",
    '"Merriweather", serif'
  ),
  sunsetLounge: createTheme(
    "Sunset Lounge 🌅",
    "#FFEDD5",
    "#2F2F2F",
    "#7F5539",
    "#C18E60",
    '"Playfair Display", serif'
  ),
  midnightJazz: createTheme(
    "Midnight Jazz 🎷",
    "#101828",
    "#E5E5E5",
    "#5A5A5A",
    "#845EC2",
    '"Roboto", sans-serif'
  ),
  candyPop: createTheme(
    "Candy Pop 🍭",
    "#FFF0F5",
    "#D94086",
    "#F28CA7",
    "#FDBEFB",
    '"Nunito", sans-serif'
  ),
  soothingSage: createTheme(
    "Soothing Sage 🌿",
    "#F8F8F5",
    "#445D52",
    "#A8BFB2",
    "#C2DAD3",
    '"Lato", sans-serif'
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
    font_family: '"Lato", sans-serif',
  },
};

export const themes: Record<ThemeName, Theme> = JSON.parse(
  JSON.stringify(defaultThemes)
);

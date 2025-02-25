import { Theme, ThemeName } from "./ThemeProvider";

export const defaultThemes: Record<ThemeName, Theme> = {
  light: {
    title: "Luminous Light 🌞",
    bg_Color: "#FAFAFA",
    primary_Color: "#222222",
    secondary_Color: "#6F6F6F",
    accent_Color: "#F9863E",
    accentHover_Color: "#F76E10",
    font_family: '"Inter", sans-serif',
  },
  dark: {
    title: "Moody Dark 🌙",
    bg_Color: "#121212",
    primary_Color: "#F5F5F5",
    secondary_Color: "#888888",
    accent_Color: "#9F7AEA",
    accentHover_Color: "#805AD5",
    font_family: '"Roboto", sans-serif',
  },
  desertBloom: {
    title: "Desert Bloom 🌵",
    bg_Color: "#F1EFE3",
    primary_Color: "#5B3A24",
    secondary_Color: "#AB856F",
    accent_Color: "#D89C6B",
    accentHover_Color: "#C98860",
    font_family: '"Source Sans Pro", sans-serif',
  },
  forestEdge: {
    title: "Forest Edge 🌲",
    bg_Color: "#F6FBEF",
    primary_Color: "#2F4A3C",
    secondary_Color: "#637B74",
    accent_Color: "#92B4A7",
    accentHover_Color: "#81A094",
    font_family: '"Merriweather", serif',
  },
  sunsetLounge: {
    title: "Sunset Lounge 🌅",
    bg_Color: "#FFEDD5",
    primary_Color: "#2F2F2F",
    secondary_Color: "#7F5539",
    accent_Color: "#C18E60",
    accentHover_Color: "#B17E50",
    font_family: '"Playfair Display", serif',
  },
  midnightJazz: {
    title: "Midnight Jazz 🎷",
    bg_Color: "#101828",
    primary_Color: "#E5E5E5",
    secondary_Color: "#5A5A5A",
    accent_Color: "#845EC2",
    accentHover_Color: "#7448B4",
    font_family: '"Roboto", sans-serif',
  },
  candyPop: {
    title: "Candy Pop 🍭",
    bg_Color: "#FFF0F5",
    primary_Color: "#D94086",
    secondary_Color: "#F28CA7",
    accent_Color: "#FDBEFB",
    accentHover_Color: "#FFC9FC",
    font_family: '"Nunito", sans-serif',
  },
  soothingSage: {
    title: "Soothing Sage 🌿",
    bg_Color: "#F8F8F5",
    primary_Color: "#445D52",
    secondary_Color: "#A8BFB2",
    accent_Color: "#C2DAD3",
    accentHover_Color: "#ABCCC3",
    font_family: '"Lato", sans-serif',
  },
  random: {
    title: "Random Theme 🎲",
    bg_Color: "",
    primary_Color: "",
    secondary_Color: "",
    accent_Color: "",
    accentHover_Color: "",
    font_family: '"Lato", sans-serif',
  },
};

export const themes: Record<ThemeName, Theme> = JSON.parse(
  JSON.stringify(defaultThemes)
);

import { ColorScale } from "../../types/theme";

// Function to lighten or darken a color
const adjustColor = (color: string, amount: number): string => {
  // Remove the # if it exists
  let hex = color.replace("#", "");

  // Convert to RGB
  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);

  // Lighten or darken
  r = Math.min(255, Math.max(0, amount > 0 ? r + amount : r * (1 + amount)));
  g = Math.min(255, Math.max(0, amount > 0 ? g + amount : g * (1 + amount)));
  b = Math.min(255, Math.max(0, amount > 0 ? b + amount : b * (1 + amount)));

  // Convert back to hex
  return (
    "#" +
    Math.round(r).toString(16).padStart(2, "0") +
    Math.round(g).toString(16).padStart(2, "0") +
    Math.round(b).toString(16).padStart(2, "0")
  );
};

export const generateColorScale = (baseColor: string): ColorScale => {
  // Create a more granular color scale with 5 shades in each direction
  return {
    base: baseColor,

    // Light variations - progressively lighter
    light1: adjustColor(baseColor, 30),
    light2: adjustColor(baseColor, 60),
    light3: adjustColor(baseColor, 90),
    light4: adjustColor(baseColor, 120),
    light5: adjustColor(baseColor, 150),

    // Dark variations - progressively darker
    dark1: adjustColor(baseColor, -0.15),
    dark2: adjustColor(baseColor, -0.3),
    dark3: adjustColor(baseColor, -0.45),
    dark4: adjustColor(baseColor, -0.6),
    dark5: adjustColor(baseColor, -0.75),
  };
};

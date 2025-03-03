import { ColorScale } from "../../types/theme";
import isColorLight from "../calculation/isColorLight";
import { useTheme } from "../hooks/useTheme";

// Getting the contrast color for a given color based on lightness of a passed color
export function getContrastColor(color: string): string {
  const { currentTheme } = useTheme();

  const complement = findComplementaryColor(color, currentTheme);
  if (complement) return complement;

  const givenColorIsLight = isColorLight(color);

  if (givenColorIsLight) {
    return (
      currentTheme.primary.dark3 || currentTheme.primary.dark1 || "#000000"
    );
  } else {
    return (
      currentTheme.primary.light3 || currentTheme.primary.light1 || "#FFFFFF"
    );
  }
}

function findComplementaryColor(color: string, theme: any): string | null {
  const colorScales = ["primary", "secondary", "accent", "background"];
  const colorPairs = [
    ["base", "base"],
    ["light1", "dark1"],
    ["light2", "dark2"],
    ["light3", "dark3"],
    ["light4", "dark4"],
    ["light5", "dark5"],
  ] as const;

  for (const scale of colorScales) {
    const colorScale = theme[scale] as ColorScale;

    for (const [lightVariant, darkVariant] of colorPairs) {
      const lightKey = lightVariant as keyof ColorScale;
      const darkKey = darkVariant as keyof ColorScale;

      if (colorScale[lightKey]?.toLowerCase() === color.toLowerCase()) {
        return colorScale[darkKey];
      }
      if (colorScale[darkKey]?.toLowerCase() === color.toLowerCase()) {
        return colorScale[lightKey];
      }
    }
  }

  return null;
}

export function getSimpleContrastColor(color: string): string {
  return isColorLight(color) ? "#000000" : "#FFFFFF";
}

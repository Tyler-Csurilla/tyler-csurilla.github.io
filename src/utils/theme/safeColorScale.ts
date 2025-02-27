import { ColorScale } from "../../types/theme";
import { generateColorScale } from "./generateColorScale";

// Default empty color scale
const emptyColorScale: ColorScale = {
  base: "#cccccc", // Default gray

  // Light variations
  light1: "#d9d9d9",
  light2: "#e6e6e6",
  light3: "#f2f2f2",
  light4: "#f9f9f9",
  light5: "#ffffff",

  // Dark variations
  dark1: "#b3b3b3",
  dark2: "#999999",
  dark3: "#808080",
  dark4: "#666666",
  dark5: "#4d4d4d",
};

/**
 * Safely gets a ColorScale from a theme object, handling potential type mismatches
 * This function always returns a ColorScale object, even if the input is malformed
 * @param obj The theme object
 * @param key The key to access on the theme object
 * @returns A valid ColorScale object
 */
export function safeGetColorScale(obj: any, key: string): ColorScale {
  if (!obj || !obj[key]) {
    return emptyColorScale;
  }

  const value = obj[key];

  // If it's already a ColorScale with base property
  if (
    typeof value === "object" &&
    value !== null &&
    "base" in value &&
    typeof value.base === "string"
  ) {
    // Check if it's using the old format with fewer shades
    if (!("light3" in value) || !("dark3" in value)) {
      // It's the old format, generate a new full scale from the base color
      return generateColorScale(value.base);
    }

    // Ensure all required properties exist
    return {
      base: value.base,
      // Light variations
      light1:
        typeof value.light1 === "string"
          ? value.light1
          : emptyColorScale.light1,
      light2:
        typeof value.light2 === "string"
          ? value.light2
          : emptyColorScale.light2,
      light3:
        typeof value.light3 === "string"
          ? value.light3
          : emptyColorScale.light3,
      light4:
        typeof value.light4 === "string"
          ? value.light4
          : emptyColorScale.light4,
      light5:
        typeof value.light5 === "string"
          ? value.light5
          : emptyColorScale.light5,
      // Dark variations
      dark1:
        typeof value.dark1 === "string" ? value.dark1 : emptyColorScale.dark1,
      dark2:
        typeof value.dark2 === "string" ? value.dark2 : emptyColorScale.dark2,
      dark3:
        typeof value.dark3 === "string" ? value.dark3 : emptyColorScale.dark3,
      dark4:
        typeof value.dark4 === "string" ? value.dark4 : emptyColorScale.dark4,
      dark5:
        typeof value.dark5 === "string" ? value.dark5 : emptyColorScale.dark5,
    };
  }

  if (typeof value === "string") {
    return generateColorScale(value);
  }

  // Default
  return emptyColorScale;
}

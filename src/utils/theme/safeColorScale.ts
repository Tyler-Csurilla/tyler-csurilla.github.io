import { ColorScale } from "../../types/theme";
import { generateColorScale } from "./generateColorScale";

const emptyColorScale: ColorScale = {
  base: "#cccccc", // fallbacks
  light1: "#d9d9d9",
  light2: "#e6e6e6",
  light3: "#f2f2f2",
  light4: "#f9f9f9",
  light5: "#ffffff",
  dark1: "#b3b3b3",
  dark2: "#999999",
  dark3: "#808080",
  dark4: "#666666",
  dark5: "#4d4d4d",
};

/**
 * Safely gets a ColorScale from any object, regenerating if needed.
 * - If the object is missing properties, it regenerates them from base.
 * - If it's just a string (hex), it generates the entire scale from that color.
 * - Always returns a valid ColorScale.
 */
export function safeGetColorScale(obj: any, key: string): ColorScale {
  if (!obj || !obj[key]) {
    return emptyColorScale;
  }

  const value = obj[key];

  // If it's already an object with a .base property
  if (value && typeof value === "object" && typeof value.base === "string") {
    const requiredProps = [
      "light1",
      "light2",
      "light3",
      "light4",
      "light5",
      "dark1",
      "dark2",
      "dark3",
      "dark4",
      "dark5",
    ];
    const missingProps = requiredProps.some(
      (prop) => typeof value[prop] !== "string"
    );
    if (missingProps) {
      return generateColorScale(value.base);
    }
    return {
      base: value.base,
      light1: value.light1,
      light2: value.light2,
      light3: value.light3,
      light4: value.light4,
      light5: value.light5,
      dark1: value.dark1,
      dark2: value.dark2,
      dark3: value.dark3,
      dark4: value.dark4,
      dark5: value.dark5,
    };
  }

  // If it's just a string, treat it as a hex color.
  if (typeof value === "string") {
    return generateColorScale(value);
  }

  return emptyColorScale;
}

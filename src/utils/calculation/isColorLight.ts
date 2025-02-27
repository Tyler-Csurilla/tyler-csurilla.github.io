/**
 * Determines whether a color is light or dark
 * @param hexColor - Hex color code (e.g., "#FFFFFF")
 * @returns True if the color is light, false if it's dark
 */
const isColorLight = (hexColor: string): boolean => {
  // Default to true (light) for empty values
  if (!hexColor) return true;

  // Remove the # if it exists
  const hex = hexColor.replace("#", "");

  // Convert hex to RGB
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Calculate luminance
  // Formula: (0.299*R + 0.587*G + 0.114*B) / 255
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  // If luminance is greater than 0.5, the color is light; otherwise, it's dark
  return luminance > 0.5;
};

export default isColorLight;

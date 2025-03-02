import { ColorScale } from "../../types/theme";

function hexToRgb(hex: string) {
  hex = hex.replace(/^#/, "");
  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((c) => c + c)
      .join("");
  }
  const intVal = parseInt(hex, 16);
  return {
    r: (intVal >> 16) & 255,
    g: (intVal >> 8) & 255,
    b: intVal & 255,
  };
}

// Convert RGB values to HSL.
function rgbToHsl({ r, g, b }: { r: number; g: number; b: number }) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0,
    s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  return { h, s, l };
}

// Convert HSL values back to a hex string.
function hslToHex(h: number, s: number, l: number): string {
  let r: number, g: number, b: number;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  const toHex = (x: number) => {
    const hex = Math.round(x * 255).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/**
 * Generate a color scale with five "light" and five "dark" steps,
 * clamping so we never get pure white (#fff) or pure black (#000).
 */
export function generateColorScale(baseColor: string): ColorScale {
  const { r, g, b } = hexToRgb(baseColor);
  const { h, s, l } = rgbToHsl({ r, g, b });

  // We won't exceed 0.95 (almost white) or go below 0.05 (almost black).
  const maxLight = 0.95;
  const minDark = 0.05;
  const steps = 5;

  const scale: ColorScale = {
    base: baseColor,
    light1: "",
    light2: "",
    light3: "",
    light4: "",
    light5: "",
    dark1: "",
    dark2: "",
    dark3: "",
    dark4: "",
    dark5: "",
  };

  for (let i = 1; i <= steps; i++) {
    const factor = i / steps;
    const newL = l + (maxLight - l) * factor;
    scale[`light${i}` as keyof ColorScale] = hslToHex(
      h,
      s,
      Math.min(Math.max(newL, 0), 1)
    );
  }

  for (let i = 1; i <= steps; i++) {
    const factor = i / steps;
    const newL = l - (l - minDark) * factor;
    scale[`dark${i}` as keyof ColorScale] = hslToHex(
      h,
      s,
      Math.min(Math.max(newL, 0), 1)
    );
  }

  return scale;
}

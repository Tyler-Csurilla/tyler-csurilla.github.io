export default function isColorLight(colorValue: string) {
    if (!colorValue) return null;
    const r = parseInt(colorValue.slice(1, 3), 16);
    const g = parseInt(colorValue.slice(3, 5), 16);
    const b = parseInt(colorValue.slice(5, 7), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 125;
}

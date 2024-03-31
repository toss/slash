/** @tossdocs-ignore */
function parseHexValueStr(str: string) {
  return parseInt(str, 16);
}

export function isValidHexValue(hex: string) {
  const regex = /^#?[0-9A-Fa-f]{6}$/;
  return regex.test(hex);
}

export function isRGBDecimalValue(rgbDecimal: number) {
  return 0 <= rgbDecimal && rgbDecimal <= 255;
}

export function isAlphaValue(alpha: number) {
  return 0 <= alpha && alpha <= 1;
}

export function hexToRgba(hex: string, alpha = 1) {
  if (!isValidHexValue(hex)) {
    throw new Error(`Invalid hex value: ${hex}`);
  }

  if (!isAlphaValue(alpha)) {
    throw new Error(`Invalid alpha value(0~1): ${alpha}`);
  }

  const normalizedHex = hex.startsWith('#') ? hex.slice(1) : hex;

  const r = parseHexValueStr(normalizedHex.slice(0, 2));
  const g = parseHexValueStr(normalizedHex.slice(2, 4));
  const b = parseHexValueStr(normalizedHex.slice(4, 6));

  return `rgba(${r},${g},${b},${alpha})`;
}

/** @tossdocs-ignore */
function parseHexValueStr(str: string) {
  return parseInt(str, 16);
}

export function isRGBDecimalValue(rgbDecimal: number) {
  return 0 <= rgbDecimal && rgbDecimal <= 255;
}

export function isAlphaValue(alpha: number) {
  return 0 <= alpha && alpha <= 1;
}

export function hexToRgba(hex: string, alpha = 1) {
  if (!isAlphaValue(alpha)) {
    throw new Error(`잘못된 알파값 입니다(0~1): ${alpha}`);
  }

  const normalizedHex = hex.startsWith('#') ? hex.slice(1) : hex;

  if (normalizedHex.length !== 6) {
    throw new Error(`잘못된 normalizedHex 값의 길이입니다. 정확히 6자리여야 합니다: ${normalizedHex}`);
  }

  const r = parseHexValueStr(normalizedHex.slice(0, 2));
  const g = parseHexValueStr(normalizedHex.slice(2, 4));
  const b = parseHexValueStr(normalizedHex.slice(4, 6));

  if ([r, g, b].some(value => Number.isNaN(value) || !isRGBDecimalValue(value))) {
    throw new Error(`잘못된 hex 값입니다: ${hex}`);
  }

  return `rgba(${r},${g},${b},${alpha})`;
}

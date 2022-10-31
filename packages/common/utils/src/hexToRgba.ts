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

  hex = hex.length === 7 ? hex.slice(1) : hex;

  const r = parseHexValueStr(hex.slice(0, 2));
  const g = parseHexValueStr(hex.slice(2, 4));
  const b = parseHexValueStr(hex.slice(4, 6));

  if ([r, g, b].some(x => Number.isNaN(x) || !isRGBDecimalValue(x))) {
    throw new Error(`잘못된 hex값 입니다.: ${hex}`);
  }

  return `rgba(${r},${g},${b},${alpha})`;
}

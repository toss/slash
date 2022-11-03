/** @tossdocs-ignore */
import { css, SerializedStyles } from '@emotion/react';
import { coerceCssPixelValue } from './coerceCssPixelValue';
import { CSSPixelValue } from './types';

interface BoxSpacingOptionObject {
  x?: never;
  y?: never;
  top?: never;
  bottom?: never;
  left?: never;
  right?: never;
}

type BoxSpacingOptionObjectCase<Option extends keyof BoxSpacingOptionObject> = {
  [O in Option]?: CSSPixelValue;
} & {
  [P in Exclude<keyof BoxSpacingOptionObject, Option>]?: never;
};

export type BoxSpacingOption =
  | BoxSpacingOptionObjectCase<'x' | 'y'>
  | BoxSpacingOptionObjectCase<'x' | 'top' | 'bottom'>
  | BoxSpacingOptionObjectCase<'y' | 'left' | 'right'>
  | BoxSpacingOptionObjectCase<'top' | 'right' | 'bottom' | 'left'>
  | CSSPixelValue;

export function spacing(cssProperty: string, option: BoxSpacingOption): SerializedStyles {
  if (typeof option === 'number' || typeof option === 'string') {
    return css`
      ${cssProperty}: ${coerceCssPixelValue(option)};
    `;
  }

  const box: {
    top?: CSSPixelValue;
    right?: CSSPixelValue;
    bottom?: CSSPixelValue;
    left?: CSSPixelValue;
  } = {};

  if (option.x !== undefined) {
    box.left = box.right = option.x;
  }
  if (option.y !== undefined) {
    box.top = box.bottom = option.y;
  }
  if (option.top !== undefined) {
    box.top = option.top;
  }
  if (option.right !== undefined) {
    box.right = option.right;
  }
  if (option.bottom !== undefined) {
    box.bottom = option.bottom;
  }
  if (option.left !== undefined) {
    box.left = option.left;
  }

  if (box.top != null && box.right != null && box.bottom != null && box.left != null) {
    return css`
      ${cssProperty}: ${coerceCssPixelValue(box.top)} ${coerceCssPixelValue(box.right)}
        ${coerceCssPixelValue(box.bottom)} ${coerceCssPixelValue(box.left)}
    `;
  }

  const style = Object.entries(box)
    .filter(([, value]) => value != null)
    .map(([dir, value]) => `${cssProperty}-${dir}: ${coerceCssPixelValue(value!)}`)
    .join(';');

  return css(style);
}

type Property = 'x' | 'y' | 'top' | 'right' | 'bottom' | 'left';
type Unit = '4' | '8' | '12' | '16' | '24' | '32';
export interface BoxSpacingPresets {
  readonly x: (value: CSSPixelValue) => SerializedStyles;
  readonly x4: SerializedStyles;
  readonly x8: SerializedStyles;
  readonly x12: SerializedStyles;
  readonly x16: SerializedStyles;
  readonly x24: SerializedStyles;
  readonly x32: SerializedStyles;

  readonly y: (value: CSSPixelValue) => SerializedStyles;
  readonly y4: SerializedStyles;
  readonly y8: SerializedStyles;
  readonly y12: SerializedStyles;
  readonly y16: SerializedStyles;
  readonly y24: SerializedStyles;
  readonly y32: SerializedStyles;

  readonly top: (value: CSSPixelValue) => SerializedStyles;
  readonly top4: SerializedStyles;
  readonly top8: SerializedStyles;
  readonly top12: SerializedStyles;
  readonly top16: SerializedStyles;
  readonly top24: SerializedStyles;
  readonly top32: SerializedStyles;

  readonly right: (value: CSSPixelValue) => SerializedStyles;
  readonly right4: SerializedStyles;
  readonly right8: SerializedStyles;
  readonly right12: SerializedStyles;
  readonly right16: SerializedStyles;
  readonly right24: SerializedStyles;
  readonly right32: SerializedStyles;

  readonly bottom: (value: CSSPixelValue) => SerializedStyles;
  readonly bottom4: SerializedStyles;
  readonly bottom8: SerializedStyles;
  readonly bottom12: SerializedStyles;
  readonly bottom16: SerializedStyles;
  readonly bottom24: SerializedStyles;
  readonly bottom32: SerializedStyles;

  readonly left: (value: CSSPixelValue) => SerializedStyles;
  readonly left4: SerializedStyles;
  readonly left8: SerializedStyles;
  readonly left12: SerializedStyles;
  readonly left16: SerializedStyles;
  readonly left24: SerializedStyles;
  readonly left32: SerializedStyles;
}

export interface BoxSpacing extends BoxSpacingPresets {
  (option: BoxSpacingOption): SerializedStyles;
}

const properties: Property[] = ['x', 'y', 'top', 'right', 'bottom', 'left'];
const units: Unit[] = ['4', '8', '12', '16', '24', '32'];

function createSpacingWithProperty(cssProperty: string) {
  const _spacing = (option: BoxSpacingOption) => spacing(cssProperty, option);

  for (const property of properties) {
    (_spacing as any)[property] = (value: CSSPixelValue) => spacing(cssProperty, { [property]: value });
    for (const unit of units) {
      const key = `${property}${unit}` as keyof BoxSpacingPresets;

      (_spacing as any)[key] = _spacing({
        [property]: Number(unit),
      });
    }
  }

  return _spacing as BoxSpacing;
}

export const padding = createSpacingWithProperty('padding');
export const margin = createSpacingWithProperty('margin');

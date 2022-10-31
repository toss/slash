/** @tossdocs-ignore */
import { css, SerializedStyles } from '@emotion/react';
import { AxisDirection } from './types';

function horizontalGutter(space: number, selector: string) {
  return css`
    & > ${selector} ~ ${selector} {
      margin-left: ${space}px;
    }
  `;
}

function verticalGutter(space: number, selector: string) {
  return css`
    & > ${selector} ~ ${selector} {
      margin-top: ${space}px;
    }
  `;
}

export interface GutterOptions {
  direction: AxisDirection;
  space?: number;
  selector?: string;
}

export function gutter(options: GutterOptions): SerializedStyles;
export function gutter(direction: AxisDirection, space?: number, selector?: string): SerializedStyles;
export function gutter(directionOrGutterOptions: GutterOptions | AxisDirection, space = 24, selector = '*:not(style)') {
  if (typeof directionOrGutterOptions === 'object') {
    const { direction, space = 24, selector = '*:not(style)' } = directionOrGutterOptions;

    if (direction === 'vertical') {
      return verticalGutter(space, selector);
    } else {
      return horizontalGutter(space, selector);
    }
  }

  if (directionOrGutterOptions === 'vertical') {
    return verticalGutter(space, selector);
  } else {
    return horizontalGutter(space, selector);
  }
}

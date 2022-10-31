/** @tossdocs-ignore */
import { css } from '@emotion/react';
import { coerceCssPixelValue } from './coerceCssPixelValue';
import { CSSPixelValue } from './types';

export const mediaQuery = (query: string) => (template: TemplateStringsArray) =>
  css`
    @media ${query} {
      ${template.raw.join('')}
    }
  `;

export const mediaQueryScreenAndMaxWidth = (maxWidth: CSSPixelValue) =>
  mediaQuery(`screen and (max-width: ${coerceCssPixelValue(maxWidth)})`);

export const mediaQueryScreenAndMinWidth = (minWidth: CSSPixelValue) =>
  mediaQuery(`screen and (min-width: ${coerceCssPixelValue(minWidth)})`);

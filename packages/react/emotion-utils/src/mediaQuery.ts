import { css } from '@emotion/react';
import { coerceCssPixelValue } from './coerceCssPixelValue';
import { CSSPixelValue } from './types';

/**
 * Media query를 쉽게 작성할 수 있는 유틸리티 입니다.
 *
 * @example
 * const ResizableBox = styled.button`
 *   width: 300px;
 *
 *   ${mediaQuery('(max-width: 500px)')`
 *     width: 100px;
 *   `}
 * `;
 */
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

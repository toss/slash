import { css } from '@emotion/react';
import { coerceCssPixelValue } from './coerceCssPixelValue';

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

export const mediaQueryScreenAndMaxWidth = (maxWidth: number | string) =>
  mediaQuery(`screen and (max-width: ${coerceCssPixelValue(maxWidth)})`);

export const mediaQueryScreenAndMinWidth = (minWidth: number | string) =>
  mediaQuery(`screen and (min-width: ${coerceCssPixelValue(minWidth)})`);

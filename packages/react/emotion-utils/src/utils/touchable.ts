import { css } from '@emotion/react';

/**
 * @description 터치가 가능하다는 걸 드러내는 스타일입니다.
 *
 * ```ts
 * const touchable: SerializedStyles;
 * ```
 */
export const touchable = css`
  cursor: pointer;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0.1);
`;

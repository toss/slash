import { css } from '@emotion/react';

/**
 * @description 시각적으로 보이지 않게 만드는 스타일링
 *
 * ```ts
 * const visuallyHidden: SerializedStyles;
 * ```
 */
export const visuallyHidden = css`
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  border: 0;
  clip: rect(0, 0, 0, 0);
`;

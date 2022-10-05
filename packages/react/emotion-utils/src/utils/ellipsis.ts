import { css } from '@emotion/react';

/**
 * @name ellipsis
 * @description ellipsis 스타일링을 위한 유틸리티. overflow인 영역에 대해서 ellipsis를 적용합니다.
 * - see: https://developer.mozilla.org/en-US/docs/Web/CSS/text-overflow
 *
 * ```tsx
 * const ellipsis: SerializedStyles;
 * ```
 *
 * @example
 * <p css={css`
 *   ${ellipsis}
 * `}>
 *   이것은 1번째 줄입니다. 헬로우월드
 * </p>
 *
 * // =>
 * // 이것은 1번...
 */
export const ellipsis = css`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

/**
 * @name multiLineEllipsis
 * @description multiline ellipsis 스타일링을 위한 유틸리티
 *
 * ```ts
 * const multiLineEllipsis: (
 *   // 몇번째 line에 ellipsis를 적용할지
 *   line: number,
 *   // default: 1.6
 *   lineHeight?: number
 * ) => SerializedStyles;
 * ```
 *
 * @example
 * <p css=css`
 *   ${multiLineEllipsis(3)}
 * `>
 *   이것은 1번째 줄입니다 <br>
 *   이것은 2번째 줄입니다 <br>
 *   이것은 3번째 줄입니다 <br>
 *   이것은 4번째 줄입니다 <br>
 *   이것은 5번째 줄입니다 <br>
 *   이것은 6번째 줄입니다 <br>
 * </p>
 * // =>
 * // 이것은 1번째 줄입니다
 * // 이것은 2번째 줄입니다
 * // 이것은 3번째 줄입니다...
 */
export const multiLineEllipsis = (line: number, lineHeight = 1.6) => css`
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: ${line};
  -webkit-box-orient: vertical;
  height: ${lineHeight * line}em;
`;

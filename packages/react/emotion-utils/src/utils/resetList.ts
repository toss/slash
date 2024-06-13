import { css } from '@emotion/react';

/**
 * @name resetList
 * @description list(`<ol>`, `<ul>`)의 기본 스타일을 제거하는 유틸리티입니다.
 *
 * ```ts
 * const resetList: SerializedStyles;
 * ```
 */
export const resetList = css`
  margin: 0;
  margin-block-start: 0;
  margin-block-end: 0;
  padding-inline-start: 0;
  padding-left: 0;
  list-style: none;
`;

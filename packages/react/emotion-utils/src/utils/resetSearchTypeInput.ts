import { css } from '@emotion/react';

/**
 * @description input[type=search]에 적용되는 기본 X 버튼의 스타일을 제거해줍니다.
 *
 * ```ts
 * const resetSearchTypeInput: SerializedStyles;
 * ```
 */
export const resetSearchTypeInput = css`
  input::-ms-clear,
  input::-ms-reveal {
    display: none;
    width: 0;
    height: 0;
  }
  input::-webkit-search-decoration,
  input::-webkit-search-cancel-button,
  input::-webkit-search-results-button,
  input::-webkit-search-results-decoration {
    display: none;
  }
`;

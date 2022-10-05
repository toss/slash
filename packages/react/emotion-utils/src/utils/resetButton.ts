import { css } from '@emotion/react';

/**
 * @name resetButton
 * @description `<button>`의 기본 스타일을 제거하는 유틸리티입니다.
 *
 * ```ts
 * const resetButton: SerializedStyles;
 * ```
 */
export const resetButton = css`
  background: none;
  border: 0;
  padding: 0;
  outline: none;
  cursor: pointer;
`;

/**
 * @name buttonReset
 * @description button의 기본 스타일을 제거하는 유틸리티입니다. resetButton에 비해 더 많은 기본 스타일을 제거합니다.
 *
 * ```ts
 * const buttonReset: SerializedStyles;
 * ```
 */
export const buttonReset = css`
  white-space: nowrap;
  user-select: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  overflow: hidden;

  margin: 0;
  padding: 0;

  outline: 0;
  border: 0 solid transparent;
  background: transparent;
  cursor: pointer;

  font-family: inherit;
  font-weight: 600;
  -webkit-font-smoothing: antialiased;

  &:hover,
  &:focus {
    text-decoration: none;
  }

  &:focus {
    outline: none;
  }
`;

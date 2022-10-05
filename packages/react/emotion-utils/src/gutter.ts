import { SerializedStyles, css } from '@emotion/react';

export type Direction = 'horizontal' | 'vertical';

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
  direction: Direction;
  space?: number;
  selector?: string;
}

/**
 * @description Child Element 사이에 space를 부여합니다.
 *
 * ```ts
 * function gutter(options: {
 *   direction: Direction;
 *   space?: number;
 *   selector?: string;
 * }): SerializedStyles;
 * function gutter(direction: Direction, space?: number, selector?: string): SerializedStyles;
 * ```
 *
 * @example
 * const ButtonContainer = styled.div`
 *   padding: 16px 24px;
 *   ${gutter('horizontal', 8)}
 * `;
 *
 * <Flex.Center
 *   css={css`
 *     padding: 0px 20px;
 *     ${gutter({
 *       direction: 'horizontal',
 *       space: 20,
 *     })}
 *   `}
 * >
 *   <Foo />
 * </Flex.Center>
 */
export function gutter(options: GutterOptions): SerializedStyles;
export function gutter(direction: Direction, space?: number, selector?: string): SerializedStyles;
export function gutter(directionOrGutterOptions: GutterOptions | Direction, space = 24, selector = '*:not(style)') {
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

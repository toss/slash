import { css, SerializedStyles } from '@emotion/react';

import { CSSPixelValue } from '../types';

import type { Property } from 'csstype';
interface Coordinates {
  top?: CSSPixelValue;
  right?: CSSPixelValue;
  bottom?: CSSPixelValue;
  left?: CSSPixelValue;
}

/**
 * @name position
 * @description
 * CSS `position`과 `position`에 연관된 프로퍼티(`top`, `right`, `bottom`, `left`)를 쉽게 선언할 수 있도록 하는 shorthand 유틸리티입니다.
 *
 * ```ts
 * type CSSPixelValue = string | number;
 *
 * function position(
 *   position: 'absolute' | 'fixed' | 'relative' | 'static' | 'sticky',
 *   top: CSSPixelValue,
 *   right: CSSPixelValue,
 *   bottom: CSSPixelValue,
 *   left: CSSPixelValue
 * ): SerializedStyles;
 *
 * function position(
 *   top: CSSPixelValue,
 *   right: CSSPixelValue,
 *   bottom: CSSPixelValue,
 *   left: CSSPixelValue
 * ): SerializedStyles;
 * ```
 *
 * @example
 * import { position } from '@toss/emotion-utils';
 *
 * const fullPageLayer = position('fixed', 0, 0, 0, 0);
 * // 위 코드는 아래 코드와 동치입니다.
 * const fullPageLayer = css`
 *   position: fixed;
 *   top: 0;
 *   right: 0;
 *   bottom: 0;
 *   left: 0;
 * `;
 *
 * // 첫번째 인자를 생략하고 `top` 부터 넘길 수 있습니다.
 * const allZero = position(0, 0, 0, 0);
 *
 * // 다음처럼도 사용 가능합니다
 * position('absolute', {top: 0, left: 0});
 *
 * // 다음처럼도 사용 가능합니다(absolute, fixed, sticky)
 * position.absolute(0, 0, 0, ,0);
 * position.absolute({top: 0, left: 0});
 */
export function position(
  position: Property.Position,
  top: CSSPixelValue,
  right: CSSPixelValue,
  bottom: CSSPixelValue,
  left: CSSPixelValue
): SerializedStyles;
export function position(
  top: CSSPixelValue,
  right: CSSPixelValue,
  bottom: CSSPixelValue,
  left: CSSPixelValue
): SerializedStyles;
export function position(position: Property.Position, coordinates?: Coordinates): SerializedStyles;

export function position(
  positionOrTop: Property.Position | CSSPixelValue,
  topOrRightOrCoordinates: CSSPixelValue | Coordinates = {},
  ...values: CSSPixelValue[]
) {
  const [top, right, bottom, left] = (() => {
    // position(top, right, bottom, left);
    if (!isPositionValue(positionOrTop)) {
      return [positionOrTop, topOrRightOrCoordinates as CSSPixelValue, ...values];
    }
    // position(position, coordinates);
    if (!isCSSPixelValue(topOrRightOrCoordinates)) {
      return [
        topOrRightOrCoordinates.top,
        topOrRightOrCoordinates.right,
        topOrRightOrCoordinates.bottom,
        topOrRightOrCoordinates.left,
      ];
    }
    // position(position, top, right, bottom, left);
    return [topOrRightOrCoordinates, ...values];
  })();

  return css([
    css({ position: isPositionValue(positionOrTop) ? positionOrTop : undefined }),
    css({ top, right, bottom, left }),
  ]);
}

function isPositionValue(value: unknown): value is Property.Position {
  return ['static', 'relative', 'absolute', 'fixed', 'sticky', '-webkit-sticky'].includes(value as any);
}

function isCSSPixelValue(value: unknown): value is CSSPixelValue {
  return typeof value === 'string' || typeof value === 'number';
}

position.absolute = absolute;
position.fixed = fixed;
position.sticky = sticky;

function absolute(coordinates: Coordinates): SerializedStyles;
function absolute(
  top: CSSPixelValue,
  right: CSSPixelValue,
  bottom: CSSPixelValue,
  left: CSSPixelValue
): SerializedStyles;
function absolute(topOrCoordinates: Coordinates | CSSPixelValue, ...values: CSSPixelValue[]) {
  // position(position, coordinates);
  if (!isCSSPixelValue(topOrCoordinates)) {
    return position('absolute', topOrCoordinates);
  }
  // position(position, top, right, bottom, left);
  return position('absolute', topOrCoordinates, values[0], values[1], values[2]);
}

function fixed(coordinates: Coordinates): SerializedStyles;
function fixed(top: CSSPixelValue, right: CSSPixelValue, bottom: CSSPixelValue, left: CSSPixelValue): SerializedStyles;
function fixed(topOrCoordinates: Coordinates | CSSPixelValue, ...values: CSSPixelValue[]) {
  // position(position, coordinates);
  if (!isCSSPixelValue(topOrCoordinates)) {
    return position('fixed', topOrCoordinates);
  }
  // position(position, top, right, bottom, left);
  return position('fixed', topOrCoordinates, values[0], values[1], values[2]);
}

function sticky(coordinates: Coordinates): SerializedStyles;
function sticky(top: CSSPixelValue, right: CSSPixelValue, bottom: CSSPixelValue, left: CSSPixelValue): SerializedStyles;
function sticky(topOrCoordinates: Coordinates | CSSPixelValue, ...values: CSSPixelValue[]) {
  // position(position, coordinates);
  if (!isCSSPixelValue(topOrCoordinates)) {
    return position('sticky', topOrCoordinates);
  }
  // position(position, top, right, bottom, left);
  return position('sticky', topOrCoordinates, values[0], values[1], values[2]);
}

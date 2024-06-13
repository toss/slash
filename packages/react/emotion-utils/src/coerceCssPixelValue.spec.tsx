/** @jsxImportSource @emotion/react */

import { coerceCssPixelValue } from './coerceCssPixelValue';

describe('coerceCssPixelValue', () => {
  it('should return the value when receive a string value', () => {
    const STRING_VALUE1 = '100%';
    const STRING_VALUE2 = '4px';
    expect(coerceCssPixelValue(STRING_VALUE1)).toStrictEqual(STRING_VALUE1);
    expect(coerceCssPixelValue(STRING_VALUE2)).toStrictEqual(STRING_VALUE2);
    expect(coerceCssPixelValue(STRING_VALUE1)).not.toStrictEqual(STRING_VALUE2);
  });

  it('should return the value with "px" suffix when receive a number value', () => {
    const NUMBER_VALUE1 = 10;
    const NUMBER_VALUE2 = 300;

    expect(coerceCssPixelValue(NUMBER_VALUE1)).toStrictEqual(`${NUMBER_VALUE1}px`);
    expect(coerceCssPixelValue(NUMBER_VALUE2)).toStrictEqual(`${NUMBER_VALUE2}px`);
    expect(coerceCssPixelValue(NUMBER_VALUE1)).not.toStrictEqual(`${NUMBER_VALUE2}px`);
  });
});

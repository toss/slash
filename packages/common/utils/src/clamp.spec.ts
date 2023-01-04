import { clamp } from './clamp';

describe('clamp', () => {
  it('should work well when only given min value', () => {
    expect(clamp(3, 5)).toBe(5);
    expect(clamp(10, 6)).toBe(10);
    expect(clamp(6, 10)).toBe(10);
  });

  it('should work well when both value was given', () => {
    expect(clamp(3, 5, 10)).toBe(5);
    expect(clamp(10, 6, 10)).toBe(10);
    expect(clamp(6, 10, 10)).toBe(10);
    expect(clamp(7, 5, 10)).toBe(7);
    expect(clamp(100, 5, 6)).toBe(6);
  });

  it('should throw error when bound1 is bigger than bound2', () => {
    expect(() => clamp(3, 10, 5)).toThrowErrorMatchingInlineSnapshot(
      `"The value of bound2 must be a number greater than bound1."`
    );
    expect(() => clamp(7, 12, 5)).toThrowErrorMatchingInlineSnapshot(
      `"The value of bound2 must be a number greater than bound1."`
    );
    expect(() => clamp(100, 6, 5)).toThrowErrorMatchingInlineSnapshot(
      `"The value of bound2 must be a number greater than bound1."`
    );
  });
});

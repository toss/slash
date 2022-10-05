import { clamp } from './clamp';

describe('clamp는', () => {
  it('max 만 있을 때 잘 동작한다', () => {
    expect(clamp(3, 5)).toBe(3);
    expect(clamp(10, 6)).toBe(6);
    expect(clamp(6, 10)).toBe(6);
  });

  it('min, max 모두 있을 때 잘 동작한다', () => {
    expect(clamp(3, 5, 10)).toBe(5);
    expect(clamp(10, 6, 10)).toBe(10);
    expect(clamp(6, 10, 10)).toBe(10);
    expect(clamp(7, 5, 10)).toBe(7);
    expect(clamp(100, 5, 6)).toBe(6);
  });
});

import { getViewportSize } from './getViewportSize';

const setViewportSize = (width: number, height: number) => {
  Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: width });
  Object.defineProperty(window, 'innerHeight', { writable: true, configurable: true, value: height });
};

describe('getViewportSize', () => {
  it("Jest's viewport default settings should return width 1024 and height 768", () => {
    const { width, height } = getViewportSize();

    expect(window.innerWidth).toBe(1024);
    expect(window.innerHeight).toBe(768);

    expect(width).toBe(1024);
    expect(height).toBe(768);
  });

  it('should return width 500 and height 300', () => {
    setViewportSize(500, 300);

    const { width, height } = getViewportSize();

    expect(window.innerWidth).toBe(500);
    expect(window.innerHeight).toBe(300);

    expect(width).toBe(500);
    expect(height).toBe(300);
  });
});

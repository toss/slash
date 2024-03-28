import { getViewportSize } from '.';

describe('getViewportSize', () => {
  it('should return viewport size', () => {
    global.innerWidth = 1024;
    global.innerHeight = 768;
    const expectedSize = { width: 1024, height: 768 };
    const size = getViewportSize();

    expect(size).toEqual(expectedSize);
  });

  it('should return zero size when running on server', () => {
    delete (global as { window: unknown }).window;

    const expectedSize = { width: 0, height: 0 };
    const size = getViewportSize();

    expect(size).toEqual(expectedSize);
  });
});

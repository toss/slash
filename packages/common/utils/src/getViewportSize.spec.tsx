import { getViewportSize } from './getViewportSize';

const setViewportSize = (width: number, height: number) => {
  Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: width });
  Object.defineProperty(window, 'innerHeight', { writable: true, configurable: true, value: height });
};

const deleteWindow = () => {
  Object.defineProperty(global, 'window', {
    value: undefined,
  });
};

const initViewportSize = () => {
  // jest sets innerWidth 1024 and innerHeight 768 as the default values for the jsdom to be tested.
  // https://github.com/jsdom/jsdom/blob/0cba358253fd5530af0685ac48c2535992464d06/lib/jsdom/browser/Window.js#L587-L588
  setViewportSize(1024, 768);
};

beforeEach(() => {
  initViewportSize();
});

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

  it('should return width 0 and height 0 if window is undefined', () => {
    deleteWindow();

    const { width, height } = getViewportSize();

    expect(window).toBeUndefined();

    expect(width).toBe(0);
    expect(height).toBe(0);
  });
});

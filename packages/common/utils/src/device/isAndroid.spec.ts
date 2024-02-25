import { isAndroid } from './isAndroid';

describe('isAndroid', () => {
  it('should return false if on server', () => {
    jest.mock('./isServer', () => ({
      isServer: true,
    }));

    expect(isAndroid).toBe(false);
  });

  it('should return true for Android user agent', () => {
    jest.mock('./isServer', () => ({
      isServer: false,
    }));
    Object.defineProperty(window.navigator, 'userAgent', { value: 'Android', writable: true });

    expect(isAndroid).toBe(true);
  });

  it('should return false for non-Android user agent', () => {
    jest.mock('./isServer', () => ({
      isServer: false,
    }));
    Object.defineProperty(window.navigator, 'userAgent', { value: 'iPhone', writable: true });

    expect(isAndroid).toBe(false);
  });
});

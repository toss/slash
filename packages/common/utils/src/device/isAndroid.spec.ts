import { isAndroid } from './isAndroid';
import * as serverCheckModule from './isServer';

describe('isAndroid', () => {
  it('should return false if on server', () => {
    jest.spyOn(serverCheckModule, 'isServer').mockReturnValue(true);

    expect(isAndroid).toBe(false);
  });

  it('should return true for Android user agent', () => {
    jest.spyOn(serverCheckModule, 'isServer').mockReturnValue(false);
    Object.defineProperty(window.navigator, 'userAgent', { value: 'Android', writable: true });

    expect(isAndroid).toBe(true);
  });

  it('should return false for non-Android user agent', () => {
    jest.spyOn(serverCheckModule, 'isServer').mockReturnValue(false);
    Object.defineProperty(window.navigator, 'userAgent', { value: 'iPhone', writable: true });

    expect(isAndroid).toBe(false);
  });
});

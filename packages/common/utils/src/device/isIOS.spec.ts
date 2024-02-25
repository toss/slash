import { isIOS } from './isIOS';
import * as serverCheckModule from './isServer';

describe('isIOS', () => {
  it('should return false if on server', () => {
    jest.mock('./isServer', () => ({
      isServer: () => true,
    }));

    expect(isIOS).toBe(false);
  });

  it('should return true for iOS user agent', () => {
    jest.spyOn(serverCheckModule, 'isServer').mockReturnValue(false);
    Object.defineProperty(window.navigator, 'userAgent', { value: 'iPhone', writable: true });

    expect(isIOS).toBe(true);
  });

  it('should return false for non-iOS user agent', () => {
    jest.mock('./isServer', () => ({
      isServer: () => false,
    }));
    Object.defineProperty(window.navigator, 'userAgent', { value: 'Android', writable: true });

    expect(isIOS).toBe(false);
  });
});

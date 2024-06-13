import * as DeviceModule from './device/isServer';
import { getScrollPercent } from './getScrollPercent';
import * as ScrollYOffset from './getScrollYOffset';

describe('getScrollPercent', () => {
  it('should return 0 when in a server environment', () => {
    jest.spyOn(DeviceModule, 'isServer').mockReturnValue(true);

    const scrollDiff = getScrollPercent();
    expect(scrollDiff).toBe(0);
  });

  it('should use document.body.scrollHeight when document.documentElement.scrollHeight is not being used', () => {
    jest.spyOn(DeviceModule, 'isServer').mockReturnValue(false);
    jest.spyOn(ScrollYOffset, 'getScrollYOffset').mockReturnValue(100);

    Object.defineProperty(document.body, 'scrollHeight', { get: () => 1000 });
    Object.defineProperty(document.documentElement, 'clientHeight', { value: 500 });
    Object.defineProperty(window, 'scrollY', { value: 100 });

    const expected = (100 / (1000 - 500)) * 100;
    const percent = getScrollPercent();

    expect(percent).toBe(expected);
  });

  it('should use document.documentElement.scrollHeight when document.body.scrollHeight is not being used', () => {
    jest.spyOn(DeviceModule, 'isServer').mockReturnValue(false);
    jest.spyOn(ScrollYOffset, 'getScrollYOffset').mockReturnValue(100);

    Object.defineProperty(document.documentElement, 'scrollHeight', { get: () => 1000 });
    Object.defineProperty(document.documentElement, 'clientHeight', { value: 500 });

    const expected = (100 / (1000 - 500)) * 100;
    const percent = getScrollPercent();

    expect(percent).toBe(expected);
  });
});

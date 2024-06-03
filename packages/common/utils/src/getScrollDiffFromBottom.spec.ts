import * as DeviceModule from './device/isServer';
import { getScrollDiffFromBottom } from './getScrollDiffFromBottom';
import * as ScrollYOffset from './getScrollYOffset';

describe('getScrollDiffFromBottom', () => {
  it('should return 0 when in a server environment', () => {
    jest.spyOn(DeviceModule, 'isServer').mockReturnValue(true);

    const scrollDiff = getScrollDiffFromBottom();
    expect(scrollDiff).toBe(0);
  });

  it('should use document.body.scrollHeight when document.documentElement.scrollHeight is not being used', () => {
    jest.spyOn(DeviceModule, 'isServer').mockReturnValue(false);

    Object.defineProperty(document.body, 'scrollHeight', { get: () => 1000 });
    Object.defineProperty(document.documentElement, 'clientHeight', { value: 500 });
    Object.defineProperty(window, 'scrollY', { value: 100 });

    const expected = 1000 - (100 + 500);
    const scrollDiff = getScrollDiffFromBottom();

    expect(scrollDiff).toBe(expected);
  });

  it('should use document.documentElement.scrollHeight when document.body.scrollHeight is not being used', () => {
    jest.spyOn(DeviceModule, 'isServer').mockReturnValue(false);
    jest.spyOn(ScrollYOffset, 'getScrollYOffset').mockReturnValue(100);

    Object.defineProperty(document.documentElement, 'scrollHeight', { get: () => 1000 });
    Object.defineProperty(document.documentElement, 'clientHeight', { value: 500 });

    const expected = 1000 - (100 + 500);
    const scrollDiff = getScrollDiffFromBottom();

    expect(scrollDiff).toBe(expected);
  });
});

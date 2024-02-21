import * as deviceModule from './device/isServer';
import { getViewportSize } from './getViewportSize';

describe('getViewportSize', () => {
  it('returns width and height as 0 in server environments.', () => {
    jest.spyOn(deviceModule, 'isServer').mockReturnValue(true);

    const size = getViewportSize();
    expect(size).toEqual({ width: 0, height: 0 });
    jest.spyOn(deviceModule, 'isServer').mockRestore();
  });

  it('returns window.innerWidth and window.innerHeight in client environments.', () => {
    jest.spyOn(deviceModule, 'isServer').mockReturnValue(false);

    Object.defineProperty(window, 'innerWidth', { value: 300 });
    Object.defineProperty(window, 'innerHeight', { value: 500 });

    const size = getViewportSize();
    expect(size).toEqual({ width: 300, height: 500 });
    jest.spyOn(deviceModule, 'isServer').mockRestore();
  });
});

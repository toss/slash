import { isMacOS } from './isMacOS';
import * as serverCheckModule from './isServer';

describe('isMacOS', () => {
  it('should return false in a server environment', () => {
    jest.spyOn(serverCheckModule, 'isServer').mockReturnValue(true);

    expect(isMacOS()).toBe(false);
  });

  it('should return false when not on MacOS in a client environment', () => {
    jest.spyOn(serverCheckModule, 'isServer').mockReturnValue(false);

    Object.defineProperty(navigator, 'platform', {
      value: 'Win32',
      writable: true,
    });

    expect(isMacOS()).toBe(false);
  });

  it('should return true when on MacOS in a client environment', () => {
    jest.spyOn(serverCheckModule, 'isServer').mockReturnValue(false);

    Object.defineProperty(navigator, 'platform', {
      value: 'MacIntel',
      writable: true,
    });

    expect(isMacOS()).toBe(true);
  });
});

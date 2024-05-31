import { isClient } from './isClient';
import * as serverCheckModule from './isServer';

describe('isClient', () => {
  it('should return false when in a server environment', () => {
    jest.spyOn(serverCheckModule, 'isServer').mockReturnValue(true);

    expect(isClient()).toBe(false);
  });

  it('should return true when not in a server environment', () => {
    jest.spyOn(serverCheckModule, 'isServer').mockReturnValue(false);

    expect(isClient()).toBe(true);
  });
});

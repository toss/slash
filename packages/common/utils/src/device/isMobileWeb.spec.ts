import * as osCheckModule from './getOSByUserAgent';
import { isMobileWeb } from './isMobileWeb';

describe('isMobileWeb', () => {
  it('should return true for iOS user agents', () => {
    jest.spyOn(osCheckModule, 'getOSByUserAgent').mockReturnValue('ios');

    expect(isMobileWeb()).toBe(true);
  });

  it('should return true for Android user agents', () => {
    jest.spyOn(osCheckModule, 'getOSByUserAgent').mockReturnValue('android');

    expect(isMobileWeb()).toBe(true);
  });

  it('should return false for non-mobile user agents', () => {
    jest.spyOn(osCheckModule, 'getOSByUserAgent').mockReturnValue('web');

    expect(isMobileWeb()).toBe(false);
  });
});

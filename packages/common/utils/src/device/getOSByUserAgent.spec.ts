import { getOSByUserAgent } from './getOSByUserAgent';
import * as isAndroidModule from './isAndroid';
import * as isIOSModule from './isIOS';
import * as isServerModule from './isServer';

describe('getOSByUserAgent', () => {
  beforeEach(() => {
    jest.spyOn(isServerModule, 'isServer').mockReturnValue(false);
    jest.spyOn(isIOSModule, 'isIOS').mockReturnValue(false);
    jest.spyOn(isAndroidModule, 'isAndroid').mockReturnValue(false);
  });

  it('should return false in a server environment', () => {
    jest.spyOn(isServerModule, 'isServer').mockReturnValue(true);

    expect(getOSByUserAgent()).toBe(false);
  });

  it('should return "ios" for iOS user agents', () => {
    jest.spyOn(isIOSModule, 'isIOS').mockReturnValue(true);

    expect(getOSByUserAgent()).toBe('ios');
  });

  it('should return "android" for Android user agents', () => {
    jest.spyOn(isAndroidModule, 'isAndroid').mockReturnValue(true);

    expect(getOSByUserAgent()).toBe('android');
  });

  it('should return "web" for non-mobile and non-server environments', () => {
    expect(getOSByUserAgent()).toBe('web');
  });
});

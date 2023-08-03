import { renderHook } from '@testing-library/react';
import { useDeviceInfo } from './useDeviceInfo';
describe('`useDeviceInfo`', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    Object.defineProperty(window.navigator, 'userAgent', {
      value: 'mozilla/5.0 (iphone; cpu iphone os 15_0_1 like mac os x) applewebkit/605.1.15 (khtml, like gecko) version/15.0 mobile/15e148 safari/604.1',
    });
  });
  it('should return isMobile true when IOS', () => {
    const { result } = renderHook(() => useDeviceInfo());
    expect(result.current.isMobile).toBe(true);
    expect(result.current.isIOS).toBe(true);
    expect(result.current.isAOS).toBe(false);
  });

  beforeEach(() => {
    jest.clearAllMocks();
    Object.defineProperty(window.navigator, 'userAgent', {
      value: 'mozilla/5.0 (linux; android 11; sm-a908n) applewebkit/537.36 (khtml, like gecko) chrome/94.0.4606.71 mobile safari/537.36',
    });
  });
  it('should return isMobile true when AOS', () => {
    const { result } = renderHook(() => useDeviceInfo());
    expect(result.current.isMobile).toBe(true);
    expect(result.current.isAOS).toBe(true);
    expect(result.current.isIOS).toBe(false);
  });

  beforeEach(() => {
    jest.clearAllMocks();
    Object.defineProperty(window.navigator, 'userAgent', {
      value: 'mozilla/5.0 (macintosh; intel mac os x 10_15_7) applewebkit/537.36 (khtml, like gecko) chrome/94.0.4606.61 safari/537.36',
    });
  });
  it('should return isMobile false when PC', () => {
    const { result } = renderHook(() => useDeviceInfo());
    expect(result.current.isMobile).toBe(false);
    expect(result.current.isAOS).toBe(false);
    expect(result.current.isIOS).toBe(false);
  });
});

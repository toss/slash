/** @tossdocs-ignore */
import { getOSByUserAgent } from './getOSByUserAgent';

export function isMobileWeb() {
  const userAgent = getOSByUserAgent();

  if (userAgent === 'ios' || userAgent === 'android') {
    return true;
  }
  return false;
}

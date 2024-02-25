/** @tossdocs-ignore */
import { isServer } from './isServer';

export function isClient() {
  return !isServer;
}

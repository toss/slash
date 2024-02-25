/** @tossdocs-ignore */
import { isServer } from './isServer';

export const isClient = !isServer;

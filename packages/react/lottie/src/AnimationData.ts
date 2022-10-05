/** @tossdocs-ignore */
import { Asset } from './Asset';

interface JSONAnimationData {
  json: string;
  assets?: Asset[];
}

interface URLAnimationData {
  url: string;
  assets?: Asset[];
  version?: string | number;
}

export type AnimationData = JSONAnimationData | URLAnimationData;

export const SPEED_DEFAULT = 1;

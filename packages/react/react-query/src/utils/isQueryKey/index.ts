/** @tossdocs-ignore */
import { QueryKey } from 'react-query';

export function isQueryKey(value: any): value is QueryKey {
  return typeof value === 'string' || Array.isArray(value);
}

/** @tossdocs-ignore */
import { useNextRouter } from './useNextRouter';

interface Options<T> {
  parser?: (val: string) => T;
  suspense?: boolean;
}

export function useQueryParam(name: string): string | undefined;
export function useQueryParam<T = string>(name: string, options: Options<T>): T | undefined;
export function useQueryParam<T = string>(name: string, options?: Options<T>) {
  const router = useNextRouter({ suspense: options?.suspense });

  const value = router.query[name];

  if (Array.isArray(value)) {
    throw new Error(`QueryParam of ${name} is Array, can't be returned by useQueryParam`);
  }

  if (value == null || options?.parser == null) {
    return value;
  } else {
    return options.parser(value);
  }
}

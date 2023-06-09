/** @tossdocs-ignore */
import { NextRouter } from 'next/router';
import { useNextRouter } from './useNextRouter';

interface Options<TParsed> {
  parser?: (value: Exclude<NextRouter['query'][string], unknown[]>) => TParsed;
  suspense?: boolean;
}

export function useQueryParam(name: string): Exclude<NextRouter['query'][string], unknown[]>;
export function useQueryParam<TParsed>(name: string, options: Options<TParsed>): TParsed;
export function useQueryParam<TParsed>(name: string, options?: Options<TParsed>) {
  const router = useNextRouter({ suspense: options?.suspense });
  const value = router.query[name];

  return value == null || options?.parser == null
    ? Array.isArray(value)
      ? value[0]
      : value
    : options.parser(Array.isArray(value) ? value[0] : value);
}

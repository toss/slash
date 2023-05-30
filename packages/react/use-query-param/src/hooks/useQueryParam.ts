/** @tossdocs-ignore */
import { NextRouter } from 'next/router';
import { useNextRouter } from './useNextRouter';

interface Options<TParsed> {
  parser?: (value: NextRouter['query'][string]) => TParsed;
  suspense?: boolean;
}

export function useQueryParam(name: string): NextRouter['query'][string];
export function useQueryParam<TParsed>(name: string, options: Options<TParsed>): TParsed;
export function useQueryParam<TParsed>(name: string, options?: Options<TParsed>) {
  const router = useNextRouter({ suspense: options?.suspense });

  const value = router.query[name];

  if (value == null || options?.parser == null) {
    return value;
  } else {
    return options.parser(value);
  }
}

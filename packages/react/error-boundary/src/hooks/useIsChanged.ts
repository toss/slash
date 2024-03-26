/** @tossdocs-ignore */
import { usePrevious } from '@toss/react';

export const useIsChanged = (value: unknown) => usePrevious(value) !== value;

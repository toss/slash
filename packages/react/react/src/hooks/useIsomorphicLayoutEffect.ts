import { isClient } from '@toss/utils';
import { useEffect, useLayoutEffect } from 'react';

/** @tossdocs-ignore */
export const useIsomorphicLayoutEffect = isClient() ? useLayoutEffect : useEffect;

import { noop } from '@toss/utils';
import { DependencyList, useCallback, useRef } from 'react';
import { usePreservedCallback } from './usePreservedCallback';

export type EffectRef<E extends HTMLElement = HTMLElement> = (element: E | null) => void;

export type CleanupCallback = () => void;
export type RefCallback<E extends HTMLElement = HTMLElement> = (element: E) => CleanupCallback | void;

/** @tossdocs-ignore */
export function useRefEffect<E extends HTMLElement = HTMLElement>(
  callback: RefCallback<E>,
  deps: DependencyList
): EffectRef<E> {
  const preservedCallback = usePreservedCallback(callback);
  const disposeRef = useRef<CleanupCallback>(noop);

  const effect = useCallback(
    (element: E | null) => {
      disposeRef.current();
      disposeRef.current = noop;

      if (element != null) {
        const cleanup = callback(element);

        if (typeof cleanup === 'function') {
          disposeRef.current = cleanup;
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [preservedCallback, ...deps]
  );

  return effect;
}

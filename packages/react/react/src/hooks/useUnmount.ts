import { useEffect } from 'react';
import { usePreservedCallback } from './usePreservedCallback';

/** @tossdocs-ignore */
export function useUnmount(callback: () => any){
  const preservedCallback = usePreservedCallback(callback);

  useEffect(() => () => preservedCallback(), [preservedCallback]);
};

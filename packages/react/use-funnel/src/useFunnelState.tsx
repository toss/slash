/** @tossdocs-ignore */
import { safeSessionStorage } from '@tossteam/utils';
import { useRouter } from 'next/router';
import { SetStateAction, useCallback, useRef, useState } from 'react';
import { useQuery } from 'react-query';

type FunnelStateId = `use-funnel-state__${string}`;

interface FunnelStorage<T> {
  get: () => Promise<Partial<T> | null>;
  set: (value: Partial<T>) => Promise<void>;
  clear: () => Promise<void>;
}

export function createFunnelStateId(id: string): FunnelStateId {
  return `use-funnel-state__${id}`;
}

/**
 * NOTE: 이후 Secure Storage 등 다른 스토리지를 사용하도록 스펙이 변경될 수 있으므로, Asynchronous 함수로 만듭니다.
 *
 * @param funnelStateId
 * @param storage
 * @returns
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function createFunnelStorage<T>(funnelStateId: FunnelStateId, storageType = 'sessionStorage'): FunnelStorage<T> {
  switch (storageType) {
    case 'sessionStorage':
      return {
        get: async () => {
          const d = safeSessionStorage.get(funnelStateId);
          if (d == null) {
            return null;
          }
          return JSON.parse(d) as Partial<T>;
        },
        set: async (value: Partial<T>) => {
          safeSessionStorage.set(funnelStateId, JSON.stringify(value));
        },
        clear: async () => {
          safeSessionStorage.remove(funnelStateId);
        },
      };
    default:
      throw new Error('정확한 스토리지 타입을 명시해주세요.');
  }
}

/**
 * @deprecated useFunnel().withState()를 사용해주세요. useFunnel + useFunnelState 를 사용하면 상태가 갱신되기 전에 funnel step이 변경되는 문제가 있습니다.
 */
export function useFunnelState<T extends Record<string, any>>(
  defaultValue: Partial<T>,
  options?: { storage?: FunnelStorage<T> }
) {
  const { pathname, basePath } = useRouter();

  const storage = options?.storage ?? createFunnelStorage<T>(createFunnelStateId(`${basePath}${pathname}`));
  const persistentStorage = useRef(storage).current;

  const initialState = useQuery({
    queryFn: () => {
      return persistentStorage.get();
    },
    suspense: true,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  }).data;

  const [_state, _setState] = useState<Partial<T>>(initialState ?? defaultValue);

  const setState = useCallback(
    (state: SetStateAction<Partial<T>>) => {
      _setState(prev => {
        /**
         * React Batch Update 그리고 Local State와 Persistent Storage의 State의 일관성을 위해서 이렇게 작성했습니다.
         */
        if (typeof state === 'function') {
          const newState = state(prev);
          persistentStorage.set(newState);
          return newState;
        } else {
          persistentStorage.set(state);
          return state;
        }
      });
    },
    [persistentStorage]
  );

  const clearState = useCallback(() => {
    _setState({});
    persistentStorage.clear();
  }, [persistentStorage]);

  return [_state, setState, clearState] as const;
}

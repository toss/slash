import { selector, snapshot_UNSTABLE } from 'recoil';

/*
 * @see https://recoiljs.org/ko/docs/guides/testing/#%EB%AA%A8%EB%93%A0-selector%EC%9D%98-%EC%BA%90%EC%8B%9C-%EB%B9%84%EC%9A%B0%EA%B8%B0
 */
const clearSelectorCachesState = selector({
  key: 'ClearSelectorCaches',
  get: ({ getCallback }) =>
    getCallback(({ snapshot, refresh }) => () => {
      for (const node of snapshot.getNodes_UNSTABLE()) {
        refresh(node);
      }
    }),
});

const clearSelectorCaches = snapshot_UNSTABLE().getLoadable(clearSelectorCachesState).getValue();

/**
 * @name clearRecoilCache
 * @description
 * Recoil의 Selector Cache를 초기화합니다. Jest에서 테스트하는 경우에 유용합니다.
 *
 * `@toss/recoil` 에서 clearRecoilCache() 를 제공함으로써 beforeEach 등에서 리코일 캐시를 날리도록 합니다.
 *
 * @example
 * import { clearRecoilCache } from '@toss/recoil';
 *
 * afterEach(() => {
 *   clearRecoilCache();
 * });
 */
export function clearRecoilCache() {
  clearSelectorCaches();
}

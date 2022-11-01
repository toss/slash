/** @tossdocs-ignore */
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

export function clearRecoilCache() {
  clearSelectorCaches();
}

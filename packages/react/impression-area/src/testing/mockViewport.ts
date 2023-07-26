import { mockIntersectionObserver } from './mockIntersectionObserver';
import { act } from '@testing-library/react';

/** @tossdocs-ignore */

/** @deprecated 더 명확한 이름의 mockViewport를 사용하세요 */
export const mockImpression = {
  setup,
  cleanup,
  view: enter,
  hide: exit,
};

export const mockViewport = {
  setup,
  cleanup,
  enter,
  exit,
};

function setup() {
  mockIntersectionObserver.setup();
}

function cleanup() {
  mockIntersectionObserver.cleanup();
}

function enter(element: HTMLElement) {
  act(() => mockIntersectionObserver.intersect(element, { ratio: 1 }));
}

function exit(element: HTMLElement) {
  act(() => mockIntersectionObserver.intersect(element, { ratio: 0 }));
}

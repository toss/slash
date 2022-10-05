/** @tossdocs-ignore */
const defaultIntersectionObserver = window.IntersectionObserver;
const handlers = new Map<HTMLElement, (entries: IntersectionObserverEntry[]) => void>();

export const mockImpression = {
  setup,
  cleanup,
  view: startImpression,
  hide: endImpression,
};

function setup() {
  window.IntersectionObserver = class IntersectionObserver {
    constructor(private handleImpressionChange: (entries: IntersectionObserverEntry[]) => void) {}

    observe(element: HTMLElement) {
      handlers.set(element, this.handleImpressionChange);
    }

    unobserve(element: HTMLElement) {
      handlers.delete(element);
    }

    disconnect() {
      handlers.clear();
    }
  } as any;
}

function cleanup() {
  window.IntersectionObserver = defaultIntersectionObserver;
  handlers.clear();
}

function startImpression(element: HTMLElement) {
  let current: HTMLElement | null = element;

  while (current != null) {
    const handler = handlers.get(current);

    if (handler != null) {
      handler([
        {
          isIntersecting: true,
          intersectionRatio: 1,
          boundingClientRect: {} as any,
          intersectionRect: {} as any,
          rootBounds: {} as any,
          target: current!,
          time: 0,
        },
      ]);
    }

    current = current.parentElement;
  }
}

function endImpression(element: HTMLElement) {
  let current: HTMLElement | null = element;

  while (current != null) {
    const handler = handlers.get(current);

    if (handler != null) {
      handler([
        {
          isIntersecting: false,
          intersectionRatio: 0,
          boundingClientRect: {} as any,
          intersectionRect: {} as any,
          rootBounds: {} as any,
          target: current!,
          time: 0,
        },
      ]);
    }

    current = current.parentElement;
  }
}

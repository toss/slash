/** @tossdocs-ignore */
const defaultIntersectionObserver = window.IntersectionObserver;
const handlersMap = new Map<HTMLElement, Array<(entries: IntersectionObserverEntry[]) => void> | null>();

export const mockIntersectionObserver = {
  setup,
  cleanup,
  intersect,
};

function setup() {
  window.IntersectionObserver = class IntersectionObserver {
    private elements: HTMLElement[] = [];
    constructor(private handleImpressionChange: (entries: IntersectionObserverEntry[]) => void) {}

    observe(element: HTMLElement) {
      this.elements.push(element);
      handlersMap.set(element, [...(handlersMap.get(element) || []), this.handleImpressionChange]);
    }

    unobserve(element: HTMLElement) {
      this.elements = this.elements.filter(e => e !== element);
      handlersMap.set(
        element,
        (handlersMap.get(element) || []).filter(h => h !== this.handleImpressionChange)
      );
      if (handlersMap.get(element)?.length === 0) {
        handlersMap.delete(element);
      }
    }

    disconnect() {
      this.elements.forEach(element => this.unobserve(element));
    }
  } as any;
}

function cleanup() {
  window.IntersectionObserver = defaultIntersectionObserver;
  handlersMap.clear();
}

function intersect(element: HTMLElement, { ratio }: { ratio: number }) {
  let current: HTMLElement | null = element;

  while (current != null) {
    const handlers = handlersMap.get(current);

    if (handlers != null) {
      handlers.forEach(handler =>
        handler([
          {
            isIntersecting: ratio > 0,
            intersectionRatio: ratio,
            boundingClientRect: {} as any,
            intersectionRect: {} as any,
            rootBounds: {} as any,
            target: current!,
            time: 0,
          },
        ])
      );
    }

    current = current.parentElement;
  }
}

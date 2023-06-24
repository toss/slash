import { render } from '@testing-library/react';
import { useImageLazyLoading } from './useImageLazyLoading';

/**
 * @description This is the Intersection Observer Setup Code referring to "impression-area" in "@toss/react".
 */
const defaultIntersectionObserver = window.IntersectionObserver;
const handlers = new Map<HTMLElement, (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => void>();

function setup() {
  window.IntersectionObserver = class IntersectionObserver {
    constructor(private handleImageLazyLoading: (entries: IntersectionObserverEntry[]) => void) {}

    observe(element: HTMLElement) {
      handlers.set(element, this.handleImageLazyLoading);
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

function view(element: HTMLElement) {
  const observer = new window.IntersectionObserver(() => {});
  let current: HTMLElement | null = element;

  while (current != null) {
    const handler = handlers.get(current);

    if (handler != null) {
      handler(
        [
          {
            isIntersecting: true,
            intersectionRatio: 1,
            boundingClientRect: {} as any,
            intersectionRect: {} as any,
            rootBounds: {} as any,
            target: current!,
            time: 0,
          },
        ],
        observer
      );
    }

    current = current.parentElement;
  }
}

const TestComponent = () => {
  const ref1 = useImageLazyLoading({ src: 'testSrc1' });
  const ref2 = useImageLazyLoading({ src: 'testSrc2' });

  return (
    <>
      <img ref={ref1} alt="이미지1" />
      <img ref={ref2} alt="이미지2" />
    </>
  );
};

beforeEach(() => {
  setup();
});

afterEach(() => {
  cleanup();
});

describe('useImageLazyLoading', () => {
  it('When the target element is visible in the viewport (or root element), the value passed to src in the useImageLazyLoading hook is added to the src attribute of the img tag.', () => {
    const { getByAltText } = render(<TestComponent />);

    const img1 = getByAltText('이미지1');
    const img2 = getByAltText('이미지2');

    expect(img1).not.toHaveAttribute('src', 'testSrc1');
    expect(img2).not.toHaveAttribute('src', 'testSrc2');

    view(img1);

    expect(img1).toHaveAttribute('src', 'testSrc1');
    expect(img2).not.toHaveAttribute('src', 'testSrc2');

    view(img2);

    expect(img1).toHaveAttribute('src', 'testSrc1');
    expect(img2).toHaveAttribute('src', 'testSrc2');
  });
});

import { render, screen } from '@testing-library/react';
import { noop } from '@toss/utils';
import { useImageLazyLoading } from './useImageLazyLoading';

/**
 * This is the Intersection Observer Setup Code referring to "impression-area" in "@toss/react".
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

const mockIntersect = ({ type, element }: { element: HTMLElement; type: 'view' | 'hide' }) => {
  const observer = new window.IntersectionObserver(noop);
  let current: HTMLElement | null = element;

  while (current != null) {
    const handler = handlers.get(current);

    if (handler != null) {
      handler(
        [
          {
            isIntersecting: type === 'view' ? true : false,
            intersectionRatio: type === 'view' ? 1 : 0,
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
};

const TestComponent = ({ onAction }: { onAction?: () => void }) => {
  const imgRef1 = useImageLazyLoading({ src: 'testSrc1' });
  const imgRef2 = useImageLazyLoading({ src: 'testSrc2', onAction });

  return (
    <>
      <img ref={imgRef1} alt="img1" />
      <img ref={imgRef2} alt="img2" />
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
  it('Initially, Img tags do not contain the URL value of the image source in the src attribute.', () => {
    render(<TestComponent />);

    const img1 = screen.getByAltText('img1');
    const img2 = screen.getByAltText('img2');

    expect(img1).not.toHaveAttribute('src', 'testSrc1');
    expect(img2).not.toHaveAttribute('src', 'testSrc2');
  });

  it('When the target element is visible in the viewport (or the element you specified as root), the value passed to src in the useImageLazyLoading hook is added to the src attribute of the img tag.', () => {
    render(<TestComponent />);

    const img1 = screen.getByAltText('img1');
    const img2 = screen.getByAltText('img2');

    mockIntersect({
      type: 'view',
      element: img1,
    });

    expect(img1).toHaveAttribute('src', 'testSrc1');
    expect(img2).not.toHaveAttribute('src', 'testSrc2');

    mockIntersect({
      type: 'view',
      element: img2,
    });

    expect(img1).toHaveAttribute('src', 'testSrc1');
    expect(img2).toHaveAttribute('src', 'testSrc2');
  });

  it('When the target element is visible in the viewport (or the element you specified as root), If you provided onAction props, the onAction is executed.', () => {
    const mockAction = jest.fn();
    render(<TestComponent onAction={mockAction} />);

    const img1 = screen.getByAltText('img1');
    const img2 = screen.getByAltText('img2');

    mockIntersect({
      type: 'view',
      element: img1,
    });

    expect(mockAction).toHaveBeenCalledTimes(0);

    mockIntersect({
      type: 'view',
      element: img2,
    });

    expect(mockAction).toHaveBeenCalledTimes(1);
  });

  it('Once a target element is exposed to the Viewport (or whatever element you specify as root), it is no longer observed.', () => {
    const mockAction = jest.fn();
    render(<TestComponent onAction={mockAction} />);

    const img2 = screen.getByAltText('img2');

    expect(mockAction).toHaveBeenCalledTimes(0);

    mockIntersect({
      type: 'view',
      element: img2,
    });

    expect(mockAction).toHaveBeenCalledTimes(1);

    mockIntersect({
      type: 'hide',
      element: img2,
    });

    expect(mockAction).toHaveBeenCalledTimes(1);

    mockIntersect({
      type: 'view',
      element: img2,
    });

    expect(mockAction).toHaveBeenCalledTimes(1);
  });
});

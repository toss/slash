import { render, screen, waitFor } from '@testing-library/react';
import { noop } from '@toss/utils';
import { useLazyImage } from './useLazyImage';

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

const TestComponent = ({ onInView }: { onInView?: () => void }) => {
  const { ref: imgRef1 } = useLazyImage({ src: 'testSrc1' });
  const { ref: imgRef2 } = useLazyImage({ src: 'testSrc2', onInView });

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

describe('useLazyImage', () => {
  it('Img tags do not contain the URL value of the image source in the src attribute initially', () => {
    render(<TestComponent />);

    const img1 = screen.getByAltText('img1');
    const img2 = screen.getByAltText('img2');

    expect(img1).not.toHaveAttribute('src', 'testSrc1');
    expect(img2).not.toHaveAttribute('src', 'testSrc2');
  });

  it('src is appended to the img tag when the target element is displayed in the viewport(or the element you specified as root)', async () => {
    render(<TestComponent />);

    const img1 = screen.getByAltText('img1');
    const img2 = screen.getByAltText('img2');

    await waitFor(() => {
      mockIntersect({
        type: 'view',
        element: img1,
      });
    });

    expect(img1).toHaveAttribute('src', 'testSrc1');
    expect(img2).not.toHaveAttribute('src', 'testSrc2');

    await waitFor(() => {
      mockIntersect({
        type: 'view',
        element: img2,
      });
    });

    expect(img1).toHaveAttribute('src', 'testSrc1');
    expect(img2).toHaveAttribute('src', 'testSrc2');
  });

  it('onInView is executed when the target element is visible in the viewport(or the element you specified as root)', async () => {
    const mockAction = jest.fn();
    render(<TestComponent onInView={mockAction} />);

    const img1 = screen.getByAltText('img1');
    const img2 = screen.getByAltText('img2');

    await waitFor(() => {
      mockIntersect({
        type: 'view',
        element: img1,
      });
    });

    expect(mockAction).toHaveBeenCalledTimes(0);

    await waitFor(() => {
      mockIntersect({
        type: 'view',
        element: img2,
      });
    });

    expect(mockAction).toHaveBeenCalledTimes(1);
  });

  it('Target element is no longer observed once it is exposed to the viewport(or the element you specified as root)', async () => {
    const mockAction = jest.fn();
    render(<TestComponent onInView={mockAction} />);

    const img2 = screen.getByAltText('img2');

    expect(mockAction).toHaveBeenCalledTimes(0);

    await waitFor(() => {
      mockIntersect({
        type: 'view',
        element: img2,
      });
    });

    expect(mockAction).toHaveBeenCalledTimes(1);

    await waitFor(() => {
      mockIntersect({
        type: 'hide',
        element: img2,
      });
    });

    expect(mockAction).toHaveBeenCalledTimes(1);

    await waitFor(() => {
      mockIntersect({
        type: 'view',
        element: img2,
      });
    });

    expect(mockAction).toHaveBeenCalledTimes(1);
  });
});

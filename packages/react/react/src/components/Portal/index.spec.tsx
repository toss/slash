import { fireEvent, render, screen } from '@testing-library/react';
import { useRef, useState } from 'react';
import { Portal } from './Portal';

const DefaultTestComponent = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [number, setNumber] = useState(0);

  return (
    <div id="parent">
      <button onClick={() => setIsOpen(!isOpen)}>Toggle</button>
      <button onClick={() => setNumber(number + 1)}>+</button>

      <Portal>
        {isOpen && (
          <div className="child">
            <p>{`${number}`}</p>
          </div>
        )}
      </Portal>
    </div>
  );
};

const ContainerTestComponent = () => {
  const ref = useRef<HTMLDivElement | null>(null);

  return (
    <div id="parent">
      <Portal containerRef={ref}>
        <p className="child">Child</p>
      </Portal>

      <div id="outer" ref={ref}></div>
    </div>
  );
};

const NestedTestComponent = () => {
  const ref = useRef<HTMLDivElement | null>(null);

  return (
    <div id="parent">
      <Portal>
        <p className="child">Child</p>
        <Portal>
          <p className="nested-child-1">Nested Child1</p>
          <Portal containerRef={ref}>
            <p className="nested-child-2">Nested Child2</p>
          </Portal>
        </Portal>
      </Portal>

      <div id="outer" ref={ref}></div>
    </div>
  );
};

describe('Default Portal Test', () => {
  it("should render the portalElement in 'document.body' by default", () => {
    const { container } = render(<DefaultTestComponent />);

    const parentElement = container.querySelector('#parent');
    const parentPortal = parentElement?.querySelector('.portal');

    expect(parentPortal).toBeNull();

    const documentPortal = document.querySelector('.portal');
    const documentPortalChild = documentPortal?.querySelector('.child');

    expect(documentPortalChild).toBeInTheDocument();
  });

  it('should render children of the Portal component based on multiple states', () => {
    render(<DefaultTestComponent />);

    const documentPortal = document.querySelector('.portal');
    const toggleButton = screen.getByRole('button', { name: 'Toggle' });
    const plusButton = screen.getByRole('button', { name: '+' });

    const getChildElement = () => documentPortal?.querySelector('.child');

    fireEvent.click(plusButton);

    expect(getChildElement()).toBeInTheDocument();
    expect(getChildElement()).toHaveTextContent('1');

    fireEvent.click(toggleButton);
    fireEvent.click(plusButton);

    expect(getChildElement()).not.toBeInTheDocument();

    fireEvent.click(toggleButton);
    fireEvent.click(plusButton);

    expect(getChildElement()).toBeInTheDocument();
    expect(getChildElement()).toHaveTextContent('3');

    fireEvent.click(toggleButton);

    expect(getChildElement()).not.toBeInTheDocument();
  });

  it('should remove the portalElement on unmount.', () => {
    const { unmount } = render(<DefaultTestComponent />);

    const documentPortal = document.querySelector('.portal');

    unmount();

    expect(documentPortal).not.toBeInTheDocument();
  });
});

describe('Container Portal Test', () => {
  it("should render to any other DOM element you want instead of the 'document.body' by passing in the 'containerRef' prop", () => {
    const { container } = render(<ContainerTestComponent />);

    const outerElement = container.querySelector('#outer');
    const outerInnerPortal = outerElement?.querySelector('.portal');
    const outerInnerChild = outerInnerPortal?.querySelector('.child');

    expect(outerInnerChild).toBeInTheDocument();
  });

  it('should remove the portalElement on unmount', () => {
    const { container, unmount } = render(<ContainerTestComponent />);

    const outerElement = container.querySelector('#outer');
    const outerInnerPortal = outerElement?.querySelector('.portal');

    unmount();

    expect(outerInnerPortal).not.toBeInTheDocument();
  });
});

describe('Nested Portal Test', () => {
  it('should create a nested Portal DOM hierarchy when nesting multiple Portal Components', () => {
    render(<NestedTestComponent />);

    const documentPortal = document.querySelector('.portal');
    const documentPortalChild = documentPortal?.querySelector('.child');

    expect(documentPortalChild).toBeInTheDocument();

    const nestedPortal1 = documentPortal?.querySelector('.portal');
    const nestedChild1 = nestedPortal1?.querySelector('.nested-child-1');

    expect(nestedChild1).toBeInTheDocument();

    const nestedPortal2 = nestedPortal1?.querySelector('.portal');
    const nestedChild2 = nestedPortal2?.querySelector('.nested-child-2');

    expect(nestedChild2).toBeInTheDocument();
  });

  it("should render a nested Portal Component to the parent portalElement if the nested Portal Component has a 'containerRef' prop", () => {
    const { container } = render(<NestedTestComponent />);

    const outerElement = container.querySelector('#outer');
    const outerPortal = outerElement?.querySelector('.portal');

    expect(outerPortal).toBeNull();
  });
});

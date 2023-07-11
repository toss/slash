import { fireEvent, render, screen } from '@testing-library/react';
import { useRef, useState } from 'react';
import { Portal } from './Portal';

const DefaultTestComponent = () => {
  const [number, setNumber] = useState(0);

  return (
    <div id="parent">
      <button onClick={() => setNumber(number + 1)}>+</button>

      <Portal>
        <p className="child">{`${number}`}</p>
      </Portal>
    </div>
  );
};

const ContainerTestComponent = () => {
  const ref = useRef<HTMLDivElement | null>(null);

  return (
    <div id="parent">
      <Portal containerRef={ref}>
        <p className="child">Container Portal</p>
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
        <p className="child">Default Portal</p>
        <Portal>
          <p className="nested-child-1">Nested Portal1</p>
          <Portal containerRef={ref}>
            <p className="nested-child-2">Nested Portal2</p>
          </Portal>
        </Portal>
      </Portal>

      <div id="outer" ref={ref}></div>
    </div>
  );
};

describe('Default Portal Test', () => {
  it("should render the portal node in 'document.body' by default", () => {
    const { container } = render(<DefaultTestComponent />);

    const parentNode = container.querySelector('#parent');
    const parentPortal = parentNode?.querySelector('.portal');

    expect(parentPortal).toBeNull();

    const documentPortal = document.querySelector('.portal');
    const documentPortalChild = documentPortal?.querySelector('.child');

    expect(documentPortalChild).toBeInTheDocument();
  });

  it('State changes should be reflected in Portal Nodes', () => {
    render(<DefaultTestComponent />);

    const documentPortal = document.querySelector('.portal');
    const documentPortalChild = documentPortal?.querySelector('.child');

    expect(documentPortalChild).toBeInTheDocument();

    const button = screen.getByRole('button');

    fireEvent.click(button);

    expect(documentPortalChild).toHaveTextContent('1');

    fireEvent.click(button);

    expect(documentPortalChild).toHaveTextContent('2');
  });

  it('should remove the Portal Node on unmount.', () => {
    const { unmount } = render(<DefaultTestComponent />);

    const documentPortal = document.querySelector('.portal');

    unmount();

    expect(documentPortal).not.toBeInTheDocument();
  });
});

describe('Container Portal Test', () => {
  it("should render to any other DOM node you want instead of the 'document.body' by passing in the 'containerRef' prop", () => {
    const { container } = render(<ContainerTestComponent />);

    const outerNode = container.querySelector('#outer');
    const outerInnerPortal = outerNode?.querySelector('.portal');
    const outerInnerChild = outerInnerPortal?.querySelector('.child');

    expect(outerInnerChild).toBeInTheDocument();
  });

  it('should remove the Portal Node on unmount', () => {
    const { container, unmount } = render(<ContainerTestComponent />);

    const outerNode = container.querySelector('#outer');
    const outerInnerPortal = outerNode?.querySelector('.portal');

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

  it("should render a nested Portal Component to the parent Portal Node if the nested Portal Component has a 'containerRef' prop", () => {
    const { container } = render(<NestedTestComponent />);

    const outerNode = container.querySelector('#outer');
    const outerPortal = outerNode?.querySelector('.portal');

    expect(outerPortal).toBeNull();
  });
});

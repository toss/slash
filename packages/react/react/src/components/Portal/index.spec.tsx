import { render } from '@testing-library/react';
import { Portal } from './Portal';

const TestComponent = ({ id }: { id: string }) => {
  return (
    <div id="root">
      <Portal id={id}>
        <div id="child">Example Portal</div>
      </Portal>
    </div>
  );
};

beforeAll(() => {
  const tempDiv = document.createElement('div');
  tempDiv.setAttribute('id', 'outer');

  document.body.appendChild(tempDiv);
});

describe('Test Portal Component', () => {
  it('부모 컴포넌트 DOM 계층 구조 바깥에 추가한 DOM Node의 id와 같다면, 해당 Node의 자식으로 렌더링된다.', () => {
    render(<TestComponent id="outer" />);

    const root = document.body.querySelector('#root');
    const outerPortal = document.body.querySelector('#outer');

    const rootChildren = root?.querySelector('#child');
    const outerPortalChildren = outerPortal?.querySelector('#child');

    expect(rootChildren).not.toBeInTheDocument();
    expect(outerPortalChildren).toBeInTheDocument();
  });

  it('부모 컴포넌트 DOM 계층 구조 바깥에 추가한 DOM Node의 id와 다르다면, 해당 Node의 자식으로 렌더링되지 않고 부모 컴포넌트의 자식으로 렌더링된다.', () => {
    render(<TestComponent id="etc" />);

    const root = document.body.querySelector('#root');
    const outerPortal = document.body.querySelector('#outer');

    const rootChildren = root?.querySelector('#child');
    const outerPortalChildren = outerPortal?.querySelector('#child');

    expect(rootChildren).toBeInTheDocument();
    expect(outerPortalChildren).not.toBeInTheDocument();
  });
});

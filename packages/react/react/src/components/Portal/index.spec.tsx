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
  // 외부 DON Node 추가
  const tempDiv = document.createElement('div');
  tempDiv.setAttribute('id', 'outer');
  tempDiv.setAttribute('id', 'outer');

  document.body.appendChild(tempDiv);
});

describe('Portal', () => {
  it('부모 컴포넌트 DOM 계층 구조 바깥에 추가한 DOM Node의 id와 같다면, 해당 Node의 자식으로 렌더링된다.', () => {
    render(<TestComponent id="outer" />);

    const rootNode = document.body.querySelector('#root');
    const outerNode = document.body.querySelector('#outer');

    const rootChildrenNode = rootNode?.querySelector('#child');
    const outerChildrenNode = outerNode?.querySelector('#child');

    expect(rootChildrenNode).not.toBeInTheDocument();
    expect(outerChildrenNode).toBeInTheDocument();
  });

  it('부모 컴포넌트 DOM 계층 구조 바깥에 추가한 DOM Node의 id와 다르다면, 해당 Node의 자식으로 렌더링되지 않고 부모 컴포넌트의 자식으로 렌더링된다.', () => {
    render(<TestComponent id="etc" />);

    const rootNode = document.body.querySelector('#root');
    const outerNode = document.body.querySelector('#outer');

    const rootChildrenNode = rootNode?.querySelector('#child');
    const outerChildrenNode = outerNode?.querySelector('#child');

    expect(rootChildrenNode).toBeInTheDocument();
    expect(outerChildrenNode).not.toBeInTheDocument();
  });
});

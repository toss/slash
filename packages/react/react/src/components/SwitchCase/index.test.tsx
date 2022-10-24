import { render } from '@testing-library/react';
import { SwitchCase } from '.';

describe('SwitchCase', () => {
  function prepare(key: string) {
    return render(
      <SwitchCase
        value={key}
        caseBy={{
          a: <>Hello A</>,
          b: <>Hello B</>,
        }}
        defaultComponent={<>Default</>}
      />
    );
  }
  it(`'a' 라는 값을 주면 'Hello A' 가 렌더링 된다.`, () => {
    const controls = prepare('a');

    expect(controls.getByText('Hello A')).toBeInTheDocument();
  });

  it(`'a' 라는 값을 주면 'Hello B' 는 렌더링되면 안됩니다.`, () => {
    const controls = prepare('a');

    expect(controls.getByText('Hello A')).toBeInTheDocument();
    expect(controls.queryByText('Hello B')).not.toBeInTheDocument();
  });

  it(`만족하는 값이 없다면 'Default' 가 렌더링 되어야 합니다.`, () => {
    const controls = prepare('cc');

    expect(controls.queryByText('Hello A')).not.toBeInTheDocument();
    expect(controls.queryByText('Hello B')).not.toBeInTheDocument();
    expect(controls.getByText('Default')).toBeInTheDocument();
  });
});

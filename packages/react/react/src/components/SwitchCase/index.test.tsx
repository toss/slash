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

  it(`should render 'Hello A' when the value is 'a'.`, () => {
    const controls = prepare('a');

    expect(controls.getByText('Hello A')).toBeInTheDocument();
  });

  it(`should not render 'Hello B' when the value is 'a'.`, () => {
    const controls = prepare('a');

    expect(controls.getByText('Hello A')).toBeInTheDocument();
    expect(controls.queryByText('Hello B')).not.toBeInTheDocument();
  });

  it(`should render 'Default' if no satisfying value is provided.`, () => {
    const controls = prepare('cc');

    expect(controls.queryByText('Hello A')).not.toBeInTheDocument();
    expect(controls.queryByText('Hello B')).not.toBeInTheDocument();
    expect(controls.getByText('Default')).toBeInTheDocument();
  });
});

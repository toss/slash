import { render } from '@testing-library/react';
import ClickArea from '.';

describe('ClickArea', () => {
  it('정상적으로 rendering 된다', () => {
    const result = render(<ClickArea enabled={true}>click</ClickArea>);

    expect(result.getByText('click')).toBeInTheDocument();
  });
  it('enabled 가 true일 때 classname에 tossteam-react__click-area__enabled가 포함된다', () => {
    const result = render(<ClickArea enabled={true}>click</ClickArea>);

    expect(result.getAllByRole('button')[0]).toHaveClass('tossteam-react__click-area__enabled');
  });

  it('enabled 가 false 때 classname에 tossteam-react__click-area__enabled가 포함되지 않는다', () => {
    const result = render(<ClickArea enabled={false}>click</ClickArea>);

    expect(result.getAllByRole('button')[0]).not.toHaveClass('tossteam-react__click-area__enabled');
  });
});

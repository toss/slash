import { render } from '@testing-library/react';
import { HiddenHeading } from '.';

describe('HiddenHeading', () => {
  it('id를 줄 수 있다.', () => {
    render(<HiddenHeading id="test">테스트입니다.</HiddenHeading>);

    const heading = document.getElementById('test');
    expect(heading).toBeInTheDocument();

    expect(heading!.innerHTML).toEqual('테스트입니다.');
  });
});

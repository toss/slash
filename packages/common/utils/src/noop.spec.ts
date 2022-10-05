import { asyncNoop } from '.';

describe('asyncNoop', () => {
  it('Promise를 반환한다.', () => {
    expect(asyncNoop()).toEqual(expect.any(Promise));
  });
});

import { reverseKeyValue } from './reverseKeyValue';

describe('reverseKeyValue 함수는', () => {
  it('key와 value를 바꿔 { [value]: key } 형태의 object를 반환한다.', () => {
    expect(reverseKeyValue({ jbee: 'eebj' })).toEqual({ eebj: 'jbee' });
  });
});

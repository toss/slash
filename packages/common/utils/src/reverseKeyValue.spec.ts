import { reverseKeyValue } from './reverseKeyValue';

describe('reverseKeyValue 함수는', () => {
  it('key와 value를 바꿔 { [value]: key } 형태의 object를 반환한다.', () => {
    expect(reverseKeyValue({ jbee: 'eebj' })).toEqual({ eebj: 'jbee' });
  });

  it('value가 중복된 경우 { [value]: [...key] } 형태의 object를 반환한다.', () => {
    expect(reverseKeyValue({ ricky2: 'kim', jbee: 'eebj', jbee2: 'eebj', ricky: 'kim', denny: 'kim' })).toEqual({
      eebj: ['jbee', 'jbee2'],
      kim: ['ricky2', 'ricky', 'denny'],
    });
  });
});

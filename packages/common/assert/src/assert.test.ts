import { assert } from './assert';

type Base = {
  type: 'A' | 'B';
};

type DataA = Base & {
  type: 'A';
  a: string;
};

type DataB = Base & {
  type: 'B';
  b: number;
};

type Data = DataA | DataB;

function getData(type: 'A' | 'B'): Data {
  switch (type) {
    case 'A':
      return {
        type: 'A',
        a: 'toss',
      };
    case 'B':
      return {
        type: 'B',
        b: 999,
      };
  }
}

class MyError extends Error {
  public readonly name = 'MyError';

  constructor(message?: string) {
    super(message);
  }
}

describe('assert', () => {
  it('"condition"을 단언할 수 있다.', () => {
    const data = getData('A');

    assert(data.type === 'A');

    expect(data.a).toEqual('toss');
  });

  it('"condition"을 만족하지 않는 경우 오류를 발생시킨다.', () => {
    // eslint-disable-next-line @typescript-eslint/no-inferrable-types
    const value: string = 'string';

    expect(() => assert(value === 'not_string')).toThrowError(Error);
    expect(() => assert(value === 'not_string', new MyError('잘못된 문자열'))).toThrowError(MyError);
  });
});

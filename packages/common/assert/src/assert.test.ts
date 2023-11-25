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
  it('should assert the "condition" if it is true', () => {
    const data = getData('A');

    assert(data.type === 'A');

    expect(data.a).toEqual('toss');
  });

  it('should throw an error if the "condition" is not satisfied', () => {
    // eslint-disable-next-line @typescript-eslint/no-inferrable-types
    const value: string = 'string';

    expect(() => assert(value === 'not_string')).toThrowError(Error);
    expect(() => assert(value === 'not_string', new MyError('잘못된 문자열'))).toThrowError(MyError);
  });

  it('should throw an error when provided string error message', () => {
    const value = false;
    const errorMessage = 'String error message';

    expect(() => assert(value, errorMessage)).toThrowError(new MyError(errorMessage));
  });
});

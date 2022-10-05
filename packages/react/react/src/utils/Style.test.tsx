import { generateClassNames } from './Style';

describe('generateClassNames', () => {
  it('인자로 받은 오브젝트의 각 value에 PREFIX를 붙여준다', () => {
    expect(generateClassNames({ test: 'test' })).toMatchObject({ test: 'tossteam-react__test' });
  });
});

describe('generateID는', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it('순서대로 고유한 ID를 생성합니다.', () => {
    import('./generateID').then(({ generateID }) => {
      expect(generateID()).toEqual('1');
      expect(generateID()).toEqual('2');
      expect(generateID()).toEqual('3');
    });
  });

  it('prefix를 포함한 고유의 ID를 생성합니다.', () => {
    import('./generateID').then(({ generateID }) => {
      expect(generateID('toss')).toEqual('toss1');
      expect(generateID('toss')).toEqual('toss2');
      expect(generateID('toss')).toEqual('toss3');
    });
  });
});

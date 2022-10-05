import { hangulIncludes } from './hangulIncludes';

describe('hangulIncludes', () => {
  it('토스', () => {
    expect(hangulIncludes('토스', '')).toBe(true);
    expect(hangulIncludes('토스', 'ㅌ')).toBe(true);
    expect(hangulIncludes('토스', '톳')).toBe(true);
    expect(hangulIncludes('토스', '톱')).toBe(false);
    expect(hangulIncludes('토스', '토스')).toBe(true);
  });

  it('프론트엔드', () => {
    expect(hangulIncludes('프론트엔드', '')).toBe(true);
    expect(hangulIncludes('프론트엔드', '플')).toBe(true);
    expect(hangulIncludes('프론트엔드', '틍')).toBe(true);
    expect(hangulIncludes('프론트엔드', '픏')).toBe(false);
    expect(hangulIncludes('프론트엔드', '플')).toBe(true);
    expect(hangulIncludes('프론트엔드', '프로')).toBe(true);
  });
});

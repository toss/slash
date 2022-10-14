import { disassembleHangulToGroups } from './disassembleHangulToGroups';

describe('disassembleHangulToGroups', () => {
  it('값', () => {
    expect(disassembleHangulToGroups('값')).toEqual([['ㄱ', 'ㅏ', 'ㅂ', 'ㅅ']]);
  });

  it('값이 비싸다', () => {
    expect(disassembleHangulToGroups('값이 비싸다')).toEqual([
      ['ㄱ', 'ㅏ', 'ㅂ', 'ㅅ'],
      ['ㅇ', 'ㅣ'],
      [' '],
      ['ㅂ', 'ㅣ'],
      ['ㅆ', 'ㅏ'],
      ['ㄷ', 'ㅏ'],
    ]);
  });

  it('토스 짱', () => {
    expect(disassembleHangulToGroups('토스 짱')).toEqual([['ㅌ', 'ㅗ'], ['ㅅ', 'ㅡ'], [' '], ['ㅉ', 'ㅏ', 'ㅇ']]);
  });

  it('ㄵ', () => {
    expect(disassembleHangulToGroups('ㄵ')).toEqual([['ㄴ', 'ㅈ']]);
  });

  it('ㅘ', () => {
    expect(disassembleHangulToGroups('ㅘ')).toEqual([['ㅗ', 'ㅏ']]);
  });
});

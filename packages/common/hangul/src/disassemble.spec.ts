import { disassembleHangulToGroups, disassembleHangul } from './disassemble';

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

describe('disassembleHangul', () => {
  it('값', () => {
    expect(disassembleHangul('값')).toEqual('ㄱㅏㅂㅅ');
  });

  it('값이 비싸다', () => {
    expect(disassembleHangul('값이 비싸다')).toEqual('ㄱㅏㅂㅅㅇㅣ ㅂㅣㅆㅏㄷㅏ');
  });

  it('토스 짱', () => {
    expect(disassembleHangul('토스 짱')).toEqual('ㅌㅗㅅㅡ ㅉㅏㅇ');
  });

  it('ㄵ', () => {
    expect(disassembleHangul('ㄵ')).toEqual('ㄴㅈ');
  });

  it('ㅘ', () => {
    expect(disassembleHangul('ㅘ')).toEqual('ㅗㅏ');
  });
});

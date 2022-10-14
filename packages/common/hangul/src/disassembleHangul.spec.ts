import { disassembleHangul } from './disassembleHangul';

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

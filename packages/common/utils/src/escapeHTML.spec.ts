import { escapeHTML } from './escapeHTML';

describe('escapeHTML은', () => {
  it('텍스트에 포함된 특수문자를 치환하여 반환합니다.', () => {
    const text1 = "'특수&문자'";
    expect(escapeHTML(text1)).toBe('&#39;특수&amp;문자&#39;');

    const text2 = '<테스트>';
    expect(escapeHTML(text2)).toBe('&lt;테스트&gt;');

    const text3 = '"테스트"';
    expect(escapeHTML(text3)).toBe('&quot;테스트&quot;');
  });

  it('텍스트에 특수문자가 포함되지 않았으면 텍스트를 그대로 반환합니다.', () => {
    const text = '테스트';
    expect(escapeHTML(text)).toBe('테스트');
  });
});

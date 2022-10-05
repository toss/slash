import { disassembleCompleteHangulCharacter } from './disassembleCompleteHangulCharacter';
import { hasBatchim } from './utils';

type JosaOption = '이/가' | '을/를' | '은/는' | '으로/로' | '와/과' | '이나/나' | '이에/에';

/**
 * @name josa
 * @description
 * 한글 문자열에 `'이/가'`, `'을/를'`, `'은/는'`, `'으로/로'`, `'와/과'`, `'이나/나'`, `'이에/에'` 와 같은 조사를 붙여줍니다.
 * ```typescript
 * josa(
 *   // 조사를 붙일 한글 문자열
 *   word: string,
 *   // 붙일 조사
 *   josa: '이/가' | '을/를' | '은/는' | '으로/로' | '와/과' | '이나/나' | '이에/에'
 * ): string
 * @example
 * josa('샴푸', '이/가')  // '샴푸가'
 * josa('칫솔', '이/가')  // '칫솔이'
 * josa('바깥', '으로/로') // '바깥으로'
 * josa('내부', '으로/로') // '내부로'
 */
export function josa(word: string, josa: JosaOption): string {
  if (word.length === 0) {
    return word;
  }

  return word + josaPicker(word, josa);
}

josa.pick = josaPicker;

function josaPicker(word: string, josa: JosaOption): string {
  const has받침 = hasBatchim(word);
  let index = has받침 ? 0 : 1;

  const is종성ㄹ = disassembleCompleteHangulCharacter(word[word.length - 1]!)?.last === 'ㄹ';

  if (josa === '와/과' || (has받침 && is종성ㄹ && josa === '으로/로')) {
    index = index === 0 ? 1 : 0;
  }

  return josa.split('/')[index]!;
}

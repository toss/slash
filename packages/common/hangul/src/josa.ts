/** @tossdocs-ignore */
import { disassembleCompleteHangulCharacter } from './disassembleCompleteHangulCharacter';
import { hasBatchim } from './utils';

type JosaOption =
  | '이/가'
  | '을/를'
  | '은/는'
  | '으로/로'
  | '와/과'
  | '이나/나'
  | '이란/란'
  | '아/야'
  | '이랑/랑'
  | '이에요/예요'
  | '으로서/로서'
  | '으로써/로써'
  | '으로부터/로부터';

const 로_조사: JosaOption[] = ['으로/로', '으로서/로서', '으로써/로써', '으로부터/로부터'];

/**
 * This method has been moved to the es-hangul library.
 * Please use es-hangul for this functionality going forward.
 * @deprecated This feature is now available in the es-hangul package.
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

  const isCaseOf로 = has받침 && is종성ㄹ && 로_조사.includes(josa);

  if (josa === '와/과' || isCaseOf로) {
    index = index === 0 ? 1 : 0;
  }

  const isEndsWith이 = word[word.length - 1] === '이';

  if (josa === '이에요/예요' && isEndsWith이) {
    index = 1;
  }

  return josa.split('/')[index]!;
}

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
  | '이에요/예요';

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

  const isEndsWith이 = word[word.length - 1] === '이';

  if (josa === '이에요/예요' && isEndsWith이) {
    index = 1;
  }

  return josa.split('/')[index]!;
}

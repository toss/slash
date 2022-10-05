/** @tossdocs-ignore */
export const COMPLETE_HANGUL_START_CHARCODE = '가'.charCodeAt(0);
export const COMPLETE_HANGUL_END_CHARCODE = '힣'.charCodeAt(0);

/**
 * ㄱ -> 'ㄱ'
 * ㄳ -> 'ㄱㅅ' 으로 나눈다.
 */
export const DISASSEMBLED_CONSONANTS_BY_CONSONANT: { [letter: string]: string | undefined } = {
  // 종성이 없는 경우 '빈' 초성으로 관리하는 것이 편리하여, 빈 문자열도 포함한다.
  '': '',
  ㄱ: 'ㄱ',
  ㄲ: 'ㄲ',
  ㄳ: 'ㄱㅅ',
  ㄴ: 'ㄴ',
  ㄵ: 'ㄴㅈ',
  ㄶ: 'ㄴㅎ',
  ㄷ: 'ㄷ',
  ㄸ: 'ㄸ',
  ㄹ: 'ㄹ',
  ㄺ: 'ㄹㄱ',
  ㄻ: 'ㄹㅁ',
  ㄼ: 'ㄹㅂ',
  ㄽ: 'ㄹㅅ',
  ㄾ: 'ㄹㅌ',
  ㄿ: 'ㄹㅍ',
  ㅀ: 'ㄹㅎ',
  ㅁ: 'ㅁ',
  ㅂ: 'ㅂ',
  ㅃ: 'ㅃ',
  ㅄ: 'ㅂㅅ',
  ㅅ: 'ㅅ',
  ㅆ: 'ㅆ',
  ㅇ: 'ㅇ',
  ㅈ: 'ㅈ',
  ㅉ: 'ㅉ',
  ㅊ: 'ㅊ',
  ㅋ: 'ㅋ',
  ㅌ: 'ㅌ',
  ㅍ: 'ㅍ',
  ㅎ: 'ㅎ',
};

export const DISASSEMBLED_VOWELS_BY_VOWEL: { [letter: string]: string | undefined } = {
  ㅏ: 'ㅏ',
  ㅐ: 'ㅐ',
  ㅑ: 'ㅑ',
  ㅒ: 'ㅒ',
  ㅓ: 'ㅓ',
  ㅔ: 'ㅔ',
  ㅕ: 'ㅕ',
  ㅖ: 'ㅖ',
  ㅗ: 'ㅗ',
  ㅘ: 'ㅗㅏ',
  ㅙ: 'ㅗㅐ',
  ㅚ: 'ㅗㅣ',
  ㅛ: 'ㅛ',
  ㅜ: 'ㅜ',
  ㅝ: 'ㅜㅓ',
  ㅞ: 'ㅜㅔ',
  ㅟ: 'ㅜㅣ',
  ㅠ: 'ㅠ',
  ㅡ: 'ㅡ',
  ㅢ: 'ㅡㅣ',
  ㅣ: 'ㅣ',
};

/**
 * 초성으로 올 수 있는 한글 글자
 */
export const HANGUL_CHARACTERS_BY_FIRST_INDEX = [
  'ㄱ',
  'ㄲ',
  'ㄴ',
  'ㄷ',
  'ㄸ',
  'ㄹ',
  'ㅁ',
  'ㅂ',
  'ㅃ',
  'ㅅ',
  'ㅆ',
  'ㅇ',
  'ㅈ',
  'ㅉ',
  'ㅊ',
  'ㅋ',
  'ㅌ',
  'ㅍ',
  'ㅎ',
];

export const HANGUL_CHARACTERS_BY_MIDDLE_INDEX = Object.values(DISASSEMBLED_VOWELS_BY_VOWEL) as string[];

export const HANGUL_CHARACTERS_BY_LAST_INDEX = [
  '',
  'ㄱ',
  'ㄲ',
  'ㄳ',
  'ㄴ',
  'ㄵ',
  'ㄶ',
  'ㄷ',
  'ㄹ',
  'ㄺ',
  'ㄻ',
  'ㄼ',
  'ㄽ',
  'ㄾ',
  'ㄿ',
  'ㅀ',
  'ㅁ',
  'ㅂ',
  'ㅄ',
  'ㅅ',
  'ㅆ',
  'ㅇ',
  'ㅈ',
  'ㅊ',
  'ㅋ',
  'ㅌ',
  'ㅍ',
  'ㅎ',
].map(consonant => DISASSEMBLED_CONSONANTS_BY_CONSONANT[consonant]!);

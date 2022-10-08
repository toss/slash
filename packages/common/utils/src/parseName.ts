const 두글자성씨 = [
  '남궁',
  '황보',
  '제갈',
  '사공',
  '선우',
  '서문',
  '독고',
  '동방',
  '어금',
  '망절',
  '무본',
  '황목',
  '등정',
  '장곡',
  '강전',
];

const isKorean = /^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣0-9]*$/;

/**
 * @name parseName
 * @description
 * 한글 이름을 [성, 이름]으로 분류하는 parser입니다
 * 다음과 같은 규칙을 따릅니다:
 * - 두 글자 이름: [성, 이름]
 * - 세 글자 이름:
 *   - 두 글자 성씨: ['', 풀네임]
 *   - 한 글자 성씨: [성, 이름]
 * - 그 외: ['', 풀네임]
 *
 * ```typescript
 * function parseName(koreanName: string): string[];
 * ```
 *
 * @example
 * parseName('김부엉')
 * // => ['김', '부엉']
 *
 * parseName('이한')
 * // => ['이', '한']
 *
 * parseName('김나박이')
 * // => ['', '김나박이']
 */
export function parseName(koreanName: string) {
  if (!isKorean.test(koreanName)) {
    return ['', koreanName];
  }

  switch (koreanName.length) {
    case 2:
      return [koreanName.slice(0, 1), koreanName.slice(1)];
    case 3: {
      if (두글자성씨.includes(koreanName.slice(0, 2))) {
        return ['', koreanName];
      }
      return [koreanName.slice(0, 1), koreanName.slice(1)];
    }
    default: {
      return ['', koreanName];
    }
  }
}

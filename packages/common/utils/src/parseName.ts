/** @tossdocs-ignore */
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

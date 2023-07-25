import { josa } from './josa';

describe('Hangul', () => {
  describe('josa', () => {
    test('주격조사', () => {
      expect(josa('샴푸', '이/가')).toBe('샴푸가');
      expect(josa('칫솔', '이/가')).toBe('칫솔이');
    });
    test('목적격조사', () => {
      expect(josa('샴푸', '을/를')).toBe('샴푸를');
      expect(josa('칫솔', '을/를')).toBe('칫솔을');
    });
    test('대조의 보조사', () => {
      expect(josa('샴푸', '은/는')).toBe('샴푸는');
      expect(josa('칫솔', '은/는')).toBe('칫솔은');
    });
    test('방향의 격조사', () => {
      expect(josa('바깥', '으로/로')).toBe('바깥으로');
      expect(josa('내부', '으로/로')).toBe('내부로');
    });
    test('방향의 격조사 ㄹ 받침 예외처리', () => {
      expect(josa('지름길', '으로/로')).toBe('지름길로');
    });
    test('비교의 격조사', () => {
      expect(josa('샴푸', '와/과')).toBe('샴푸와');
      expect(josa('칫솔', '와/과')).toBe('칫솔과');
    });
    test('선택의 보조사', () => {
      expect(josa('샴푸', '이나/나')).toBe('샴푸나');
      expect(josa('칫솔', '이나/나')).toBe('칫솔이나');
    });
  });

  describe('josa.pick', () => {
    test('주격조사', () => {
      expect(josa.pick('샴푸', '이/가')).toBe('가');
      expect(josa.pick('칫솔', '이/가')).toBe('이');
    });
    test('목적격조사', () => {
      expect(josa.pick('샴푸', '을/를')).toBe('를');
      expect(josa.pick('칫솔', '을/를')).toBe('을');
    });
    test('대조의 보조사', () => {
      expect(josa.pick('샴푸', '은/는')).toBe('는');
      expect(josa.pick('칫솔', '은/는')).toBe('은');
    });
    test('방향의 격조사', () => {
      expect(josa.pick('바깥', '으로/로')).toBe('으로');
      expect(josa.pick('내부', '으로/로')).toBe('로');
    });
    test('방향의 격조사 ㄹ 받침 예외처리', () => {
      expect(josa.pick('지름길', '으로/로')).toBe('로');
    });
    test('비교의 격조사', () => {
      expect(josa.pick('샴푸', '와/과')).toBe('와');
      expect(josa.pick('칫솔', '와/과')).toBe('과');
    });
    test('선택의 보조사', () => {
      expect(josa.pick('샴푸', '이나/나')).toBe('나');
      expect(josa.pick('칫솔', '이나/나')).toBe('이나');
    });
  });
});

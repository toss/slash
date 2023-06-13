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
    test('화제의 보조사', () => {
      expect(josa('샴푸', '이란/란')).toBe('샴푸란');
      expect(josa('칫솔', '이란/란')).toBe('칫솔이란');
    });
    test('호격조사', () => {
      expect(josa('철수', '아/야')).toBe('철수야');
      expect(josa('길동', '아/야')).toBe('길동아');
    });
    test('접속조사', () => {
      expect(josa('고기', '이랑/랑')).toBe('고기랑');
      expect(josa('과일', '이랑/랑')).toBe('과일이랑');
    });
    test('서술격조사와 종결어미', () => {
      expect(josa('사과', '이에요/예요')).toBe('사과예요');
      expect(josa('책', '이에요/예요')).toBe('책이에요');
    });
    test('서술격조사와 종결어미, "이" 로 끝나는 단어 예외처리', () => {
      expect(josa('때밀이', '이에요/예요')).toBe('때밀이예요');
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
    test('화제의 보조사', () => {
      expect(josa.pick('샴푸', '이란/란')).toBe('란');
      expect(josa.pick('칫솔', '이란/란')).toBe('이란');
    });
    test('호격조사', () => {
      expect(josa.pick('철수', '아/야')).toBe('야');
      expect(josa.pick('길동', '아/야')).toBe('아');
    });
    test('접속조사', () => {
      expect(josa.pick('고기', '이랑/랑')).toBe('랑');
      expect(josa.pick('과일', '이랑/랑')).toBe('이랑');
    });
    test('서술격조사와 종결어미', () => {
      expect(josa.pick('사과', '이에요/예요')).toBe('예요');
      expect(josa.pick('책', '이에요/예요')).toBe('이에요');
    });
    test('서술격조사와 종결어미, "이" 로 끝나는 단어 예외처리', () => {
      expect(josa.pick('때밀이', '이에요/예요')).toBe('예요');
    });
  });
});

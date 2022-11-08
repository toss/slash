---
title: Lottie
---

# Lottie

The library created by toss using the `lottie-web` library to make lottie easy to use in a react.

```tsx
<Lottie
  // To change assets dynamically within the lottie
  // `@optional `
  assets={[...assets]}
  // Whether the animation is played repeatedly
  // `@default false (boolean | 'normal' | 'reversed')`
  loop={true}
  // The delay between the repetition of the animation
  // `@default 0`
  interval={0}
  // Animation playback delay (ms)
  // `@default 0`
  delay={0}
  // Animation playback speed
  // `@default 1`
  speed={1}
  // To use autoPlay
  // `@default true`
  autoPlay={false}
  // 로띠 컴포넌트의 너비
  // `@optional (number | string)`
  width={160}
  // 로띠 컴포넌트의 높이
  // `@optional (number | string)`
  height={160}
  // 애니메이션이 시작되면 onPlay 핸들러를 호출합니다.
  // `@optional `
  onPlay={onPlay}
  // 반복되는 로띠가 종료될 때 onLoopComplete 핸들러를 호출합니다.
  // `@optional `
  onLoopComplete={onLoopComplete}
  // 로띠가 완료되었을 때 onComplete 핸들러를 호출합니다.
  // `@optional `
  onComplete={onComplete}
  // 접근성을 위한 속성을 의미합니다.
  // 넘어온 alt 값은 aria-labal로 설정되고, role은 "img"가 됩니다. (없으면 aria-hidden 처리됩니다.)
  // `@optional `
  alt={''}
/>
```

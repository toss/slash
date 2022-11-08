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
  // width of lottie component
  // `@optional (number | string)`
  width={160}
  // height of lottie component
  // `@optional (number | string)`
  height={160}
  // Invoke the `onPlay` function when animation starts.
  // `@optional `
  onPlay={onPlay}
  // Invoke the `onLoopComplete` function when the repeated lottie ends.
  // `@optional `
  onLoopComplete={onLoopComplete}
  // Invoke the `onComplete` function when the lottie is complete.
  // `@optional `
  onComplete={onComplete}
  // Indicates an attribute for accessibility.
  // The passed alt value is set to aria-labal, and role is "img". (If not, aria-hidden)
  // `@optional `
  alt={''}
/>
```

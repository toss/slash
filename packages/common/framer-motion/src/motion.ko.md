---
title: motion
---

# motion

기본 `framer-motion`의 `motion` 은 Internet Explorer 등 구형 브라우저를 지원하지 않아서 지원하도록 Wrapping 한 컴포넌트입니다.
사용 방법은 기본 motion 과 동일합니다.

원래 `motion` 컴포넌트는 `Proxy` 라고 하는 Polyfill 불가능한 API를 사용하기 때문에, 구형 브라우저에서 실행할 수 없습니다.
보다 넓은 범위의 기기를 지원하기 위해서 `@toss/framer-motion` 의 `motion` 컴포넌트를 사용해주세요.

## Example

```typescript live
function MotionDiv() {
  return (
    <motion.div
      style={{ width: '50px', height: '50px', background: '#004fff', margin: '50px' }}
      animate={{
        scale: [1, 2, 2, 1, 1],
        rotate: [0, 0, 180, 180, 0],
        borderRadius: ['0%', '0%', '50%', '50%', '0%'],
      }}
      transition={{
        duration: 2,
        ease: 'easeInOut',
        times: [0, 0.2, 0.5, 0.8, 1],
        repeat: Infinity,
        repeatDelay: 1,
      }}
    />
  );
}
```

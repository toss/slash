---
title: motion
---

# motion

This component was wrapped to support older browsers because the default `motion` of `framer-motion` does not support them such as Internet Explorer.
The usage is the same as the default motion.

Originally, the `motion` component uses a Polyfillable API called `Proxy`, so it cannot run in older browsers.
Use the `motion` component of `@toss/frame-motion` to support a wider range of devices.

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

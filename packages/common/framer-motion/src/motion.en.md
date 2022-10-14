---
title: motion
---

# motion

This component was wrapped to support older browsers because the default `motion` of `framer-motion` does not support them such as Internet Explorer.
The usage is the same as the default motion.

Originally, the `motion` component uses a Polyfillable API called `Proxy`, so it cannot run in older browsers.
Use the `motion` component of `@toss/frame-motion` to support a wider range of devices.

- https://www.framer.com/motion/

## Examples

```typescript
import { motion } from '@toss/framer-motion';

<motion.div {...} />
```

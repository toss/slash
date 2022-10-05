import { createDomMotionComponent } from 'framer-motion';

/**
 * @name motion
 * @description
 * 기본 `framer-motion`의 `motion` 은 Internet Explorer 등 구형 브라우저를 지원하지 않아서 지원하도록 Wrapping 한 컴포넌트입니다.
 * 사용 방법은 기본 motion 과 동일합니다.
 *
 * 원래 `motion` 컴포넌트는 `Proxy` 라고 하는 Polyfill 불가능한 API를 사용하기 때문에, 구형 브라우저에서 실행할 수 없습니다.
 * 보다 넓은 범위의 기기를 지원하기 위해서 `@tossteam/framer-motion` 의 `motion` 컴포넌트를 사용해주세요.
 *
 * @example
 * import { motion } from '@tossteam/framer-motion';`
 *`
 * <motion.div {...} />
 * @see https://tossteam.slack.com/archives/C83Q0T5U1/p1616676708374300
 */
export const motion = {
  div: createDomMotionComponent("div"),
  span: createDomMotionComponent("span"),
  svg: createDomMotionComponent("svg"),
  rect: createDomMotionComponent("rect"),
  circle: createDomMotionComponent("circle"),
  path: createDomMotionComponent("path"),
  li: createDomMotionComponent("li"),
  img: createDomMotionComponent("img"),
  p: createDomMotionComponent("p"),
  nav: createDomMotionComponent("nav"),
};

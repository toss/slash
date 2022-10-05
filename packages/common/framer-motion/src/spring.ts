import { Spring as FMSpring } from 'framer-motion';

export type Spring = "basic" | "small" | "medium" | "large" | "quick" | "slow";

/**
 * @name springs
 * @description
 * 일관적인 애니메이션 경험을 위해 토스팀에서 미리 정의한 spring 값입니다.
 * `'basic' | 'small' | 'medium' | 'large' | 'quick' | 'slow'` 중 하나를 사용할 수 있습니다.
 * @example
 * import { springs } from '@tossteam/framer-motion';
 *
 * // scale: 1부터 1.2까지 "small" spring을 이용하여 애니메이션을 실행합니다.
 * <motion.div
 *   initial={{ scale: 1 }}
 *   animate={{ scale: 1.2 }}
 *   transition={springs.small}
 * />
 */
export const springs: Record<Spring, FMSpring> = {
  basic: {
    type: "spring",
    stiffness: 200,
    damping: 30,
    mass: 1,
  },
  small: {
    type: "spring",
    stiffness: 480,
    damping: 50,
    mass: 1,
  },
  quick: {
    type: "spring",
    stiffness: 800,
    damping: 55,
    mass: 1,
  },
  medium: {
    type: "spring",
    stiffness: 270,
    damping: 25,
    mass: 1,
  },
  large: {
    type: "spring",
    stiffness: 100,
    damping: 15,
    mass: 1,
  },
  slow: {
    type: "spring",
    stiffness: 70,
    damping: 20,
    mass: 1,
  },
};

/** @tossdocs-ignore */
export type EasingFn = (t: number) => number;

export const quarticInOut: EasingFn = t => (t < 0.5 ? +8.0 * Math.pow(t, 4.0) : -8.0 * Math.pow(t - 1.0, 4.0) + 1.0);

import { MotionValue, useMotionValue, useTransform } from "framer-motion";

export const useAnimateCheckmark = (): [MotionValue<number>, MotionValue<number>] => {
  const pathLength = useMotionValue(0);
  const opacity = useTransform(pathLength, [0.05, 0.15], [0, 1]);

  return [pathLength, opacity];
};

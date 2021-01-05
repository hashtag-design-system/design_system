import {
  motion,
  MotionAdvancedProps,
  MotionProps,
  Orchestration,
  SVGMotionProps,
  TapHandlers,
  Transition,
  Tween,
} from "framer-motion";
import { useAnimateCheckmark } from "../../../utils/hooks";

// See -> https://codesandbox.io/s/framer-motion-svg-checkbox-kqm7y?file=/src/Example.tsx:137-300

export const checkmarkVariants = {
  pressed: (isChecked: boolean) => ({
    pathLength: isChecked ? 0.75 : 0.3,
  }),
  checked: { pathLength: 1 },
  initial: { pathLength: 0 },
};

export type Props = {
  size?: number;
};

export type SBProps = Props &
  Pick<TapHandlers, "whileTap"> &
  Pick<MotionProps, "initial"> &
  Pick<MotionAdvancedProps, "custom"> &
  Pick<SVGMotionProps<SVGSVGElement>, "stroke"> & {
    transition?: Transition & Orchestration & Tween;
  };

export type FProps = SBProps & Omit<SVGMotionProps<SVGSVGElement>, "css">;

export const Checkmark: React.FC<FProps> = ({
  size = 14,
  whileTap,
  initial = false,
  custom,
  stroke = "var(--grey-1)",
  transition,
  children,
  ...props
}) => {
  // Animation state
  const [pathLength, opacity] = useAnimateCheckmark();

  return (
    <motion.svg
      whileTap={whileTap}
      initial={initial}
      width={size}
      height={size}
      viewBox="0 0 14 14"
      xmlns="http://www.w3.org/2000/svg"
      data-testid="animated-checkmark"
      {...props}
    >
      {!children ? (
        <motion.path
          d="M1.75 7.156l3.55 3.658 7.43-7.897"
          fill="transparent"
          stroke={stroke}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          animate={custom ? "checked" : undefined}
          variants={checkmarkVariants}
          style={{ pathLength, opacity }}
          custom={custom}
          transition={{ duration: 0.2, ...transition }}
          data-testid="icon-path"
        />
      ) : (
        children
      )}
    </motion.svg>
  );
};

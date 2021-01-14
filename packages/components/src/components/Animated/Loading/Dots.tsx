import { HTMLMotionProps, motion } from "framer-motion";
import React from "react";
import { range } from "../../../utils";
import { useClassnames } from "../../../utils/hooks";

const containerVariants = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.5,
    },
  },
};

export type Props = {
  totalDots?: number;
  size?: number;
  margin?: number;
  bgClr?: React.CSSProperties["backgroundColor"];
  dotsProps?: HTMLMotionProps<"li">;
};

export type FProps = Props & HTMLMotionProps<"ul">;

// flex-direction animation is not used, because it will not animate the dots and
// will only make an instant change
const Dots: React.FC<FProps> = ({ totalDots = 3, size = 18, margin = 8, bgClr, dotsProps = {}, ...props }) => {
  const [classNames, rest] = useClassnames("animated-dots", props);
  const { transition, ...dotRestProps } = dotsProps;
  const [dotClassNames, dotRest] = useClassnames("animated-dots__dot", dotRestProps);

  // use `totalDots - 1` so that to access, if needed, the <li /> index
  // on the actual boxes variable
  const boxes = range(0, totalDots - 1);

  return (
    <motion.ul
      initial="hidden"
      animate="show"
      variants={containerVariants}
      className={classNames}
      data-testid="animated-dots-container"
      {...rest}
    >
      {boxes.map((_, i) => {
        const totalWidthSpace = size + margin * 2;

        return (
          <motion.li
            key={i}
            animate={{
              scale: [1, 0.7, 1],
              x: i === boxes.length - 1 ? -(totalWidthSpace * (boxes.length - 1)) : totalWidthSpace,
            }}
            transition={{ loop: Infinity, duration: 1.65, ease: "easeInOut", ...transition }}
            custom={i}
            style={
              {
                "--size": `${size}px`,
                "--margin": `${margin}px`,
                "--bg-clr": bgClr,
              } as any
            }
            className={dotClassNames}
            data-testid="animated-dot"
            {...dotRest}
          />
        );
      })}
    </motion.ul>
  );
};

export default Dots;

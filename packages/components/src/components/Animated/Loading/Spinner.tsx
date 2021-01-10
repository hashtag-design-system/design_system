import React from "react";
import { useClassnames } from "../../../utils/hooks";
import { AnimationType, CSSProperties } from "../__helpers__";

// Big thanks to -> https://codepen.io/jczimm/pen/vEBpoL?editors=1100
export type Props = {
  size?: CSSProperties["width"] | CSSProperties["height"];
  color?: CSSProperties["stroke"];
  rotateAnimation?: AnimationType;
  dashAnimation?: AnimationType;
  circleProps?: React.ComponentPropsWithoutRef<"circle">;
};

export type FProps = Props & React.ComponentPropsWithoutRef<"div">;

const Spinner: React.FC<FProps> = ({
  size = "5em",
  color,
  style,
  circleProps = {},
  rotateAnimation = {},
  dashAnimation = {},
  ...props
}) => {
  const [classNames, rest] = useClassnames("animated-spinner", props);
  const [circleClassNames, circleRest] = useClassnames("animated-spinner__path", circleProps);

  const {
    duration: rotateDuration = "2s",
    timing: rotateTiming = "linear",
    iteration: rotateIteration = "infinite",
  } = rotateAnimation;
  const { duration: dashDuration = "1.5s", timing: dashTiming = "ease-in-out", iteration: dashIteration = "infinite" } = dashAnimation;

  return (
    <div
      className={classNames}
      style={
        {
          ...style,
          "--size": size,
          "--color": color,
          "--rotate-animation-duration": rotateDuration,
          "--rotate-animation-timing": rotateTiming,
          "--rotate-animation-iteration": rotateIteration,
          "--dash-animation-duration": dashDuration,
          "--dash-animation-timing": dashTiming,
          "--dash-animation-iteration": dashIteration,
        } as any
      }
      data-testid="animated-spinner"
      {...rest}
    >
      <svg className="icon animated-spinner__circular" data-testid="icon" viewBox="25 25 50 50">
        <circle
          className={circleClassNames}
          cx="50"
          cy="50"
          r="20"
          fill="none"
          strokeWidth={3}
          strokeMiterlimit={10}
          {...circleRest}
        />
      </svg>
    </div>
  );
};

Spinner.displayName = "AnimatedLoadingSpinner";

export default Spinner;

import React from "react";
import { listKeys } from "../../../config";
import { range } from "../../../utils";
import { useClassnames } from "../../../utils/hooks";
import { ComponentProps } from "../index";

// Big thanks to -> https://www.youtube.com/watch?v=K4K7HNavK4U

type CSSProperties = React.CSSProperties;

export type Props = {
  totalFireworks?: number;
  color?: CSSProperties["backgroundColor"];
  animation?: {
    delay?: CSSProperties["animationDelay"];
    timing?: CSSProperties["animationTimingFunction"];
    duration?: CSSProperties["animationDuration"];
  };
} & Pick<CSSProperties, "width" | "height">;

export type FProps = Props & ComponentProps<"div">;

const Fireworks: React.FC<FProps> = ({
  totalFireworks = 12,
  width = "4px",
  height = "80px",
  color,
  animation = {},
  style,
  ...props
}) => {
  const [classNames, rest] = useClassnames("fireworks", props);

  const { delay = "3s", timing = "ease-in-out", duration = "infinite" } = animation;

  return (
    <div
      className={classNames}
      style={
        {
          ...style,
          "--width": width,
          "--height": height,
          "--bg-clr": color,
          "--animation-delay": delay,
          "--animation-timing": timing,
          "--animation-duration": duration,
        } as any
      }
      data-testid="fireworks"
      {...rest}
    >
      {range(1, totalFireworks).map((_, i) => {
        return (
          <div
            key={listKeys.FIREWORKS_EXPLOSION + i}
            className="fireworks__explosion"
            style={{ transform: `rotate(${i * (360 / totalFireworks)}deg) translateY(-15px)` }}
          ></div>
        );
      })}
    </div>
  );
};

Fireworks.displayName = "AnimatedFireworks";

export default Fireworks;

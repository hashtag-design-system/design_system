import React from "react";

type Props = Pick<React.CSSProperties, "height">;

export const Bar: React.FunctionComponent<Props> = ({ height = 50 }) => {
  return (
    <div className="slider__chart__bar" style={{ height: `${height}%` }} data-testid="slider-chart-bar"></div>
  );
};

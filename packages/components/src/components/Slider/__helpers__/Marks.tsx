import React, { useMemo } from "react";
import { SliderProps } from "..";
import { useSliderContext } from "../../../utils/ctx/SliderContext";

export const Marks: React.FunctionComponent<Omit<SliderProps, "lockOnMarks">> = ({ marks, zeroPercentageOnEdgeMarks }) => {
  const { calcPercentage } = useSliderContext();

  const calcPosition = (markValue: number, idx: number, rightStyle: boolean): number | undefined => {
    let value: number = calcPercentage(markValue);
    if (!rightStyle) {
      if (zeroPercentageOnEdgeMarks && idx === 0) {
        value = 0;
      } else {
        value = value - (window.innerWidth >= 700 ? 1.05 : 1.55);
      }
      return value;
    } else {
      return undefined;
    }
  };

  return (
    <div className="slider__marks flex-row-flex-start-flex-start">
      {marks.map(({ value, label }, i) => {
        const rightStyle = (i === marks.length - 1) && (zeroPercentageOnEdgeMarks || false);

        return (
          <span
            key={i}
            className="slider__marks__span body-14"
            style={{
              // right: calcPercentage(value),
              right: `${rightStyle ? "0" : undefined}`,
              left: `${calcPosition(value, i, rightStyle)}%`,
            }}
          >
            {label}
          </span>
        );
      })}
    </div>
  );
};

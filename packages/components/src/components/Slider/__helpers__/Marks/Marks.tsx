import React from "react";
import { useSliderContext } from "../../../../utils";

export const Marks: React.FunctionComponent = () => {
  const { marks, min, zeroPercentageOnEdgeMarks, calcPercentage } = useSliderContext();

  const calcPosition = (value: number, last: boolean): number | undefined => {
    if (!last) {
      return calcPercentage(value);
    } else if (value === min) {
      return 0;
    } else {
      return undefined;
    }
  };

  return marks ? (
    <div className="slider__marks flex-row-center-center" data-testid="slider-marks-container">
      {marks.map((mark, i) => {
        const rightStyle = (i === marks.length - 1 || i === 0) && zeroPercentageOnEdgeMarks;

        return (
          <span
            key={i}
            className="slider__marks__span body-14"
            style={{
              right: `${rightStyle ? "0%" : ""}`,
              // It is easier to set with `position:absolute`, because we only have to set the `left` property
              /*  
                    If we used `display: flex` and `transform: translateX(x%)` propertie, then we would have to deal
                    with each value individually. Which means, that we would need to set the `tranform` property 
                    different for the markValue < middle, the middle one and the ones with markValue < middle
                   */
              left: `${calcPosition(mark.value, rightStyle || false)}%`,
            }}
            data-testid="slider-mark"
          >
            {mark.label}
          </span>
        );
      })}
    </div>
  ) : null;
};

import React from "react";
import { useSliderContext } from "../../../utils/contexts/SliderContext";
import { SliderMarkProp } from "../Slider";

export const Marks: React.FunctionComponent = () => {
  const { marks, min, zeroPercentageOnEdgeMarks, calcPercentage } = useSliderContext();

  const calcPosition = (mark: SliderMarkProp, last: boolean): number | undefined => {
    const { value: markValue, label } = mark;
    if (!last) {
      return calcPercentage(markValue) - 0.55 * String(label !== undefined ? label : markValue).length;
    } else if (markValue === min) {
      return 0;
    } else {
      return undefined;
    }
  };

  return marks ? (
    <div className="slider__marks flex-row-center-center">
      {marks.map((mark, i) => {
        const rightStyle = (i === marks.length - 1 || i === 0) && zeroPercentageOnEdgeMarks;
        const { value: markValue, label } = mark;

        return (
          <span
            key={i}
            className="slider__marks__span body-14"
            style={{
              right: `${rightStyle ? "0%" : undefined}`,
              // It is easier to set with `position:absolute`, because we only have to set the `left` property
              /*  
                    If we used `display: flex` and `transform: translateX(x%)` propertie, then we would have to deal
                    with each value individually. Which means, that we would need to set the `tranform` property 
                    different for the markValue < middle, the middle one and the ones with markValue < middle
                   */
              left: `${calcPosition(mark, rightStyle || false)}%`,
            }}
          >
            {label !== undefined ? label : markValue}
          </span>
        );
      })}
    </div>
  ) : null;
};

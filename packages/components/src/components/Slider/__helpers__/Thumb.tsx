import React, { useState } from "react";
import { useSliderContext } from "../../../utils/contexts/SliderContext";

type Props = {
  size: number;
};

export const Thumb: React.FunctionComponent<Props> = ({ size }) => {
  const [prevKey, setPrevKey] = useState<string>("0");

  const { value, setValue, calcValue, calcPercentage, max, step } = useSliderContext();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const { key } = e;

    if (key === "ArrowRight" || key === "ArrowUp") {
      setValue(value => value + step);
    } else if (key === "ArrowLeft" || key === "ArrowDown") {
      setValue(value => value - step);
    }

    if (!isNaN(+key)) {
      const numKey = parseInt(key);
      const number = calcValue(numKey * 10);
      if (numKey === 0 && prevKey === "1") {
        setValue(max);
      } else {
        setValue(number);
      }
    }

    setPrevKey(key);
  };

  return (
    <div
      className="slider__thumb flex-row-center-center"
      style={{
        left: `${calcPercentage()}%`,
        width: `${size}em`,
        height: `${size}em`,
      }}
      tabIndex={0}
      onKeyDown={e => handleKeyDown(e)}
    >
      <span className="slider__thumb__value body-16">{value}</span>
    </div>
  );
};

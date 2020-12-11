import React from "react";
import { useSliderContext } from "../../../utils/contexts/SliderContext";
import { SliderFProps } from "../index";

type Props = {
  onHover: boolean;
  size: number;
  value: number;
  focusVisible?: boolean;
};

type FProps = Props & Required<Pick<SliderFProps, "thumb">> & Pick<SliderFProps, "className">;

export const Thumb: React.FunctionComponent<FProps> = ({ onHover, size, thumb, value, focusVisible, className }) => {
  const { formatRegExp } = thumb;
  const { max, calcPercentage } = useSliderContext();
  const newVal = className?.includes("right") && max !== undefined ? max - value : value;

  return (
    <div
      className={`slider__thumb ${className} ${focusVisible ? "focus-visible" : ""} ${onHover ? "hover" : ""}`}
      style={{
        [className|| "left"]: `${calcPercentage(value)}%`,
        width: `${size}em`,
        height: `${size}em`,
      }}
      tabIndex={0}
    >
      <span className="slider__thumb__value body-16">
        {formatRegExp ? String(newVal).replaceAll(formatRegExp.searchValue, formatRegExp.replaceValue) : newVal}
      </span>
    </div>
  );
};

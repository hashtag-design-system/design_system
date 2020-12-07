import React from "react";
import { SliderProps } from "..";
import { useSliderContext } from "../../../utils/contexts/SliderContext";

type Props = {
  onHover: boolean;
  size: number;
  value: number;
} & Required<Pick<SliderProps, "thumb">> &
  Pick<SliderProps, "className">;

export const Thumb: React.FunctionComponent<Props> = ({ onHover, size, thumb, value, className }) => {
  const { formatRegExp } = thumb;
  const { calcPercentage } = useSliderContext();

  return (
    <div
      className={`slider__thumb ${className}`}
      style={{
        [className || "left"]: `${calcPercentage(value)}%`,
        width: `${size}em`,
        height: `${size}em`,
      }}
      tabIndex={0}
      data-onhover={onHover}
    >
      <span className="slider__thumb__value body-16">
        {formatRegExp ? String(value).replaceAll(formatRegExp.searchValue, formatRegExp.replaceValue) : value}
      </span>
    </div>
  );
};

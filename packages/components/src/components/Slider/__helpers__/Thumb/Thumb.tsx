import React from "react";
import { useSliderContext } from "../../../../utils";
import { ComponentProps } from "../../../__helpers__";
import { SliderFProps } from "../../index";

type Props = {
  size: number;
  value: number;
  onHover?: boolean;
  focusVisible?: boolean;
} & Pick<ComponentProps<"div">, "onMouseOver">;

export type FProps = Props & Required<Pick<SliderFProps, "thumb">> & Pick<SliderFProps, "className">;

export const Thumb: React.FunctionComponent<FProps> = ({
  onHover = false,
  size,
  thumb,
  value,
  focusVisible,
  className,
  onMouseOver,
}) => {
  const { formatRegExp } = thumb;
  const { max, calcPercentage } = useSliderContext();
  const newVal = className?.includes("right") && max !== undefined ? parseFloat(max.toString()) - value : value;

  return (
    <div
      className={`slider__thumb ${className ? className : ""} ${focusVisible ? "focus-visible" : ""} ${onHover ? "hover" : ""}`}
      style={{
        [className || "left"]: `${calcPercentage(value)}%`,
        width: `${size}em`,
        height: `${size}em`,
      }}
      tabIndex={0}
      data-testid="slider-thumb"
      onMouseOver={onMouseOver}
    >
      <span className="slider__thumb__value body-16" data-testid="slider-thumb-value">
        {formatRegExp ? String(newVal).replace(formatRegExp.searchValue, formatRegExp.replaceValue) : newVal}
      </span>
    </div>
  );
};

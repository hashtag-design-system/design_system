import React, { useCallback, useEffect, useRef, useState } from "react";
import { SliderProps } from "..";
import { useSliderContext } from "../../../utils/ctx/SliderContext";
import { useClassnames } from "../../../utils/hooks";
import Input from "../../Input";
import { Thumb } from "./Thumb";

type Props = SliderProps & {
  size: number;
  className?: string;
};

export const Field: React.FunctionComponent<Props & React.ComponentPropsWithRef<"input">> = ({
  lockOnMarks,
  zeroPercentageOnEdgeMarks,
  className,
  marks,
  inchange,
  size,
  ref,
  ...props
}) => {
  const { value, setValue, calcPercentage, min, max, step } = useSliderContext();

  const [classNames, rest] = useClassnames("slider shadow__inset-small", props);
  const [sliderStep, setSliderStep] = useState<number>(step);

  const progressRef = useRef<HTMLSpanElement>(null);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { valueAsNumber } = e.target;

      if (lockOnMarks) {
        const currentValueIdx = marks.map(mark => mark.value).indexOf(value);
        if (currentValueIdx !== -1) {
          const nextValue = marks[currentValueIdx + 1];
          const prevValue = marks[currentValueIdx - 1];

          if (valueAsNumber > value) {
            const val = nextValue.value;
            setSliderStep(val - value);
            setValue(val);
          } else {
            const val = prevValue.value;
            setSliderStep(value - val);
            setValue(val);
          }
        }
      } else {
        setValue(valueAsNumber);
      }

      if (inchange) {
        inchange(valueAsNumber);
      }
    },
    [inchange, lockOnMarks, marks, setValue, value]
  );

  useEffect(() => {
    if (progressRef && progressRef.current) {
      progressRef.current.style.width = `${calcPercentage()}%`;
    }
  }, [calcPercentage]);

  return (
    <>
      <Input.BaseInput
        type="range"
        min={min}
        max={max}
        step={sliderStep}
        value={value}
        className={classNames}
        onChange={e => handleChange(e)}
        ref={ref}
        tabIndex={-1}
        {...rest}
      >
        <span className="slider__bar shadow__inset-small">
          <span ref={progressRef} className="slider__bar__progress" />
        </span>
      </Input.BaseInput>
      {/* <div
        className="slider__thumb flex-row-center"
        style={{
          left: `${calcPercentage()}%`,
          width: `${size}em`,
          height: `${size}em`,
        }}
        tabIndex={0}
        onKeyDown={e => handleKeyDown(e)}
      >
        <span className="slider__thumb__value body-16">{value}</span>
      </div> */}
      <Thumb size={size} />
    </>
  );
};

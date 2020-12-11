import React, { useCallback, useEffect, useRef, useState } from "react";
import { calculatePercentage, calculateValue } from "../../utils";
import { SliderContextProvider } from "../../utils/contexts/SliderContext";
import { useClassnames, useDisabled } from "../../utils/hooks";
import Input from "../Input";
import { ReactProps } from "../__helpers__";
import Double from "./Double";
import { Bar } from "./__helpers__/Bar";
import { Chart } from "./__helpers__/Chart";
import { Marks } from "./__helpers__/Marks";
import { Thumb } from "./__helpers__/Thumb";

// See -> https://www.youtube.com/watch?v=zOA2vpx44Nw
// See -> https://www.youtube.com/watch?v=mvq8uOGFqlc
// See -> https://www.youtube.com/watch?v=MxbEjINYIPc

const SliderStates = ["default", "focus-visible", "hover", "disabled"] as const;
export type SliderState = typeof SliderStates[number];

export type SliderThumbProp = {
  defaultValue?: number;
  formatRegExp?: {
    searchValue: string | RegExp;
    replaceValue: string;
  };
} & ReactProps<SliderState>["input_state_prop"];
export type SliderMarkProp = { value: number; label?: string };
export type SliderChartDataProp = { value: number };

export type Props = {
  thumb?: SliderThumbProp;
  marks: SliderMarkProp[];
  lockOnMarks?: boolean;
  zeroPercentageOnEdgeMarks?: boolean;
  chart?: {
    type: "bar";
    data: SliderChartDataProp[];
    percentage?: boolean;
  };
};

export type FProps = Props & Omit<ReactProps<undefined, true>["number_input"], "defaultValue">;

interface SubComponents {
  Double: typeof Double;
}
const DEFAULT_SIZE = 0.875;

const Slider: React.FC<FProps> & SubComponents = ({
  min = 0,
  max = 100,
  thumb = { defaultValue: max / 2, state: "default" },
  step = 1,
  marks,
  lockOnMarks = false,
  zeroPercentageOnEdgeMarks = false,
  onChange,
  chart,
  ref,
  ...props
}) => {
  const { defaultValue = max / 2, state = "default" } = thumb;

  const [classNames, rest] = useClassnames("slider shadow__inset-sm", props, { stateToRemove: { state } });
  const isDisabled = useDisabled(props) || state === "disabled";
  const [value, setValue] = useState<number>(defaultValue!);
  const [prevKey, setPrevKey] = useState<string>("0");
  const [onHover, setOnHover] = useState<boolean>(false || (state === "hover" && !isDisabled));
  const [size, setSize] = useState<number>(DEFAULT_SIZE);
  const [sliderStep, setSliderStep] = useState<number>(step);

  const progressRef = useRef<HTMLSpanElement>(null);

  const incr = () => {
    setValue(value => value + sliderStep);
  };

  const dcr = () => {
    setValue(value => value - sliderStep);
  };

  const calcPercentage = useCallback(
    (number?: number): number => {
      const num = number === undefined ? value : number;
      const res = calculatePercentage(num, min, max);
      return res;
    },
    [value, min, max]
  );

  const calcValue = useCallback(
    (percentage: number): number => {
      const res = calculateValue(percentage, max);
      return res;
    },
    [max]
  );

  const setStep = (valueAsNumber: number) => {
    const currentValueIdx = marks.map(mark => mark.value).indexOf(value);
    const nextValue = marks[currentValueIdx + 1];
    const prevValue = marks[currentValueIdx - 1];
    let targetValue = value;
    if (nextValue === undefined) {
      targetValue = max;
    } else if (prevValue === undefined) {
      targetValue = 0;
    }

    if (valueAsNumber > targetValue) {
      const val = nextValue.value;
      setSliderStep(val - targetValue);
    } else {
      const val = prevValue.value;
      setSliderStep(targetValue - val);
    }
  };

  const handleHover = (isHover: boolean) => {
    if (state !== "hover" && !isDisabled) {
      setOnHover(isHover);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    const { key } = e;

    const currentValueIdx = marks.map(mark => mark.value).indexOf(value);
    if (key === "ArrowRight" || key === "ArrowUp") {
      if (lockOnMarks && currentValueIdx !== -1) {
        const nextValue = marks[currentValueIdx + 1];

        if (nextValue) {
          const val = nextValue.value;
          setSliderStep(val - value);
          setValue(val);
        }
      } else {
        incr();
      }
    } else if (key === "ArrowLeft" || key === "ArrowDown") {
      if (lockOnMarks && currentValueIdx !== -1) {
        const prevValue = marks[currentValueIdx - 1];

        if (prevValue) {
          const val = prevValue.value;
          setSliderStep(value - val);
          setValue(val);
        }
      } else {
        dcr();
      }
    }

    // Move thumb and change value, directly from numeric keyboard
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { valueAsNumber } = e.target;

    if (lockOnMarks) {
      const closest = marks
        .map(mark => mark.value)
        .reduce(function (prev, curr) {
          return Math.abs(curr - valueAsNumber) < Math.abs(prev - valueAsNumber) ? curr : prev;
        });

      const marksValues = marks.map(mark => mark.value);

      setStep(valueAsNumber);

      if (marksValues.includes(valueAsNumber)) {
        setValue(valueAsNumber);
      } else {
        setValue(closest);
      }
    } else {
      setValue(valueAsNumber);
    }

    if (onChange) {
      onChange(e);
    }
  };

  useEffect(() => {
    if (progressRef && progressRef.current) {
      progressRef.current.style.width = `${calcPercentage()}%`;
    }
  }, [calcPercentage]);

  useEffect(() => {
    if (onHover && !isDisabled) {
      const valueLength = String(max).length;
      let newValue: number = DEFAULT_SIZE * 1.75;

      if (valueLength > 3) {
        newValue = newValue + (valueLength - 3) * 0.4;
      }

      setSize(newValue);
    } else {
      setSize(DEFAULT_SIZE);
    }
  }, [max, onHover, size, isDisabled]);

  return (
    <SliderContextProvider
      value={{
        min,
        max,
        zeroPercentageOnEdgeMarks,
        marks,
        chart,
        calcPercentage,
        calcValue,
      }}
    >
      <div className={`slider__wrapper flex-column-flex-start-center ${isDisabled ? "disabled" : ""}`}>
        <Chart value={value} style={{ right: `${calcPercentage(max - value)}%` }} />
        <div className="slider__field" onMouseLeave={() => handleHover(false)} onKeyDown={e => handleKeyDown(e)}>
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
            role="slider"
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={value}
            disabled={isDisabled}
            onMouseOver={() => handleHover(true)}
            onMouseOut={() => handleHover(false)}
            onTouchMove={() => handleHover(true)}
            onTouchEnd={() => handleHover(false)}
            {...rest}
          >
            <Bar ref={progressRef} />
          </Input.BaseInput>
          <Thumb value={value} onHover={onHover} size={size} thumb={thumb} focusVisible={state === "focus-visible"} />
        </div>
        <Marks />
      </div>
    </SliderContextProvider>
  );
};

Slider.Double = Double;

export default Slider;

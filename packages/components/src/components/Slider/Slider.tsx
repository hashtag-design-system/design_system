import React, { useCallback, useEffect, useRef, useState } from "react";
import { calculatePercentage, calculateValue } from "../../utils";
import { useClassnames, useWindowDimensions } from "../../utils/hooks";
import Input, { BaseReactInputHTMLAttributes, NumberInputProps } from "../Input";
import Double from "./Double";

// See -> https://www.youtube.com/watch?v=zOA2vpx44Nw
// See -> https://www.youtube.com/watch?v=mvq8uOGFqlc
// See -> https://www.youtube.com/watch?v=MxbEjINYIPc

export type SliderThumbProp = { defaultValue?: number };
export type SliderMarkProp = { value: number; label?: string };
type SliderChartDataProp = { value: number };

export type Props = Omit<NumberInputProps, "value" | "defaultValue"> & {
  thumb?: SliderThumbProp;
  marks: SliderMarkProp[];
  lockOnMarks?: boolean;
  zeroPercentageOnEdgeMarks?: boolean;
  formatRegExp?: {
    searchValue: string | RegExp;
    replaceValue: string;
  };
  chart?: {
    type: "bar";
    data: SliderChartDataProp[];
    percentage?: boolean;
  };
};

interface SubComponents {
  Double: typeof Double;
}
const DEFAULT_SIZE = 0.875;

const Slider: React.FC<
  Omit<React.ComponentPropsWithRef<"input">, "value" | "defaultValue"> &
    Props &
    Omit<BaseReactInputHTMLAttributes, "value" | "defaultValue">
> &
  SubComponents = ({
  min = 0,
  max = 100,
  thumb = { defaultValue: max / 2 },
  step = 1,
  marks,
  lockOnMarks = false,
  zeroPercentageOnEdgeMarks = false,
  inchange,
  formatRegExp,
  chart,
  ref,
  ...props
}) => {
  const [classNames, rest] = useClassnames("slider shadow__inset-sm", props);
  const [value, setValue] = useState<number>(thumb.defaultValue!);
  const [prevKey, setPrevKey] = useState<string>("0");
  const [onHover, setOnHover] = useState<boolean>(false);
  const [size, setSize] = useState<number>(DEFAULT_SIZE);
  const [sliderStep, setSliderStep] = useState<number>(step);
  const [chartOverlayLeft, setChartOverlayLeft] = useState<number>(0);
  const windowDimensions = useWindowDimensions();

  const progressRef = useRef<HTMLSpanElement>(null);
  const chartFrameRef = useRef<HTMLDivElement>(null);
  const chartOverlayFrameRef = useRef<HTMLDivElement>(null);
  const chartOverlay = useRef<HTMLDivElement>(null);

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

  const calcBarHeight = useCallback(
    (data: SliderChartDataProp) => {
      if (!chart) {
        return undefined;
      }
      const { percentage } = chart;
      const { value } = data;
      if (percentage) {
        return value;
      } else {
        const data = chart.data.map(datum => datum.value);
        const maxVal = Math.max(...data);
        const perc = calculatePercentage(value, 0, maxVal, { returnRounded: true });
        return perc;
      }
    },
    [chart]
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

    if (inchange) {
      inchange(valueAsNumber);
    }
  };

  useEffect(() => {
    if (progressRef && progressRef.current) {
      progressRef.current.style.width = `${calcPercentage()}%`;
    }
  }, [calcPercentage]);

  useEffect(() => {
    if (onHover) {
      const valueLength = String(max).length;
      let newValue: number = DEFAULT_SIZE * 1.75;

      if (valueLength > 3) {
        newValue = newValue + (valueLength - 3) * 0.4;
      }

      setSize(newValue);
    } else {
      setSize(DEFAULT_SIZE);
    }
  }, [max, onHover, size]);

  useEffect(() => {
    if (chartFrameRef && chartFrameRef.current && chartOverlayFrameRef && chartOverlayFrameRef.current) {
      chartOverlayFrameRef.current.style.width = `${chartFrameRef.current.offsetWidth}px`;
    }
  }, [windowDimensions.width, chartFrameRef, chartOverlayFrameRef]);

  useEffect(() => {
    if (chartOverlay && chartOverlay.current) {
      setChartOverlayLeft(chartOverlay.current.offsetLeft);
    }
  }, [chartOverlay]);

  return (
    <div className="slider__wrapper flex-column-flex-start-center">
      {chart && (
        <div className="slider__chart flex-column-flex-start-flex-start" data-onhover={onHover}>
          <div className="slider__chart__overlay" style={{ right: `${calcPercentage(max - value)}%` }} ref={chartOverlay}>
            <div
              className="slider__chart__frame slider__chart__frame__overlay"
              ref={chartOverlayFrameRef}
              style={{ left: `-${chartOverlayLeft}px` }}
            >
              {chart.data.map((datum, i) => {
                return <div key={i} className="slider__chart__bar" style={{ height: `calc(${calcBarHeight(datum)}%)` }}></div>;
              })}
            </div>
          </div>
          <div className="slider__chart__frame" ref={chartFrameRef}>
            {chart.data.map((datum, i) => {
              return <div key={i} className="slider__chart__bar" style={{ height: `calc(${calcBarHeight(datum)}%)` }}></div>;
            })}
          </div>
        </div>
      )}
      <div className="slider__field flex-column-flex-start-stretch" onKeyDown={e => handleKeyDown(e)}>
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
          onMouseOver={() => setOnHover(true)}
          onMouseOut={() => setOnHover(false)}
          onTouchMove={() => setOnHover(true)}
          onTouchEnd={() => setOnHover(false)}
          {...rest}
        >
          <span className="slider__bar shadow__inset-sm">
            <span ref={progressRef} className="slider__bar__progress" />
          </span>
        </Input.BaseInput>
        <div
          className="slider__thumb"
          style={{
            left: `${calcPercentage()}%`,
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
      </div>
      {marks && (
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
                  left: `${calcPosition(mark, rightStyle)}%`,
                }}
              >
                {label !== undefined ? label : markValue}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
};

Slider.Double = Double;

export default Slider;

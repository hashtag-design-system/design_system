import React, { useCallback, useEffect, useRef, useState } from "react";
import { useClassnames } from "../../utils/hooks";
import Input, { BaseReactInputHTMLAttributes, NumberInputProps } from "../Input";

// See -> https://www.youtube.com/watch?v=zOA2vpx44Nw
// See -> https://www.youtube.com/watch?v=mvq8uOGFqlc
// See -> https://www.youtube.com/watch?v=MxbEjINYIPc

export type SliderMarkProp = { value: number; label: string };
type SliderChartDataProp = { value: number; percentage?: boolean; width?: number };

export type Props = NumberInputProps & {
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
  };
};

const DEFAULT_SIZE = 0.875;

const Slider = React.forwardRef<HTMLInputElement, Props & BaseReactInputHTMLAttributes>(
  (
    {
      min = 0,
      max = 100,
      defaultValue = max / 2,
      step = 1,
      marks,
      lockOnMarks = false,
      zeroPercentageOnEdgeMarks = false,
      inchange,
      formatRegExp,
      chart,
      ...props
    },
    ref
  ) => {
    const [classNames, rest] = useClassnames("slider shadow__inset-small", props);
    const [value, setValue] = useState<number>(defaultValue);
    const [prevKey, setPrevKey] = useState<string>("0");
    const [onHover, setOnHover] = useState<boolean>(false);
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
        return ((num - min) / (max - min)) * 100;
      },
      [value, min, max]
    );

    const calcValue = useCallback(
      (percentage: number): number => {
        return (percentage / 100) * max;
      },
      [max]
    );

    const calcPosition = (mark: SliderMarkProp, last: boolean): number | undefined => {
      const { value: markValue, label } = mark;
      if (!last) {
        return calcPercentage(markValue) - 0.55 * String(label).length;
      } else if (markValue === min) {
        return 0;
      } else {
        return undefined;
      }
    };

    const calcBarHeight = (data: SliderChartDataProp) => {
      const { width, percentage } = data;
      if (percentage) {
        console.log(percentage);
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
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

      // TODO: Numeric keyboard comment
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

        // if (valueAsNumber > targetValue) {
        //   const val = nextValue.value;
        //   setSliderStep(val - targetValue);
        //   setValue(val);
        // } else {
        //   const val = prevValue.value;
        //   setSliderStep(targetValue - val);
        //   setValue(val);
        // }
        const marksValues = marks.map(mark => mark.value);
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

    return (
      <div className="slider__wrapper flex-column-flex-start-center">
        {chart && (
          <div className="slider__chart flex-row-flex-start-center">
            {chart.data.map((datum, i) => {
              return <div key={i} className="slider__chart__bar" style={{ height: `${calcBarHeight(datum)}%` }}></div>;
            })}
          </div>
        )}
        <div
          className="slider__field flex-column-flex-start-stretch"
          onMouseEnter={() => setOnHover(true)}
          onMouseLeave={() => setOnHover(false)}
          onClickCapture={() => setOnHover(true)}
          onTouchMove={() => setOnHover(true)}
          onTouchEnd={() => setOnHover(false)}
        >
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
            list="tickmarks"
            {...rest}
          >
            <span className="slider__bar shadow__inset-small">
              <span ref={progressRef} className="slider__bar__progress" />
            </span>
          </Input.BaseInput>
          <div
            className="slider__thumb flex-row-center-center"
            style={{
              left: `${calcPercentage()}%`,
              width: `${size}em`,
              height: `${size}em`,
            }}
            tabIndex={0}
            onKeyDown={e => handleKeyDown(e)}
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
              const { label } = mark;

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
                  {label}
                </span>
              );
            })}
          </div>
        )}
      </div>
    );
  }
);

export default Slider;

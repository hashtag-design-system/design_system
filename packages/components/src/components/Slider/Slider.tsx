import React, { useCallback, useEffect, useRef, useState } from "react";
import { useClassnames } from "../../utils/hooks";
import Input, { BaseReactInputHTMLAttributes, NumberInputProps } from "../Input";

// See -> https://www.youtube.com/watch?v=zOA2vpx44Nw
// See -> https://www.youtube.com/watch?v=mvq8uOGFqlc
// See -> https://www.youtube.com/watch?v=MxbEjINYIPc

export type Props = NumberInputProps & {
  marks: { value: number; label: string }[];
  lockOnMarks?: boolean;
  zeroPercentageOnEdgeMakrs?: boolean;
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
      zeroPercentageOnEdgeMakrs = false,
      inchange,
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
      setValue(value => value + step);
    };

    const dcr = () => {
      setValue(value => value - step);
    };

    const calcPercentage = useCallback((): number => {
      return ((value - min) / (max - min)) * 100;
    }, [value, min, max]);

    const calcValue = useCallback(
      (percentage: number): number => {
        return (percentage / 100) * max;
      },
      [max]
    );

    const calcPosition = (markValue: number, idx: number, last: boolean): number | undefined => {
      let value: number = calcValue(markValue);
      if (!last) {
        if (zeroPercentageOnEdgeMakrs && idx === 0) {
          value = 0;
        } else {
          value = value - (window.outerWidth >= 700 ? 1 : 1.75);
        }
        return value;
      } else {
        return undefined;
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      const { key } = e;

      if (key === "ArrowRight" || key === "ArrowUp") {
        incr();
      } else if (key === "ArrowLeft" || key === "ArrowDown") {
        dcr();
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { valueAsNumber } = e.target;

      if (lockOnMarks) {
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
          setValue(val);
        } else {
          const val = prevValue.value;
          setSliderStep(targetValue - val);
          setValue(val);
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
      <div className="slider__wrapper flex-column-center" onMouseEnter={() => setOnHover(true)} onMouseLeave={() => setOnHover(false)}>
        <div
          className="slider__field flex-column-stretch"
          role="slider"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
          {...rest}
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
            {...rest}
          >
            <span className="slider__bar shadow__inset-small">
              <span ref={progressRef} className="slider__bar__progress" />
            </span>
          </Input.BaseInput>
          <div
            className="slider__value flex-row-center"
            style={{
              left: `${calcPercentage()}%`,
              width: `${size}em`,
              height: `${size}em`,
            }}
            tabIndex={0}
            onKeyDown={e => handleKeyDown(e)}
          >
            <span className="slider__value__span body-16">{value}</span>
          </div>
        </div>
        <div className="slider__marks flex-row-flex-start">
          {marks.map(({ value, label }, i) => {
            const last = i === marks.length - 1;
            return (
              <span
                key={i}
                className="body-14"
                style={{
                  right: `${zeroPercentageOnEdgeMakrs && last ? "0" : ""}`,
                  left: `${calcPosition(value, i, last)}%`,
                }}
              >
                {label}
              </span>
            );
          })}
        </div>
      </div>
    );
  }
);

export default Slider;

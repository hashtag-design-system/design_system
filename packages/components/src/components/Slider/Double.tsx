import React, { useCallback, useEffect, useRef, useState } from "react";
import { SliderProps } from ".";
import { calculatePercentage, calculateValue } from "../../utils";
import { useClassnames, useWindowDimensions } from "../../utils/hooks";
import Input, { BaseReactInputHTMLAttributes } from "../Input";
import { SliderThumbProp } from "./Slider";

export type SliderMarkProp = { value: number; label?: string };
type SliderChartDataProp = { value: number };

type ThumbNumberStateType = { lThumb: number; rThumb: number };
type ThumbStringLiteralType = "lThumb" | "rThumb";

export type Props = Omit<SliderProps, "value" | "defaultValue" | "lockOnMarks"> & {
  lThumb?: SliderThumbProp;
  rThumb?: SliderThumbProp;
};

const DEFAULT_SIZE = 0.875;

const Double: React.FC<
  Omit<React.ComponentPropsWithRef<"input">, "value" | "defaultValue"> &
    Props &
    Omit<BaseReactInputHTMLAttributes, "value" | "defaultValue">
> = ({
  min = 0,
  max = 100,
  rThumb = { defaultValue: max / 4 },
  lThumb = { defaultValue: max / 4 },
  step = 1,
  marks,
  zeroPercentageOnEdgeMarks = false,
  inchange,
  formatRegExp,
  chart,
  ref,
  ...props
}) => {
  const [classNames, rest] = useClassnames("slider double shadow__inset-sm", props);
  const [value, setValue] = useState<ThumbNumberStateType>({
    lThumb: lThumb.defaultValue!,
    rThumb: rThumb.defaultValue!,
  });
  const [prevKey, setPrevKey] = useState<string>("0");
  const [onHover, setOnHover] = useState<{ lThumb: boolean; rThumb: boolean }>({ lThumb: false, rThumb: false });
  const [size, setSize] = useState<ThumbNumberStateType>({ lThumb: DEFAULT_SIZE, rThumb: DEFAULT_SIZE });
  const [chartOverlayLeft, setChartOverlayLeft] = useState<number>(0);
  const windowDimensions = useWindowDimensions();

  const progressRef = useRef<HTMLSpanElement>(null);
  const chartFrameRef = useRef<HTMLDivElement>(null);
  const chartOverlayFrameRef = useRef<HTMLDivElement>(null);
  const chartOverlay = useRef<HTMLDivElement>(null);

  const incr = (thumb: ThumbStringLiteralType) => {
    console.log("incr");

    console.log(thumb);
    console.log(step);

    setCheckValue(thumb, value[thumb] + step);
  };

  const dcr = (thumb: ThumbStringLiteralType) => {
    console.log("dcr");

    console.log(thumb);
    console.log(step);
    setCheckValue(thumb, value[thumb] - step);
  };

  const calcPercentage = useCallback(
    (number: number): number => {
      const res = calculatePercentage(number, min, max);
      return res;
    },
    [min, max]
  );

  const calcValue = useCallback(
    (percentage: number): number => {
      const res = calculateValue(percentage, max);
      return res;
    },
    [max]
  );

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

  const handleHover = (e: React.MouseEvent<HTMLInputElement, MouseEvent> | React.TouchEvent<HTMLInputElement>, isHover: boolean) => {
    setOnHover({
      ...onHover,
      [e.currentTarget.name]: isHover,
    });
  };

  // Methods to be used to check and set correctly the thumb values accordingly
  const setLeftValue = (valueAsNumber: number) => {
    const newValue = Math.min(valueAsNumber, max - value.rThumb - step);

    setValue(prevValue => ({
      ...prevValue,
      lThumb: newValue,
    }));
  };

  const setRightValue = (valueAsNumber: number) => {
    const newValue = Math.min(valueAsNumber, max - value.lThumb - step);

    setValue(prevValue => ({
      ...prevValue,
      rThumb: newValue,
    }));
  };

  const setCheckValue = (name: ThumbStringLiteralType, newValue: number) => {
    if (name === "lThumb") {
      setLeftValue(newValue);
    } else if (name === "rThumb") {
      setRightValue(newValue);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    const { key, currentTarget } = e;
    const attributes = currentTarget.attributes.getNamedItem("name");

    if (!attributes) {
      return 0;
    }

    const { value: untypedName } = attributes;

    const name = untypedName as ThumbStringLiteralType;
    if (key === "ArrowRight" || key === "ArrowUp") {
      if (name === "lThumb") {
        incr(name);
      } else {
        dcr(name);
      }
    } else if (key === "ArrowLeft" || key === "ArrowDown") {
      if (name === "lThumb") {
        dcr(name);
      } else {
        incr(name);
      }
    }

    // Move thumb and change value, directly from numeric keyboard
    if (!isNaN(+key)) {
      const numKey = parseInt(key);
      const number = calcValue(numKey * 10);
      if (numKey === 0 && prevKey === "1") {
        setCheckValue(name, max);
      } else {
        if (name === "rThumb") {
          setCheckValue(name, number - 10);
        } else {
          setCheckValue(name, number);
        }
      }
    }

    setPrevKey(key);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { valueAsNumber, name: untypedName } = e.target;
    const name = untypedName as ThumbStringLiteralType;

    setCheckValue(name, valueAsNumber);

    if (inchange) {
      inchange(valueAsNumber);
    }
  };

  const setProgress = useCallback(() => {
    if (progressRef && progressRef.current) {
      const { lThumb, rThumb } = value;

      progressRef.current.style.left = `${calcPercentage(lThumb)}%`;
      progressRef.current.style.right = `${calcPercentage(rThumb)}%`;
    }
  }, [calcPercentage, value]);

  const setSizeCallaback = useCallback(() => {
    const { lThumb, rThumb } = onHover;
    if (lThumb || rThumb) {
      const valueLength = String(max).length;
      let newValue: number = DEFAULT_SIZE * 1.75;

      if (valueLength > 3) {
        newValue = newValue + (valueLength - 3) * 0.4;
      }

      if (lThumb) {
        setSize(prevSize => ({ ...prevSize, lThumb: newValue }));
      } else {
        setSize(prevSize => ({ ...prevSize, rThumb: newValue }));
      }
    } else {
      setSize({ lThumb: DEFAULT_SIZE, rThumb: DEFAULT_SIZE });
    }
  }, [max, onHover]);

  useEffect(() => {
    setProgress();
  }, [setProgress]);

  useEffect(() => {
    setSizeCallaback();
  }, [setSizeCallaback]);

  useEffect(() => {
    if (chartFrameRef && chartFrameRef.current && chartOverlayFrameRef && chartOverlayFrameRef.current) {
      chartOverlayFrameRef.current.style.width = `${chartFrameRef.current.offsetWidth}px`;
    }
  }, [windowDimensions.width, chartFrameRef, chartOverlayFrameRef]);

  useEffect(() => {
    if (chartOverlay && chartOverlay.current) {
      setChartOverlayLeft(chartOverlay.current.offsetLeft);
    }
  }, [chartOverlay, value]);

  return (
    <div className="slider__wrapper flex-column-flex-start-center">
      {chart && (
        <div className="slider__chart flex-column-flex-start-flex-start" data-onhover={onHover.lThumb || onHover.rThumb}>
          <div
            className="slider__chart__overlay"
            style={{ right: `${calcPercentage(value.rThumb)}%`, left: `${calcPercentage(value.lThumb)}%` }}
            ref={chartOverlay}
          >
            <div
              className="slider__chart__frame slider__chart__frame__overlay"
              style={{ left: `-${chartOverlayLeft}px` }}
              ref={chartOverlayFrameRef}
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
      <div
        className="slider__field flex-column-flex-start-stretch"
        onMouseLeave={() => setOnHover({ lThumb: false, rThumb: false })}
        onTouchEnd={() => setOnHover({ lThumb: false, rThumb: false })}
      >
        <Input.BaseInput
          type="range"
          min={min}
          max={max}
          step={step}
          value={value.lThumb}
          className={classNames}
          onChange={e => handleChange(e)}
          ref={ref}
          tabIndex={-1}
          role="slider"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value.lThumb}
          name="lThumb"
          onMouseEnter={e => handleHover(e, true)}
          onTouchMove={e => handleHover(e, true)}
          onMouseLeave={e => handleHover(e, false)}
          onTouchEnd={e => handleHover(e, false)}
          onKeyDown={e => handleKeyDown(e)}
          {...rest}
        />
        <span className="slider__bar shadow__inset-sm double">
          <span ref={progressRef} className="slider__bar__progress double" />
        </span>
        <Input.BaseInput
          type="range"
          min={min}
          max={max}
          step={step}
          value={value.rThumb}
          className={classNames}
          onChange={e => handleChange(e)}
          ref={ref}
          tabIndex={-1}
          role="slider"
          name="rThumb"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value.rThumb}
          onMouseEnter={e => handleHover(e, true)}
          onTouchMove={e => handleHover(e, true)}
          onMouseLeave={e => handleHover(e, false)}
          onTouchEnd={e => handleHover(e, false)}
          onKeyDown={e => handleKeyDown(e)}
          {...rest}
        />
        <div
          className="slider__thumb left"
          style={{
            left: `${calcPercentage(value.lThumb)}%`,
            width: `${size.lThumb}em`,
            height: `${size.lThumb}em`,
          }}
          tabIndex={0}
          data-onhover={onHover.lThumb}
        >
          <span className="slider__thumb__value body-16">
            {formatRegExp ? String(value.lThumb).replaceAll(formatRegExp.searchValue, formatRegExp.replaceValue) : value.lThumb}
          </span>
        </div>
        <div
          className="slider__thumb right"
          style={{
            right: `${calcPercentage(value.rThumb)}%`,
            width: `${size.rThumb}em`,
            height: `${size.rThumb}em`,
          }}
          tabIndex={0}
          data-onhover={onHover.rThumb}
        >
          <span className="slider__thumb__value body-16">
            {formatRegExp
              ? String(max - value.rThumb).replaceAll(formatRegExp.searchValue, formatRegExp.replaceValue)
              : max - value.rThumb}
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

Double.displayName = "SliderDouble";

export default Double;

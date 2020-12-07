import React, { useCallback, useEffect, useRef, useState } from "react";
import { SliderProps } from ".";
import { calculatePercentage, calculateValue } from "../../utils";
import { SliderContextProvider } from "../../utils/contexts/SliderContext";
import { useClassnames, useWindowDimensions } from "../../utils/hooks";
import Input, { BaseReactInputHTMLAttributes } from "../Input";
import { SliderThumbProp } from "./Slider";
import { Bar } from "./__helpers__/Bar";
import { Chart } from "./__helpers__/Chart";
import { Marks } from "./__helpers__/Marks";
import { Thumb } from "./__helpers__/Thumb";

export type SliderMarkProp = { value: number; label?: string };
type SliderChartDataProp = { value: number };

type ThumbNumberStateType = { lThumb: number; rThumb: number };
type ThumbStringLiteralType = "lThumb" | "rThumb";

export type Props = Omit<SliderProps, "value" | "defaultValue" | "lockOnMarks" | "thumb"> & {
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
    setCheckValue(thumb, value[thumb] + step);
  };

  const dcr = (thumb: ThumbStringLiteralType) => {
    setCheckValue(thumb, value[thumb] - step);
  };

  const calcPercentage = useCallback(
    (number?: number): number => {
      if (!number) {
        return 0;
      }
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
    e.preventDefault();
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
      <div className="slider__wrapper flex-column-flex-start-center">
        <Chart
          value={value}
          onHover={onHover.lThumb || onHover.rThumb}
          style={{ right: `${calcPercentage(value.rThumb)}%`, left: `${calcPercentage(value.lThumb)}%` }}
        />
        <div
          className="slider__field"
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
          <Bar ref={progressRef} className="double" />
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
          <Thumb value={value.lThumb} onHover={onHover.lThumb} size={size.lThumb} thumb={lThumb} className="left" />
          <Thumb value={value.rThumb} onHover={onHover.rThumb} size={size.rThumb} thumb={rThumb} className="right" />
        </div>
        <Marks />
      </div>
    </SliderContextProvider>
  );
};

Double.displayName = "SliderDouble";

export default Double;

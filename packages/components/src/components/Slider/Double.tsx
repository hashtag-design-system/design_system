import React, { useCallback, useEffect, useRef, useState } from "react";
import { calculatePercentage, calculateValue } from "../../utils";
import { SliderContextProvider } from "../../utils/contexts/SliderContext";
import { useClassnames, useDisabled } from "../../utils/hooks";
import Input from "../Input";
import { SliderFProps } from "./index";
import { SliderThumbProp } from "./Slider";
import { Bar } from "./__helpers__/Bar";
import { Chart } from "./__helpers__/Chart";
import { Marks } from "./__helpers__/Marks";
import { Thumb } from "./__helpers__/Thumb";

export type SliderMarkProp = { value: number; label?: string };

type ThumbNumberStateType = { lThumb: number; rThumb: number };
export type ThumbStringLiteralType = "lThumb" | "rThumb";

export type Props = {
  lThumb?: SliderThumbProp;
  rThumb?: SliderThumbProp;
};

export type FProps = Props & Omit<SliderFProps, "lockOnMarks" | "thumb">;

const DEFAULT_SIZE = 0.875;

const Double: React.FC<FProps> = ({
  min = 0,
  max = 100,
  rThumb = { defaultValue: max / 4, state: "default" },
  lThumb = { defaultValue: max / 4, state: "default" },
  step = 1,
  marks,
  zeroPercentageOnEdgeMarks = false,
  onChange,
  chart,
  ref,
  ...props
}) => {
  const { defaultValue: lThumbDefaultValue = max / 4, state: lThumbState = "default" } = lThumb;
  const { defaultValue: rThumbDefaultValue = max / 4, state: rThumbState = "default" } = rThumb;

  const [classNames, rest] = useClassnames("slider double shadow__inset-sm", props);
  const isDisabled = useDisabled(props) || lThumbState === "disabled" || rThumbState === "disabled";
  const [value, setValue] = useState<ThumbNumberStateType>({
    lThumb: lThumbDefaultValue,
    rThumb: rThumbDefaultValue,
  });
  const [prevKey, setPrevKey] = useState<string>("0");
  const [onHover, setOnHover] = useState<{ lThumb: boolean; rThumb: boolean }>({
    lThumb: false || (lThumbState === "hover" && !isDisabled),
    rThumb: false || (rThumbState === "hover" && !isDisabled),
  });

  const [size, setSize] = useState<ThumbNumberStateType>({ lThumb: DEFAULT_SIZE, rThumb: DEFAULT_SIZE });

  const progressRef = useRef<HTMLSpanElement>(null);

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

  const handleHover = (isHover: boolean, e?: React.MouseEvent<HTMLInputElement, MouseEvent> | React.TouchEvent<HTMLInputElement>) => {
    if (e && !isDisabled) {
      const name = e.currentTarget.name;
      if (name === "lThumb" && lThumbState !== "hover") {
        setOnHover({
          ...onHover,
          [name]: isHover,
        });
      } else if (name === "rThumb" && rThumbState !== "hover") {
        setOnHover({
          ...onHover,
          [name]: isHover,
        });
      }
    } else {
      if (lThumbState !== "hover" && rThumbState !== "hover") {
        setOnHover({ lThumb: isHover, rThumb: isHover });
      }
    }
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

    if (onChange) {
      onChange(e);
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
    if ((lThumb || rThumb) && !isDisabled) {
      const valueLength = String(max).length;
      let newValue: number = DEFAULT_SIZE * 1.75;

      if (valueLength > 3) {
        newValue = newValue + (valueLength - 3) * 0.4;
      }

      Object.entries(onHover).forEach(entry => {
        if (entry[1] === true) {
          setSize(prevSize => ({ ...prevSize, [entry[0]]: newValue }));
        }
      });
    } else {
      setSize({ lThumb: DEFAULT_SIZE, rThumb: DEFAULT_SIZE });
    }
  }, [max, onHover, isDisabled]);

  useEffect(() => {
    setProgress();
  }, [setProgress]);

  useEffect(() => {
    setSizeCallaback();
  }, [setSizeCallaback]);

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
        <Chart
          value={value}
          style={{ right: `${calcPercentage(value.rThumb)}%`, left: `${calcPercentage(value.lThumb)}%` }}
        />
        <div className="slider__field" onMouseLeave={() => handleHover(false)} onTouchEnd={() => handleHover(false)}>
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
            disabled={isDisabled}
            name="lThumb"
            onMouseEnter={e => handleHover(true, e)}
            onTouchMove={e => handleHover(true, e)}
            onMouseLeave={e => handleHover(false, e)}
            onTouchEnd={e => handleHover(false, e)}
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
            disabled={isDisabled}
            onMouseEnter={e => handleHover(true, e)}
            onTouchMove={e => handleHover(true, e)}
            onMouseLeave={e => handleHover(false, e)}
            onTouchEnd={e => handleHover(false, e)}
            onKeyDown={e => handleKeyDown(e)}
            {...rest}
          />
          <Thumb
            value={value.lThumb}
            onHover={onHover.lThumb}
            size={size.lThumb}
            thumb={lThumb}
            focusVisible={lThumbState === "focus-visible"}
            className="left"
          />
          <Thumb
            value={value.rThumb}
            onHover={onHover.rThumb}
            size={size.rThumb}
            thumb={rThumb}
            focusVisible={rThumbState === "focus-visible"}
            className="right"
          />
        </div>
        <Marks />
      </div>
    </SliderContextProvider>
  );
};

Double.displayName = "SliderDouble";

export default Double;

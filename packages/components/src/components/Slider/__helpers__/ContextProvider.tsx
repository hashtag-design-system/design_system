import React, { useCallback } from "react";
import { SliderProps } from "..";
import { SliderContextProvider, SliderContextType } from "../../../utils/contexts/SliderContext";

export type Props = {
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
} & Omit<SliderProps, "marks" | "lockOnMarks" | "zeroPercentageOnEdgeMarks">;

export const ContextProvider: React.FC<Props> = ({
  value,
  setValue,
  min = 0,
  max = 100,
  defaultValue = max / 2,
  step = 1,
  children,
}) => {
  // const incr = () => {
  //   return value + step;
  // };

  // const dcr = () => {
  //   return value - step;
  // };

  // Calculate the percentage of the value
  const calcPercentage = useCallback(
    (markValue?: number): number => {
      const num = markValue !== undefined ? markValue : value;
      return ((num - min) / (max - min)) * 100;
    },
    [value, min, max]
  );

  // Calculate the value from the percentage
  const calcValue = useCallback(
    (percentage: number): number => {
      return (percentage / 100) * max;
    },
    [max]
  );

  // const calcPosition = (markValue: number, idx: number, last: boolean): number | undefined => {
  //   let value: number = calcValue(markValue);
  //   if (!last) {
  //     if (zeroPercentageOnEdgeMarks && idx === 0) {
  //       value = 0;
  //     } else {
  //       value = value - (window.outerWidth >= 700 ? 1 : 1.75);
  //     }
  //     return value;
  //   } else {
  //     return undefined;
  //   }
  // };

  const providerValue: SliderContextType = {
    min,
    max,
    defaultValue,
    step,
    value,
    setValue,
    calcValue,
    calcPercentage,
  };

  return <SliderContextProvider value={providerValue}>{children}</SliderContextProvider>;
};

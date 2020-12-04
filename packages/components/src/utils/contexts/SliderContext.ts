import React from "react";
import { createCtx } from "../createCtx";

export type SliderContextType = {
  min: number;
  max: number;
  defaultValue: number;
  step: number;
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
  calcValue: (percentage: number) => number;
  calcPercentage: (markValue?: number) => number;
  // incr: () => void;
  // dcr: () => void;
};

export const [useSliderContext, SliderContextProvider] = createCtx<SliderContextType>();

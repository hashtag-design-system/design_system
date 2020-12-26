import { round } from "./index";

export const calculateValue = (percentage: number, max: number): number => {
  return (percentage / 100) * max;
};

export const calculatePercentage = (number: number, min: number, max: number, options?: { returnRounded?: boolean }): number => {
  const percentage = ((number - min) / (max - min)) * 100;
  if (!options) {
    return round(percentage);
  }
  const { returnRounded = true } = options;
  if (returnRounded) {
    return round(percentage);
  } else {
    return percentage;
  }
};

// https://stackoverflow.com/questions/11832914/round-to-at-most-2-decimal-places-only-if-necessary
export const round = (number: number): number => {
  return Math.round((number + Number.EPSILON) * 100) / 100;
};

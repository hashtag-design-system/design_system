export const useDisabled = <T>(props: T | any) => {
  const { state, "aria-disabled": ariaDisabled, disabled } = props;
  return state === "disabled" || ariaDisabled || disabled;
};

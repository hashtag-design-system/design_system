export const useDisabled = <T>(props: any | T) => {
  const { state, "aria-disabled": ariaDisabled, disabled } = props;
  return state === "disabled" || ariaDisabled || disabled;
};

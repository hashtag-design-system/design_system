export const isComponentDisabled = <T extends {}>(props: T | any, state?: string): boolean => {
  const { "aria-disabled": ariaDisabled, disabled } = props;
  // finalState
  let fState = state ? state : props.state;
  return (fState && fState.includes("disabled")) || ariaDisabled || disabled;
};

export const useDisabled = <T extends {}>(props: T | any, state?: string): boolean => {
  return isComponentDisabled(props, state);
};


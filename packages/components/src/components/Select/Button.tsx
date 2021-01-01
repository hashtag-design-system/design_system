import React, { useEffect } from "react";
import { useSelectContext } from "../../utils/contexts";
import { useClassnames, useDisabled } from "../../utils/hooks";
import { ButtonProps } from "../Button";
import { ComponentProps } from "../__helpers__";
import { DownArrowIcon } from "./__icons__/DownArrowIcon";

export type Props = {
  showValue?: boolean;
};

export type FProps = Props & ComponentProps<"summary", false> & Pick<ButtonProps, "state">;

export type SBProps = Props & Pick<FProps, "state" | "className">

export const Button: React.FC<FProps> = ({ state, className, showValue = true, children, ...props }) => {
  const [classNames, rest] = useClassnames<FProps>("select__btn btn btn-secondary", props, { stateToRemove: { state } });
  const { value, ref, setIsDisabled } = useSelectContext();
  const isDisabled = useDisabled<boolean>(props, state);

  useEffect(() => {
    setIsDisabled(isDisabled);
  }, [isDisabled, setIsDisabled])

  return (
    <summary ref={ref} className={classNames} data-testid="select-btn" {...rest}>
      <p style={{ width: rest.style?.width }}>{value && showValue ? value : children}</p>
      <DownArrowIcon />
    </summary>
  );
};

Button.displayName = "SelectButton";

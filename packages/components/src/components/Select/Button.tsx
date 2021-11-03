import React, { useEffect } from "react";
import { useClassnames, useDisabled, useSelectContext } from "../../utils";
import { ButtonProps } from "../Button";
import { ComponentProps } from "../__helpers__";
import { DownArrowIcon } from "./__icons__/DownArrowIcon";

export type Props = {
  showValue?: boolean;
};

export type FProps = Props & ComponentProps<"summary", false> & Pick<ButtonProps, "state">;

export type SBProps = Props & Pick<FProps, "state" | "className">;

export const Button: React.FC<FProps> = ({ state, showValue = true, style, children, ...props }) => {
  const [classNames, rest] = useClassnames<FProps>("select__btn btn btn-secondary", props, { stateToRemove: { state } });
  const { value, ref, width, setIsDisabled } = useSelectContext();
  const isDisabled = useDisabled<boolean>(props, state);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.code === "Tab") e.currentTarget.blur();
  };

  useEffect(() => setIsDisabled(isDisabled), [isDisabled, setIsDisabled]);

  return (
    <summary
      onKeyDown={e => handleKeyDown(e)}
      style={{ width, ...style }}
      ref={ref}
      className={classNames}
      data-testid="select-btn"
      {...rest}
    >
      <div>{value && showValue ? value : children}</div>
      <DownArrowIcon />
    </summary>
  );
};

Button.displayName = "SelectButton";

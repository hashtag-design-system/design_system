import React from "react";
import { useSelectContext } from "../../utils/contexts";
import { useClassnames } from "../../utils/hooks";
import { ComponentProps } from "../__helpers__";
import { DownArrowIcon } from "./__icons__/DownArrowIcon";

export type Props = {
  showValue?: boolean;
};

export type FProps = Props & ComponentProps<"summary", false>;

export const Button: React.FC<FProps> = ({ className, showValue = true, children, ...props }) => {
  const [classNames, rest] = useClassnames<FProps>("select__btn btn btn-secondary", props);
  const { value, ref } = useSelectContext();

  return (
    <summary ref={ref} className={classNames} data-testid="select-btn" {...rest}>
      <p style={{ width: rest.style?.width }}>{value && showValue ? value : children}</p>
      <DownArrowIcon />
    </summary>
  );
};

Button.displayName = "SelectButton";

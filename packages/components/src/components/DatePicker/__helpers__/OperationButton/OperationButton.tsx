import React from "react";
import { DatePickerCalendarOperation } from "../../index";
import { useDatePickerContext } from "../../../../utils/contexts";
import { useClassnames } from "../../../../utils/hooks";
import Button, { ButtonFProps } from "../../../Button";

type Props = {
  operation: DatePickerCalendarOperation;
};

type FProps = Props & ButtonFProps;

export const OperationButton: React.FC<FProps> = ({ variant = "secondary", operation, children, ...props }) => {
  const [classNames, rest] = useClassnames("date-picker__months-container__btn", props);

  const { handleOperation } = useDatePickerContext();

  return (
    <Button
      variant={variant}
      className={classNames}
      onClick={() => handleOperation(operation)}
      data-testid="date-picker-operation-btn"
      {...rest}
    >
      {children}
    </Button>
  );
};

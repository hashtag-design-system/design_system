import React from "react";
import { useClassnames, useDatePickerContext } from "../../../../utils";
import Button, { ButtonFProps } from "../../../Button";
import { DatePickerCalendarOperation } from "../../index";

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

import React from "react";
import { useDialogContext } from "../../../utils/contexts";
import Button, { ButtonFProps } from "../../Button";
import Close from "./Close";
import Group from "./Group";

export type FProps = ButtonFProps;

type SubComponents = {
  Group: typeof Group;
  Close: typeof Close;
};

const Btn: React.FC<FProps> & SubComponents = ({ onClick, children, ...props }) => {
  const { handleDismiss } = useDialogContext();

  return (
    <Button onClick={e => handleDismiss(e, onClick)} data-testid="dialog-btn" {...props}>
      {children}
    </Button>
  );
};

Btn.displayName = "DialogBtn";
Btn.Group = Group;
Btn.Close = Close;

export default Btn;

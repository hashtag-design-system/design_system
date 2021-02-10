import React from "react";
import { useClassnames, useConfigContext, useDialogContext } from "../../../utils";
import Animated from "../../Animated";
import Button, { ButtonFProps } from "../../Button";
import Close from "./Close";
import Group from "./Group";

export type Props = {
  confirm?: boolean;
};

export type FProps = Props & ButtonFProps;

type SubComponents = {
  Group: typeof Group;
  Close: typeof Close;
};

const Btn: React.FC<FProps> & SubComponents = ({ confirm = false, onClick, children, ...props }) => {
  const { loading, allowDismissOnLoading, handleDismiss } = useDialogContext();
  const [classNames, rest] = useClassnames(
    loading ? `loading ${(loading && !allowDismissOnLoading) || (loading && confirm) ? "dismiss-onloading" : ""}` : "",
    props
  );

  const {
    colors: { grey },
  } = useConfigContext();

  return (
    <Button
      variant={confirm ? "primary" : "secondary"}
      className={classNames}
      onClick={e => handleDismiss(e, { cancel: !confirm }, onClick)}
      data-testid="dialog-btn"
      {...rest}
    >
      {confirm && loading && <Animated.Loading.Spinner size="20px" color={grey["100"]} circleProps={{ strokeWidth: 5 }} />}
      {children}
    </Button>
  );
};

Btn.displayName = "DialogBtn";
Btn.Group = Group;
Btn.Close = Close;

export default Btn;

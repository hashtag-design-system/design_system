import React from "react";
import { useDialogContext } from "../../utils/contexts";
import { useClassnames } from "../../utils/hooks";
import { ComponentProps } from "../__helpers__";

export type FProps = ComponentProps<"div"> & Required<React.PropsWithChildren<unknown>>;

const Content: React.FC<FProps> = ({ style, children, ...props }) => {
  const { confirm, hasBtnGroup } = useDialogContext();

  const [classNames, rest] = useClassnames(`dialog__content ${confirm ? "confirm" : ""}`, props);

  return (
    <div
      className={classNames}
      style={{ padding: confirm || hasBtnGroup ? "1.5em" : undefined, ...style }}
      data-testid="dialog-content"
      {...rest}
    >
      {children}
    </div>
  );
};

Content.displayName = "DialogContent";

export default Content;

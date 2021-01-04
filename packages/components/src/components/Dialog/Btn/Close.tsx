import React from "react";
import { useDialogContext } from "../../../utils/contexts";
import { useClassnames } from "../../../utils/hooks";
import Button, { ButtonFProps } from "../../Button";

export type FProps = ButtonFProps;

const Close: React.FC<FProps> = ({ onClick, ...props }) => {
  const [classNames, rest] = useClassnames("dialog__btn", props);
  const { handleDismiss } = useDialogContext();

  return (
    <Button className={classNames} onClick={e => handleDismiss(e, onClick)} data-testid="dialog-btn-close" {...rest}>
      <svg
        width="1em"
        height="1em"
        className="icon"
        data-testid="icon"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M3 20.82L11.91 12m0 0L21 3m-9.09 9L3 3.18M11.91 12L21 21" strokeWidth={2} strokeLinecap="round" />
      </svg>
    </Button>
  );
};

Close.displayName = "DialogBtnClose";

export default Close;

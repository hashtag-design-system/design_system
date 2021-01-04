import { ButtonFProps } from "../../components/Button";
import { DialogProps } from "../../components/Dialog";
import { createCtx } from "../createCtx";

export type DialogContextType = Required<Pick<DialogProps, "confirm">> & {
  hasBtnGroup: boolean;
  handleDismiss: (e: React.MouseEvent<HTMLButtonElement>, onClick?: ButtonFProps["onClick"]) => void;
};

export const [DialogContextProvider, useDialogContext] = createCtx<DialogContextType>();

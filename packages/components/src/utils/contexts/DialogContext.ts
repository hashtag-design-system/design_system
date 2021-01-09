import { ButtonFProps } from "../../components/Button";
import { DialogFProps } from "../../components/Dialog";
import { createCtx } from "../createCtx";

export type DialogContextType = Required<Pick<DialogFProps, "confirm" | "allowDismissOnLoading">> &
  Pick<DialogFProps, "loading"> & {
    hasBtnGroup: boolean;
    handleDismiss: (e: React.MouseEvent<HTMLButtonElement>, info: { cancel: boolean }, onClick?: ButtonFProps["onClick"]) => void;
  };

export const [DialogContextProvider, useDialogContext] = createCtx<DialogContextType>();

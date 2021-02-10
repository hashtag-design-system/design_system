import { InputFProps } from "../../components/Input";
import { createCtx } from "../index";
import { ACTIONTYPE } from "../../components/Input/__helpers__/numberReducer";

export type InputContextType = InputFProps & {
  dispatch?: React.Dispatch<ACTIONTYPE>;
};
export const [InputContextProvider, useInputContext] = createCtx<InputContextType>();

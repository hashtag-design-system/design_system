import { InputFProps } from "../../components/Input";
import { createCtx } from "../createCtx";
import { ACTIONTYPE } from "../reducers/inputNumber";

export type InputContextType = InputFProps & {
  dispatch?: React.Dispatch<ACTIONTYPE>;
};
export const [InputContextProvider, useInputContext] = createCtx<InputContextType>();

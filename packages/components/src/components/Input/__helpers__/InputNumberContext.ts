import { createCtx } from "../../../utils";
import { useInput } from "./index";
import { InputNumberGroupProps } from "../index";

export type InputNumberContextType = InputNumberGroupProps & ReturnType<typeof useInput>;

export const [InputNumberContextProvider, useInputNumberContext] = createCtx<InputNumberContextType>();

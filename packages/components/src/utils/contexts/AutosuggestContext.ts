import { AutosuggestFProps } from "../../components/Autosuggest";
import { createCtx } from "../createCtx";

type ValueType = string | number | undefined;

export type AutosuggestContextType = Pick<AutosuggestFProps, "filterById"> & {
  // Not "value", so that to not ovveride the "value" property
  // in the SelectContext
  inputValue: ValueType;
  key: string;
  setKey: React.Dispatch<React.SetStateAction<string>>;
  handleFocus: (e: React.FocusEvent<HTMLInputElement>) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const [AutosuggestContextProvider, useAutosuggestContext] = createCtx<AutosuggestContextType>();

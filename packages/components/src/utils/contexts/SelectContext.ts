import { SelectProps } from "../../components/Select";
import { SelectedItems } from "../../components/Select/Select";
import { createCtx } from "../createCtx";

export type SelectContextType = Pick<SelectProps, "multiSelectable"> & {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onlyChild: boolean;
  value: string;
  selectedItems: SelectedItems[];
  setSelectedItems: React.Dispatch<React.SetStateAction<SelectedItems[]>>;
  handleToggle: (e: React.SyntheticEvent<HTMLElement>) => void;
  ref: ((instance: HTMLElement | null) => void) | React.RefObject<HTMLElement> | null | undefined;
};

export const [SelectContextProvider, useSelectContext] = createCtx<SelectContextType>();

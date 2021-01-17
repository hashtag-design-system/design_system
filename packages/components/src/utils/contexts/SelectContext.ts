import { SelectProps } from "../../components/Select";
import { SelectedItems } from "../../components/Select/Select";
import { createCtx } from "../createCtx";

export type SelectContextType = Pick<SelectProps, "multiSelectable" | "width"> & {
  isOpen: boolean;
  value: string;
  items: SelectedItems[];
  isMobile: boolean;
  modalRef: React.RefObject<HTMLDivElement> | ((instance: HTMLDivElement | null) => void);
  ref: ((instance: HTMLElement | null) => void) | React.RefObject<HTMLElement> | null | undefined;
  filterValue: string[];
  setFilterValue: React.Dispatch<React.SetStateAction<string[]>>;
  setItems: React.Dispatch<React.SetStateAction<SelectedItems[]>>;
  handleToggle: (e: React.SyntheticEvent<HTMLElement>, boolean?: boolean) => void;
  setIsDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  onSelect: ((selected: SelectedItems[]) => void) | undefined;
};

export const [SelectContextProvider, useSelectContext] = createCtx<SelectContextType>();

import { SelectProps } from "../../components/Select";
import { SelectedItems } from "../../components/Select/Select";
import { createCtx } from "../createCtx";

export type SelectContextType = Pick<SelectProps, "multiSelectable"> & {
  isOpen: boolean;
  onlyChild: boolean;
  value: string;
  selectedItems: SelectedItems[];
  isMobile: boolean;
  modalRef: React.RefObject<HTMLDivElement> | ((instance: HTMLDivElement | null) => void);
  setSelectedItems: React.Dispatch<React.SetStateAction<SelectedItems[]>>;
  handleToggle: (e: React.SyntheticEvent<HTMLElement>, boolean?: boolean) => void;
  ref: ((instance: HTMLElement | null) => void) | React.RefObject<HTMLElement> | null | undefined;
};

export const [SelectContextProvider, useSelectContext] = createCtx<SelectContextType>();

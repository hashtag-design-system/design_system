import { TableProps } from "../../components/Table";
import { SelectionInputsTableType } from "../../components/Table/Table";
import { createCtx } from "../createCtx";

export type TableContextType = Pick<TableProps, "extraColumn"> & {
  selectionInputs: SelectionInputsTableType[];
  setSelectionInputs: React.Dispatch<React.SetStateAction<SelectionInputsTableType[]>>;
  handleClick: (e: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLInputElement>, header?: boolean) => void;
};

export const [TableContextProvider, useTableContext] = createCtx<TableContextType>();

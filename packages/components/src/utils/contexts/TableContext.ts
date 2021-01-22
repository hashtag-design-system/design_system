import { TableProps } from "../../components/Table";
import { TableSelectionInputsTableType } from "../../components/Table/Table";
import { createCtx } from "../createCtx";

export type TableContextType = Pick<TableProps, "extraColumn"> & {
  selectionInputs: TableSelectionInputsTableType[];
  setSelectionInputs: React.Dispatch<React.SetStateAction<TableSelectionInputsTableType[]>>;
  handleClick: (
    e: React.MouseEvent<HTMLInputElement>,
    header?: {
      inteterminate: boolean;
    }
  ) => void;
};

export const [TableContextProvider, useTableContext] = createCtx<TableContextType>();

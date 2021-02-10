import { Dayjs } from "dayjs";
import { CheckboxState } from "../../components/Checkbox";
import { RadioButtonState } from "../../components/RadioButton";
import { TableProps } from "../../components/Table";
import { createCtx } from "../index";

export type TableContextType = Pick<TableProps, "extraColumn"> & {
  // selectionInputs: TableSelectionInputsTableType[];
  // setSelectionInputs: React.Dispatch<React.SetStateAction<TableSelectionInputsTableType[]>>;
  // handleClick: (
  //   e: React.MouseEvent<HTMLInputElement>,
  //   header?: {
  //     inteterminate: boolean;
  //   }
  // ) => void;
  selectionInputs: {
    id: string;
    isChecked: boolean;
    state: CheckboxState | RadioButtonState;
    latestChange: Dayjs;
  }[];
  selectionInputsRef: React.MutableRefObject<HTMLElement[] | null[]>;
  onClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
};

export const [TableContextProvider, useTableContext] = createCtx<TableContextType>();

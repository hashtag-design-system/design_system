import dayjs, { Dayjs } from "dayjs";
import MinMax from "dayjs/plugin/minMax";
import React, { useEffect, useRef, useState } from "react";
import { TableContextProvider } from "../../utils/contexts";
import { useClassnames } from "../../utils/hooks";
import TBody from "./TBody";
import Td from "./Td";
import Th from "./Th";
import THead from "./THead";
import Tr from "./Tr";

dayjs.extend(MinMax);

export const TableSelectionInputs = ["checkbox", "radio"] as const;

// TODO: Add the `Shift + click` <Checkbox /> keydown handler
export type TableSelectionInputsTableType = { id: string; isChecked: boolean; header: boolean; latestChange: Dayjs };
export type TableSelectionInputType = typeof TableSelectionInputs[number];

export type Props = {
  extraColumn?: {
    component: TableSelectionInputType;
    withBorderRight?: boolean;
    selectedRows?: (row: TableSelectionInputsTableType[]) => void;
  };
};

export type FProps = Props & React.ComponentProps<"table">;

type SubComponents = {
  Th: typeof Th;
  Tr: typeof Tr;
  Td: typeof Td;
  THead: typeof THead;
  TBody: typeof TBody;
};

const Table: React.FC<FProps> & SubComponents = ({ extraColumn, children, ...props }) => {
  const [selectionInputs, setSelectionInputs] = useState<TableSelectionInputsTableType[]>([]);
  const [classNames, rest] = useClassnames("table", props);
  const ref = useRef<HTMLTableElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLInputElement>, header?: { inteterminate: boolean }) => {
    const { currentTarget } = e;
    const id = currentTarget.id;
    // todo: Tets on checked === false when inteterminate

    // Opposite because state has not been updated
    const newChecked = !(currentTarget.value === "false" ? false : true);
    const latestChange = dayjs();

    if (extraColumn?.component === "checkbox") {
      const shiftKey = e.nativeEvent.shiftKey;

      setSelectionInputs(prevData =>
        prevData.map((input, idx) => {
          if (header) {
            return {
              ...input,
              isChecked: header.inteterminate ? false : newChecked,
              latestChange,
            };
          } else if (shiftKey) {
            const latestCheckedDate = dayjs.max(selectionInputs.map(input => input.latestChange));
            const latestCheckedIdx = selectionInputs.findIndex(
              input => input.isChecked && input.latestChange.isSame(latestCheckedDate)
            );
            const currentTargetIdx = selectionInputs.findIndex(({ id: inputId }) => inputId === id);

            if (currentTargetIdx >= latestCheckedIdx && idx <= currentTargetIdx && idx >= latestCheckedIdx) {
              return {
                ...input,
                isChecked: true,
                latestChange,
              };
            } else if (currentTargetIdx <= latestCheckedIdx && idx >= currentTargetIdx && idx <= latestCheckedIdx) {
              return {
                ...input,
                isChecked: true,
                latestChange,
              };
            } else {
              return input;
            }
          } else if (input.id === id) {
            return {
              ...input,
              isChecked: newChecked,
              latestChange,
            };
          } else {
            return input;
          }
        })
      );
    } else if (extraColumn?.component === "radio") {
      setSelectionInputs(prevData =>
        prevData.map(input => {
          // checked !== true is essential, otherwise when checked === false,
          // it will set checked === true for all the other <RadioButton /> components
          if (input.id === id) {
            return {
              ...input,
              isChecked: newChecked,
              latestChange,
            };
          } else {
            return {
              ...input,
              isChecked: false,
              latestChange,
            };
          }
        })
      );
    }
  };

  useEffect(() => {
    if (extraColumn && selectionInputs.length > 0) {
      const { selectedRows } = extraColumn;
      if (selectedRows) {
        selectedRows(selectionInputs);
      }
    }
  }, [extraColumn, selectionInputs]);

  return (
    <TableContextProvider value={{ extraColumn, selectionInputs, setSelectionInputs, handleClick }}>
      <table ref={ref} className={classNames} data-testid="table" {...rest}>
        {children}
      </table>
    </TableContextProvider>
  );
};

Table.Tr = Tr;
Table.Th = Th;
Table.Td = Td;
Table.THead = THead;
Table.TBody = TBody;

export default Table;

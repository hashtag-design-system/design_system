import dayjs from "dayjs";
import minMax from "dayjs/plugin/minMax";
import React, { useEffect, useRef } from "react";
import { TableContextProvider } from "../../utils/contexts";
import { SelectionInputGroupObj, SelectionInputGroupType, useClassnames, useSelectionInput } from "../../utils/hooks";
import TBody from "./TBody";
import Td from "./Td";
import Th from "./Th";
import THead from "./THead";
import Tr from "./Tr";

dayjs.extend(minMax);

export type Props = {
  extraColumn?: {
    component: SelectionInputGroupType;
    totalRows: number;
    withBorderRight?: boolean;
    selectedRows?: (row: SelectionInputGroupObj[]) => void;
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
  const { inputs: selectionInputs, ref: selectionInputsRef, onClick } = useSelectionInput(
    extraColumn?.component || "checkbox",
    extraColumn?.totalRows || 0
  );
  const [classNames, rest] = useClassnames("table", props);
  const ref = useRef<HTMLTableElement>(null);

  useEffect(() => {
    if (extraColumn && selectionInputs.length > 0) {
      const { selectedRows } = extraColumn;
      if (selectedRows) {
        selectedRows(selectionInputs);
      }
    }
  }, [extraColumn, selectionInputs]);

  return (
    <TableContextProvider value={{ extraColumn, selectionInputs, selectionInputsRef, onClick }}>
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

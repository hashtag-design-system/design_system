import React, { useRef, useState } from "react";
import { TableContextProvider } from "../../utils/contexts";
import { useClassnames } from "../../utils/hooks";
import TBody from "./TBody";
import Td from "./Td";
import Th from "./Th";
import THead from "./THead";
import Tr from "./Tr";

export type SelectionInputsTableType = { id: string; isChecked: boolean };
export type SelectionInputsLiteralType = "checkbox" | "radio";

export type Props = {
  extraColumn?: {
    withBorderRight?: boolean;
    component: SelectionInputsLiteralType;
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
  const [selectionInputs, setSelectionInputs] = useState<SelectionInputsTableType[]>([]);
  const [classNames, rest] = useClassnames("table", props);
  const ref = useRef<HTMLTableElement>(null);

  const handleClick = (e: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLInputElement>, header = false) => {
    const { currentTarget } = e;
    const id = currentTarget.id;
    // Opposite because state has not been updated
    const checked = currentTarget.value === "false" ? true : false;

    if (extraColumn?.component === "checkbox") {
      setSelectionInputs(prevData =>
        prevData.map(input => {
          if (header) {
            return {
              ...input,
              isChecked: checked,
            };
          } else if (input.id === id) {
            return {
              ...input,
              isChecked: checked,
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
          if (input.id === id || checked !== true) {
            return {
              ...input,
              isChecked: checked,
            };
          } else {
            return {
              ...input,
              isChecked: !checked,
            };
          }
        })
      );
    }
  };

  return (
    <TableContextProvider value={{ extraColumn, selectionInputs, setSelectionInputs, handleClick }}>
      <table ref={ref} className={classNames} {...rest}>
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

import React, { useEffect, useRef, useState } from "react";
import { useTableContext } from "../../utils/contexts";
import { useClassnames } from "../../utils/hooks";
import Checkbox from "../Checkbox";
import RadioButton from "../RadioButton";
import { ComponentState } from "../__helpers__";
import Table from "./index";

export const TrStates = ["default", "hover"] as const;
export type TrStateType = typeof TrStates[number];

export type Props = {
  idx: number;
};

export type FProps = Props & React.ComponentProps<"tr"> & ComponentState<TrStateType>;

const Tr: React.FC<FProps> = ({ idx, state = "default", children, ...props }) => {
  const { extraColumn, selectionInputs, selectionInputsRef, onClick } = useTableContext();

  const [{ header, body }, setReturnExtraColumn] = useState<{
    header: boolean;
    body: boolean;
  }>({ header: extraColumn !== undefined, body: extraColumn !== undefined });

  const [classNames, rest] = useClassnames(`table__tr ${extraColumn?.withBorderRight ? "border-right" : ""}`, props, {
    stateToRemove: { state },
  });
  const ref = useRef<HTMLTableRowElement>(null);

  useEffect(() => {
    if (ref && ref.current) {
      const { parentElement } = ref.current;
      if (parentElement && extraColumn) {
        const tagName = parentElement.tagName.toLowerCase();
        setReturnExtraColumn({ header: tagName === "thead", body: tagName === "tbody" });
      }
    }
  }, [extraColumn]);

  const newExtraColumn = () => {
    if (!extraColumn) {
      return undefined;
    }
    if (extraColumn.component === "checkbox") {
      return (
        <Checkbox
          state={selectionInputs[idx].state}
          checked={selectionInputs[idx].isChecked}
          onClick={onClick}
          ref={element => (selectionInputsRef.current[idx] = element)}
          name={idx === 0 ? "header" : undefined}
        />
      );
    } else {
      return (
        <RadioButton
          checked={selectionInputs[idx].isChecked}
          onClick={onClick}
          ref={element => (selectionInputsRef.current[idx] = element)}
          style={{ display: header ? "none" : undefined }}
        />
      );
    }
  };

  return (
    <tr ref={ref} className={classNames} data-testid="table-tr" {...rest}>
      {extraColumn?.component &&
        (header ? (
          <Table.Th
            style={{
              width: extraColumn ? "3em" : undefined,
            }}
          >
            {newExtraColumn()}
          </Table.Th>
        ) : (
          body && (
            <Table.Td
              style={{
                width: extraColumn ? "3em" : undefined,
              }}
            >
              {newExtraColumn()}
            </Table.Td>
          )
        ))}
      {children}
    </tr>
  );
};

export default Tr;

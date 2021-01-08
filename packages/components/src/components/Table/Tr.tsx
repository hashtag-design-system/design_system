import React, { useCallback, useEffect, useRef, useState } from "react";
import { useTableContext } from "../../utils/contexts";
import { useClassnames } from "../../utils/hooks";
import Checkbox, { CheckboxState } from "../Checkbox";
import RadioButton, { RadioButtonState } from "../RadioButton";
import { ComponentState } from "../__helpers__";
import Table from "./index";

export type FProps = React.ComponentProps<"tr"> & ComponentState<"default" | "hover">;

// TODO: State
// TODO: <Pagination /> onClick different from onPageChange
const Tr: React.FC<FProps> = ({ state = "default", children, ...props }) => {
  const { extraColumn, selectionInputs, setSelectionInputs, handleClick } = useTableContext();

  const [{ header, body }, setReturnExtraColumn] = useState<{
    header: boolean;
    body: boolean;
  }>({ header: extraColumn !== undefined, body: extraColumn !== undefined });

  const [classNames, rest] = useClassnames(`table__tr ${extraColumn?.withBorderRight ? "bottom-right" : ""}`, props, {
    stateToRemove: { state },
  });
  const ref = useRef<HTMLTableRowElement>(null);

  const getIdAndValue = useCallback((): { id: string; isChecked: boolean } | undefined => {
    if (ref && ref.current) {
      const input = ref.current.getElementsByTagName("input")[0];
      if (input) {
        const id = input.id;
        const isChecked = input.getAttribute("value") === "false" ? false : true || false;
        return {
          id,
          isChecked,
        };
      }
      return undefined;
    }
  }, []);

  const newExtraColumn = extraColumn
    ? {
        ...extraColumn,
        component: extraColumn.component === "checkbox" ? <Checkbox /> : <RadioButton />,
      }
    : undefined;

  useEffect(() => {
    if (ref && ref.current) {
      const { parentElement } = ref.current;
      if (parentElement && extraColumn) {
        const tagName = parentElement.tagName.toLowerCase();
        setReturnExtraColumn({ header: tagName === "thead", body: tagName === "tbody" });
      }
    }
  }, [extraColumn]);

  useEffect(() => {
    if (extraColumn && ref && ref.current) {
      const res = getIdAndValue();

      if (res) {
        const { id, isChecked } = res;
        if (id && !selectionInputs.map(input => input.id).includes(id)) {
          // ! if Boolean(input.value || false) is used it will return always true, which is not true
          setSelectionInputs(prevData => [...prevData, { id, isChecked }]);
        }
      }
    }
    // eslint-disable-next-line
  }, [ref.current, selectionInputs, setSelectionInputs, getIdAndValue]);

  const finalComponent = useCallback(
    (component: React.ReactNode, header = false) => {
      const res = getIdAndValue();
      if (!res) {
        return component;
      }
      const { id } = res;
      let state: CheckboxState | RadioButtonState = "default";
      let checked = selectionInputs.find(input => input.id === id)?.isChecked || false;
      const isChechbox = extraColumn?.component === "checkbox";
      if (header && isChechbox) {
        if (selectionInputs.some(input => input.isChecked)) {
          state = "indeterminate";
          checked = false;

          if (selectionInputs.filter(input => !input.isChecked).every(input => input.id === id)) {
            state = "checked";
            checked = true;
          }
        } else {
          state = "default";
          checked = false;
        }
      }

      if (isChechbox) {
        return React.cloneElement<any>(component as any, {
          checked: checked && state !== "indeterminate",
          state: header ? state : undefined,
          onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
            handleClick(e, header);
          },
        });
      } else {
        return React.cloneElement<any>(component as any, {
          checked,
          onClick: (e: React.MouseEvent<HTMLInputElement>) => {
            handleClick(e, header);
          },
        });
      }
    },
    [extraColumn?.component, selectionInputs, handleClick, getIdAndValue]
  );

  return (
    <tr ref={ref} className={classNames} {...rest}>
      {extraColumn?.component &&
        newExtraColumn &&
        (header ? (
          <Table.Th
            style={{
              width: extraColumn ? "3em" : undefined,
            }}
          >
            {finalComponent(newExtraColumn.component, true)}
          </Table.Th>
        ) : (
          body && (
            <Table.Td
              style={{
                width: extraColumn ? "3em" : undefined,
              }}
            >
              {finalComponent(newExtraColumn.component)}
            </Table.Td>
          )
        ))}
      {children}
    </tr>
  );
};

export default Tr;

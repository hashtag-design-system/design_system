import dayjs, { Dayjs } from "dayjs";
import minMax from "dayjs/plugin/minMax";
import { range } from "lodash";
import { useEffect, useRef, useState } from "react";
import { CheckboxState } from "../../components/Checkbox";

dayjs.extend(minMax);

export const SelectionInputGroupTypes = ["checkbox", "radio"] as const;
export type SelectionInputGroupType = typeof SelectionInputGroupTypes[number];
export type SelectionInputGroupObj = { id: string; isChecked: boolean; state: CheckboxState; header: boolean; latestChange: Dayjs };
export type UseSelectionInputOptions = {
  type: SelectionInputGroupType;
  inputsLength: number;
  defaultChecked?: boolean[];
  defaultState?: CheckboxState[];
  shift?: boolean;
};

export const useSelectionInput = ({ type, inputsLength, defaultChecked, defaultState, shift = true }: UseSelectionInputOptions) => {
  const ref = useRef<HTMLElement[] | null[]>([]);
  const [inputs, setInputs] = useState<SelectionInputGroupObj[]>(
    range(0, inputsLength).map(() => ({ id: "", isChecked: false, state: "default", header: false, latestChange: dayjs() }))
  );

  const isHeader = (element: HTMLElement) => {
    const name = element.getAttribute("name");
    if (name) {
      return name.toLowerCase() === "header";
    }
    return false;
  };

  const onClick = (e: React.MouseEvent<HTMLElement>) => {
    // @ts-expect-error
    const target: HTMLElement | undefined = ref.current.find((item: HTMElement) => item.id === e.target.id);
    /* istanbul ignore next */
    if (!target) {
      return;
    }
    const idx = ref.current.indexOf(target as never);
    const shiftKey = e.nativeEvent.shiftKey;
    // @ts-expect-error
    // Opposite because state has not been updated
    const newChecked = !(target.value === "false" ? false : true);
    const targetState = inputs[idx].state;
    const newLatestChange = dayjs();

    const newInputs = inputs.map((input, i) => {
      if (type === "checkbox") {
        if (isHeader(target)) {
          return {
            ...input,
            isChecked: targetState === "indeterminate" ? false : newChecked,
            latestChange: newLatestChange,
          };
        } else if (shiftKey && shift) {
          const latestCheckedDate = dayjs.max(inputs.map(input => input.latestChange));
          const latestCheckedIdx = inputs.findIndex(input => input.isChecked && input.latestChange.isSame(latestCheckedDate));
          const firstCondition = idx >= latestCheckedIdx && i <= idx && i >= latestCheckedIdx;
          const secondCondition = idx <= latestCheckedIdx && i >= idx && i <= latestCheckedIdx;
          if (firstCondition || secondCondition) {
            return {
              ...input,
              isChecked: newChecked,
              latestChange: newLatestChange,
            };
          }
          return input;
        } else if (i === idx) {
          return {
            ...input,
            isChecked: newChecked,
            latestChange: newLatestChange,
          };
        } else {
          return input;
        }
      } else {
        // checked !== true is essential, otherwise when checked === false,
        // it will set checked === true for all the other <RadioButton /> components
        if (i === idx) {
          return {
            ...input,
            isChecked: newChecked,
            latestChange: newLatestChange,
          };
        }
        return {
          ...input,
          isChecked: false,
          latestChange: newLatestChange,
        };
      }
    });
    setInputs(
      newInputs.map((input, i) => {
        if (type === "checkbox" && ref.current[i] && isHeader(ref.current[i]!)) {
          let newState = input.state;
          let checked = input.isChecked;
          if (newInputs.some(({ isChecked }) => isChecked)) {
            newState = "indeterminate";
            checked = false;
          } else {
            newState = "default";
            checked = false;
          }
          if (newInputs.filter(newInput => newInput !== input).every(({ isChecked }) => isChecked)) {
            newState = "checked";
            checked = true;
          }

          return {
            ...input,
            isChecked: checked,
            state: newState,
          };
        }

        return input;
      })
    );
  };

  useEffect(() => {
    setInputs(prevState =>
      prevState.map(({ isChecked: inputIsChecked, state: inputState, header: inputHeader, ...input }, i) => {
        let isChecked = inputIsChecked;
        let state: CheckboxState = inputState;
        let header = inputHeader;
        if (defaultChecked && defaultChecked.length > 0 && defaultChecked[i] !== undefined) {
          isChecked = defaultChecked[i];
        }
        if (defaultState && defaultState.length > 0 && defaultState[i]) {
          state = defaultState[i];
        }
        if (type === "checkbox" && ref.current[i] && isHeader(ref.current[i]!)) {
          header = true;
        }

        return { ...input, isChecked, state, header, id: ref.current[i]?.id || "" };
      })
    );
    // eslint-disable-next-line
  }, []);

  return { ref, onClick, inputs };
};

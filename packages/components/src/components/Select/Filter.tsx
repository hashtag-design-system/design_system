import { debounce } from "lodash";
import React, { useCallback, useState } from "react";
import { useSelectContext } from "../../utils/contexts";
import { useClassnames } from "../../utils/hooks";
import Input, { InputFProps } from "../Input";

// Big thanks to -> https://dev.to/_martinwheeler_/create-a-react-search-bar-that-highlights-your-results-4hdh

export type Props = {
  filterById?: boolean;
  bold?: boolean;
  debounceMs?: number;
};

export type FProps = Props & InputFProps;

export const Filter: React.FunctionComponent<FProps> = React.memo(
  ({ defaultValue, filterById, bold = true, state, debounceMs = 250, onChange, onKeyDown, ...props }) => {
    const [key, setKey] = useState<string | undefined>(undefined);
    const [classNames, rest] = useClassnames<FProps>("select__filter", props);

    const { items, setItems, setFilterValue, handleToggle } = useSelectContext();

    const handleSearch = debounce(
      (newVal: string[]) => {
        const suggestions = items.map(({ id, content, ...item }) => {
          let isShown: boolean = item.isShown;
          if (content) {
            isShown = newVal.every(val => content.toLowerCase().indexOf(val.toLowerCase()) > -1);
          }
          if (filterById && id) {
            isShown = newVal.some(val => id.toLowerCase().indexOf(val.toLowerCase()) > -1);
            // isShown = id.toLowerCase().indexOf(value.toLowerCase()) > -1;
          }
          return { ...item, id, content, isShown };
        });
        setItems(suggestions);
      },
      debounceMs,
      { leading: true }
    );

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVal = e.target.value.split(" ").filter(val => val.trim().length >= 1);

        handleSearch(newVal);
        setFilterValue(newVal);

        setKey(undefined);

        if (onChange) {
          onChange(e);
        }
      },
      [handleSearch, setFilterValue, onChange]
    );

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLInputElement>) => {
        const key = e.code;
        setKey(key);

        switch (key) {
          case "Escape":
            if (handleToggle) {
              handleToggle(e);
            }
            e.currentTarget.blur();
            break;
          case "Enter":
            items
              .filter(item => item.isShown)
              .forEach((item, i) => {
                if (i === 0) {
                  if (item.ref && item.ref.current) {
                    item.ref.current.click();
                  }
                }
              });
        }

        if (onKeyDown) {
          onKeyDown(e);
        }
      },
      [items, handleToggle, onKeyDown]
    );

    return (
      <Input
        className={classNames}
        state={state ? state : key && key === "Tab" ? "focus" : "default"}
        onChange={e => handleChange(e)}
        onKeyDown={e => handleKeyDown(e)}
        data-testid="select-filter"
        {...rest}
      />
    );
  }
);

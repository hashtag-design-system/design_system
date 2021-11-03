import React from "react";
import { useAutosuggestContext } from "../../../../utils";
import Select, { SelectFilterFProps } from "../../../Select";

type FProps = SelectFilterFProps;

export const Filter: React.FC<FProps> = ({ onBlur, ...props }) => {
  const { inputValue, filterById, key, setKey, handleChange, handleFocus } = useAutosuggestContext();

  return (
    <Select.Filter
      onKeyDown={e => {
        const key = e.code;
        setKey(key);

        switch (key) {
          case "Enter":
            if (onBlur) onBlur(e as any);
            break;
        }
      }}
      state={key === "Escape" ? "default" : undefined}
      value={inputValue}
      overrideOnChange
      onFocus={e => handleFocus(e)}
      onChange={e => handleChange(e)}
      filterById={filterById}
      onBlur={e => onBlur && onBlur(e)}
      {...props}
    />
  );
};

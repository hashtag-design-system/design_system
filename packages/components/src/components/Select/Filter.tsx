import React, { useCallback, useState } from "react";
import { useSelectContext } from "../../utils/contexts";
import { useClassnames } from "../../utils/hooks";
import Input, { InputFProps } from "../Input";

export type Props = {
  filterById?: boolean;
};

export type FProps = Props & InputFProps;

export const Filter: React.FunctionComponent<FProps> = ({ defaultValue, filterById, state, onChange, onKeyDown, ...props }) => {
  const [key, setKey] = useState<string | undefined>(undefined);
  const [classNames, rest] = useClassnames<FProps>("select__filter", props);

  const { items, setItems, handleToggle } = useSelectContext();

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newVal = e.target.value.split(" ").filter(val => val.trim().length >= 1);

      const suggestions = items
        .map(({ id, content, ...item }) => {
          let isShown: boolean = item.isShown;
          if (content) {
            isShown = newVal.every(val => content.toLowerCase().indexOf(val.toLowerCase()) > -1);
          }
          if (filterById && id) {
            isShown = newVal.some(val => id.toLowerCase().indexOf(val.toLowerCase()) > -1);
            // isShown = id.toLowerCase().indexOf(value.toLowerCase()) > -1;
          }
          return { ...item, id, content, isShown };
        })
        .map(item => {
          if (!item.isShown || item.content === null) {
            return item;
          }
          const newChildren = item.content.replace(new RegExp(newVal.join(" "), "gi"), match => `<strong><b>${match}</b></strong>`);

          return {
            ...item,
            highlightedChildren: newChildren,
          };
        });

      setItems(suggestions);
      setKey(undefined);

      if (onChange) {
        onChange(e);
      }
      // ❓ Highlight feature: too much?, too bright?
      // https://dev.to/_martinwheeler_/create-a-react-search-bar-that-highlights-your-results-4hdh
      // .map(({ content, ...item }) => {
      //   let newContent = content;
      //   if (content) {
      //     newContent = content.replace(new RegExp(value, "gi"), match => `<mark class="select__filter__mark">${match}</mark>"`);
      //   }
      //   return {
      //     ...item,
      //     content: newContent,
      //   };
      // });
    },
    [filterById, onChange, items, setItems]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
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
  };

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
};

Filter.displayName = "SelectFilter";

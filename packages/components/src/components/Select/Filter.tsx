import React, { useEffect, useState } from "react";
import { useSelectContext } from "../../utils/contexts";
import { useClassnames } from "../../utils/hooks";
import Input, { InputFProps } from "../Input";

export type Props = {
  filterById?: boolean;
};

export type FProps = Props & InputFProps;

export const Filter: React.FunctionComponent<FProps> = ({ filterById, state, onChange, onKeyDown, ...props }) => {
  const [key, setKey] = useState<string | undefined>(undefined);
  const [classNames, rest] = useClassnames<FProps>("select__filter", props);

  const { value, items, setItems } = useSelectContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.split(" ").filter(val => val.trim().length >= 1);
    const suggestions = items
      .map(({ id, content, ...item }) => {
        let isShown: boolean = item.isShown;
        if (content) {
          isShown = value.every(val => content.toLowerCase().indexOf(val.toLowerCase()) > -1);
        }
        if (filterById && id) {
          isShown = value.some(val => id.toLowerCase().indexOf(val.toLowerCase()) > -1);
          // isShown = id.toLowerCase().indexOf(value.toLowerCase()) > -1;
        }
        return { ...item, id, content, isShown };
      })
      .map(item => {
        if (!item.isShown || item.content === null) {
          return item;
        }
        const newChildren = item.content.replace(new RegExp(value.join(" "), "gi"), match => `<strong><b>${match}</b></strong>`);

        return {
          ...item,
          highlightedChildren: newChildren,
        };
      });
    console.log(suggestions);

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
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const key = e.code;
    setKey(key);

    if (onKeyDown) {
      onKeyDown(e);
    }
  };

  useEffect(() => {
    if (value) {
      setKey(undefined);
    }
  }, [value]);

  return (
    <Input
      className={classNames}
      state={state ? state : key && key === "Tab" ? "focus" : "default"}
      onChange={e => handleChange(e)}
      onKeyDown={e => handleKeyDown(e)}
      {...rest}
    />
  );
};

Filter.displayName = "SelectFilter";

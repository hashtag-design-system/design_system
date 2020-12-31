import React from "react";
import { useSelectContext } from "../../utils/contexts";
import { useClassnames } from "../../utils/hooks";
import Input, { InputFProps } from "../Input";

export type Props = {
  filterById?: boolean;
};

export type FProps = Props & InputFProps;

export const Filter: React.FunctionComponent<FProps> = ({ filterById, onChange, ...props }) => {
  const [classNames, rest] = useClassnames<FProps>("select__filter", props);

  const { items, setItems } = useSelectContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.split(" ").filter(val => val.trim().length >= 1);
    const suggestions = items.map(({ id, content, ...item }) => {
      let isShown: boolean = item.isShown;
      if (content) {
        isShown = value.every(val => content.toLowerCase().indexOf(val.toLowerCase()) > -1);
      }
      if (filterById && id) {
        isShown = value.some(val => id.toLowerCase().indexOf(val.toLowerCase()) > -1);
        // isShown = id.toLowerCase().indexOf(value.toLowerCase()) > -1;
      }
      return { ...item, id, content, isShown };
    });

    setItems(suggestions);

    if (onChange) {
      onChange(e);
    }
    // ❓ Highlight feature, too much, too bright
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

  return <Input className={classNames} onChange={e => handleChange(e)} {...rest} />;
};

Filter.displayName = "SelectFilter";

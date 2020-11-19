import React from "react";
import Hr from "./Hr";
import Item from "./Item";
import ListBox from "./ListBox";

export type Props = {};

interface SubComponents {
  Hr: typeof Hr;
  Item: typeof Item;
  OptionsBox: typeof ListBox;
}

const Dropdown: React.FC<Props> & SubComponents = () => {
  return <div></div>;
};

Dropdown.displayName = "Dropdown";
Dropdown.Item = Item;
Dropdown.OptionsBox = ListBox;
Dropdown.Hr = Hr;

export default Dropdown;

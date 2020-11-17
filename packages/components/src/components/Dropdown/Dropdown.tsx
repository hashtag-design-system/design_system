import React from "react";
import Item from "./Item";
import ListBox from "./ListBox";

export type Props = {};

interface SubComponents {
  Item: typeof Item;
  OptionsBox: typeof ListBox;
}

const Dropdown: React.FC<Props> & SubComponents = () => {
  return <div></div>;
};

Dropdown.displayName = "Dropdown";
Dropdown.Item = Item;
Dropdown.OptionsBox = ListBox;

export default Dropdown;

import React from "react";
import Item from "./Item";
import ListbOX from "./ListBox";

export type Props = {};

interface SubComponents {
  OptionsBox: typeof ListbOX;
  Option: typeof Item;
}

export const Dropdown: React.FC<Props> & SubComponents = () => {
  return <div></div>;
};

Dropdown.displayName = "Dropdown";
Dropdown.Option = Item;
Dropdown.OptionsBox = ListbOX;

export default Dropdown;

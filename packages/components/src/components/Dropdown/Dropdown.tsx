import React from "react";
import HR from "./HR";
import Item from "./Item";
import ItemGroup from "./ItemGroup";
import ListBox from "./ListBox";

export type Props = {};

interface SubComponents {
  HR: typeof HR;
  Item: typeof Item;
  ItemGroup: typeof ItemGroup
  OptionsBox: typeof ListBox;
}

const Dropdown: React.FC<Props> & SubComponents = () => {
  return <div></div>;
};

Dropdown.displayName = "Dropdown";
Dropdown.Item = Item;
Dropdown.ItemGroup = ItemGroup;
Dropdown.OptionsBox = ListBox;
Dropdown.HR = HR;

export default Dropdown;

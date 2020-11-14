import Dropdown from "./Dropdown";
import Item from "./Item";
import ListbOX from "./ListBox";

export type { Props as DropdownProps } from "./Dropdown";
export type { Props as OptionDropdownProps } from "./Item";
export type { Props as OptionsBoxDropdownProps } from "./ListBox";

Dropdown.Option = Item;
Dropdown.OptionsBox = ListbOX;

export default Dropdown;

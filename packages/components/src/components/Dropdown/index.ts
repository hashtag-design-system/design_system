import Dropdown from "./Dropdown";
import Option from "./Option";
import OptionsBox from "./OptionsBox";

export type { Props as DropdownProps } from "./Dropdown";
export type { Props as OptionDropdownProps } from "./Option";
export type { Props as OptionsBoxDropdownProps } from "./OptionsBox";

Dropdown.Option = Option;
Dropdown.OptionsBox = OptionsBox;

export default Dropdown;

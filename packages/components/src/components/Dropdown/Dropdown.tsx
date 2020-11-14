import React from "react";
import Option from "./Option";
import OptionsBox from "./OptionsBox";

export type Props = {};

interface SubComponents {
  OptionsBox: typeof OptionsBox;
  Option: typeof Option;
}

export const Dropdown: React.FC<Props> & SubComponents = () => {
  return <div></div>;
};

Dropdown.displayName = "Dropdown";
Dropdown.Option = Option;
Dropdown.OptionsBox = OptionsBox;

export default Dropdown;

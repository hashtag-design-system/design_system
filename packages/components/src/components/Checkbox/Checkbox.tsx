import React from "react";
import { addClassnames } from "../../utils/styles";
import { ReactInputHTMLAttributes } from "../Input/Input";

const CheckboxStates = [
  "default",
  "hover",
  "focused",
  "indeterminate",
  "active",
  "disabled|inactive",
  "disabled|active",
] as const;
export type CheckboxState = typeof CheckboxStates[number];

// See -> https://codesandbox.io/s/framer-motion-svg-checkbox-kqm7y?file=/src/Example.tsx:137-300
const tickVariants = {
  pressed: (isChecked: boolean) => ({ pathLength: isChecked ? 0.85 : 0.2 }),
  checked: { pathLength: 1 },
  unchecked: { pathLength: 0 },
};

export type Props = {
  checked?: boolean;
  defaultChecked?: boolean;
  state?: CheckboxState;
  disabled?: boolean;
};

export const Checkbox: React.FC<Props & ReactInputHTMLAttributes> = ({ ...props }) => {
  const { className, ...rest } = props;
  let classNames = addClassnames("checkbox shadow__form-2", props);

  return <input type="checkbox" className={classNames} {...rest} />;
};

export default Checkbox;

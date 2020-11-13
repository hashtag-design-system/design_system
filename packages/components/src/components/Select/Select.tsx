import React, { useState } from "react";
import { useClassnames } from "../../utils";
import Input, { InputProps, ReactInputHTMLAttributes } from "../Input";
import Icon from "./__helpers__/Icon";
import OptionsListBox, { Props as OptionsListBoxProps } from "./__helpers__/OptionsListBox";

export type Props = Omit<InputProps, "type" | "icon" | "allowClear" | "characterLimit"> &
  OptionsListBoxProps & {
    defaultOpen?: boolean;
    inselect: (option: string) => void;
  };

export const Select: React.FC<Props & ReactInputHTMLAttributes> = ({
  floatingPlaceholder,
  helptext,
  secondhelptext,
  innerref,
  label,
  placeholder,
  prefix,
  state,
  value,
  style,
  maxHeight,
  inselect,
  children,
  defaultOpen = false,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [inputValue, setInputValue] = useState(value);
  const [classNames, rest] = useClassnames("flex-column-stretch select__wrapper", props);

  const newWidth = 168 || props.width || (style && style.width);

  const onSelect = (value: string, children: string) => {
    setIsOpen(false);
    setInputValue(children);
    if (inselect !== undefined) {
      inselect(value);
    }
  };

  const childrenWithExtraProps = React.Children.map(children, child => React.cloneElement(child as any, { onClick: onSelect }));

  return (
    <div className={classNames} {...rest}>
      <Input
        icon={<Icon clicked={isOpen} onClick={() => setIsOpen(!isOpen)} />}
        width={newWidth}
        placeholder={placeholder}
        floatingPlaceholder={floatingPlaceholder}
        helptext={helptext}
        secondhelptext={secondhelptext}
        state={isOpen ? "focus" : state}
        value={inputValue}
        label={label}
        prefix={prefix}
        innerref={innerref}
        style={style}
        onKeyDownCapture={e => console.log(e.key)}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setIsOpen(false)}
        onChange={e => setInputValue(e.target.value)}
      />
      {isOpen && children && <OptionsListBox maxHeight={maxHeight}>{childrenWithExtraProps}</OptionsListBox>}
    </div>
  );
};

export default Select;

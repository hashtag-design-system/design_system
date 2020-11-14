import React, { useCallback, useMemo, useState } from "react";
import DropdownContext from "../../utils/ctx/DropdownContext";
import { useClassnames } from "../../utils/hooks";
import Input, { InputProps, ReactInputHTMLAttributes } from "../Input";
import Icon from "./__helpers__/Icon";

export type Props = Omit<InputProps, "type" | "icon" | "allowClear" | "characterLimit"> & {
  defaultOpen?: boolean;
  regex?: RegExp;
  options?: string[];
  selectedOption?: string;
  inselect?: (key: string, e: React.SyntheticEvent<HTMLLIElement>) => void;
};

export const Select: React.FC<Props & ReactInputHTMLAttributes> = ({
  floatingPlaceholder,
  helptext,
  secondhelptext,
  innerref,
  label,
  placeholder,
  prefix,
  defaultValue,
  state,
  style,
  inselect,
  children,
  defaultOpen = false,
  regex,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [value, setValue] = useState(defaultValue || "");
  const [classNames, rest] = useClassnames("flex-column-stretch select__wrapper", props);

  const handleSelect = useCallback(
    (key: string, e: React.SyntheticEvent<HTMLLIElement>, children?: string) => {
      if (inselect) inselect(key, e);
      setIsOpen(false);
      if (children) {
        setValue(children);
      }
    },
    [inselect]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValue(value);
  };

  const providerValue = useMemo(() => ({ isOpen, handleSelect }), [isOpen, handleSelect]);

  const newWidth = 168 || props.width || (style && style.width);

  // * Alternative approach to `useContext` hook
  // const childrenWithExtraProps = React.Children.map(children, child => React.cloneElement(child as any, { onClick: onSelect }));

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
        value={value}
        label={label}
        prefix={prefix}
        innerref={innerref}
        style={style}
        onChange={e => handleChange(e)}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setIsOpen(false)}
        inchange={hey => console.log(hey)}
      />
      {children && <DropdownContext.Provider value={providerValue}>{children}</DropdownContext.Provider>}
    </div>
  );
};

export default Select;

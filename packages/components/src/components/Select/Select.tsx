import React, { useCallback, useMemo, useState } from "react";
import DropdownContext from "../../utils/ctx/DropdownContext";
import { useClassnames, useDisabled } from "../../utils/hooks";
import Input, { InputProps, ReactInputHTMLAttributes } from "../Input";
import DownArrowIcon from "./__helpers__/DownArrowIcon";

export type Props = Omit<InputProps, "type" | "icon" | "allowClear" | "characterLimit"> & {
  defaultOpen?: boolean;
  inselect?: (key: string, e: React.SyntheticEvent<HTMLLIElement>) => void;
};

const Select: React.FC<Props & Omit<ReactInputHTMLAttributes, "floatingplaceholder">> = ({ ...props }) => {
  const {
    helptext,
    secondhelptext,
    innerref,
    label,
    placeholder,
    prefix,
    defaultValue,
    inselect,
    children,
    defaultOpen = false,
    style,
  } = props;
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [value, setValue] = useState(defaultValue || "");
  const isDisabled = useDisabled(props);
  let [classNames, rest] = useClassnames(`dropdown select__wrapper flex-column-stretch  ${isDisabled ? "disabled" : ""}`, props);

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

  const providerValue = useMemo(
    () => ({ isOpen, setIsOpen, helptext: helptext ? true : false, label: label ? true : false, disabled: isDisabled, handleSelect }),
    [isOpen, helptext, label, isDisabled, handleSelect]
  );

  const newWidth = 168 || (style && style.width);

  // * Alternative approach to `useContext` hook
  // const childrenWithExtraProps = React.Children.map(children, child => React.cloneElement(child as any, { onClick: onSelect }));

  // * Check and re-validate props
  return (
    <DropdownContext.Provider value={providerValue}>
      <div className={classNames} style={{ ...style, width: newWidth }} {...rest}>
        <Input
          icon={<DownArrowIcon />}
          width={newWidth}
          placeholder={placeholder}
          floatingplaceholder={false}
          helptext={helptext}
          secondhelptext={secondhelptext}
          state={isOpen && !props.state ? "focus" : props.state}
          value={value}
          label={label}
          prefix={prefix}
          innerref={innerref}
          style={style}
          tabIndex={0}
          onClick={e => {
            setIsOpen(!isOpen);
            if (props.onClick) props.onClick(e as React.MouseEvent<HTMLInputElement>);
          }}
          onBlur={() => setIsOpen(false)}
        >
          <svg width={2} className="select__input__divider" height={34} fill="none">
            <path d="M1 32V1" strokeWidth={1.2} strokeLinecap="round" />
          </svg>
          <DownArrowIcon />
        </Input>
        {children}
      </div>
    </DropdownContext.Provider>
  );
};

export default Select;

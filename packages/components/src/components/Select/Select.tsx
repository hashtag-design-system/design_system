import React, { useCallback, useMemo, useState } from "react";
import DropdownContext from "../../utils/contexts/DropdownContext";
import { useClassnames, useDisabled, useVisible } from "../../utils/hooks";
import Input, { InputProps, ReactInputHTMLAttributes } from "../Input";
import { DividerIcon } from "./__helpers__/DividerIcon";
import { DownArrowIcon } from "./__helpers__/DownArrowIcon";

export type Props = Omit<InputProps, "type" | "icon" | "allowClear" | "characterLimit"> & {
  defaultOpen?: boolean;
};

const Select: React.FC<Props & ReactInputHTMLAttributes> = props => {
  const {
    helptext,
    secondhelptext,
    innerref,
    label,
    placeholder,
    prefix,
    defaultValue,
    defaultOpen = false,
    floatingplaceholder = false,
    inselect,
    onClick,
    style,
    children,
    ...rest
  } = props;
  let { ref, isVisible, setIsVisible } = useVisible<HTMLUListElement>(defaultOpen);
  const [value, setValue] = useState(defaultValue || "");
  const isDisabled = useDisabled<typeof props>(props);
  let [classNames, restProps] = useClassnames(
    `dropdown select__wrapper flex-column-unset-stretch  ${isDisabled ? "disabled" : ""}`,
    rest
  );

  const handleSelect = useCallback(
    (key: string, e: React.SyntheticEvent<HTMLLIElement>, children?: string) => {
      if (inselect) inselect(key, e);
      setIsVisible(false);
      if (children) {
        setValue(children);
      }
    },
    [setIsVisible, inselect]
  );

  const newWidth = 168 || (style && style.width);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = e;
    if (key === "Enter" || key === " ") {
      setIsVisible(!isVisible);
    }
  };

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLInputElement | SVGSVGElement>) => {
      if (setIsVisible && !isDisabled) {
        setIsVisible(!isVisible);
      }
    },
    [isVisible, setIsVisible, isDisabled, onClick]
  );

  const providerValue = useMemo(
    () => ({
      isVisible,
      setIsVisible,
      helptext: helptext ? true : false,
      label: label ? true : false,
      ref,
      handleSelect,
      handleClick,
    }),
    [isVisible, setIsVisible, helptext, label, ref, handleSelect, handleClick]
  );

  // * Alternative approach to `useContext` hook
  // const childrenWithExtraProps = React.Children.map(children, child => React.cloneElement(child as any, { onClick: onSelect });

  return (
    <DropdownContext.Provider value={providerValue}>
      <div className={classNames} style={{ ...style, width: newWidth }} {...restProps}>
        <Input
          icon={<DownArrowIcon />}
          width={newWidth}
          className={isVisible || props.state === "focus" ? undefined : "select"}
          placeholder={placeholder}
          floatingplaceholder={floatingplaceholder === true ? { now: isVisible || String(value).length > 0 } : false}
          helptext={helptext}
          secondhelptext={secondhelptext}
          state={isVisible && !props.state ? "focus" : isDisabled ? "disabled" : props.state}
          value={value}
          label={label}
          prefix={prefix}
          innerref={innerref}
          style={style}
          onClick={e => {
            handleClick(e);
            if (props.onClick) props.onClick(e);
          }}
          onKeyDown={e => handleKeyPress(e)}
          aria-haspopup="true"
          aria-expanded={isVisible}
        >
          <DividerIcon />
        </Input>
        {children}
      </div>
    </DropdownContext.Provider>
  );
};

export default Select;

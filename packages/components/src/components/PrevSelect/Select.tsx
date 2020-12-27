import React, { useCallback, useMemo, useState } from "react";
import DropdownContext from "../../utils/contexts/DropdownContext";
import { useClassnames, useDisabled, useVisible } from "../../utils/hooks";
import Input, { InputFProps } from "../Input";
import { DividerIcon } from "./__helpers__/DividerIcon";
import { DownArrowIcon } from "./__helpers__/DownArrowIcon";

export type Props = {
  defaultOpen?: boolean;
};

export type FProps = Props & Omit<InputFProps, "type" | "icon" | "allowClear" | "characterLimit">;

const Select: React.FC<FProps> = props => {
  const {
    helptext,
    secondhelptext,
    label,
    placeholder,
    prefix,
    defaultOpen = false,
    floatingplaceholder = false,
    defaultValue,
    forwardref,
    onClick,
    onSelect,
    style,
    children,
    ...rest
  } = props;
  let { ref: optionsBox, isVisible, setIsVisible } = useVisible<HTMLUListElement>(defaultOpen);
  const [value, setValue] = useState(defaultValue || "");
  const isDisabled = useDisabled<typeof props>(props);
  let [classNames, restProps] = useClassnames(
    `dropdown select__container flex-column-unset-stretch  ${isDisabled ? "disabled" : ""}`,
    rest
  );

  const handleSelect = useCallback(
    (e: React.MouseEvent<HTMLLIElement>, key: string, children?: string) => {
      // if (onSelect) onSelect(e, key);
      setIsVisible(false);
      if (children) {
        setValue(children);
      }
    },
    [setIsVisible, onSelect]
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

      if (onClick) {
        onClick(e as any);
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
      ref: optionsBox,
      handleSelect,
      handleClick,
    }),
    [isVisible, setIsVisible, helptext, label, optionsBox, handleSelect, handleClick]
  );

  // * Alternative approach to `useContext` hook
  // const childrenWithExtraProps = React.Children.map(children, child => React.cloneElement(child as any, { onClick: onSelect });

  return (
    <DropdownContext.Provider value={providerValue}>
      <div className={classNames} style={{ ...style, width: newWidth }} {...restProps}>
        <Input
          suffix={<DownArrowIcon />}
          width={newWidth}
          className={isVisible || props.state === "focus" ? undefined : "select"}
          placeholder={placeholder}
          floatingplaceholder={floatingplaceholder === true ? { now: isVisible || String(value).length > 0 } : false}
          helptext={helptext}
          secondhelptext={secondhelptext}
          state={isVisible && (!props.state || props.state === "default") ? "focus" : isDisabled ? "disabled" : props.state}
          value={value}
          label={label}
          prefix={prefix}
          ref={() => forwardref}
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

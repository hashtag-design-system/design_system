import React, { useContext } from "react";
import { IconPropType } from "../../typings";
import DropdownContext from "../../utils/ctx/DropdownContext";
import { useClassnames } from "../../utils/hooks";

const DropdownItemStates = ["default", "hover"] as const;
export type DropdownItemState = typeof DropdownItemStates[number];

export type Props = {
  id: string;
  state?: DropdownItemState;
  leftIcon?: IconPropType;
  rightIcon?: IconPropType;
};

const Item: React.FC<Props & Omit<React.HTMLAttributes<HTMLLIElement>, "onClick">> = ({
  id,
  state,
  leftIcon,
  rightIcon,
  children,
  ...props
}) => {
  const [classNames, rest] = useClassnames("dropdown__item body-16 flex-row-stretch", props, {
    stateToRemove: { state, defaultState: "default" },
  });

  const { setIsVisible, handleSelect } = useContext(DropdownContext);

  const handleClick = (e: React.MouseEvent<HTMLLIElement>) => {
    if (handleSelect) {
      if (typeof children === "string") {
        handleSelect(id, e, children);
      } else {
        handleSelect(id, e);
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLLIElement>) => {
    const { key } = e;
    if (key === "Enter" || key === " ") {
      handleClick(e as any);
    }

    if (key === "Escape" && setIsVisible) {
      setIsVisible(false);
    }
  };

  return (
    <li className={classNames} onClick={e => handleClick(e)} tabIndex={0} onKeyDown={e => handleKeyPress(e)} {...rest}>
      {leftIcon && <span className="dropdown__item__icon flex-column-center left">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="dropdown__item__icon flex-column-center right">{rightIcon}</span>}
    </li>
  );
};

Item.displayName = "DropdownOption";

export default Item;

import React, { useContext } from "react";
import { IconPropType } from "../../typings";
import DropdownContext from "../../utils/contexts/DropdownContext";
import { useClassnames } from "../../utils/hooks";
import { ComponentProps } from "../__helpers__";

const DropdownItemStates = ["default", "hover"] as const;
export type DropdownItemState = typeof DropdownItemStates[number];

export type Props = {
  id: string;
  leftIcon?: IconPropType;
  rightIcon?: IconPropType;
};

export type FProps = Props &
  Pick<ComponentProps<"li", false, DropdownItemState>, "state"> &
  Omit<React.ComponentPropsWithoutRef<"li">, "onClick" | "onKeyDown">;

const Item: React.FC<FProps> = ({ id, state, leftIcon, rightIcon, children, ...props }) => {
  const [classNames, rest] = useClassnames("dropdown__item body-16 flex-row-flex-start-stretch", props, {
    stateToRemove: { state },
  });

  const { setIsVisible, handleSelect } = useContext(DropdownContext);

  const handleClick = (e: React.MouseEvent<HTMLLIElement>) => {
    if (handleSelect) {
      if (typeof children === "string") {
        handleSelect(e, id, children);
      } else {
        handleSelect(e, id);
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
    <li className={classNames} onClick={e => handleClick(e)} onKeyDown={e => handleKeyPress(e)} tabIndex={0} data-key={id} {...rest}>
      {leftIcon && <span className="dropdown__item__icon flex-column-center-center left">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="dropdown__item__icon flex-column-center-center right">{rightIcon}</span>}
    </li>
  );
};

Item.displayName = "DropdownOption";

export default Item;

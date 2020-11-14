import React, { useContext } from "react";
import DropdownContext from "../../utils/ctx/DropdownContext";
import { useClassnames } from "../../utils/hooks";

export type Props = {
  value: string;
};

export const Option: React.FC<Props & Omit<React.HTMLAttributes<HTMLLIElement>, "onClick">> = ({ value, children, ...props }) => {
  const [classNames, rest] = useClassnames("dropdown__item__wrapper flex-column-flex-start", props);

  const { handleSelect } = useContext(DropdownContext);

  const handleClick = (e: React.MouseEvent<HTMLLIElement>) => {
    if (typeof children === "string") {
      handleSelect(value, e, children);
    } else {
      handleSelect(value, e);
    }
  };

  return (
    <li className={classNames} onClick={e => handleClick(e)} {...rest}>
      <div className="dropdown__item body-14">{children}</div>
    </li>
  );
};

Option.displayName = "DropdownOption";

export default Option;

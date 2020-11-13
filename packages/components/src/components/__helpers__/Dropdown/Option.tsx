import React from "react";
import { useClassnames } from "../../../utils";

export type Props = {
  value: string;
  onClick?: (value: string, children: string) => void;
};

export const Option: React.FC<Props & Omit<React.HTMLAttributes<HTMLLIElement>, "onClick">> = ({
  value,
  onClick,
  children,
  ...props
}) => {
  const [classNames, rest] = useClassnames("dropdown__item__wrapper flex-column-flex-start", props);

  return (
    <li className={classNames} onClick={() => onClick && onClick(value,children as string)} {...rest}>
      <div className="dropdown__item body-14">{children}</div>
    </li>
  );
};

export default Option;

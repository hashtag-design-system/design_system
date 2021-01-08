import React from "react";
import { useClassnames } from "../../utils/hooks";

export type FProps = React.ComponentProps<"td">;

const Td: React.FC<FProps> = ({ children, ...props }) => {
  const [classNames, rest] = useClassnames("table__tbody__td", props);

  return <td className={classNames} {...rest}>{children}</td>;
};

Td.displayName = "TableTd";

export default Td;

import React from "react";
import { useClassnames } from "../../utils";

export type FProps = React.ComponentProps<"tbody">;

const TBody: React.FC<FProps> = ({ children, ...props }) => {
  const [classNames, rest] = useClassnames("table__tbody", props);

  return (
    <tbody className={classNames} data-testid="table-tbody" {...rest}>
      {children}
    </tbody>
  );
};

TBody.displayName = "TableTBody";

export default TBody;

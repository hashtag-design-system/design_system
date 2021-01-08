import React from "react";
import { useClassnames } from "../../utils/hooks";

export type FProps = React.ComponentProps<"thead">

const THead: React.FC<FProps> = ({ children, ...props }) => {
  const [classNames, rest] = useClassnames("table__thead", props);

  return (
    <thead className={classNames} data-testid="table-thead" {...rest}>
      {children}
    </thead>
  );
};

THead.displayName = "TableTHead";

export default THead;

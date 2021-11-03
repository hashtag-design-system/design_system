import React, { useState } from "react";
import { SortDirection } from "../../typings";
import { useClassnames } from "../../utils";
import { ChevronDown, ChevronUp, ChevronUpAndDown } from "./__helpers__";

export type Props = {
  sort?: boolean;
  onClick?: (e: React.MouseEvent<HTMLTableHeaderCellElement>, params: { direction: SortDirection }) => void;
};

export type FProps = Props & Omit<React.ComponentProps<"th">, "onClick">;

const Th: React.FC<FProps> = ({ sort, onClick, children, ...props }) => {
  const [sortDirection, setSortDirection] = useState<SortDirection | "">("");
  const [classNames, rest] = useClassnames("table__thead__th", props);

  const handleClick = (e: React.MouseEvent<HTMLTableCellElement>) => {
    let newDirection: SortDirection = sortDirection || "asc";

    if (newDirection === "asc") newDirection = "desc";
    else newDirection = "asc";

    setSortDirection(newDirection);
    if (onClick) onClick(e, { direction: newDirection });
  };

  return (
    <th
      className={classNames}
      aria-sort={!sort ? "none" : sortDirection === "desc" || sortDirection === "" ? "descending" : "ascending"}
      onClick={e => handleClick(e)}
      data-testid="table-th"
      {...rest}
    >
      <div>
        {children}
        {sort && (sortDirection === "" ? <ChevronUpAndDown /> : sortDirection === "asc" ? <ChevronUp /> : <ChevronDown />)}
      </div>
    </th>
  );
};

Th.displayName = "TableTh";

export default Th;

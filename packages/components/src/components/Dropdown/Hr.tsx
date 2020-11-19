import React from "react";

export type Props = {
  width?: number;
};

export const Hr: React.FC<Props> = ({ width }) => {
  return <hr style={{ width }} className="dropdown__hr" />;
};

Hr.displayName = "DropdownHr";

export default Hr;

import React from "react";

export type Props = {
  width?: number;
};

export const HR: React.FunctionComponent<Props> = ({ width }) => {
  return <hr style={{ width }} className="dropdown__hr" />;
};

HR.displayName = "DropdownHR";

export default HR;

import React from "react";

export const DividerIcon: React.FunctionComponent = () => {
  return (
    <svg
      width={2}
      className="select__input__divider"
      height={38}
      style={{ top: "calc(50% - 36px / 2)" }}
      viewBox="0 0 2 40"
      fill="none"
    >
      <path d="M1 38V1" strokeWidth={1} strokeLinecap="round" />
    </svg>
  );
};

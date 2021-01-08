import React from "react";

type FProps = React.ComponentProps<"svg">;

export const ChevronDown: React.FC<FProps> = ({ ...props }) => {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M21 7l-9 10L3 7" stroke="#000" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

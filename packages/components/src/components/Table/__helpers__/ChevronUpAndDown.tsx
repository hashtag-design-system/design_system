import React from "react";

type FProps = React.ComponentProps<"svg">;

export const ChevronUpAndDown: React.FC<FProps> = ({ ...props }) => {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M17 9l-5-6-5 6M17 15l-5 6-5-6" stroke="#000" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

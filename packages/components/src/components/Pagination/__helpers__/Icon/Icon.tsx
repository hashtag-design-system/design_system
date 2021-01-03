import React from "react";

type FProps = Omit<React.SVGProps<SVGSVGElement>, "className">;

export const Icon: React.FunctionComponent<FProps> = ({ d, ...props }) => {
  return (
    <svg
      className="icon pagination__btn__icon"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      data-testid="icon"
      {...props}
    >
      <path d={d} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

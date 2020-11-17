import React from "react";

type cssColorAttribute = React.SVGAttributes<SVGElement>["color"];

export type Props = {
  d: string;
  size?: number;
  width?: number;
  height?: number;
  viewBox?: React.SVGAttributes<SVGElement>["viewBox"];
  fill?: cssColorAttribute;
  stroke?: cssColorAttribute;
  strokeWidth?: number;
  strokeLinecap?: React.SVGAttributes<SVGElement>["strokeLinecap"];
};

const Icon: React.FC<Props & React.SVGAttributes<SVGElement>> = ({
  d,
  size = 24,
  width,
  height,
  viewBox = "0 0 24 24",
  fill,
  stroke = "#999999",
  strokeWidth = 3,
  strokeLinecap = "round",
  ...props
}) => {
  const { className, ...rest } = props;
  // let classNames = addClassnames(`input input-multiline`, props);
  // Size is to set both the width and the height, without duplicating props and their values
  if (size) {
    width = size;
    height = size;
  }

  return (
    <svg
      // className={classNames}
      viewBox={viewBox}
      width={`${width}px`}
      height={`${height}px`}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      strokeWidth={strokeWidth}
      strokeLinecap={strokeLinecap}
      {...rest}
    >
      <path fill={fill} d={d} />
    </svg>
  );
};

export default Icon;

import { IconProps } from "@chakra-ui/icons";
import { ComponentWithAs } from "@chakra-ui/system";
import React from "react";

export type IconSVG<SC extends {} = {}> = ComponentWithAs<"svg", IconProps> &
  SC;

  export const EllipseFilled: React.FC<Props> = (props) => (
    <Path d="M12 22c5.5 0 10-4.5 10-10S17.5 2 12 2S2 6.5 2 12s4.5 10 10 10z" {...props} />
  )

type DefaultProps = React.ComponentPropsWithoutRef<"path">;

type Props = Omit<DefaultProps, "fill"> & {
  fill?: DefaultProps["fill"] | "currentColor" | (string & {});
};

export const Path: React.FC<Props> = ({ fill = "currentColor", ...props }) => {
  return <path fill={fill} {...props} />;
};

Path.displayName = "PathIcon";

export type { Props as PathProps };


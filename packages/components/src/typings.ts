import React from "react";
import { IconPosition, IconSize } from "./config/.index";

export type IconProp = {
  component: React.ReactNode;
  position: IconPosition;
  color?: string;
  size?: IconSize;
};

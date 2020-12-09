import React from "react";
import { Checkmark } from "./Checkmark";

type SubComponents = {
  Checkmark: typeof Checkmark;
};

export const Animated: React.FunctionComponent & SubComponents = () => {
  return <></>;
};

Animated.displayName = "Animated";

Animated.Checkmark = Checkmark;

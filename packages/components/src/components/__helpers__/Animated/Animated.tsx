import React from "react";
import { Checkmark } from "./Checkmark";
import Fireworks from "./Fireworks";

type SubComponents = {
  Checkmark: typeof Checkmark;
  Fireworks: typeof Fireworks;
};

export const Animated: React.FunctionComponent & SubComponents = () => {
  return <></>;
};

Animated.displayName = "Animated";

Animated.Checkmark = Checkmark;
Animated.Fireworks = Fireworks;

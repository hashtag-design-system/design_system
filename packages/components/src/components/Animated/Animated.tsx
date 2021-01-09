import React from "react";
import { Checkmark } from "./Checkmark";
import Fireworks from "./Fireworks";
import Loading from "./Loading";

type SubComponents = {
  Checkmark: typeof Checkmark;
  Fireworks: typeof Fireworks;
  Loading: typeof Loading;
};

const Animated: React.FunctionComponent & SubComponents = () => {
  return <></>;
};

Animated.displayName = "Animated";

Animated.Checkmark = Checkmark;
Animated.Fireworks = Fireworks;
Animated.Loading = Loading;

export default Animated;
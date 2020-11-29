import React from "react";
import { Checkmark } from "./Checkmark";

export type Props = {};

type SubComponents = {
  Checkmark: typeof Checkmark;
};

export const Animated: React.FunctionComponent<Props> & SubComponents = () => {
  return <></>;
};

Animated.displayName = "Animated";

Animated.Checkmark = Checkmark;

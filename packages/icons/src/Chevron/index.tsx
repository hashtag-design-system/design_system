import { Down } from "./Down";
import { Up } from "./Up";
import { Right } from "./Right";
import { Left } from "./Left";
import { UpAndDown } from "./UpAndDown";

type SubComponents = {
  Left: typeof Left;
  Right: typeof Right;
  Down: typeof Down;
  Up: typeof Up;
  UpAndDown: typeof UpAndDown;
};

const Chevron: React.FC & SubComponents = () => {
  return <></>;
};

Chevron.Down = Down;
Chevron.Up = Up;
Chevron.Left = Left;
Chevron.Right = Right;
Chevron.UpAndDown = UpAndDown;

Chevron.displayName = "ChevronIcon";

export default Chevron;

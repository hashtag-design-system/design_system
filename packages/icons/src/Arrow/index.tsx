import Corner from "./Corner";
import { Down } from "./Down";
import { Expand } from "./Expand";
import { Left } from "./Left";
import { Move } from "./Move";
import { Right } from "./Right";
import { Shrink } from "./Shrink";
import { Up } from "./Up";

type SubComponents = {
  Left: typeof Left;
  Right: typeof Right;
  Down: typeof Down;
  Up: typeof Up;
  Corner: typeof Corner;
  Expand: typeof Expand;
  Shrink: typeof Shrink;
  Move: typeof Move;
};

const Arrow: React.FC & SubComponents = () => {
  return <></>;
};

Arrow.Down = Down;
Arrow.Up = Up;
Arrow.Left = Left;
Arrow.Right = Right;
Arrow.Corner = Corner;
Arrow.Expand = Expand;
Arrow.Shrink = Shrink;
Arrow.Move = Move;

Arrow.displayName = "ArrowIcon";

export default Arrow;

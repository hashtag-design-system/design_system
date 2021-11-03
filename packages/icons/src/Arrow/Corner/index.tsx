import { UpLeft, UpRight } from "./Up";
import { DownLeft, DownRight } from "./Down";

type SubComponents = {
  UpLeft: typeof UpLeft;
  UpRight: typeof UpRight;
  DownLeft: typeof DownLeft;
  DownRight: typeof DownRight;
};

const Corner: React.FC & SubComponents = () => {
  return <></>;
};

Corner.UpLeft = UpLeft;
Corner.UpRight = UpRight;
Corner.DownLeft = DownLeft;
Corner.DownRight = DownRight;

Corner.displayName = "ArrowCornerIcon";

export default Corner;

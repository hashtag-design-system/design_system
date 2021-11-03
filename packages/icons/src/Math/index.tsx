import { Add, AddCircle } from "./Add";
import { Divide } from "./Divide";
import { Multiply } from "./Multiply";
import { Subtract, SubtractCircle } from "./Subtract";

type SubComponents = {
  Add: typeof Add;
  AddCircle: typeof AddCircle;
  Subtract: typeof Subtract;
  SubtractCircle: typeof SubtractCircle;
  Divide: typeof Divide;
  Multiply: typeof Multiply;
};

const Math: React.FC & SubComponents = () => {
  return <></>;
};

Math.Add = Add;
Math.AddCircle = AddCircle;
Math.Subtract = Subtract;
Math.SubtractCircle = SubtractCircle;
Math.Divide = Divide;
Math.Multiply = Multiply;

Math.displayName = "MathIcon";

export default Math;

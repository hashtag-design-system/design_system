import { AllProps } from "../../typings";
import { addClassnames } from "../styles";

export const useClassnames = <T extends AllProps>(defaultClassname: string, props: T): any[] => {
  const { className, ...rest } = props;
  const classNames = addClassnames(defaultClassname, props);
  return [classNames, rest];
};

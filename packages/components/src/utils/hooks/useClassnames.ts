import { AllProps } from "../../typings";
import { addClassnames } from "../styles";

type useClassnamesConfig = {
  stateToRemove?: { state?: string; defaultState: string };
};

export const useClassnames = <T extends AllProps>(defaultClassname: string, props: T, options?: useClassnamesConfig): any[] => {
  const { className, ...rest } = props;
  let classNames = addClassnames(defaultClassname, props);
  if (options) {
    const { stateToRemove } = options;
    if (stateToRemove) {
      const { state, defaultState } = stateToRemove;

      if (state && state !== defaultState) {
        classNames += state;
      }
    }
  }
  return [classNames, rest];
};

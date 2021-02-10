import { ComponentProps } from "../../components/__helpers__";
import { AllProps } from "../../typings";
import { addClassnames } from "../index";

type useClassnamesConfig = {
  stateToRemove?: { defaultState?: string } & Pick<ComponentProps<any, false, string>, "state">;
};

export const useClassnames = <T extends AllProps>(
  defaultClassname: string,
  props: T,
  options?: useClassnamesConfig
): [string, Partial<T> | any] => {
  const { className, ...rest } = props;
  let classNames = addClassnames(defaultClassname, props);
  if (options) {
    const { stateToRemove } = options;
    if (stateToRemove) {
      const { state, defaultState = "default" } = stateToRemove;

      if (state && state !== defaultState) {
        classNames += ` ${state}`;
      }
    }
  }

  return [classNames, rest];
};

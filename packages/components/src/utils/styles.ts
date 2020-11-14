import { AllProps } from "../typings";

export const addClassnames = <T extends AllProps>(defaultClassname: string, props: T): string => {
  const { className } = props;
  const classNames = `${defaultClassname}${props.className !== undefined && className !== null ? ` ${className}` : ""}`;
  return classNames;
};

import { ReactInputHTMLAttributes } from "../components/Input/Input";

export const addClassnames = <T extends React.AllHTMLAttributes<any> | ReactInputHTMLAttributes>(
  defaultClassname: string,
  props: T
): string => {
  const { className } = props;
  const classNames = `${defaultClassname}${props.className !== undefined && className !== null ? ` ${className}` : ""}`;
  return classNames;
};

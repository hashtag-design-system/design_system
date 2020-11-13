import React from "react";
import { ReactInputHTMLAttributes } from "../../components/Input";
import { addClassnames } from "../styles";

export const useClassnames = <T extends React.AllHTMLAttributes<unknown> | ReactInputHTMLAttributes>(
  defaultClassname: string,
  props: T
): any[] => {
  const { className, ...rest } = props;
  const classNames = addClassnames(defaultClassname, props);
  return [classNames, rest];
};

export const addClassnames = <T extends React.HTMLAttributes<HTMLElement>>(defaultClassname: string, props: T): string => {
  const { className } = props;
  const classNames = `${defaultClassname}${props.className !== undefined && className !== null ? ` ${className}` : ""}`;
  return classNames;
};

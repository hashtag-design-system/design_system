import React, { ComponentProps } from "react";
import { useClassnames } from "../../../../utils/hooks";

type Props = {
  pageNum: number;
  spread?: boolean;
};

type FProps = Props & ComponentProps<"a">;

export const AnchorLink: React.FunctionComponent<FProps> = ({ pageNum, spread = false, href, children, ...props }) => {
  const [classNames, rest] = useClassnames("pagination__link btn btn-secondary", props);

  return spread ? (
    <span className={classNames} aria-hidden="true" data-testid="pagination-link" {...rest}>
      ...
    </span>
  ) : (
    <a className={classNames} href={href ? href : `#${pageNum}`} data-testid="pagination-link" {...rest}>
      {children}
    </a>
  );
};

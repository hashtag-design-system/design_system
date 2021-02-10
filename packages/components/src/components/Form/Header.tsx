import React from "react";
import { useClassnames } from "../../utils";
import { ComponentProps } from "../__helpers__";

export type Props = {
  withBorder?: boolean;
};

export type FProps = Props & ComponentProps<"h6">;

const Header: React.FC<FProps> = ({ withBorder = true, style, children, ...props }) => {
  const [classNames, rest] = useClassnames("form-header", props);

  return (
    // If style Prop provided, override current style
    <h6 className={classNames} style={{ border: withBorder ? undefined : "none", ...style }} data-testid="form-header" {...rest}>
      {children}
    </h6>
  );
};

Header.displayName = "FormHeader";

export default Header;

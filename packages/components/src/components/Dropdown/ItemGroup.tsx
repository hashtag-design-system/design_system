import React from "react";
import { useClassnames } from "../../utils/hooks";

export type Props = {
  value: string;
};

const ItemGroup: React.FC<Props & React.HTMLAttributes<HTMLSpanElement>> = ({ value, children, ...props }) => {
  const [classNames, rest] = useClassnames("dropdown__item dropdown__item__group body-12", props);

  return (
    <>
      <span className={classNames} {...rest}>
        {value}
      </span>
      <div className="dropdown__item__group__elements">{children}</div>
    </>
  );
};

ItemGroup.displayName = "DropdownItemGroup";

export default ItemGroup;

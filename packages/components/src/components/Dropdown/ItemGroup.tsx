import React from "react";
import { useClassnames } from "../../utils/hooks";

export type Props = {
  title: string;
};

export type FProps = Props & React.ComponentPropsWithRef<"span">;

const ItemGroup: React.FC<FProps> = ({ title, children, ...props }) => {
  const [classNames, rest] = useClassnames("dropdown__item dropdown__item__group body-12", props);

  return (
    <>
      <span className={classNames} {...rest}>
        {title}
      </span>
      <div className="dropdown__item__group__elements">{children}</div>
    </>
  );
};

ItemGroup.displayName = "DropdownItemGroup";

export default ItemGroup;

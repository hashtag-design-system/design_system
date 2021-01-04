import React, { useEffect, useState } from "react";
import errors from "../../../../config/errors";
import { error, isError } from "../../../../utils";
import { useInputContext } from "../../../../utils/contexts/InputContext";
import { FloatingPlaceholder } from "../FloatingPlaceholder/FloatingPlaceholder";

type Props = {
  prefixWidth?: number;
};

export const OuterFieldContainer: React.FunctionComponent<Props> = ({ prefixWidth = 0, children }) => {
  let {
    value,
    defaultValue,
    maxLength,
    label,
    type,
    placeholder,
    floatingplaceholder = true,
    prefix,
    suffix,
    className,
  } = useInputContext();

  useEffect(() => {
    if (typeof floatingplaceholder === "object") {
      setIsFloated(floatingplaceholder.now);
    } else {
      setIsFloated((value || typeof prefix === "string" || typeof suffix === "string") && floatingplaceholder ? true : false);
    }
  }, [value, floatingplaceholder, prefix, suffix]);

  const [isFloated, setIsFloated] = useState<boolean>((value || prefix) && floatingplaceholder ? true : false);

  if (isError() && defaultValue && maxLength && String(defaultValue).length > maxLength) {
    error("`defaultValue` Prop has more characters than its Prop limit of `maxLength`");
    return null;
  }

  if (!placeholder) {
    floatingplaceholder = false;
  }
  if (isError() && !placeholder && !label && type !== "number" && className && !className.includes("input-digit")) {
    error(errors.PLACEHOLDER_OR_LABEL);
    return null;
  }

  return (
    <div className="input__container__field" data-isfloated={isFloated} data-testid="outer-field-container">
      {children}
      <FloatingPlaceholder prefixWidth={prefixWidth} />
    </div>
  );
};

import React, { useEffect, useState } from "react";
import { CONFIG } from "../../../../config";
import { error, isError, useInputContext } from "../../../../utils";
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

  const [defaultIsFloated, setDefaultIsFloated] = useState<boolean>((value || prefix) && floatingplaceholder ? true : false);

  useEffect(() => {
    if (typeof floatingplaceholder === "object") {
      setDefaultIsFloated(floatingplaceholder.now);
    } else {
      setDefaultIsFloated((value || typeof prefix === "string" || typeof suffix === "string") && floatingplaceholder ? true : false);
    }
  }, [value, floatingplaceholder, prefix, suffix]);


  if (isError() && defaultValue && maxLength && String(defaultValue).length > maxLength) {
    error("`defaultValue` Prop has more characters than its Prop limit of `maxLength`");
    return null;
  }

  if (isError() && !placeholder && !label && type !== "number" && className && !className.includes("input-digit")) {
    error(CONFIG.ERRORS.PLACEHOLDER_OR_LABEL);
    return null;
  }

  return (
    <div className="input__container__field" data-isfloated={defaultIsFloated} data-testid="outer-field-container">
      {children}
      <FloatingPlaceholder prefixWidth={prefixWidth} />
    </div>
  );
};

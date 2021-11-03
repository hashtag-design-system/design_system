import React, { useCallback, useEffect, useState } from "react";
import { IconPropType } from "../../typings";
import { useClassnames } from "../../utils";
import Input, { InputFProps, InputSBProps } from "./index";
import { PasswordBoxes } from "./__helpers__";

// SEE: https://www.youtube.com/watch?v=7-1VZ2wF8pw
// SEE: https://www.youtube.com/watch?v=yrrw6KdGuxc&t

export type StrengthBoxesSecureLevel = "sm" | "md" | "lg";
export type StrengthBoxesType = StrengthBoxesSecureLevel[];

export type Props = {
  visibilityToggle?: boolean;
  toggleIcon?: IconPropType;
  form?: "sign-up" | "login";
};

export type FProps = Props & Omit<InputFProps, "allowClear" | "helptext" | "type" | "optional">;

export type SBProps = Props & Omit<InputSBProps, "allowClear" | "helptext" | "type" | "optional">;

const Password: React.FC<FProps> = ({
  form,
  autoComplete,
  placeholder = "Password",
  floatingplaceholder = true,
  // TODO: Replace with <Icon />
  visibilityToggle = true,
  toggleIcon,
  defaultValue,
  forwardref,
  overrideOnChange,
  onChange,
  ...props
}) => {
  const [password, setPassword] = useState<string | number>(defaultValue || "");
  const [strengthBoxes, setStrengthBoxes] = useState<StrengthBoxesType>(["sm", "sm", "sm"]);
  const [classNames, rest] = useClassnames("input-password", props);

  // Check and re-assign props
  if (form === "sign-up") autoComplete = "new-password";
  else if (form === "login") autoComplete = "current-password";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (overrideOnChange) return;

    const newVal = e.target.value;
    setPassword(newVal);
    calcPasswordStrength(newVal);

    if (onChange) onChange(e);
  };

  const calcPasswordStrength = useCallback(
    (newVal = password) => {
      const validations = [
        newVal.length >= 8,
        (newVal.match(/[A-Z]/g) || []).length >= 2,
        (newVal.match(/[a-z]/g) || []).length >= 2,
        (newVal.match(/[0-9]/g) || []).length >= 3,
        (newVal.match(/[^0-9a-zA-Z\s]/g) || []).length >= 2,
        // The `i` flag makes it case insentitive
        (newVal.match(/(.)\1/i) || []).length <= 0 && newVal.length > 0,
      ];

      setStrengthBoxes(prevState => {
        validations
          .filter(validation => validation === true)
          .forEach((_, i) => {
            if (i <= 1) {
              prevState[i + 1] = "sm";
            }
            if (i < 3) {
              prevState[i] = "md";
            } else if (i >= 3) {
              prevState[i - 3] = "lg";
            }
          });
        return prevState;
      });
    },
    [password]
  );

  useEffect(() => {
    if (!password) {
      setStrengthBoxes(prevState => prevState.map(() => "sm"));
    } else if (defaultValue) {
      calcPasswordStrength();
    }
  }, [password, defaultValue, setStrengthBoxes, calcPasswordStrength]);

  return (
    <div style={{ width: "100%", marginTop: -8 }}>
      <Input
        type="password"
        value={password}
        placeholder={placeholder}
        floatingplaceholder={floatingplaceholder}
        autoComplete={autoComplete}
        suffix={visibilityToggle ? toggleIcon : undefined}
        className={classNames}
        forwardref={forwardref}
        onChange={e => handleChange(e)}
        overrideOnChange={overrideOnChange}
        passwordboxes={<PasswordBoxes strengthBoxes={strengthBoxes} />}
        data-testid="input-password"
        {...rest}
      />
    </div>
  );
};

Password.displayName = "InputPassword";

export default Password;

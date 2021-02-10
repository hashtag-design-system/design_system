import React from "react";
import { CONFIG } from "../../../../config";
import { StrengthBoxesType } from "../../Password";

export type PasswordBoxesProps = {
  strengthBoxes: StrengthBoxesType;
};

export const PasswordBoxes: React.FunctionComponent<PasswordBoxesProps> = ({ strengthBoxes }) => {
  return (
    <>
      {strengthBoxes.map((box, i) => {
        return (
          <span
            key={`${CONFIG.listKeys.PASSWORD_INPUT}_${i + 1}`}
            className={`input-password__strength-meter-box ${box}-secure`}
            data-testid="password-box"
          />
        );
      })}
    </>
  );
};

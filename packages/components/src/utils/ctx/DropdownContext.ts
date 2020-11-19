import React from "react";

type DropdownContextType = {
  isVisible: boolean;
  setIsVisible?: React.Dispatch<React.SetStateAction<boolean>>;
  helptext: boolean;
  label: boolean;
  ref?: React.RefObject<any>;
  handleSelect?: (key: string, e: React.SyntheticEvent<HTMLLIElement>, children?: string | undefined) => void;
  handleClick?: (e: React.MouseEvent<HTMLInputElement | SVGElement>) => void;
};

const DropdownContext = React.createContext<DropdownContextType>({
  isVisible: false,
  helptext: false,
  label: false,
});

export default DropdownContext;

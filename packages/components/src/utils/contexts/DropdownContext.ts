import React from "react";

type DropdownContextType = {
  isVisible: boolean;
  setIsVisible?: React.Dispatch<React.SetStateAction<boolean>>;
  helptext: boolean;
  label: boolean;
  ref?: React.RefObject<any>;
  handleSelect?: (e: React.MouseEvent<HTMLLIElement>, key: string, children?: string | undefined) => void;
  handleClick?: (e: React.MouseEvent<HTMLInputElement | SVGSVGElement>) => void;
};

const DropdownContext = React.createContext<DropdownContextType>({
  isVisible: false,
  helptext: false,
  label: false,
});

export default DropdownContext;

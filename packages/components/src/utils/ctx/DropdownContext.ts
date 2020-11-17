import React from "react";

type DropdownContextType = {
  isOpen: boolean;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  helptext: boolean;
  label: boolean;
  disabled: boolean;
  handleSelect?: (key: string, e: React.SyntheticEvent<HTMLLIElement>, children?: string | undefined) => void;
};

const DropdownContext = React.createContext<DropdownContextType>({
  isOpen: false,
  helptext: false,
  label: false,
  disabled: false,
});

export default DropdownContext;
